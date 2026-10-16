import { Global, css, useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import Image from "next/image"
import React from "react"
import { CONFIG } from "site.config"
import { paletteVars, tokens } from "src/styles"
import SectionRow from "./SectionRow"
import { about, Highlight, Service, TimelineItem, Work } from "./data"
import Lightbox from "./Lightbox"
import Rich from "./Rich"
import { KpiRow, VisualBlock } from "./Visuals"

/** 블로그 테마(light, dark)에 맞는 색을 CSS 변수로 깐다. 모달도 같은 변수를 쓰도록 :root 에 둔다. */
const AboutColors: React.FC = () => {
  const theme = useTheme()
  return (
    <Global
      styles={css`
        :root {
          ${paletteVars(theme.scheme === "dark" ? "dark" : "light")}
        }
      `}
    />
  )
}

const About: React.FC = () => {
  return (
    <StyledWrapper>
      <AboutColors />
      <header className="hero">
        <Image
          className="avatar"
          src={CONFIG.profile.image}
          alt={about.name}
          width={88}
          height={88}
        />
        <div>
          <h1 className="name">{about.name}</h1>
          <p className="role">{about.role}</p>
          <ul className="links">
            {about.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section className="intro">
        <KpiRow kpis={about.impact} size="lg" />
        {about.intro.map((p) => (
          <p key={p}>
            <Rich text={p} />
          </p>
        ))}
      </section>

      <section>
        <SectionRow label="EXPERIENCE" />
        {about.works.map((work) => (
          <WorkBlock key={work.company} work={work} />
        ))}
      </section>

      <section>
        <SectionRow label="PROJECTS" />
        {about.projects.map((project) => (
          <article key={project.name} className="card">
            <div className="card-head">
              <h3>{project.name}</h3>
              <div className="card-meta">
                <span className="period">{project.period}</span>
                {project.link && (
                  <a
                    className="repo"
                    href={project.link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.name} ${project.link.label} 저장소`}
                    title={`${project.link.label} 저장소`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/about/icons/github.svg" alt="" width={18} height={18} />
                  </a>
                )}
              </div>
            </div>
            <p className="context">{project.context}</p>
            <Bullets items={project.points} />
          </article>
        ))}
      </section>

      <section>
        <SectionRow label="EDUCATION & ACTIVITIES" />
        <Timeline items={about.education} />
      </section>

      <section>
        <SectionRow label="AWARDS & CERTIFICATES" />
        <Timeline items={about.awards} />
      </section>

      <section>
        <SectionRow label="SKILLS" />
        <dl className="skills">
          {about.skills.map((group) => (
            <div key={group.label} className="row">
              <dt>{group.label}</dt>
              <dd>
                {group.items.map((item) => (
                  <span key={item.name} className="skill">
                    {item.icon && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`/about/icons/skills/${item.icon}.svg`} alt="" width={14} height={14} />
                    )}
                    {item.name}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </StyledWrapper>
  )
}

export default About

const WorkBlock: React.FC<{ work: Work }> = ({ work }) => (
  <div className="work">
    <div className="work-head">
      <div>
        <h2>
          {work.company}
          <span className="work-desc">{work.description}</span>
        </h2>
        <p className="work-role">{work.role}</p>
      </div>
      <span className="period">{work.period}</span>
    </div>
    {work.summary && <p>{work.summary}</p>}

    {work.services?.map((service) => (
      <ServiceBlock key={service.name} service={service} />
    ))}

    {work.others && (
      <div className="others">
        <h3>그 밖에 한 일</h3>
        <Bullets items={work.others} />
      </div>
    )}
  </div>
)

const ServiceBlock: React.FC<{ service: Service }> = ({ service }) => (
  <div className="service">
    <div className="service-head">
      <h3>{service.name}</h3>
      <span className="period">{service.period}</span>
      {service.links && (
        <ul className="service-links">
          {service.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noreferrer">
                <LinkIcon kind={link.kind} />
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
    <div className={service.image ? "service-top has-image" : "service-top"}>
      <div className="service-main">
        <p>
          <Rich text={service.description} /> {service.role}
        </p>
        {service.scale && <KpiRow kpis={service.scale} />}
      </div>
      {service.image && (
        <Lightbox src={service.image.src} alt={service.image.alt} title={service.name} />
      )}
    </div>
    {service.visuals?.map((visual) => (
      <VisualBlock key={visual.title} visual={visual} />
    ))}
    {service.highlights.map((highlight) => (
      <HighlightCard key={highlight.title} highlight={highlight} />
    ))}
  </div>
)

const HighlightCard: React.FC<{ highlight: Highlight }> = ({ highlight }) => (
  <article className="card">
    <h4>
      <Rich text={highlight.title} />
    </h4>
    <KpiRow kpis={highlight.kpis} />
    <div className="ps">
      <div className="ps-col">
        <span className="ps-label" data-kind="problem">
          문제
        </span>
        <Bullets items={highlight.problem} />
      </div>
      <div className="ps-col">
        <span className="ps-label" data-kind="solution">
          해결
        </span>
        <Bullets items={highlight.solution} />
      </div>
    </div>
    {highlight.visuals.map((visual) => (
      <VisualBlock key={visual.title} visual={visual} />
    ))}
  </article>
)

const LinkIcon: React.FC<{ kind?: "site" | "news" }> = ({ kind }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {kind === "news" ? (
      <>
        <path d="M4 22h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z" />
      </>
    ) : (
      <>
        <path d="M15 3h6v6M10 14 21 3" />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </>
    )}
  </svg>
)

const Bullets: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="bullets">
    {items.map((item) => (
      <li key={item}>
        <Rich text={item} />
      </li>
    ))}
  </ul>
)

const Timeline: React.FC<{ items: TimelineItem[] }> = ({ items }) => (
  <ul className="timeline">
    {items.map((item) => (
      <li key={item.title}>
        <span className="period">{item.period}</span>
        <div>
          <div className="timeline-title">{item.title}</div>
          {item.detail && <p>{item.detail}</p>}
        </div>
      </li>
    ))}
  </ul>
)

const StyledWrapper = styled.div`
  max-width: ${tokens.contentWidth}px;
  margin: 0 auto;
  padding: 1.5rem 0 4rem;
  color: ${tokens.color.textSub};
  word-break: keep-all;

  p {
    margin: 0 0 0.75rem;
    font-size: 15.5px;
    line-height: 1.8;
  }
  strong {
    font-weight: 700;
    color: ${tokens.color.text};
  }

  section {
    margin-top: 3.5rem;
  }

  a {
    color: ${tokens.color.accent};
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.75;
    }
  }

  .period {
    font-size: 13px;
    color: ${tokens.color.muted};
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  /* 상단 */
  .hero {
    display: flex;
    align-items: center;
    gap: 24px;
  }
  .avatar {
    flex-shrink: 0;
    width: 88px;
    height: 88px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: ${tokens.shadow.avatar};
  }
  .name {
    font-size: 1.9rem;
    font-weight: 700;
    line-height: 1.3;
  }
  .role {
    margin: 2px 0 10px;
    font-size: 1rem;
    color: ${tokens.color.muted};
  }
  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 0;
    list-style: none;

    a {
      display: inline-block;
      padding: 4px 12px;
      font-size: 13px;
      color: ${tokens.color.textSub};
      background: ${tokens.color.card};
      border: 1px solid ${tokens.color.borderStrong};
      border-radius: ${tokens.radius.pill};
      transition: ${tokens.transition};
      &:hover {
        opacity: 1;
        border-color: ${tokens.color.accent};
        color: ${tokens.color.accent};
      }
    }
  }

  .intro {
    margin-top: 2.5rem;
    p {
      font-size: 16.5px;
      color: ${tokens.color.text};
      margin-bottom: 1rem;
    }
    strong {
      color: ${tokens.color.accent};
    }
  }

  /* 경력 */
  .work + .work {
    margin-top: 3rem;
    padding-top: 2.5rem;
    border-top: 1px solid ${tokens.color.border};
  }
  .work-head,
  .card-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
  }
  .work-head h2 {
    font-size: 1.35rem;
    font-weight: 700;
  }
  .work-role {
    margin: 2px 0 0;
    font-size: 14px;
    color: ${tokens.color.muted};
  }
  .work-head h2 + .work-role {
    margin-top: 0;
  }
  .work-desc {
    margin-left: 10px;
    font-size: 12.5px;
    font-weight: 400;
    color: ${tokens.color.meta};
  }

  .service {
    margin-top: 2.5rem;
    padding-left: 18px;
    border-left: 3px solid ${tokens.color.accent};
  }
  .service-head {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 8px;

    h3 {
      font-size: 1.2rem;
      font-weight: 700;
    }
  }

  .service-head {
    flex-wrap: wrap;
    align-items: center;
    row-gap: 8px;
  }
  .service-links {
    display: flex;
    gap: 6px;
    margin: 0 0 0 auto;
    list-style: none;

    a {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      height: 32px;
      padding: 0 14px;
      font-size: 13px;
      font-weight: 600;
      color: ${tokens.color.text};
      background: ${tokens.color.card};
      border: 1px solid ${tokens.color.borderStrong};
      border-radius: 8px;
      box-shadow: 0 1px 2px #0000000d;
      transition: ${tokens.transition}, color 0.2s, background 0.2s;
      &:hover {
        opacity: 1;
        color: ${tokens.color.card};
        background: ${tokens.color.text};
        border-color: ${tokens.color.text};
      }
      &:focus-visible {
        outline: 2px solid ${tokens.color.accent};
        outline-offset: 2px;
      }
    }
  }
  .service-top.has-image {
    display: grid;
    grid-template-columns: 1fr 248px;
    gap: 16px;
    align-items: stretch;
  }
  .service-main {
    display: flex;
    flex-direction: column;
    > p {
      margin-bottom: 14px;
    }
    > ul {
      margin-bottom: 0;
    }
  }
  .service-top.has-image .service-main > ul {
    margin-top: auto;
  }
  .card {
    margin-top: 16px;
    padding: 22px 24px 20px;
    background: ${tokens.color.card};
    border: 1px solid ${tokens.color.border};
    border-radius: ${tokens.radius.card};

    h3,
    h4 {
      margin-bottom: 14px;
      font-size: 1.12rem;
      font-weight: 700;
      line-height: 1.5;
      color: ${tokens.color.text};
    }
    h4 strong {
      color: ${tokens.color.accent};
      font-weight: 800;
    }
    .card-head h3 {
      margin-bottom: 2px;
    }
    .context {
      margin-bottom: 10px;
      font-size: 13px;
      color: ${tokens.color.muted};
    }
  }

  .ps {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px 24px;
  }
  .ps-label {
    display: inline-block;
    margin-bottom: 6px;
    padding: 2px 9px;
    font-size: 12px;
    font-weight: 700;
    border-radius: ${tokens.radius.pill};
  }
  .ps-label[data-kind="problem"] {
    color: ${tokens.color.problem};
    background: ${tokens.color.problemBg};
  }
  .ps-label[data-kind="solution"] {
    color: ${tokens.color.solution};
    background: ${tokens.color.solutionBg};
  }

  .bullets {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      position: relative;
      padding-left: 14px;
      margin-bottom: 6px;
      font-size: 14.5px;
      line-height: 1.7;
    }
    li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.72em;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: ${tokens.color.borderHover};
    }
  }

  .card-meta {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .repo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 1px solid ${tokens.color.borderStrong};
    border-radius: 50%;
    transition: ${tokens.transition};
    img {
      opacity: 0.75;
      filter: ${tokens.color.iconFilter};
    }
    &:hover {
      opacity: 1;
      border-color: ${tokens.color.text};
      img {
        opacity: 1;
      }
    }
  }

  .others {
    margin-top: 2.5rem;
    h3 {
      margin-bottom: 10px;
      font-size: 1rem;
      font-weight: 700;
      color: ${tokens.color.text};
    }
  }

  /* 학력, 수상 */
  .timeline {
    margin: 0;
    list-style: none;

    li {
      display: grid;
      grid-template-columns: 140px 1fr;
      gap: 16px;
      padding: 12px 0;
    }
    li + li {
      border-top: 1px solid ${tokens.color.border};
    }
    .period {
      padding-top: 2px;
    }
    .timeline-title {
      font-weight: 700;
      color: ${tokens.color.text};
      line-height: 1.6;
    }
    p {
      margin: 4px 0 0;
      font-size: 14.5px;
      line-height: 1.7;
    }
  }

  .skills {
    margin: 0;
    .row {
      display: grid;
      grid-template-columns: 140px 1fr;
      gap: 16px;
      padding: 8px 0;
    }
    dt {
      font-weight: 700;
      color: ${tokens.color.text};
    }
    dd {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 16px;
      margin: 0;
      line-height: 1.7;
    }
    .skill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      img {
        opacity: 0.45;
        filter: ${tokens.color.iconFilter};
      }
    }
  }

  @media (max-width: 768px) {
    .hero {
      align-items: flex-start;
      gap: 16px;
    }
    .avatar {
      width: 64px;
      height: 64px;
    }
    .name {
      font-size: 1.6rem;
    }
    .work-head,
    .card-head {
      flex-direction: column;
      gap: 2px;
    }
    .service {
      padding-left: 12px;
    }
    .service-links {
      margin-left: 0;
      width: 100%;
    }
    .service-top.has-image {
      grid-template-columns: 1fr;
      gap: 12px;
    }
    .card {
      padding: 18px 16px 16px;
    }
    .ps {
      grid-template-columns: 1fr;
    }
    .timeline li,
    .skills .row {
      grid-template-columns: 1fr;
      gap: 2px;
    }
  }
`
