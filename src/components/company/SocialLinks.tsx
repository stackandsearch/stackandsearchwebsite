import type { ReactNode } from "react";
import { company, type SocialPlatform } from "@/content/company";
import styles from "./SocialLinks.module.scss";

const ICONS: Record<SocialPlatform, ReactNode> = {
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path
      d="M14 8.5h2.5V5H14c-2.5 0-4 1.6-4 4v2H7.5v3.5H10V21h3.5v-6.5H16l.5-3.5h-3V9.4c0-.6.3-.9.9-.9z"
      fill="currentColor"
      stroke="none"
    />
  ),
  x: (
    <path
      d="M4 4l6.8 9.1L4.2 20h1.6l5.8-6L16 20h4l-7.1-9.6L19.3 4h-1.6l-5.4 5.6L8 4z"
      fill="currentColor"
      stroke="none"
    />
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.5V16M8 7.8v.1M11.5 16v-3.2c0-1.5.9-2.3 2-2.3s2 .8 2 2.3V16M11.5 10.5V16" />
    </>
  ),
};

function Icon({ platform }: { platform: SocialPlatform }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[platform]}
    </svg>
  );
}

// Social profile icons. A profile without a URL shows as "coming soon"
// (not a link), so visitors never land on a missing page.
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={className ? `${styles.list} ${className}` : styles.list} aria-label="Social media">
      {company.socials.map((profile) => (
        <li key={profile.platform}>
          {profile.href ? (
            <a
              href={profile.href}
              className={styles.icon}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${profile.label} (opens in a new tab)`}
              data-fx-magnet=""
            >
              <Icon platform={profile.platform} />
            </a>
          ) : (
            <span
              className={`${styles.icon} ${styles.soon}`}
              role="img"
              aria-label={`${profile.label}, coming soon`}
              title={`${profile.label}: coming soon`}
            >
              <Icon platform={profile.platform} />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
