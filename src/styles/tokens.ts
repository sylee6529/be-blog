/**
 * kciter.so 에서 추출한 디자인 토큰.
 * 라이트 전용 팔레트라 scheme 에 따라 갈라지지 않는다.
 */
export const tokens = {
  // 본문 폭. kciter 는 715px 고정에 모바일에서 90vw 로 떨어진다.
  contentWidth: 715,

  color: {
    text: "#212b36",
    textSub: "#454f5b",
    body: "#666",
    meta: "#aaa",
    sectionLabel: "#999",
    muted: "#888",
    accent: "#5c6ac4",
    accentSoft: "#748ffc14",
    border: "#eee",
    borderHover: "#ccc",
    borderStrong: "#dfe3e8",
    card: "#fff",
    page: "#fbfbfa",
    placeholder: "#f0f0f0",
  },

  radius: {
    card: "12px",
    pill: "50px",
  },

  shadow: {
    card: "0 4px 20px #0000000f",
    avatar: "1px 2px 6px #0003",
  },

  transition: "border-color .2s, box-shadow .2s",
} as const

export type Tokens = typeof tokens
