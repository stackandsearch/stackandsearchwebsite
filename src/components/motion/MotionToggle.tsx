"use client";

import { usePreference } from "@/hooks/usePreference";
import { motionStore } from "@/lib/prefs/stores";
import styles from "./MotionToggle.module.scss";

// Pause / play for the animated background (and every other animation on the
// site: the choice is saved on this device). Auto-playing motion needs a way
// to stop it (WCAG 2.2.2), so this sits wherever motion loops on its own.
export function MotionToggle({ className }: { className?: string }) {
  const state = usePreference(motionStore);
  const paused = state ? state.value === "paused" : undefined;

  return (
    <button
      type="button"
      className={`${styles.toggle}${className ? ` ${className}` : ""}`}
      aria-pressed={paused}
      disabled={state === null}
      onClick={() => motionStore.setPreference(paused ? "on" : "paused")}
      data-motion-toggle=""
    >
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        {paused ? <path d="M4.5 2.8v10.4L13 8z" /> : <path d="M4 3h3v10H4zM9 3h3v10H9z" />}
      </svg>
      <span className="visually-hidden">Pause animations</span>
      <span aria-hidden="true">{paused ? "Play motion" : "Pause motion"}</span>
    </button>
  );
}
