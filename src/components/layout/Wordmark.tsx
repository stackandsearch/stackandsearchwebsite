import styles from "./Wordmark.module.scss";

// The owner's logo, drawn inline so its text colours follow the theme:
// light mode matches the supplied SVG exactly; dark mode turns "stack" white
// and "search" a lighter indigo for contrast. The surrounding link carries
// the accessible name. Under 380px wide only the tile mark is shown.
const S_PATH = "M34 17H25a7.5 7.5 0 0 0 0 15h14a7.5 7.5 0 0 1 0 15H21";

export function Wordmark() {
  return (
    <span className={styles.logo}>
      <svg className={styles.full} viewBox="0 0 380 64" aria-hidden="true" focusable="false">
        <rect className={styles.tile} width="64" height="64" rx="15" />
        <path className={styles.s} d={S_PATH} />
        <circle className={styles.dot} cx="46.5" cy="17" r="4.5" />
        <text className={styles.text} x="82" y="46">
          stack<tspan className={styles.and}>and</tspan>
          <tspan className={styles.search}>search</tspan>
        </text>
      </svg>
      <svg className={styles.mark} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <rect className={styles.tile} width="64" height="64" rx="15" />
        <path className={styles.s} d={S_PATH} />
        <circle className={styles.dot} cx="46.5" cy="17" r="4.5" />
      </svg>
    </span>
  );
}
