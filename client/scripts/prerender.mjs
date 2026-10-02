// Post-build step: writes dist/work/<slug>/index.html for each case study with
// its own <title>, description, canonical and social tags, plus a <noscript>
// summary, so crawlers and link previewers that don't run JS see real content.
// The React app still takes over in the browser. Also regenerates sitemap.xml.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { CASE_META, SITE } from "../src/data/caseMeta.js";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const template = readFileSync("dist/index.html", "utf8");
const setMeta = (html, attr, key, value) =>
  html.replace(
    new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`, "s"),
    (_, a, b) => `${a}${esc(value)}${b}`
  );

for (const c of CASE_META) {
  const url = `${SITE}/work/${c.slug}`;
  const title = `${c.title} | Subhadeep Ghorai`;
  let html = template
    .replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = setMeta(html, "name", "description", c.description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", c.description);
  const img = `${SITE}/og/${c.slug}.png`;
  html = setMeta(html, "property", "og:image", img);
  html = setMeta(html, "name", "twitter:image", img);
  html = setMeta(html, "name", "twitter:title", title);
  html = setMeta(html, "name", "twitter:description", c.description);
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"></div>\n    <noscript><h1>${esc(c.title)}</h1><p>${esc(c.description)}</p><p><a href="${SITE}/">Subhadeep Ghorai: portfolio</a></p></noscript>`
  );
  mkdirSync(`dist/work/${c.slug}`, { recursive: true });
  writeFileSync(`dist/work/${c.slug}/index.html`, html);
}

const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${SITE}/`, priority: "1.0" },
  ...CASE_META.map((c) => ({ loc: `${SITE}/work/${c.slug}`, priority: "0.8" })),
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
console.log(`prerendered ${CASE_META.length} case studies + sitemap`);
