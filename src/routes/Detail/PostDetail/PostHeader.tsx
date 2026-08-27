import { CONFIG } from "site.config"
import Tag from "src/components/Tag"
import { PostDetail } from "src/types"
import { formatDate } from "src/libs/utils"
import { tokens } from "src/styles"
import Image from "next/image"
import React from "react"
import styled from "@emotion/styled"
import { getReadTime } from "src/libs/utils/notion"

type Props = {
  data: PostDetail
}

const PostHeader: React.FC<Props> = ({ data }) => {
  const readTime = data.recordMap ? getReadTime(data.recordMap) : undefined

  return (
    <StyledWrapper>
      <h1 className="title">{data.title}</h1>
      <div className="meta">
        {data.author?.[0]?.name && (
          <span className="author">
            <Image
              src={data.author[0].profile_photo || CONFIG.profile.image}
              alt={data.author[0].name}
              width={20}
              height={20}
            />
            {data.author[0].name}
          </span>
        )}
        <span>
          {formatDate(data?.date?.start_date || data.createdTime, CONFIG.lang)}
        </span>
        {readTime && <span>{`${readTime} min read`}</span>}
      </div>
      {data.tags && data.tags.length > 0 && (
        <div className="tags">
          {data.tags.map((tag: string) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}
      {data.thumbnail && (
        <div className="thumbnail">
          <Image
            src={data.thumbnail}
            alt={data.title}
            fill
            sizes="(max-width: 768px) 90vw, 715px"
          />
        </div>
      )}
    </StyledWrapper>
  )
}

export default PostHeader

const StyledWrapper = styled.div`
  .title {
    font-size: 1.9rem;
    line-height: 1.3;
    font-weight: 700;
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.85rem;
    font-size: 0.8rem;
    color: ${tokens.color.meta};

    > span + span::before {
      content: "·";
      margin-right: 0.75rem;
    }

    .author {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;

      img {
        border-radius: 50%;
      }
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: 0.85rem;
  }

  .thumbnail {
    overflow: hidden;
    position: relative;
    margin-top: 1.5rem;
    border-radius: ${tokens.radius.card};
    width: 100%;
    aspect-ratio: 16 / 9;
    background-color: ${tokens.color.placeholder};

    img {
      object-fit: cover;
    }
  }
`
