import React, { ReactNode } from "react"
import { ThemeProvider } from "./ThemeProvider"
import useScheme from "src/hooks/useScheme"
import Header from "./Header"
import styled from "@emotion/styled"
import { tokens } from "src/styles"
import Scripts from "src/layouts/RootLayout/Scripts"
import useGtagEffect from "./useGtagEffect"

type Props = {
  children: ReactNode
}

const RootLayout = ({ children }: Props) => {
  const [scheme] = useScheme()
  useGtagEffect()
  return (
    <ThemeProvider scheme={scheme}>
      <Scripts />
      {/* // TODO: replace react query */}
      {/* {metaConfig.type !== "Paper" && <Header />} */}
      <StyledContainer>
        <Header />
        <main>{children}</main>
      </StyledContainer>
    </ThemeProvider>
  )
}

export default RootLayout

const StyledContainer = styled.div`
  margin: 0 auto;
  width: ${tokens.contentWidth}px;
  padding-top: 1rem;

  @media (max-width: 768px) {
    width: 90vw;
  }
`
