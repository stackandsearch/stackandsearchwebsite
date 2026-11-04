import { site } from "@/content/site";
import { ORGANIZATION_ID, SITE_ORIGIN, absoluteUrl } from "./urls";

type SchemaNode = Record<string, unknown>;

export function graph(nodes: SchemaNode[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function organizationRef(): SchemaNode {
  return { "@type": "Organization", "@id": ORGANIZATION_ID, name: site.name, url: `${SITE_ORIGIN}/` };
}

export function breadcrumbSchema(items: { label: string; href?: string }[], currentPath: string): SchemaNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href ?? currentPath),
    })),
  };
}

export function serviceSchema(input: { name: string; description: string; path: string }): SchemaNode {
  const url = absoluteUrl(input.path);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: input.name,
    serviceType: input.name,
    description: input.description,
    url,
    provider: organizationRef(),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]): SchemaNode {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function itemListSchema(items: { name: string; path: string }[]): SchemaNode {
  return {
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

// Phase 4 part D: organisation details, page types and articles.
export function organizationSchema(extra: { email?: string; sameAs?: string[] } = {}): SchemaNode {
  return {
    ...organizationRef(),
    ...(extra.email ? { email: extra.email } : {}),
    ...(extra.sameAs && extra.sameAs.length > 0 ? { sameAs: extra.sameAs } : {}),
  };
}

export function webPageSchema(type: string, input: { name: string; description: string; path: string }): SchemaNode {
  const url = absoluteUrl(input.path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    name: input.name,
    description: input.description,
    url,
    isPartOf: { "@type": "WebSite", url: `${SITE_ORIGIN}/`, name: site.name },
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function blogPostingSchema(input: { title: string; description: string; path: string; date: string }): SchemaNode {
  const url = absoluteUrl(input.path);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: input.title,
    description: input.description,
    url,
    datePublished: input.date,
    dateModified: input.date,
    mainEntityOfPage: url,
    author: organizationRef(),
    publisher: organizationRef(),
  };
}
