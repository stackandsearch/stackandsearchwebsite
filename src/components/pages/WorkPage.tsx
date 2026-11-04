import { PageMain } from "@/components/page/PageMain";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceGraphic } from "@/components/service/ServiceGraphic";
import { ServiceHero } from "@/components/service/ServiceHero";
import { work } from "@/content/work";
import { absoluteUrl } from "@/lib/seo/urls";
import { breadcrumbSchema, graph, organizationRef, webPageSchema } from "@/lib/seo/structured-data";
import { CheckIcon, CtaBand, ExternalIcon, order, pad, SectionHead } from "./parts";
import styles from "./Pages.module.scss";

const PATH = "/case-studies/";

export function WorkPage() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Work" }];

  return (
    <PageMain>
      <JsonLd
        data={graph([
          breadcrumbSchema(crumbs, PATH),
          {
            ...webPageSchema("CollectionPage", { name: work.seo.title, description: work.seo.description, path: PATH }),
            hasPart: work.projects.map((project) => ({
              "@type": "CreativeWork",
              name: `${project.name} website`,
              url: project.url,
              creator: organizationRef(),
              isPartOf: { "@id": `${absoluteUrl(PATH)}#webpage` },
            })),
          },
        ])}
      />

      <ServiceHero
        eyebrow="Work"
        title={work.hero.title}
        accent={work.hero.accent}
        lead={work.hero.lead}
        points={work.hero.points}
        crumbs={crumbs}
        graphic={<ServiceGraphic kind="design" />}
        secondaryHref="#projects"
        secondaryLabel="See the project"
      />

      <section id="projects" className={styles.section} aria-label="Projects">
        <div className="container">
          {work.projects.map((project) => (
            <article key={project.url} className={styles.project} data-fx-reveal="" data-fx-spot="" aria-labelledby={`project-${project.domain}`}>
              <div className={styles.mockup} data-fx-tilt="6" aria-hidden="true">
                <div className={styles.mockupBar}>
                  <i />
                  <i />
                  <i />
                  <span>{project.domain}</span>
                </div>
                <div className={styles.mockupBody}>
                  <div className={styles.mockupNav}>
                    <b>{project.name.toLowerCase()}</b>
                    <span>
                      <i />
                      <i />
                      <i />
                    </span>
                  </div>
                  <div className={styles.mockupTitle}>
                    <i />
                    <i />
                  </div>
                  <div className={styles.mockupText}>
                    <i />
                    <i />
                  </div>
                  <div className={styles.mockupCta}>
                    <i />
                    <i />
                  </div>
                  <div className={styles.mockupChips}>
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>
              <div className={styles.projectInfo}>
                <p className={styles.kicker}>Featured project</p>
                <h2 id={`project-${project.domain}`}>{project.name}</h2>
                <p>{project.summary}</p>
                <dl className={styles.facts}>
                  {project.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
                <ul className={styles.checklist}>
                  {project.highlights.map((item, index) => (
                    <li key={item} style={order(index)} data-fx-reveal="">
                      <span className={styles.check}>
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className={styles.actions}>
                  <a href={project.url} className={styles.button} target="_blank" rel="noopener" data-fx-magnet="">
                    <span>Visit the live site</span>
                    <ExternalIcon />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="focus-title">
        <div className="container">
          <SectionHead id="focus-title" kicker="In every project" title="What we focus on, every time" />
          <ul className={styles.cards}>
            {work.focus.map((item, index) => (
              <li key={item.title} className={styles.card} data-fx-reveal="" data-fx-spot="" data-fx-tilt="5" style={order(index)}>
                <span className={styles.cardNumber}>{pad(index + 1)}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Your project could be next" text="Tell us about your website, and we'll start with a free audit." />
    </PageMain>
  );
}
