import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("Shopify development");

// Shopify development (/shopify-development/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="Shopify development" />;
}
