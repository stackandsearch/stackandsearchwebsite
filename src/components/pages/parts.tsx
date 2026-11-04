import type { CSSProperties } from "react";
import { ArrowIcon } from "@/components/service/ServicePage";
import styles from "./Pages.module.scss";

export const order = (index: number) => ({ "--i": index }) as CSSProperties;
export const pad = (value: number) => String(value).padStart(2, "0");

export function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ExternalIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M8 4H4v12h12v-4M11 4h5v5M16 4l-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SectionHead({ id, kicker, title, intro }: { id: string; kicker: string; title: string; intro?: string }) {
  return (
    <div className={styles.head} data-fx-reveal="">
      <p className={styles.kicker}>{kicker}</p>
      <h2 id={id}>{title}</h2>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </div>
  );
}

// Closing call to action; links to the lead form in the footer card.
export function CtaBand({ title, text }: { title: string; text: string }) {
  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <div className="container">
        <div className={styles.ctaBand} data-fx-reveal="" data-fx-spot="">
          <div>
            <h2 id="cta-title">{title}</h2>
            <p>{text}</p>
          </div>
          <a href="#get-started" className={styles.button} data-fx-magnet="">
            <span>Get a free audit</span>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
