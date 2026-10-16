import { getBlockValue, getPageContentBlockIds, getTextContent } from "notion-utils"
import { ExtendedRecordMap } from "notion-types"

// 한글은 공백 단위로 세면 실제 분량보다 크게 적게 나온다. 글자수 기준으로 따로 센다.
const HANGUL_CHARS_PER_MINUTE = 500
const WORDS_PER_MINUTE = 220
const IMAGE_SECONDS = 12

/**
 * notion-utils 의 estimatePageReadTime 은 공백 기준 단어수만 보기 때문에
 * 한글 본문에서 항상 "less than a minute" 이 나온다. 그래서 직접 센다.
 */
export const getReadTime = (recordMap: ExtendedRecordMap): number => {
  let hangul = 0
  let words = 0
  let images = 0

  for (const id of getPageContentBlockIds(recordMap)) {
    const block = getBlockValue(recordMap.block[id])
    if (!block) continue

    if (block.type === "image") images += 1

    const title = (block.properties as any)?.title
    if (!title) continue

    const text = getTextContent(title)
    hangul += (text.match(/[가-힣]/g) || []).length
    words += text
      .replace(/[가-힣]/g, " ")
      .split(/\s+/)
      .filter(Boolean).length
  }

  const minutes =
    hangul / HANGUL_CHARS_PER_MINUTE +
    words / WORDS_PER_MINUTE +
    (images * IMAGE_SECONDS) / 60

  return Math.max(1, Math.round(minutes))
}
