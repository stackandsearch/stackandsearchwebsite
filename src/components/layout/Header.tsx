import Link from "next/link";
import { LeadPopup } from "@/components/lead/LeadPopup";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ButtonLink } from "@/components/ui/Button";
import { ctaLink, primaryNav } from "@/content/navigation";
import { site } from "@/content/site";
import { HeaderShell } from "./HeaderShell";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";
import { ServicesMenu } from "./ServicesMenu";
import { Wordmark } from "./Wordmark";
import styles from "./Header.module.scss";

// Sticky site header. Server-rendered; the shell (hide/show on scroll), the
// services menu, theme switch, mobile menu and the site-wide lead popup are
// small client components.
export function Header() {
  return (
    <>
      <HeaderShell className={styles.header}>
        <div className={`container ${styles.bar}`}>
          <Link href="/" className={styles.brand} aria-label={`${site.name}, home`}>
            <Wordmark />
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            <ul className={styles.list}>
              <li>
                <ServicesMenu />
              </li>
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <NavLink item={item} className={styles.link} />
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <ThemeToggle />
            <span className={styles.cta}>
              <ButtonLink item={ctaLink} size="sm" />
            </span>
            <MobileNav />
          </div>
        </div>
      </HeaderShell>
      <LeadPopup />
    </>
  );
}
