import styled from "@emotion/styled"
import Link from "next/link"
import React from "react"
import { tokens } from "src/styles"

type Props = {
  label: string
  actionLabel?: string
  actionHref?: string
}

/** kciter 의 "MORE ARTICLES ———— All articles ▸" 줄 */
const SectionRow: React.FC<Props> = ({ label, actionLabel, actionHref }) => {
  return (
    <StyledWrapper>
      <div className="label">{label}</div>
      {actionLabel && actionHref && (
        <Link className="action" href={actionHref}>
          {actionLabel} ▸
        </Link>
      )}
    </StyledWrapper>
  )
}

export default SectionRow

const StyledWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 16px;

  .label {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2px;
    color: ${tokens.color.sectionLabel};
  }
  .action {
    font-size: 0.8rem;
    color: ${tokens.color.meta};
    transition: color 0.2s;
    &:hover {
      color: ${tokens.color.accent};
    }
  }
`
