import styled from "@emotion/styled"
import React, { InputHTMLAttributes } from "react"
import { tokens } from "src/styles"

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWrapper>
      <input type="text" placeholder="Search keyword..." {...props} />
    </StyledWrapper>
  )
}

export default SearchInput

const StyledWrapper = styled.div`
  margin-bottom: 0.75rem;

  input {
    width: 100%;
    padding: 0.55rem 0.9rem;
    border: 1px solid ${tokens.color.border};
    border-radius: ${tokens.radius.card};
    background-color: ${tokens.color.card};
    font-size: 0.85rem;
    color: ${tokens.color.text};
    transition: ${tokens.transition};

    &::placeholder {
      color: ${tokens.color.meta};
    }
    &:focus {
      border-color: ${tokens.color.borderHover};
      box-shadow: ${tokens.shadow.card};
    }
  }
`
