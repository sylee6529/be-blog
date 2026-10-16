import styled from "@emotion/styled"
import React, { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { tokens } from "src/styles"
import { useReducedMotion } from "./hooks"

/**
 * 리드AI 서비스 아키텍처.
 * AWS Architecture Icons 의 그룹 표기(AWS Cloud, VPC, Public subnet, Private subnet)를 따른다.
 * 요청 흐름은 한 줄로 곧게, 저장소로 가는 선은 꺾지 않는다.
 */

const ICON = "/about/icons"

const C = {
  cloud: "#232F3E",
  vpc: "#8C4FFF",
  pub: "#7AA116",
  pubBg: "#F5F9EE",
  priv: "#00A4A6",
  privBg: "#EEF8F8",
  eks: "#ED7100",
  label: "#16191F",
  sub: "#5F6B7A",
  flow: tokens.color.accent,
}

const MAIN_Y = 230

const Group: React.FC<{
  x: number
  y: number
  w: number
  h: number
  color: string
  label?: string
  icon?: string
  bg?: string
  dashed?: boolean
}> = ({ x, y, w, h, color, label, icon, bg, dashed }) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={dashed ? 8 : 0}
      fill={bg ?? "none"}
      stroke={color}
      strokeWidth={2}
      strokeDasharray={dashed ? "6 5" : undefined}
    />
    {icon && <image href={`${ICON}/${icon}`} x={x} y={y} width={30} height={30} />}
    {label && (
      <text x={x + (icon ? 40 : 14)} y={y + 21} fontSize={15} fontWeight={700} fill={color}>
        {label}
      </text>
    )}
  </g>
)

const Node: React.FC<{
  icon: string
  cx: number
  cy: number
  size?: number
  label: string
  fontSize?: number
}> = ({ icon, cx, cy, size = 60, label, fontSize = 15 }) => (
  <g>
    <image
      href={`${ICON}/${icon}`}
      x={cx - size / 2}
      y={cy - size / 2}
      width={size}
      height={size}
    />
    <text
      x={cx}
      y={cy + size / 2 + fontSize + 6}
      fontSize={fontSize}
      fontWeight={600}
      fill={C.label}
      textAnchor="middle"
    >
      {label}
    </text>
  </g>
)

const Tile: React.FC<{ x: number; y: number; icon: string; label: string }> = ({
  x,
  y,
  icon,
  label,
}) => (
  <g>
    <rect x={x} y={y} width={112} height={128} rx={10} fill="#fff" stroke="#E3E6EA" strokeWidth={1.5} />
    <image href={`${ICON}/${icon}`} x={x + 30} y={y + 20} width={52} height={52} />
    <text x={x + 56} y={y + 102} fontSize={14} fontWeight={700} fill={C.label} textAnchor="middle">
      {label}
    </text>
  </g>
)

const Flow: React.FC<{ d: string; id: string; animate: boolean }> = ({ d, id, animate }) => (
  <path
    d={d}
    fill="none"
    stroke={C.flow}
    strokeWidth={2.4}
    strokeDasharray="7 6"
    markerEnd={`url(#${id}-arrow)`}
    className={animate ? "flow" : undefined}
  />
)

const Packet: React.FC<{ path: string; begin?: string; dur?: string }> = ({
  path,
  begin = "0s",
  dur = "3s",
}) => (
  <circle r={6} fill={C.flow}>
    <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={path} />
  </circle>
)

const DB_PATHS = {
  rds: "M680 200 H742",
  mongo: "M680 262 H914",
  redis: "M680 300 H742",
}

const SHARED = [
  { icon: "ecr.svg", label: "ECR", x: 360 },
  { icon: "secrets.svg", label: "Secrets Manager", x: 450 },
  { icon: "s3.svg", label: "S3", x: 634 },
]

const Diagram: React.FC<{ id: string }> = ({ id }) => {
  const reduced = useReducedMotion()
  const animate = !reduced

  return (
    <svg
      viewBox="0 0 1000 560"
      role="img"
      aria-label="리드AI 서비스 아키텍처. 사용자 요청은 Route 53과 ALB를 거쳐 EKS의 프론트엔드와 Spring Boot API 서비스로 가고, API 서비스는 RDS MySQL, ElastiCache Redis, MongoDB Atlas를 씁니다."
    >
      <defs>
        <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill={C.flow} />
        </marker>
      </defs>

      <rect width="1000" height="560" fill="#fff" />

      <Node icon="users.svg" cx={52} cy={MAIN_Y} label="사용자" />

      <Group x={110} y={20} w={780} h={520} color={C.cloud} label="AWS Cloud" icon="group-AWSCloudlogo.svg" />
      <Node icon="route53.svg" cx={172} cy={MAIN_Y} label="Route 53" />

      <Group x={240} y={64} w={630} h={392} color={C.vpc} label="VPC" icon="group-VirtualprivatecloudVPC.svg" />

      <Group x={262} y={104} w={128} h={330} color={C.pub} bg={C.pubBg} label="Public" icon="group-Publicsubnet.svg" />
      <Node icon="alb.svg" cx={326} cy={MAIN_Y} label="ALB" />
      <Node icon="nat.svg" cx={326} cy={360} size={44} label="NAT Gateway" fontSize={12.5} />

      <Group x={410} y={104} w={440} h={330} color={C.priv} bg={C.privBg} label="Private" icon="group-Privatesubnet.svg" />

      <rect x={428} y={142} width={270} height={278} rx={4} fill="#fff" fillOpacity={0.7} stroke={C.eks} strokeWidth={2} />
      <image href={`${ICON}/eks.svg`} x={428} y={142} width={30} height={30} />
      <text x={468} y={163} fontSize={15} fontWeight={700} fill={C.eks}>
        Amazon EKS
      </text>

      <Tile x={442} y={180} icon="nextjs.svg" label="프론트엔드" />
      <Tile x={568} y={180} icon="springboot.svg" label="API 서비스" />

      {[
        { icon: "argo.svg", label: "Argo CD", cx: 486 },
        { icon: "prometheus.svg", label: "Prometheus", cx: 564 },
        { icon: "grafana.svg", label: "Grafana", cx: 642 },
      ].map((t) => (
        <g key={t.label}>
          <image href={`${ICON}/${t.icon}`} x={t.cx - 16} y={330} width={32} height={32} />
          <text x={t.cx} y={386} fontSize={12} fill={C.sub} textAnchor="middle">
            {t.label}
          </text>
        </g>
      ))}

      <Node icon="rds.svg" cx={776} cy={200} size={56} label="RDS MySQL" fontSize={14} />
      <Node icon="elasticache.svg" cx={776} cy={322} size={56} label="ElastiCache" fontSize={14} />

      <Group x={244} y={474} w={500} h={52} color="#8A96A3" dashed />
      <text x={262} y={506} fontSize={13} fontWeight={700} fill={C.sub}>
        공용 서비스
      </text>
      {SHARED.map((s) => (
        <g key={s.label}>
          <image href={`${ICON}/${s.icon}`} x={s.x} y={484} width={32} height={32} />
          <text x={s.x + 40} y={506} fontSize={13} fill={C.label}>
            {s.label}
          </text>
        </g>
      ))}

      <rect x={906} y={186} width={86} height={140} rx={10} fill="#F3FAF1" stroke="#47A248" strokeWidth={2} strokeDasharray="6 5" />
      <text x={949} y={210} fontSize={12} fontWeight={700} fill="#2E7D32" textAnchor="middle">
        외부 SaaS
      </text>
      <image href={`${ICON}/mongodb.svg`} x={925} y={238} width={48} height={48} />
      <text x={949} y={306} fontSize={13} fontWeight={600} fill={C.label} textAnchor="middle">
        MongoDB
      </text>

      <Flow id={id} animate={animate} d={`M86 ${MAIN_Y} H138`} />
      <Flow id={id} animate={animate} d={`M206 ${MAIN_Y} H292`} />
      <Flow id={id} animate={animate} d={`M360 ${MAIN_Y} H438`} />
      <Flow id={id} animate={animate} d={`M554 ${MAIN_Y} H564`} />
      <Flow id={id} animate={animate} d={DB_PATHS.rds} />
      <Flow id={id} animate={animate} d={DB_PATHS.mongo} />
      <Flow id={id} animate={animate} d={DB_PATHS.redis} />

      {animate && (
        <>
          <Packet path={`M86 ${MAIN_Y} H564`} dur="2.6s" />
          <Packet path={DB_PATHS.rds} begin="1.2s" dur="1.4s" />
          <Packet path={DB_PATHS.mongo} begin="1.6s" dur="1.8s" />
          <Packet path={DB_PATHS.redis} begin="2s" dur="1.4s" />
        </>
      )}
    </svg>
  )
}

const Architecture: React.FC = () => {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open, close])

  return (
    <>
      <StyledInline type="button" onClick={() => setOpen(true)} aria-label="아키텍처 크게 보기">
        <Diagram id="arch-inline" />
        <span className="zoom">크게 보기</span>
      </StyledInline>

      {open &&
        createPortal(
          <StyledModal role="dialog" aria-modal="true" aria-label="리드AI 서비스 아키텍처" onClick={close}>
            <div className="panel" onClick={(e) => e.stopPropagation()}>
              <div className="bar">
                <span>리드AI 서비스 아키텍처</span>
                <button type="button" onClick={close}>
                  닫기
                </button>
              </div>
              <div className="scroll">
                <Diagram id="arch-modal" />
              </div>
            </div>
          </StyledModal>,
          document.body
        )}
    </>
  )
}

export default Architecture

const flowCss = `
  .flow {
    animation: about-dash 1.1s linear infinite;
  }
  @keyframes about-dash {
    to {
      stroke-dashoffset: -26;
    }
  }
  svg {
    display: block;
    width: 100%;
    height: auto;
    font-family: inherit;
  }
`

const StyledInline = styled.button`
  position: relative;
  display: block;
  width: 100%;
  cursor: zoom-in;
  border-radius: 8px;
  overflow: hidden;
  ${flowCss}

  .zoom {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 12px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    background: rgba(35, 47, 62, 0.82);
    border-radius: ${tokens.radius.pill};
    transition: background 0.2s;
  }
  &:hover .zoom,
  &:focus-visible .zoom {
    background: ${tokens.color.accent};
  }
  &:focus-visible {
    outline: 2px solid ${tokens.color.accent};
    outline-offset: 2px;
  }
`

const StyledModal = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2vh 2vw;
  background: rgba(15, 20, 30, 0.72);
  ${flowCss}

  .panel {
    display: flex;
    flex-direction: column;
    width: min(1400px, 96vw);
    max-height: 96vh;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
  }
  .bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 700;
    color: ${tokens.color.text};
    border-bottom: 1px solid ${tokens.color.border};

    button {
      padding: 6px 14px;
      font-size: 13px;
      font-weight: 600;
      border: 1px solid ${tokens.color.borderStrong};
      border-radius: ${tokens.radius.pill};
      &:hover {
        border-color: ${tokens.color.accent};
        color: ${tokens.color.accent};
      }
    }
  }
  .scroll {
    overflow: auto;
    svg {
      max-height: calc(96vh - 60px);
    }
    @media (max-width: 900px) {
      svg {
        min-width: 860px;
        max-height: none;
      }
    }
  }
`
