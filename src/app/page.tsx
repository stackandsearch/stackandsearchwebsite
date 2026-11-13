import type { Metadata } from "next";
import { BuildShowcase } from "@/components/sections/home/BuildShowcase";
import { DevelopmentFirst } from "@/components/sections/home/DevelopmentFirst";
import { Hero } from "@/components/sections/home/Hero";
import { Packages } from "@/components/sections/home/Packages";
import { Process } from "@/components/sections/home/Process";
import { ServicesOverview } from "@/components/sections/home/ServicesOverview";
import { JsonLd } from "@/components/seo/JsonLd";
import { BrandField } from "@/components/visuals/BrandField";
import { OrbitField } from "@/components/visuals/OrbitField";
import { ScrollMarquee } from "@/components/visuals/ScrollMarquee";
import { company, socialUrls } from "@/content/company";
import { site } from "@/content/site";
import { graph, organizationSchema } from "@/lib/seo/structured-data";
import { SITE_ORIGIN } from "@/lib/seo/urls";
import styles from "./page.module.scss";

// Homepage. BrandField is the animated background behind every section; each
// .scene wrapper lets decorative vector art sit behind a section's content.
export const metadata: Metadata = {
  title: { absolute: "Stack & Search: web design and development agency" },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className={styles.home}>
      <JsonLd
        data={graph([
          organizationSchema({ email: company.email, sameAs: socialUrls() }),
          { "@type": "WebSite", "@id": `${SITE_ORIGIN}/#website`, url: `${SITE_ORIGIN}/`, name: site.name, alternateName: site.alternateName },
        ])}
      />
      <BrandField anchorId="hero-title" />
      <Hero />
      <ScrollMarquee />
      <div className={styles.scene}>
        <OrbitField className={styles.orbitShowcase} />
        <BuildShowcase />
      </div>
      <DevelopmentFirst />
      <div className={styles.scene}>
        <OrbitField className={styles.orbitServices} />
        <ServicesOverview />
      </div>
      <Process />
      <div className={styles.scene}>
        <OrbitField className={styles.orbitPackages} />
        <Packages />
      </div>
    </div>
  );
}
