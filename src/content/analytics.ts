// Google Tag Manager containers. They load only on the live site (never in
// development, the automated checks or Netlify preview links). Set up GA4
// inside GTM with a Google tag (G-XXXXXXXXXX) - in ONE container only, or
// every visit is counted twice.
export const analytics = {
  gtmContainers: ["GTM-TBVFF8R2", "GTM-TLVV89W5"],
  liveHosts: ["stackandsearch.com", "www.stackandsearch.com"],
};
