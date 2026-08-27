import styled from "@emotion/styled"
import { tokens } from "src/styles"
import { useRouter } from "next/router"
import React from "react"

type Props = {
  children: string
}

const Tag: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const handleClick = (value: string) => {
    router.push(`/?tag=${value}`)
  }
  return (
    <StyledWrapper onClick={() => handleClick(children)}>
      {children}
    </StyledWrapper>
  )
}

export default Tag

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.7rem;
  border: 1px solid ${tokens.color.borderStrong};
  border-radius: ${tokens.radius.pill};
  font-size: 0.75rem;
  line-height: 1rem;
  color: ${tokens.color.muted};
  background-color: ${tokens.color.card};
  cursor: pointer;
  transition: ${tokens.transition}, color 0.2s;

  &:hover {
    border-color: ${tokens.color.borderHover};
    color: ${tokens.color.text};
  }
`
