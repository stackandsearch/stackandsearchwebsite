import type { CSSProperties } from "react";
import { NavLink } from "@/components/layout/NavLink";
import { LayersIcon, ServiceIcon } from "@/components/ui/duotone-icons";
import { Laptop3D } from "@/components/visuals/Laptop3D";
import { buildLayers } from "@/content/home/layers";
import { storyCards } from "@/content/home/story";
import { StoryScroll } from "./StoryScroll";
import styles from "./BuildShowcase.module.scss";

// Scroll storyboard: the laptop starts closed, opens as you scroll (the four
// layer chips light up as the screen builds), six cards fly out, then the
// services fill into them. All text is server-rendered and readable without
// JavaScript; the laptop is decorative.
export function BuildShowcase() {
  return (
    <section id="how-we-build" className={styles.section} aria-labelledby="story-title">
      <StoryScroll className={styles.track}>
        <div className={styles.sticky} data-story-sticky="">
          <div className={`container ${styles.frame}`}>
            <header className={styles.header}>
              <h2 id="story-title">Every site we ship is built in four layers</h2>
              <div className={styles.captions}>
                <p className={styles.captionA}>
                  Architecture, interface, content and search-readiness, each with deliverables you can check.
                </p>
                <p className={styles.captionB}>Then we help it grow with six services.</p>
              </div>
              <ul className={styles.layers} aria-label="The four layers">
                {buildLayers.map((layer) => (
                  <li key={layer.id} className={styles.layerChip}>
                    <LayersIcon />
                    {layer.name}
                  </li>
                ))}
              </ul>
            </header>

            <div className={styles.scene}>
              {storyCards.map((card, index) => (
                <article key={card.item.href} className={styles.card} data-story-card="" style={{ "--i": index } as CSSProperties}>
                  <div className={styles.skeleton} aria-hidden="true">
                    <span className={styles.skeletonIcon} />
                    <span className={styles.skeletonLine} />
                    <span className={`${styles.skeletonLine} ${styles.skeletonShort}`} />
                  </div>
                  <div className={styles.content}>
                    <span className={styles.icon}>
                      <ServiceIcon href={card.iconHref} />
                    </span>
                    <h3 className={styles.cardTitle}>
                      <NavLink item={card.item} className={styles.cardLink} />
                    </h3>
                    <p className={styles.cardText}>{card.summary}</p>
                  </div>
                </article>
              ))}

              <div className={styles.deviceWrap}>
                <div className={styles.perspective}>
                  <Laptop3D variant="story" />
                </div>
                <div className={styles.shadow} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </StoryScroll>
    </section>
  );
}
