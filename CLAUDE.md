# Instructions for Claude working in this repo

Two Claude sessions work here: **Claude in VS Code** (on Subhadeep's machine) and the
**Decoded agent** (a cloud session that also runs the LinkedIn series in
`JACOBIAN01/decoded-content`). Neither can see the other's working tree, so **GitHub is
the only shared state**. Pull before you start and push when you finish.

## Who owns what

| Area | Owner | Rule |
|---|---|---|
| `client/src/content/blog/**` | Decoded agent | Posts. VS Code Claude should not edit these. |
| `client/src/components/blog/**` | Decoded agent | Blog layout, diagrams and demos. |
| `client/public/og/blog-*.png` | Decoded agent | Generated, do not hand-edit. |
| Everything else in `client/src` | VS Code Claude | Home page, case studies, shared components. |
| `client/src/App.jsx`, `scripts/prerender.mjs`, `vercel.json`, this file | Shared | Change only via a pull request, never a direct push to `main`. |

Both: never push to `main` directly. Branch, open a PR, let Vercel build the preview.
Log anything another agent would be surprised by in `docs/CHANGELOG-agents.md`.

## Stack

React 19 + Vite 7, Tailwind v4 (CSS-first `@theme` in `src/index.css`), Framer Motion,
self-hosted Inter (UI) and Source Serif 4 (article text). Static build on Vercel.
No router library: `src/App.jsx` matches `window.location.pathname`, and
`scripts/prerender.mjs` writes a real HTML file per route after the build.

```bash
cd client
npm install
npm run dev      # local dev server
npm run build    # vite build + prerender (per-route HTML, sitemap, RSS)
npm run lint     # must pass; CI runs it
node scripts/og.mjs   # regenerate blog social cards (needs playwright locally)
```

## Adding a blog post

1. Create `client/src/content/blog/<slug>.js` exporting `{ meta, blocks }`. Plain JS, no
   JSX and no asset imports: `scripts/prerender.mjs` imports it in Node.
2. Register it in `client/src/content/blog/index.js` (newest first).
3. New figures: add the component under `client/src/components/blog/diagrams/` (or
   `demos/`) and map its id in `client/src/components/blog/registry.jsx`.
4. `node scripts/og.mjs` to make the social card, and commit the PNG.
5. `npm run lint && npm run build`, then check `/blog/<slug>` in the preview.

Every block type used in content must be handled in **both** `components/blog/Blocks.jsx`
(the React render) and `scripts/prerender.mjs` (the crawler-visible HTML). If you add a
block type, add it to both or crawlers silently lose that content.

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
