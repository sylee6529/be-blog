import Link from "next/link"
import { CONFIG } from "site.config"
import { formatDate } from "src/libs/utils"
import Tag from "src/components/Tag"
import { TPost } from "src/types"
import { tokens } from "src/styles"
import styled from "@emotion/styled"
import Thumbnail from "../Bento/Thumbnail"

type Props = {
  data: TPost
}

const PostCard: React.FC<Props> = ({ data }) => {
  const category = (data.category && data.category?.[0]) || undefined

  return (
    <StyledWrapper href={`/${data.slug}`}>
      <Thumbnail className="thumb" src={data.thumbnail} alt={data.title} />
      <div className="body">
        <div className="head">
          {category && <span className="category">{category}</span>}
          <span className="date">
            {formatDate(data?.date?.start_date || data.createdTime, CONFIG.lang)}
          </span>
        </div>
        <h2 className="title">{data.title}</h2>
        {data.summary && <p className="summary">{data.summary}</p>}
        {data.tags && data.tags.length > 0 && (
          <div className="tags">
            {data.tags.map((tag: string) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </div>
    </StyledWrapper>
  )
}

export default PostCard

const StyledWrapper = styled(Link)`
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 16px;
  margin-bottom: 12px;
  padding: 12px;
  border-radius: ${tokens.radius.card};
  background: ${tokens.color.card};
  border: 1px solid ${tokens.color.border};
  transition: ${tokens.transition};

  &:hover {
    border-color: ${tokens.color.borderHover};
    box-shadow: ${tokens.shadow.card};
  }
  &:hover .title {
    color: ${tokens.color.accent};
    transition: color 0.2s;
  }

  > .thumb {
    border-radius: 8px;
    overflow: hidden;
  }

  > .body {
    min-width: 0;

    > .head {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 6px;
      font-size: 0.75rem;
      color: ${tokens.color.meta};

      .category {
        color: ${tokens.color.accent};
        font-weight: 700;
        letter-spacing: 0.5px;
      }
    }

    > .title {
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.35;
      margin-bottom: 6px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    > .summary {
      margin: 0 0 8px;
      font-size: 0.85rem;
      line-height: 1.5;
      color: ${tokens.color.body};
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    > .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
    }
  }

  @media (max-width: 640px) {
    grid-template-columns: 100px 1fr;
    gap: 12px;
  }
`
