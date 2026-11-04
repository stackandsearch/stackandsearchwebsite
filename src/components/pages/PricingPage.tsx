import Link from "next/link";
import { PageMain } from "@/components/page/PageMain";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceGraphic } from "@/components/service/ServiceGraphic";
import { ServiceHero } from "@/components/service/ServiceHero";
import { ServiceFaq } from "@/components/service/ServicePage";
import { pricing } from "@/content/pricing";
import { linkForLabel } from "@/content/services";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/seo/structured-data";
import { Packages } from "@/components/sections/home/Packages";
import { CheckIcon, CtaBand, order, pad, SectionHead } from "./parts";
import styles from "./Pages.module.scss";

const PATH = "/pricing/";

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
        secondaryHref="#models"
        secondaryLabel="How we price"
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
