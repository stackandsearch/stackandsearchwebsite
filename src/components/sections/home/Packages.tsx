import { NavLink } from "@/components/layout/NavLink";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CheckCircleIcon } from "@/components/ui/duotone-icons";
import { maintenanceNote, pricingLink, websitePackages } from "@/content/home/packages";
import { ctaLink } from "@/content/navigation";
import { priceFor, priceLabel } from "@/content/services/prices";
import styles from "./Packages.module.scss";

// Website packages. Starting prices come from the "Website development"
// plans in src/content/services/prices.ts (matched by package name).
const websitePlans = priceFor("Website development")?.plans ?? [];

export function Packages() {
  return (
    <section id="packages" className={styles.section} aria-labelledby="packages-title">
      <div className="container">
        <Reveal as="header" className={styles.header}>
          <h2 id="packages-title">Website packages</h2>
          <p>
            Three starting points, each with technical SEO built in. Prices are starting points; every project
            gets a written scope and a fixed-fee quote before work begins.
          </p>
        </Reveal>

        <ul className={styles.grid}>
          {websitePackages.map((pkg, index) => {
            const plan = websitePlans.find((item) => item.name === pkg.name);
            return (
              <Reveal as="li" key={pkg.name} delay={index * 90} className={styles.item}>
                <article className={`${styles.card} ${pkg.featured ? styles.featured : ""}`} data-tilt="">
                  <h3 className={styles.name}>{pkg.name}</h3>
                  <p className={styles.bestFor}>Best for {pkg.bestFor.toLowerCase()}</p>
                  <p className={styles.price}>
                    <strong>{plan ? `From ${priceLabel(plan.price, plan.unit)}` : "Price on request"}</strong>
                    <span>{plan ? "One-off project, before GST. Fixed in your written quote." : "Fixed-fee quote once the scope is agreed"}</span>
                  </p>
                  <ul className={styles.includes}>
                    {pkg.includes.map((included) => (
                      <li key={included}>
                        <CheckCircleIcon className={styles.includeIcon} />
                        {included}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.cta}>
                    <ButtonLink item={ctaLink} variant={pkg.featured ? "primary" : "secondary"} size="md">
                      Request a quote
                    </ButtonLink>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className={styles.footer}>
          <p>{maintenanceNote}</p>
          <NavLink item={pricingLink} className={styles.more} />
        </Reveal>
      </div>
    </section>
  );
}
