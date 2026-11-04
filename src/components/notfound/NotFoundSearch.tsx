"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState, useSyncExternalStore, type CSSProperties } from "react";
import styles from "./NotFound.module.scss";

export interface SearchItem {
  label: string;
  href: string;
  group: string;
  hint?: string;
}

const IGNORED = new Set(["services", "service", "blog", "page", "pages", "www", "html", "php", "index", "the", "and"]);

const noSubscription = () => () => {};
const browserPath = () => window.location.pathname;
const serverPath = () => "";

const words = (value: string) => value.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

function score(item: SearchItem, terms: string[]) {
  const label = item.label.toLowerCase();
  const text = `${label} ${item.hint ?? ""} ${item.href}`.toLowerCase();
  let total = 0;
  for (const term of terms) {
    if (label.startsWith(term)) total += 5;
    else if (label.includes(term)) total += 3;
    else if (text.includes(term)) total += 1;
    else return 0;
  }
  return total;
}

// The page whose name or address shares the most words with the broken URL.
function closestPage(items: SearchItem[], path: string) {
  const terms = words(path).filter((term) => !IGNORED.has(term));
  let best: SearchItem | undefined;
  let bestHits = 0;
  for (const item of items) {
    if (item.href === path) continue;
    const text = `${item.label} ${item.href}`.toLowerCase();
    const hits = terms.filter((term) => text.includes(term)).length;
    if (hits > bestHits) {
      best = item;
      bestHits = hits;
    }
  }
  return best;
}

// Shows the missing address, suggests the closest page and searches every
// page, service and article. Enter opens the top result.
export function NotFoundSearch({ items, popular }: { items: SearchItem[]; popular: SearchItem[] }) {
  const router = useRouter();
  const inputId = useId();
  const outputId = useId();
  const [query, setQuery] = useState("");
  const path = useSyncExternalStore(noSubscription, browserPath, serverPath);

  const terms = words(query);
  const results =
    terms.length === 0
      ? []
      : items
          .map((item) => ({ item, score: score(item, terms) }))
          .filter((entry) => entry.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 6)
          .map((entry) => entry.item);
  const suggestion = path ? closestPage(items, path) : undefined;

  return (
    <>
      {path ? (
        <p className={styles.path}>
          Nothing lives at <code>{path}</code>
        </p>
      ) : null}
      {suggestion ? (
        <p className={styles.didYouMean} data-nf="did-you-mean">
          Did you mean <Link href={suggestion.href}>{suggestion.label}</Link>?
        </p>
      ) : null}

      <form
        role="search"
        className={styles.search}
        onSubmit={(event) => {
          event.preventDefault();
          if (results[0]) router.push(results[0].href);
        }}
      >
        <label htmlFor={inputId} className={styles.searchLabel}>
          Search the site
        </label>
        <div className={styles.field}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4.5 4.5" />
          </svg>
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try SEO, Shopify or pricing"
            autoComplete="off"
            spellCheck={false}
            aria-controls={outputId}
          />
          <kbd className={styles.kbd} aria-hidden="true">
            Enter ↵
          </kbd>
        </div>
      </form>

      <div id={outputId} className={styles.output} aria-live="polite">
        {terms.length === 0 ? (
          <div className={styles.popular}>
            <p>Popular pages</p>
            <ul>
              {popular.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : results.length > 0 ? (
          <ul className={styles.results} data-nf="results">
            {results.map((item, index) => (
              <li key={item.href} style={{ "--i": index } as CSSProperties}>
                <Link href={item.href} className={styles.hit}>
                  <strong>{item.label}</strong>
                  <span className={styles.hitGroup}>{item.group}</span>
                  {item.hint ? <small>{item.hint}</small> : null}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noResults}>
            No pages match that. Try a shorter word, or <Link href="/contact/">ask us directly</Link>.
          </p>
        )}
      </div>
    </>
  );
}
