import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("Social media management");

// Social media management (/social-media-management/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="Social media management" />;
}
