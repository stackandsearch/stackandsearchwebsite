"use client";

import { useState } from "react";
import { BlogRow, type BlogRowPost } from "./BlogRow";
import styles from "./Pages.module.scss";

const PAGE_SIZE = 9;

interface CategoryCount {
  name: string;
  slug: string;
  count: number;
}

// Every article is in the HTML (for search engines); 9 show at first, with
// category filters when posts span more than one category.
export function BlogList({ posts, categories }: { posts: BlogRowPost[]; categories: CategoryCount[] }) {
  const [active, setActive] = useState("all");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const showCategory = categories.length > 1;
  const filtered = posts.filter((post) => active === "all" || post.category?.slug === active);
  const choose = (slug: string) => {
    setActive(slug);
    setLimit(PAGE_SIZE);
  };

  return (
    <div>
      {showCategory ? (
        <div className={styles.chips} role="group" aria-label="Filter articles by category">
          <button type="button" className={styles.chip} aria-pressed={active === "all"} onClick={() => choose("all")}>
            All <span>{posts.length}</span>
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              className={styles.chip}
              aria-pressed={active === category.slug}
              onClick={() => choose(category.slug)}
            >
              {category.name} <span>{category.count}</span>
            </button>
          ))}
        </div>
      ) : null}

      <ol className={styles.postList}>
        {posts.map((post) => {
          const position = filtered.indexOf(post);
          return (
            <li key={post.slug} hidden={position === -1 || position >= limit}>
              <BlogRow post={post} showCategory={showCategory} level={2} />
            </li>
          );
        })}
      </ol>

      {filtered.length > limit ? (
        <button type="button" className={styles.moreButton} onClick={() => setLimit((value) => value + PAGE_SIZE)}>
          Show more articles
        </button>
      ) : null}
    </div>
  );
}
