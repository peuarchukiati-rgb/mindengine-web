const FUNCTIONS = ["Ti", "Te", "Ne", "Ni", "Si", "Se", "Fi", "Fe"];

const AXIS_MAP = {
  "Ti-Te": ["Ti", "Te"],
  "Te-Ti": ["Te", "Ti"],
  "Ne-Ni": ["Ne", "Ni"],
  "Ni-Ne": ["Ni", "Ne"],
  "Si-Se": ["Si", "Se"],
  "Se-Si": ["Se", "Si"],
  "Fi-Fe": ["Fi", "Fe"],
  "Fe-Fi": ["Fe", "Fi"],
  "Ti-Fi": ["Ti", "Fi"],
  "Te-Fe": ["Te", "Fe"],
  "Ne-Si": ["Ne", "Si"],
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function topFunctions(functionScores, count) {
  return [...Object.entries(functionScores)]
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([name]) => name);
}

export function buildFallbackAnalysis(payload) {
  const scores = Object.fromEntries(FUNCTIONS.map((name) => [name, 50]));
  const responses = Array.isArray(payload?.responses) ? payload.responses : [];

  for (const response of responses) {
    if (response.type === "bipolar" && AXIS_MAP[response.axis]) {
      const [left, right] = AXIS_MAP[response.axis];
      const score = Number(response.score);
      if (Number.isFinite(score)) {
        const normalized = clamp((score - 4) * 8, -24, 24);
        scores[left] = clamp(scores[left] + normalized, 0, 100);
        scores[right] = clamp(scores[right] - normalized, 0, 100);
      }
    }

    if (response.type === "context") {
      const words = String(response.value || "")
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;
      const depthBoost = clamp(Math.floor(words / 60), 0, 4);
      scores.Ni = clamp(scores.Ni + depthBoost, 0, 100);
      scores.Ti = clamp(scores.Ti + depthBoost, 0, 100);
      scores.Si = clamp(scores.Si + Math.floor(depthBoost / 2), 0, 100);
    }

    if (response.type === "multiple_choice") {
      const value = response.value;
      if (value === "observable_metrics" || value === "increase_external_pressure") {
        scores.Te = clamp(scores.Te + 6, 0, 100);
      }
      if (value === "future_pattern" || value === "seek_new_angles") {
        scores.Ne = clamp(scores.Ne + 6, 0, 100);
      }
      if (value === "past_reference" || value === "reference_first") {
        scores.Si = clamp(scores.Si + 6, 0, 100);
      }
      if (value === "social_temperature" || value === "mentor_feedback") {
        scores.Fe = clamp(scores.Fe + 6, 0, 100);
      }
      if (value === "recheck_framework" || value === "model_first") {
        scores.Ti = clamp(scores.Ti + 6, 0, 100);
      }
      if (value === "reconnect_values" || value === "reflective_reset") {
        scores.Fi = clamp(scores.Fi + 6, 0, 100);
      }
      if (value === "physical_reset" || value === "practice_first") {
        scores.Se = clamp(scores.Se + 6, 0, 100);
      }
    }
  }

  for (const fn of FUNCTIONS) {
    scores[fn] = clamp(Math.round(scores[fn]), 0, 100);
  }

  const activeStack = topFunctions(scores, 4);
  const nonPrimary = [...Object.entries(scores)].filter(
    ([name]) => !activeStack.includes(name),
  );
  nonPrimary.sort((a, b) => b[1] - a[1]);
  const shadowCandidate = nonPrimary[0] || [activeStack[3], scores[activeStack[3]]];

  return {
    function_scores: scores,
    active_stack: activeStack,
    shadow_spike: {
      function: shadowCandidate[0],
      score: shadowCandidate[1],
      reason:
        "Detected elevated activation outside the primary stack during stress-related response signals.",
    },
    risk_pattern:
      "Pattern shows uneven function deployment under pressure. Decision cycles may narrow too quickly or over-expand, increasing execution drift and interpretive bias.",
    corrective_action:
      "Run a 10-minute dual-log after each high-pressure decision: one column for observed facts, one for inferred meaning, then commit one corrective action.",
  };
}
