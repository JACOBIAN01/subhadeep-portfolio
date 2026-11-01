# Agent changelog

Short notes from each Claude session working in this repo, so the other one is not
surprised. Newest first. See `../CLAUDE.md` for who owns what.

## 2026-11-01 · Decoded agent · `blog/setup` branch

Added the `/blog` section, so the Decoded LinkedIn series has a long-form home and the
posts stop sending readers to a bare GitHub repo.

**New**

- `client/src/content/` — posts as data. `inline.js` (tiny `**bold**` / `` `code` `` /
  `[link](url)` formatter), `blog/index.js` (registry, reading time, date format),
  `blog/binance-6-3-billion.js` (first post).
- `client/src/components/blog/` — `BlogIndex.jsx`, `BlogPost.jsx` (reading-progress bar,
  byline, long-read column), `Blocks.jsx` (block renderer), `registry.jsx`,
  `diagrams/{DiagramFrame,Wallets,Deputy,Freeze}.jsx`,
  `demos/WithdrawalDesk.jsx` (interactive).
- `client/scripts/og.mjs` — generates `public/og/blog-<slug>.png`. Manual, not part of
  `npm run build`, so Vercel never installs a browser.

**Changed**

- `client/src/App.jsx` — routes `/blog` and `/blog/:slug` alongside `/work/:slug`. Blog
  chunks are lazy, so the home-page bundle is unchanged.
- `client/scripts/prerender.mjs` — now also writes `dist/blog/index.html` and
  `dist/blog/<slug>/index.html` with real `<noscript>` content, `BlogPosting` JSON-LD,
  an updated `sitemap.xml` and a new `rss.xml`.
- `client/src/index.css` — `--font-serif` token and the `.article` typography block.
- `client/src/components/Navbar.jsx` — added a "Writing" link.
- `client/vercel.json` — `/blog/:slug` SPA fallback and an RSS content-type header.
- `client/package.json` — added `@fontsource-variable/source-serif-4`, loaded only on
  blog routes (imported in the blog components, not `main.jsx`).

**Watch out**

- A block type must be handled in **both** `Blocks.jsx` and `prerender.mjs`, or crawlers
  silently lose that content.
- `client/src/content/**` is plain JS on purpose: `prerender.mjs` imports it in Node, so
  JSX or asset imports there will break the build.
