import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import { tokens } from "src/styles"
import Architecture from "./Architecture"
import DeployFlow from "./DeployFlow"
import { CompareRow, Kpi, Visual } from "./data"
import { useInView, useReducedMotion } from "./hooks"

const color = {
  before: "#c4cdd5",
  after: tokens.color.accent,
  beforeBg: "#f4f6f8",
  afterBg: "#eef0fb",
  afterBorder: "#c5cbf0",
}

/* ---------- 수치 카드 ---------- */

const NUMBER = /^([+]?)([\d,.]+)(\D*)$/

/** "1,000곳+" 처럼 숫자가 하나인 값은 화면에 들어올 때 0부터 세어 올라간다. */
const CountUp: React.FC<{ value: string; run: boolean }> = ({ value, run }) => {
  const reduced = useReducedMotion()
  const match = value.match(NUMBER)
  const target = match ? parseFloat(match[2].replace(/,/g, "")) : 0
  const decimals = match?.[2].split(".")[1]?.length ?? 0
  const [shown, setShown] = useState(match && !reduced ? 0 : target)

  useEffect(() => {
    if (!match || reduced || !run) {
      setShown(target)
      return
    }
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / 900, 1)
      setShown(target * (1 - Math.pow(1 - t, 3)))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run, reduced, target])

  if (!match) return <>{value}</>
  const text = shown.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
  return (
    <>
      {match[1]}
      {text}
      {match[3]}
    </>
  )
}

export const KpiRow: React.FC<{ kpis: Kpi[]; size?: "lg" | "md" }> = ({
  kpis,
  size = "md",
}) => {
  const [ref, inView] = useInView<HTMLUListElement>(0.4)
  return (
    <StyledKpis ref={ref} data-size={size}>
      {kpis.map((kpi) => (
        <li key={kpi.label}>
          <strong>
            <CountUp value={kpi.value} run={inView} />
          </strong>
          <span>{kpi.label}</span>
        </li>
      ))}
    </StyledKpis>
  )
}

/* ---------- 그림 ---------- */

export const VisualBlock: React.FC<{ visual: Visual }> = ({ visual }) => {
  const [ref, inView] = useInView<HTMLElement>(0.3)
  return (
    <StyledFigure ref={ref} data-in={inView} data-kind={visual.kind}>
      <figcaption>{visual.title}</figcaption>
      {renderVisual(visual)}
    </StyledFigure>
  )
}

function renderVisual(visual: Visual) {
  switch (visual.kind) {
    case "architecture":
      return <Architecture />
    case "deploy":
      return <DeployFlow />
    case "outbox":
      return <OutboxFlow />
    case "compare":
      return (
        <div className="compare">
          {visual.rows.map((row) => (
            <CompareBars key={row.label} row={row} />
          ))}
        </div>
      )
    case "lanes":
      return (
        <div className="lanes">
          {visual.lanes.map((lane) => (
            <div key={lane.label} className="lane" data-tone={lane.tone}>
              <span className="lane-label">{lane.label}</span>
              <Chain steps={lane.steps} tone={lane.tone} />
            </div>
          ))}
        </div>
      )
    case "states":
      return (
        <div className="states">
          <ol className="chain">
            {visual.states.map((state, i) => (
              <React.Fragment key={state}>
                {i > 0 && (
                  <li className="arrow" aria-hidden>
                    →
                  </li>
                )}
                <li className="node state" style={{ ["--i" as string]: i }}>
                  {state}
                </li>
              </React.Fragment>
            ))}
          </ol>
          <p className="dead">
            <span className="node dead-chip">DEAD</span>
            {visual.dead}
          </p>
        </div>
      )
    case "steps":
      return (
        <ol className="steps">
          {visual.steps.map((step, i) => (
            <li key={step.title} style={{ ["--i" as string]: i }}>
              <span className="step-no">{i + 1}</span>
              <div className="step-title">{step.title}</div>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
      )
  }
}

const Chain: React.FC<{ steps: string[]; tone: "before" | "after" }> = ({
  steps,
  tone,
}) => (
  <ol className="chain">
    {steps.map((step, i) => (
      <React.Fragment key={step}>
        {i > 0 && (
          <li className="arrow" aria-hidden>
            →
          </li>
        )}
        <li className="node" data-tone={tone}>
          {step}
        </li>
      </React.Fragment>
    ))}
  </ol>
)

const CompareBars: React.FC<{ row: CompareRow }> = ({ row }) => {
  const max = Math.max(row.before, row.after)
  const pct = (v: number) => `${Math.max((v / max) * 100, 3)}%`
  return (
    <div className="bars">
      <div className="bars-label">{row.label}</div>
      <div className="bar-row">
        <span className="bar-name">{row.beforeLabel ?? "전"}</span>
        <div className="track">
          <div className="bar" data-tone="before" style={{ ["--w" as string]: pct(row.before) }} />
        </div>
        <span className="bar-value">{row.beforeText}</span>
      </div>
      <div className="bar-row">
        <span className="bar-name">{row.afterLabel ?? "후"}</span>
        <div className="track">
          <div className="bar" data-tone="after" style={{ ["--w" as string]: pct(row.after) }} />
        </div>
        <span className="bar-value" data-tone="after">
          {row.afterText}
        </span>
      </div>
    </div>
  )
}

/** API 가 Outbox 에 쓰고, 작업 3개가 Outbox 를 읽는 흐름. 점이 경로를 따라 흐른다. */
const OutboxFlow: React.FC = () => {
  const reduced = useReducedMotion()
  const jobs = ["알림톡 발송 job", "단말 수신 확인 job", "누락 보정 job"]
  const jobY = [30, 90, 150]
  const paths = jobY.map((y) => `M392 90 C430 90 430 ${y} 468 ${y}`)

  return (
    <svg className="outbox" viewBox="0 0 640 180" role="img" aria-label="학습 기록 API가 MongoDB Outbox에 기록하면 발송, 단말 수신 확인, 누락 보정 작업 3개가 Outbox를 읽어 처리합니다.">
      <path d="M150 90 H232" className="wire" />
      {paths.map((d) => (
        <path key={d} d={d} className="wire" />
      ))}

      <g>
        <rect x="8" y="62" width="142" height="56" rx="10" className="box" />
        <text x="79" y="86" textAnchor="middle" className="t-strong">
          학습 기록 API
        </text>
        <text x="79" y="104" textAnchor="middle" className="t-sub">
          바로 응답
        </text>
      </g>

      <g>
        <rect x="236" y="56" width="156" height="68" rx="10" className="box accent" />
        <image href="/about/icons/mongodb.svg" x="250" y="74" width="30" height="30" />
        <text x="288" y="86" className="t-strong">
          Outbox
        </text>
        <text x="288" y="104" className="t-sub">
          MongoDB
        </text>
      </g>

      {jobs.map((job, i) => (
        <g key={job}>
          <rect x="472" y={jobY[i] - 20} width="160" height="40" rx="10" className="box" />
          <text x="552" y={jobY[i] + 5} textAnchor="middle" className="t-job">
            {job}
          </text>
        </g>
      ))}

      {!reduced && (
        <>
          <circle r="4.5" className="packet">
            <animateMotion dur="2.4s" repeatCount="indefinite" path="M150 90 H232" />
          </circle>
          {paths.map((d, i) => (
            <circle key={d} r="4.5" className="packet">
              <animateMotion
                dur="2.4s"
                begin={`${0.4 + i * 0.5}s`}
                repeatCount="indefinite"
                path={d}
              />
            </circle>
          ))}
        </>
      )}
    </svg>
  )
}

/* ---------- 스타일 ---------- */

const StyledKpis = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(128px, 1fr));
  gap: 10px;
  margin: 0 0 18px;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 14px 16px;
    background: ${color.afterBg};
    border-radius: 10px;
  }
  strong {
    font-size: 1.45rem;
    font-weight: 800;
    line-height: 1.2;
    color: ${tokens.color.accent};
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
    white-space: nowrap;
  }
  span {
    font-size: 12.5px;
    line-height: 1.5;
    color: ${tokens.color.textSub};
  }

  @media (max-width: 560px) {
    gap: 8px;
    li {
      padding: 12px;
    }
    strong {
      font-size: 1.2rem;
    }
  }

  &[data-size="lg"] {
    li {
      padding: 18px 18px 16px;
      background: ${tokens.color.card};
      border: 1px solid ${tokens.color.border};
      border-radius: ${tokens.radius.card};
    }
    strong {
      font-size: 1.75rem;
    }
  }
`

const StyledFigure = styled.figure`
  margin: 16px 0 0;
  padding: 16px;
  background: ${tokens.color.page};
  border: 1px solid ${tokens.color.border};
  border-radius: 10px;

  &[data-kind="architecture"] {
    padding: 12px;
    background: #fff;
  }

  figcaption {
    margin-bottom: 12px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    color: ${tokens.color.sectionLabel};
  }

  .chain {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .node {
    padding: 7px 12px;
    font-size: 13px;
    line-height: 1.4;
    border-radius: 8px;
    border: 1px solid transparent;
  }
  .node[data-tone="before"] {
    color: ${tokens.color.muted};
    background: ${color.beforeBg};
    border-color: ${tokens.color.borderStrong};
    text-decoration: line-through;
    text-decoration-color: #c4cdd5;
  }
  .node[data-tone="after"] {
    color: ${tokens.color.text};
    background: #fff;
    border-color: ${color.afterBorder};
    font-weight: 600;
  }
  .arrow {
    color: ${tokens.color.meta};
    font-size: 14px;
  }

  .lanes {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .lane {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .lane-label {
    flex-shrink: 0;
    width: 22px;
    font-size: 12px;
    font-weight: 700;
    color: ${tokens.color.muted};
  }
  .lane[data-tone="after"] .lane-label {
    color: ${tokens.color.accent};
  }

  /* 발송 상태: 켜진 상태가 차례로 옮겨 간다 */
  .state {
    font-family: monospace;
    font-size: 12px;
    font-weight: 600;
    color: ${tokens.color.textSub};
    background: #fff;
    border-color: ${color.afterBorder};
  }
  &[data-in="true"] .state {
    animation: state-on 4s ease-in-out infinite;
    animation-delay: calc(var(--i) * 1s);
  }
  @keyframes state-on {
    0%,
    30%,
    100% {
      color: ${tokens.color.textSub};
      background: #fff;
    }
    5%,
    22% {
      color: #fff;
      background: ${tokens.color.accent};
      border-color: ${tokens.color.accent};
    }
  }
  .dead {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 10px 0 0;
    font-size: 12px;
    color: ${tokens.color.meta};
  }
  .dead-chip {
    padding: 3px 9px;
    font-family: monospace;
    font-size: 11.5px;
    font-weight: 700;
    font-weight: 600;
    color: ${tokens.color.meta};
    background: transparent;
    border-color: ${tokens.color.border};
  }

  /* 이관 단계: 차례로 나타난다 */
  .steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      position: relative;
      padding: 12px;
      background: #fff;
      border: 1px solid ${tokens.color.border};
      border-radius: 8px;
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.5s, transform 0.5s;
      transition-delay: calc(var(--i) * 0.25s);
    }
    li:last-of-type {
      border-color: ${color.afterBorder};
      background: ${color.afterBg};
    }
    .step-no {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      margin-bottom: 8px;
      font-size: 12px;
      font-weight: 700;
      color: #fff;
      background: ${tokens.color.accent};
      border-radius: 50%;
    }
    .step-title {
      margin-bottom: 4px;
      font-size: 13.5px;
      font-weight: 700;
      color: ${tokens.color.text};
    }
    p {
      margin: 0;
      font-size: 12.5px;
      line-height: 1.55;
      color: ${tokens.color.textSub};
    }
  }
  &[data-in="true"] .steps li {
    opacity: 1;
    transform: none;
  }

  /* 전후 막대: 화면에 들어오면 자란다 */
  .compare {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 18px 24px;
  }
  .bars-label {
    margin-bottom: 8px;
    font-size: 13.5px;
    font-weight: 700;
    color: ${tokens.color.text};
  }
  .bar-row {
    display: grid;
    grid-template-columns: 52px 1fr 58px;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }
  .bar-name {
    font-size: 12px;
    color: ${tokens.color.muted};
  }
  .track {
    height: 14px;
    background: ${color.beforeBg};
    border-radius: 4px;
    overflow: hidden;
  }
  .bar {
    width: 0;
    height: 100%;
    border-radius: 4px;
    transition: width 1s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .bar[data-tone="before"] {
    background: ${color.before};
  }
  .bar[data-tone="after"] {
    background: ${color.after};
    transition-delay: 0.25s;
  }
  &[data-in="true"] .bar {
    width: var(--w);
  }
  .bar-value {
    font-size: 13px;
    font-weight: 600;
    text-align: right;
    color: ${tokens.color.muted};
    font-variant-numeric: tabular-nums;
  }
  .bar-value[data-tone="after"] {
    font-weight: 800;
    color: ${tokens.color.accent};
  }

  /* Outbox 흐름 */
  .outbox {
    display: block;
    width: 100%;
    height: auto;
    font-family: inherit;

    .wire {
      fill: none;
      stroke: ${color.afterBorder};
      stroke-width: 2;
      stroke-dasharray: 5 5;
    }
    .box {
      fill: #fff;
      stroke: ${tokens.color.borderStrong};
    }
    .box.accent {
      stroke: ${tokens.color.accent};
      stroke-width: 1.5;
    }
    .packet {
      fill: ${tokens.color.accent};
    }
    .t-strong {
      font-size: 14px;
      font-weight: 700;
      fill: ${tokens.color.text};
    }
    .t-sub {
      font-size: 12px;
      fill: ${tokens.color.muted};
    }
    .t-job {
      font-size: 13px;
      font-weight: 600;
      fill: ${tokens.color.text};
    }
  }

  @media (max-width: 768px) {
    padding: 14px 12px;
    .steps {
      grid-template-columns: 1fr 1fr;
    }
    .lane {
      align-items: flex-start;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .steps li,
    .bar {
      transition: none;
    }
    &[data-in="true"] .state {
      animation: none;
    }
  }
`
