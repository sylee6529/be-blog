import Link from "next/link"
import styled from "@emotion/styled"
import { CONFIG } from "site.config"
import { zIndexes } from "src/styles/zIndexes"
import { tokens } from "src/styles"
import NavBar from "./NavBar"

const Header: React.FC = () => {
  return (
    <StyledWrapper>
      <Link className="brand" href="/" aria-label={CONFIG.blog.title}>
        <span className="brand-name">{CONFIG.blog.title}</span>
        <span className="brand-divider">|</span>
        <span className="brand-tagline">devlog</span>
      </Link>
      <NavBar />
    </StyledWrapper>
  )
}

export default Header

const StyledWrapper = styled.header`
  position: relative;
  z-index: ${zIndexes.header};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0 -1rem 2.5rem;
  padding: 0.625rem 1rem;
  border-radius: ${tokens.radius.card};
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);

  .brand {
    display: flex;
    align-items: baseline;
    gap: 0.4rem;
    flex-shrink: 0;

    .brand-name {
      font-size: 1.05rem;
      font-weight: 700;
      color: ${tokens.color.text};
    }
    .brand-divider {
      color: ${tokens.color.border};
    }
    .brand-tagline {
      font-size: 0.85rem;
      color: ${tokens.color.muted};
    }
  }
`
