import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { footerGroups } from "@/content/footer";
import { legalNav } from "@/content/navigation";
import { site } from "@/content/site";
import { NavLink } from "./NavLink";
import { Wordmark } from "./Wordmark";
import styles from "./Footer.module.scss";
import { LeadCta } from "@/components/lead/LeadCta";

// The giant logo is split into letters so each can react to the mouse.
const GIANT_PARTS = [
  { text: "stack", tone: "stack" },
  { text: "and", tone: "and" },
  { text: "search", tone: "search" },
] as const;

// Site footer, always dark (.surface-dark) in both themes. Also the
// no-JavaScript menu target (#site-footer).
// Motion policy without an on-page pause control (WCAG 2.2.2): nothing loops
// on its own; ongoing motion is scroll- or pointer-linked; the OS "reduce
// motion" setting turns all animation off.
export function Footer() {
  return (
    <footer id="site-footer" className={`surface-dark ${styles.footer}`}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <LeadCta />

        <div className={styles.main}>
          <div className={styles.brand}>
            <Link href="/" className={styles.brandLink} aria-label={`${site.name}, home`}>
              <Wordmark />
            </Link>
            <p className={styles.tagline}>Web design, development and growth for businesses that want to be found.</p>
          </div>

          <nav className={styles.nav} aria-label="Footer">
            {footerGroups.map((group) => (
              <div key={group.id}>
                <p id={`footer-${group.id}`} className={styles.colTitle}>
                  {group.label}
                </p>
                <ul className={styles.links} aria-labelledby={`footer-${group.id}`}>
                  {group.links.map((item) => (
                    <li key={item.href}>
                      <NavLink item={item} className={styles.link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <Reveal variant="fade" className={styles.giant}>
          <span className={styles.giantInner} aria-hidden="true">
            <svg className={styles.giantMark} viewBox="0 0 64 64" focusable="false">
              <rect className={styles.giantTile} width="64" height="64" rx="15" />
              <path className={styles.giantS} d="M34 17H25a7.5 7.5 0 0 0 0 15h14a7.5 7.5 0 0 1 0 15H21" />
              <circle className={styles.giantDot} cx="46.5" cy="17" r="4.5" />
            </svg>
            <span className={styles.giantWord}>
              {GIANT_PARTS.flatMap((part) =>
                part.text.split("").map((letter, index) => (
                  <span key={`${part.tone}-${index}`} className={`${styles.letter} ${styles[part.tone]}`}>
                    {letter}
                  </span>
                )),
              )}
            </span>
          </span>
        </Reveal>

        <div className={styles.bottom}>
          <p>&copy; {site.name}. All rights reserved.</p>
          <ul className={styles.legal} aria-label="Legal">
            {legalNav.map((item) => (
              <li key={item.href}>
                <NavLink item={item} className={styles.link} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
