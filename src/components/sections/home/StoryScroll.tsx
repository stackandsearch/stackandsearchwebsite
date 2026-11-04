"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePreference } from "@/hooks/usePreference";
import { motionStore } from "@/lib/prefs/stores";

interface StoryScrollProps {
  children: ReactNode;
  className?: string;
}

// Drives a scroll storyboard: writes --p (0-1, how far the visitor has
// scrolled through this tall section) and marks it data-scrolly so CSS makes
// it tall and sticky. One passive scroll listener, throttled to one update
// per frame; scrolling itself is never taken over. Works in every browser.
// Reduced motion or no JavaScript: no attribute, so the section is a normal
// block showing its finished state (--p defaults to 1 in CSS).
export function StoryScroll({ children, className }: StoryScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const motion = usePreference(motionStore);
  const enabled = motion?.value === "on";

  useEffect(() => {
    const track = ref.current;
    if (!track || !enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    track.setAttribute("data-scrolly", "");
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const progress = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 1;
      track.style.setProperty("--p", progress.toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      track.removeAttribute("data-scrolly");
      track.style.removeProperty("--p");
    };
  }, [enabled]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
