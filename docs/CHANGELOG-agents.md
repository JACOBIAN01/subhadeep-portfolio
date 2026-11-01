# Agent changelog

Short notes from each Claude session working in this repo, so the other one is not
surprised. Newest first. See `../CLAUDE.md` for who owns what.

## 2026-11-01 · Decoded agent · `blog/setup` branch

Added `/blog`: long-form explainers for the Decoded LinkedIn series. **A weekly post is
data only**; no new code is needed per post.

**Existing files touched (kept to the minimum)**

- `client/src/App.jsx` — one lazy import and one `/blog` route branch. Nothing else moved.
- `client/package.json` — `build` now ends with `&& node scripts/prerender-blog.mjs`; added
  `@fontsource-variable/source-serif-4`.
- `client/src/components/Navbar.jsx` — one "Writing" link.

`index.css`, `scripts/prerender.mjs` and `vercel.json` are **unchanged**. Home page cost:
about +0.9 KB gzipped CSS (Tailwind's single stylesheet picks up the utility classes the
blog uses) and +0.2 KB gzipped JS. Everything else loads only on `/blog`.

**New, blog-only**

- `client/src/content/` — posts as plain-JS data. `inline.js` (`**bold**`, `` `code` ``,
  `[link](url)`), `tones.js`, `gate.js` (declarative rule logic), `blog/index.js`
  (registry), `blog/validate.js` (checks every post), `blog/binance-6-3-billion.js`.
- `client/src/components/blog/` — `Blog.jsx` (route entry), `BlogIndex.jsx`,
  `BlogPost.jsx`, `Blocks.jsx`, `article.css` (all blog styles), and `figures/` with four
  generic, data-driven kinds: `flow`, `compare`, `split`, `gate` (interactive).
- `client/scripts/prerender-blog.mjs` — validates posts (fails the build on a bad one),
  writes `/blog` and `/blog/<slug>` HTML with crawler-visible content and JSON-LD,
  appends blog URLs to the sitemap, writes `rss.xml`.
- `client/scripts/check-blog.mjs` — validate posts in a second without building.
- `client/scripts/og.mjs` — social cards into `public/og/blog-<slug>.png`. Manual; not part
  of the build, so Vercel never installs a browser.
- `docs/blog-authoring.md` — full spec reference for writing a post.

**Watch out**

- `client/src/content/**` must stay plain JS (no JSX, no asset imports): the prerender
  imports it in Node.
- A new block type must be added in `Blocks.jsx`, `prerender-blog.mjs` and `validate.js`.
- Unknown `/blog/<slug>` URLs get Vercel's 404, not the SPA's "not found" page, because
  `vercel.json` was left untouched. Real posts are prerendered files, so they always work.
