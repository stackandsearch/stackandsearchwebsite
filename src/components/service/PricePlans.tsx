import type { CSSProperties } from "react";
import { PRICE_FOOTNOTE, priceLabel, unitWords, type ServicePrice } from "@/content/services/prices";
import styles from "./PricePlans.module.scss";

function Tick() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// The plans of one service as price cards, with the notes that apply to all
// of them underneath. Prices come from src/content/services/prices.ts.
export function PricePlans({ price, headingLevel = 3 }: { price: ServicePrice; headingLevel?: 3 | 4 }) {
  const Heading = headingLevel === 3 ? "h3" : "h4";
  return (
    <div className={styles.wrap}>
      <ul className={styles.plans}>
        {price.plans.map((plan, index) => (
          <li
            key={plan.name}
            className={`${styles.plan} ${plan.featured ? styles.featured : ""}`}
            data-fx-reveal=""
            data-fx-spot=""
            style={{ "--i": index } as CSSProperties}
          >
            {plan.featured ? <span className={styles.badge}>Recommended</span> : null}
            <Heading className={styles.name}>{plan.name}</Heading>
            <p className={styles.bestFor}>{plan.bestFor}</p>
            <p className={styles.price}>
              <span className={styles.from}>From</span>
              <strong>{priceLabel(plan.price, plan.unit)}</strong>
              <span className={styles.unit}>{unitWords(plan.unit)}, before GST</span>
            </p>
            <ul className={styles.includes}>
              {plan.includes.map((item) => (
                <li key={item}>
                  <span className={styles.tick}>
                    <Tick />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <ul className={styles.notes}>
        {[...price.notes, PRICE_FOOTNOTE].map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </div>
  );
}
