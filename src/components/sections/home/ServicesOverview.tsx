import { NavLink } from "@/components/layout/NavLink";
import { Reveal } from "@/components/motion/Reveal";
import { CheckCircleIcon, ClockIcon, ServiceIcon } from "@/components/ui/duotone-icons";
import { serviceHighlights } from "@/content/home/services";
import { serviceGroups } from "@/content/navigation";
import styles from "./ServicesOverview.module.scss";

// The seven primary services in the plan's funnel order. Each card is fully
// clickable (the title link stretches over it) and tilts toward a mouse.
export function ServicesOverview() {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <div className="container">
        <Reveal as="header" className={styles.header}>
          <h2 id="services-title">Services that grow with your website</h2>
          <p>
            Start with the build, keep it in shape, then help it grow. Every service has its own page with scope,
            deliverables and honest timelines.
          </p>
        </Reveal>

        <div className={styles.groups}>
          {serviceGroups.map((group) => (
            <div key={group.id} className={styles.group} data-group={group.id}>
              <Reveal className={styles.groupHead}>
                <p id={`home-${group.id}`} className={styles.groupLabel}>
                  {group.label}
                </p>
                <p className={styles.groupIntro}>{group.intro}</p>
              </Reveal>

              <ul className={styles.cards} aria-labelledby={`home-${group.id}`}>
                {group.items.map((item, index) => {
                  const highlight = serviceHighlights[item.href];
                  return (
                    <Reveal as="li" key={item.href} delay={index * 70} className={styles.cardItem}>
                      <article className={styles.card} data-tilt="">
                        <span className={styles.icon}>
                          <ServiceIcon href={item.href} />
                        </span>
                        <h3 className={styles.title}>
                          <NavLink item={item} className={styles.link} />
                        </h3>
                        <p className={styles.summary}>{item.summary}</p>
                        {highlight?.includes ? (
                          <ul className={styles.includes}>
                            {highlight.includes.map((included) => (
                              <li key={included}>
                                <CheckCircleIcon className={styles.includeIcon} />
                                {included}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {highlight ? (
                          <p className={styles.timeline}>
                            <ClockIcon className={styles.timelineIcon} />
                            Typical timeline: {highlight.timeline}
                          </p>
                        ) : null}
                      </article>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
