import { SocialLinks } from "@/components/company/SocialLinks";
import { LeadForm } from "@/components/lead/LeadForm";
import { PageMain } from "@/components/page/PageMain";
import { JsonLd } from "@/components/seo/JsonLd";
import { company, socialUrls } from "@/content/company";
import { contact } from "@/content/contact";
import { breadcrumbSchema, graph, organizationSchema, webPageSchema } from "@/lib/seo/structured-data";
import { PageHeader } from "./PageHeader";
import styles from "./Pages.module.scss";

const PATH = "/contact/";

export function ContactPage() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Contact" }];

  return (
    <PageMain>
      <JsonLd
        data={graph([
          breadcrumbSchema(crumbs, PATH),
          webPageSchema("ContactPage", { name: contact.seo.title, description: contact.seo.description, path: PATH }),
          organizationSchema({ email: company.email, sameAs: socialUrls() }),
        ])}
      />

      <PageHeader crumbs={crumbs} eyebrow="Contact" title={contact.title} lead={contact.lead} />

      <section className={styles.sectionTight} aria-label="Contact options and enquiry form">
        <div className={`container ${styles.contactLayout}`}>
          <div className={styles.contactAside}>
            <div className={styles.panel} data-fx-reveal="" data-fx-spot="">
              <p className={styles.kicker}>Email</p>
              <a href={`mailto:${company.email}`} className={styles.emailLink}>
                {company.email}
              </a>
              <p className={styles.muted}>Prefer email? Write to us directly, and include your website address if you have one.</p>
            </div>
            <div className={styles.panel} data-fx-reveal="" data-fx-spot="">
              <p className={styles.kicker}>What happens next</p>
              <ol className={styles.miniSteps}>
                {contact.steps.map((step) => (
                  <li key={step.title}>
                    <div>
                      <strong>{step.title}</strong>
                      <span>{step.text}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className={styles.panel} data-fx-reveal="" data-fx-spot="">
              <p className={styles.kicker}>Follow us</p>
              <SocialLinks />
            </div>
          </div>
          <div className={styles.formCard} data-fx-reveal="">
            <h2 className={styles.formTitle}>Request your free audit</h2>
            <LeadForm source="contact" />
          </div>
        </div>
      </section>
    </PageMain>
  );
}
