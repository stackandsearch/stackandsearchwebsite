"use client";

import { MoonIcon, SunIcon } from "@/components/ui/icons";
import { usePreference } from "@/hooks/usePreference";
import { themeStore } from "@/lib/prefs/stores";
import styles from "./ThemeToggle.module.scss";

// One-click dark/light switch for the header: a toggle button with a fixed
// name ("Dark theme") and aria-pressed, announced as on/off by screen
// readers. The knob position comes from CSS, so it is right at first paint.
export function ThemeToggle() {
  const state = usePreference(themeStore);
  const isDark = state ? state.value === "dark" : undefined;

  return (
    <button
      type="button"
      className={styles.toggle}
      aria-pressed={isDark}
      disabled={state === null}
      onClick={() => themeStore.setPreference(isDark ? "light" : "dark")}
    >
      <span className="visually-hidden">Dark theme</span>
      <span className={styles.track} aria-hidden="true">
        <span className={styles.knob} />
        <SunIcon className={styles.sun} />
        <MoonIcon className={styles.moon} />
      </span>
    </button>
  );
}
