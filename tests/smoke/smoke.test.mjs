// Phase 1 smoke tests. Zero dependencies: Node's built-in test runner + fetch.
// They check what crawlers and no-JS visitors receive: the raw server HTML.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3100";

const BANNED = [
  "tailwindcss", "@tailwindcss/postcss", "bootstrap", "@mui/material", "styled-components",
  "gsap", "framer-motion", "motion", "three", "@react-three/fiber", "lenis",
  "locomotive-scroll", "aos", "lottie-web", "lottie-react", "swiper",
  "babel-plugin-react-compiler",
];

async function get(path) {
  const res = await fetch(new URL(path, BASE_URL), { redirect: "manual" });
  const body = await res.text();
  return { res, body };
}
const readJson = (file) => JSON.parse(readFileSync(file, "utf8"));
const withoutScripts = (html) => html.replace(/<script[\s\S]*?<\/script>/g, "");

test("homepage returns 200 HTML", async () => {
  const { res } = await get("/");
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type") ?? "", /text\/html/);
});

test("homepage content is in the server HTML, before any JavaScript", async () => {
  const { body } = await get("/");
  const html = withoutScripts(body);
  assert.match(html, /<html[^>]*\slang="en"/, "<html> needs a lang attribute");
  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
  assert.equal(h1Count, 1, `expected exactly one <h1>, found ${h1Count}`);
  assert.match(html, /<h1[^>]*>Stack &amp; Search<\/h1>/);
  assert.match(html, /this text is in the HTML before any JavaScript runs/);
  assert.match(html, /<meta name="viewport" content="width=device-width,\s*initial-scale=1/);
});

test("the X-Powered-By header is not sent", async () => {
  const { res } = await get("/");
  assert.equal(res.headers.get("x-powered-by"), null);
});

test("a URL without a trailing slash redirects permanently to the slash version", async () => {
  const { res } = await get("/services");
  assert.equal(res.status, 308);
  assert.equal(new URL(res.headers.get("location") ?? "", BASE_URL).pathname, "/services/");
});

test("an unknown page returns a real 404 status", async () => {
  const { res } = await get("/this-page-should-not-exist/");
  assert.equal(res.status, 404);
});

test("dependency policy: only approved packages are installed", () => {
  const pkg = readJson("package.json");
  const installed = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
  const approved = readJson("tests/dependency-allowlist.json");
  assert.deepEqual(installed.filter((n) => BANNED.includes(n)), [], "banned package installed");
  assert.deepEqual(installed.filter((n) => !approved.includes(n)), [], "package not in tests/dependency-allowlist.json");
});

test("dependency versions are pinned exactly", () => {
  const pkg = readJson("package.json");
  const ranged = Object.entries({ ...pkg.dependencies, ...pkg.devDependencies })
    .filter(([, version]) => !/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(version))
    .map(([name, version]) => `${name}@${version}`);
  assert.deepEqual(ranged, [], "use exact versions (no ^ or ~)");
});
