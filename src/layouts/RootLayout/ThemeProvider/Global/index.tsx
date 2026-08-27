import { Global as _Global, css } from "@emotion/react"

import { ThemeProvider as _ThemeProvider } from "@emotion/react"
import { pretendard, quattrocentoSans, sourceCodePro } from "src/assets"
import { tokens } from "src/styles"

export const Global = () => {
  return (
    <_Global
      styles={css`
        body {
          margin: 0;
          padding: 0;
          color: ${tokens.color.text};
          background-color: ${tokens.color.page};
          font-family: ${quattrocentoSans.style.fontFamily},
            ${pretendard.style.fontFamily}, sans-serif;
          font-weight: 400;
          font-style: normal;
          -webkit-font-smoothing: antialiased;
        }

        * {
          color-scheme: light;
          box-sizing: border-box;
        }

        code,
        pre,
        kbd,
        samp {
          font-family: ${sourceCodePro.style.fontFamily}, monospace;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
          font-weight: inherit;
          font-style: inherit;
          color: ${tokens.color.text};
        }

        a {
          all: unset;
          cursor: pointer;
        }

        ul {
          padding: 0;
        }

        // init button
        button {
          all: unset;
          cursor: pointer;
        }

        // init input
        input {
          all: unset;
          box-sizing: border-box;
        }

        // init textarea
        textarea {
          border: none;
          background-color: transparent;
          font-family: inherit;
          padding: 0;
          outline: none;
          resize: none;
          color: inherit;
        }

        hr {
          width: 100%;
          border: none;
          margin: 0;
          border-top: 1px solid ${tokens.color.border};
        }
      `}
    />
  )
}
