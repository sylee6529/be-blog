import styled from "@emotion/styled"
import { getBlockValue, getPageTableOfContents, uuidToId } from "notion-utils"
import { ExtendedRecordMap, PageBlock } from "notion-types"
import React, { useEffect, useMemo, useState } from "react"
import { tokens } from "src/styles"

type Props = {
  recordMap: ExtendedRecordMap
  pageId: string
}

type Node = {
  id: string
  text: string
  children: Node[]
}

/** indentLevel 로 평평하게 오는 목차를 트리로 접는다. */
const toTree = (
  entries: { id: string; text: string; indentLevel: number }[]
): Node[] => {
  const roots: Node[] = []
  const stack: { level: number; node: Node }[] = []

  for (const entry of entries) {
    const node: Node = { id: uuidToId(entry.id), text: entry.text, children: [] }
    while (stack.length && stack[stack.length - 1].level >= entry.indentLevel) {
      stack.pop()
    }
    if (stack.length) stack[stack.length - 1].node.children.push(node)
    else roots.push(node)
    stack.push({ level: entry.indentLevel, node })
  }
  return roots
}

const flatten = (nodes: Node[]): string[] =>
  nodes.flatMap((n) => [n.id, ...flatten(n.children)])

/**
 * kciter.so 의 목차. 본문 오른쪽 바깥으로 띄운 sticky 패널이고,
 * 폭이 모자라는 화면에서는 숨긴다.
 */
const TableOfContents: React.FC<Props> = ({ recordMap, pageId }) => {
  const page = getBlockValue(recordMap.block[pageId]) as PageBlock | undefined

  const tree = useMemo(() => {
    if (!page) return []
    return toTree(getPageTableOfContents(page, recordMap))
  }, [page, recordMap])

  const ids = useMemo(() => flatten(tree), [tree])
  const [activeId, setActiveId] = useState<string>()
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  // 본문은 react-notion-x 가 클라이언트에서 그리므로 스크롤 시점에 헤딩을 찾는다.
  useEffect(() => {
    if (!ids.length) return

    let frame = 0
    const update = () => {
      frame = 0
      let current: string | undefined
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) current = id
      }
      setActiveId(current ?? ids[0])
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ids])

  if (tree.length < 2) return null

  const renderNodes = (nodes: Node[]) => (
    <ul className="toc-list">
      {nodes.map((node) => {
        const hasChildren = node.children.length > 0
        const expanded = !collapsed[node.id]
        return (
          <li
            key={node.id}
            className={hasChildren ? "toc-parent" : undefined}
            data-expanded={expanded}
          >
            <div className="toc-link-row">
              <a
                href={`#${node.id}`}
                data-active={activeId === node.id}
                onClick={() => setActiveId(node.id)}
              >
                {node.text}
              </a>
              {hasChildren && (
                <button
                  type="button"
                  className="toc-toggle"
                  aria-label={expanded ? "접기" : "펼치기"}
                  onClick={() =>
                    setCollapsed((prev) => ({ ...prev, [node.id]: expanded }))
                  }
                >
                  ›
                </button>
              )}
            </div>
            {hasChildren && (
              <div className="toc-children">{renderNodes(node.children)}</div>
            )}
          </li>
        )
      })}
    </ul>
  )

  return <StyledWrapper aria-label="목차">{renderNodes(tree)}</StyledWrapper>
}

export default TableOfContents

const StyledWrapper = styled.nav`
  float: right;
  width: 250px;
  max-width: 250px;
  max-height: 80vh;
  margin-right: -270px;
  position: sticky;
  top: 50px;
  overflow: hidden auto;

  /* 컨테이너 오른쪽 바깥에 250px 를 놓을 자리가 안 나오면 숨긴다 */
  @media (max-width: 1300px) {
    display: none;
  }

  .toc-list {
    width: 100%;
    margin: 0 0 8px;
    padding: 0;

    li {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    li .toc-list {
      padding-left: 0;
    }

    a {
      display: block;
      margin-left: 6px;
      padding: 8px 12px;
      border-radius: 4px;
      color: ${tokens.color.textSub};
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      word-break: keep-all;
      text-decoration: none;

      &:hover {
        color: ${tokens.color.text};
        background-color: #f4f6f8;
      }
      &[data-active="true"] {
        color: ${tokens.color.text};
        background-color: #f4f6f8;
        font-weight: 600;
      }
    }
  }

  .toc-link-row {
    display: flex;
    align-items: center;

    a {
      flex: 1;
      min-width: 0;
      word-break: break-all;
    }
  }

  .toc-toggle {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    border-radius: 4px;
    background: none;
    color: #919eab;
    cursor: pointer;
    transition: transform 0.2s, color 0.2s;

    &:hover {
      color: ${tokens.color.text};
      background-color: #f4f6f8;
    }
  }

  [data-expanded="true"] > .toc-link-row > .toc-toggle {
    transform: rotate(90deg);
  }

  .toc-children {
    max-height: 0;
    margin-left: 18px;
    border-left: 1px solid ${tokens.color.borderStrong};
    overflow: hidden;
    transition: max-height 0.25s;
  }
  [data-expanded="true"] > .toc-children {
    max-height: 500px;
    overflow: visible;
  }
`
