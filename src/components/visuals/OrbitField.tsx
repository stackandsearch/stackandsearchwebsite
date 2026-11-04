import styles from "./OrbitField.module.scss";

const STARS: Array<[number, number]> = [
  [120, 180],
  [210, 140],
  [290, 205],
  [380, 150],
  [470, 230],
  [330, 300],
  [260, 380],
  [350, 450],
  [440, 360],
];

// Decorative vector backdrop: orbit rings, planets and a constellation that
// turn and draw themselves as the visitor scrolls (static where CSS scroll
// timelines aren't supported). Colours follow the active palette.
export function OrbitField({ className }: { className?: string }) {
  return (
    <div className={[styles.field, className].filter(Boolean).join(" ")} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 600 600" fill="none">
        <circle className={styles.ringFaint} cx="300" cy="300" r="290" />
        <circle className={styles.ringDash} cx="300" cy="300" r="232" />
        <circle className={styles.ring} cx="300" cy="300" r="170" />
        <ellipse className={styles.ringSecondary} cx="300" cy="300" rx="250" ry="110" transform="rotate(-24 300 300)" />
        <ellipse className={styles.ring} cx="300" cy="300" rx="210" ry="80" transform="rotate(32 300 300)" />
        <path
          className={styles.constellation}
          d="M120 180 210 140 290 205 380 150 470 230M290 205 330 300 260 380 350 450M330 300 440 360"
        />
        {STARS.map(([x, y]) => (
          <circle key={`${x}-${y}`} className={styles.star} cx={x} cy={y} r="2.5" />
        ))}
        <circle className={styles.core} cx="300" cy="300" r="44" />
        <circle className={styles.planetAccent} cx="470" cy="300" r="9" />
        <circle className={styles.planetSecondary} cx="528" cy="198" r="6" />
        <circle className={styles.planetHighlight} cx="122" cy="189" r="5" />
      </svg>
    </div>
  );
}
