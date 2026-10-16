import React, { ReactNode } from "react"

// 기기에 깔린 컬러 이모지 폰트를 쓴다. 웹 폰트를 받지 않으니 빌드가 Google Fonts 에 기대지 않는다.
const EMOJI_FONT =
  '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif'

type Props = {
  className?: string
  children?: ReactNode
}

export const Emoji = ({ className, children }: Props) => {
  return (
    <span className={className} css={{ fontFamily: EMOJI_FONT }}>
      {children}
    </span>
  )
}
