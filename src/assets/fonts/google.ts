import { Quattrocento_Sans, Source_Code_Pro } from "next/font/google"

/** kciter.so 가 쓰는 본문 폰트. 한글은 fallback 으로 pretendard 가 받는다. */
export const quattrocentoSans = Quattrocento_Sans({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quattrocento-sans",
})

export const sourceCodePro = Source_Code_Pro({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-code-pro",
})
