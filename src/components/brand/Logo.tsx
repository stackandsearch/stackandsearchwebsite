import {
  LOGO_FULL_VIEWBOX,
  LOGO_MARK,
  LOGO_MARK_TRANSFORM,
  LOGO_MARK_VIEWBOX,
  LOGO_WORD,
  type LogoShape,
} from "./logo-data";
import styles from "./Logo.module.scss";

const MARK_ID = "logo-mark";
const FULL_ID = "logo-full";

function Shapes({ shapes }: { shapes: LogoShape[] }) {
  return (
    <>
      {shapes.map((shape, index) => (
        <path key={index} className={styles[shape.tone]} transform={shape.transform} d={shape.d} />
      ))}
    </>
  );
}

// The logo's path data, once per page. Every logo on the page points at it
// with <use>, so the header, footer and laptop don't each repeat ~10 KB of
// vector paths. Rendered by the root layout.
export function LogoSprite() {
  return (
    <svg className={styles.sprite} width="0" height="0" aria-hidden="true" focusable="false">
      <symbol id={MARK_ID} viewBox={LOGO_MARK_VIEWBOX}>
        <Shapes shapes={LOGO_MARK} />
      </symbol>
      <symbol id={FULL_ID} viewBox={LOGO_FULL_VIEWBOX}>
        <g transform={LOGO_MARK_TRANSFORM}>
          <Shapes shapes={LOGO_MARK} />
        </g>
        <Shapes shapes={LOGO_WORD} />
      </symbol>
    </svg>
  );
}

// The mark alone (three stacked layers and the star). Decorative: the
// surrounding link or heading carries the accessible name.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={LOGO_MARK_VIEWBOX} aria-hidden="true" focusable="false">
      <use href={`#${MARK_ID}`} />
    </svg>
  );
}

// Mark and wordmark. The lettering follows the theme of wherever the logo is
// placed: warm white on dark surfaces, deep teal on light ones.
export function LogoFull({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={LOGO_FULL_VIEWBOX} aria-hidden="true" focusable="false">
      <use href={`#${FULL_ID}`} />
    </svg>
  );
}
