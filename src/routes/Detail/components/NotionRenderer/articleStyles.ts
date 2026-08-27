import { css } from "@emotion/react"
import { sourceCodePro } from "src/assets"
import { tokens } from "src/styles"

/**
 * kciter.so 의 본문 타이포그래피를 react-notion-x 클래스에 맞춰 옮긴 것.
 * 값은 kciter 가 배포한 CSS 에서 그대로 가져왔다.
 */
export const articleStyles = css`
  /* 컨테이너 폭에 맞춘다. 기본값이 720px 라 715px 를 넘긴다. */
  --notion-max-width: 100%;

  .notion-collection-page-properties {
    display: none !important;
  }
  /*
   * react-notion-x 의 .notion-page 는 flex 컨테이너라 인접 마진이 collapse 되지
   * 않는다. 문단 1em + 리스트 1em 이 그대로 더해져 블록마다 32px 가 벌어진다.
   * kciter 처럼 block 으로 돌려 마진이 겹치게 한다.
   */
  .notion-page {
    display: block;
    width: 100%;
    padding: 0;
  }
  .notion-page-content > :first-child {
    margin-top: 0;
  }

  /*
   * react-notion-x 는 블록마다 padding: 3px 0 을 붙인다. 패딩은 마진과 달리
   * 겹치지 않아 블록이 많은 글일수록 그대로 쌓인다. 좌우 패딩은 살리고
   * 세로만 걷어낸다.
   */
  .notion-text,
  .notion-list,
  .notion-h1,
  .notion-h2,
  .notion-h3,
  .notion-quote {
    padding-top: 0;
    padding-bottom: 0;
  }

  /* 제목: h1, h2 는 아래 경계선을 깐다 */
  .notion-h1,
  .notion-h2,
  .notion-h3 {
    color: ${tokens.color.text};
    font-weight: 700;
  }
  .notion-h1 {
    font-size: 2rem;
    padding-bottom: 12px;
    border-bottom: 1px solid ${tokens.color.border};
  }
  .notion-h2 {
    font-size: 1.6em;
    padding-bottom: 8px;
    border-bottom: 1px solid ${tokens.color.border};
  }
  .notion-h3 {
    font-size: 1.3em;
    margin: 8px 0;
  }

  /* 본문 */
  .notion-text {
    margin: 1em 0;
    line-height: 1.8;
  }
  .notion-link {
    color: ${tokens.color.accent};
    text-decoration: none;
    border-bottom: none;

    &:hover {
      text-decoration: underline;
    }
  }

  /*
   * 리스트. react-notion-x 는 불렛 하나마다 ul 을 따로 만든다.
   * 그래서 ul 에 세로 margin 을 그냥 주면 불렛 사이가 통째로 벌어진다.
   * 연속된 ul 사이의 margin 만 걷어내 한 덩어리처럼 보이게 한다.
   */
  .notion-list {
    width: 100%;
    margin: 1em 0;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 40px;
    line-height: 1.8;
    word-break: break-all;
  }
  /*
   * 단순 불렛끼리는 붙이고, 아래에 설명을 달고 있는 불렛 다음에는
   * 한 덩어리씩 끊어 읽히도록 간격을 남긴다.
   */
  /* li 마다 붙는 padding 6px 0 은 kciter 에 없는 값이라 불렛마다 12px 씩 쌓인다 */
  .notion-list li {
    padding-top: 0;
    padding-bottom: 0;
  }
  .notion-list:not(:has(.notion-list)) + .notion-list {
    margin-top: 0;
  }
  .notion-list:not(:has(.notion-list)):has(+ .notion-list) {
    margin-bottom: 0;
  }
  .notion-list-disc {
    list-style: outside disc;
  }
  .notion-list-numbered {
    list-style: outside decimal;
  }
  /*
   * 노션에서 불렛 아래로 탭해 넣은 내용은 li 의 자식이 아니라 형제 ul 로 그려진다.
   * 그대로 두면 padding-left 40px 가 겹쳐 80px 나 들여쓰이고, 바깥 ul 과 안쪽
   * 문단이 각각 마진을 가져 위아래도 벌어진다. 들여쓰기를 줄이고 마진은
   * 안쪽 블록에만 맡긴다.
   */
  .notion-list .notion-list {
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 12px;
    list-style-position: outside;
  }
  /* 불렛에 딸린 설명은 새 문단이 아니라 이어지는 내용이라 바짝 붙인다 */
  .notion-list .notion-list > .notion-text {
    margin-top: 4px;
    margin-bottom: 0;
  }

  /* 인용 */
  .notion-quote {
    margin: 10px 0;
    padding: 8px 16px;
    color: ${tokens.color.textSub};
    background-color: ${tokens.color.border};
    border-left: 0.25em solid ${tokens.color.borderHover};
    line-height: 1.5;
    font-size: inherit;
  }

  /* 표 */
  .notion-simple-table {
    border-collapse: collapse;
  }
  .notion-simple-table td,
  .notion-simple-table th,
  .notion-simple-table-header-cell {
    border: 1px solid ${tokens.color.muted};
    padding: 8px;
    text-align: left;
  }

  /* 이미지 캡션 */
  .notion-asset-caption {
    text-align: center;
    color: #637381;
    font-size: 12px;
  }

  .notion-hr {
    border-top: 1px solid ${tokens.color.border};
  }

  /*
   * 노션에서 엔터로 띄운 빈 줄은 notion-blank 블록으로 그려져 30px 를 차지하고
   * 위아래 마진까지 더해 문단 사이가 60px 넘게 벌어진다. 마크다운으로 쓰는
   * kciter 에는 없는 블록이라 높이를 0 으로 접어 앞뒤 마진이 통과하게 한다.
   */
  .notion-blank {
    height: 0;
    min-height: 0;
    margin: 0;
    padding: 0;
    line-height: 0;
  }

  /* 인라인 코드 */
  .notion-inline-code {
    color: #e45649;
    background: #f4f4f4;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    padding: 0.2em 0.45em;
    font-family: ${sourceCodePro.style.fontFamily}, monospace;
    font-size: 0.9em;
    white-space: normal;
  }

  /*
   * 코드블록. kciter 는 맥 창처럼 신호등 점과 언어명을 헤더바로 얹는다.
   * 언어명은 NotionRenderer 에서 data-language 로 넣어준다.
   */
  .notion-code {
    box-sizing: border-box;
    position: relative;
    width: 95%;
    margin: 32px auto;
    padding: 0;
    background-color: ${tokens.color.card};
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

    &::before {
      content: attr(data-language);
      display: block;
      height: 35px;
      line-height: 35px;
      padding-left: 62px;
      color: ${tokens.color.muted};
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background-color: #f6f8fa;
      background-image: radial-gradient(5px at 18px 18px, #ff5f57 5px, transparent 6px),
        radial-gradient(5px at 34px 18px, #febc2e 5px, transparent 6px),
        radial-gradient(5px at 50px 18px, #28c840 5px, transparent 6px);
      background-repeat: no-repeat;
      border-bottom: 1px solid #e8e8e8;
    }

    > code {
      display: block;
      padding: 0.8em 1em;
      font-family: ${sourceCodePro.style.fontFamily}, monospace;
      font-size: 13px;
      line-height: 1.5;
      overflow-x: auto;
      background: none;
      text-shadow: none;
    }

    /* 복사 버튼을 헤더바 오른쪽으로 */
    .notion-code-copy {
      top: 6px;
      right: 8px;
    }
  }

  @media (max-width: 768px) {
    .notion-code {
      width: 100%;
      margin: 24px 0;
    }
    .notion-list {
      padding-left: 24px;
    }
  }
`
