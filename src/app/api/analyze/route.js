import { NextResponse } from "next/server";
import { buildFallbackAnalysis } from "@/lib/diagnostic/fallbackAnalysis";

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const OPENAI_URL = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1/chat/completions";

const SYSTEM_PROMPT = `
You are a cognitive diagnostics engine.
Return strict JSON only.
Do not include markdown.
Do not include explanations outside JSON.
Do not infer personality type labels.
Use "mbti_declared" only as optional weak prior, never as deterministic type lock.
Infer the user's communication vibe from context responses and mirror it in:
- shadow_spike.reason
- risk_pattern
- corrective_action
Style constraints:
- precise, neutral, practical
- no motivational fluff
- no personality-typing explanation
- keep language aligned to the user's writing tone and directness
Schema:
{
  "function_scores": {
    "Ti": number 0-100,
    "Te": number 0-100,
    "Ne": number 0-100,
    "Ni": number 0-100,
    "Si": number 0-100,
    "Se": number 0-100,
    "Fi": number 0-100,
    "Fe": number 0-100
  },
  "active_stack": [string, string, string, string],
  "shadow_spike": {
    "function": string,
    "score": number,
    "reason": string
  },
  "risk_pattern": string,
  "corrective_action": string
}
`;

function sanitizeAndParseJson(raw) {
  if (!raw || typeof raw !== "string") return null;

  try {
    return JSON.parse(raw);
  } catch {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(raw.slice(start, end + 1));
      } catch {
        return null;
      }
    }
  }
  return null;
}

function normalizeResult(result) {
  const keys = ["Ti", "Te", "Ne", "Ni", "Si", "Se", "Fi", "Fe"];
  if (!result || typeof result !== "object") return null;
  if (!result.function_scores || typeof result.function_scores !== "object") return null;

  const normalizedScores = {};
  for (const key of keys) {
    const value = Number(result.function_scores[key]);
    if (!Number.isFinite(value)) return null;
    normalizedScores[key] = Math.max(0, Math.min(100, Math.round(value)));
  }

  const stack = Array.isArray(result.active_stack)
    ? result.active_stack.filter((name) => keys.includes(name))
    : [];
  const dedupedStack = [...new Set(stack)];
  if (dedupedStack.length < 4) {
    const ranked = [...Object.entries(normalizedScores)]
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name);
    for (const fn of ranked) {
      if (!dedupedStack.includes(fn)) dedupedStack.push(fn);
      if (dedupedStack.length === 4) break;
    }
  }

  const shadowFunction = keys.includes(result?.shadow_spike?.function)
    ? result.shadow_spike.function
    : dedupedStack[3];
  const shadowScore = Number(result?.shadow_spike?.score);

  return {
    function_scores: normalizedScores,
    active_stack: dedupedStack.slice(0, 4),
    shadow_spike: {
      function: shadowFunction,
      score: Number.isFinite(shadowScore)
        ? Math.max(0, Math.min(100, Math.round(shadowScore)))
        : normalizedScores[shadowFunction],
      reason: String(result?.shadow_spike?.reason || "No reason returned."),
    },
    risk_pattern: String(result?.risk_pattern || ""),
    corrective_action: String(result?.corrective_action || ""),
  };
}

async function callLLMWithRetry(payload, retries = 2) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return buildFallbackAnalysis(payload);
  }

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const response = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Analyze this diagnostic input and return strict JSON only:\n${JSON.stringify(
              payload,
            )}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`LLM request failed: ${errorText.slice(0, 240)}`);
    }

    const json = await response.json();
    const raw = json?.choices?.[0]?.message?.content || "";
    const parsed = sanitizeAndParseJson(raw);
    const normalized = normalizeResult(parsed);
    if (normalized) return normalized;
  }

  throw new Error("Invalid JSON returned from LLM after retries.");
}

export async function POST(request) {
  try {
    const payload = await request.json();

    if (!payload || typeof payload !== "object") {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    if (!payload.readiness || !payload.mode || !Array.isArray(payload.responses)) {
      return NextResponse.json({ error: "Missing required diagnostic fields." }, { status: 400 });
    }
    if (payload.mbti_declared && typeof payload.mbti_declared !== "string") {
      return NextResponse.json({ error: "mbti_declared must be a string." }, { status: 400 });
    }

    const result = await callLLMWithRetry(payload, 2);
    const normalized = normalizeResult(result);
    if (!normalized) {
      return NextResponse.json({ error: "Analysis result shape invalid." }, { status: 502 });
    }

    return NextResponse.json(normalized);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Analysis engine failed." },
      { status: 500 },
    );
  }
}
