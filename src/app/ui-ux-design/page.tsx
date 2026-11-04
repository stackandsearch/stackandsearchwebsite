import { ServiceRoute, serviceMetadata } from "@/components/service/service-route";

export const metadata = serviceMetadata("UI/UX design");

// UI/UX design (/ui-ux-design/). Content: src/content/services/.
export default function Page() {
  return <ServiceRoute label="UI/UX design" />;
}
