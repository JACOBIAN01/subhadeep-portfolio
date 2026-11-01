// Post-build step: writes dist/work/<slug>/index.html for each case study with
// its own <title>, description, canonical and social tags, plus a <noscript>
// summary, so crawlers and link previewers that don't run JS see real content.
// The React app still takes over in the browser. Also regenerates sitemap.xml.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { CASE_META, SITE } from "../src/data/caseMeta.js";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const template = readFileSync("dist/index.html", "utf8");
const setMeta = (html, attr, key, value) =>
  html.replace(
    new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`, "s"),
    (_, a, b) => `${a}${esc(value)}${b}`
  );

// Blog posts (one JSON per post) and the /blog index get the same per-page tags.
const posts = readdirSync("src/content/blog")
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(readFileSync(`src/content/blog/${f}`, "utf8")));
const PAGES = [
  ...CASE_META.map((c) => ({ ...c, path: `work/${c.slug}`, img: `/og/${c.slug}.png` })),
  { title: "Writing", description: "One trending tech story a week, explained from zero.", path: "blog", img: "/preview.jpg" },
  ...posts.map((p) => ({ ...p, path: `blog/${p.slug}`, img: `/og/blog-${p.slug}.png` })),
];

for (const c of PAGES) {
  const url = `${SITE}/${c.path}`;
  const title = `${c.title} | Subhadeep Ghorai`;
  let html = template
    .replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = setMeta(html, "name", "description", c.description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", c.description);
  const img = `${SITE}${c.img}`;
  html = setMeta(html, "property", "og:image", img);
  html = setMeta(html, "name", "twitter:image", img);
  html = setMeta(html, "name", "twitter:title", title);
  html = setMeta(html, "name", "twitter:description", c.description);
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"></div>\n    <noscript><h1>${esc(c.title)}</h1><p>${esc(c.description)}</p><p><a href="${SITE}/">Subhadeep Ghorai: portfolio</a></p></noscript>`
  );
  mkdirSync(`dist/${c.path}`, { recursive: true });
  writeFileSync(`dist/${c.path}/index.html`, html);
}

const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${SITE}/`, priority: "1.0" },
  ...PAGES.map((c) => ({ loc: `${SITE}/${c.path}`, priority: "0.8" })),
];
writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`
      )
      .join("\n") +
    `\n</urlset>\n`
);
console.log(`prerendered ${CASE_META.length} case studies + ${posts.length} blog posts + sitemap`);
