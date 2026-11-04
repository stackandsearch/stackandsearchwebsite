// Lists every header and footer link and whether its page exists, and
// writes docs/PAGE-INVENTORY.md.   Run:  npm run inventory
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const cache = new Map();

function resolveFile(base) {
  for (const candidate of [`${base}.ts`, `${base}.tsx`, path.join(base, "index.ts")]) {
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error(`cannot resolve ${path.relative(root, base)}`);
}

// Minimal loader for the TypeScript content files (plain data).
function load(file) {
  const cached = cache.get(file);
  if (cached) return cached.exports;
  const source = fs.readFileSync(file, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const mod = { exports: {} };
  cache.set(file, mod);
  const req = (spec) => {
    if (spec.startsWith("@/")) return load(resolveFile(path.join(root, "src", spec.slice(2))));
    if (spec.startsWith(".")) return load(resolveFile(path.resolve(path.dirname(file), spec)));
    throw new Error(`${path.relative(root, file)} imports ${spec}`);
  };
  new Function("module", "exports", "require", output)(mod, mod.exports, req);
  return mod.exports;
}

const nav = load(path.join(root, "src/content/navigation.ts"));
const footer = load(path.join(root, "src/content/footer.ts"));
const built = (href) => {
  const clean = href.split("#")[0].replace(/^\/+|\/+$/g, "");
  return fs.existsSync(path.join(root, "src/app", clean, "page.tsx"));
};

const rows = [];
const add = (section, link) => rows.push({ section, label: link.label, href: link.href, built: built(link.href) });
for (const group of nav.serviceGroups ?? []) for (const item of group.items) add(`Services: ${group.label}`, item);
for (const group of footer.footerGroups ?? []) {
  const name = group.label ?? group.title ?? group.heading ?? group.id;
  for (const link of group.links) add(`Footer: ${name}`, link);
}
for (const item of nav.primaryNav ?? []) add("Header", item);
if (nav.ctaLink) add("Header", nav.ctaLink);
if (nav.allServicesLink) add("Header", nav.allServicesLink);

const seen = new Set();
const unique = rows.filter((row) => !seen.has(row.href) && seen.add(row.href));
const done = unique.filter((row) => row.built).length;

let md = "# Page inventory\n\nEvery link in the header and footer, and whether its page exists yet.\nRegenerate with `npm run inventory`.\n";
let current = "";
for (const row of unique) {
  if (row.section !== current) {
    current = row.section;
    md += `\n## ${current}\n\n`;
  }
  md += `- [${row.built ? "x" : " "}] ${row.label}: \`${row.href}\`\n`;
}
md += `\n${done} of ${unique.length} pages built.\n`;
fs.mkdirSync(path.join(root, "docs"), { recursive: true });
fs.writeFileSync(path.join(root, "docs/PAGE-INVENTORY.md"), md);

for (const row of unique) console.log(`    ${row.built ? "built" : "to do"}  ${row.href}  (${row.label})`);
console.log(`    ${done} of ${unique.length} pages built; full list in docs/PAGE-INVENTORY.md`);
