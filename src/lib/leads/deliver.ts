import type { Attribution } from "./attribution";
import type { LeadSubmission } from "./schema";

export interface LeadDelivery extends LeadSubmission {
  page: string;
  submittedAt: string;
  attribution: Attribution;
}

const FORM_NAMES: Record<string, string> = {
  footer: "Footer form",
  popup: "Pop-up form",
  contact: "Contact page",
};

// Leads go to the Google Sheet (LEAD_SHEET_URL + LEAD_SHEET_TOKEN) and/or a
// JSON webhook (LEAD_WEBHOOK_URL: Zapier, Make, a CRM...). With neither set,
// development prints the lead to the server log and production refuses, so a
// lead is never silently lost. LEAD_DELIVERY=log (used by the automated
// checks) and @example.com addresses are only ever logged.
export async function deliverLead(lead: LeadDelivery): Promise<void> {
  const sheetUrl = process.env.LEAD_SHEET_URL;
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  const logOnly = process.env.LEAD_DELIVERY === "log" || /@example\.(com|org|net)$/i.test(lead.email);

  if (logOnly || (!sheetUrl && !webhookUrl)) {
    if (logOnly || process.env.NODE_ENV !== "production") {
      console.info(`[lead] ${lead.source} lead (logged only):\n${JSON.stringify(lead, null, 2)}`);
      return;
    }
    throw new Error("No lead destination: set LEAD_SHEET_URL or LEAD_WEBHOOK_URL");
  }

  const deliveries: Promise<void>[] = [];
  if (sheetUrl) deliveries.push(sendToSheet(sheetUrl, lead));
  if (webhookUrl) deliveries.push(sendToWebhook(webhookUrl, lead));

  const results = await Promise.allSettled(deliveries);
  const failures = results.filter((result): result is PromiseRejectedResult => result.status === "rejected");
  for (const failure of failures) console.error("[lead] a delivery failed:", failure.reason);
  if (failures.length === results.length) throw new Error("Every lead delivery failed");
}

// One row for the sheet; keys match the Apps Script COLUMNS list.
function sheetRow(lead: LeadDelivery) {
  const { first, last } = lead.attribution;
  return {
    submittedAt: lead.submittedAt,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    website: lead.website,
    services: lead.services.join(", "),
    message: lead.message,
    form: FORM_NAMES[lead.source] ?? lead.source,
    pageUrl: lead.page,
    landingPage: last?.landingPage ?? "",
    referrer: last?.referrer ?? "",
    utmSource: last?.source ?? "(not set)",
    utmMedium: last?.medium ?? "(not set)",
    utmCampaign: last?.campaign ?? "",
    utmTerm: last?.term ?? "",
    utmContent: last?.content ?? "",
    firstSource: first?.source ?? "",
    firstMedium: first?.medium ?? "",
    gclid: last?.gclid ?? "",
    fbclid: last?.fbclid ?? "",
  };
}

async function sendToSheet(url: string, lead: LeadDelivery) {
  const token = process.env.LEAD_SHEET_TOKEN;
  if (!token) throw new Error("LEAD_SHEET_TOKEN is not set");

  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token, ...sheetRow(lead) }),
    cache: "no-store",
    redirect: "follow",
    signal: AbortSignal.timeout(15_000),
  });
  const reply = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!response.ok || !reply?.ok) {
    throw new Error(`Google Sheet did not accept the lead (${reply?.error ?? `status ${response.status}`})`);
  }
}

async function sendToWebhook(url: string, lead: LeadDelivery) {
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", ...(secret ? { "x-lead-secret": secret } : {}) },
    body: JSON.stringify(lead),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Lead webhook responded with ${response.status}`);
}
