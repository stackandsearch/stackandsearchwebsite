import { useSyncExternalStore } from "react";
import type { Preference, PreferenceStore } from "@/lib/prefs/preference-store";

export interface PreferenceState<V extends string> {
  preference: Preference<V>;
  value: V;
}

const getServerSnapshot = (): string | null => null;

// Returns null during server rendering and hydration (the server can't know
// the visitor's choice), then the live value once the page is interactive.
export function usePreference<V extends string>(store: PreferenceStore<V>): PreferenceState<V> | null {
  const snapshot = useSyncExternalStore<string | null>(store.subscribe, store.getSnapshot, getServerSnapshot);
  if (snapshot === null) return null;
  const [preference, value] = snapshot.split("|") as [Preference<V>, V];
  return { preference, value };
}
