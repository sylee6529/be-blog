import { useState } from "react"
import { useRouter } from "next/router"
import styled from "@emotion/styled"

import Profile from "./Profile"
import Bento from "./Bento"
import SectionRow from "./SectionRow"
import SearchInput from "./SearchInput"
import TagList from "./TagList"
import { FeedHeader } from "./FeedHeader"
import PostList from "./PostList"
import PinnedPosts from "./PostList/PinnedPosts"
import Footer from "./Footer"
import { DEFAULT_CATEGORY } from "src/constants"
import usePostsQuery from "src/hooks/usePostsQuery"

const BENTO_COUNT = 6

const Feed: React.FC = () => {
  const router = useRouter()
  const [q, setQ] = useState("")
  const posts = usePostsQuery()

  const isFiltering =
    !!q ||
    !!router.query.tag ||
    (!!router.query.category && router.query.category !== DEFAULT_CATEGORY)

  return (
    <StyledWrapper>
      <Profile />
      <PinnedPosts q={q} />
      {!isFiltering && <Bento posts={posts.slice(0, BENTO_COUNT)} />}

      <section id="all-posts" className="all-posts">
        <SectionRow label={isFiltering ? "RESULTS" : "ALL POSTS"} />
        <SearchInput value={q} onChange={(e) => setQ(e.target.value)} />
        <TagList />
        <FeedHeader />
        <PostList q={q} />
      </section>

      <Footer />
    </StyledWrapper>
  )
}

export default Feed

const StyledWrapper = styled.div`
  padding-bottom: 2rem;

  > .all-posts {
    margin-top: 2.5rem;
  }
`
