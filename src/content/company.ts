export type SocialPlatform = "instagram" | "facebook" | "x" | "linkedin";

export interface SocialProfile {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export const company = {
  email: "hello@stackandsearch.com",
  // Paste each profile's full URL once the account exists. Until then the
  // icon shows as "coming soon" without a link.
  socials: [
    { platform: "instagram", label: "Instagram", href: "" },
    { platform: "facebook", label: "Facebook", href: "" },
    { platform: "x", label: "X", href: "" },
    { platform: "linkedin", label: "LinkedIn", href: "" },
  ] as SocialProfile[],
};

export const socialUrls = () => company.socials.map((profile) => profile.href).filter(Boolean);
