"use client";

import { useEffect } from "react";

const TILT = ["--rx", "--ry"];
const MAGNET = ["--tx", "--ty"];
const PARALLAX = ["--px", "--py"];

function clear(element: HTMLElement | null, props: string[]) {
  if (!element) return;
  for (const prop of props) element.style.removeProperty(prop);
}

// One set of listeners for the whole page. Markup opts in with attributes:
//   data-fx-reveal     gets data-fx-shown the first time it scrolls into view
//   data-fx-spot  gets --mx / --my, the pointer position inside it
//   data-fx-tilt="n"   gets --rx / --ry, tilting toward the pointer (max n deg)
//   data-fx-magnet   gets --tx / --ty, drifting toward the pointer
//   data-fx-parallax   gets --px / --py, the pointer position from -1 to 1
//   data-fx-steps      the data-fx-step child nearest mid-screen gets
//                   data-fx-current, and the group gets --active
// Pointer effects are mouse-only; tilt, magnet and parallax are skipped
// when the visitor prefers reduced motion.
export function Interactions() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const canObserve = "IntersectionObserver" in window;

    const reveal = canObserve
      ? new IntersectionObserver(
          (entries, observer) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              entry.target.setAttribute("data-fx-shown", "");
              observer.unobserve(entry.target);
            }
          },
          { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
        )
      : null;

    const steps = canObserve
      ? new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              const step = entry.target as HTMLElement;
              const group = step.closest<HTMLElement>("[data-fx-steps]");
              if (!group) continue;
              group.querySelectorAll("[data-fx-current]").forEach((item) => item.removeAttribute("data-fx-current"));
              step.setAttribute("data-fx-current", "");
              group.style.setProperty("--active", step.dataset.fxStep ?? "1");
            }
          },
          { rootMargin: "-45% 0px -45% 0px" },
        )
      : null;

    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll("[data-fx-reveal], [data-fx-step]").forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        if (element.hasAttribute("data-fx-reveal")) {
          if (reveal) reveal.observe(element);
          else element.setAttribute("data-fx-shown", "");
        }
        if (element.hasAttribute("data-fx-step")) steps?.observe(element);
      });
    };
    scan();

    let scanFrame = 0;
    const mutations = new MutationObserver(() => {
      if (scanFrame) return;
      scanFrame = requestAnimationFrame(() => {
        scanFrame = 0;
        scan();
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    let frame = 0;
    let pointer: PointerEvent | null = null;
    let tilted: HTMLElement | null = null;
    let magnet: HTMLElement | null = null;
    let parallax: HTMLElement | null = null;

    const update = () => {
      frame = 0;
      const event = pointer;
      if (!event) return;
      const target = event.target instanceof Element ? event.target : null;

      const spot = target?.closest<HTMLElement>("[data-fx-spot]");
      if (spot) {
        const box = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${(event.clientX - box.left).toFixed(1)}px`);
        spot.style.setProperty("--my", `${(event.clientY - box.top).toFixed(1)}px`);
      }
      if (reduce) return;

      const nextTilt = target?.closest<HTMLElement>("[data-fx-tilt]") ?? null;
      if (tilted !== nextTilt) clear(tilted, TILT);
      tilted = nextTilt;
      if (nextTilt) {
        const box = nextTilt.getBoundingClientRect();
        const max = Number(nextTilt.dataset.fxTilt) || 6;
        const x = (event.clientX - box.left) / box.width - 0.5;
        const y = (event.clientY - box.top) / box.height - 0.5;
        nextTilt.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
        nextTilt.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
      }

      const nextMagnet = target?.closest<HTMLElement>("[data-fx-magnet]") ?? null;
      if (magnet !== nextMagnet) clear(magnet, MAGNET);
      magnet = nextMagnet;
      if (nextMagnet) {
        const box = nextMagnet.getBoundingClientRect();
        nextMagnet.style.setProperty("--tx", `${((event.clientX - (box.left + box.width / 2)) * 0.28).toFixed(1)}px`);
        nextMagnet.style.setProperty("--ty", `${((event.clientY - (box.top + box.height / 2)) * 0.28).toFixed(1)}px`);
      }

      const nextParallax = target?.closest<HTMLElement>("[data-fx-parallax]") ?? null;
      if (parallax !== nextParallax) clear(parallax, PARALLAX);
      parallax = nextParallax;
      if (nextParallax) {
        const box = nextParallax.getBoundingClientRect();
        nextParallax.style.setProperty("--px", (((event.clientX - box.left) / box.width) * 2 - 1).toFixed(3));
        nextParallax.style.setProperty("--py", (((event.clientY - box.top) / box.height) * 2 - 1).toFixed(3));
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer = event;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onLeave = () => {
      clear(tilted, TILT);
      clear(magnet, MAGNET);
      clear(parallax, PARALLAX);
      tilted = magnet = parallax = null;
    };

    if (finePointer) {
      document.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    return () => {
      reveal?.disconnect();
      steps?.disconnect();
      mutations.disconnect();
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scanFrame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
