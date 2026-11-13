# Site review: what to improve (November 2026)

A review of every page type on the `feature/rebrand-pricing-fixes` branch: homepage, services hub, the 22 service pages, pricing, work, about, contact, blog list, blog article, legal pages and the 404 page, in both themes, at phone and desktop widths.

Not checked: the live Netlify deployment (it could not be reached from the review environment), Lighthouse scores, and a screen-reader pass.

## Fixed on this branch

| Problem | Fix |
|---|---|
| A blog post published after the last deploy did not open when its address was loaded directly | Blog routes now render the whole page before sending it; a post missing from the cached list is looked up on its own |
| The same post showed "Page not found" as its title and `noindex` for several minutes | Title and article now read the same data |
| Google Tag Manager was blocked by the site's own security policy | Each policy directive is written once (browsers ignore repeats) |
| `generate_lead` always reported `form_location: "form"` | The form now sends footer, popup or contact |
| The homepage ended with a "More of the homepage is on its way" notice | Removed |
| No sharing image on any page; no logo in structured data; no structured data on the homepage | Added a default 1200x630 image, the logo, and Organization and WebSite data |
| Closing the lead popup and reloading at once could bring it back | The dismissal is saved on click as well as on close |

## High priority

1. **Proof.** The work page has one project, there are no testimonials, the about page has no team, and all four social links are empty. A visitor has little reason to trust the claims yet. Add real projects, named people with photos, and client quotes with permission.
2. **Ways to get in touch.** The site offers an email address and a form. "Book a call" leads to the contact page, not a booking tool. Add a phone or WhatsApp number, a booking link, and the business address and legal name.
3. **Local search.** Without an address there is no Google Business Profile and no LocalBusiness structured data, which the Local SEO service itself recommends to clients.
4. **One name.** The logo reads "StackandSearch"; page titles, the footer and structured data say "Stack & Search". Pick one and use it everywhere (`src/content/site.ts`).
5. **Legal and consent.** The privacy, terms and cookie pages are drafts and need a lawyer's review. Visitors in the EEA, UK and Switzerland start with analytics denied and there is no banner to accept, so they are never counted. Two GTM containers are loaded; if both hold a GA4 tag every visit is counted twice.
6. **Check the blog fix on Netlify.** The fix was reproduced and tested with `next start`. After the first deploy of this branch, publish a test post and open its address directly. Also pin `@netlify/plugin-nextjs` to a version in `package.json` so builds do not change underneath you.
7. **Confirm the prices.** See `docs/PRICING-RESEARCH.md`.

## Medium priority

8. **Menu links never prefetch.** All 49 links in `navigation.ts` and `footer.ts` are still marked `planned`, which switches prefetching off. Mark them `published` for faster page changes.
9. **Services hub layout.** "Build" and "Run" each show one card beside a wide empty space, with the other services as small pills. Show the sub-services as cards, with their starting prices.
10. **Blog.** Articles have no author or author bio, there is no RSS feed, no category pages and no search. Article images are plain `<img>` tags without responsive sizes. Article HTML from WordPress is shown unsanitised, which is safe only while you alone control that WordPress site.
11. **Homepage.** There is no FAQ (the service pages have one, with structured data) and no proof near the top. Add both once item 1 is done.
12. **Lead handling.** The only spam defence is a hidden field. Add rate limiting or a challenge, an automatic reply to the person who enquired, and a thank-you page so conversions can be tracked in ads.
13. **Sitemap.** Static pages carry no last-modified date. Add one.
14. **Tests.** `tests/e2e/phase1.spec.ts` and `tests/smoke/smoke.test.mjs` still expect the first placeholder homepage and fail, so `npm run verify` fails. `npm run test:ui` is the suite that reflects the site. Update or remove the old tests.
15. **Leftovers.** `scripts/*.sh` (about 3,000 lines of one-off setup scripts) and `docs/wordpress-import.xml` are no longer used.

## Lower priority

16. **Performance on cheap phones.** The hero stacks blurred gradients, a 3D laptop and now a canvas. Measure on a mid-range Android phone; if it drops frames, switch the canvas off below tablet width or when the browser reports data-saver mode.
17. **Pricing page.** Add a side-by-side comparison of the three website packages. If you sell outside India, show a second currency.
18. **City pages.** Service titles say "in India". Pages for the cities you serve would compete for local searches.
19. **Tracking.** Record clicks on the email link, the hero button and (once added) WhatsApp as events.
20. **Accessibility.** Colour contrast was calculated for the new palette and passes AA for text. Run an automated checker and a screen-reader pass before launch.
