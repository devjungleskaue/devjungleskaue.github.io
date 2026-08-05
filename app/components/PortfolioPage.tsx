import type { PortfolioCopy, ProjectRecord } from "../content";
import { profileLinks } from "../content";
import { MakerMark } from "./MakerMark";
import { ProjectProof } from "./ProjectProof";

function ProjectRow({ project }: { project: ProjectRecord }) {
  return (
    <article className="project">
      <div className="project__copy">
        <p className="eyebrow">{project.label}</p>
        <h3>
          <a href={project.href}>{project.title}</a>
        </h3>
        <p>{project.summary}</p>
        <p className="project__proof">{project.proof}</p>
      </div>
      <div className="project__meta">
        <p>{project.stack.join(" · ")}</p>
        <a href={project.sourceHref}>{project.sourceLabel}</a>
      </div>
    </article>
  );
}

export function PortfolioPage({ content }: { content: PortfolioCopy }) {
  const homeHref = content.locale === "en" ? "/" : "/pt/";
  const navLabel = content.locale === "en" ? "Primary" : "Principal";

  return (
    <div
      className="portfolio-shell"
      lang={content.locale === "pt" ? "pt-BR" : "en"}
    >
      <a className="skip-link" href="#work">
        {content.skip}
      </a>

      <header className="hero" aria-labelledby="hero-title">
        <div className="hero__inner">
          <div className="hero__identity">
            <MakerMark />
            <p>{content.hero.eyebrow}</p>
          </div>
          <h1 id="hero-title">{content.hero.title}</h1>
          <p className="hero__lead">{content.hero.lead}</p>
          <div className="actions">
            <a className="button button--primary" href="#work">
              {content.hero.primary}
            </a>
            <a className="button" href={profileLinks.github}>
              {content.hero.secondary}
            </a>
          </div>
        </div>
      </header>

      <nav className="site-nav" aria-label={navLabel}>
        <div className="site-nav__inner">
          <a className="wordmark" href={homeHref}>
            Kaue Natan Jungles
          </a>
          <div className="site-nav__links">
            <a href="#work">{content.nav.work}</a>
            <a href="#approach">{content.nav.approach}</a>
            <a href="#contact">{content.nav.contact}</a>
            <a
              href={content.languageHref}
              hrefLang={content.locale === "en" ? "pt-BR" : "en"}
              lang={content.locale === "en" ? "pt-BR" : "en"}
            >
              {content.languageLabel}
            </a>
          </div>
        </div>
      </nav>

      <main className="page-column">
        <section className="work" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <p className="eyebrow">{content.work.eyebrow}</p>
            <h2 id="work-title">{content.work.title}</h2>
            <p>{content.work.intro}</p>
          </div>
          <ProjectProof locale={content.locale} />
          <div className="project-list">
            {content.work.projects.map((project) => (
              <ProjectRow project={project} key={project.title} />
            ))}
          </div>
        </section>

        <section
          className="capabilities"
          aria-labelledby="capabilities-title"
        >
          <h2 id="capabilities-title">{content.capabilities.title}</h2>
          <div className="capability-list">
            {content.capabilities.items.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="approach"
          id="approach"
          aria-labelledby="approach-title"
        >
          <div className="approach__intro">
            <p className="eyebrow">{content.nav.approach}</p>
            <h2 id="approach-title">{content.approach.title}</h2>
            <p>{content.approach.body}</p>
          </div>
          <ol>
            {content.approach.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section
          className="contact"
          id="contact"
          aria-labelledby="contact-title"
        >
          <p className="eyebrow">{content.contact.eyebrow}</p>
          <h2 id="contact-title">{content.contact.title}</h2>
          <p>{content.contact.body}</p>
          <div className="actions">
            <a
              className="button button--primary"
              href={profileLinks.linkedin}
            >
              {content.contact.action}
            </a>
            <a className="button" href={profileLinks.github}>
              GitHub
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer__inner">
          <p>{content.footer}</p>
          <MakerMark compact />
        </div>
      </footer>
    </div>
  );
}
