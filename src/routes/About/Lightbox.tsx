import styled from "@emotion/styled"
import React, { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { tokens } from "src/styles"

/** 썸네일을 누르면 원본 크기로 크게 연다. Esc 나 바깥을 누르면 닫힌다. */
const Lightbox: React.FC<{ src: string; alt: string; title: string }> = ({
  src,
  alt,
  title,
}) => {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open, close])

  return (
    <>
      <StyledThumb type="button" onClick={() => setOpen(true)} aria-label={`${title} 화면 크게 보기`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" />
        <span className="zoom">크게 보기</span>
      </StyledThumb>
      {open &&
        createPortal(
          <StyledOverlay role="dialog" aria-modal="true" aria-label={`${title} 화면`} onClick={close}>
            <figure onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt} />
              <figcaption>
                <span>{title}</span>
                <button type="button" onClick={close}>
                  닫기
                </button>
              </figcaption>
            </figure>
          </StyledOverlay>,
          document.body
        )}
    </>
  )
}

export default Lightbox

const StyledThumb = styled.button`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  min-height: 150px;
  overflow: hidden;
  cursor: zoom-in;
  border: 1px solid ${tokens.color.border};
  border-radius: 10px;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left top;
    transition: transform 0.4s;
  }
  .zoom {
    position: absolute;
    right: 8px;
    bottom: 8px;
    padding: 3px 10px;
    font-size: 11.5px;
    font-weight: 600;
    color: #fff;
    background: rgba(35, 47, 62, 0.78);
    border-radius: ${tokens.radius.pill};
    opacity: 0;
    transition: opacity 0.2s;
  }
  &:hover img {
    transform: scale(1.04);
  }
  &:hover .zoom,
  &:focus-visible .zoom {
    opacity: 1;
  }
  &:focus-visible {
    outline: 2px solid ${tokens.color.accent};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    height: auto;
    img {
      height: auto;
      aspect-ratio: 16 / 9;
    }
    .zoom {
      opacity: 1;
    }
  }
`

const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3vh 3vw;
  background: rgba(15, 20, 30, 0.78);

  figure {
    display: flex;
    flex-direction: column;
    max-width: min(1400px, 94vw);
    max-height: 94vh;
    margin: 0;
    overflow: hidden;
    background: #fff;
    border-radius: 12px;
  }
  img {
    display: block;
    max-width: 100%;
    max-height: calc(94vh - 52px);
    object-fit: contain;
  }
  figcaption {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 700;
    color: #212b36;
    border-top: 1px solid #eee;

    button {
      padding: 5px 14px;
      font-size: 13px;
      font-weight: 600;
      color: #212b36;
      border: 1px solid #dfe3e8;
      border-radius: ${tokens.radius.pill};
      &:hover {
        color: #5c6ac4;
        border-color: #5c6ac4;
      }
    }
  }
`
