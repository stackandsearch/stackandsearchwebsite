import { serviceGroups } from "@/content/navigation";

// Lead form: shared types, validation and constants, used by the client
// form and the server action.

export const LEAD_SUBMITTED_KEY = "ss-lead-submitted";
export const LEAD_SUBMITTED_EVENT = "ss:lead-submitted";

export const LEAD_SERVICES = serviceGroups.flatMap((group) =>
  group.items.map((item) => ({ label: item.label, href: item.href })),
);
const SERVICE_LABELS = new Set(LEAD_SERVICES.map((service) => service.label));

export interface LeadValues {
  name: string;
  email: string;
  phone: string;
  website: string;
  services: string[];
  message: string;
  consent: boolean;
}

export type LeadField = keyof LeadValues;

export interface LeadState {
  status: "idle" | "error" | "success";
  message: string;
  errors: Partial<Record<LeadField, string>>;
  values: LeadValues;
}

export interface LeadSubmission extends LeadValues {
  source: string;
}

export const EMPTY_LEAD_VALUES: LeadValues = {
  name: "",
  email: "",
  phone: "",
  website: "",
  services: [],
  message: "",
  consent: false,
};

export const INITIAL_LEAD_STATE: LeadState = {
  status: "idle",
  message: "",
  errors: {},
  values: EMPTY_LEAD_VALUES,
};

export const SUCCESS_LEAD_STATE: LeadState = {
  status: "success",
  message: "We'll look it over and reply by email with the next steps.",
  errors: {},
  values: EMPTY_LEAD_VALUES,
};

export const FAILED_LEAD_MESSAGE = "Sorry, we couldn't send your request just now. Please try again in a few minutes.";

export type ParsedLead =
  | { kind: "valid"; lead: LeadSubmission }
  | { kind: "invalid"; state: LeadState }
  | { kind: "bot" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s().-]{7,20}$/;

function field(data: FormData, key: string, max: number) {
  const value = data.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function isWebsite(value: string) {
  if (/\s/.test(value)) return false;
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
}

export function parseLead(data: FormData): ParsedLead {
  // Hidden "fax" field: people never see it, bots fill it in.
  if (field(data, "fax", 200)) return { kind: "bot" };

  const values: LeadValues = {
    name: field(data, "name", 200),
    email: field(data, "email", 320),
    phone: field(data, "phone", 40),
    website: field(data, "website", 300),
    services: data
      .getAll("services")
      .filter((value): value is string => typeof value === "string" && SERVICE_LABELS.has(value)),
    message: field(data, "message", 3000),
    consent: data.get("consent") === "yes",
  };

  const errors: LeadState["errors"] = {};
  if (values.name.length < 2 || values.name.length > 80) errors.name = "Please enter your name.";
  if (values.email.length > 254 || !EMAIL.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.phone && (!PHONE.test(values.phone) || values.phone.replace(/\D/g, "").length < 7)) {
    errors.phone = "Please enter a valid phone or WhatsApp number, or leave it blank.";
  }
  if (values.website && !isWebsite(values.website)) {
    errors.website = "Please enter a valid website address, or leave it blank.";
  }
  if (values.message.length > 1500) errors.message = "Please keep your message under 1,500 characters.";
  if (!values.consent) errors.consent = "Please agree so we can contact you about your request.";

  if (Object.keys(errors).length > 0) {
    return {
      kind: "invalid",
      state: { status: "error", message: "Please check the highlighted fields.", errors, values },
    };
  }

  return { kind: "valid", lead: { ...values, source: field(data, "source", 40) || "unknown" } };
}
