import Link from "next/link";
import { SocialLinks } from "@/components/company/SocialLinks";
import { PageMain } from "@/components/page/PageMain";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceGraphic } from "@/components/service/ServiceGraphic";
import { ServiceHero } from "@/components/service/ServiceHero";
import { about } from "@/content/about";
import { company, socialUrls } from "@/content/company";
import { moreLinksFor } from "@/content/menu";
import { serviceGroups } from "@/content/navigation";
import { breadcrumbSchema, graph, organizationSchema, webPageSchema } from "@/lib/seo/structured-data";
import { CheckIcon, CtaBand, order, pad, SectionHead } from "./parts";
import styles from "./Pages.module.scss";

const PATH = "/about/";

export function AboutPage() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "About" }];

  return (
    <PageMain>
      <JsonLd
        data={graph([
          breadcrumbSchema(crumbs, PATH),
          webPageSchema("AboutPage", { name: about.seo.title, description: about.seo.description, path: PATH }),
          organizationSchema({ email: company.email, sameAs: socialUrls() }),
        ])}
      />

      <ServiceHero
        eyebrow="About"
        title={about.hero.title}
        accent={about.hero.accent}
        lead={about.hero.lead}
        points={about.hero.points}
        crumbs={crumbs}
        graphic={<ServiceGraphic kind="services" />}
        secondaryHref="#what-we-do"
        secondaryLabel="What we do"
      />

      <section className={styles.section} aria-label="Our view">
        <div className="container">
          <p className={styles.statement}>
            <span className={styles.lit}>{about.statement}</span>
          </p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="beliefs-title">
        <div className="container">
          <SectionHead id="beliefs-title" kicker="What we believe" title="Four things we won't compromise on" />
          <ul className={styles.cards}>
            {about.beliefs.map((belief, index) => (
              <li key={belief.title} className={styles.card} data-fx-reveal="" data-fx-spot="" data-fx-tilt="5" style={order(index)}>
                <span className={styles.cardNumber}>{pad(index + 1)}</span>
                <h3>{belief.title}</h3>
                <p>{belief.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="what-we-do" className={styles.section} aria-labelledby="what-title">
        <div className="container">
          <SectionHead
            id="what-title"
            kicker="What we do"
            title="Build, run and grow"
            intro="Three stages, one team. Start with the stage you need now and add the others when they make sense."
          />
          <ul className={styles.cards}>
            {serviceGroups.map((group, index) => (
              <li key={group.id} className={styles.card} data-fx-reveal="" data-fx-spot="" style={order(index)}>
                <span className={styles.cardNumber}>{pad(index + 1)}</span>
                <h3>{group.label}</h3>
                <p>{group.intro}</p>
                <ul className={styles.cardLinks}>
                  {[...group.items, ...moreLinksFor(group.id)].map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="how-title">
        <div className="container">
          <SectionHead id="how-title" kicker="How we work" title="From first look to ongoing growth" />
          <ol className={styles.steps}>
            {about.steps.map((step, index) => (
              <li key={step.title} className={styles.step} data-fx-reveal="" data-fx-spot="" style={order(index)}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="commitments-title">
        <div className={`container ${styles.split}`}>
          <div>
            <SectionHead id="commitments-title" kicker="Our commitments" title="What you can hold us to" />
            <ul className={styles.checklist}>
              {about.commitments.map((item, index) => (
                <li key={item} style={order(index)} data-fx-reveal="">
                  <span className={styles.check}>
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.panel} data-fx-reveal="" data-fx-spot="">
            <p className={styles.kicker}>Talk to us</p>
            <a href={`mailto:${company.email}`} className={styles.emailLink}>
              {company.email}
            </a>
            <p className={styles.muted}>Tell us about your website or project, and we&apos;ll reply with clear next steps.</p>
            <SocialLinks />
          </div>
        </div>
      </section>

      <CtaBand title="Let's look at your website together" text="Start with a free audit of your current site." />
    </PageMain>
  );
}
