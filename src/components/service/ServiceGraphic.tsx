import type { CSSProperties } from "react";
import type { ServiceGraphicKind } from "@/content/services/types";
import { GrowGraphic } from "./GrowGraphics";
import { BuildGraphic } from "./BuildGraphics";
import styles from "./ServiceGraphic.module.scss";

const delay = (index: number) => ({ "--d": index }) as CSSProperties;

const TICK = (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// A browser window builds itself; code and a speed check slide in.
function Development() {
  return (
    <div className={`${styles.scene} ${styles.dev}`}>
      <div className={styles.window}>
        <div className={styles.chrome}>
          <span className={styles.dots}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.url}>
            <span className={styles.lock} />
            yourbusiness.com
          </span>
        </div>
        <div className={styles.page}>
          <span className={`${styles.build} ${styles.navBar}`} style={delay(0)}>
            <i />
            <i />
            <i />
            <b />
          </span>
          <span className={`${styles.build} ${styles.heroBlock}`} style={delay(1)}>
            <i />
            <i />
            <b />
          </span>
          <span className={`${styles.build} ${styles.media}`} style={delay(2)} />
          <span className={`${styles.build} ${styles.tiles}`} style={delay(3)}>
            <i />
            <i />
            <i />
          </span>
        </div>
      </div>
      <div className={styles.codeCard}>
        <span className={styles.codeTag}>&lt;/&gt;</span>
        <span className={styles.codeLines}>
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className={styles.score}>
        <svg viewBox="0 0 40 40">
          <circle className={styles.scoreTrack} cx="20" cy="20" r="16" />
          <circle className={styles.scoreRing} cx="20" cy="20" r="16" pathLength={100} />
        </svg>
        <span className={styles.scoreText}>
          <small>Core Web Vitals</small>
          <strong>Passed</strong>
        </span>
      </div>
      <svg className={styles.cursor} viewBox="0 0 24 24">
        <path d="M5 3l14 8-6 1.5L10 19z" />
      </svg>
    </div>
  );
}

const CHECKS: [string, string][] = [
  ["Backups", "Verified"],
  ["Updates", "Tested"],
  ["Security", "Clean"],
  ["Speed", "Fast"],
];
const BARS = Array.from({ length: 24 }, (_, index) => index);

// A status panel: heartbeat line, checks ticking in, shield and uptime bars.
function Maintenance() {
  return (
    <div className={`${styles.scene} ${styles.care}`}>
      <div className={styles.panel}>
        <div className={styles.panelHead}>
          <span className={styles.live} />
          All systems normal
        </div>
        <svg className={styles.pulse} viewBox="0 0 320 70" preserveAspectRatio="none">
          <path pathLength={100} d="M0 35 H110 L122 14 L136 58 L150 24 L162 35 H320" />
        </svg>
        <ul className={styles.checks}>
          {CHECKS.map(([label, state], index) => (
            <li key={label} style={delay(index)}>
              <span className={styles.tick}>{TICK}</span>
              {label}
              <em>{state}</em>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.shield}>
        <svg viewBox="0 0 48 56">
          <path className={styles.shieldBody} d="M24 3l19 7v14c0 13-8.5 23-19 29C13.5 47 5 37 5 24V10z" />
          <path className={styles.shieldCheck} pathLength={100} d="M15 28l6 6 12-13" />
        </svg>
      </div>
      <div className={styles.uptime}>
        <span className={styles.uptimeLabel}>Uptime checks</span>
        <span className={styles.bars}>
          {BARS.map((bar) => (
            <i key={bar} style={delay(bar)} />
          ))}
        </span>
      </div>
    </div>
  );
}

const TIERS: [string, string][] = [
  ["Grow", "Search, AI answers, ads and social"],
  ["Run", "Updates, security and speed"],
  ["Build", "A fast, clear website"],
];

// Three layers stacking up from the bottom: Build, Run, Grow.
function Services() {
  return (
    <div className={`${styles.scene} ${styles.stack}`}>
      {TIERS.map(([title, text], index) => (
        <div key={title} className={styles.tier} style={delay(index)}>
          <strong>{title}</strong>
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}

export function ServiceGraphic({ kind }: { kind: ServiceGraphicKind }) {
  return (
    <div className={styles.frame} aria-hidden="true">
      {kind === "development" ? <Development /> : kind === "maintenance" ? <Maintenance /> : <GrowGraphic kind={kind} fallback={<BuildGraphic kind={kind} fallback={<Services />} />} />}
    </div>
  );
}
