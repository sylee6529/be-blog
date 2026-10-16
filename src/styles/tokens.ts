/**
 * kciter.so 에서 추출한 디자인 토큰.
 * 색은 CSS 변수로 두고, palette 에서 light 와 dark 값을 고른다.
 */
export const tokens = {
  // 본문 폭. kciter 는 715px 고정에 모바일에서 90vw 로 떨어진다.
  contentWidth: 715,

  // 실제 색은 palette 에 있고, AboutColors 가 scheme 에 맞는 값을 CSS 변수로 깐다.
  color: {
    text: "var(--tk-text)",
    textSub: "var(--tk-text-sub)",
    body: "var(--tk-body)",
    meta: "var(--tk-meta)",
    sectionLabel: "var(--tk-section-label)",
    muted: "var(--tk-muted)",
    accent: "var(--tk-accent)",
    accentSoft: "var(--tk-accent-soft)",
    border: "var(--tk-border)",
    borderHover: "var(--tk-border-hover)",
    borderStrong: "var(--tk-border-strong)",
    card: "var(--tk-card)",
    page: "var(--tk-page)",
    placeholder: "var(--tk-placeholder)",
    // 그림과 라벨에 쓰는 보조 색
    tintBg: "var(--tk-tint-bg)",
    tintBorder: "var(--tk-tint-border)",
    neutralBg: "var(--tk-neutral-bg)",
    neutralBar: "var(--tk-neutral-bar)",
    problem: "var(--tk-problem)",
    problemBg: "var(--tk-problem-bg)",
    solution: "var(--tk-solution)",
    solutionBg: "var(--tk-solution-bg)",
    iconFilter: "var(--tk-icon-filter)",
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

const light = {
  text: "#212b36",
  "text-sub": "#454f5b",
  body: "#666",
  meta: "#aaa",
  "section-label": "#999",
  muted: "#888",
  accent: "#5c6ac4",
  "accent-soft": "#748ffc14",
  border: "#eee",
  "border-hover": "#ccc",
  "border-strong": "#dfe3e8",
  card: "#fff",
  page: "#fbfbfa",
  placeholder: "#f0f0f0",
  "tint-bg": "#eef0fb",
  "tint-border": "#c5cbf0",
  "neutral-bg": "#f4f6f8",
  "neutral-bar": "#c4cdd5",
  problem: "#b54708",
  "problem-bg": "#fef3e6",
  solution: "#067647",
  "solution-bg": "#e3f5ea",
  "icon-filter": "none",
}

const dark: typeof light = {
  text: "#e8eaed",
  "text-sub": "#b9bfc7",
  body: "#9aa1a9",
  meta: "#7f868e",
  "section-label": "#8b9199",
  muted: "#959ca4",
  accent: "#97a2f4",
  "accent-soft": "#97a2f41a",
  border: "#2d3137",
  "border-hover": "#4a5058",
  "border-strong": "#3a3f46",
  card: "#1c1f23",
  page: "#16181b",
  placeholder: "#26292e",
  "tint-bg": "#232842",
  "tint-border": "#4b5390",
  "neutral-bg": "#24272c",
  "neutral-bar": "#4d535c",
  problem: "#f3a764",
  "problem-bg": "#3a2a1b",
  solution: "#63d39c",
  "solution-bg": "#16301f",
  "icon-filter": "invert(1)",
}

export const palette = { light, dark }

/** palette 를 CSS 변수 선언 문자열로 바꾼다. */
export const paletteVars = (scheme: "light" | "dark") =>
  Object.entries(palette[scheme])
    .map(([key, value]) => `--tk-${key}: ${value};`)
    .join("\n")
