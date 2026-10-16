import styled from "@emotion/styled"
import Link from "next/link"
import React from "react"
import { CONFIG } from "site.config"
import { formatDate } from "src/libs/utils"
import { tokens } from "src/styles"
import { TPost } from "src/types"
import SectionRow from "../SectionRow"
import Thumbnail from "./Thumbnail"

type Props = {
  posts: TPost[]
}

const postDate = (post: TPost) =>
  formatDate(post?.date?.start_date || post.createdTime, CONFIG.lang)

/**
 * kciter.so 의 벤토 그리드.
 * 최신 1개를 크게, 다음 2개를 오른쪽 열에, 그 다음 3개를 아래 행에 놓는다.
 */
const Bento: React.FC<Props> = ({ posts }) => {
  if (!posts.length) return null

  const [featured, ...rest] = posts
  const side = rest.slice(0, 2)
  const bottom = rest.slice(2, 5)

  return (
    <StyledWrapper>
      <div className="bento">
        <Link className="featured" href={`/${featured.slug}`}>
          <Thumbnail
            className="featured-image"
            src={featured.thumbnail}
            alt={featured.title}
          />
          <div className="featured-body">
            <div className="tag">Latest</div>
            <h2 className="featured-title">{featured.title}</h2>
            {featured.summary && (
              <p className="featured-excerpt">{featured.summary}</p>
            )}
            <div className="meta">{postDate(featured)}</div>
          </div>
        </Link>

        {side.length > 0 && (
          <div className="side">
            {side.map((post) => (
              <Link className="side-card" key={post.id} href={`/${post.slug}`}>
                <Thumbnail src={post.thumbnail} alt={post.title} />
                <div className="side-body">
                  <div className="side-title">{post.title}</div>
                  <div className="meta">{postDate(post)}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {bottom.length > 0 && (
        <div className="bottom-row">
          <SectionRow
            label="MORE ARTICLES"
            actionLabel="All articles"
            actionHref="#all-posts"
          />
          <div className="bottom">
            {bottom.map((post) => (
              <Link
                className="bottom-card"
                key={post.id}
                href={`/${post.slug}`}
              >
                <Thumbnail
                  className="bottom-image"
                  src={post.thumbnail}
                  alt={post.title}
                />
                <div className="bottom-title">{post.title}</div>
                <div className="meta">{postDate(post)}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </StyledWrapper>
  )
}

export default Bento

const card = `
  border-radius: ${tokens.radius.card};
  overflow: hidden;
  background: ${tokens.color.card};
  border: 1px solid ${tokens.color.border};
  transition: ${tokens.transition};

  &:hover {
    border-color: ${tokens.color.borderHover};
    box-shadow: ${tokens.shadow.card};
  }
`

const StyledWrapper = styled.div`
  .meta {
    font-size: 0.75rem;
    color: ${tokens.color.meta};
  }

  .bento {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 16px;
    margin-bottom: 32px;
  }

  .featured {
    display: flex;
    flex-direction: column;
    ${card}

    &:hover .featured-title {
      color: ${tokens.color.accent};
      transition: color 0.2s;
    }
  }
  .featured-image {
    flex: 1;
    min-height: 180px;
    aspect-ratio: auto;
  }
  .featured-body {
    padding: 16px 18px 18px;
    flex-shrink: 0;
  }
  .tag {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: ${tokens.color.accent};
    background: ${tokens.color.accentSoft};
    padding: 3px 8px;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .featured-title {
    margin: 0 0 8px;
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .featured-excerpt {
    font-size: 0.85rem;
    color: ${tokens.color.body};
    line-height: 1.5;
    margin: 0 0 10px;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .side {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .side-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    ${card}

    &:hover .side-title {
      color: ${tokens.color.accent};
      transition: color 0.2s;
    }
  }
  .side-body {
    padding: 12px 14px 14px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .side-title {
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 8px;
  }

  .bottom-row {
    margin-bottom: 16px;
  }
  .bottom {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .bottom-card {
    ${card}

    &:hover .bottom-title {
      color: ${tokens.color.accent};
      transition: color 0.2s;
    }
    .meta {
      padding: 6px 12px 12px;
    }
  }
  .bottom-title {
    font-size: 0.85rem;
    font-weight: 600;
    line-height: 1.35;
    padding: 10px 12px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    .bento {
      grid-template-columns: 1fr;
    }
    .featured-image {
      flex: none;
      aspect-ratio: 16 / 9;
    }
    .side {
      flex-direction: row;
    }
    .bottom {
      grid-template-columns: 1fr;
    }
    .bottom-card {
      display: grid;
      grid-template-columns: 100px 1fr;
      grid-template-rows: auto auto;

      .bottom-image {
        grid-row: 1 / 3;
        height: 100%;
        aspect-ratio: auto;
      }
      .bottom-title {
        align-self: end;
      }
      .meta {
        padding: 4px 12px 10px;
      }
    }
  }

  @media (max-width: 480px) {
    .side {
      flex-direction: column;
    }
  }
`
