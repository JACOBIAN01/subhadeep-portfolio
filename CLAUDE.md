# Instructions for Claude working in this repo

Two Claude sessions work here: **Claude in VS Code** (Subhadeep's machine) and the
**Decoded agent** (cloud; also runs the LinkedIn series in `JACOBIAN01/decoded-content`).
GitHub is the only shared state: pull before you start, push when you finish, never push
to `main` directly (branch → PR → Vercel preview).

## The blog: one template, posts are JSON

| File | Owner | What it is |
|---|---|---|
| `client/src/pages/Blog.jsx` | Decoded agent | Template: `/blog` index and `/blog/<slug>` post pages |
| `client/src/components/BlogFigures.jsx` | Decoded agent | Animated / interactive figures |
| `client/src/content/blog/*.json` | Decoded agent | **One file per post. The only thing that changes weekly.** |
| `client/public/og/blog-*.png` | Decoded agent | Link-preview image per post |
| Everything else | VS Code Claude | The rest of the site |

The blog touches existing code in exactly three places; keep it that way:
`App.jsx` (lazy import + `/blog` route), `scripts/prerender.mjs` (blog pages join the
existing per-page loop, so each post gets its own title, description and preview image
for LinkedIn), and one "Writing" link in `Navbar.jsx`. No new npm packages.

## Adding a post: no code changes

Add `client/src/content/blog/<slug>.json` and `client/public/og/blog-<slug>.png`.
Vite finds the JSON automatically (`import.meta.glob`). Then `npm run lint && npm run build`.
The Decoded agent validates each post and generates its image in `decoded-content`
(`tools/blog/`) before pushing.

```json
{
  "slug": "kebab-case", "title": "…", "dek": "…", "description": "…",
  "date": "YYYY-MM-DD", "series": "Decoded", "seriesNo": "04",
  "blocks": [ { "t": "lead", "c": "…" } ]
}
```

Blocks: `lead`, `p`, `h2`, `h3`, `ul`/`ol` (`items`), `quote`, `callout` (`kind`:
`documented` + `src` | `ourbuild` | `note`), `timeline` (`items: [{when, what}]`), `code`,
`keytakeaway` (`items`), `sources` (`items: [{label, href}]`), `divider`, and `figure`
with `kind`: `flow` (steps + runs), `compare` (lanes), `split` (2 panes), `gate`
(interactive rules + requests). Each figure kind's fields are listed above its function in
`BlogFigures.jsx`. Text supports `**bold**`, `` `code` `` and `[text](https://…)`.

## Writing rules (same as the LinkedIn series)

Students and beginners in India, explained from zero, then one layer deeper. Every scary
claim in a `documented` callout with its source; contested facts say who disagrees.
Label simplifications "Our build". No how-to-attack detail. No fake urgency. Every figure
has an `alt` explaining the mechanism in words.
