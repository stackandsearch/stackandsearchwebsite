"use client";

import { useEffect, useRef } from "react";
import { usePreference } from "@/hooks/usePreference";
import { motionStore } from "@/lib/prefs/stores";
import styles from "./BrandField.module.scss";

// Animated homepage background, drawn on one <canvas> with no libraries.
// It borrows the logo's shapes: three flowing layers behind the hero and a
// field of four-point stars across the page. Stars near the mouse join up
// into a small constellation.
//
// - Motion paused (the on-page control or the OS "reduce motion" setting):
//   one still frame is drawn; it only redraws on scroll, resize or theme.
// - The loop stops while the tab is hidden.
// - Decorative only: aria-hidden, no pointer events.

interface Palette {
  ink: string;
  blue: string;
  mint: string;
  ribbonAlpha: number;
  starAlpha: number;
  blend: GlobalCompositeOperation;
}

const PALETTES: Record<"dark" | "light", Palette> = {
  dark: { ink: "250 247 240", blue: "30 167 208", mint: "43 227 168", ribbonAlpha: 1, starAlpha: 1, blend: "lighter" },
  light: { ink: "22 53 65", blue: "0 125 161", mint: "12 160 122", ribbonAlpha: 0.8, starAlpha: 0.8, blend: "source-over" },
};

interface Star {
  x: number; // 0..1 across the viewport
  y: number; // 0..1 down the viewport
  depth: number; // 0.3 (far) .. 1 (near)
  size: number; // px at depth 1
  phase: number;
  speed: number;
  tone: "ink" | "blue" | "mint";
  sx: number; // last drawn position, for the constellation
  sy: number;
}

interface Ribbon {
  tone: "ink" | "blue" | "mint";
  start: number; // centre line at the left edge (0..1 of hero height)
  end: number; // centre line at the right edge
  thickness: number; // 0..1 of hero height
  alpha: number;
  speed: number;
  phase: number;
}

const RIBBONS: Ribbon[] = [
  { tone: "ink", start: 0.78, end: 0.2, thickness: 0.085, alpha: 0.045, speed: 0.16, phase: 0 },
  { tone: "blue", start: 0.9, end: 0.34, thickness: 0.11, alpha: 0.16, speed: 0.21, phase: 1.7 },
  { tone: "mint", start: 1.02, end: 0.5, thickness: 0.075, alpha: 0.085, speed: 0.13, phase: 3.9 },
];

const POINTER_REACH = 190; // px: stars this close to the mouse join up
const STILL_TIME = 6.5; // the moment shown when motion is paused

// Deterministic pseudo-random numbers, so the star field looks the same on
// every visit (and in the still frame).
function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

function makeStars(count: number): Star[] {
  const random = seeded(20261113);
  return Array.from({ length: count }, (_, index) => {
    const depth = 0.3 + random() * 0.7;
    const roll = random();
    return {
      x: random(),
      y: random(),
      depth,
      size: index % 9 === 0 ? 9 + random() * 5 : 2.5 + random() * 4.5,
      phase: random() * Math.PI * 2,
      speed: 0.5 + random() * 1.1,
      tone: roll < 0.2 ? "mint" : roll < 0.42 ? "blue" : "ink",
      sx: 0,
      sy: 0,
    };
  });
}

// The logo's four-point star, centred on (x, y) with half-height r.
function starPath(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  const k = r / 80;
  ctx.beginPath();
  ctx.moveTo(x, y - 80 * k);
  ctx.bezierCurveTo(x + 9 * k, y - 28 * k, x + 27 * k, y - 10 * k, x + 86 * k, y);
  ctx.bezierCurveTo(x + 27 * k, y + 10 * k, x + 9 * k, y + 28 * k, x, y + 80 * k);
  ctx.bezierCurveTo(x - 9 * k, y + 28 * k, x - 27 * k, y + 10 * k, x - 86 * k, y);
  ctx.bezierCurveTo(x - 27 * k, y - 10 * k, x - 9 * k, y - 28 * k, x, y - 80 * k);
  ctx.closePath();
}

const wrap = (value: number) => ((value % 1) + 1) % 1;

export function BrandField({ anchorId }: { anchorId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motion = usePreference(motionStore);
  const ready = motion !== null;
  const playing = motion?.value === "on";

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ready || !canvas || !ctx) return;

    const root = document.documentElement;
    const anchor = document.getElementById(anchorId)?.closest("section") ?? null;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let palette = PALETTES.dark;
    let frame = 0;
    let last = 0;
    let time = playing ? 0 : STILL_TIME;
    const pointer = { x: -9999, y: -9999, px: 0, py: 0, tx: 0, ty: 0, active: false };

    const readTheme = () => {
      palette = root.dataset.theme === "light" ? PALETTES.light : PALETTES.dark;
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.25 : 1.5);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      stars = makeStars(Math.round(Math.min(64, Math.max(22, (width * height) / 26000))));
    };

    const drawRibbons = (scrollY: number) => {
      if (!anchor) return;
      const top = anchor.offsetTop - scrollY;
      const tall = anchor.offsetHeight;
      if (top + tall * 1.2 < 0 || top > height) return;

      const step = Math.max(24, width / 48);
      for (const ribbon of RIBBONS) {
        const t = time * ribbon.speed + ribbon.phase;
        const centre = (x: number) => {
          const u = x / width;
          return (
            top +
            tall * (ribbon.start + (ribbon.end - ribbon.start) * u) +
            Math.sin(u * 5.2 + t) * tall * 0.05 +
            Math.sin(u * 2.3 - t * 0.7) * tall * 0.035 +
            pointer.py * 10 * (ribbon.alpha > 0.1 ? 1 : -1)
          );
        };
        const half = (x: number, grow: number) =>
          tall * ribbon.thickness * grow * (0.55 + 0.45 * Math.sin((x / width) * 3.1 + t * 0.9 + ribbon.phase));

        const fill = ctx.createLinearGradient(0, 0, width, 0);
        const colour = palette[ribbon.tone];
        const alpha = ribbon.alpha * palette.ribbonAlpha;
        fill.addColorStop(0, `rgb(${colour} / 0)`);
        fill.addColorStop(0.3, `rgb(${colour} / ${alpha * 0.55})`);
        fill.addColorStop(0.72, `rgb(${colour} / ${alpha})`);
        fill.addColorStop(1, `rgb(${colour} / ${alpha * 0.25})`);
        ctx.fillStyle = fill;

        // Three passes, each wider and fainter: a soft edge without a blur filter.
        for (const grow of [0.5, 0.8, 1.15]) {
          ctx.beginPath();
          for (let x = -step; x <= width + step; x += step) {
            const y = centre(x) - half(x, grow);
            if (x === -step) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          for (let x = width + step; x >= -step; x -= step) ctx.lineTo(x, centre(x) + half(x, grow));
          ctx.closePath();
          ctx.fill();
        }

        // A glint runs along the cerulean layer every few seconds.
        if (ribbon.tone === "blue") {
          const cycle = (time % 7) / 2.6;
          if (cycle < 1) {
            const x = cycle * (width + 200) - 100;
            const y = centre(x);
            const glow = ctx.createRadialGradient(x, y, 0, x, y, 90);
            const strength = Math.sin(cycle * Math.PI) * 0.5 * palette.ribbonAlpha;
            glow.addColorStop(0, `rgb(${palette.mint} / ${strength})`);
            glow.addColorStop(1, `rgb(${palette.mint} / 0)`);
            ctx.fillStyle = glow;
            ctx.fillRect(x - 90, y - 90, 180, 180);
          }
        }
      }
    };

    const drawStars = (scrollY: number) => {
      const near: Star[] = [];
      for (const star of stars) {
        const drift = time * 0.004 * star.depth;
        const x = wrap(star.x + drift) * (width + 80) - 40 - pointer.px * 18 * star.depth;
        const y =
          wrap(star.y - drift * 0.6 - (scrollY * 0.00012 * star.depth)) * (height + 80) - 40 - pointer.py * 14 * star.depth;
        star.sx = x;
        star.sy = y;

        const pulse = 0.5 + 0.5 * Math.sin(time * star.speed + star.phase);
        let alpha = (0.12 + 0.6 * pulse * pulse) * star.depth * palette.starAlpha;
        let radius = star.size * star.depth * (0.75 + 0.45 * pulse);

        if (pointer.active) {
          const distance = Math.hypot(x - pointer.x, y - pointer.y);
          if (distance < POINTER_REACH) {
            const pull = 1 - distance / POINTER_REACH;
            alpha = Math.min(1, alpha + pull * 0.6);
            radius *= 1 + pull * 0.7;
            near.push(star);
          }
        }

        const colour = palette[star.tone];
        if (star.size > 8) {
          const glow = ctx.createRadialGradient(x, y, 0, x, y, radius * 3.2);
          glow.addColorStop(0, `rgb(${colour} / ${alpha * 0.28})`);
          glow.addColorStop(1, `rgb(${colour} / 0)`);
          ctx.fillStyle = glow;
          ctx.fillRect(x - radius * 3.2, y - radius * 3.2, radius * 6.4, radius * 6.4);
        }
        ctx.fillStyle = `rgb(${colour} / ${alpha})`;
        starPath(ctx, x, y, radius);
        ctx.fill();
      }

      // Constellation: the mouse and the stars around it join up.
      if (near.length === 0) return;
      ctx.lineWidth = 1;
      for (let i = 0; i < near.length; i += 1) {
        const a = near[i];
        const reach = 1 - Math.hypot(a.sx - pointer.x, a.sy - pointer.y) / POINTER_REACH;
        ctx.strokeStyle = `rgb(${palette.mint} / ${reach * 0.5})`;
        ctx.beginPath();
        ctx.moveTo(pointer.x, pointer.y);
        ctx.lineTo(a.sx, a.sy);
        ctx.stroke();
        for (let j = i + 1; j < near.length; j += 1) {
          const b = near[j];
          const gap = Math.hypot(a.sx - b.sx, a.sy - b.sy);
          if (gap > 170) continue;
          ctx.strokeStyle = `rgb(${palette.blue} / ${(1 - gap / 170) * reach * 0.45})`;
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.stroke();
        }
      }
    };

    const draw = () => {
      const scrollY = window.scrollY;
      pointer.px += (pointer.tx - pointer.px) * 0.06;
      pointer.py += (pointer.ty - pointer.py) * 0.06;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = palette.blend;
      drawRibbons(scrollY);
      drawStars(scrollY);
      ctx.globalCompositeOperation = "source-over";
    };

    const tick = (now: number) => {
      frame = 0;
      if (playing) {
        // Clamp the step so a background tab doesn't jump ahead on return.
        time += Math.min(0.05, last ? (now - last) / 1000 : 0.016);
        last = now;
      }
      draw();
      if (playing && !document.hidden) frame = requestAnimationFrame(tick);
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.tx = (event.clientX / width) * 2 - 1;
      pointer.ty = (event.clientY / height) * 2 - 1;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
      pointer.tx = 0;
      pointer.ty = 0;
    };
    const onResize = () => {
      resize();
      request();
    };
    const onVisibility = () => {
      last = 0;
      if (!document.hidden) request();
    };

    readTheme();
    resize();
    request();
    canvas.dataset.ready = "";

    const themeWatcher = new MutationObserver(() => {
      readTheme();
      request();
    });
    themeWatcher.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    // Paused: the still frame follows the page as it scrolls, nothing more.
    if (!playing) window.addEventListener("scroll", request, { passive: true });
    if (playing && finePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      cancelAnimationFrame(frame);
      themeWatcher.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", request);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [anchorId, playing, ready]);

  return <canvas ref={canvasRef} className={styles.field} aria-hidden="true" />;
}
