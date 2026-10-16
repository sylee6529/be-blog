import styled from "@emotion/styled"
import Link from "next/link"
import { useRouter } from "next/router"
import { tokens } from "src/styles"

const links = [
  { id: 1, name: "Posts", to: "/" },
  { id: 2, name: "About", to: "/about" },
]

const NavBar: React.FC = () => {
  const router = useRouter()

  return (
    <StyledWrapper>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <Link href={link.to} data-active={router.asPath === link.to}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </StyledWrapper>
  )
}

export default NavBar

const StyledWrapper = styled.nav`
  flex-shrink: 0;

  ul {
    display: flex;
    flex-direction: row;
    gap: 1.25rem;
    margin: 0;
    list-style: none;

    li a {
      font-size: 0.9rem;
      color: ${tokens.color.muted};
      transition: color 0.2s;

      &[data-active="true"] {
        color: ${tokens.color.text};
        font-weight: 700;
      }
      &:hover {
        color: ${tokens.color.accent};
      }
    }
  }
`
