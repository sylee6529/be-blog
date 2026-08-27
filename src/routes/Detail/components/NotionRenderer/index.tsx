import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { ExtendedRecordMap } from "notion-types"
import useScheme from "src/hooks/useScheme"

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css"

// used for code syntax highlighting (optional)
import "prismjs/themes/prism.css"

// used for rendering equations (optional)

import "katex/dist/katex.min.css"
import { FC, useEffect, useRef } from "react"
import styled from "@emotion/styled"
import Prism from "src/libs/prism"
import { articleStyles } from "./articleStyles"

const _NotionRenderer = dynamic(
  () => import("react-notion-x").then((m) => m.NotionRenderer),
  { ssr: false }
)

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => m.Code)
)

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
)
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
)

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "")
}

type Props = {
  recordMap: ExtendedRecordMap
}

const NotionRenderer: FC<Props> = ({ recordMap }) => {
  const [scheme] = useScheme()
  const wrapperRef = useRef<HTMLDivElement>(null)

  // kciter 의 코드블록 헤더바는 content: attr(data-language) 로 언어명을 찍는다.
  // react-notion-x 는 language-xxx 클래스만 달아주므로 여기서 옮겨 담는다.
  // 본문이 ssr:false 로 나중에 그려지기 때문에 붙는 시점을 관찰해야 한다.
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const label = () => {
      const fresh = wrapper.querySelectorAll<HTMLElement>(
        "pre.notion-code:not([data-language])"
      )
      if (!fresh.length) return

      fresh.forEach((el) => {
        const language = [...el.classList]
          .find((c) => c.startsWith("language-"))
          ?.replace("language-", "")
        el.dataset.language = language || "code"
      })

      /*
       * react-notion-x 는 자체 node_modules 에 prismjs 사본을 두고 있어서
       * 우리가 문법을 등록한 인스턴스와 실제로 하이라이팅하는 인스턴스가 다르다.
       * 나중에 로드된 쪽이 window.Prism 을 덮으므로, 그쪽에 문법을 옮겨 심고
       * 같은 인스턴스로 하이라이팅한다.
       */
      const active = (window as unknown as { Prism?: typeof Prism }).Prism
      if (active && active !== Prism) {
        Object.assign(active.languages, Prism.languages)
      }
      ;(active ?? Prism).highlightAllUnder(wrapper)
    }

    label()
    const observer = new MutationObserver(label)
    observer.observe(wrapper, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [recordMap])

  return (
    <StyledWrapper ref={wrapperRef}>
      <_NotionRenderer
        darkMode={scheme === "dark"}
        recordMap={recordMap}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          nextImage: Image,
          nextLink: Link,
        }}
        mapPageUrl={mapPageUrl}
      />
    </StyledWrapper>
  )
}

export default NotionRenderer

const StyledWrapper = styled.div`
  ${articleStyles}
`
