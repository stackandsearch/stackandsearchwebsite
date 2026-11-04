import styles from "./NotFound.module.scss";

function Sheet({ className }: { className?: string }) {
  return (
    <span className={className ? `${styles.sheet} ${className}` : styles.sheet}>
      <i />
      <i />
      <i />
    </span>
  );
}

// "404" built from stacked layers. The 0 is a magnifying glass scanning for
// the missing page while pages drift off the stack, a radar sweeps and an
// empty search result waits. Decorative only; still under reduced motion.
export function NotFoundScene() {
  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={styles.backdrop}>
        <span className={styles.grid} />
        <span className={styles.radar} />
        <span className={styles.horizon} />
      </div>
      <div className={styles.sheets}>
        <Sheet />
        <Sheet />
        <Sheet />
      </div>
      <div className={styles.digits}>
        <span className={styles.digit}>
          <b>4</b>
          <b>4</b>
          <b>4</b>
        </span>
        <span className={styles.lens}>
          <span className={styles.glass}>
            <span className={styles.ask}>?</span>
            <span className={styles.glint} />
          </span>
          <span className={styles.handle} />
        </span>
        <span className={`${styles.digit} ${styles.late}`}>
          <b>4</b>
          <b>4</b>
          <b>4</b>
        </span>
        <Sheet className={styles.falling} />
      </div>
      <div className={styles.serp}>
        <span className={styles.serpUrl}>
          <i />
          stackandsearch.com › this page
        </span>
        <span className={styles.serpTitle}>0 results for this page</span>
        <span className={styles.skeleton} />
        <span className={styles.skeleton} />
      </div>
    </div>
  );
}
