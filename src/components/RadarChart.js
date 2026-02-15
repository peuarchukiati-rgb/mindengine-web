"use client";

const FUNCTION_ORDER = ["Ti", "Te", "Ne", "Ni", "Si", "Se", "Fi", "Fe"];

function pointFor(index, total, radius, center) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return {
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle),
  };
}

export default function RadarChart({ scores }) {
  const size = 320;
  const center = size / 2;
  const maxRadius = 110;
  const levels = [25, 50, 75, 100];

  const polygonPoints = FUNCTION_ORDER.map((fn, index) => {
    const raw = Number(scores?.[fn] ?? 0);
    const normalized = Math.max(0, Math.min(100, raw)) / 100;
    const point = pointFor(index, FUNCTION_ORDER.length, maxRadius * normalized, center);
    return `${point.x},${point.y}`;
  }).join(" ");

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
      <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto w-full max-w-[340px]">
        {levels.map((level) => {
          const r = (maxRadius * level) / 100;
          const points = FUNCTION_ORDER.map((_, index) => {
            const point = pointFor(index, FUNCTION_ORDER.length, r, center);
            return `${point.x},${point.y}`;
          }).join(" ");
          return (
            <polygon
              key={level}
              points={points}
              fill="none"
              stroke="rgba(148, 163, 184, 0.35)"
              strokeWidth="1"
            />
          );
        })}

        {FUNCTION_ORDER.map((_, index) => {
          const point = pointFor(index, FUNCTION_ORDER.length, maxRadius, center);
          return (
            <line
              key={`line-${index}`}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="rgba(148, 163, 184, 0.25)"
              strokeWidth="1"
            />
          );
        })}

        <polygon
          points={polygonPoints}
          fill="rgba(56, 189, 248, 0.25)"
          stroke="rgb(56, 189, 248)"
          strokeWidth="2"
        />

        {FUNCTION_ORDER.map((fn, index) => {
          const point = pointFor(index, FUNCTION_ORDER.length, maxRadius + 18, center);
          return (
            <text
              key={fn}
              x={point.x}
              y={point.y}
              textAnchor="middle"
              alignmentBaseline="middle"
              fill="#d1d5db"
              fontSize="12"
            >
              {fn}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

