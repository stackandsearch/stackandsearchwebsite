import { MOTION_STORAGE_KEY, THEME_STORAGE_KEY, type Motion, type Theme } from "./constants";
import { createPreferenceStore } from "./preference-store";

// Theme: "system" follows prefers-color-scheme; dark is the brand default.
export const themeStore = createPreferenceStore<Theme>({
  storageKey: THEME_STORAGE_KEY,
  datasetKey: "theme",
  values: ["light", "dark"],
  mediaQuery: "(prefers-color-scheme: light)",
  fromMedia: (prefersLight) => (prefersLight ? "light" : "dark"),
  animateChanges: true,
});

// Motion: "system" follows prefers-reduced-motion.
export const motionStore = createPreferenceStore<Motion>({
  storageKey: MOTION_STORAGE_KEY,
  datasetKey: "motion",
  values: ["on", "paused"],
  mediaQuery: "(prefers-reduced-motion: reduce)",
  fromMedia: (prefersReduced) => (prefersReduced ? "paused" : "on"),
});
