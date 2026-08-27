import styled from "@emotion/styled"
import Image from "next/image"
import React from "react"
import { tokens } from "src/styles"

type Props = {
  src?: string
  alt: string
  className?: string
}

/**
 * Notion 의 thumbnail 속성이 비어 있으면 단색 플레이스홀더로 떨어진다.
 * 속성을 채우면 그대로 이미지로 바뀐다.
 */
const Thumbnail: React.FC<Props> = ({ src, alt, className }) => {
  if (!src) return <StyledPlaceholder className={className} aria-hidden />
  return (
    <StyledImage className={className}>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 90vw, 715px" />
    </StyledImage>
  )
}

export default Thumbnail

const StyledPlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: ${tokens.color.placeholder};
`

const StyledImage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: ${tokens.color.placeholder};

  img {
    object-fit: cover;
  }
`
