import { useEffect, useRef, useState } from "react"

/** 요소가 화면에 한 번 들어오면 true 가 된다. 애니메이션 시작 신호로 쓴다. */
export function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    if (typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [inView, threshold])

  return [ref, inView] as const
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(media.matches)
    const onChange = () => setReduced(media.matches)
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])
  return reduced
}
