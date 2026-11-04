import { Reveal } from "@/components/motion/Reveal";
import { processSteps } from "@/content/home/process";
import styles from "./Process.module.scss";

// A real sequence, so numbered. The gradient line draws itself once the
// track scrolls into view (left to right on desktop, top to bottom on phones).
export function Process() {
  return (
    <section id="process" className={styles.section} aria-labelledby="process-title">
      <div className="container">
        <Reveal as="header" className={styles.header}>
          <h2 id="process-title">How a project runs</h2>
          <p>Five clear stages, each with something you can see, check and approve.</p>
        </Reveal>

        <Reveal variant="fade" className={styles.track}>
          <span className={styles.line} aria-hidden="true" />
          <ol className={styles.steps}>
            {processSteps.map((step, index) => (
              <Reveal as="li" key={step.title} delay={200 + index * 120} className={styles.step}>
                <span className={styles.node} aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
