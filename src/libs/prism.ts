import Prism from "prismjs"

/**
 * prism 언어 컴포넌트는 전역 Prism 을 참조하는 IIFE 라서 번들 순서를 탄다.
 * import 로 흩어놓으면 Prism 이 전역에 올라가기 전에 실행되거나 조용히 누락된다.
 * 여기서 전역을 먼저 세워두고 require 로 순서대로 불러온다.
 *
 * clike 는 c, cpp, csharp, java, kotlin, go, swift 등이 extend 하므로 먼저 와야 하고
 * markup 은 markup-templating 보다 먼저 와야 한다.
 */
if (typeof window !== "undefined") {
  const w = window as unknown as { Prism?: unknown }
  w.Prism = w.Prism || Prism

  require("prismjs/components/prism-markup.js")
  require("prismjs/components/prism-markup-templating.js")
  require("prismjs/components/prism-clike.js")
  require("prismjs/components/prism-c.js")
  require("prismjs/components/prism-cpp.js")
  require("prismjs/components/prism-csharp.js")
  require("prismjs/components/prism-java.js")
  require("prismjs/components/prism-kotlin.js")
  require("prismjs/components/prism-go.js")
  require("prismjs/components/prism-swift.js")
  require("prismjs/components/prism-objectivec.js")
  require("prismjs/components/prism-scala.js")
  require("prismjs/components/prism-javascript.js")
  require("prismjs/components/prism-js-templates.js")
  require("prismjs/components/prism-coffeescript.js")
  require("prismjs/components/prism-typescript.js")
  require("prismjs/components/prism-jsx.js")
  require("prismjs/components/prism-tsx.js")
  require("prismjs/components/prism-json.js")
  require("prismjs/components/prism-yaml.js")
  require("prismjs/components/prism-toml.js")
  require("prismjs/components/prism-graphql.js")
  require("prismjs/components/prism-sql.js")
  require("prismjs/components/prism-bash.js")
  require("prismjs/components/prism-docker.js")
  require("prismjs/components/prism-makefile.js")
  require("prismjs/components/prism-diff.js")
  require("prismjs/components/prism-git.js")
  require("prismjs/components/prism-markdown.js")
  require("prismjs/components/prism-python.js")
  require("prismjs/components/prism-ruby.js")
  require("prismjs/components/prism-rust.js")
  require("prismjs/components/prism-css.js")
  require("prismjs/components/prism-sass.js")
  require("prismjs/components/prism-scss.js")
  require("prismjs/components/prism-less.js")
  require("prismjs/components/prism-stylus.js")
  require("prismjs/components/prism-handlebars.js")
  require("prismjs/components/prism-ocaml.js")
  require("prismjs/components/prism-reason.js")
  require("prismjs/components/prism-solidity.js")
  require("prismjs/components/prism-wasm.js")
}

export default Prism
