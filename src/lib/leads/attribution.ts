// Marketing attribution for leads: which campaign, search engine, social
// network, AI assistant or website brought the visitor. Recorded in the
// browser (AttributionTracker), read by the server when a form is sent.

export const ATTRIBUTION_COOKIE = "ss_attr";
export const ATTRIBUTION_MAX_AGE = 60 * 60 * 24 * 180; // 180 days

export interface Touch {
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
  gclid: string;
  fbclid: string;
  referrer: string;
  landingPage: string;
}

export interface Attribution {
  first: Touch | null;
  last: Touch | null;
}

const clip = (value: unknown, max = 200) => (typeof value === "string" ? value.trim().slice(0, max) : "");

// [referring host, source, medium]; the first match wins.
const RULES: [RegExp, string, string][] = [
  [/(^|\.)(chatgpt\.com|chat\.openai\.com)$/, "chatgpt", "ai"],
  [/(^|\.)perplexity\.ai$/, "perplexity", "ai"],
  [/(^|\.)gemini\.google\.com$/, "gemini", "ai"],
  [/(^|\.)copilot\.microsoft\.com$/, "copilot", "ai"],
  [/(^|\.)claude\.ai$/, "claude", "ai"],
  [/(^|\.)mail\.google\.com$/, "gmail", "email"],
  [/(^|\.)outlook\.(live|office|office365)\.com$/, "outlook", "email"],
  [/^(www\.)?google\.[a-z.]+$/, "google", "organic"],
  [/(^|\.)bing\.com$/, "bing", "organic"],
  [/(^|\.)search\.yahoo\.com$/, "yahoo", "organic"],
  [/(^|\.)duckduckgo\.com$/, "duckduckgo", "organic"],
  [/(^|\.)yandex\.[a-z.]+$/, "yandex", "organic"],
  [/(^|\.)ecosia\.org$/, "ecosia", "organic"],
  [/(^|\.)baidu\.com$/, "baidu", "organic"],
  [/(^|\.)(facebook\.com|fb\.com|fb\.me)$/, "facebook", "social"],
  [/(^|\.)instagram\.com$/, "instagram", "social"],
  [/(^|\.)(linkedin\.com|lnkd\.in)$/, "linkedin", "social"],
  [/(^|\.)(x\.com|twitter\.com|t\.co)$/, "x", "social"],
  [/(^|\.)(youtube\.com|youtu\.be)$/, "youtube", "social"],
  [/(^|\.)threads\.(net|com)$/, "threads", "social"],
  [/(^|\.)pinterest\.[a-z.]+$/, "pinterest", "social"],
  [/(^|\.)reddit\.com$/, "reddit", "social"],
  [/(^|\.)(whatsapp\.com|wa\.me)$/, "whatsapp", "social"],
  [/(^|\.)quora\.com$/, "quora", "social"],
];

function toUrl(value: string) {
  try {
    return value ? new URL(value) : null;
  } catch {
    return null;
  }
}

function classify(host: string): [string, string] {
  const rule = RULES.find(([pattern]) => pattern.test(host));
  return rule ? [rule[1], rule[2]] : [host.replace(/^www\./, ""), "referral"];
}

// The touch for a page load, or null when the visit is direct or internal.
export function touchFromVisit(href: string, referrer: string, ownHost: string): Touch | null {
  const url = toUrl(href);
  if (!url) return null;
  const params = url.searchParams;
  const ref = toUrl(referrer);
  const refHost = ref && ref.hostname !== ownHost ? ref.hostname : "";

  const base = {
    campaign: clip(params.get("utm_campaign"), 150),
    term: clip(params.get("utm_term"), 150),
    content: clip(params.get("utm_content"), 150),
    gclid: clip(params.get("gclid") ?? params.get("gbraid") ?? params.get("wbraid")),
    fbclid: clip(params.get("fbclid")),
    referrer: ref && refHost ? clip(ref.href, 300) : "",
    landingPage: clip(url.origin + url.pathname + url.search, 300),
  };

  const utmSource = clip(params.get("utm_source"), 100);
  if (utmSource) return { ...base, source: utmSource, medium: clip(params.get("utm_medium"), 100) || "(not set)" };
  if (base.gclid) return { ...base, source: "google", medium: "cpc" };
  if (params.get("msclkid")) return { ...base, source: "bing", medium: "cpc" };
  if (refHost) {
    const [source, medium] = classify(refHost);
    return { ...base, source, medium };
  }
  if (base.fbclid) return { ...base, source: "facebook", medium: "social" };
  return null;
}

export function directTouch(href: string): Touch {
  const url = toUrl(href);
  return {
    source: "(direct)",
    medium: "(none)",
    campaign: "",
    term: "",
    content: "",
    gclid: "",
    fbclid: "",
    referrer: "",
    landingPage: url ? clip(url.origin + url.pathname + url.search, 300) : "",
  };
}

function parseTouch(value: unknown): Touch | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;
  const touch: Touch = {
    source: clip(raw.source, 100),
    medium: clip(raw.medium, 100),
    campaign: clip(raw.campaign, 150),
    term: clip(raw.term, 150),
    content: clip(raw.content, 150),
    gclid: clip(raw.gclid),
    fbclid: clip(raw.fbclid),
    referrer: clip(raw.referrer, 300),
    landingPage: clip(raw.landingPage, 300),
  };
  return touch.source ? touch : null;
}

// Reads the cookie value; anything malformed counts as "no attribution".
export function parseAttribution(value: string | null | undefined): Attribution {
  if (value) {
    const candidates = [value];
    try {
      candidates.push(decodeURIComponent(value));
    } catch {
      // not URI-encoded
    }
    for (const candidate of candidates) {
      try {
        const data = JSON.parse(candidate);
        return { first: parseTouch(data?.first), last: parseTouch(data?.last) };
      } catch {
        // try the next form
      }
    }
  }
  return { first: null, last: null };
}

export function serializeAttribution(attribution: Attribution) {
  return encodeURIComponent(JSON.stringify(attribution));
}
