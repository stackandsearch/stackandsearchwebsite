import Link from "next/link";
import type { CSSProperties } from "react";
import { websiteFirst, websiteFirstSteps } from "@/content/home/website-first";
import styles from "./DevelopmentFirst.module.scss";

// "Why we start with the website": five steps rising like a staircase. Each
// card links to its service; the progress line fills as it scrolls in.
export function DevelopmentFirst() {
  return (
    <section className={styles.section} aria-labelledby="website-first-title">
      <div className="container">
        <div className={styles.header}>
          <h2 id="website-first-title">{websiteFirst.title}</h2>
          <p className={styles.intro}>{websiteFirst.intro}</p>
        </div>

        <ol className={styles.ladder}>
          {websiteFirstSteps.map((step, index) => (
            <li key={step.title} className={styles.card} style={{ "--i": index } as CSSProperties}>
              <div className={styles.top}>
                <span className={styles.number} aria-hidden="true">
                  {index + 1}
                </span>
                {step.badge ? <span className={styles.badge}>{step.badge}</span> : null}
              </div>
              <h3 className={styles.title}>
                <Link href={step.href} className={styles.link}>
                  <span className="visually-hidden">Step {index + 1}: </span>
                  {step.title}
                </Link>
              </h3>
              <p className={styles.tagline}>{step.tagline}</p>
              <dl className={styles.facts}>
                <div>
                  <dt>Pricing</dt>
                  <dd>{step.pricing}</dd>
                </div>
                <div>
                  <dt>Results usually show</dt>
                  <dd>{step.results}</dd>
                </div>
              </dl>
              <span className={styles.bar} aria-hidden="true">
                <span className={styles.fill} />
              </span>
            </li>
          ))}
        </ol>

        <p className={styles.note}>{websiteFirst.note}</p>
      </div>
    </section>
  );
}

export default DevelopmentFirst;
