import { Fragment, type CSSProperties, type ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/page/Breadcrumbs";
import styles from "./ServiceHero.module.scss";

interface ServiceHeroProps {
  eyebrow: string;
  title: string;
  accent?: string;
  lead: string;
  points: string[];
  crumbs: Crumb[];
  graphic: ReactNode;
  secondaryHref: string;
  secondaryLabel: string;
}

// Words of the highlighted phrase: the given accent, else the part after the
// last comma or colon, else the last three words.
function accentRange(words: string[], title: string, accent?: string): [number, number] {
  const separator = /[,:]\s/;
  const phrase = (accent ?? (separator.test(title) ? (title.split(separator).pop() ?? "") : words.slice(-3).join(" "))).trim();
  const length = phrase.split(/\s+/).length;
  for (let start = 0; start + length <= words.length; start += 1) {
    if (words.slice(start, start + length).join(" ") === phrase) return [start, start + length];
  }
  return [Math.max(words.length - length, 0), words.length];
}

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Tick() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Inner-page hero. The section is a parallax surface: <Interactions> feeds
// it the pointer position, which the backdrop, visual and chips react to.
export function ServiceHero({ eyebrow, title, accent, lead, points, crumbs, graphic, secondaryHref, secondaryLabel }: ServiceHeroProps) {
  const words = title.split(/\s+/);
  const [from, to] = accentRange(words, title, accent);

  return (
    <section className={styles.hero} aria-labelledby="page-title" data-fx-parallax="">
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.mesh} />
        <span className={styles.floor} />
        <span className={styles.beam} />
      </div>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <Breadcrumbs items={crumbs} />
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 id="page-title" className={styles.title}>
            {words.map((word, index) => (
              <Fragment key={index}>
                <span className={index >= from && index < to ? `${styles.word} ${styles.accent}` : styles.word}>
                  <span style={{ "--i": index } as CSSProperties}>{word}</span>
                </span>
                {index < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h1>
          <p className={styles.lead}>{lead}</p>
          <div className={styles.actions}>
            <a href="#get-started" className={styles.primary} data-fx-magnet="">
              <span>Get a free audit</span>
              <Arrow />
            </a>
            <a href={secondaryHref} className={styles.secondary} data-fx-magnet="">
              {secondaryLabel}
            </a>
          </div>
          <ul className={styles.points}>
            {points.map((point) => (
              <li key={point}>
                <Tick />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.stage}>
          <svg className={styles.rings} viewBox="0 0 400 400" preserveAspectRatio="none" aria-hidden="true">
            <ellipse cx="200" cy="200" rx="192" ry="120" />
            <ellipse cx="200" cy="200" rx="150" ry="188" />
          </svg>
          <div className={styles.visual}>{graphic}</div>
          <ul className={styles.chips} aria-hidden="true">
            {points.slice(0, 3).map((point, index) => (
              <li key={point} className={styles.chip} style={{ "--i": index } as CSSProperties}>
                <Tick />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
