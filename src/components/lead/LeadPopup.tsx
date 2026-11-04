"use client";

import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { CloseIcon } from "@/components/ui/icons";
import { LEAD_SUBMITTED_EVENT, LEAD_SUBMITTED_KEY } from "@/lib/leads/schema";
import { LeadForm } from "./LeadForm";
import styles from "./LeadPopup.module.scss";

const DISMISSED_COOKIE = "ss-lead-popup=dismissed";

function wasDismissed() {
  return document.cookie.split("; ").includes(DISMISSED_COOKIE);
}

// A session cookie (no expiry): gone when the browser closes, shared by tabs.
function rememberDismissed() {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${DISMISSED_COOKIE}; path=/; SameSite=Lax${secure}`;
}

function hasSubmitted() {
  try {
    return window.localStorage.getItem(LEAD_SUBMITTED_KEY) === "1";
  } catch {
    return false;
  }
}

// The second full-size, top-level section of the page (the hero is first).
function findTrigger() {
  const minHeight = window.innerHeight * 0.5;
  const sections = Array.from(document.querySelectorAll("main section")).filter(
    (section) => !section.parentElement?.closest("section") && section.getBoundingClientRect().height >= minHeight,
  );
  return sections[1] ?? null;
}

// Something else has the visitor's attention right now.
function isBusy() {
  if (document.querySelector("[data-lead-form=contact]")) return true;
  if (document.querySelector("dialog[open]")) return true;
  try {
    if (document.querySelector(":popover-open")) return true;
  } catch {
    // Popover not supported.
  }
  const active = document.activeElement;
  if (active instanceof HTMLElement && active.closest("form")) return true;
  const footerForm = document.querySelector("[data-lead-form='footer']");
  if (footerForm) {
    const rect = footerForm.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return true;
  }
  return false;
}

// Site-wide lead popup. Opens once the visitor has scrolled past the first
// two sections of a page. Closing it keeps it away for the rest of the
// browser session; submitting any lead form keeps it away on this device.
export function LeadPopup() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [armed, setArmed] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (wasDismissed() || hasSubmitted()) return;

    let frame = 0;
    let done = false;
    let path = "";
    let trigger: Element | null = null;

    function stop() {
      done = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(LEAD_SUBMITTED_EVENT, stop);
    }

    function check() {
      frame = 0;
      if (done) return;
      if (window.location.pathname !== path) {
        path = window.location.pathname;
        trigger = findTrigger();
      }
      const reached = trigger
        ? trigger.getBoundingClientRect().bottom < window.innerHeight * 0.5
        : window.scrollY + window.innerHeight > document.documentElement.scrollHeight * 0.6;
      if (!reached || isBusy()) return;
      stop();
      setArmed(true);
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(check);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener(LEAD_SUBMITTED_EVENT, stop);
    return () => {
      stop();
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!armed) return;
    const timer = window.setTimeout(() => {
      const dialog = dialogRef.current;
      if (dialog && !dialog.open) dialog.showModal();
    }, 300);
    return () => window.clearTimeout(timer);
  }, [armed]);

  const close = () => dialogRef.current?.close();
  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      data-lead-popup=""
      onClose={rememberDismissed}
      onClick={onBackdropClick}
    >
      {armed ? (
        <div className={styles.panel}>
          <button type="button" className={styles.close} onClick={close}>
            <CloseIcon />
            <span className="visually-hidden">Close</span>
          </button>
          <p className={styles.eyebrow}>Free website audit</p>
          <h2 id={titleId} className={styles.title}>
            Is your website winning you customers?
          </h2>
          <p className={styles.text}>
            Tell us about your site and what you need. We&apos;ll look it over and reply with clear next steps.
          </p>
          <LeadForm source="popup" compact />
        </div>
      ) : null}
    </dialog>
  );
}
