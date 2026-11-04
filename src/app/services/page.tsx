import type { Metadata } from "next";
import { ServicesHub } from "@/components/service/ServicesHub";
import { servicesHub } from "@/content/services/hub";
import { pageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: servicesHub.seo.title,
  description: servicesHub.seo.description,
  path: "/services/",
});

export default function ServicesPage() {
  return <ServicesHub />;
}
