// Post-build step for the blog, run after scripts/prerender.mjs (see "build" in package.json).
// Kept separate so the site's original prerender stays untouched.
//
// - Validates every post and FAILS the build on a malformed one.
// - Writes dist/blog/index.html and dist/blog/<slug>/index.html with their own <title>,
//   social tags, BlogPosting JSON-LD and a crawler-visible <noscript> copy of the article.
// - Adds the blog URLs to the sitemap prerender.mjs wrote, and writes dist/rss.xml.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { SITE } from "../src/data/caseMeta.js";
import { POSTS, readingTime } from "../src/content/blog/index.js";
import { validatePosts } from "../src/content/blog/validate.js";
import { toHtml, toText, escapeHtml as esc } from "../src/content/inline.js";

const problems = validatePosts(POSTS);
if (problems.length) {
  console.error(`\nBlog content has ${problems.length} problem(s):\n  ${problems.join("\n  ")}\n`);
  process.exit(1);
}

const template = readFileSync("dist/index.html", "utf8");

const setMeta = (html, attr, key, value) =>
  html.replace(
    new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`, "s"),
    (_, a, b) => `${a}${esc(value)}${b}`
  );

function page({ url, title, description, image, body, jsonLd, type = "website" }) {
  let html = template
    .replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${esc(url)}$2`)
    .replace(/(<meta property="og:type" content=")[^"]*(")/, `$1${type}$2`);
  html = setMeta(html, "name", "description", description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:image", image);
  html = setMeta(html, "name", "twitter:image", image);
  html = setMeta(html, "name", "twitter:title", title);
  html = setMeta(html, "name", "twitter:description", description);
  if (jsonLd) {
    html = html.replace(
      "</head>",
      `  <script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n    </script>\n  </head>`
    );
  }
  return html.replace('<div id="root"></div>', `<div id="root"></div>\n    <noscript>${body}</noscript>`);
}

const write = (dir, html) => {
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/index.html`, html);
};

/** Mirror of src/components/blog/Blocks.jsx, as plain HTML for crawlers. */
function blockHtml(b) {
  switch (b.t) {
    case "lead":
    case "p":
      return `<p>${toHtml(b.c)}</p>`;
    case "h2":
      return `<h2>${esc(b.c)}</h2>`;
    case "h3":
      return `<h3>${esc(b.c)}</h3>`;
    case "ul":
      return `<ul>${b.items.map((i) => `<li>${toHtml(i)}</li>`).join("")}</ul>`;
    case "ol":
      return `<ol>${b.items.map((i) => `<li>${toHtml(i)}</li>`).join("")}</ol>`;
    case "quote":
      return `<blockquote>${toHtml(b.c)}${b.cite ? `<cite>${esc(b.cite)}</cite>` : ""}</blockquote>`;
    case "callout":
      return `<aside><p>${toHtml(b.c)}</p>${b.src ? `<p>Source: ${esc(b.src)}</p>` : ""}</aside>`;
    case "timeline":
      return `<dl>${b.items.map((i) => `<dt>${esc(i.when)}</dt><dd>${toHtml(i.what)}</dd>`).join("")}</dl>`;
    case "code":
      return `<pre><code>${esc(b.code)}</code></pre>`;
    case "figure":
      // Figures are animated or interactive, so crawlers get the written description.
      return `<figure><p>${esc(b.alt || "")}</p>${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ""}</figure>`;
    case "keytakeaway":
      return `<section><h2>${esc(b.title || "In one card")}</h2><ul>${b.items
        .map((i) => `<li>${toHtml(i)}</li>`)
        .join("")}</ul></section>`;
    case "sources":
      return `<section><h2>Sources</h2><ul>${b.items
        .map((i) => `<li><a href="${esc(i.href)}" rel="noreferrer">${esc(i.label)}</a></li>`)
        .join("")}</ul></section>`;
    default:
      return "";
  }
}

const postImage = (p) => `${SITE}/og/blog-${p.slug}.png`;

// ------------------------------------------------------------------ posts
for (const p of POSTS) {
  const url = `${SITE}/blog/${p.slug}`;
  const body =
    `<article><h1>${esc(p.title)}</h1><p>${esc(p.dek)}</p>` +
    `<p>By Subhadeep Ghorai · ${esc(p.date)} · ${readingTime(p)} min read</p>` +
    p.blocks.map(blockHtml).join("") +
    `</article><p><a href="${SITE}/blog">All posts</a></p>`;

  write(
    `dist/blog/${p.slug}`,
    page({
      url,
      title: `${p.title} | Subhadeep Ghorai`,
      description: p.description,
      image: postImage(p),
      type: "article",
      body,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: p.title,
        description: p.description,
        datePublished: p.date,
        dateModified: p.updated || p.date,
        image: postImage(p),
        mainEntityOfPage: url,
        keywords: (p.tags || []).join(", "),
        author: { "@type": "Person", name: "Subhadeep Ghorai", url: SITE },
        publisher: { "@type": "Person", name: "Subhadeep Ghorai", url: SITE },
      },
    })
  );
}

// ------------------------------------------------------------------ index
const indexDescription =
  "Long-form explainers of one trending tech story a week, from zero, with animated diagrams and demos you can run.";
write(
  "dist/blog",
  page({
    url: `${SITE}/blog`,
    title: "Writing | Subhadeep Ghorai",
    description: indexDescription,
    image: `${SITE}/preview.jpg`,
    body:
      `<h1>Writing</h1><p>${esc(indexDescription)}</p><ul>` +
      POSTS.map((p) => `<li><a href="${SITE}/blog/${p.slug}">${esc(p.title)}</a> — ${esc(p.dek)}</li>`).join("") +
      `</ul>`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Subhadeep Ghorai: writing",
      url: `${SITE}/blog`,
      description: indexDescription,
    },
  })
);

// ---------------------------------------------- sitemap (append to prerender.mjs output)
const entries = [
  { loc: `${SITE}/blog`, lastmod: POSTS[0]?.date, priority: "0.9" },
  ...POSTS.map((p) => ({ loc: `${SITE}/blog/${p.slug}`, lastmod: p.updated || p.date, priority: "0.8" })),
]
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`
  )
  .join("\n");
const sitemap = readFileSync("dist/sitemap.xml", "utf8");
writeFileSync("dist/sitemap.xml", sitemap.replace("</urlset>", `${entries}\n</urlset>`));

// ------------------------------------------------------------------ rss
const items = POSTS.map(
  (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE}/blog/${p.slug}</guid>
      <pubDate>${new Date(`${p.date}T09:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(toText(p.dek))}</description>
    </item>`
).join("\n");

writeFileSync(
  "dist/rss.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Subhadeep Ghorai: writing</title>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${esc(indexDescription)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`
);

console.log(`prerendered blog: ${POSTS.length} post(s) + index, sitemap entries, rss`);
