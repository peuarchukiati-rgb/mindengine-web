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

const BIPOLAR_LABEL_TRANSLATIONS = {
  TH: {
    "Ti-Te": ["ตรรกะภายในที่แม่นยำ (Ti)", "ผลลัพธ์เชิงปฏิบัติภายนอก (Te)"],
    "Te-Ti": ["ผลลัพธ์และความเร็วในการส่งมอบ (Te)", "ความสอดคล้องเชิงตรรกะภายใน (Ti)"],
    "Ni-Ne": ["ทิศทางเดียวที่บีบเข้ม (Ni)", "ความเป็นไปได้หลายทาง (Ne)"],
    "Ne-Ni": ["สร้างทางเลือกจำนวนมาก (Ne)", "สรุปเป็นทิศทางหลักเดียว (Ni)"],
    "Fi-Fe": ["ความสอดคล้องกับคุณค่าภายใน (Fi)", "การปรับให้สอดคล้องกับกลุ่ม (Fe)"],
    "Fe-Fi": ["ผลกระทบและความสอดคล้องต่อส่วนรวม (Fe)", "ความซื่อตรงต่อคุณค่าส่วนบุคคล (Fi)"],
    "Si-Se": ["ยึดสัญญาณจากแบบแผนเดิม (Si)", "รับข้อมูลประสาทสัมผัสปัจจุบันทันที (Se)"],
    "Se-Si": ["ลงมือทันทีในสถานการณ์ตรงหน้า (Se)", "เทียบกับแบบแผนที่คุ้นเคย (Si)"],
    "Ti-Fi": ["ความกลมกลืนเชิงตรรกะภายใน (Ti)", "ความสอดคล้องกับคุณค่าตนเอง (Fi)"],
    "Te-Fe": ["โครงสร้าง บทบาท และผลลัพธ์ที่วัดได้ (Te)", "ความสัมพันธ์และขวัญกำลังใจร่วม (Fe)"],
    "Ne-Si": ["สำรวจทางเลือกใหม่ (Ne)", "คงความเสถียรที่คุ้นเคย (Si)"],
  },
  JP: {
    "Ti-Te": ["内的論理の精度 (Ti)", "外的実行の成果 (Te)"],
    "Te-Ti": ["成果と納期優先 (Te)", "内的論理の一貫性 (Ti)"],
    "Ni-Ne": ["収束した単一の見通し (Ni)", "拡散した複数の可能性 (Ne)"],
    "Ne-Ni": ["多くの選択肢を生成 (Ne)", "1つの中核方向へ収束 (Ni)"],
    "Fi-Fe": ["個人の価値整合性 (Fi)", "集団の調和調整 (Fe)"],
    "Fe-Fi": ["集団への影響と整合性 (Fe)", "個人価値の一貫性 (Fi)"],
    "Si-Se": ["既知の手がかりと安定参照 (Si)", "現在の感覚データ重視 (Se)"],
    "Se-Si": ["現場で即応する (Se)", "既知パターンと照合する (Si)"],
    "Ti-Fi": ["内的論理の整合 (Ti)", "個人価値との一致 (Fi)"],
    "Te-Fe": ["構造・役割・測定可能成果 (Te)", "関係調整と士気 (Fe)"],
    "Ne-Si": ["新規性と探索 (Ne)", "既知の安定性 (Si)"],
  },
  KR: {
    "Ti-Te": ["내적 논리 정밀성 (Ti)", "외적 실행 결과 (Te)"],
    "Te-Ti": ["산출과 일정 우선 (Te)", "내적 논리 일관성 (Ti)"],
    "Ni-Ne": ["하나의 수렴된 경로 (Ni)", "다수의 확산된 가능성 (Ne)"],
    "Ne-Ni": ["여러 선택지를 생성 (Ne)", "핵심 방향 하나로 수렴 (Ni)"],
    "Fi-Fe": ["내적 가치 정합성 (Fi)", "집단 조화 조정 (Fe)"],
    "Fe-Fi": ["집단 영향과 정렬 (Fe)", "개인 가치 일관성 (Fi)"],
    "Si-Se": ["기존 기준과 안정 단서 (Si)", "현재 감각 데이터 우선 (Se)"],
    "Se-Si": ["현장에서 즉각 대응 (Se)", "익숙한 패턴과 비교 (Si)"],
    "Ti-Fi": ["내적 논리 정합 (Ti)", "개인 가치 합치 (Fi)"],
    "Te-Fe": ["구조·역할·측정 가능한 성과 (Te)", "관계 정렬과 팀 분위기 (Fe)"],
    "Ne-Si": ["새 가능성 탐색 (Ne)", "검증된 안정성 유지 (Si)"],
  },
};

const OPTION_LABEL_TRANSLATIONS = {
  TH: {
    observable_metrics: "ตัวชี้วัดที่สังเกตได้และข้อเท็จจริงโดยตรง",
    future_pattern: "แนวโน้มและผลกระทบในอนาคต",
    past_reference: "แบบอย่างที่ผ่านมาและฐานอ้างอิงเดิม",
    social_temperature: "อุณหภูมิทางสังคมและความสัมพันธ์",
    lock_then_execute: "ล็อกทิศทางแล้วลงมือทันที",
    keep_open_longer: "เปิดทางเลือกไว้นานที่สุด",
    consult_people: "คาลิเบรตกับคนก่อนตัดสินใจ",
    recheck_framework: "ย้อนตรวจกรอบคิดภายในก่อน",
    structured_reset: "รีเซ็ตด้วยโครงสร้างและลำดับใหม่",
    physical_reset: "ขยับร่างกายแล้วรีเซ็ต",
    reflective_reset: "ถอยมาทบทวนภายใน",
    social_reset: "รีเซ็ตผ่านปฏิสัมพันธ์กับคน",
    intent_mismatch: "เจตนาและคุณค่าไม่ตรงกัน",
    process_breakdown: "กระบวนการและบทบาทมีรอยแตก",
    data_gap: "ข้อมูลไม่พอหรือคุณภาพต่ำ",
    timing_misalignment: "จังหวะเวลาไม่สอดคล้อง",
    tighten_system: "ทำระบบให้เข้มและชัดขึ้น",
    seek_new_angles: "หาแนวคิดใหม่เพิ่ม",
    reconnect_values: "กลับไปเชื่อมกับความหมายส่วนตัว",
    increase_external_pressure: "เพิ่มแรงกดดันและ deadline ภายนอก",
    model_first: "สร้างโมเดลความเข้าใจก่อน",
    practice_first: "ลงมือทำทันทีแล้ววนปรับ",
    reference_first: "รวบรวมแหล่งอ้างอิงที่เชื่อถือก่อน",
    mentor_feedback: "ขอฟีดแบ็กจากคนที่มีประสบการณ์",
    over_control: "ควบคุมโครงสร้างและผลลัพธ์มากเกินไป",
    over_ideation: "คิดทางเลือกมากเกินจนไม่ปิดงาน",
    social_defensiveness: "ป้องกันตัวทางสังคมเร็วเกินไป",
    sensory_tunnel: "โฟกัสสิ่งกระตุ้นตรงหน้าจนแคบ",
    verify_logic: "ตรวจตรรกะและหลักฐานก่อน",
    repair_relations: "ซ่อมความสัมพันธ์ก่อน",
    collect_more_data: "เก็บข้อมูลเพิ่มก่อนตัดสิน",
    act_immediately: "ลงมือทันทีแล้วค่อยปรับ",
    context_switching: "สลับบริบทบ่อยเกินไป",
    metric_pressure: "แรงกดดันจากตัวชี้วัดกลบการวิเคราะห์",
    social_noise: "สัญญาณสังคมรบกวนมาก",
    unclear_scope: "ขอบเขตงานไม่ชัด",
    narrow_tunnel: "มุมมองแคบเกินไป",
    too_many_paths: "มีเส้นทางแข่งขันมากเกินไป",
    reactive_mode: "ตอบสนองเฉพาะหน้าอย่างเดียว",
    missing_signal: "พลาดสัญญาณสำคัญ",
    suppress_signal: "กดสัญญาณไว้แล้วไปต่อ",
    seek_consensus: "รีบหาฉันทามติ",
    withdraw_reflect: "ถอยออกมาทบทวน",
    formalize_boundary: "กำหนดขอบเขตชัดเจน",
    missed_details: "พลาดรายละเอียดเชิงรูปธรรม",
    over_attachment_history: "ยึดติดกับอดีตมากเกิน",
    impulse_actions: "ตอบสนองแบบหุนหัน",
    slow_reorientation: "ปรับทิศช้าเกินไป",
  },
  JP: {
    observable_metrics: "観測可能な指標と直接的な事実",
    future_pattern: "将来のパターンと示唆",
    past_reference: "過去事例と既知の基準",
    social_temperature: "社会的温度感と関係変化",
    lock_then_execute: "方向を固めて即実行する",
    keep_open_longer: "選択肢をできるだけ長く保持する",
    consult_people: "人と調整してから決める",
    recheck_framework: "内的フレームを再確認する",
    structured_reset: "構造と順序を再構築する",
    physical_reset: "身体を動かしてリセットする",
    reflective_reset: "一度引いて内省する",
    social_reset: "対人接触で調整する",
    intent_mismatch: "意図と価値観の不一致",
    process_breakdown: "プロセスと役割の崩れ",
    data_gap: "データ不足または品質不足",
    timing_misalignment: "タイミングの不整合",
    tighten_system: "システムと制約を引き締める",
    seek_new_angles: "新しい視点を探す",
    reconnect_values: "個人の意味に再接続する",
    increase_external_pressure: "外圧と締切を強める",
    model_first: "まず概念モデルを作る",
    practice_first: "まず実践して反復する",
    reference_first: "まず信頼できる参照を集める",
    mentor_feedback: "外部フィードバックを求める",
    over_control: "構造と結果を過剰に制御する",
    over_ideation: "発想過多で収束しない",
    social_defensiveness: "対人防衛が先に立つ",
    sensory_tunnel: "感覚フォーカスが過度に狭まる",
    verify_logic: "論理と根拠を確認する",
    repair_relations: "関係修復を先に行う",
    collect_more_data: "追加データを集める",
    act_immediately: "すぐ実行して調整する",
    context_switching: "コンテキスト切替が多すぎる",
    metric_pressure: "指標圧力で分析が潰れる",
    social_noise: "社会的ノイズが多い",
    unclear_scope: "スコープが不明瞭",
    narrow_tunnel: "視野が過度に狭い",
    too_many_paths: "経路が多すぎる",
    reactive_mode: "反応モードのみになる",
    missing_signal: "重要シグナルの見落とし",
    suppress_signal: "信号を抑えて進める",
    seek_consensus: "急いで合意形成する",
    withdraw_reflect: "引いて振り返る",
    formalize_boundary: "境界を明文化する",
    missed_details: "具体的詳細を見落とす",
    over_attachment_history: "過去参照への過剰依存",
    impulse_actions: "衝動的に反応する",
    slow_reorientation: "再定位が遅い",
  },
  KR: {
    observable_metrics: "관찰 가능한 지표와 직접 사실",
    future_pattern: "미래 패턴과 파급",
    past_reference: "과거 사례와 기존 기준",
    social_temperature: "사회적 분위기와 관계 변화",
    lock_then_execute: "방향을 고정하고 즉시 실행",
    keep_open_longer: "선택지를 최대한 오래 유지",
    consult_people: "사람들과 조율 후 결정",
    recheck_framework: "내적 프레임워크 재점검",
    structured_reset: "구조와 순서를 재정렬",
    physical_reset: "몸을 움직여 리셋",
    reflective_reset: "물러나 내적으로 성찰",
    social_reset: "사회적 상호작용으로 조절",
    intent_mismatch: "의도와 가치 불일치",
    process_breakdown: "프로세스/역할 붕괴",
    data_gap: "데이터 부족 또는 품질 저하",
    timing_misalignment: "타이밍 불일치",
    tighten_system: "시스템과 제약 강화",
    seek_new_angles: "새로운 관점 탐색",
    reconnect_values: "개인적 의미와 재연결",
    increase_external_pressure: "외부 압박과 데드라인 강화",
    model_first: "개념 모델부터 구축",
    practice_first: "바로 실행하며 반복 개선",
    reference_first: "신뢰 가능한 참고자료부터 수집",
    mentor_feedback: "외부 피드백 루프 확보",
    over_control: "구조와 결과를 과도하게 통제",
    over_ideation: "아이디어 과다로 수렴 실패",
    social_defensiveness: "사회적 방어 반응이 먼저",
    sensory_tunnel: "감각적 주의가 과도하게 좁아짐",
    verify_logic: "논리와 근거부터 검증",
    repair_relations: "관계 긴장부터 복구",
    collect_more_data: "데이터를 더 수집",
    act_immediately: "즉시 실행 후 조정",
    context_switching: "맥락 전환이 너무 잦음",
    metric_pressure: "지표 압박이 분석을 압도",
    social_noise: "사회적 노이즈가 큼",
    unclear_scope: "범위가 불명확함",
    narrow_tunnel: "시야가 지나치게 좁아짐",
    too_many_paths: "경로가 너무 많음",
    reactive_mode: "반응 모드로만 작동",
    missing_signal: "핵심 신호 누락",
    suppress_signal: "신호를 억누르고 진행",
    seek_consensus: "빠르게 합의 시도",
    withdraw_reflect: "물러나 성찰",
    formalize_boundary: "경계를 명확히 문서화",
    missed_details: "구체적 디테일 누락",
    over_attachment_history: "과거 패턴에 과도하게 집착",
    impulse_actions: "충동적으로 반응",
    slow_reorientation: "재정렬 속도가 느림",
  },
};

const QUESTION_PROMPT_TRANSLATIONS = {
  TH: {
    "q-context-1":
      "เล่าเหตุการณ์กดดันล่าสุดของคุณ โดยโฟกัสว่าเกิดอะไรขึ้น คุณให้ความสนใจกับสัญญาณไหน และตัดสินใจก้าวถัดไปอย่างไร",
    "q-bipolar-1": "เมื่อแก้ปัญหาภายใต้แรงกดดันเวลา ตอนนี้คุณเอนเอียงไปทางไหนตามธรรมชาติ?",
    "q-mc-1": "เมื่อความไม่แน่นอนเพิ่มขึ้น คุณเชื่อสัญญาณไหนก่อน?",
    "q-bipolar-2": "เมื่อวางแผนในสถานการณ์คลุมเครือ วิธีคิดแบบไหนนำหน้าที่สุด?",
    "q-context-2":
      "เล่าความเข้าใจคลาดเคลื่อนที่เกิดขึ้นไม่นานนี้ ว่าคุณตั้งสมมติฐานอะไร พลาดอะไร และกรอบคิดภายในเปลี่ยนไปอย่างไรเมื่อได้ข้อมูลใหม่",
    "q-bipolar-3": "เมื่อเกิดแรงเสียดทานกับผู้อื่น คุณให้ความสำคัญกับอะไรก่อน?",
    "q-mc-2": "เมื่อถูกบังคับให้ตัดสินใจเร็ว รูปแบบที่ตรงกับคุณที่สุดคืออะไร?",
    "q-bipolar-4": "ในสภาพแวดล้อมที่เปลี่ยนเร็ว คุณรับรู้อะไรเด่นที่สุด?",
    "q-mc-3": "หลังภาวะ cognitive overload พฤติกรรมรีเซ็ตแรกของคุณคืออะไร?",
    "q-bipolar-5": "เมื่อคุณภาพกับความเร็วขัดกัน วันนี้อะไรชนะ?",
    "d-bipolar-6": "ระหว่างสำรวจเชิงกลยุทธ์ โหมดไหนโผล่บ่อยที่สุด?",
    "d-mc-4": "เมื่อทีมมีความขัดแย้ง คุณสแกนอะไรเป็นอย่างแรก?",
    "d-context-3":
      "เล่าช่วงที่กลยุทธ์เดิมของคุณใช้ไม่ได้ผล ระบุจุดกระตุ้น ปฏิกิริยาภายในทันที และการปรับแก้ที่คุณลองทำ",
    "d-bipolar-7": "เมื่อเจอการเปลี่ยนแปลงแบบไม่คาดคิด อะไรนำการตอบสนองของคุณ?",
    "d-mc-5": "เมื่อโมเมนตัมตก คุณขยับแบบไหนเป็นค่าเริ่มต้น?",
    "d-bipolar-8": "เวลาประเมิน tradeoff ที่ยาก อะไรมีน้ำหนักมากกว่า?",
    "d-context-4":
      "ทบทวน 7 วันที่ผ่านมา: ความสนใจคุณไปซ้ำๆ ที่ไหน อะไรทำให้หมดแรง และตอนนี้รูปแบบใดในตัวคุณที่อาจ overactive",
    "d-mc-6": "เมื่อเรียนสิ่งยาก คุณเริ่มจากแนวทางไหนตามปกติ?",
    "d-bipolar-9": "เมื่อการตัดสินเริ่มไม่มั่นใจ อะไรนำมาก่อน?",
    "d-mc-7": "ภายใต้แรงกดดัน สัญญาณใดมักเกิดก่อน?",
    "d-context-5":
      "เขียนถึงการตัดสินใจที่คุณเลื่อนออกไปล่าสุด ความขัดแย้งภายในอะไรที่ทำให้ช้า และอะไรจะช่วยให้ตัดสินได้เร็วขึ้น",
    "d-bipolar-10": "เมื่อพาทีมไปสู่เป้าหมาย อะไรเป็นตัวนำ?",
    "d-mc-8": "เมื่อได้รับฟีดแบ็กเชิงลบที่ไม่คาดคิด คุณทำอะไรก่อน?",
    "d-context-6":
      "เล่าช่วงที่คุณรู้สึกว่าความคิดกระจัดกระจาย ระบุ trigger สิ่งที่คุณจัดลำดับก่อน และรูปแบบที่อยากแก้",
    "d-bipolar-11": "เมื่อบาลานซ์ความใหม่กับความเสถียร ตอนนี้คุณอยู่ด้านไหน?",
    "adaptive-ti-te:low": "เมื่อความชัดเจนเชิงตรรกะต่ำ สาเหตุหลักในรอบล่าสุดของคุณคืออะไร?",
    "adaptive-ti-te:high":
      "เล่ากรณีหนึ่งที่ความมั่นใจด้าน execution หรือตรรกะสูงเกินไปจนเกิด blind spot คุณพลาดอะไรและเพราะอะไร",
    "adaptive-ni-ne:low": "เมื่อการมองอนาคตล้มเหลว สิ่งใดมักเกิดก่อน?",
    "adaptive-ni-ne:high":
      "ยกตัวอย่างล่าสุดที่รูปแบบการคาดการณ์ของคุณนำการกระทำ อะไรแม่นและอะไรบิดเบี้ยว",
    "adaptive-fi-fe:low": "เมื่อความสอดคล้องกับคุณค่าอ่อนลง คุณทำอะไรเป็นอย่างแรก?",
    "adaptive-fi-fe:high":
      "เล่าการตัดสินใจที่อารมณ์สูงในเดือนนี้ คุณค่าภายในหรือสังคมใดนำผลลัพธ์",
    "adaptive-si-se:low": "เมื่อการรับสัญญาณสภาพแวดล้อมอ่อนลง อะไรพังบ่อยที่สุด?",
    "adaptive-si-se:high":
      "นึกถึงเหตุการณ์ที่เปลี่ยนเร็วซึ่งความสนใจเชิงประสาทสัมผัสของคุณนำเกม สิ่งนั้นช่วยอะไรและบดบังอะไร",
  },
  JP: {
    "q-context-1":
      "最近の高圧状況を説明してください。何が起き、どの信号に注意し、次の一手をどう決めたかを具体的に書いてください。",
    "q-bipolar-1": "時間圧の中で問題解決するとき、今のあなたはどちらに自然に傾きますか？",
    "q-mc-1": "不確実性が高まるとき、最初に信頼する信号はどれですか？",
    "q-bipolar-2": "曖昧な計画場面で、どの思考スタイルが優勢ですか？",
    "q-context-2":
      "最近の誤解を1つ説明してください。何を前提にし、何を見落とし、新情報で内的フレームがどう変化したかを書いてください。",
    "q-bipolar-3": "対人摩擦が起きたとき、最初に優先するものは何ですか？",
    "q-mc-2": "迅速な意思決定を迫られたとき、最も近いパターンはどれですか？",
    "q-bipolar-4": "動的な環境で、あなたの注意は何に最も向きますか？",
    "q-mc-3": "認知的オーバーロード後、最初のリセット行動は何ですか？",
    "q-bipolar-5": "品質と速度が衝突したとき、今日のあなたはどちらを優先しますか？",
    "d-bipolar-6": "戦略探索で最も頻出するモードはどれですか？",
    "d-mc-4": "チーム対立時、最初にスキャンするのは何ですか？",
    "d-context-3":
      "普段の戦略が機能しなかった場面を説明してください。引き金、直後の内的反応、試した修正を具体的に書いてください。",
    "d-bipolar-7": "予想外の変化に直面したとき、何が反応を主導しますか？",
    "d-mc-5": "勢いが落ちたとき、あなたのデフォルト行動は何ですか？",
    "d-bipolar-8": "難しいトレードオフ評価で、より重みが乗るのはどちらですか？",
    "d-context-4":
      "直近7日を振り返ってください。注意が繰り返し向いた先、消耗要因、現在過活動だと思うパターンを記述してください。",
    "d-mc-6": "難しい学習課題に取り組むとき、最初に取る方法はどれですか？",
    "d-bipolar-9": "判断に迷いが出たとき、最初に強く働くのはどちらですか？",
    "d-mc-7": "プレッシャー下で最も早く現れる兆候はどれですか？",
    "d-context-5":
      "最近先送りした意思決定について書いてください。遅延させた内的葛藤と、早く解決するために必要だった要素を述べてください。",
    "d-bipolar-10": "人を目標へ導くとき、どちらが主導しますか？",
    "d-mc-8": "予期しないネガティブフィードバックを受けたとき、最初に取る行動はどれですか？",
    "d-context-6":
      "認知が散漫になった瞬間を説明してください。引き金、優先したもの、修正したい処理パターンを書いてください。",
    "d-bipolar-11": "新規性と安定性を両立させるとき、今はどちらに寄っていますか？",
    "adaptive-ti-te:low": "論理の明瞭さが弱いとき、最近のサイクルで主因だったものは何ですか？",
    "adaptive-ti-te:high":
      "実行力または論理への強い確信が盲点を生んだ事例を1つ記述してください。何を見落とし、なぜそうなったか。",
    "adaptive-ni-ne:low": "未来フレーミングが崩れるとき、最初に何が起こりますか？",
    "adaptive-ni-ne:high":
      "最近、予測パターンが行動を主導した例を挙げてください。何が正確で、何が歪んでいましたか？",
    "adaptive-fi-fe:low": "価値整合が弱いとき、最初に取る行動は何ですか？",
    "adaptive-fi-fe:high":
      "今月の高感情な意思決定を1つ記述してください。内的価値または社会的価値のどちらが結果を主導しましたか？",
    "adaptive-si-se:low": "環境信号処理が弱いとき、最初に崩れやすいのは何ですか？",
    "adaptive-si-se:high":
      "急変イベントで感覚的注意が支配的だった事例を思い出してください。それは何を助け、何を見えなくしましたか？",
  },
  KR: {
    "q-context-1":
      "최근의 고압 상황을 설명해 주세요. 무엇이 일어났고, 어떤 신호에 주목했으며, 다음 행동을 어떻게 결정했는지 구체적으로 작성하세요.",
    "q-bipolar-1": "시간 압박 속 문제 해결 시, 지금 당신은 어느 쪽으로 자연스럽게 기웁니까?",
    "q-mc-1": "불확실성이 커질 때 가장 먼저 신뢰하는 신호는 무엇입니까?",
    "q-bipolar-2": "모호한 계획 상황에서 어떤 사고 스타일이 더 우세합니까?",
    "q-context-2":
      "최근의 오해 사례를 설명해 주세요. 무엇을 가정했고 무엇을 놓쳤으며, 새 정보 이후 내부 프레이밍이 어떻게 바뀌었는지 적어 주세요.",
    "q-bipolar-3": "대인 갈등이 생길 때 가장 먼저 우선하는 것은 무엇입니까?",
    "q-mc-2": "빠른 결정을 강요받을 때, 당신의 패턴과 가장 가까운 것은 무엇입니까?",
    "q-bipolar-4": "변화가 빠른 환경에서 당신의 주의는 어디에 가장 강하게 향합니까?",
    "q-mc-3": "인지 과부하 이후 첫 리셋 행동은 무엇입니까?",
    "q-bipolar-5": "품질과 속도가 충돌할 때, 오늘의 당신은 무엇을 우선합니까?",
    "d-bipolar-6": "전략 탐색에서 가장 자주 나타나는 모드는 무엇입니까?",
    "d-mc-4": "팀 갈등 상황에서 가장 먼저 스캔하는 것은 무엇입니까?",
    "d-context-3":
      "평소 전략이 실패했던 순간을 설명해 주세요. 촉발 요인, 즉각적 내부 반응, 시도한 교정 조치를 구체적으로 적어 주세요.",
    "d-bipolar-7": "예상치 못한 변화가 왔을 때, 무엇이 반응을 주도합니까?",
    "d-mc-5": "모멘텀이 떨어질 때 당신의 기본 행동은 무엇입니까?",
    "d-bipolar-8": "어려운 트레이드오프를 평가할 때 더 큰 비중을 두는 것은 무엇입니까?",
    "d-context-4":
      "최근 7일을 돌아보세요. 주의가 반복적으로 향한 곳, 소진 요인, 현재 과활성이라고 보는 패턴을 적어 주세요.",
    "d-mc-6": "어려운 내용을 학습할 때 가장 먼저 택하는 접근은 무엇입니까?",
    "d-bipolar-9": "판단이 흔들릴 때, 가장 먼저 강해지는 것은 무엇입니까?",
    "d-mc-7": "압박 상황에서 가장 먼저 나타나는 신호는 무엇입니까?",
    "d-context-5":
      "최근 미뤘던 결정 하나를 적어 주세요. 어떤 내부 갈등이 지연을 만들었고, 더 빨리 해결하려면 무엇이 필요했는지 설명하세요.",
    "d-bipolar-10": "사람들을 목표로 이끌 때 무엇이 먼저 작동합니까?",
    "d-mc-8": "예상 밖의 부정적 피드백을 받았을 때 가장 먼저 하는 행동은 무엇입니까?",
    "d-context-6":
      "인지가 흩어진 순간을 설명해 주세요. 촉발 요인, 우선순위, 교정하고 싶은 처리 패턴을 적어 주세요.",
    "d-bipolar-11": "새로움과 안정성을 균형 잡을 때, 지금 당신은 어느 쪽에 더 가깝습니까?",
    "adaptive-ti-te:low": "논리 명확성이 약할 때 최근 사이클에서 주된 원인은 무엇이었습니까?",
    "adaptive-ti-te:high":
      "실행 자신감 또는 논리 확신이 블라인드 스폿을 만든 사례를 하나 적어 주세요. 무엇을 놓쳤고 왜 그랬나요?",
    "adaptive-ni-ne:low": "미래 프레이밍이 무너질 때 가장 먼저 나타나는 것은 무엇입니까?",
    "adaptive-ni-ne:high":
      "최근 예측 패턴이 행동을 주도한 사례를 적어 주세요. 무엇이 정확했고 무엇이 왜곡되었나요?",
    "adaptive-fi-fe:low": "가치 정렬이 약해질 때 가장 먼저 하는 행동은 무엇입니까?",
    "adaptive-fi-fe:high":
      "이번 달 감정 강도가 높았던 결정 사례를 적어 주세요. 어떤 내적/사회적 가치가 결과를 이끌었나요?",
    "adaptive-si-se:low": "환경 신호 처리력이 약할 때 가장 먼저 무너지는 것은 무엇입니까?",
    "adaptive-si-se:high":
      "급변 상황에서 감각 주의가 지배적이었던 사례를 떠올려 보세요. 무엇을 도왔고 무엇을 가렸나요?",
  },
};

function translateOptionLabel(value, label, language) {
  if (language === "EN") return label;
  const translated = OPTION_LABEL_TRANSLATIONS[language]?.[value];
  return translated || label;
}

export function localizeQuestion(question, language = "EN") {
  if (!question) return question;
  if (language === "EN") return question;

  const localized = { ...question };
  const prompt = QUESTION_PROMPT_TRANSLATIONS[language]?.[question.id];
  if (prompt) localized.prompt = prompt;

  if (question.type === "bipolar" && question.axis) {
    const labels = BIPOLAR_LABEL_TRANSLATIONS[language]?.[question.axis];
    if (labels) localized.labels = labels;
  }

  if (Array.isArray(question.options)) {
    localized.options = question.options.map((option) => ({
      ...option,
      label: translateOptionLabel(option.value, option.label, language),
    }));
  }

  return localized;
}

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
