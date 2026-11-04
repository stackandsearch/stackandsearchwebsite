"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface HeaderShellProps {
  className?: string;
  children: ReactNode;
}

function menuIsOpen() {
  try {
    if (document.querySelector("#services-panel:popover-open")) return true;
  } catch {
    // Popover not supported.
  }
  return Boolean(document.querySelector("dialog[open]"));
}

// The site <header>. Slides away while the visitor scrolls down and returns
// on any scroll up. Never hides near the top of the page, while a menu is
// open, or while keyboard focus is inside it. Also mirrors its state onto
// <html data-header-hidden> so pinned sections can use the freed space.
export function HeaderShell({ className, children }: HeaderShellProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;

    let lastY = window.scrollY;
    let frame = 0;

    const setHidden = (hidden: boolean) => {
      header.toggleAttribute("data-hidden", hidden);
      document.documentElement.toggleAttribute("data-header-hidden", hidden);
    };

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < 6) return;
      const goingDown = delta > 0;
      const pastTop = y > header.offsetHeight * 2;
      setHidden(goingDown && pastTop && !menuIsOpen() && !header.matches(":focus-within"));
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onFocusIn = () => setHidden(false);

    window.addEventListener("scroll", onScroll, { passive: true });
    header.addEventListener("focusin", onFocusIn);
    return () => {
      window.removeEventListener("scroll", onScroll);
      header.removeEventListener("focusin", onFocusIn);
      cancelAnimationFrame(frame);
      setHidden(false);
    };
  }, []);

  return (
    <header ref={ref} className={className}>
      {children}
    </header>
  );
}
