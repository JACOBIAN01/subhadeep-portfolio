# Instructions for Claude working in this repo

Two Claude sessions work here: **Claude in VS Code** (on Subhadeep's machine) and the
**Decoded agent** (a cloud session that also runs the LinkedIn series in
`JACOBIAN01/decoded-content`). Neither can see the other's working tree, so **GitHub is
the only shared state**. Pull before you start and push when you finish.

## Who owns what

| Area | Owner | Rule |
|---|---|---|
| `client/src/content/**` | Decoded agent | Posts and their data helpers. VS Code Claude should not edit these. |
| `client/src/components/blog/**` | Decoded agent | Blog layout, figures, `article.css`. |
| `client/scripts/{prerender-blog,check-blog,og}.mjs` | Decoded agent | Blog build steps. |
| `client/public/og/blog-*.png` | Decoded agent | Generated, do not hand-edit. |
| Everything else in `client/` | VS Code Claude | Home page, case studies, shared components, `index.css`, `scripts/prerender.mjs`, `vercel.json`. |
| `client/src/App.jsx`, `client/package.json`, this file | Shared | Change only via a pull request, never a direct push to `main`. |

The blog is deliberately isolated: it touches only three lines of shared code (one lazy
import and one route branch in `App.jsx`, the `build` script in `package.json`) plus one
nav link. Keep it that way. Blog styles live in `components/blog/article.css`, not
`index.css`; blog prerendering lives in `scripts/prerender-blog.mjs`, not `prerender.mjs`.

Both: never push to `main` directly. Branch, open a PR, let Vercel build the preview.
Log anything another agent would be surprised by in `docs/CHANGELOG-agents.md`.

## Stack

React 19 + Vite 7, Tailwind v4 (CSS-first `@theme` in `src/index.css`), Framer Motion,
self-hosted Inter (UI) and Source Serif 4 (article text). Static build on Vercel.
No router library: `src/App.jsx` matches `window.location.pathname`. After the Vite
build, `scripts/prerender.mjs` writes per-route HTML for case studies and the sitemap,
then `scripts/prerender-blog.mjs` validates posts, writes the blog pages, adds them to
the sitemap and writes `rss.xml`.

```bash
cd client
npm install
npm run dev      # local dev server
npm run build    # vite build + both prerender steps; fails on an invalid blog post
npm run lint     # must pass; CI runs it
node scripts/check-blog.mjs   # validate blog posts in a second, no build
node scripts/og.mjs           # regenerate blog social cards (needs playwright locally)
```

## Adding a blog post: data only, no code

**Read `docs/blog-authoring.md` first.** It is the full reference for every block and
figure spec, with copy-paste examples.

1. Create `client/src/content/blog/<slug>.js` exporting `{ meta, blocks }`. Plain JS, no
   JSX and no asset imports: `scripts/prerender.mjs` imports it in Node.
2. Register it in `client/src/content/blog/index.js` (newest first).
3. Diagrams and demos are **data**: `{ t: "figure", kind: "flow" | "compare" | "split" |
   "gate", … }`. Do not write a component for one post.
4. `node scripts/check-blog.mjs` (seconds), then `node scripts/og.mjs` for the social card.
5. `npm run lint && npm run build`, then check `/blog/<slug>` in the preview.

`npm run build` validates every post (`src/content/blog/validate.js`) and **fails** on a
bad one, with the exact block and field named. That is the safety net for unattended runs.

Only when a story truly needs a picture none of the four kinds can draw: add a new
generic `kind` (component + `figures/index.jsx` + validator + docs), never a one-off. A new
block *type* must be handled in `components/blog/Blocks.jsx`, `scripts/prerender-blog.mjs`
and `src/content/blog/validate.js`, or crawlers silently lose that content.

## Writing rules for posts

These match the Decoded series rules in the "LinkedIn Agent" claude.ai Project
(`decoded/post-selection-rules.md`), and apply to anything published here.

- **Audience: students and curious beginners in India.** Explain from zero, then go one
  layer deeper for engineers. A reader who stops halfway should still have learned the
  main idea.
- **Every scary or surprising claim is sourced and attributed** in a `callout` with
  `kind: "documented"` and a `src`. If a fact is contested, say who disagrees rather than
  flattening it.
- **Label our simplifications** `kind: "ourbuild"`, or say "Our build" in the figure
  caption. Never present a teaching model as the real system's architecture.
- **No how-to-attack detail.** Explain the bug class and the defence, never payloads,
  request shapes or steps that would help someone reproduce an attack.
- **No fake urgency and no bait.** No "you won't believe", no invented danger.
- Interactive demos must run entirely in the browser and touch no network.
- Accessibility: every figure needs an `alt` that explains the mechanism in words; it is
  also what crawlers and screen readers get.

## Design

Light, Apple-like, one sans family (Inter) plus Source Serif 4 for article body text.
Tokens live in `src/index.css` (`--color-ink`, `--color-subtle`, `--color-hairline`,
`--color-canvas`, `--color-canvas-alt`, `--color-accent`). Reading column is
`max-w-[44rem]`; figures break out with `lg:-mx-24`. Respect
`prefers-reduced-motion` (the app sets `MotionConfig reducedMotion="user"`; CSS-driven
motion goes behind `data-animated`). Check every new page at 390 px wide with no
horizontal scroll.
