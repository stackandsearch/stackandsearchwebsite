import { NavLink } from "@/components/layout/NavLink";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CheckCircleIcon } from "@/components/ui/duotone-icons";
import { maintenanceNote, pricingLink, websitePackages } from "@/content/home/packages";
import { ctaLink } from "@/content/navigation";
import styles from "./Packages.module.scss";

// Package structure from the plan. No prices or popularity claims until the
// owner supplies real figures; each card asks for a quote.
export function Packages() {
  return (
    <section id="packages" className={styles.section} aria-labelledby="packages-title">
      <div className="container">
        <Reveal as="header" className={styles.header}>
          <h2 id="packages-title">Website packages</h2>
          <p>
            Three starting points, each with technical SEO built in. Every project gets a written scope and a
            fixed-fee quote before work begins.
          </p>
        </Reveal>

        <ul className={styles.grid}>
          {websitePackages.map((pkg, index) => (
            <Reveal as="li" key={pkg.name} delay={index * 90} className={styles.item}>
              <article className={`${styles.card} ${pkg.featured ? styles.featured : ""}`} data-tilt="">
                <h3 className={styles.name}>{pkg.name}</h3>
                <p className={styles.bestFor}>Best for {pkg.bestFor.toLowerCase()}</p>
                <p className={styles.price}>
                  <strong>Price on request</strong>
                  <span>Fixed-fee quote once the scope is agreed</span>
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
          ))}
        </ul>

        <Reveal className={styles.footer}>
          <p>{maintenanceNote}</p>
          <NavLink item={pricingLink} className={styles.more} />
        </Reveal>
      </div>
    </section>
  );
}
