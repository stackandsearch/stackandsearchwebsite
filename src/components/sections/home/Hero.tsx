import type { CSSProperties } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { ButtonLink } from "@/components/ui/Button";
import buttonStyles from "@/components/ui/Button.module.scss";
import { AeoIcon, BracesIcon, CheckCircleIcon, GaugeIcon, SeoIcon } from "@/components/ui/duotone-icons";
import { Laptop3D } from "@/components/visuals/Laptop3D";
import { ctaLink } from "@/content/navigation";
import { HeroScene } from "./HeroScene";
import styles from "./Hero.module.scss";

// Claims we can stand behind today. No client names, scores or results.
const proofPoints = [
  "Server-rendered, SEO-ready builds",
  "Core Web Vitals targets set for every project",
  "Maintenance and support after launch",
];

// The query the search bar types: what a prospective client would search.
const QUERY = "web design and development agency";

// Starfield: [left %, top %, size 1-3]
const STARS: Array<[number, number, number]> = [
  [6, 16, 1], [12, 58, 2], [19, 30, 1], [27, 10, 3], [34, 70, 2], [41, 20, 1],
  [49, 6, 2], [57, 52, 1], [63, 14, 3], [70, 36, 2], [77, 8, 1], [84, 48, 2],
  [91, 22, 1], [46, 40, 3], [24, 46, 2], [80, 64, 1], [96, 60, 2], [3, 78, 1],
];

// "The search horizon": a query types itself, the headline answers it, and the
// build appears over a receding grid. Decorative layers are aria-hidden.
export function Hero() {
  return (
    <HeroScene className={styles.hero} labelledBy="hero-title">
      <div className={styles.backdrop} aria-hidden="true">
        <div className={`${styles.blob} ${styles.blobA}`} />
        <div className={`${styles.blob} ${styles.blobB}`} />
        <div className={`${styles.blob} ${styles.blobC}`} />
        <div className={styles.stars}>
          {STARS.map(([x, y, size], index) => (
            <span
              key={index}
              className={styles.star}
              data-size={size}
              style={{ left: `${x}%`, top: `${y}%`, "--d": `${(index % 6) * 0.3}s` } as CSSProperties}
            />
          ))}
        </div>
        <div className={styles.floor}>
          <div className={styles.floorGrid} />
        </div>
        <div className={styles.horizon} />
        <div className={styles.spotlight} />
        <div className={styles.grain} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <div className={styles.search} aria-hidden="true">
            <SeoIcon className={styles.searchIcon} />
            <span className={styles.query} style={{ "--chars": QUERY.length } as CSSProperties}>
              {QUERY}
            </span>
            <span className={styles.caret} />
            <span className={styles.enter}>Enter</span>
          </div>

          {/* Never hidden or faded: the headline is the page's largest content (LCP). */}
          <h1 id="hero-title" className={`display ${styles.title}`}>
            Fast, conversion-ready websites built to be found.
          </h1>
          <span className={styles.titleBeam} aria-hidden="true" />

          <p className={`lead ${styles.lead}`}>
            Stack &amp; Search is a web design and development agency. We design and engineer high-performance
            websites, then keep them fast, secure and visible with maintenance, paid ads, social media, SEO, AEO
            and GEO.
          </p>
          <div className={styles.actions}>
            <Magnetic>
              <ButtonLink item={ctaLink} size="lg">
                Get a free website audit
              </ButtonLink>
            </Magnetic>
            <a href="#how-we-build" className={`${buttonStyles.button} ${buttonStyles.secondary} ${buttonStyles.lg}`}>
              See how we build
            </a>
          </div>
          <ul className={styles.proof}>
            {proofPoints.map((point) => (
              <li key={point}>
                <CheckCircleIcon className={styles.proofIcon} />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.stage}>
          <div className={styles.orbit} aria-hidden="true">
            <span className={styles.orbitDot} />
          </div>

          <div className={styles.fade}>
            <div className={styles.entrance}>
              <div className={styles.float}>
                <Laptop3D variant="hero" />
              </div>
            </div>
          </div>

          <div className={styles.cubeWrap} aria-hidden="true">
            <div className={styles.cube}>
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
          <span className={styles.sphere} aria-hidden="true" />

          <div className={`${styles.chip} ${styles.chipAnswer}`} aria-hidden="true">
            <span className={styles.chipTitle}>
              <AeoIcon className={styles.chipIcon} />
              Answer-ready
            </span>
            <span>Clear answers for search and AI tools</span>
          </div>

          <div className={`${styles.chip} ${styles.chipSchema}`} aria-hidden="true">
            <span className={styles.chipTitle}>
              <BracesIcon className={styles.chipIcon} />
              Structured data
            </span>
            <code className={styles.code}>{'"@type": "Service"'}</code>
          </div>

          <div className={`${styles.chip} ${styles.chipVitals}`} aria-hidden="true">
            <span className={styles.chipTitle}>
              <GaugeIcon className={styles.chipIcon} />
              Web Vitals targets
            </span>
            <span className={styles.vitalsRow}>
              <strong>LCP</strong>under 2.5 s
            </span>
            <span className={styles.vitalsRow}>
              <strong>INP</strong>under 200 ms
            </span>
            <span className={styles.vitalsRow}>
              <strong>CLS</strong>under 0.1
            </span>
          </div>

          <div className={`${styles.chip} ${styles.chipResult}`} aria-hidden="true">
            <span className={styles.resultUrl}>
              <span className={styles.favicon} />
              yourbusiness.com
            </span>
            <span className={styles.resultTitle}>Fast, conversion-ready websites</span>
            <span className={styles.resultLine} />
            <span className={`${styles.resultLine} ${styles.resultLineShort}`} />
          </div>

          <div className={styles.shadow} aria-hidden="true" />
        </div>
      </div>
    </HeroScene>
  );
}
