import type { CSSProperties, ReactNode } from "react";
import type { ServiceGraphicKind } from "@/content/services/types";
import styles from "./GrowGraphics.module.scss";

const delay = (index: number) => ({ "--d": index }) as CSSProperties;

const BAR_HEIGHTS = [34, 42, 50, 58, 70, 84];

// A sponsored ad, and a leads chart that rises with a trend line.
function Ads() {
  return (
    <div className={`${styles.scene} ${styles.ads}`}>
      <div className={styles.adCard}>
        <span className={styles.sponsored}>Sponsored</span>
        <span className={styles.adUrl}>yourbusiness.com</span>
        <span className={styles.adTitle} />
        <span className={styles.adLine} />
        <span className={styles.adLine} />
        <span className={styles.adCta}>Get a quote</span>
      </div>
      <div className={styles.chart}>
        <span className={styles.chartLabel}>Leads</span>
        <span className={styles.bars}>
          {BAR_HEIGHTS.map((height, index) => (
            <i key={height} style={{ "--d": index, "--h": `${height}%` } as CSSProperties} />
          ))}
        </span>
        <svg className={styles.trend} viewBox="0 0 100 40" preserveAspectRatio="none">
          <path pathLength={100} d="M2 34 L20 29 L38 26 L56 19 L74 12 L98 4" />
        </svg>
      </div>
      <div className={styles.pill}>
        <span className={styles.pillDot} />
        Cost per lead <strong>↓</strong>
      </div>
    </div>
  );
}

const DAYS = Array.from({ length: 14 }, (_, index) => index);
const POSTED = new Set([1, 3, 6, 8, 10, 13]);

// A phone feed, a content calendar filling in, and floating hearts.
function Social() {
  return (
    <div className={`${styles.scene} ${styles.social}`}>
      <div className={styles.phone}>
        <span className={styles.notch} />
        {[0, 1].map((post) => (
          <div key={post} className={styles.post} style={delay(post)}>
            <span className={styles.postHead}>
              <i />
              <b />
            </span>
            <span className={styles.postImage} />
            <span className={styles.postActions}>
              <i />
              <i />
              <i />
            </span>
          </div>
        ))}
      </div>
      <div className={styles.calendar}>
        <span className={styles.calTitle}>This month</span>
        <span className={styles.calGrid}>
          {DAYS.map((day) => (
            <i key={day} data-on={POSTED.has(day) ? "" : undefined} style={delay(day)} />
          ))}
        </span>
      </div>
      <span className={styles.hearts}>
        {[0, 1, 2].map((heart) => (
          <i key={heart} style={delay(heart)}>
            ♥
          </i>
        ))}
      </span>
    </div>
  );
}

const COMPETITORS = ["competitor-one.com", "competitor-two.com", "competitor-three.com"];

// Search results: your site climbs from fourth to first.
function Seo() {
  return (
    <div className={`${styles.scene} ${styles.seo}`}>
      <div className={styles.serp}>
        <div className={styles.searchBar}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M20 20l-4.2-4.2" />
          </svg>
          your service near me
        </div>
        <ol className={styles.results}>
          <li className={styles.you}>
            <span className={styles.rank}>1</span>
            <span className={styles.resultText}>
              <b>yourbusiness.com</b>
              <i />
              <i />
            </span>
          </li>
          {COMPETITORS.map((site, index) => (
            <li key={site}>
              <span className={styles.rank}>{index + 2}</span>
              <span className={styles.resultText}>
                <b>{site}</b>
                <i />
                <i />
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.rankCard}>
        <span className={styles.chartLabel}>Organic visibility</span>
        <svg className={styles.rankTrend} viewBox="0 0 100 40" preserveAspectRatio="none">
          <path pathLength={100} d="M2 36 C20 34 30 30 42 26 S70 14 98 4" />
        </svg>
      </div>
    </div>
  );
}

// A question, then an answer that types itself and credits your site.
function Aeo() {
  return (
    <div className={`${styles.scene} ${styles.aeo}`}>
      <div className={styles.question}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 5h16v11H9l-5 4z" />
        </svg>
        How much does a business website cost?
      </div>
      <div className={styles.answer}>
        <span className={styles.answerLabel}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
          </svg>
          Answer
        </span>
        <span className={styles.answerLines}>
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className={styles.source}>
          <span className={styles.sourceDot} />
          yourbusiness.com
        </span>
      </div>
      <div className={styles.voice}>
        <span className={styles.wave}>
          {Array.from({ length: 7 }, (_, index) => (
            <i key={index} style={delay(index)} />
          ))}
        </span>
      </div>
    </div>
  );
}

// An AI assistant answers and cites your site.
function Geo() {
  return (
    <div className={`${styles.scene} ${styles.geo}`}>
      <div className={styles.chat}>
        <div className={styles.chatHead}>
          <span className={styles.aiBadge}>AI</span>
          Assistant
        </div>
        <div className={styles.prompt}>Which agency should I hire for my website?</div>
        <div className={styles.reply}>
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className={styles.citations}>
          <span>1</span>
          <span className={styles.yourCite}>yourbusiness.com</span>
          <span>3</span>
        </div>
      </div>
      <span className={styles.sparks}>
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}

export function GrowGraphic({ kind, fallback }: { kind: ServiceGraphicKind; fallback: ReactNode }) {
  switch (kind) {
    case "ads":
      return <Ads />;
    case "social":
      return <Social />;
    case "seo":
      return <Seo />;
    case "aeo":
      return <Aeo />;
    case "geo":
      return <Geo />;
    default:
      return <>{fallback}</>;
  }
}
