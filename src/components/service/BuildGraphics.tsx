import type { CSSProperties, ReactNode } from "react";
import type { ServiceGraphicKind } from "@/content/services/types";
import styles from "./BuildGraphics.module.scss";

const delay = (index: number) => ({ "--d": index }) as CSSProperties;

const TICK = (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// A product card: add to cart, the cart badge pops, payment succeeds.
function Commerce() {
  return (
    <div className={styles.scene}>
      <div className={styles.product}>
        <span className={styles.productImage} />
        <span className={styles.productLines}>
          <i />
          <i />
        </span>
        <span className={styles.productFoot}>
          <b className={styles.price}>₹1,499</b>
          <span className={styles.addButton}>Add to cart</span>
        </span>
      </div>
      <div className={styles.cart}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 4h2l2.4 11h10.2L20 8H6.2" />
          <circle cx="9.5" cy="19" r="1.4" />
          <circle cx="16.5" cy="19" r="1.4" />
        </svg>
        <span className={styles.cartCount}>1</span>
      </div>
      <div className={styles.toast}>
        <span className={styles.toastTick}>{TICK}</span>
        Payment successful
      </div>
    </div>
  );
}

const WATERFALL = [0.9, 0.62, 0.42, 0.3, 0.2];

// A speed gauge swings into the green while load bars shrink.
function Speed() {
  return (
    <div className={styles.scene}>
      <div className={styles.gaugeCard}>
        <svg className={styles.gauge} viewBox="0 0 120 70">
          <path className={styles.gaugeTrack} d="M10 62 A50 50 0 0 1 110 62" pathLength={100} />
          <path className={styles.gaugeFill} d="M10 62 A50 50 0 0 1 110 62" pathLength={100} />
          <line className={styles.needle} x1="60" y1="62" x2="60" y2="24" />
          <circle className={styles.hub} cx="60" cy="62" r="4" />
        </svg>
        <span className={styles.gaugeLabel}>
          <small>Largest Contentful Paint</small>
          <strong>Good</strong>
        </span>
      </div>
      <div className={styles.waterfall}>
        <span className={styles.waterfallTitle}>Page load</span>
        {WATERFALL.map((width, index) => (
          <span key={width} className={styles.row} style={{ "--d": index, "--w": width } as CSSProperties}>
            <i />
          </span>
        ))}
      </div>
    </div>
  );
}

const NODES = [
  { label: "CRM", x: 16, y: 14 },
  { label: "Payments", x: 84, y: 14 },
  { label: "WhatsApp", x: 13, y: 60 },
  { label: "Calendar", x: 87, y: 60 },
  { label: "Email", x: 50, y: 74 },
];

// Your website in the middle, wired to the tools you run on.
function Connect() {
  return (
    <div className={styles.scene}>
      <svg className={styles.wires} viewBox="0 0 100 80" preserveAspectRatio="none">
        {NODES.map((node, index) => (
          <line key={node.label} x1="50" y1="38" x2={node.x} y2={node.y} pathLength={100} style={delay(index)} />
        ))}
      </svg>
      <div className={styles.hubNode}>
        <span className={styles.hubIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M3 9h18" />
          </svg>
        </span>
        Your website
      </div>
      {NODES.map((node, index) => (
        <span
          key={node.label}
          className={styles.node}
          style={{ "--d": index, left: `${node.x}%`, top: `${(node.y / 80) * 100}%` } as CSSProperties}
        >
          {node.label}
        </span>
      ))}
    </div>
  );
}

// A wireframe fills in with real design; swatches and type join it.
function Design() {
  return (
    <div className={styles.scene}>
      <div className={styles.artboard}>
        <span className={styles.abBar}>
          <i />
          <i />
          <i />
        </span>
        <span className={`${styles.block} ${styles.blockHero}`} style={delay(0)} />
        <span className={styles.blockRow}>
          <span className={styles.block} style={delay(1)} />
          <span className={styles.block} style={delay(2)} />
          <span className={styles.block} style={delay(3)} />
        </span>
        <span className={`${styles.block} ${styles.blockWide}`} style={delay(4)} />
      </div>
      <div className={styles.palette}>
        {[0, 1, 2, 3].map((swatch) => (
          <i key={swatch} style={delay(swatch)} />
        ))}
      </div>
      <div className={styles.typeCard}>
        <strong>Aa</strong>
        <span>
          <i />
          <i />
        </span>
      </div>
      <svg className={styles.pointer} viewBox="0 0 24 24">
        <path d="M5 3l14 8-6 1.5L10 19z" />
      </svg>
    </div>
  );
}

const REDIRECTS: [string, string][] = [
  ["/services.html", "/website-development/"],
  ["/about-us", "/about/"],
  ["/blog?p=12", "/blog/speed-tips/"],
];

// The old site, an arrow to the new one, and 301 redirects lining up.
function Migrate() {
  return (
    <div className={styles.scene}>
      <div className={`${styles.site} ${styles.oldSite}`}>
        <span className={styles.siteBar}>old-site.com</span>
        <span className={styles.siteBody}>
          <i />
          <i />
          <i />
        </span>
      </div>
      <svg className={styles.arrow} viewBox="0 0 100 40" preserveAspectRatio="none">
        <path pathLength={100} d="M4 24 C30 4 70 4 92 22" />
        <path className={styles.arrowHead} pathLength={100} d="M84 14 L93 22 L84 30" />
      </svg>
      <div className={`${styles.site} ${styles.newSite}`}>
        <span className={styles.siteBar}>yourbusiness.com</span>
        <span className={styles.siteBody}>
          <i />
          <i />
          <i />
        </span>
      </div>
      <ul className={styles.redirects}>
        {REDIRECTS.map(([from, to], index) => (
          <li key={from} style={delay(index)}>
            <span>{from}</span>
            <b>301</b>
            <span>{to}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BuildGraphic({ kind, fallback }: { kind: ServiceGraphicKind; fallback: ReactNode }) {
  switch (kind) {
    case "commerce":
      return <Commerce />;
    case "speed":
      return <Speed />;
    case "connect":
      return <Connect />;
    case "design":
      return <Design />;
    case "migrate":
      return <Migrate />;
    default:
      return <>{fallback}</>;
  }
}
