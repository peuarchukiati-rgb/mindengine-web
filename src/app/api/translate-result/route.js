import { NextResponse } from "next/server";

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const OPENAI_URL = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1/chat/completions";
const LANGUAGE_NAME = {
  EN: "English",
  TH: "Thai",
  JP: "Japanese",
  KR: "Korean",
};

const FALLBACK_TEXT_MAP = {
  TH: {
    "Detected elevated activation outside the primary stack during stress-related response signals.":
      "ตรวจพบการกระตุ้นที่สูงขึ้นนอกสแต็กหลักระหว่างการตอบสนองต่อสัญญาณความเครียด",
    "Stress-loaded wording indicates reactive compensation outside the primary stack.":
      "รูปแบบภาษาที่มีแรงกดดันสูงบ่งชี้การชดเชยเชิงปฏิกิริยานอกสแต็กหลัก",
    "Language pattern emphasizes model accuracy, with periodic spillover into non-primary compensation functions.":
      "รูปแบบภาษาชี้ว่าผู้ใช้เน้นความแม่นของโมเดล และมีการล้นไปยังฟังก์ชันชดเชยที่ไม่ใช่แกนหลักเป็นระยะ",
    "Emotion-anchored framing suggests elevated compensatory activation around value and relational signals.":
      "กรอบภาษาที่อิงอารมณ์บ่งชี้การชดเชยที่สูงขึ้นรอบสัญญาณด้านคุณค่าและความสัมพันธ์",
    "Pattern shows uneven function deployment under pressure. Decision cycles may narrow too quickly or over-expand, increasing execution drift and interpretive bias.":
      "รูปแบบแสดงการใช้งานฟังก์ชันไม่สมดุลภายใต้แรงกดดัน วงจรการตัดสินใจอาจแคบเร็วเกินไปหรือขยายกว้างเกินไป ทำให้การลงมือปฏิบัติเบี่ยงและตีความลำเอียงมากขึ้น",
    "Current pattern shows high cognitive load with rapid switching between control and recovery loops. This increases drift, over-correction, and social interpretation noise.":
      "รูปแบบปัจจุบันบ่งชี้ภาระการคิดสูง พร้อมการสลับเร็วระหว่างโหมดควบคุมและฟื้นตัว ส่งผลให้เกิด drift การแก้เกิน และสัญญาณรบกวนจากการตีความทางสังคมมากขึ้น",
    "Pattern indicates strong analysis throughput but occasional execution latency when signal certainty is incomplete. This can create delayed closure and fragmented action.":
      "รูปแบบบ่งชี้ศักยภาพการวิเคราะห์สูง แต่เกิดความหน่วงในการลงมือเมื่อความมั่นใจของสัญญาณยังไม่ครบ อาจทำให้ปิดงานช้าและการกระทำกระจัดกระจาย",
    "Pattern shows high internal meaning-tracking with periodic underweighting of external constraints. This may reduce timing precision and increase emotional carryover.":
      "รูปแบบแสดงการติดตามความหมายภายในสูง แต่ให้น้ำหนักข้อจำกัดภายนอกต่ำเป็นช่วงๆ ซึ่งอาจลดความแม่นของจังหวะเวลาและเพิ่มแรงค้างทางอารมณ์",
    "Run a 10-minute dual-log after each high-pressure decision: one column for observed facts, one for inferred meaning, then commit one corrective action.":
      "หลังการตัดสินใจแรงกดดันสูงแต่ละครั้ง ให้ทำ dual-log 10 นาที: คอลัมน์หนึ่งสำหรับข้อเท็จจริงที่สังเกตได้ อีกคอลัมน์สำหรับความหมายที่อนุมาน แล้วเลือก corrective action หนึ่งข้อ",
    "For the next 3 high-pressure decisions, pause 90 seconds and log: one observable fact, one assumption, and one next action before responding.":
      "ในการตัดสินใจแรงกดดันสูง 3 ครั้งถัดไป ให้หยุด 90 วินาทีแล้วบันทึก: ข้อเท็จจริงที่สังเกตได้ 1 ข้อ สมมติฐาน 1 ข้อ และการกระทำถัดไป 1 ข้อ ก่อนตอบสนอง",
    "Use a two-step commit rule: define decision threshold in one sentence, then execute one measurable action within 15 minutes.":
      "ใช้กฎ commit สองขั้น: นิยามเกณฑ์ตัดสินใจใน 1 ประโยค แล้วลงมือทำ 1 action ที่วัดผลได้ภายใน 15 นาที",
    "Before each key decision, write one value-aligned intention and one external constraint, then choose one action satisfying both.":
      "ก่อนการตัดสินใจสำคัญแต่ละครั้ง ให้เขียนเจตนาที่สอดคล้องคุณค่า 1 ข้อ และข้อจำกัดภายนอก 1 ข้อ แล้วเลือก action เดียวที่ตอบทั้งสองด้าน",
  },
  JP: {
    "Detected elevated activation outside the primary stack during stress-related response signals.":
      "ストレス関連シグナルへの反応時に、主要スタック外の活性上昇が検出されました。",
    "Stress-loaded wording indicates reactive compensation outside the primary stack.":
      "高ストレス語彙の出現は、主要スタック外での反応的補償を示しています。",
    "Language pattern emphasizes model accuracy, with periodic spillover into non-primary compensation functions.":
      "言語パターンはモデル精度を重視しており、非主要の補償機能へ周期的なスピルオーバーが見られます。",
    "Emotion-anchored framing suggests elevated compensatory activation around value and relational signals.":
      "感情にアンカーされた表現は、価値・関係シグナル周辺の補償的活性上昇を示唆します。",
    "Pattern shows uneven function deployment under pressure. Decision cycles may narrow too quickly or over-expand, increasing execution drift and interpretive bias.":
      "パターンは高圧下で機能配分が不均衡です。意思決定サイクルが急速に狭まりすぎる、または過度に拡張し、実行ドリフトと解釈バイアスを増加させる可能性があります。",
    "Current pattern shows high cognitive load with rapid switching between control and recovery loops. This increases drift, over-correction, and social interpretation noise.":
      "現在のパターンは高い認知負荷と、制御ループ/回復ループ間の急速な切替を示します。これによりドリフト、過補正、社会的解釈ノイズが増加します。",
    "Pattern indicates strong analysis throughput but occasional execution latency when signal certainty is incomplete. This can create delayed closure and fragmented action.":
      "分析処理量は高い一方、シグナル確度が不十分な局面で実行遅延が発生します。これにより収束遅延と行動の断片化が生じ得ます。",
    "Pattern shows high internal meaning-tracking with periodic underweighting of external constraints. This may reduce timing precision and increase emotional carryover.":
      "内的意味追跡は高いものの、外部制約を周期的に過小評価する傾向があります。タイミング精度を下げ、感情の持ち越しを増やす可能性があります。",
    "Run a 10-minute dual-log after each high-pressure decision: one column for observed facts, one for inferred meaning, then commit one corrective action.":
      "高圧な意思決定ごとに10分のデュアルログを実施してください。1列目に観測事実、2列目に推論意味を記録し、最後に修正行動を1つ確定します。",
    "For the next 3 high-pressure decisions, pause 90 seconds and log: one observable fact, one assumption, and one next action before responding.":
      "次の高圧な意思決定3件では、反応前に90秒停止し、観測事実1つ・仮説1つ・次の行動1つを記録してください。",
    "Use a two-step commit rule: define decision threshold in one sentence, then execute one measurable action within 15 minutes.":
      "2ステップ・コミット規則を使ってください。1文で意思決定閾値を定義し、15分以内に測定可能な行動を1つ実行します。",
    "Before each key decision, write one value-aligned intention and one external constraint, then choose one action satisfying both.":
      "各重要意思決定の前に、価値整合の意図を1つと外部制約を1つ記述し、両方を満たす行動を1つ選択してください。",
  },
  KR: {
    "Detected elevated activation outside the primary stack during stress-related response signals.":
      "스트레스 관련 신호에 반응하는 동안 주 스택 외 기능의 활성 상승이 감지되었습니다.",
    "Stress-loaded wording indicates reactive compensation outside the primary stack.":
      "고스트레스 표현 패턴은 주 스택 밖에서의 반응적 보상을 시사합니다.",
    "Language pattern emphasizes model accuracy, with periodic spillover into non-primary compensation functions.":
      "언어 패턴은 모델 정확성을 강조하며, 비주요 보상 기능으로의 주기적 스필오버가 보입니다.",
    "Emotion-anchored framing suggests elevated compensatory activation around value and relational signals.":
      "감정 기반 프레이밍은 가치·관계 신호 주변의 보상 활성 상승을 시사합니다.",
    "Pattern shows uneven function deployment under pressure. Decision cycles may narrow too quickly or over-expand, increasing execution drift and interpretive bias.":
      "이 패턴은 압박 상황에서 기능 배치가 불균형합니다. 결정 사이클이 너무 빨리 좁아지거나 과도하게 확장되어 실행 드리프트와 해석 편향이 커질 수 있습니다.",
    "Current pattern shows high cognitive load with rapid switching between control and recovery loops. This increases drift, over-correction, and social interpretation noise.":
      "현재 패턴은 높은 인지 부하와 통제/회복 루프 간 빠른 전환을 보입니다. 이로 인해 드리프트, 과보정, 사회적 해석 노이즈가 증가합니다.",
    "Pattern indicates strong analysis throughput but occasional execution latency when signal certainty is incomplete. This can create delayed closure and fragmented action.":
      "분석 처리량은 높지만 신호 확실성이 낮을 때 실행 지연이 나타납니다. 이는 마무리 지연과 행동 파편화를 유발할 수 있습니다.",
    "Pattern shows high internal meaning-tracking with periodic underweighting of external constraints. This may reduce timing precision and increase emotional carryover.":
      "내적 의미 추적은 높지만 외부 제약을 주기적으로 과소평가하는 경향이 있습니다. 타이밍 정밀도를 낮추고 감정 잔류를 키울 수 있습니다.",
    "Run a 10-minute dual-log after each high-pressure decision: one column for observed facts, one for inferred meaning, then commit one corrective action.":
      "고압 의사결정 후마다 10분 듀얼 로그를 실행하세요: 한 칸에는 관측 사실, 다른 칸에는 추론 의미를 적고 교정 행동 1개를 확정합니다.",
    "For the next 3 high-pressure decisions, pause 90 seconds and log: one observable fact, one assumption, and one next action before responding.":
      "다음 고압 의사결정 3회 동안 응답 전 90초 멈춘 뒤, 관측 사실 1개·가정 1개·다음 행동 1개를 기록하세요.",
    "Use a two-step commit rule: define decision threshold in one sentence, then execute one measurable action within 15 minutes.":
      "2단계 커밋 규칙을 사용하세요: 한 문장으로 결정 임계값을 정의하고, 15분 안에 측정 가능한 행동 1개를 실행합니다.",
    "Before each key decision, write one value-aligned intention and one external constraint, then choose one action satisfying both.":
      "핵심 결정 전마다 가치 정렬 의도 1개와 외부 제약 1개를 적고, 둘을 동시에 만족하는 행동 1개를 선택하세요.",
  },
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

function translateFallbackText(text, targetLanguage) {
  if (targetLanguage === "EN") return text;
  return FALLBACK_TEXT_MAP[targetLanguage]?.[text] || text;
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
      // Fallback translation for known baseline diagnostic phrases.
      return NextResponse.json({
        shadow_spike_reason: translateFallbackText(source.shadow_spike_reason, targetLanguage),
        risk_pattern: translateFallbackText(source.risk_pattern, targetLanguage),
        corrective_action: translateFallbackText(source.corrective_action, targetLanguage),
      });
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
