"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./RouteTransition.module.scss";

// Module-level flag: survives re-mounts, so only client-side navigations
// animate. The first page load never does (protects LCP).
let firstLoadDone = false;

export function RouteTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!firstLoadDone) {
      firstLoadDone = true;
      return;
    }
    const element = ref.current;
    if (!element) return;
    element.setAttribute("data-entering", "");
    const done = () => element.removeAttribute("data-entering");
    element.addEventListener("animationend", done, { once: true });
    return () => element.removeEventListener("animationend", done);
  }, []);

  return (
    <div ref={ref} className={styles.page}>
      {children}
    </div>
  );
}
