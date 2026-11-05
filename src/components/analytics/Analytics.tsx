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
