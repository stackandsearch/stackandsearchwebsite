import styles from "./ScrollMarquee.module.scss";

const ROW_ONE = ["Website development", "Maintenance", "Paid ads", "Social media", "SEO", "AEO", "GEO"];
const ROW_TWO = ["Core Web Vitals", "Schema markup", "Server rendering", "Conversion tracking", "Accessibility"];

function Row({ items, direction }: { items: string[]; direction: "left" | "right" }) {
  const doubled = [...items, ...items];
  return (
    <div className={styles.row} data-direction={direction}>
      <div className={styles.track}>
        {doubled.map((item, index) => (
          <span key={`${item}-${index}`} className={styles.item}>
            <span className={index % 2 === 0 ? styles.filled : styles.outline}>{item}</span>
            <svg className={styles.star} viewBox="0 0 24 24">
              <path d="M12 2c.8 5.2 2.8 7.2 8 8-5.2.8-7.2 2.8-8 8-.8-5.2-2.8-7.2-8-8 5.2-.8 7.2-2.8 8-8Z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

// Kinetic type: two rows slide in opposite directions as the visitor scrolls
// (scroll-linked, never on a timer). Decorative: the same services are listed
// properly elsewhere, so it is hidden from assistive technology.
export function ScrollMarquee() {
  return (
    <div className={styles.marquee} aria-hidden="true">
      <Row items={ROW_ONE} direction="left" />
      <Row items={ROW_TWO} direction="right" />
    </div>
  );
}
