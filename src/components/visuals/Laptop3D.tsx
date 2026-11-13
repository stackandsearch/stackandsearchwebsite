import styles from "./Laptop3D.module.scss";
import { LogoMark } from "@/components/brand/Logo";

interface Laptop3DProps {
  className?: string;
  variant?: "hero" | "story";
}


// Realistic CSS 3D laptop (decorative, hidden from assistive technology).
// Proportions follow a modern 14-inch notebook: 3:2 lid; deck as wide as the
// lid and as deep as the lid is tall; thin front edge; recessed keyboard;
// centred trackpad; speaker grilles; camera notch; logo on the lid back.
// "hero": the lid opens on load. "story": the lid follows --open (0-1) from
// an ancestor. Text sizes use cqw, so place it inside a container-type box.
export function Laptop3D({ className, variant = "hero" }: Laptop3DProps) {
  return (
    <div className={[styles.device, className].filter(Boolean).join(" ")} data-variant={variant} aria-hidden="true">
      <div className={styles.base}>
        <div className={styles.deck}>
          <span className={styles.hinge} />
          <span className={`${styles.speaker} ${styles.speakerLeft}`} />
          <span className={`${styles.speaker} ${styles.speakerRight}`} />
          <span className={styles.well}>
            <span className={styles.keys} />
            <span className={styles.spacebar} />
          </span>
          <span className={styles.trackpad} />
          <span className={styles.scoop} />
        </div>
        <div className={styles.front} />
      </div>

      <div className={styles.lid}>
        <div className={styles.lidBack}>
          <LogoMark className={styles.logo} />
        </div>

        <div className={styles.lidFront}>
          <div className={styles.screen}>
            <div className={`${styles.layer} ${styles.architecture}`} data-layer="1">
              <svg className={styles.sitemap} viewBox="0 0 120 70" fill="none">
                <rect x="45" y="4" width="30" height="12" rx="3" />
                <path d="M60 16v10M20 26h80M20 26v8M60 26v8M100 26v8M20 46v8M100 46v8" />
                <rect x="6" y="34" width="28" height="12" rx="3" />
                <rect x="46" y="34" width="28" height="12" rx="3" />
                <rect x="86" y="34" width="28" height="12" rx="3" />
                <rect x="8" y="54" width="24" height="10" rx="3" />
                <rect x="88" y="54" width="24" height="10" rx="3" />
              </svg>
            </div>

            <div className={`${styles.layer} ${styles.interface}`} data-layer="2">
              <span className={styles.uiNav}>
                <span className={styles.uiLogo} />
                <span className={styles.uiPill} />
                <span className={styles.uiPill} />
                <span className={styles.uiPill} />
                <span className={styles.uiButton} />
              </span>
              <span className={styles.uiMedia} />
              <span className={styles.uiCards}>
                <span />
                <span />
                <span />
              </span>
            </div>

            <div className={`${styles.layer} ${styles.content}`} data-layer="3">
              <span className={`${styles.line} ${styles.lineXL}`} />
              <span className={`${styles.line} ${styles.lineL}`} />
              <span className={`${styles.line} ${styles.lineS1}`} />
              <span className={`${styles.line} ${styles.lineS2}`} />
              <span className={`${styles.line} ${styles.lineS3}`} />
              <span className={styles.ctaBar} />
            </div>

            <div className={`${styles.layer} ${styles.search}`} data-layer="4">
              <span className={`${styles.tag} ${styles.tagH1}`}>{"<h1>"}</span>
              <span className={`${styles.tag} ${styles.tagH2}`}>{"<h2>"}</span>
              <span className={`${styles.tag} ${styles.tagSchema}`}>schema</span>
              <span className={`${styles.tag} ${styles.tagSitemap}`}>sitemap.xml</span>
              <span className={styles.beam} />
            </div>

            <span className={styles.glare} />
            <span className={styles.power} />
          </div>
          <span className={styles.notch} />
        </div>
      </div>
    </div>
  );
}
