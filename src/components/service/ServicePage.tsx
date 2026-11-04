import Link from "next/link";
import type { CSSProperties } from "react";
import { PageMain } from "@/components/page/PageMain";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceIcon } from "@/components/ui/duotone-icons";
import { allServicesLink } from "@/content/navigation";
import { groupForHref, linkForLabel, type ResolvedService, type ServiceLink } from "@/content/services";
import type { ServiceFaqItem } from "@/content/services/types";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/seo/structured-data";
import { PageIcon } from "./PageIcon";
import { ServiceGraphic } from "./ServiceGraphic";
import { ServiceHero } from "./ServiceHero";
import styles from "./ServicePage.module.scss";

const order = (index: number) => ({ "--i": index }) as CSSProperties;
const pad = (value: number) => String(value).padStart(2, "0");

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path pathLength={100} d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path pathLength={100} d="M4.5 4.5l7 7M11.5 4.5l-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SectionHead({ id, kicker, title, intro }: { id: string; kicker: string; title: string; intro?: string }) {
  return (
    <div className={styles.head} data-fx-reveal="">
      <p className={styles.kicker}>{kicker}</p>
      <h2 id={id}>{title}</h2>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </div>
  );
}

// Questions are real headings inside native disclosure widgets: readable by
// people, screen readers and search engines (collapsed text is in the HTML).
export function ServiceFaq({ faqs, heading = "Frequently asked questions" }: { faqs: ServiceFaqItem[]; heading?: string }) {
  return (
    <section className={styles.section} aria-labelledby="faq-title">
      <div className={`container ${styles.faqLayout}`}>
        <div className={styles.faqIntro} data-fx-reveal="">
          <p className={styles.kicker}>FAQ</p>
          <h2 id="faq-title">{heading}</h2>
          <p>Straight answers before you get in touch.</p>
          <a href="#get-started" className={styles.textLink} data-fx-magnet="">
            Ask us something else <ArrowIcon />
          </a>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <details key={faq.question} className={styles.faq} data-fx-spot="" data-fx-reveal="" style={order(index)}>
              <summary>
                <span className={styles.faqNumber}>{pad(index + 1)}</span>
                <h3 className={styles.faqQuestion}>{faq.question}</h3>
                <span className={styles.plus} aria-hidden="true" />
              </summary>
              <div className={styles.faqAnswer}>
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicePage({ service }: { service: ResolvedService }) {
  const { content, href } = service;
  const group = groupForHref(href);
  const parent = content.parent ? linkForLabel(content.parent) : undefined;
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: allServicesLink.href },
    ...(parent ? [{ label: parent.label, href: parent.href }] : []),
    { label: content.label },
  ];
  const related = content.related.map((label) => linkForLabel(label)).filter((link): link is ServiceLink => Boolean(link));
  const [statement, ...support] = content.overview.paragraphs;
  const steps = content.process.steps;

  return (
    <PageMain>
      <JsonLd
        data={graph([
          breadcrumbSchema(crumbs, href),
          serviceSchema({ name: content.label, description: content.seo.description, path: href }),
          faqSchema(content.faqs),
        ])}
      />

      <ServiceHero
        eyebrow={group?.label ?? "Services"}
        title={content.hero.title}
        accent={content.hero.accent}
        lead={content.hero.lead}
        points={content.hero.points}
        crumbs={crumbs}
        graphic={<ServiceGraphic kind={content.graphic} />}
        secondaryHref="#included"
        secondaryLabel="See what's included"
      />

      <section className={styles.facts} aria-label="At a glance">
        <div className="container">
          <dl className={styles.factGrid} data-fx-reveal="">
            {content.facts.map((fact) => (
              <div key={fact.label} className={styles.fact} data-fx-spot="">
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={`${styles.section} ${styles.overview}`} aria-labelledby="overview-title">
        <span className={styles.ghost} aria-hidden="true">
          {content.label}
        </span>
        <div className={`container ${styles.overviewGrid}`}>
          <div data-fx-reveal="">
            <p className={styles.kicker}>Overview</p>
            <h2 id="overview-title">{content.overview.heading}</h2>
          </div>
          <div className={styles.overviewText}>
            <p className={styles.statement}>
              <span className={styles.lit}>{statement}</span>
            </p>
            {support.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={styles.support} data-fx-reveal="">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="included" className={styles.section} aria-labelledby="included-title">
        <div className="container">
          <SectionHead id="included-title" kicker="What you get" title={content.included.heading} intro={content.included.intro} />
          <ul className={styles.bento}>
            {content.included.items.map((item, index) => (
              <li key={item.title} className={styles.tile} data-fx-reveal="" data-fx-spot="" data-fx-tilt="5" style={order(index % 3)}>
                <span className={styles.dots} aria-hidden="true" />
                <span className={styles.tileTop}>
                  <span className={styles.icon}>
                    <PageIcon name={item.icon} />
                  </span>
                  <span className={styles.tileIndex}>{pad(index + 1)}</span>
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="process-title">
        <div
          className={`container ${styles.process}`}
          data-fx-steps=""
          style={{ "--count": steps.length, "--active": 1 } as CSSProperties}
        >
          <div>
            <div className={styles.processSticky} data-fx-reveal="">
              <p className={styles.kicker}>How it works</p>
              <h2 id="process-title">{content.process.heading}</h2>
              <div className={styles.counter} aria-hidden="true">
                <svg viewBox="0 0 120 120" className={styles.ring}>
                  <circle className={styles.ringTrack} cx="60" cy="60" r="52" />
                  <circle className={styles.ringFill} cx="60" cy="60" r="52" pathLength={100} />
                </svg>
                <span className={styles.counterText}>
                  <span className={styles.counterNow} />
                  <span className={styles.counterTotal}>/{pad(steps.length)}</span>
                </span>
              </div>
            </div>
          </div>
          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <li key={step.title} className={styles.step} data-fx-step={index + 1} data-fx-reveal="">
                <span className={styles.stepNumber} aria-hidden="true">
                  {pad(index + 1)}
                </span>
                <div>
                  <span className={styles.when}>{step.when}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="approach-title">
        <div className="container">
          <SectionHead id="approach-title" kicker="Our approach" title={content.approach.heading} />
          <ol className={styles.manifesto}>
            {content.approach.points.map((point, index) => (
              <li key={point.title} className={styles.principle} data-fx-reveal="" data-fx-spot="">
                <span className={styles.principleNumber}>{pad(index + 1)}</span>
                <h3 className={styles.principleTitle}>
                  <span className={styles.lit}>{point.title}</span>
                </h3>
                <p>{point.text}</p>
                <span className={styles.principleArrow} aria-hidden="true">
                  <ArrowIcon />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="fit-title">
        <div className="container">
          <SectionHead id="fit-title" kicker="Honest fit check" title={content.fit.heading} />
          <div className={styles.fitGrid}>
            <div className={`${styles.fitCard} ${styles.fitGood}`} data-fx-reveal="" data-fx-spot="">
              <p className={styles.fitLabel}>
                <span className={styles.fitDot} />
                Good fit
              </p>
              <h3>A good fit if…</h3>
              <ul>
                {content.fit.good.map((item, index) => (
                  <li key={item} style={order(index)}>
                    <span className={`${styles.mark} ${styles.markYes}`}>
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.fitCard} data-fx-reveal="" data-fx-spot="" style={order(1)}>
              <p className={styles.fitLabel}>
                <span className={styles.fitDot} />
                Not the right fit
              </p>
              <h3>Probably not the right fit if…</h3>
              <ul>
                {content.fit.notFor.map((item, index) => (
                  <li key={item} style={order(index)}>
                    <span className={`${styles.mark} ${styles.markNo}`}>
                      <CrossIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="pricing-title">
        <div className="container">
          <div className={styles.priceCard} data-fx-reveal="" data-fx-spot="">
            <div className={styles.priceCopy}>
              <p className={styles.kicker}>Pricing</p>
              <h2 id="pricing-title">{content.pricing.heading}</h2>
              {content.pricing.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
              <a href="#get-started" className={styles.cta} data-fx-magnet="">
                <span>Get a free audit and quote</span>
                <ArrowIcon />
              </a>
            </div>
            <div className={styles.factors}>
              <h3>What affects the price</h3>
              <ul>
                {content.pricing.factors.map((factor, index) => (
                  <li key={factor}>
                    <span className={styles.factorIndex}>{pad(index + 1)}</span>
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ServiceFaq faqs={content.faqs} />

      {related.length > 0 ? (
        <section className={styles.section} aria-labelledby="related-title">
          <div className="container">
            <SectionHead id="related-title" kicker="Keep exploring" title="Related services" />
            <ul className={styles.relatedGrid}>
              {related.map((link, index) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.related} data-fx-spot="" data-fx-reveal="" style={order(index)}>
                    <span className={styles.relatedIcon}>
                      <ServiceIcon href={link.href} />
                    </span>
                    <span className={styles.relatedTitle}>{link.label}</span>
                    {link.summary ? <span className={styles.relatedText}>{link.summary}</span> : null}
                    <span className={styles.relatedArrow}>
                      <ArrowIcon />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </PageMain>
  );
}
