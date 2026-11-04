// Tiny external store for preferences that live on <html> as data-* attributes
// (theme, motion). Server-safe: nothing touches window until a component
// subscribes in the browser.

export type Preference<V extends string> = V | "system";

export interface PreferenceStore<V extends string> {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => string;
  setPreference: (preference: Preference<V>) => void;
}

interface StoreConfig<V extends string> {
  storageKey: string;
  datasetKey: "theme" | "motion";
  values: readonly V[];
  mediaQuery: string;
  fromMedia: (matches: boolean) => V;
  animateChanges?: boolean;
}

type TransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<unknown> };
};

export function createPreferenceStore<V extends string>(config: StoreConfig<V>): PreferenceStore<V> {
  const listeners = new Set<() => void>();
  let media: MediaQueryList | null = null;
  let memoryFallback: Preference<V> = "system";

  const isValue = (value: string | null): value is V =>
    value !== null && (config.values as readonly string[]).includes(value);

  function readPreference(): Preference<V> {
    try {
      const stored = window.localStorage.getItem(config.storageKey);
      return isValue(stored) ? stored : "system";
    } catch {
      return memoryFallback;
    }
  }

  function writePreference(preference: Preference<V>) {
    memoryFallback = preference;
    try {
      if (preference === "system") window.localStorage.removeItem(config.storageKey);
      else window.localStorage.setItem(config.storageKey, preference);
    } catch {
      // Storage blocked (private browsing): the choice still applies to this page view.
    }
  }

  function resolve(preference: Preference<V>): V {
    return preference === "system"
      ? config.fromMedia(window.matchMedia(config.mediaQuery).matches)
      : (preference as V);
  }

  function apply() {
    document.documentElement.dataset[config.datasetKey] = resolve(readPreference());
    listeners.forEach((listener) => listener());
  }

  const onMediaChange = () => {
    if (readPreference() === "system") apply();
  };

  const onStorage = (event: StorageEvent) => {
    if (event.key === config.storageKey || event.key === null) apply();
  };

  return {
    subscribe(listener) {
      listeners.add(listener);
      if (listeners.size === 1) {
        media = window.matchMedia(config.mediaQuery);
        media.addEventListener("change", onMediaChange);
        window.addEventListener("storage", onStorage);
      }
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) {
          media?.removeEventListener("change", onMediaChange);
          window.removeEventListener("storage", onStorage);
          media = null;
        }
      };
    },

    getSnapshot() {
      const preference = readPreference();
      const value = document.documentElement.dataset[config.datasetKey] ?? resolve(preference);
      return `${preference}|${value}`;
    },

    setPreference(preference) {
      writePreference(preference);
      const doc = document as TransitionDocument;
      const motionPaused = document.documentElement.dataset.motion === "paused";
      if (config.animateChanges && !motionPaused && typeof doc.startViewTransition === "function") {
        doc.startViewTransition(apply).ready.catch(() => {
          // Transition skipped (for example, the tab is hidden); the change is still applied.
        });
      } else {
        apply();
      }
    },
  };
}
