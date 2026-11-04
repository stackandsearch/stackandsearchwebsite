"use client";

import { useEffect } from "react";
import {
  ATTRIBUTION_COOKIE,
  ATTRIBUTION_MAX_AGE,
  directTouch,
  parseAttribution,
  serializeAttribution,
  touchFromVisit,
} from "@/lib/leads/attribution";

const SESSION_KEY = "ss-attr-session";

function readCookie(name: string) {
  const prefix = `${name}=`;
  return document.cookie.split("; ").find((part) => part.startsWith(prefix))?.slice(prefix.length) ?? null;
}

// Records how this visitor found the site in a first-party cookie, sent
// with any enquiry. Latest source wins, but a direct visit never replaces a
// real one; the first-ever source is kept as well.
export function AttributionTracker() {
  useEffect(() => {
    try {
      const saved = parseAttribution(readCookie(ATTRIBUTION_COOKIE));
      const newSession = !window.sessionStorage.getItem(SESSION_KEY);
      window.sessionStorage.setItem(SESSION_KEY, "1");

      const touch = touchFromVisit(window.location.href, document.referrer, window.location.hostname);
      let first = saved.first;
      let last = saved.last;
      if (touch) {
        last = touch;
        first = first ?? touch;
      } else if (newSession && !last) {
        last = directTouch(window.location.href);
        first = first ?? last;
      }
      if (first === saved.first && last === saved.last) return;

      const secure = window.location.protocol === "https:" ? "; Secure" : "";
      document.cookie = `${ATTRIBUTION_COOKIE}=${serializeAttribution({ first, last })}; Path=/; Max-Age=${ATTRIBUTION_MAX_AGE}; SameSite=Lax${secure}`;
    } catch {
      // Storage blocked: attribution is optional.
    }
  }, []);

  return null;
}
