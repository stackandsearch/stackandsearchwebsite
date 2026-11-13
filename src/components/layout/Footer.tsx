import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
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
  { text: "Stack", tone: "stack" },
  { text: "and", tone: "and" },
  { text: "Search", tone: "search" },
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
            <LogoMark className={styles.giantMark} />
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
