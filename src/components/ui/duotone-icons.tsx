import type { CSSProperties, ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

// Two-tone icons: outline in the current text colour plus a soft or solid
// fill in --icon-accent (cyan). 24px grid, 1.5px stroke. Always decorative:
// the surrounding control or text carries the meaning.
const soft: CSSProperties = { fill: "var(--icon-accent)", stroke: "none", opacity: 0.22 };
const solid: CSSProperties = { fill: "var(--icon-accent)", stroke: "none" };

function DuoIcon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function WebsiteDevelopmentIcon(props: IconProps) {
  return (
    <DuoIcon {...props}>
      <path style={soft} d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5V9H3Z" />
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18" />
      <path d="m10 12.5-2 2 2 2M14 12.5l2 2-2 2" />
    </DuoIcon>
  );
}

export function MaintenanceIcon(props: IconProps) {
  const shield = "M12 3.5 18.5 6v5.2c0 4-2.7 7.2-6.5 9.3-3.8-2.1-6.5-5.3-6.5-9.3V6Z";
  return (
    <DuoIcon {...props}>
      <path style={soft} d={shield} />
      <path d={shield} />
      <path d="m9.25 12 1.9 1.9 3.6-3.8" />
    </DuoIcon>
  );
}

export function PaidAdsIcon(props: IconProps) {
  return (
    <DuoIcon {...props}>
      <circle style={soft} cx="11" cy="13" r="7.5" />
      <circle cx="11" cy="13" r="7.5" />
      <circle cx="11" cy="13" r="3.5" />
      <circle style={solid} cx="11" cy="13" r="1.25" />
      <path d="m11 13 8.5-8.5M16.5 4.5h3v3" />
    </DuoIcon>
  );
}

export function SocialIcon(props: IconProps) {
  const bubble = "M6.5 4h6A2.5 2.5 0 0 1 15 6.5V10a2.5 2.5 0 0 1-2.5 2.5h-3L6 15v-2.5A2.5 2.5 0 0 1 4 10V6.5A2.5 2.5 0 0 1 6.5 4Z";
  return (
    <DuoIcon {...props}>
      <path style={soft} d={bubble} />
      <path d={bubble} />
      <path d="M18 9h.5A1.5 1.5 0 0 1 20 10.5V15a1.5 1.5 0 0 1-1.5 1.5H18V19l-3-2.5h-3.5A1.5 1.5 0 0 1 10 15v-.5" />
      <path d="M7.5 8.25h4" />
    </DuoIcon>
  );
}

export function SeoIcon(props: IconProps) {
  return (
    <DuoIcon {...props}>
      <circle style={soft} cx="10.5" cy="10.5" r="6.5" />
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
      <path d="M8 12.5V11M10.5 12.5V9M13 12.5V8" />
    </DuoIcon>
  );
}

export function AeoIcon(props: IconProps) {
  const bubble = "M5 4.5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6.5L8 20v-3.5H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z";
  return (
    <DuoIcon {...props}>
      <path style={soft} d={bubble} />
      <path d={bubble} />
      <path d="M7 9h10M7 12.5h6" />
      <circle style={solid} cx="16.5" cy="12.5" r="1.25" />
    </DuoIcon>
  );
}

export function GeoIcon(props: IconProps) {
  return (
    <DuoIcon {...props}>
      <path style={solid} d="M11 3.5c.55 3.5 1.95 4.9 5.5 5.5-3.55.6-4.95 2-5.5 5.5-.55-3.5-1.95-4.9-5.5-5.5 3.55-.6 4.95-2 5.5-5.5Z" />
      <path d="M18 14.5c.3 1.6.9 2.2 2.5 2.5-1.6.3-2.2.9-2.5 2.5-.3-1.6-.9-2.2-2.5-2.5 1.6-.3 2.2-.9 2.5-2.5Z" />
      <circle cx="6" cy="18" r="1.75" />
      <path d="m7.3 16.7 2.2-2.2" />
    </DuoIcon>
  );
}

export function LayersIcon(props: IconProps) {
  const top = "M12 3.5 20.5 8 12 12.5 3.5 8Z";
  return (
    <DuoIcon {...props}>
      <path style={soft} d={top} />
      <path d={top} />
      <path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" />
    </DuoIcon>
  );
}

export function GaugeIcon(props: IconProps) {
  return (
    <DuoIcon {...props}>
      <path style={soft} d="M4 16a8 8 0 0 1 16 0Z" />
      <path d="M4 16a8 8 0 1 1 16 0" />
      <path d="m12 16 4-5" />
      <circle style={solid} cx="12" cy="16" r="1.5" />
    </DuoIcon>
  );
}

export function BracesIcon(props: IconProps) {
  return (
    <DuoIcon {...props}>
      <path d="M9 4.5H8a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2.5 2 2 0 0 1 2 2.5v3a2 2 0 0 0 2 2h1M15 4.5h1a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2.5 2 2 0 0 0-2 2.5v3a2 2 0 0 1-2 2h-1" />
      <circle style={solid} cx="12" cy="12" r="1.5" />
    </DuoIcon>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <DuoIcon {...props}>
      <circle style={soft} cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.2 2.4 2.3 4.6-4.9" />
    </DuoIcon>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <DuoIcon {...props}>
      <circle style={soft} cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </DuoIcon>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <DuoIcon {...props}>
      <path d="M7 17 17 7M9 7h8v8" />
    </DuoIcon>
  );
}

// Picks the icon for a service page by its URL.
export function ServiceIcon({ href, className }: { href: string; className?: string }) {
  switch (href) {
    case "/website-development/":
      return <WebsiteDevelopmentIcon className={className} />;
    case "/website-maintenance/":
      return <MaintenanceIcon className={className} />;
    case "/paid-ads/":
      return <PaidAdsIcon className={className} />;
    case "/social-media-management/":
      return <SocialIcon className={className} />;
    case "/seo-services/":
      return <SeoIcon className={className} />;
    case "/aeo-services/":
      return <AeoIcon className={className} />;
    case "/geo-services/":
      return <GeoIcon className={className} />;
    default:
      return <LayersIcon className={className} />;
  }
}
