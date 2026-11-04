import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("E-commerce development");

// E-commerce development (/ecommerce-development/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="E-commerce development" />;
}
