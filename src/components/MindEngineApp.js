"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import RadarChart from "@/components/RadarChart";
import {
  getQuestionSet,
  localizeQuestion,
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

const LANGUAGE_OPTIONS = ["EN", "TH", "JP", "KR"];
const MBTI_OPTIONS = [
  "",
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
];

const COPY = {
  EN: {
    appLabel: "MindEngine v1.2",
    title: "Adaptive Cognitive Diagnostic",
    subtitle:
      "This system analyzes current cognitive function usage patterns and shadow spike activation. It does not assign personality type.",
    startDiagnostic: "Start Diagnostic ;)",
    readinessGate: "Readiness Gate",
    readinessQuestion: "How ready are you to explore your internal patterns right now?",
    high: "High",
    medium: "Medium",
    low: "Low",
    diagnosticPaused: "Diagnostic Paused",
    pausedMessage:
      "Low readiness detected. Pause here, observe current stress signals, and resume when your attention is more stable.",
    returnToLanding: "Return to Landing",
    modeSelection: "Mode Selection",
    quickScan: "Quick Scan",
    quickScanDesc: "10 minutes · 10 questions",
    deepScan: "Deep Scan",
    deepScanDesc: "25 minutes · 25–35 adaptive questions",
    mediumHint: "Medium readiness routes to light mode automatically (10 questions).",
    mbtiOptional: "MBTI (optional)",
    mbtiPlaceholder: "Skip / not sure",
    mbtiHelp: "Used as optional reference only. It does not lock your result.",
    questionLabel: "Question",
    wordCount: "Word count:",
    contextPlaceholder: "Write detailed context...",
    continue: "Continue",
    selectOptionError: "Choose one option to continue.",
    processingTitle: "Processing Diagnostic",
    processingDesc: "Running structured cognitive signal analysis. This may take a few seconds.",
    analysisFailed: "Analysis failed:",
    retryAnalysis: "Retry Analysis",
    startOver: "Start Over",
    dashboard: "Diagnostic Dashboard",
    dashboardDesc: "State-based cognitive output. No personality typing applied.",
    functionRadar: "Function Radar",
    activeStack: "Active Stack",
    shadowSpike: "Shadow Spike",
    functionLabel: "Function",
    activationScore: "Activation Score",
    reason: "Reason",
    riskPattern: "Risk Pattern",
    correctiveAction: "Corrective Action",
    runNewDiagnostic: "Run New Diagnostic",
  },
  TH: {
    appLabel: "MindEngine v1.2",
    title: "การวินิจฉัยการใช้กระบวนการคิดแบบปรับตามบริบท",
    subtitle:
      "ระบบนี้วิเคราะห์รูปแบบการใช้ cognitive function และการกระตุ้น shadow spike โดยไม่ระบุบุคลิกภาพแบบตายตัว",
    startDiagnostic: "เริ่มการวินิจฉัย ;)",
    readinessGate: "ด่านความพร้อม",
    readinessQuestion: "ตอนนี้คุณพร้อมแค่ไหนที่จะสำรวจรูปแบบภายในของตัวเอง?",
    high: "สูง",
    medium: "กลาง",
    low: "ต่ำ",
    diagnosticPaused: "หยุดการวินิจฉัยชั่วคราว",
    pausedMessage:
      "ตรวจพบความพร้อมระดับต่ำ แนะนำให้พักและสังเกตสัญญาณความเครียดก่อน แล้วค่อยกลับมาทำต่อเมื่อสมาธินิ่งขึ้น",
    returnToLanding: "กลับหน้าแรก",
    modeSelection: "เลือกโหมด",
    quickScan: "สแกนเร็ว",
    quickScanDesc: "10 นาที · 10 คำถาม",
    deepScan: "สแกนลึก",
    deepScanDesc: "25 นาที · 25–35 คำถามแบบปรับตัว",
    mediumHint: "ถ้าความพร้อมระดับกลาง ระบบจะใช้โหมดเบาอัตโนมัติ (10 คำถาม)",
    mbtiOptional: "MBTI (ไม่บังคับ)",
    mbtiPlaceholder: "ข้าม / ยังไม่แน่ใจ",
    mbtiHelp: "ใช้เป็นข้อมูลอ้างอิงเท่านั้น ไม่ได้ล็อกผลลัพธ์",
    questionLabel: "คำถาม",
    wordCount: "จำนวนคำ:",
    contextPlaceholder: "พิมพ์บริบทแบบละเอียด...",
    continue: "ถัดไป",
    selectOptionError: "กรุณาเลือกหนึ่งตัวเลือกก่อน",
    processingTitle: "กำลังประมวลผล",
    processingDesc: "กำลังวิเคราะห์สัญญาณกระบวนการคิดแบบโครงสร้าง อาจใช้เวลาสักครู่",
    analysisFailed: "วิเคราะห์ไม่สำเร็จ:",
    retryAnalysis: "ลองวิเคราะห์ใหม่",
    startOver: "เริ่มใหม่",
    dashboard: "แดชบอร์ดผลวินิจฉัย",
    dashboardDesc: "ผลลัพธ์เชิงสถานะ โดยไม่จัดประเภทบุคลิกภาพ",
    functionRadar: "เรดาร์ฟังก์ชัน",
    activeStack: "สแต็กที่ใช้งานเด่น",
    shadowSpike: "Shadow Spike",
    functionLabel: "ฟังก์ชัน",
    activationScore: "คะแนนการกระตุ้น",
    reason: "เหตุผล",
    riskPattern: "รูปแบบความเสี่ยง",
    correctiveAction: "แนวทางปรับแก้",
    runNewDiagnostic: "เริ่มวินิจฉัยรอบใหม่",
  },
  JP: {
    appLabel: "MindEngine v1.2",
    title: "適応型認知診断",
    subtitle:
      "このシステムは認知機能の使用パターンとシャドースパイクの活性を分析します。性格タイプの判定は行いません。",
    startDiagnostic: "診断を開始 ;)",
    readinessGate: "準備ゲート",
    readinessQuestion: "今、内面的なパターンを探る準備はどの程度ありますか？",
    high: "高い",
    medium: "中",
    low: "低い",
    diagnosticPaused: "診断を一時停止",
    pausedMessage:
      "準備度が低い状態です。まずストレス信号を観察し、注意が安定してから再開してください。",
    returnToLanding: "トップへ戻る",
    modeSelection: "モード選択",
    quickScan: "クイックスキャン",
    quickScanDesc: "10分 · 10問",
    deepScan: "ディープスキャン",
    deepScanDesc: "25分 · 25〜35問の適応型質問",
    mediumHint: "準備度が中の場合は自動でライトモード（10問）になります。",
    mbtiOptional: "MBTI（任意）",
    mbtiPlaceholder: "スキップ / 未確定",
    mbtiHelp: "任意の参照情報としてのみ使用され、結果を固定しません。",
    questionLabel: "質問",
    wordCount: "語数:",
    contextPlaceholder: "詳細な文脈を入力してください...",
    continue: "続行",
    selectOptionError: "続行するには1つ選択してください。",
    processingTitle: "診断を処理中",
    processingDesc: "構造化された認知シグナル分析を実行中です。数秒かかる場合があります。",
    analysisFailed: "分析に失敗しました:",
    retryAnalysis: "再試行",
    startOver: "やり直す",
    dashboard: "診断ダッシュボード",
    dashboardDesc: "状態ベースの認知出力。性格タイプの判定はありません。",
    functionRadar: "機能レーダー",
    activeStack: "アクティブスタック",
    shadowSpike: "シャドースパイク",
    functionLabel: "機能",
    activationScore: "活性スコア",
    reason: "理由",
    riskPattern: "リスクパターン",
    correctiveAction: "修正アクション",
    runNewDiagnostic: "新しい診断を実行",
  },
  KR: {
    appLabel: "MindEngine v1.2",
    title: "적응형 인지 진단",
    subtitle:
      "이 시스템은 인지 기능 사용 패턴과 섀도우 스파이크 활성화를 분석합니다. 성격 유형을 단정하지 않습니다.",
    startDiagnostic: "진단 시작 ;)",
    readinessGate: "준비도 게이트",
    readinessQuestion: "지금 내면 패턴을 탐색할 준비가 어느 정도인가요?",
    high: "높음",
    medium: "중간",
    low: "낮음",
    diagnosticPaused: "진단 일시 중지",
    pausedMessage:
      "준비도가 낮게 감지되었습니다. 먼저 스트레스 신호를 관찰하고 주의가 안정된 뒤 다시 진행하세요.",
    returnToLanding: "처음으로",
    modeSelection: "모드 선택",
    quickScan: "퀵 스캔",
    quickScanDesc: "10분 · 10문항",
    deepScan: "딥 스캔",
    deepScanDesc: "25분 · 25~35개 적응형 문항",
    mediumHint: "준비도가 중간이면 자동으로 라이트 모드(10문항)로 진행됩니다.",
    mbtiOptional: "MBTI (선택)",
    mbtiPlaceholder: "건너뛰기 / 미정",
    mbtiHelp: "선택 참고값으로만 사용되며 결과를 고정하지 않습니다.",
    questionLabel: "문항",
    wordCount: "단어 수:",
    contextPlaceholder: "상세한 맥락을 작성하세요...",
    continue: "계속",
    selectOptionError: "계속하려면 하나를 선택하세요.",
    processingTitle: "진단 처리 중",
    processingDesc: "구조화된 인지 신호 분석을 실행 중입니다. 몇 초 걸릴 수 있습니다.",
    analysisFailed: "분석 실패:",
    retryAnalysis: "다시 시도",
    startOver: "처음부터",
    dashboard: "진단 대시보드",
    dashboardDesc: "상태 기반 인지 결과입니다. 성격 유형 분류는 없습니다.",
    functionRadar: "기능 레이더",
    activeStack: "활성 스택",
    shadowSpike: "섀도우 스파이크",
    functionLabel: "기능",
    activationScore: "활성 점수",
    reason: "이유",
    riskPattern: "리스크 패턴",
    correctiveAction: "교정 액션",
    runNewDiagnostic: "새 진단 실행",
  },
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
  const [language, setLanguage] = useState("EN");
  const [readiness, setReadiness] = useState("");
  const [mode, setMode] = useState("");
  const [mbtiDeclared, setMbtiDeclared] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [contextInput, setContextInput] = useState("");
  const [bipolarInput, setBipolarInput] = useState(4);
  const [choiceInput, setChoiceInput] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [processingError, setProcessingError] = useState("");
  const [analysisBase, setAnalysisBase] = useState(null);
  const [localizedResultMap, setLocalizedResultMap] = useState({});
  const [isTranslatingResult, setIsTranslatingResult] = useState(false);
  const [resultTranslateError, setResultTranslateError] = useState("");
  const adaptiveKeysRef = useRef(new Set());

  const currentQuestion = questions[questionIndex] || null;
  const visibleQuestion = useMemo(
    () => localizeQuestion(currentQuestion, language),
    [currentQuestion, language],
  );
  const progress = questions.length
    ? Math.round(((questionIndex + 1) / questions.length) * 100)
    : 0;

  const targetCount = useMemo(() => targetQuestionCount(readiness, mode), [readiness, mode]);
  const dictionary = COPY[language] || COPY.EN;
  const t = (key) => dictionary[key] || COPY.EN[key] || key;
  const result = useMemo(() => {
    if (localizedResultMap[language]) return localizedResultMap[language];
    return localizedResultMap.EN || analysisBase;
  }, [analysisBase, language, localizedResultMap]);

  function resetFlow() {
    setStage(STAGES.LANDING);
    setReadiness("");
    setMode("");
    setMbtiDeclared("");
    setQuestions([]);
    setQuestionIndex(0);
    setResponses([]);
    setContextInput("");
    setBipolarInput(4);
    setChoiceInput("");
    setFieldError("");
    setProcessingError("");
    setAnalysisBase(null);
    setLocalizedResultMap({});
    setIsTranslatingResult(false);
    setResultTranslateError("");
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

      setAnalysisBase(json);
      setLocalizedResultMap({ EN: json });
      setResultTranslateError("");
      setStage(STAGES.RESULTS);
    } catch (error) {
      setProcessingError(error.message || "Analysis failed.");
      setStage(STAGES.PROCESSING);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function localizeResult() {
      if (stage !== STAGES.RESULTS) return;
      if (!analysisBase) return;
      if (language === "EN") return;
      if (localizedResultMap[language]) return;

      setIsTranslatingResult(true);
      setResultTranslateError("");
      try {
        const response = await fetch("/api/translate-result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            target_language: language,
            result_base: {
              shadow_spike: {
                reason: analysisBase.shadow_spike?.reason || "",
              },
              risk_pattern: analysisBase.risk_pattern || "",
              corrective_action: analysisBase.corrective_action || "",
            },
          }),
        });
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json?.error || "Result translation failed.");
        }
        if (
          !json ||
          typeof json.shadow_spike_reason !== "string" ||
          typeof json.risk_pattern !== "string" ||
          typeof json.corrective_action !== "string"
        ) {
          throw new Error("Invalid translated result format.");
        }

        if (!cancelled) {
          const translated = {
            ...analysisBase,
            shadow_spike: {
              ...analysisBase.shadow_spike,
              reason: json.shadow_spike_reason,
            },
            risk_pattern: json.risk_pattern,
            corrective_action: json.corrective_action,
          };
          setLocalizedResultMap((prev) => ({ ...prev, [language]: translated }));
        }
      } catch (error) {
        if (!cancelled) {
          setResultTranslateError(error.message || "Result translation failed.");
        }
      } finally {
        if (!cancelled) setIsTranslatingResult(false);
      }
    }

    localizeResult();
    return () => {
      cancelled = true;
    };
  }, [analysisBase, language, localizedResultMap, stage]);

  function submitAnswer() {
    if (!currentQuestion) return;
    let formattedResponse;

    if (currentQuestion.type === "context") {
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
        setFieldError(t("selectOptionError"));
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
        mbti_declared: mbtiDeclared || null,
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
      <div className="mx-auto mb-4 flex w-full max-w-5xl justify-end gap-2">
        {LANGUAGE_OPTIONS.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            className={`rounded-md border px-3 py-1 text-xs font-medium ${
              language === code
                ? "border-sky-400 bg-sky-500/20 text-sky-100"
                : "border-slate-600 bg-slate-900/70 text-slate-300"
            }`}
          >
            {code}
          </button>
        ))}
      </div>
      {stage === STAGES.LANDING && (
        <section className={cardClass}>
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-sky-300">
            {t("appLabel")}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
          <p className="mt-4 text-slate-300">{t("subtitle")}</p>
          <button
            type="button"
            onClick={() => setStage(STAGES.READINESS)}
            className="mt-8 rounded-lg bg-sky-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-sky-400"
          >
            {t("startDiagnostic")}
          </button>
        </section>
      )}

      {stage === STAGES.READINESS && (
        <section className={cardClass}>
          <h2 className="text-2xl font-semibold">{t("readinessGate")}</h2>
          <p className="mt-3 text-slate-300">{t("readinessQuestion")}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { value: "high", label: t("high") },
              { value: "medium", label: t("medium") },
              { value: "low", label: t("low") },
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
          <h2 className="text-2xl font-semibold">{t("diagnosticPaused")}</h2>
          <p className="mt-3 text-slate-300">{t("pausedMessage")}</p>
          <button
            type="button"
            onClick={resetFlow}
            className="mt-6 rounded-lg border border-slate-500 px-4 py-2 text-sm transition hover:border-slate-300"
          >
            {t("returnToLanding")}
          </button>
        </section>
      )}

      {stage === STAGES.MODE && (
        <section className={cardClass}>
          <h2 className="text-2xl font-semibold">{t("modeSelection")}</h2>
          <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
            <label className="mb-2 block text-sm font-medium text-slate-200">{t("mbtiOptional")}</label>
            <select
              value={mbtiDeclared}
              onChange={(event) => setMbtiDeclared(event.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-sky-400 focus:ring"
            >
              <option value="">{t("mbtiPlaceholder")}</option>
              {MBTI_OPTIONS.filter(Boolean).map((mbti) => (
                <option key={mbti} value={mbti}>
                  {mbti}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-slate-400">{t("mbtiHelp")}</p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => startQuestionnaire("quick")}
              className="rounded-xl border border-slate-600 bg-slate-800/60 p-5 text-left transition hover:border-sky-400"
            >
              <h3 className="text-lg font-semibold">{t("quickScan")}</h3>
              <p className="mt-2 text-sm text-slate-300">{t("quickScanDesc")}</p>
            </button>
            <button
              type="button"
              onClick={() => startQuestionnaire("deep")}
              disabled={readiness === "medium"}
              className="rounded-xl border border-slate-600 bg-slate-800/60 p-5 text-left transition hover:border-sky-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <h3 className="text-lg font-semibold">{t("deepScan")}</h3>
              <p className="mt-2 text-sm text-slate-300">{t("deepScanDesc")}</p>
            </button>
          </div>
          {readiness === "medium" && (
            <p className="mt-4 text-sm text-amber-300">{t("mediumHint")}</p>
          )}
        </section>
      )}

      {stage === STAGES.QUESTIONNAIRE && visibleQuestion && (
        <section className={cardClass}>
          <div className="mb-4 flex items-center justify-between text-sm text-slate-300">
            <span>
              {t("questionLabel")} {questionIndex + 1} / {questions.length}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800">
            <div
              className="h-2 rounded-full bg-sky-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <h2 className="mt-6 text-xl font-semibold">{visibleQuestion.prompt}</h2>

          {visibleQuestion.type === "context" && (
            <div className="mt-5">
              <textarea
                value={contextInput}
                onChange={(event) => setContextInput(event.target.value)}
                rows={9}
                className="w-full rounded-xl border border-slate-600 bg-slate-950/80 p-4 text-sm text-slate-100 outline-none ring-sky-400 focus:ring"
                placeholder={t("contextPlaceholder")}
              />
              <p className="mt-2 text-xs text-slate-400">
                {t("wordCount")} {countWords(contextInput)}
              </p>
            </div>
          )}

          {visibleQuestion.type === "bipolar" && (
            <div className="mt-6">
              <div className="mb-3 flex justify-between text-sm text-slate-300">
                <span>{visibleQuestion.labels?.[0]}</span>
                <span>{visibleQuestion.labels?.[1]}</span>
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

          {visibleQuestion.type === "multiple_choice" && (
            <div className="mt-5 space-y-3">
              {visibleQuestion.options?.map((option) => (
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
                    name={visibleQuestion.id}
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
            {t("continue")}
          </button>
        </section>
      )}

      {stage === STAGES.PROCESSING && (
        <section className={cardClass}>
          <h2 className="text-2xl font-semibold">{t("processingTitle")}</h2>
          {!processingError && (
            <p className="mt-4 text-slate-300">{t("processingDesc")}</p>
          )}
          {processingError && (
            <div className="mt-4">
              <p className="text-rose-300">
                {t("analysisFailed")} {processingError}
              </p>
              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() =>
                    runAnalysis({
                      readiness,
                      mode,
                      mbti_declared: mbtiDeclared || null,
                      responses,
                    })
                  }
                  className="rounded-lg bg-sky-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-sky-400"
                >
                  {t("retryAnalysis")}
                </button>
                <button
                  type="button"
                  onClick={resetFlow}
                  className="rounded-lg border border-slate-500 px-4 py-2 text-sm transition hover:border-slate-300"
                >
                  {t("startOver")}
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {stage === STAGES.RESULTS && result && (
        <section className="mx-auto w-full max-w-5xl space-y-4">
          <header className={cardClass}>
            <h2 className="text-3xl font-semibold">{t("dashboard")}</h2>
            <p className="mt-2 text-sm text-slate-300">{t("dashboardDesc")}</p>
            {language !== "EN" && isTranslatingResult && (
              <p className="mt-2 text-xs text-sky-300">Translating result for {language}...</p>
            )}
            {resultTranslateError && (
              <p className="mt-2 text-xs text-amber-300">
                Translation fallback to base result: {resultTranslateError}
              </p>
            )}
          </header>

          <div className="grid gap-4 lg:grid-cols-2">
            <article className={cardClass}>
              <h3 className="text-xl font-semibold">{t("functionRadar")}</h3>
              <div className="mt-4">
                <RadarChart scores={result.function_scores} />
              </div>
            </article>

            <article className={cardClass}>
              <h3 className="text-xl font-semibold">{t("activeStack")}</h3>
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
            <h3 className="text-xl font-semibold">{t("shadowSpike")}</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-3">
                <p className="text-xs uppercase text-slate-400">{t("functionLabel")}</p>
                <p className="mt-1 text-lg">{result.shadow_spike.function}</p>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-3">
                <p className="text-xs uppercase text-slate-400">{t("activationScore")}</p>
                <p className="mt-1 text-lg">{result.shadow_spike.score}</p>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-3 sm:col-span-1">
                <p className="text-xs uppercase text-slate-400">{t("reason")}</p>
                <p className="mt-1 text-sm text-slate-200">{result.shadow_spike.reason}</p>
              </div>
            </div>
          </article>

          <div className="grid gap-4 lg:grid-cols-2">
            <article className={cardClass}>
              <h3 className="text-xl font-semibold">{t("riskPattern")}</h3>
              <p className="mt-3 text-sm text-slate-200">{capWords(result.risk_pattern, 120)}</p>
            </article>

            <article className={cardClass}>
              <h3 className="text-xl font-semibold">{t("correctiveAction")}</h3>
              <p className="mt-3 text-sm text-slate-200">{result.corrective_action}</p>
            </article>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={resetFlow}
              className="rounded-lg border border-slate-500 px-4 py-2 text-sm transition hover:border-slate-300"
            >
              {t("runNewDiagnostic")}
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
