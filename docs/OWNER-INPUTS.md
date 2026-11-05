# Owner inputs

Facts the site needs from the business. Nothing here may be invented.

## Before Phase 2
- [ ] Logo, or approval of an interim wordmark
- [ ] Approval of palette and fonts (Bricolage Grotesque + Instrument Sans)
- [ ] Copy locale: en-IN, en-GB or en-US spelling
- [ ] Canonical host: stackandsearch.com (recommended) or www

## Before Phase 3
- [ ] Hero copy approval
- [ ] Any real past projects (for "View our work")
- [ ] What the free website audit includes, and its turnaround
- [ ] Booking tool and call length for "Book a call"
- [ ] Your real delivery process steps

## Before Phase 4
- [ ] Target countries and cities
- [ ] Sub-services you can deliver today
- [ ] SEO minimum term and notice period; maintenance SLA; reporting cadence
- [ ] AI crawler policy (search bots vs training bots)
- [ ] Go-ahead for keyword validation

## Before Phase 5
- [ ] Team names, bios, photos, credentials
- [ ] Real case studies and testimonials, with permission
- [ ] Certifications actually held
- [ ] Prices, or "quote only"
- [ ] Email, phone, WhatsApp, address, hours; legal entity name
- [ ] Privacy, terms and cookie text reviewed by a qualified professional
- [ ] Form delivery destination; consent jurisdictions

## Before Phase 7
- [ ] Hosting choice and DNS access
- [ ] Search Console, GA4, GTM and Clarity accounts
- [ ] SPF, DKIM and DMARC for branded email
- [ ] Social profile URLs; Google Business Profile eligibility

## Lead form delivery (Phase 3 part 12)

- The footer form and the popup send each lead as JSON to `LEAD_WEBHOOK_URL`.
- Decide where leads go: a Google Sheet (Apps Script web app), Zapier/Make, a CRM, or Slack.
- Until it is set, development prints leads in the terminal; the live site shows an error rather than losing leads.
- Confirm: who receives leads, any reply-time promise, the consent wording and the privacy policy text.
- Popup: opens after a visitor scrolls past two sections; closing hides it for that browser session; a submission hides it for good on that device.

## Service page claims to confirm (Phase 4)

Each service page states typical timelines and ways of working. Confirm or edit them in `src/content/services/`:

- Timelines: website 4–8 weeks; ads 2–4 weeks; social 2–3 months; SEO, AEO and GEO 4–6+ months; local SEO 2–4 months
- Ownership: clients own code, domain, ad accounts, profiles and data
- Pricing models: fixed-fee projects; monthly retainers (SEO with a minimum term); ad budgets paid directly to Google or Meta
- Technical SEO and speed work is done in code by the team (developer-led)
- No guarantees of rankings, leads or AI mentions; no bought reviews or links

## Company pages (Phase 4 part D)

- Social profiles: paste each URL into `src/content/company.ts` when the account exists; icons become links automatically.
- Work page: confirm the Echobyte Global details in `src/content/work.ts` (our role, "Built with: Next.js"). Add results only if they can be verified and the client agrees.
- About page has no team section yet. Send names, roles and photos when ready.
- Privacy policy and terms (`src/content/legal.ts`) are plain-English drafts that match how the site works today. Have them reviewed by a lawyer before launch, and add the legal entity name, address and governing law.
- When analytics (GA4 or GTM) is added, update the privacy policy's Analytics section and add consent where required.
- robots.txt stays closed until `SITE_INDEXING=on`. Decide the AI crawler policy before launch.

## Lead sheet (Google Sheets)

- Enquiries go to the "Stackandsearch Leads" sheet through its Apps Script web app.
- At launch, add `LEAD_SHEET_URL` and `LEAD_SHEET_TOKEN` to the hosting provider's environment variables (same values as `.env.local`).
- If the Apps Script code is edited, publish it again: Deploy -> Manage deployments -> edit -> Version: New version. The URL stays the same.
- Automated checks run with `LEAD_DELIVERY=log` and never write to the sheet.

## Cookie policy (`src/content/legal.ts`)

- Lists every cookie and browser storage item the site uses today. Review it with the privacy policy before launch.
- Update it whenever analytics, chat widgets, embeds or ad pixels are added.

## Blog (WordPress.com)

- Posts are written on the WordPress.com site in `src/content/blog/source.ts` and appear on stackandsearch.com/blog/ within about 15 minutes. No deploy needed.
- The post's slug becomes its address: /blog/<slug>/. Don't change slugs after publishing.
- The excerpt is the meta description (aim for 120 to 155 characters).
- Tags show as labels; tags matching a service ("SEO", "AEO", "GEO", "Paid ads"...) add related-service links.
- The featured image shows on the blog list and at the top of the article.
- Keep the WordPress.com site set to "Discourage search engines" so only stackandsearch.com is indexed.
- blog.stackandsearch.com redirects to /blog/ (Netlify domain alias + CNAME `blog` at Hostinger).
