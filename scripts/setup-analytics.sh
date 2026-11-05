#!/usr/bin/env bash
# =============================================================================
# setup-analytics.sh - Google Tag Manager (GA4 inside GTM) on the live site.
#  1. GTM containers, loaded only on stackandsearch.com, after interaction-ready,
#     with Consent Mode defaults and a generate_lead event for enquiries.
#  2. Security policy allows GTM / GA4.
#  3. Privacy and cookie policies describe Google Analytics.
# Safe to re-run.
# =============================================================================
set -Eeuo pipefail

BACKUP_DIR=".setup-backup/analytics"
say() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok()  { printf '    \033[32mok\033[0m  %s\n' "$*"; }
warn(){ printf '    \033[33mnote\033[0m  %s\n' "$*"; }
die() { printf '\n\033[31mSTOPPED:\033[0m %s\n' "$*" >&2; exit 1; }
trap 'printf "\n\033[31mSTOPPED at line %s.\033[0m Paste the output above into the chat.\n" "$LINENO" >&2' ERR

if ! tail -n 1 "$0" | grep -q "^# END OF SCRIPT$"; then
  die "This script file is incomplete. Copy the whole code block again and re-run the pbpaste command."
fi

backup_once() {
  local backup="$BACKUP_DIR/$1.bak"
  mkdir -p "$(dirname "$backup")"
  if [ ! -e "$backup" ]; then cp "$1" "$backup"; fi
}

put_file() {
  local tmp; tmp="$(mktemp)"; cat > "$tmp"
  if [ -e "$1" ]; then
    if cmp -s "$tmp" "$1"; then rm -f "$tmp"; ok "unchanged $1"; return 0; fi
    backup_once "$1"; cat "$tmp" > "$1"; rm -f "$tmp"; ok "updated $1"; return 0
  fi
  mkdir -p "$(dirname "$1")"; cat "$tmp" > "$1"; rm -f "$tmp"; ok "created $1"
}

append_once() {
  local tmp; tmp="$(mktemp)"; cat > "$tmp"
  if [ ! -e "$1" ]; then rm -f "$tmp"; die "$1 is missing."; fi
  if grep -q "$2" "$1"; then rm -f "$tmp"; ok "already extended $1"; return 0; fi
  backup_once "$1"
  cat "$tmp" >> "$1"; rm -f "$tmp"; ok "extended $1"
}

say "Checking the project"
if ! grep -q '"name": "stackandsearch"' package.json 2>/dev/null; then die "Run this from the stackandsearch project folder."; fi
[ -f src/app/layout.tsx ] || die "src/app/layout.tsx is missing."
grep -q "<body" src/app/layout.tsx || die "Couldn't find <body> in src/app/layout.tsx; paste this into the chat."
ok "project matches"

# -----------------------------------------------------------------------------
say "1/4  Google Tag Manager"

put_file src/content/analytics.ts <<'EOF'
// Google Tag Manager containers. They load only on the live site (never in
// development, the automated checks or Netlify preview links). Set up GA4
// inside GTM with a Google tag (G-XXXXXXXXXX) - in ONE container only, or
// every visit is counted twice.
export const analytics = {
  gtmContainers: ["GTM-TBVFF8R2", "GTM-TLVV89W5"],
  liveHosts: ["stackandsearch.com", "www.stackandsearch.com"],
};
EOF

put_file src/components/analytics/Analytics.tsx <<'EOF'
import Script from "next/script";
import { analytics } from "@/content/analytics";

// EEA, UK and Switzerland: analytics starts denied (no consent banner).
const CONSENT_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU",
  "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH",
];

// Google Tag Manager on the live site, after the page is interactive.
// Consent Mode: analytics on, advertising storage off; enquiries are pushed
// to the data layer as "generate_lead".
export function Analytics() {
  if (analytics.gtmContainers.length === 0) return null;
  const config = JSON.stringify({
    ids: analytics.gtmContainers,
    hosts: analytics.liveHosts,
    regions: CONSENT_REGIONS,
  });

  return (
    <Script id="gtm-loader" strategy="afterInteractive">
      {`(function (w, d, c) {
  if (c.hosts.indexOf(w.location.hostname) === -1) return;
  w.dataLayer = w.dataLayer || [];
  function gtag() { w.dataLayer.push(arguments); }
  w.gtag = w.gtag || gtag;
  gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  gtag("consent", "default", { analytics_storage: "denied", region: c.regions });
  w.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  c.ids.forEach(function (id) {
    var s = d.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtm.js?id=" + id;
    d.head.appendChild(s);
  });
  w.addEventListener("ss:lead-submitted", function (e) {
    var source = e && e.detail && typeof e.detail.source === "string" ? e.detail.source : "form";
    w.dataLayer.push({ event: "generate_lead", form_location: source });
  }, true);
})(window, document, ${config});`}
    </Script>
  );
}
EOF

LAYOUT=src/app/layout.tsx
if grep -q "<Analytics" "$LAYOUT"; then
  ok "layout already loads analytics"
else
  backup_once "$LAYOUT"
  perl -0pi -e 's#(<body[^>]*>)#$1\n        <Analytics />#' "$LAYOUT"
  perl -0pi -e 's#\A#import { Analytics } from "\@/components/analytics/Analytics";\n#' "$LAYOUT"
  grep -q "<Analytics />" "$LAYOUT" || die "Couldn't add <Analytics /> to $LAYOUT."
  grep -q 'from "@/components/analytics/Analytics"' "$LAYOUT" || die "Couldn't add the Analytics import to $LAYOUT."
  ok "layout loads analytics on every page"
fi

# -----------------------------------------------------------------------------
say "2/4  Security policy: allow Google Tag Manager and Analytics"

backup_once next.config.ts
node <<'NODE'
const fs = require("fs");
const file = "next.config.ts";
let src = fs.readFileSync(file, "utf8");
const add = {
  "script-src": ["https://*.googletagmanager.com"],
  "img-src": ["https://*.google-analytics.com", "https://*.googletagmanager.com"],
  "connect-src": ["https://*.google-analytics.com", "https://*.analytics.google.com", "https://*.googletagmanager.com"],
};
const notes = [];
for (const [dir, sources] of Object.entries(add)) {
  const re = new RegExp(`(["\`])${dir} ([^"\`\\n]*)\\1`);
  const match = src.match(re);
  if (match) {
    if (match[0].includes("${")) throw new Error(`${dir} is built with code; add ${sources.join(" ")} to it by hand`);
    const existing = match[2].split(/\s+/);
    const missing = sources.filter((s) => !existing.includes(s));
    if (missing.length) {
      src = src.replace(re, (all, q, body) => `${q}${dir} ${body} ${missing.join(" ")}${q}`);
      notes.push(`${dir}: added ${missing.join(" ")}`);
    } else {
      notes.push(`${dir}: already allows Google`);
    }
  } else {
    const img = src.match(/^(\s*)(["`])img-src [^\n]*\n/m);
    if (!img) throw new Error(`No ${dir} or img-src directive found in next.config.ts`);
    src = src.replace(img[0], `${img[0]}${img[1]}${img[2]}${dir} 'self' ${sources.join(" ")}${img[2]},\n`);
    notes.push(`${dir}: new directive added`);
  }
}
fs.writeFileSync(file, src);
for (const note of notes) console.log(`    \x1b[32mok\x1b[0m  ${note}`);
NODE
grep -n -E "script-src|connect-src|img-src" next.config.ts | sed 's/^/      /'
grep -E "script-src" next.config.ts | grep -q "unsafe-inline" || warn "script-src has no 'unsafe-inline'; if GTM doesn't load on the live site, tell me"

# -----------------------------------------------------------------------------
say "3/4  Privacy and cookie policies"

backup_once src/content/legal.ts
node <<'NODE'
const fs = require("fs");
const file = "src/content/legal.ts";
let src = fs.readFileSync(file, "utf8");
const edits = [
  [
    `"We don't currently use analytics or advertising cookies. If we add them, we'll update this policy and ask for your consent where required.",`,
    `"We use Google Analytics 4, loaded through Google Tag Manager, to understand how the site is used: which pages are viewed, how visitors found us and whether enquiries are sent. Google Analytics sets cookies on our domain (_ga and _ga_*) and processes information such as your approximate location, device, browser and the pages you visit.",
        "We don't use Google Analytics for advertising, and we don't send it your name, email address or the contents of any enquiry. You can block these cookies in your browser settings, or install Google's Analytics opt-out add-on from tools.google.com/dlpage/gaoptout.",`,
  ],
  [
    "such as hosting, email, spreadsheet and customer-management tools,",
    "such as hosting, email, spreadsheet, analytics and customer-management tools,",
  ],
  [
    `"We don't use advertising cookies, and this website doesn't set third-party cookies. We don't currently use analytics cookies; if we add them, we'll list them here and ask for your consent where required.",`,
    `"We don't use advertising cookies, and we don't sell information collected through cookies. Google Analytics is the only outside service that stores cookies here, and it stores them on our domain.",`,
  ],
  [
    `"Theme preference (browser storage): remembers whether you chose the light or dark theme.",`,
    `"Theme preference (browser storage): remembers whether you chose the light or dark theme.",
        "_ga and _ga_* (Google Analytics cookies, up to two years): tell visits apart so we can count visitors and see which pages are useful. They don't contain your name or contact details.",`,
  ],
];
let changed = 0;
for (const [from, to] of edits) {
  if (src.includes(to.split("\n")[0]) && !src.includes(from)) continue;
  if (!src.includes(from)) throw new Error(`Couldn't find this text in legal.ts: ${from.slice(0, 70)}...`);
  src = src.replace(from, to);
  changed += 1;
}
src = src.replace(/(export const privacyPolicy[\s\S]*?updated: ")[^"]*"/, '$15 November 2026"');
src = src.replace(/(export const cookiePolicy[\s\S]*?updated: ")[^"]*"/, '$15 November 2026"');
fs.writeFileSync(file, src);
console.log(`    \x1b[32mok\x1b[0m  ${changed ? "privacy and cookie policies describe Google Analytics" : "policies already describe Google Analytics"}`);
NODE

append_once docs/OWNER-INPUTS.md "Analytics (GTM / GA4)" <<'EOF'

## Analytics (GTM / GA4)

- GTM containers are listed in `src/content/analytics.ts` and load only on stackandsearch.com.
- GA4 is set up inside GTM (Google tag with the G- Measurement ID) in ONE container only.
- Consent Mode defaults: analytics granted (denied in the EEA, UK and Switzerland), advertising storage denied.
- Enquiries push `generate_lead` (with `form_location`) to the data layer.
- Before adding ad pixels or remarketing, add a cookie consent banner and update the privacy and cookie policies.
- Search Console: Domain property verified with a TXT record at Hostinger.
EOF

# -----------------------------------------------------------------------------
say "4/4  lint -> build -> type-check -> browser checks"
rm -rf .next
npm run lint
npm run build
npm run typecheck

trap - ERR
TESTS_OK=""
if npm run test:ui; then TESTS_OK="yes"; fi

say "Analytics added"
if [ -z "$TESTS_OK" ]; then
  printf '\n  \033[33mSome checks failed.\033[0m Paste everything from "Running" down into the chat.\n'
fi
cat <<'EOF'

  Publish: git add -A && git commit -m "Analytics: GTM with GA4, policies updated" && git push
  Then: Search Console TXT record at Hostinger, and GA4 inside GTM (steps in the chat).

EOF
# END OF SCRIPT