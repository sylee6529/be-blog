import React from "react"
import styled from "@emotion/styled"

import PostHeader from "./PostHeader"
import TableOfContents from "./TableOfContents"
import RelatedPosts from "./RelatedPosts"
import Footer from "./PostFooter"
import CommentBox from "./CommentBox"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"
import { tokens } from "src/styles"

const PostDetail: React.FC = () => {
  const data = usePostQuery()

  if (!data) return null

  const isPost = data.type[0] === "Post"

  return (
    <StyledWrapper>
      <article>
        {isPost && <PostHeader data={data} />}
        {isPost && data.recordMap && (
          <TableOfContents recordMap={data.recordMap} pageId={data.id} />
        )}
        <div className="content">
          <NotionRenderer recordMap={data.recordMap} />
        </div>
        {isPost && (
          <>
            <Footer />
            <RelatedPosts current={data} />
            <CommentBox data={data} />
          </>
        )}
      </article>
    </StyledWrapper>
  )
}

export default PostDetail

const StyledWrapper = styled.div`
  padding-bottom: 3rem;

  > article {
    margin: 0 auto;

    > .content {
      margin-top: 1.5rem;
      color: ${tokens.color.textSub};
    }
  }
`
