import localFont from "next/font/local"

/**
 * kciter.so 가 쓰는 본문 폰트. 한글은 fallback 으로 pretendard 가 받는다.
 * next/font/google 은 빌드마다 Google Fonts 에서 받아 오는데, 받다가 시간이 초과되면
 * 빌드가 멈춰서 latin 파일을 저장소에 둔다. (SIL Open Font License)
 */
export const quattrocentoSans = localFont({
  src: [
    { path: "./quattrocento-sans/QuattrocentoSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./quattrocento-sans/QuattrocentoSans-Italic.woff2", weight: "400", style: "italic" },
    { path: "./quattrocento-sans/QuattrocentoSans-Bold.woff2", weight: "700", style: "normal" },
    { path: "./quattrocento-sans/QuattrocentoSans-BoldItalic.woff2", weight: "700", style: "italic" },
  ],
  display: "swap",
  variable: "--font-quattrocento-sans",
})

/** 가변 폰트라 파일 하나가 400~600 을 모두 그린다. */
export const sourceCodePro = localFont({
  src: "./source-code-pro/SourceCodePro-Variable.woff2",
  weight: "400 600",
  display: "swap",
  variable: "--font-source-code-pro",
})
