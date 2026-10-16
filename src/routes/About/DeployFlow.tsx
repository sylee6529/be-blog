import styled from "@emotion/styled"
import React from "react"
import { tokens } from "src/styles"

const STEPS = [
  { icon: "github.svg", name: "GitHub", detail: "코드 병합" },
  { icon: "circleci.svg", name: "CircleCI", detail: "테스트, 이미지 빌드" },
  { icon: "ecr.svg", name: "Amazon ECR", detail: "이미지 저장" },
  { icon: "argo.svg", name: "Argo CD", detail: "Kustomize 설정 동기화" },
  { icon: "eks.svg", name: "Amazon EKS", detail: "클러스터에 배포" },
]

const CYCLE = 5 // 초. 점 하나가 처음부터 끝까지 가는 시간

/** 코드가 배포되기까지의 흐름. 점이 단계를 따라 움직이고, 지나가는 단계가 켜진다. */
const DeployFlow: React.FC = () => (
  <StyledWrapper style={{ ["--cycle" as string]: `${CYCLE}s` }}>
    <div className="track" aria-hidden>
      <span className="dot" />
    </div>
    <ol>
      {STEPS.map((step, i) => (
        <li key={step.name} style={{ ["--i" as string]: i }}>
          <span className="logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/about/icons/${step.icon}`} alt="" width={30} height={30} />
          </span>
          <strong>{step.name}</strong>
          <span className="detail">{step.detail}</span>
        </li>
      ))}
    </ol>
  </StyledWrapper>
)

export default DeployFlow

const StyledWrapper = styled.div`
  position: relative;
  padding: 4px 0;

  ol {
    position: relative;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    text-align: center;
  }
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    background: #fff;
    border: 1px solid ${tokens.color.borderStrong};
    border-radius: 14px;
    box-shadow: 0 2px 8px #0000000a;
    animation: deploy-glow var(--cycle) ease-in-out infinite;
    animation-delay: calc(var(--i) * var(--cycle) / 4);
  }
  strong {
    font-size: 13px;
    font-weight: 700;
    color: ${tokens.color.text};
  }
  .detail {
    font-size: 12px;
    line-height: 1.4;
    color: ${tokens.color.muted};
    word-break: keep-all;
  }

  .track {
    position: absolute;
    top: 32px;
    left: 10%;
    right: 10%;
    height: 2px;
    background: repeating-linear-gradient(
      90deg,
      #c5cbf0 0 6px,
      transparent 6px 11px
    );
  }
  .dot {
    position: absolute;
    top: -4px;
    left: 0;
    width: 10px;
    height: 10px;
    margin-left: -5px;
    border-radius: 50%;
    background: ${tokens.color.accent};
    box-shadow: 0 0 0 4px #5c6ac433;
    animation: deploy-move var(--cycle) linear infinite;
  }

  @keyframes deploy-move {
    from {
      left: 0;
    }
    to {
      left: 100%;
    }
  }
  @keyframes deploy-glow {
    0%,
    24%,
    100% {
      border-color: ${tokens.color.borderStrong};
      transform: none;
    }
    4% {
      border-color: ${tokens.color.accent};
      transform: translateY(-3px);
      box-shadow: 0 6px 16px #5c6ac42e;
    }
  }

  @media (max-width: 560px) {
    ol {
      grid-template-columns: 1fr;
      gap: 10px;
    }
    li {
      flex-direction: row;
      text-align: left;
      gap: 12px;
    }
    .logo {
      width: 44px;
      height: 44px;
      flex-shrink: 0;
    }
    strong {
      min-width: 92px;
    }
    .track {
      top: 22px;
      bottom: 22px;
      left: 22px;
      right: auto;
      width: 2px;
      height: auto;
      background: repeating-linear-gradient(
        180deg,
        #c5cbf0 0 6px,
        transparent 6px 11px
      );
    }
    .dot {
      left: -4px;
      animation-name: deploy-move-v;
    }
    @keyframes deploy-move-v {
      from {
        top: 0;
      }
      to {
        top: 100%;
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .dot {
      display: none;
    }
    .logo {
      animation: none;
    }
  }
`
