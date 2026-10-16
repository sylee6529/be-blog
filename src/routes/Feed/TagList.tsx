import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"
import { tokens } from "src/styles"
import { useTagsQuery } from "src/hooks/useTagsQuery"

const TagList: React.FC = () => {
  const router = useRouter()
  const currentTag = router.query.tag || undefined
  const data = useTagsQuery()

  const handleClickTag = (value: string) => {
    router.push({
      query: {
        ...router.query,
        tag: currentTag === value ? undefined : value,
      },
    })
  }

  const tags = Object.keys(data)
  if (!tags.length) return null

  return (
    <StyledWrapper>
      {tags.map((key) => (
        <a
          key={key}
          data-active={key === currentTag}
          onClick={() => handleClickTag(key)}
        >
          {key}
        </a>
      ))}
    </StyledWrapper>
  )
}

export default TagList

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.75rem;

  a {
    padding: 0.2rem 0.7rem;
    border: 1px solid ${tokens.color.borderStrong};
    border-radius: ${tokens.radius.pill};
    font-size: 0.75rem;
    color: ${tokens.color.muted};
    background-color: ${tokens.color.card};
    cursor: pointer;
    transition: ${tokens.transition}, color 0.2s;

    &:hover {
      border-color: ${tokens.color.borderHover};
      color: ${tokens.color.text};
    }
    &[data-active="true"] {
      color: ${tokens.color.accent};
      background-color: ${tokens.color.accentSoft};
      border-color: transparent;
    }
  }
`
