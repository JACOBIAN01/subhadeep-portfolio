# Writing a blog post (data only, no code)

A post is one plain-JS file of data. Layout, animation, SEO, sitemap, RSS and social
cards all come from the existing code. **A normal week needs no code changes.**

```
1. client/src/content/blog/<slug>.js   ← new file: export { meta, blocks }
2. client/src/content/blog/index.js    ← add one import + one entry in POSTS (newest first)
3. cd client && node scripts/check-blog.mjs   ← validates every post in a second
4. node scripts/og.mjs                        ← social card (commit the PNG)
5. npm run lint && npm run build              ← build also validates; it fails on a bad post
```

Then push a branch and open a PR. Never push to `main`.

---

## The file

```js
export const meta = {
  slug: "discord-on-google",            // kebab-case, becomes /blog/<slug>
  title: "Your Discord messages are about to be googleable",
  dek: "One or two sentences under the title. The hook plus the open question.",
  description: "~150 characters for Google and link previews.",
  date: "2026-11-09",                    // YYYY-MM-DD
  updated: "2026-11-09",                 // optional
  tags: ["Privacy", "Search"],
  series: "Decoded",                     // optional kicker
  seriesNo: "07",                        // optional
};

export const blocks = [ /* see below */ ];
export default { meta, blocks };
```

Plain JS only: no JSX, no `import` of images or components. `scripts/prerender.mjs` loads
this file in Node.

## Inline formatting (any text field)

`**bold**`, `` `code` ``, `[text](https://…)`. Nothing else. Links must start with
`https://` or `/`.

## Text blocks

| Block | Shape | Use |
|---|---|---|
| lead | `{ t: "lead", c }` | First paragraph, larger. One per post. |
| p | `{ t: "p", c }` | Paragraph. |
| h2 / h3 | `{ t: "h2", c }` | Section headings (they get anchor links). |
| ul / ol | `{ t: "ul", items: ["…", "…"] }` | Lists. |
| quote | `{ t: "quote", c, cite? }` | Pull quote. |
| callout | `{ t: "callout", kind, c, src? }` | `kind`: `documented` (needs `src`), `ourbuild`, `note`. |
| timeline | `{ t: "timeline", items: [{ when, what }] }` | What happened, in order. |
| code | `{ t: "code", code, caption? }` | 8–15 lines max. |
| keytakeaway | `{ t: "keytakeaway", title?, items: [] }` | The Decoder card near the end. |
| sources | `{ t: "sources", items: [{ label, href }] }` | **Required**, last block. `https://` only. |
| divider | `{ t: "divider" }` | Section break. |

## Figures (animated or interactive, from data)

Every figure: `{ t: "figure", kind, label?, caption?, alt }`.
**`alt` is required**: one or two sentences explaining the mechanism in words. Screen
readers and Google get this instead of the animation. Say "Our build" in the caption
when the figure is a teaching model rather than the real system.

**Tones:** `blue`, `orange`, `red`, `green`, `purple`, `grey`.
**Icons:** `key`, `lock`, `unlock`, `laptop`, `server`, `database`, `globe`, `user`,
`users`, `mail`, `search`, `shield`, `alert`, `cpu`, `cloud`, `file`, `link`, `phone`,
`wallet`, `eye`.

### `flow` — a path through a system

Boxes in order with a packet travelling through. Several runs can take the same road in
turn. Use for: request lifecycles, pipelines, "how X reaches Y", supply chains.

```js
{ t: "figure", kind: "flow", label: "How a crawler finds a message",
  steps: [                                   // 2–5
    { title: "Public channel", sub: "message posted", icon: "users" },
    { title: "Web page", sub: "Discord publishes it", icon: "file" },
    { title: "Crawler", sub: "reads every public page", icon: "search", focus: true },
    { title: "Search index", sub: "anyone can query", icon: "database" },
  ],
  runs: [                                    // 1–3, cycled; optional
    { label: "Setting on: indexed", tone: "red" },
    { label: "Setting off: skipped", tone: "green" },
  ],
  note: "Usernames are not published either way.",
  caption: "…", alt: "…" }
```

### `compare` — same input, different outcomes

Two or three lanes; `blocked` lanes stop at a wall, the others run through.
Use for: before/after a fix, two systems side by side, "why this one and not that one".

```js
{ t: "figure", kind: "compare", label: "Same message, two settings",
  lanes: [                                   // 2–3
    { title: "Setting off", status: "not indexed", blocked: true, chip: "stays", note: "…" },
    { title: "Setting on", status: "searchable", blocked: false, chip: "public", note: "…" },
  ],
  caption: "…", alt: "…" }
```
`tone` per lane is optional (default: blocked = green, through = red).

### `split` — where things live

Exactly two panes with optional proportion bars and a token moving between them.
Use for: hot/cold storage, cache vs disk, client vs server, public vs private.

```js
{ t: "figure", kind: "split", label: "Where your data lives",
  panes: [                                   // exactly 2
    { kicker: "Private", title: "DMs and private servers", body: "…",
      icon: "lock", tone: "green", share: 80, shareLabel: "most messages" },
    { kicker: "Public", title: "Discoverable servers", body: "…",
      icon: "globe", tone: "orange", share: 20, shareLabel: "the indexable part" },
  ],
  mover: "✉",                // optional token travelling pane 1 → pane 2
  out: "shown to strangers", // optional label for a hop out of pane 2
  caption: "…", alt: "…" }
```

### `gate` — interactive: switch rules on, see what gets through

The reader toggles rules, presses the button, and watches each request pass or get
blocked. Use for: any defence, filter, permission or privacy setting. Usually the post's
"try it" moment.

```js
{ t: "figure", kind: "gate", label: "Who can find this message? · our build",
  action: "Search for it",
  rules: [                                   // 1–6
    { id: "optout", name: "Your opt-out switch", hint: "Data & Privacy setting.",
      why: "the author opted out",
      block: { field: "authorOptedOut", op: "is", value: true } },
    { id: "admin", name: "Admin turned the channel off",
      why: "the channel is excluded",
      block: { field: "channelPublic", op: "is", value: false } },
  ],
  requests: [                                // 1–3
    { id: "a", label: "Your message", tag: "yours", detail: "…",
      fields: { authorOptedOut: true, channelPublic: true } },
    { id: "b", label: "A stranger's message", tag: "public", bad: true, detail: "…",
      fields: { authorOptedOut: false, channelPublic: true } },
  ],
  passed: "Found by search.",       // a request without `bad` got through
  passedBad: "Found by anyone.",    // a `bad: true` request got through
  stopped: "Hidden",                // prefix: "Hidden: <rule.why>."
  openNote: "Shown after a run where everything got through.",
  caption: "…", alt: "…" }
```

A rule blocks a request when its `block` condition is true for that request's `fields`.
Ops: `>`, `>=`, `<`, `<=`, `is`, `not`, `in`, `notIn`, `includes`. Combine with
`{ any: [cond, …] }` or `{ all: [cond, …] }`. Rules run in order; the first one that blocks
wins. Check the logic with `node scripts/check-blog.mjs`, then try it in `npm run dev`.

---

## When a story needs something none of the four can show

That is the exception, not the weekly path. Add a new `kind` once, generically, so every
later post can use it: a component in `client/src/components/blog/figures/`, an entry in
`figures/index.jsx`, its checks in `src/content/blog/validate.js`, and a section in this
file. Never build a one-off component tied to a single story.

## Writing rules (same as the LinkedIn series)

- Students and curious beginners in India. Explain from zero, then one layer deeper.
- Every scary or surprising claim goes in a `documented` callout with its source.
  Contested facts: say who disagrees.
- Label simplifications "Our build". Never present a teaching model as the real system.
- No how-to-attack detail. The bug class and the defence, never payloads or steps.
- No fake urgency, no bait.
- End with a `keytakeaway`, a question for comments, then `sources`.
