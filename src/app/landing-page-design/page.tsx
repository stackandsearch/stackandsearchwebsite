import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("Landing page design");

// Landing page design (/landing-page-design/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="Landing page design" />;
}
