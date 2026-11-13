import { LogoFull, LogoMark } from "@/components/brand/Logo";
import styles from "./Wordmark.module.scss";

// The site logo in the header and footer. The surrounding link carries the
// accessible name. Under 380px wide only the mark is shown.
export function Wordmark() {
  return (
    <span className={styles.logo}>
      <LogoFull className={styles.full} />
      <LogoMark className={styles.mark} />
    </span>
  );
}
