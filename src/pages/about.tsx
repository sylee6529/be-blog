import About from "src/routes/About"
import { about } from "src/routes/About/data"
import { CONFIG } from "../../site.config"
import { NextPageWithLayout } from "../types"
import MetaConfig from "src/components/MetaConfig"

const AboutPage: NextPageWithLayout = () => {
  const meta = {
    title: `About | ${CONFIG.blog.title}`,
    description: `${about.name}, ${about.role}`,
    type: "website",
    url: `${CONFIG.link}/about`,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <About />
    </>
  )
}

export default AboutPage
