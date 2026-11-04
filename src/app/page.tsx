import type { Metadata } from "next";
import { BuildShowcase } from "@/components/sections/home/BuildShowcase";
import { DevelopmentFirst } from "@/components/sections/home/DevelopmentFirst";
import { Hero } from "@/components/sections/home/Hero";
import { Packages } from "@/components/sections/home/Packages";
import { Process } from "@/components/sections/home/Process";
import { ServicesOverview } from "@/components/sections/home/ServicesOverview";
import { OrbitField } from "@/components/visuals/OrbitField";
import { ScrollMarquee } from "@/components/visuals/ScrollMarquee";
import styles from "./page.module.scss";

// Homepage under construction (Phase 3). Part 8 adds the final sections;
// the site is noindex until launch. Each .scene wrapper lets decorative
// vector art sit behind a section's content.
export const metadata: Metadata = {
  title: { absolute: "Stack & Search: web design and development agency" },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
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
      <section className={styles.upcoming} aria-labelledby="upcoming-title">
        <div className="container">
          <h2 id="upcoming-title">More of the homepage is on its way</h2>
          <p>
            Build progress note: service illustrations, honest SEO, AEO and GEO expectations, the FAQ and the
            closing call to action are added in the next setup parts.
          </p>
        </div>
      </section>
    </>
  );
}
