// Shared IntersectionObservers: one per options set, however many elements
// are watched. A handler returns true to stop watching its element.

type Handler = (entry: IntersectionObserverEntry) => boolean;

interface Pool {
  observer: IntersectionObserver;
  handlers: Map<Element, Handler>;
}

export interface WatchOptions {
  rootMargin?: string;
  threshold?: number;
}

const pools = new Map<string, Pool>();

export function watchIntersection(element: Element, handler: Handler, options: WatchOptions = {}) {
  const rootMargin = options.rootMargin ?? "0px 0px -10% 0px";
  const threshold = options.threshold ?? 0.15;
  const key = `${rootMargin}|${threshold}`;

  let pool = pools.get(key);
  if (!pool) {
    const handlers = new Map<Element, Handler>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const handle = handlers.get(entry.target);
          if (handle && handle(entry)) {
            observer.unobserve(entry.target);
            handlers.delete(entry.target);
          }
        }
      },
      { rootMargin, threshold },
    );
    pool = { observer, handlers };
    pools.set(key, pool);
  }

  const current = pool;
  current.handlers.set(element, handler);
  current.observer.observe(element);

  return () => {
    current.observer.unobserve(element);
    current.handlers.delete(element);
  };
}
