#!/usr/bin/env bash
# =============================================================================
# setup-github.sh - prepare the project for GitHub and make the first commit.
#  1. .gitignore: secrets and local-only folders stay on this Mac.
#  2. README (if still the default) and .env.example placeholders.
#  3. Secret check, then commit on the "main" branch.
# Safe to re-run.
# =============================================================================
set -Eeuo pipefail

say() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok()  { printf '    \033[32mok\033[0m  %s\n' "$*"; }
warn(){ printf '    \033[33mnote\033[0m  %s\n' "$*"; }
die() { printf '\n\033[31mSTOPPED:\033[0m %s\n' "$*" >&2; exit 1; }
trap 'printf "\n\033[31mSTOPPED at line %s.\033[0m Paste the output above into the chat.\n" "$LINENO" >&2' ERR

if ! tail -n 1 "$0" | grep -q "^# END OF SCRIPT$"; then
  die "This script file is incomplete. Copy the whole code block again and re-run the pbpaste command."
fi
if ! grep -q '"name": "stackandsearch"' package.json 2>/dev/null; then die "Run this from the stackandsearch project folder."; fi
command -v git >/dev/null || die "Git isn't installed. Run: xcode-select --install   then run this script again."

read_env() { (grep -E "^$1=" .env.local 2>/dev/null || true) | tail -n 1 | cut -d= -f2- | tr -d "\"' "; }

# -----------------------------------------------------------------------------
say "1/4  Keeping secrets and local files out of GitHub"

touch .gitignore
if grep -q "# Stack & Search: local files" .gitignore; then
  ok ".gitignore already set up"
else
  cat >> .gitignore <<'EOF'

# Stack & Search: local files
.env*
!.env.example
.setup-backup/
/playwright-report/
/test-results/
/blob-report/
/playwright/.cache/
*.tsbuildinfo
next-env.d.ts
EOF
  ok ".gitignore updated"
fi

if [ ! -d .git ]; then
  git init -q -b main
  ok "created a Git repository"
elif git rev-parse -q --verify HEAD >/dev/null; then
  git branch -M main
  ok "Git repository found (branch: main)"
else
  git symbolic-ref HEAD refs/heads/main
  ok "Git repository found (branch: main)"
fi

if [ -e .env.local ]; then
  git check-ignore -q .env.local || die ".env.local isn't ignored by .gitignore; paste this into the chat."
  if git ls-files --error-unmatch .env.local >/dev/null 2>&1; then
    git rm --cached -q .env.local
    ok "stopped tracking .env.local"
  fi
  if [ -n "$(git log --all --format=%h -- .env.local 2>/dev/null | head -n 1)" ]; then
    die ".env.local was committed in the past, so its token is in the history. Paste this into the chat before uploading anything."
  fi
  ok ".env.local stays on this Mac"
fi
if [ -e .env.example ] && git check-ignore -q .env.example; then
  die ".env.example is being ignored; paste this into the chat."
fi
if [ -e .npmrc ] && grep -qi "_auth" .npmrc; then
  die ".npmrc contains a login token; paste this into the chat before uploading."
fi
ok "secrets check passed"

# -----------------------------------------------------------------------------
say "2/4  README and .env.example"

touch .env.example
if grep -q "^LEAD_SHEET_URL=" .env.example; then
  ok ".env.example already lists the sheet settings"
else
  cat >> .env.example <<'EOF'

# Google Sheet that receives enquiries (Apps Script web app URL and its token)
LEAD_SHEET_URL=
LEAD_SHEET_TOKEN=
EOF
  ok ".env.example lists the sheet settings (no values)"
fi

if [ -f README.md ] && ! grep -q "bootstrapped with" README.md; then
  ok "README.md is already custom; left as is"
else
  cat > README.md <<'EOF'
# Stack & Search website

The website for [stackandsearch.com](https://stackandsearch.com), a web design, development and growth studio.

Next.js 16 (App Router, Cache Components), TypeScript and SCSS Modules. All animation is native CSS and browser APIs; there are no UI or animation libraries.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run test:ui` | Browser checks: devices, lead forms, every page, every link and button |
| `npm run test:responsive` | Device layout checks only |
| `npm run inventory` | Rebuild `docs/PAGE-INVENTORY.md` |

## Settings (`.env.local`)

| Variable | Purpose |
| --- | --- |
| `SITE_INDEXING` | `on` at launch. Until then every page is noindex and robots.txt blocks crawlers. |
| `LEAD_SHEET_URL`, `LEAD_SHEET_TOKEN` | Google Sheet (Apps Script web app) that receives enquiries |
| `LEAD_WEBHOOK_URL`, `LEAD_WEBHOOK_SECRET` | Optional extra destination for enquiries (Zapier, a CRM...) |
| `LEAD_DELIVERY=log` | Log enquiries instead of sending them (used by the browser checks) |

`.env.example` lists every setting. Never commit `.env.local`.

## Where things live

- `src/content/`: all page text (services, about, pricing, blog, legal)
- `src/components/`: page templates, hero scenes, lead forms
- `src/styles/`: design tokens, motion and effect mixins
- `docs/PAGE-INVENTORY.md`: every page and its status
- `docs/OWNER-INPUTS.md`: details still needed before launch
EOF
  ok "README.md written"
fi

# -----------------------------------------------------------------------------
say "3/4  First commit"

if [ "$(git config --local user.email 2>/dev/null || true)" = "" ]; then
  git config --local user.name "Stack and Search"
  git config --local user.email "stackandsearchteam@gmail.com"
  ok "commits in this project are by Stack and Search <stackandsearchteam@gmail.com>"
else
  ok "commits in this project are by $(git config user.name) <$(git config user.email)>"
fi

git add -A

TOKEN="$(read_env LEAD_SHEET_TOKEN)"
SHEET_URL="$(read_env LEAD_SHEET_URL)"
for secret in "$TOKEN" "$SHEET_URL"; do
  if [ -n "$secret" ] && git grep --cached -I -F -q -e "$secret"; then
    git reset -q
    die "A file about to be uploaded contains your sheet token or URL. Nothing was committed; paste this into the chat."
  fi
done
ok "no secrets in the files to upload"

if git diff --cached --quiet; then
  ok "nothing new to commit"
else
  git commit -q -m "Stack & Search website: pages, services, lead capture and checks"
  ok "committed $(git ls-files | wc -l | tr -d ' ') files"
fi
git log --oneline -n 3 | sed 's/^/    /'

# -----------------------------------------------------------------------------
say "4/4  Ready to upload"
if git remote get-url origin >/dev/null 2>&1; then
  warn "this project already uploads to: $(git remote get-url origin)"
else
  cat <<'EOF'

  Everything is committed. Now publish it from VS Code:
  Source Control (left sidebar) -> Publish Branch -> private repository.

EOF
fi
# END OF SCRIPT