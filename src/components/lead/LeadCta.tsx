import Link from "next/link";
import { SocialLinks } from "@/components/company/SocialLinks";
import { company } from "@/content/company";
import { primaryNav } from "@/content/navigation";
import { AttributionTracker } from "./AttributionTracker";
import { LeadForm } from "./LeadForm";
import styles from "./LeadCta.module.scss";

const contactHref = primaryNav.find((item) => item.label === "Contact")?.href ?? "/contact/";

const POINTS = [
  "A free audit of your current website",
  "A written scope before any work starts",
  "A fixed-fee quote for every project",
];

// The footer's call-to-action card, on every page: pitch, email and social
// links on the left, lead form on the right. Also records where the visitor
// came from, for the lead sheet.
export function LeadCta() {
  return (
    <div className={styles.card} id="get-started">
      <div className={styles.copy}>
        <h2 className={styles.title}>
          <span className={styles.titleLine}>Have a website in mind?</span>
          <span className={styles.titleLine}>Let&apos;s build it to be found.</span>
        </h2>
        <p className={styles.text}>
          Start with a free audit of your current site, or tell us what you need. Every project gets a written
          scope and a fixed-fee quote before work begins.
        </p>
        <ul className={styles.points}>
          {POINTS.map((point) => (
            <li key={point} className={styles.point}>
              <span className={styles.pointIcon} aria-hidden="true">
                <svg viewBox="0 0 16 16">
                  <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {point}
            </li>
          ))}
        </ul>
        <p className={styles.alt}>
          Prefer to talk first? <Link href={contactHref}>Book a call</Link>
        </p>
        <p className={styles.email}>
          Or email <a href={`mailto:${company.email}`}>{company.email}</a>
        </p>
        <SocialLinks className={styles.socials} />
        <p className={styles.legal}>
          <Link href="/privacy-policy/">Privacy policy</Link>
          <Link href="/terms/">Terms</Link>
          <Link href="/cookie-policy/">Cookie policy</Link>
        </p>
      </div>
      <div className={styles.panel}>
        <LeadForm source="footer" />
      </div>
      <AttributionTracker />
    </div>
  );
}
