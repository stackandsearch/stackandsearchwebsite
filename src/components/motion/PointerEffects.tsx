"use client";

import { useEffect, useRef } from "react";
import { usePreference } from "@/hooks/usePreference";
import { motionStore } from "@/lib/prefs/stores";
import styles from "./PointerEffects.module.scss";

const CAN_HOVER = "(hover: hover) and (pointer: fine)";
const REDUCED = "(prefers-reduced-motion: reduce)";
const TEXT_ENTRY = "input, textarea, select, [contenteditable='true'], [data-cursor='native']";
const ACTIONABLE = "a[href], button, summary, label, [role='button']";
const MAGNET_PULL = 6; // px
const TILT_MAX = 5; // deg
const MAGNET_PROPS = ["--magnet-x", "--magnet-y"];
const TILT_PROPS = ["--tilt-x", "--tilt-y", "--glare-x", "--glare-y"];

const clamp = (value: number) => Math.max(-1, Math.min(1, value));
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

function release(element: HTMLElement | null, props: string[]) {
  if (!element) return;
  element.removeAttribute("data-active");
  for (const prop of props) element.style.removeProperty(prop);
}

// Desktop-only pointer effects with one listener set and one animation frame
// loop: a soft halo that trails the mouse (the native cursor is never
// hidden), magnetic drift on [data-magnetic] and 3D tilt on [data-tilt].
// Off for touch, reduced motion and the pause control.
export function PointerEffects() {
  const haloRef = useRef<HTMLDivElement>(null);
  const motion = usePreference(motionStore);
  const enabled = motion?.value === "on";

  useEffect(() => {
    const halo = haloRef.current;
    if (!enabled || !halo) return;
    if (!window.matchMedia(CAN_HOVER).matches || window.matchMedia(REDUCED).matches) return;

    let pointerX = 0;
    let pointerY = 0;
    let haloX = 0;
    let haloY = 0;
    let frame = 0;
    let started = false;
    let magnet: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;

    const tick = () => {
      haloX += (pointerX - haloX) * 0.18;
      haloY += (pointerY - haloY) * 0.18;
      halo.style.transform = `translate3d(${haloX.toFixed(1)}px, ${haloY.toFixed(1)}px, 0)`;

      if (magnet) {
        const rect = magnet.getBoundingClientRect();
        const dx = clamp((pointerX - (rect.left + rect.width / 2)) / (rect.width / 2));
        const dy = clamp((pointerY - (rect.top + rect.height / 2)) / (rect.height / 2));
        magnet.style.setProperty("--magnet-x", `${(dx * MAGNET_PULL).toFixed(2)}px`);
        magnet.style.setProperty("--magnet-y", `${(dy * MAGNET_PULL).toFixed(2)}px`);
      }

      if (tilt) {
        const rect = tilt.getBoundingClientRect();
        const px = clamp01((pointerX - rect.left) / rect.width);
        const py = clamp01((pointerY - rect.top) / rect.height);
        tilt.style.setProperty("--tilt-x", `${((0.5 - py) * 2 * TILT_MAX).toFixed(2)}deg`);
        tilt.style.setProperty("--tilt-y", `${((px - 0.5) * 2 * TILT_MAX).toFixed(2)}deg`);
        tilt.style.setProperty("--glare-x", `${(px * 100).toFixed(1)}%`);
        tilt.style.setProperty("--glare-y", `${(py * 100).toFixed(1)}%`);
      }

      const settled = Math.abs(pointerX - haloX) < 0.1 && Math.abs(pointerY - haloY) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!started) {
        started = true;
        haloX = pointerX;
        haloY = pointerY;
        halo.setAttribute("data-visible", "");
      }
      schedule();
    };

    const onOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !(event.target instanceof Element)) return;
      const target = event.target;
      const state = target.closest(TEXT_ENTRY) ? "hidden" : target.closest(ACTIONABLE) ? "action" : "idle";
      halo.setAttribute("data-state", state);

      const nextMagnet = target.closest<HTMLElement>("[data-magnetic]");
      if (nextMagnet !== magnet) {
        release(magnet, MAGNET_PROPS);
        magnet = nextMagnet;
        magnet?.setAttribute("data-active", "");
      }

      const nextTilt = target.closest<HTMLElement>("[data-tilt]");
      if (nextTilt !== tilt) {
        release(tilt, TILT_PROPS);
        tilt = nextTilt;
        tilt?.setAttribute("data-active", "");
      }
      schedule();
    };

    const reset = () => {
      halo.removeAttribute("data-visible");
      started = false;
      release(magnet, MAGNET_PROPS);
      release(tilt, TILT_PROPS);
      magnet = null;
      tilt = null;
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") reset();
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(frame);
      reset();
      halo.style.removeProperty("transform");
    };
  }, [enabled]);

  return (
    <div ref={haloRef} className={styles.halo} aria-hidden="true">
      <span className={styles.ring} />
    </div>
  );
}
