import styled from "@emotion/styled"
import Link from "next/link"
import React from "react"
import { CONFIG } from "site.config"
import { formatDate } from "src/libs/utils"
import { tokens } from "src/styles"
import usePostsQuery from "src/hooks/usePostsQuery"
import { TPost } from "src/types"

type Props = {
  current: TPost
}

/** 같은 태그를 공유하는 글을 우선하고, 모자라면 최신글로 채운다. */
const pickRelated = (posts: TPost[], current: TPost) => {
  const others = posts.filter((post) => post.id !== current.id)
  const tags = current.tags ?? []

  const shared = others.filter((post) =>
    (post.tags ?? []).some((tag) => tags.includes(tag))
  )
  const rest = others.filter((post) => !shared.includes(post))

  return [...shared, ...rest].slice(0, 3)
}

const RelatedPosts: React.FC<Props> = ({ current }) => {
  const posts = usePostsQuery()
  const related = pickRelated(posts, current)

  if (!related.length) return null

  return (
    <StyledWrapper>
      <div className="label">RELATED POSTS</div>
      <div className="grid">
        {related.map((post) => (
          <Link className="card" key={post.id} href={`/${post.slug}`}>
            <div className="title">{post.title}</div>
            <div className="date">
              {formatDate(
                post?.date?.start_date || post.createdTime,
                CONFIG.lang
              )}
            </div>
          </Link>
        ))}
      </div>
    </StyledWrapper>
  )
}

export default RelatedPosts

const StyledWrapper = styled.section`
  margin-top: 3rem;

  > .label {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2px;
    color: ${tokens.color.sectionLabel};
    margin-bottom: 16px;
  }

  > .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  .card {
    padding: 14px;
    border: 1px solid ${tokens.color.border};
    border-radius: ${tokens.radius.card};
    background: ${tokens.color.card};
    transition: ${tokens.transition};

    &:hover {
      border-color: ${tokens.color.borderHover};
      box-shadow: ${tokens.shadow.card};
    }
    &:hover .title {
      color: ${tokens.color.accent};
      transition: color 0.2s;
    }

    .title {
      font-size: 0.85rem;
      font-weight: 600;
      line-height: 1.35;
      margin-bottom: 8px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .date {
      font-size: 0.75rem;
      color: ${tokens.color.meta};
    }
  }
`
