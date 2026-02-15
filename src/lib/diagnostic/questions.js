const QUICK_QUESTIONS = [
  {
    id: "q-context-1",
    type: "context",
    prompt:
      "Describe a recent high-pressure situation. Focus on what happened, what signals you paid attention to, and how you decided your next move.",
    minWords: 120,
  },
  {
    id: "q-bipolar-1",
    type: "bipolar",
    axis: "Ti-Te",
    prompt:
      "When solving a problem under time pressure, where do you naturally lean right now?",
    labels: ["Internal logic precision (Ti)", "External execution results (Te)"],
  },
  {
    id: "q-mc-1",
    type: "multiple_choice",
    patternKey: "signal_preference",
    prompt: "Which signal do you trust first when uncertainty increases?",
    options: [
      { value: "observable_metrics", label: "Observable metrics and direct facts" },
      { value: "future_pattern", label: "Future pattern implications" },
      { value: "past_reference", label: "Past precedents and known baselines" },
      { value: "social_temperature", label: "Social temperature and relational shifts" },
    ],
  },
  {
    id: "q-bipolar-2",
    type: "bipolar",
    axis: "Ni-Ne",
    prompt: "In ambiguous planning, what style dominates your thought process?",
    labels: ["Single convergent trajectory (Ni)", "Multiple divergent possibilities (Ne)"],
  },
  {
    id: "q-context-2",
    type: "context",
    prompt:
      "Describe a recent misunderstanding. Explain what you assumed, what you missed, and how your internal framing changed after new information appeared.",
    minWords: 120,
  },
  {
    id: "q-bipolar-3",
    type: "bipolar",
    axis: "Fi-Fe",
    prompt: "During interpersonal friction, what do you prioritize first?",
    labels: ["Inner value alignment (Fi)", "Group harmony calibration (Fe)"],
  },
  {
    id: "q-mc-2",
    type: "multiple_choice",
    patternKey: "decision_lock",
    prompt: "When forced to decide quickly, what best describes your pattern?",
    options: [
      { value: "lock_then_execute", label: "Lock a direction and execute immediately" },
      { value: "keep_open_longer", label: "Keep options open as long as possible" },
      { value: "consult_people", label: "Calibrate with people before deciding" },
      { value: "recheck_framework", label: "Re-check internal framework first" },
    ],
  },
  {
    id: "q-bipolar-4",
    type: "bipolar",
    axis: "Si-Se",
    prompt: "What dominates your awareness in dynamic environments?",
    labels: ["Reference stability and known cues (Si)", "Immediate sensory data (Se)"],
  },
  {
    id: "q-mc-3",
    type: "multiple_choice",
    patternKey: "recovery_pattern",
    prompt: "After cognitive overload, what is your first reset behavior?",
    options: [
      { value: "structured_reset", label: "Rebuild structure and sequence" },
      { value: "physical_reset", label: "Move, act, and physically reset" },
      { value: "reflective_reset", label: "Step back and reflect internally" },
      { value: "social_reset", label: "Regulate through social interaction" },
    ],
  },
  {
    id: "q-bipolar-5",
    type: "bipolar",
    axis: "Te-Ti",
    prompt: "When quality and speed conflict, what wins today?",
    labels: ["Output and delivery timing (Te)", "Logical coherence and internal model (Ti)"],
  },
];

const DEEP_CORE_QUESTIONS = [
  ...QUICK_QUESTIONS,
  {
    id: "d-bipolar-6",
    type: "bipolar",
    axis: "Ne-Ni",
    prompt: "In strategic exploration, which mode appears most often?",
    labels: ["Generate many options (Ne)", "Collapse into one core direction (Ni)"],
  },
  {
    id: "d-mc-4",
    type: "multiple_choice",
    patternKey: "conflict_lens",
    prompt: "In team conflict, what do you scan first?",
    options: [
      { value: "intent_mismatch", label: "Mismatch of intent and values" },
      { value: "process_breakdown", label: "Process and role breakdown" },
      { value: "data_gap", label: "Missing or low-quality data" },
      { value: "timing_misalignment", label: "Timing and pacing mismatch" },
    ],
  },
  {
    id: "d-context-3",
    type: "context",
    prompt:
      "Describe a moment when your usual strategy failed. Detail the trigger, your immediate internal reaction, and the corrective adjustment you attempted.",
    minWords: 120,
  },
  {
    id: "d-bipolar-7",
    type: "bipolar",
    axis: "Se-Si",
    prompt: "Under surprise changes, what dominates your response?",
    labels: ["Immediate action in present context (Se)", "Compare against known patterns (Si)"],
  },
  {
    id: "d-mc-5",
    type: "multiple_choice",
    patternKey: "execution_bias",
    prompt: "When momentum drops, your default move is:",
    options: [
      { value: "tighten_system", label: "Tighten system and constraints" },
      { value: "seek_new_angles", label: "Seek fresh conceptual angles" },
      { value: "reconnect_values", label: "Reconnect with personal meaning" },
      { value: "increase_external_pressure", label: "Increase external pressure and deadlines" },
    ],
  },
  {
    id: "d-bipolar-8",
    type: "bipolar",
    axis: "Fe-Fi",
    prompt: "When evaluating a hard tradeoff, what carries more weight?",
    labels: ["Collective impact and alignment (Fe)", "Personal value integrity (Fi)"],
  },
  {
    id: "d-context-4",
    type: "context",
    prompt:
      "Map your last 7 days: where did your attention repeatedly go, what drained you, and what pattern do you think is overactive right now?",
    minWords: 120,
  },
  {
    id: "d-mc-6",
    type: "multiple_choice",
    patternKey: "learning_mode",
    prompt: "When learning something difficult, which approach do you default to?",
    options: [
      { value: "model_first", label: "Build conceptual model first" },
      { value: "practice_first", label: "Practice immediately and iterate" },
      { value: "reference_first", label: "Collect trusted references first" },
      { value: "mentor_feedback", label: "Seek external feedback loops" },
    ],
  },
  {
    id: "d-bipolar-9",
    type: "bipolar",
    axis: "Ti-Fi",
    prompt: "When your judgment feels uncertain, what dominates first?",
    labels: ["Internal logical coherence (Ti)", "Personal value congruence (Fi)"],
  },
  {
    id: "d-mc-7",
    type: "multiple_choice",
    patternKey: "pressure_signal",
    prompt: "Under pressure, which sign appears earliest?",
    options: [
      { value: "over_control", label: "Over-controlling structure and outcomes" },
      { value: "over_ideation", label: "Excessive ideation without closure" },
      { value: "social_defensiveness", label: "Defensive social calibration" },
      { value: "sensory_tunnel", label: "Narrow sensory tunnel focus" },
    ],
  },
  {
    id: "d-context-5",
    type: "context",
    prompt:
      "Write about a decision you postponed recently. Explain which internal conflicts delayed action and what would have helped resolve them earlier.",
    minWords: 120,
  },
  {
    id: "d-bipolar-10",
    type: "bipolar",
    axis: "Te-Fe",
    prompt: "When coordinating people toward a target, what leads?",
    labels: ["Structure, roles, and measurable output (Te)", "Relational alignment and morale (Fe)"],
  },
  {
    id: "d-mc-8",
    type: "multiple_choice",
    patternKey: "feedback_response",
    prompt: "When receiving unexpected negative feedback, what is your first move?",
    options: [
      { value: "verify_logic", label: "Verify logic and evidence" },
      { value: "repair_relations", label: "Repair relational tension" },
      { value: "collect_more_data", label: "Collect broader data first" },
      { value: "act_immediately", label: "Act immediately and iterate" },
    ],
  },
  {
    id: "d-context-6",
    type: "context",
    prompt:
      "Describe a moment you felt cognitively scattered. Identify triggers, what you prioritized, and what pattern in your processing you want to correct.",
    minWords: 120,
  },
  {
    id: "d-bipolar-11",
    type: "bipolar",
    axis: "Ne-Si",
    prompt: "When balancing novelty with reliability, where do you land today?",
    labels: ["Novel options and exploration (Ne)", "Consistency and known stability (Si)"],
  },
];

const ADAPTIVE_FOLLOW_UP = {
  "Ti-Te": {
    low: {
      type: "multiple_choice",
      patternKey: "ti_te_low",
      prompt:
        "When logic clarity is weak, what usually caused it in your recent cycle?",
      options: [
        { value: "context_switching", label: "Too many context switches" },
        { value: "metric_pressure", label: "Metric pressure over analysis" },
        { value: "social_noise", label: "Social noise interfered" },
        { value: "unclear_scope", label: "Scope was unclear" },
      ],
    },
    high: {
      type: "context",
      minWords: 120,
      prompt:
        "Describe one case where strong execution or logic confidence caused a blind spot. What did you miss and why?",
    },
  },
  "Ni-Ne": {
    low: {
      type: "multiple_choice",
      patternKey: "ni_ne_low",
      prompt: "When future framing fails, what appears first?",
      options: [
        { value: "narrow_tunnel", label: "Over-narrow tunnel view" },
        { value: "too_many_paths", label: "Too many competing paths" },
        { value: "reactive_mode", label: "Purely reactive mode" },
        { value: "missing_signal", label: "Missing critical signal" },
      ],
    },
    high: {
      type: "context",
      minWords: 120,
      prompt:
        "Give one recent example where your forecasting pattern dominated action. What was accurate and what was distorted?",
    },
  },
  "Fi-Fe": {
    low: {
      type: "multiple_choice",
      patternKey: "fi_fe_low",
      prompt: "When value alignment is weak, what do you do first?",
      options: [
        { value: "suppress_signal", label: "Suppress and continue" },
        { value: "seek_consensus", label: "Seek rapid consensus" },
        { value: "withdraw_reflect", label: "Withdraw to reflect" },
        { value: "formalize_boundary", label: "Formalize a boundary" },
      ],
    },
    high: {
      type: "context",
      minWords: 120,
      prompt:
        "Describe a high-emotion decision from this month. Which internal or social values drove the outcome?",
    },
  },
  "Si-Se": {
    low: {
      type: "multiple_choice",
      patternKey: "si_se_low",
      prompt: "When environmental signal handling is weak, what usually breaks?",
      options: [
        { value: "missed_details", label: "Missed concrete details" },
        { value: "over_attachment_history", label: "Over-attachment to historical pattern" },
        { value: "impulse_actions", label: "Impulse reactions" },
        { value: "slow_reorientation", label: "Slow reorientation" },
      ],
    },
    high: {
      type: "context",
      minWords: 120,
      prompt:
        "Recall a fast-changing event where your sensory attention dominated. What did that help, and what did it hide?",
    },
  },
};

export function getQuestionSet({ readiness, mode }) {
  if (readiness === "medium") {
    return QUICK_QUESTIONS.map((question) => ({ ...question }));
  }

  if (mode === "quick") {
    return QUICK_QUESTIONS.map((question) => ({ ...question }));
  }

  return DEEP_CORE_QUESTIONS.map((question) => ({ ...question }));
}

export function maybeGetAdaptiveQuestion(question, score, insertedKeys) {
  if (question.type !== "bipolar") return null;
  const entry = ADAPTIVE_FOLLOW_UP[question.axis];
  if (!entry) return null;

  let direction = null;
  if (score <= 2) direction = "low";
  if (score >= 6) direction = "high";
  if (!direction) return null;

  const adaptiveKey = `${question.axis}:${direction}`;
  if (insertedKeys.has(adaptiveKey)) return null;
  insertedKeys.add(adaptiveKey);

  const template = entry[direction];
  return {
    id: `adaptive-${adaptiveKey.toLowerCase()}`,
    ...template,
    adaptive: true,
  };
}

export function targetQuestionCount(readiness, mode) {
  if (readiness === "medium" || mode === "quick") return 10;
  return 25;
}
