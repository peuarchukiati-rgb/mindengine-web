"use client";

import { useMemo, useRef, useState } from "react";
import RadarChart from "@/components/RadarChart";
import {
  getQuestionSet,
  maybeGetAdaptiveQuestion,
  targetQuestionCount,
} from "@/lib/diagnostic/questions";

const STAGES = {
  LANDING: "landing",
  READINESS: "readiness",
  MODE: "mode",
  QUESTIONNAIRE: "questionnaire",
  PROCESSING: "processing",
  RESULTS: "results",
  HALTED: "halted",
};

function countWords(text) {
  return String(text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function validateResultShape(result) {
  if (!result || typeof result !== "object") return false;
  const keys = ["Ti", "Te", "Ne", "Ni", "Si", "Se", "Fi", "Fe"];
  if (!result.function_scores || typeof result.function_scores !== "object") return false;
  for (const key of keys) {
    const value = result.function_scores[key];
    if (typeof value !== "number" || value < 0 || value > 100) return false;
  }
  if (!Array.isArray(result.active_stack) || result.active_stack.length < 1) return false;
  if (!result.shadow_spike || typeof result.shadow_spike !== "object") return false;
  if (typeof result.shadow_spike.function !== "string") return false;
  if (typeof result.shadow_spike.score !== "number") return false;
  if (typeof result.shadow_spike.reason !== "string") return false;
  if (typeof result.risk_pattern !== "string") return false;
  if (typeof result.corrective_action !== "string") return false;
  return true;
}

function capWords(text, max) {
  const words = String(text || "").trim().split(/\s+/).filter(Boolean);
  if (words.length <= max) return words.join(" ");
  return `${words.slice(0, max).join(" ")}...`;
}

export default function MindEngineApp() {
  const [stage, setStage] = useState(STAGES.LANDING);
  const [readiness, setReadiness] = useState("");
  const [mode, setMode] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [contextInput, setContextInput] = useState("");
  const [bipolarInput, setBipolarInput] = useState(4);
  const [choiceInput, setChoiceInput] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [processingError, setProcessingError] = useState("");
  const [result, setResult] = useState(null);
  const adaptiveKeysRef = useRef(new Set());

  const currentQuestion = questions[questionIndex] || null;
  const progress = questions.length
    ? Math.round(((questionIndex + 1) / questions.length) * 100)
    : 0;

  const targetCount = useMemo(() => targetQuestionCount(readiness, mode), [readiness, mode]);

  function resetFlow() {
    setStage(STAGES.LANDING);
    setReadiness("");
    setMode("");
    setQuestions([]);
    setQuestionIndex(0);
    setResponses([]);
    setContextInput("");
    setBipolarInput(4);
    setChoiceInput("");
    setFieldError("");
    setProcessingError("");
    setResult(null);
    adaptiveKeysRef.current = new Set();
  }

  function selectReadiness(value) {
    setReadiness(value);
    if (value === "low") {
      setStage(STAGES.HALTED);
      return;
    }
    setStage(STAGES.MODE);
  }

  function startQuestionnaire(selectedMode) {
    const resolvedMode = readiness === "medium" ? "quick" : selectedMode;
    setMode(resolvedMode);
    setQuestions(getQuestionSet({ readiness, mode: resolvedMode }));
    setQuestionIndex(0);
    setResponses([]);
    setContextInput("");
    setBipolarInput(4);
    setChoiceInput("");
    setFieldError("");
    adaptiveKeysRef.current = new Set();
    setStage(STAGES.QUESTIONNAIRE);
  }

  function initializeInputForType(type) {
    if (type === "context") setContextInput("");
    if (type === "bipolar") setBipolarInput(4);
    if (type === "multiple_choice") setChoiceInput("");
  }

  async function runAnalysis(payload) {
    setStage(STAGES.PROCESSING);
    setProcessingError("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json?.error || "Analysis failed.");
      }
      if (!validateResultShape(json)) {
        throw new Error("Invalid analysis format.");
      }

      setResult(json);
      setStage(STAGES.RESULTS);
    } catch (error) {
      setProcessingError(error.message || "Analysis failed.");
      setStage(STAGES.PROCESSING);
    }
  }

  function submitAnswer() {
    if (!currentQuestion) return;
    let formattedResponse;

    if (currentQuestion.type === "context") {
      const words = countWords(contextInput);
      if (words < 120) {
        setFieldError("Please provide at least 120 words before continuing.");
        return;
      }
      formattedResponse = {
        type: "context",
        value: contextInput.trim(),
      };
    }

    if (currentQuestion.type === "bipolar") {
      formattedResponse = {
        type: "bipolar",
        axis: currentQuestion.axis,
        score: Number(bipolarInput),
      };
    }

    if (currentQuestion.type === "multiple_choice") {
      if (!choiceInput) {
        setFieldError("Choose one option to continue.");
        return;
      }
      formattedResponse = {
        type: "multiple_choice",
        pattern: currentQuestion.patternKey,
        value: choiceInput,
      };
    }

    const nextResponses = [...responses, formattedResponse];
    const updatedQuestions = [...questions];

    if (readiness === "high" && mode === "deep" && currentQuestion.type === "bipolar") {
      const adaptiveQuestion = maybeGetAdaptiveQuestion(
        currentQuestion,
        Number(bipolarInput),
        adaptiveKeysRef.current,
      );
      if (adaptiveQuestion && updatedQuestions.length < 35) {
        updatedQuestions.splice(questionIndex + 1, 0, adaptiveQuestion);
        setQuestions(updatedQuestions);
      }
    }

    setResponses(nextResponses);
    setFieldError("");

    const nextIndex = questionIndex + 1;
    const shouldFinish =
      nextIndex >= updatedQuestions.length ||
      (readiness === "high" &&
        mode === "deep" &&
        nextResponses.length >= targetCount &&
        updatedQuestions.length >= targetCount);

    if (shouldFinish) {
      runAnalysis({
        readiness,
        mode,
        responses: nextResponses,
      });
      return;
    }

    setQuestionIndex(nextIndex);
    initializeInputForType(updatedQuestions[nextIndex].type);
  }

  const cardClass =
    "mx-auto w-full max-w-3xl rounded-2xl border border-slate-700 bg-slate-900/70 p-6 shadow-xl";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#0f1e37,#020617_45%)] px-4 py-10 text-slate-100">
      {stage === STAGES.LANDING && (
        <section className={cardClass}>
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-sky-300">
            MindEngine v1
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Adaptive Cognitive Diagnostic</h1>
          <p className="mt-4 text-slate-300">
            This system analyzes current cognitive function usage patterns and shadow spike
            activation. It does not assign personality type.
          </p>
          <button
            type="button"
            onClick={() => setStage(STAGES.READINESS)}
            className="mt-8 rounded-lg bg-sky-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-sky-400"
          >
            Start Diagnostic
          </button>
        </section>
      )}

      {stage === STAGES.READINESS && (
        <section className={cardClass}>
          <h2 className="text-2xl font-semibold">Readiness Gate</h2>
          <p className="mt-3 text-slate-300">
            How ready are you to explore your internal patterns right now?
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { value: "high", label: "High" },
              { value: "medium", label: "Medium" },
              { value: "low", label: "Low" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => selectReadiness(option.value)}
                className="rounded-lg border border-slate-600 bg-slate-800/60 px-4 py-3 text-left transition hover:border-sky-400 hover:bg-slate-800"
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>
      )}

      {stage === STAGES.HALTED && (
        <section className={cardClass}>
          <h2 className="text-2xl font-semibold">Diagnostic Paused</h2>
          <p className="mt-3 text-slate-300">
            Low readiness detected. Pause here, observe current stress signals, and resume when
            your attention is more stable.
          </p>
          <button
            type="button"
            onClick={resetFlow}
            className="mt-6 rounded-lg border border-slate-500 px-4 py-2 text-sm transition hover:border-slate-300"
          >
            Return to Landing
          </button>
        </section>
      )}

      {stage === STAGES.MODE && (
        <section className={cardClass}>
          <h2 className="text-2xl font-semibold">Mode Selection</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => startQuestionnaire("quick")}
              className="rounded-xl border border-slate-600 bg-slate-800/60 p-5 text-left transition hover:border-sky-400"
            >
              <h3 className="text-lg font-semibold">Quick Scan</h3>
              <p className="mt-2 text-sm text-slate-300">10 minutes · 10 questions</p>
            </button>
            <button
              type="button"
              onClick={() => startQuestionnaire("deep")}
              disabled={readiness === "medium"}
              className="rounded-xl border border-slate-600 bg-slate-800/60 p-5 text-left transition hover:border-sky-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <h3 className="text-lg font-semibold">Deep Scan</h3>
              <p className="mt-2 text-sm text-slate-300">25 minutes · 25–35 adaptive questions</p>
            </button>
          </div>
          {readiness === "medium" && (
            <p className="mt-4 text-sm text-amber-300">
              Medium readiness routes to light mode automatically (10 questions).
            </p>
          )}
        </section>
      )}

      {stage === STAGES.QUESTIONNAIRE && currentQuestion && (
        <section className={cardClass}>
          <div className="mb-4 flex items-center justify-between text-sm text-slate-300">
            <span>
              Question {questionIndex + 1} / {questions.length}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800">
            <div
              className="h-2 rounded-full bg-sky-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <h2 className="mt-6 text-xl font-semibold">{currentQuestion.prompt}</h2>

          {currentQuestion.type === "context" && (
            <div className="mt-5">
              <textarea
                value={contextInput}
                onChange={(event) => setContextInput(event.target.value)}
                rows={9}
                className="w-full rounded-xl border border-slate-600 bg-slate-950/80 p-4 text-sm text-slate-100 outline-none ring-sky-400 focus:ring"
                placeholder="Write detailed context..."
              />
              <p className="mt-2 text-xs text-slate-400">
                Minimum 120 words. Current: {countWords(contextInput)}
              </p>
            </div>
          )}

          {currentQuestion.type === "bipolar" && (
            <div className="mt-6">
              <div className="mb-3 flex justify-between text-sm text-slate-300">
                <span>{currentQuestion.labels?.[0]}</span>
                <span>{currentQuestion.labels?.[1]}</span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setBipolarInput(value)}
                    className={`rounded-md border px-0 py-2 text-sm ${
                      bipolarInput === value
                        ? "border-sky-400 bg-sky-500/20"
                        : "border-slate-600 bg-slate-900"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentQuestion.type === "multiple_choice" && (
            <div className="mt-5 space-y-3">
              {currentQuestion.options?.map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center rounded-lg border px-3 py-3 text-sm ${
                    choiceInput === option.value
                      ? "border-sky-400 bg-sky-500/15"
                      : "border-slate-600 bg-slate-900/70"
                  }`}
                >
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={option.value}
                    checked={choiceInput === option.value}
                    onChange={() => setChoiceInput(option.value)}
                    className="mr-3"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          )}

          {fieldError && <p className="mt-4 text-sm text-rose-300">{fieldError}</p>}

          <button
            type="button"
            onClick={submitAnswer}
            className="mt-7 rounded-lg bg-sky-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-sky-400"
          >
            Continue
          </button>
        </section>
      )}

      {stage === STAGES.PROCESSING && (
        <section className={cardClass}>
          <h2 className="text-2xl font-semibold">Processing Diagnostic</h2>
          {!processingError && (
            <p className="mt-4 text-slate-300">
              Running structured cognitive signal analysis. This may take a few seconds.
            </p>
          )}
          {processingError && (
            <div className="mt-4">
              <p className="text-rose-300">Analysis failed: {processingError}</p>
              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() =>
                    runAnalysis({
                      readiness,
                      mode,
                      responses,
                    })
                  }
                  className="rounded-lg bg-sky-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-sky-400"
                >
                  Retry Analysis
                </button>
                <button
                  type="button"
                  onClick={resetFlow}
                  className="rounded-lg border border-slate-500 px-4 py-2 text-sm transition hover:border-slate-300"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {stage === STAGES.RESULTS && result && (
        <section className="mx-auto w-full max-w-5xl space-y-4">
          <header className={cardClass}>
            <h2 className="text-3xl font-semibold">Diagnostic Dashboard</h2>
            <p className="mt-2 text-sm text-slate-300">
              State-based cognitive output. No personality typing applied.
            </p>
          </header>

          <div className="grid gap-4 lg:grid-cols-2">
            <article className={cardClass}>
              <h3 className="text-xl font-semibold">Function Radar</h3>
              <div className="mt-4">
                <RadarChart scores={result.function_scores} />
              </div>
            </article>

            <article className={cardClass}>
              <h3 className="text-xl font-semibold">Active Stack</h3>
              <ol className="mt-4 space-y-2">
                {result.active_stack.slice(0, 4).map((fn, index) => (
                  <li
                    key={fn}
                    className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2"
                  >
                    <span>
                      {index + 1}. {fn}
                    </span>
                    <span className="text-sm text-slate-300">
                      {result.function_scores[fn] ?? 0}
                    </span>
                  </li>
                ))}
              </ol>
            </article>
          </div>

          <article className={cardClass}>
            <h3 className="text-xl font-semibold">Shadow Spike</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-3">
                <p className="text-xs uppercase text-slate-400">Function</p>
                <p className="mt-1 text-lg">{result.shadow_spike.function}</p>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-3">
                <p className="text-xs uppercase text-slate-400">Activation Score</p>
                <p className="mt-1 text-lg">{result.shadow_spike.score}</p>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-3 sm:col-span-1">
                <p className="text-xs uppercase text-slate-400">Reason</p>
                <p className="mt-1 text-sm text-slate-200">{result.shadow_spike.reason}</p>
              </div>
            </div>
          </article>

          <div className="grid gap-4 lg:grid-cols-2">
            <article className={cardClass}>
              <h3 className="text-xl font-semibold">Risk Pattern</h3>
              <p className="mt-3 text-sm text-slate-200">{capWords(result.risk_pattern, 120)}</p>
            </article>

            <article className={cardClass}>
              <h3 className="text-xl font-semibold">Corrective Action</h3>
              <p className="mt-3 text-sm text-slate-200">{result.corrective_action}</p>
            </article>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={resetFlow}
              className="rounded-lg border border-slate-500 px-4 py-2 text-sm transition hover:border-slate-300"
            >
              Run New Diagnostic
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

