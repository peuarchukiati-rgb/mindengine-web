import { NextResponse } from "next/server";

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const OPENAI_URL = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1/chat/completions";
const LANGUAGE_NAME = {
  EN: "English",
  TH: "Thai",
  JP: "Japanese",
  KR: "Korean",
};

const SYSTEM_PROMPT = `
You translate diagnostic text.
Return strict JSON only.
No markdown.
Keep tone consistent with the original text.
Do not add motivational fluff.
Schema:
{
  "shadow_spike_reason": string,
  "risk_pattern": string,
  "corrective_action": string
}
`;

function parseJson(raw) {
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

function normalize(json) {
  if (!json || typeof json !== "object") return null;
  if (
    typeof json.shadow_spike_reason !== "string" ||
    typeof json.risk_pattern !== "string" ||
    typeof json.corrective_action !== "string"
  ) {
    return null;
  }
  return {
    shadow_spike_reason: json.shadow_spike_reason,
    risk_pattern: json.risk_pattern,
    corrective_action: json.corrective_action,
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const targetLanguage = String(body?.target_language || "EN").toUpperCase();
    const resultBase = body?.result_base;

    if (!LANGUAGE_NAME[targetLanguage]) {
      return NextResponse.json({ error: "Unsupported target_language." }, { status: 400 });
    }
    if (!resultBase || typeof resultBase !== "object") {
      return NextResponse.json({ error: "Missing result_base." }, { status: 400 });
    }

    const source = {
      shadow_spike_reason: String(resultBase?.shadow_spike?.reason || ""),
      risk_pattern: String(resultBase?.risk_pattern || ""),
      corrective_action: String(resultBase?.corrective_action || ""),
    };

    if (targetLanguage === "EN") {
      return NextResponse.json(source);
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Fallback: keep source text when translation model is unavailable.
      return NextResponse.json(source);
    }

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
            content: `Translate the following diagnostic text to ${
              LANGUAGE_NAME[targetLanguage]
            }.\n${JSON.stringify(source)}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Translation request failed: ${errorText.slice(0, 240)}` },
        { status: 502 },
      );
    }

    const json = await response.json();
    const raw = json?.choices?.[0]?.message?.content || "";
    const parsed = parseJson(raw);
    const normalized = normalize(parsed);
    if (!normalized) {
      return NextResponse.json({ error: "Invalid translated JSON output." }, { status: 502 });
    }

    return NextResponse.json(normalized);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Result translation failed." },
      { status: 500 },
    );
  }
}

