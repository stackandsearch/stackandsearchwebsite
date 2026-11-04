import type { Metadata } from "next";
import { NotFoundPage } from "@/components/notfound/NotFoundPage";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

// Every unknown URL: a real 404 status with a page that helps visitors on.
export default function NotFound() {
  return <NotFoundPage />;
}
