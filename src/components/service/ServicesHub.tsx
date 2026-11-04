import Link from "next/link";
import type { CSSProperties } from "react";
import { PageMain } from "@/components/page/PageMain";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceIcon } from "@/components/ui/duotone-icons";
import { moreLinksFor } from "@/content/menu";
import { serviceGroups } from "@/content/navigation";
import { servicesHub } from "@/content/services/hub";
import { breadcrumbSchema, faqSchema, graph, itemListSchema } from "@/lib/seo/structured-data";
import { ServiceGraphic } from "./ServiceGraphic";
import { ServiceHero } from "./ServiceHero";
import { ArrowIcon, ServiceFaq } from "./ServicePage";
import styles from "./ServicesHub.module.scss";

const PATH = "/services/";
const order = (index: number) => ({ "--i": index }) as CSSProperties;
const pad = (value: number) => String(value).padStart(2, "0");

export function ServicesHub() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Services" }];
  const primary = serviceGroups.flatMap((group) => group.items);

  return (
    <PageMain>
      <JsonLd
        data={graph([
          breadcrumbSchema(crumbs, PATH),
          itemListSchema(primary.map((item) => ({ name: item.label, path: item.href }))),
          faqSchema(servicesHub.faqs),
        ])}
      />

      <ServiceHero
        eyebrow="Services"
        title={servicesHub.hero.title}
        lead={servicesHub.hero.lead}
        points={servicesHub.hero.points}
        crumbs={crumbs}
        graphic={<ServiceGraphic kind="services" />}
        secondaryHref={`#${serviceGroups[0]?.id ?? "build"}`}
        secondaryLabel="Browse services"
      />

      <section className={styles.section} aria-labelledby="flow-title">
        <div className="container">
          <div className={styles.head} data-fx-reveal="">
            <p className={styles.kicker}>How it fits together</p>
            <h2 id="flow-title">{servicesHub.flow.heading}</h2>
            <p className={styles.intro}>{servicesHub.flow.intro}</p>
          </div>
          <ol className={styles.flow}>
            {servicesHub.flow.steps.map((step, index) => (
              <li key={step.label} className={styles.flowStep} data-fx-reveal="" data-fx-spot="" style={order(index)}>
                <span className={styles.flowNumber}>{pad(index + 1)}</span>
                <strong>{step.label}</strong>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {serviceGroups.map((group, groupIndex) => {
        const more = moreLinksFor(group.id);
        return (
          <section key={group.id} id={group.id} className={`${styles.section} ${styles.group}`} aria-labelledby={`${group.id}-title`}>
            <span className={styles.ghost} aria-hidden="true">
              {group.label}
            </span>
            <div className="container">
              <div className={styles.groupHead} data-fx-reveal="">
                <div>
                  <p className={styles.kicker}>
                    {pad(groupIndex + 1)} · {group.label}
                  </p>
                  <h2 id={`${group.id}-title`}>{servicesHub.groupTitles[group.id] ?? group.label}</h2>
                </div>
                <p className={styles.intro}>{group.intro}</p>
              </div>
              <ul className={styles.serviceGrid}>
                {group.items.map((item, index) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={styles.serviceCard}
                      data-fx-reveal=""
                      data-fx-spot=""
                      data-fx-tilt="5"
                      style={order(index % 3)}
                    >
                      <span className={styles.dots} aria-hidden="true" />
                      <span className={styles.serviceIcon}>
                        <ServiceIcon href={item.href} />
                      </span>
                      <span className={styles.serviceTitle}>{item.label}</span>
                      <span className={styles.serviceText}>{item.summary}</span>
                      <span className={styles.explore}>
                        Explore <ArrowIcon />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              {more.length > 0 ? (
                <div className={styles.more} data-fx-reveal="">
                  <span className={styles.moreLabel}>Also in {group.label}:</span>
                  <ul>
                    {more.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className={styles.moreLink}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </section>
        );
      })}

      <ServiceFaq faqs={servicesHub.faqs} />
    </PageMain>
  );
}
