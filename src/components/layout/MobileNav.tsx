"use client";

import Link from "next/link";
import { useRef, useSyncExternalStore, type MouseEvent } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/duotone-icons";
import { ChevronDownIcon, CloseIcon, MenuIcon } from "@/components/ui/icons";
import { moreLinksFor } from "@/content/menu";
import { allServicesLink, ctaLink, primaryNav, serviceGroups } from "@/content/navigation";
import { site } from "@/content/site";
import { NavLink } from "./NavLink";
import { Wordmark } from "./Wordmark";
import styles from "./MobileNav.module.scss";

const subscribeNothing = () => () => {};

// Mobile menu in a native modal <dialog> (focus trap, inert page, Escape to
// close). Every service page is listed in collapsible native <details>
// groups. Without JavaScript, a "Menu" link jumps to the footer instead.
export function MobileNav() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const hydrated = useSyncExternalStore(subscribeNothing, () => true, () => false);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();
  const closeAfterLink = (event: MouseEvent<HTMLElement>) => {
    if (event.target instanceof Element && event.target.closest("a")) close();
  };

  return (
    <div className={styles.root}>
      <a href="#site-footer" className={styles.fallback}>
        Menu
      </a>
      <button
        type="button"
        className={styles.trigger}
        onClick={open}
        disabled={!hydrated}
        aria-haspopup="dialog"
        aria-controls="mobile-nav"
      >
        <MenuIcon />
        <span className={styles.triggerLabel}>Menu</span>
      </button>

      <dialog id="mobile-nav" ref={dialogRef} className={styles.dialog} aria-label="Site menu">
        <div className={styles.top} onClick={closeAfterLink}>
          <Link href="/" className={styles.home} aria-label={`${site.name}, home`}>
            <Wordmark />
          </Link>
          <button type="button" className={styles.close} onClick={close}>
            <CloseIcon />
            <span className="visually-hidden">Close menu</span>
          </button>
        </div>

        <div className={styles.body} onClick={closeAfterLink}>
          <nav aria-label="Mobile">
            {serviceGroups.map((group, index) => {
              const more = moreLinksFor(group.id);
              return (
                <details key={group.id} className={styles.group} open={index === 0}>
                  <summary className={styles.summary}>
                    {group.label}
                    <ChevronDownIcon className={styles.chevron} />
                  </summary>
                  <p className={styles.intro}>{group.intro}</p>
                  <ul className={styles.items}>
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <NavLink item={item} className={styles.item}>
                          <span className={styles.itemIcon}>
                            <ServiceIcon href={item.href} />
                          </span>
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                  {more.length > 0 ? (
                    <ul className={styles.more}>
                      {more.map((link) => (
                        <li key={link.href}>
                          <NavLink item={link} className={styles.moreLink} />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </details>
              );
            })}
            <details className={styles.group}>
              <summary className={styles.summary}>
                Company
                <ChevronDownIcon className={styles.chevron} />
              </summary>
              <ul className={styles.more}>
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <NavLink item={item} className={styles.moreLink} />
                  </li>
                ))}
                <li>
                  <NavLink item={allServicesLink} className={styles.moreLink} />
                </li>
              </ul>
            </details>
          </nav>
          <ButtonLink item={ctaLink} size="lg">
            Get a free website audit
          </ButtonLink>
        </div>
      </dialog>
    </div>
  );
}
