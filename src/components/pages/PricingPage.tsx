import Link from "next/link";
import { PageMain } from "@/components/page/PageMain";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceGraphic } from "@/components/service/ServiceGraphic";
import { ServiceHero } from "@/components/service/ServiceHero";
import { ServiceFaq } from "@/components/service/ServicePage";
import { pricing } from "@/content/pricing";
import { serviceGroups } from "@/content/navigation";
import { groupForHref, linkForLabel, resolvedServices } from "@/content/services";
import { PRICE_FOOTNOTE, priceFor, priceLabel, unitWords } from "@/content/services/prices";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/seo/structured-data";
import { Packages } from "@/components/sections/home/Packages";
import { CheckIcon, CtaBand, order, pad, SectionHead } from "./parts";
import styles from "./Pages.module.scss";

const PATH = "/pricing/";

// Every priced service, grouped Build / Run / Grow like the main menu.
const priceGroups = serviceGroups.map((group) => ({
  id: group.id,
  label: group.label,
  intro: group.intro,
  rows: resolvedServices().flatMap((service) => {
    const price = priceFor(service.content.label);
    return price && groupForHref(service.href)?.id === group.id
      ? [{ label: service.content.label, href: service.href, price }]
      : [];
  }),
}));

export function PricingPage() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Pricing" }];

  return (
    <PageMain>
      <JsonLd
        data={graph([
          breadcrumbSchema(crumbs, PATH),
          webPageSchema("WebPage", { name: pricing.seo.title, description: pricing.seo.description, path: PATH }),
          faqSchema(pricing.faqs),
        ])}
      />

      <ServiceHero
        eyebrow="Pricing"
        title={pricing.hero.title}
        accent={pricing.hero.accent}
        lead={pricing.hero.lead}
        points={pricing.hero.points}
        crumbs={crumbs}
        graphic={<ServiceGraphic kind="services" />}
        secondaryHref="#price-list"
        secondaryLabel="See the price list"
      />

      <section id="models" className={styles.section} aria-labelledby="models-title">
        <div className="container">
          <SectionHead id="models-title" kicker="How we price" title="Three simple pricing models" intro="Every service fits one of these. You always see the full cost in writing first." />
          <ul className={styles.cards}>
            {pricing.models.map((model, index) => (
              <li key={model.title} className={styles.card} data-fx-reveal="" data-fx-spot="" data-fx-tilt="5" style={order(index)}>
                <span className={styles.cardNumber}>{pad(index + 1)}</span>
                <h3>{model.title}</h3>
                <p>{model.text}</p>
                <ul className={styles.cardLinks}>
                  {model.services.map((label) => {
                    const link = linkForLabel(label);
                    return link ? (
                      <li key={label}>
                        <Link href={link.href}>{label}</Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Packages />

      <section id="price-list" className={styles.section} aria-labelledby="price-list-title">
        <div className="container">
          <SectionHead
            id="price-list-title"
            kicker="Price list"
            title="Starting prices for every service"
            intro="Open a service to see its three plans and what each includes."
          />
          <div className={styles.priceGroups}>
            {priceGroups.map((group, index) => (
              <div key={group.id} className={styles.priceGroup} data-fx-reveal="" style={order(index)}>
                <h3>{group.label}</h3>
                <p>{group.intro}</p>
                <ul className={styles.priceRows}>
                  {group.rows.map((row) => (
                    <li key={row.href}>
                      <Link href={row.href + "#pricing"} className={styles.priceRow}>
                        <span className={styles.priceName}>{row.label}</span>
                        <span className={styles.priceValue}>
                          <small>From</small> {priceLabel(row.price.from, row.price.unit)}
                        </span>
                        <span className={styles.priceUnit}>{unitWords(row.price.unit)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className={styles.priceFootnote}>{PRICE_FOOTNOTE}</p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="quote-title">
        <div className="container">
          <SectionHead id="quote-title" kicker="Getting a quote" title="How quoting works" />
          <ol className={styles.steps}>
            {pricing.steps.map((step, index) => (
              <li key={step.title} className={styles.step} data-fx-reveal="" data-fx-spot="" style={order(index)}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="factors-title">
        <div className={"container " + styles.split}>
          <SectionHead id="factors-title" kicker="What affects the price" title="The main things that change a quote" />
          <ul className={styles.checklist}>
            {pricing.factors.map((factor, index) => (
              <li key={factor} style={order(index)} data-fx-reveal="">
                <span className={styles.check}>
                  <CheckIcon />
                </span>
                {factor}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ServiceFaq faqs={pricing.faqs} heading="Pricing questions" />

      <CtaBand title="Get a fixed quote for your project" text="Start with a free audit of your current website." />
    </PageMain>
  );
}
