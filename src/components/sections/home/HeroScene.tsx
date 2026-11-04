"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePreference } from "@/hooks/usePreference";
import { motionStore } from "@/lib/prefs/stores";

interface HeroSceneProps {
  children: ReactNode;
  className?: string;
  labelledBy: string;
}

const REST_SPOT = { x: 72, y: 42 }; // spotlight rests over the laptop (percent)

// The hero <section>. On desktop (mouse, motion allowed) it writes the
// pointer position as CSS custom properties: --px/--py (-1..1) drive depth
// parallax, --mx/--my (percent) move the spotlight. Everything else is CSS.
export function HeroScene({ children, className, labelledBy }: HeroSceneProps) {
  const ref = useRef<HTMLElement>(null);
  const motion = usePreference(motionStore);
  const enabled = motion?.value === "on";

  useEffect(() => {
    const scene = ref.current;
    if (!enabled || !scene) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: 0, y: 0, mx: REST_SPOT.x, my: REST_SPOT.y };
    const current = { ...target };
    let frame = 0;

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      current.mx += (target.mx - current.mx) * 0.12;
      current.my += (target.my - current.my) * 0.12;
      scene.style.setProperty("--px", current.x.toFixed(3));
      scene.style.setProperty("--py", current.y.toFixed(3));
      scene.style.setProperty("--mx", `${current.mx.toFixed(2)}%`);
      scene.style.setProperty("--my", `${current.my.toFixed(2)}%`);
      const settled =
        Math.abs(target.x - current.x) < 0.001 &&
        Math.abs(target.y - current.y) < 0.001 &&
        Math.abs(target.mx - current.mx) < 0.05 &&
        Math.abs(target.my - current.my) < 0.05;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = scene.getBoundingClientRect();
      const fx = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const fy = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      target.x = fx * 2 - 1;
      target.y = fy * 2 - 1;
      target.mx = fx * 100;
      target.my = fy * 100;
      schedule();
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      target.mx = REST_SPOT.x;
      target.my = REST_SPOT.y;
      schedule();
    };

    scene.addEventListener("pointermove", onMove, { passive: true });
    scene.addEventListener("pointerleave", onLeave);
    return () => {
      scene.removeEventListener("pointermove", onMove);
      scene.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
      for (const prop of ["--px", "--py", "--mx", "--my"]) scene.style.removeProperty(prop);
    };
  }, [enabled]);

  return (
    <section ref={ref} className={className} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
