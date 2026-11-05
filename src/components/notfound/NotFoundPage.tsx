import Link from "next/link";
import { PageMain } from "@/components/page/PageMain";
import { primaryNav } from "@/content/navigation";
import { linkForLabel, resolvedServices } from "@/content/services";
import { getWpPosts } from "@/lib/wordpress";
import { NotFoundScene } from "./NotFoundScene";
import { NotFoundSearch, type SearchItem } from "./NotFoundSearch";
import styles from "./NotFound.module.scss";

const PAGE_HINTS: Record<string, string> = {
  Work: "Case studies, portfolio and projects",
  Pricing: "Prices, quotes, packages and cost",
  About: "Who we are and how we work",
  Blog: "Articles and guides",
  Contact: "Email, enquiry, free audit, book a call",
};

const POPULAR = ["/services/", "/website-development/", "/seo-services/", "/pricing/", "/case-studies/", "/contact/"];

// Every page a lost visitor might want, for the search box.
async function searchIndex(): Promise<SearchItem[]> {
  const posts = await getWpPosts();
  const items: SearchItem[] = [
    { label: "Home", href: "/", group: "Page" },
    { label: "All services", href: "/services/", group: "Page", hint: "Everything we build, run and grow" },
    ...primaryNav.map((link) => ({ label: link.label, href: link.href, group: "Page", hint: PAGE_HINTS[link.label] })),
    ...resolvedServices().map(({ content, href }) => ({
      label: content.label,
      href,
      group: "Service",
      hint: linkForLabel(content.label)?.summary,
    })),
    ...posts.map((post) => ({ label: post.title, href: `/blog/${post.slug}/`, group: "Article", hint: post.tags.join(", ") })),
    { label: "Privacy policy", href: "/privacy-policy/", group: "Page" },
    { label: "Terms of use", href: "/terms/", group: "Page" },
    { label: "Cookie policy", href: "/cookie-policy/", group: "Page" },
  ];
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });
}

export async function NotFoundPage() {
  const index = await searchIndex();
  const popular = POPULAR.flatMap((href) => index.filter((item) => item.href === href));

  return (
    <PageMain>
      <section className={styles.wrap} aria-labelledby="nf-title" data-fx-parallax="">
        <div className={`container ${styles.inner}`}>
          <NotFoundScene />
          <p className={styles.eyebrow}>Error 404</p>
          <h1 id="nf-title" className={styles.title}>
            This page slipped out of the stack
          </h1>
          <p className={styles.lead}>
            The link might be old, or the page may have moved. Search the site, or start from one of our most visited
            pages.
          </p>
          <NotFoundSearch items={index} popular={popular} />
          <div className={styles.actions}>
            <Link href="/" className={styles.primary}>
              Back to home
            </Link>
            <Link href="/contact/" className={styles.ghost}>
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </PageMain>
  );
}
