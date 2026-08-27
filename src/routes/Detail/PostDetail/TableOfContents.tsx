import styled from "@emotion/styled"
import { getBlockValue, getPageTableOfContents, uuidToId } from "notion-utils"
import { ExtendedRecordMap, PageBlock } from "notion-types"
import React from "react"
import { tokens } from "src/styles"

type Props = {
  recordMap: ExtendedRecordMap
  pageId: string
}

/** kciter 의 중첩 목차. react-notion-x 가 헤딩에 uuidToId(block.id) 를 id 로 달아준다. */
const TableOfContents: React.FC<Props> = ({ recordMap, pageId }) => {
  const page = getBlockValue(recordMap.block[pageId]) as PageBlock | undefined
  if (!page) return null

  const toc = getPageTableOfContents(page, recordMap)
  if (toc.length < 2) return null

  return (
    <StyledWrapper aria-label="목차">
      <ul>
        {toc.map((item) => (
          <li key={item.id} data-indent={item.indentLevel}>
            <a href={`#${uuidToId(item.id)}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </StyledWrapper>
  )
}

export default TableOfContents

const StyledWrapper = styled.nav`
  margin: 1.75rem 0 2rem;
  padding: 14px 18px;
  border: 1px solid ${tokens.color.border};
  border-radius: ${tokens.radius.card};
  background: ${tokens.color.card};

  ul {
    margin: 0;
    list-style: none;
  }

  li {
    line-height: 1.7;

    &[data-indent="1"] {
      padding-left: 1rem;
    }
    &[data-indent="2"] {
      padding-left: 2rem;
    }

    a {
      font-size: 0.85rem;
      color: ${tokens.color.muted};
      transition: color 0.2s;

      &:hover {
        color: ${tokens.color.accent};
      }
    }
  }
`
