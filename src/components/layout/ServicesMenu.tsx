"use client";

import { useEffect, useRef, useSyncExternalStore, type MouseEvent, type PointerEvent } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/duotone-icons";
import { ChevronDownIcon } from "@/components/ui/icons";
import { moreLinksFor } from "@/content/menu";
import { allServicesLink, ctaLink, serviceGroups } from "@/content/navigation";
import { NavLink } from "./NavLink";
import styles from "./ServicesMenu.module.scss";

const PANEL_ID = "services-panel";
const OPEN_DELAY = 80;
const CLOSE_DELAY = 240;

function subscribe(onChange: () => void) {
  const panel = document.getElementById(PANEL_ID);
  panel?.addEventListener("toggle", onChange);
  return () => panel?.removeEventListener("toggle", onChange);
}

function isOpen() {
  try {
    return document.getElementById(PANEL_ID)?.matches(":popover-open") ?? false;
  } catch {
    return false;
  }
}

const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// Desktop mega menu on the native Popover API: Build / Run / Grow columns with
// every service page, plus a free-audit card. Opens on hover (mouse) or click;
// Escape and click-outside close it (WCAG 1.4.13: hoverable, dismissible).
export function ServicesMenu() {
  const panelRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const openedByHover = useRef(false);
  const open = useSyncExternalStore(subscribe, isOpen, () => false);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const onToggle = () => {
      if (!isOpen()) openedByHover.current = false;
    };
    panel.addEventListener("toggle", onToggle);
    return () => panel.removeEventListener("toggle", onToggle);
  }, []);

  const clearTimer = () => window.clearTimeout(timer.current);

  const show = () => {
    if (isOpen()) return;
    try {
      panelRef.current?.showPopover();
      openedByHover.current = true;
    } catch {
      // Not supported or already open.
    }
  };

  const hide = () => {
    if (!isOpen()) return;
    try {
      panelRef.current?.hidePopover();
    } catch {
      // Already closed.
    }
  };

  const onPointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || !canHover()) return;
    clearTimer();
    if (!isOpen()) timer.current = window.setTimeout(show, OPEN_DELAY);
  };

  const onPointerLeave = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    clearTimer();
    if (openedByHover.current) timer.current = window.setTimeout(hide, CLOSE_DELAY);
  };

  const onTriggerClick = (event: MouseEvent<HTMLButtonElement>) => {
    clearTimer();
    if (openedByHover.current && isOpen()) {
      event.preventDefault();
      openedByHover.current = false;
    }
  };

  const closeAfterLink = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("a")) hide();
  };

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        popoverTarget={PANEL_ID}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        data-open={open || undefined}
        onClick={onTriggerClick}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        Services
        <ChevronDownIcon className={styles.chevron} />
      </button>
      <div
        id={PANEL_ID}
        ref={panelRef}
        popover="auto"
        className={styles.panel}
        onClick={closeAfterLink}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        <div className={styles.columns}>
          {serviceGroups.map((group) => {
            const more = moreLinksFor(group.id);
            return (
              <div key={group.id} className={styles.column}>
                <p id={`services-${group.id}`} className={styles.groupLabel}>
                  {group.label}
                </p>
                <p className={styles.intro}>{group.intro}</p>
                <ul className={styles.items} aria-labelledby={`services-${group.id}`}>
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <NavLink item={item} className={styles.item}>
                        <span className={styles.itemIcon}>
                          <ServiceIcon href={item.href} />
                        </span>
                        <span className={styles.itemLabel}>{item.label}</span>
                        {group.items.length === 1 ? <span className={styles.itemSummary}>{item.summary}</span> : null}
                      </NavLink>
                    </li>
                  ))}
                </ul>
                {more.length > 0 ? (
                  <ul className={styles.more} aria-label={`More ${group.label} services`}>
                    {more.map((link) => (
                      <li key={link.href}>
                        <NavLink item={link} className={styles.moreLink} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}

          <div className={styles.aside}>
            <p className={styles.asideTitle}>Not sure where to start?</p>
            <p className={styles.asideText}>Start with a free audit of your current website.</p>
            <ButtonLink item={ctaLink} size="sm">
              Get a free audit
            </ButtonLink>
            <NavLink item={allServicesLink} className={styles.all} />
          </div>
        </div>
      </div>
    </>
  );
}
