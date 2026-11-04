"use server";

import { cookies, headers } from "next/headers";
import { ATTRIBUTION_COOKIE, parseAttribution } from "./attribution";
import { deliverLead } from "./deliver";
import { FAILED_LEAD_MESSAGE, SUCCESS_LEAD_STATE, parseLead, type LeadState } from "./schema";

// Server action behind every lead form (footer card, popup and contact page).
export async function submitLead(_previous: LeadState, formData: FormData): Promise<LeadState> {
  const parsed = parseLead(formData);
  if (parsed.kind === "invalid") return parsed.state;
  if (parsed.kind === "bot") return SUCCESS_LEAD_STATE;

  const page = (await headers()).get("referer") ?? "";
  const attribution = parseAttribution((await cookies()).get(ATTRIBUTION_COOKIE)?.value);
  try {
    await deliverLead({ ...parsed.lead, page, attribution, submittedAt: new Date().toISOString() });
  } catch (error) {
    console.error("[lead] delivery failed:", error);
    return { status: "error", message: FAILED_LEAD_MESSAGE, errors: {}, values: parsed.lead };
  }

  return SUCCESS_LEAD_STATE;
}
