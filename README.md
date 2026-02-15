# MindEngine v1

Adaptive Cognitive Diagnostic Web Application (state-based, non-typing).

## Scope

- Landing -> Readiness Gate -> Mode Selection -> Questionnaire -> Processing -> Dashboard
- Readiness `low` halts the flow
- Readiness `medium` forces 10-question light mode
- Readiness `high` allows quick or deep adaptive mode
- Strict JSON analysis output
- Radar chart + active stack + shadow spike + risk pattern + corrective action

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## LLM Setup (optional but recommended)

If `OPENAI_API_KEY` is set, `/api/analyze` calls an LLM and retries when JSON is invalid.
If no API key is set, the API uses a deterministic fallback analyzer so the flow still works.

Example `.env.local`:

```bash
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4o-mini
# Optional custom compatible endpoint
# OPENAI_BASE_URL=https://api.openai.com/v1/chat/completions
```

## API Output Schema

`POST /api/analyze` returns:

```json
{
  "function_scores": {
    "Ti": 0,
    "Te": 0,
    "Ne": 0,
    "Ni": 0,
    "Si": 0,
    "Se": 0,
    "Fi": 0,
    "Fe": 0
  },
  "active_stack": ["Ti", "Ni", "Te", "Fe"],
  "shadow_spike": {
    "function": "Se",
    "score": 64,
    "reason": "..."
  },
  "risk_pattern": "...",
  "corrective_action": "..."
}
```
