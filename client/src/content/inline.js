// Tiny inline formatter, shared by the React renderer (src/components/blog/Blocks.jsx)
// and the build-time prerender (scripts/prerender.mjs). Plain JS, no JSX, no imports,
// so Node can import it directly.
//
// Supports: **bold**, `code`, [text](href). Nothing else, on purpose: posts stay
// easy to diff and impossible to break with stray HTML.

const PATTERN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

/** Split a string into tokens: {k: "text"|"b"|"code"|"a", v, href?} */
export function tokenize(text = "") {
  const out = [];
  let last = 0;
  for (const m of text.matchAll(PATTERN)) {
    if (m.index > last) out.push({ k: "text", v: text.slice(last, m.index) });
    const s = m[0];
    if (s.startsWith("**")) out.push({ k: "b", v: s.slice(2, -2) });
    else if (s.startsWith("`")) out.push({ k: "code", v: s.slice(1, -1) });
    else {
      const cut = s.indexOf("](");
      out.push({ k: "a", v: s.slice(1, cut), href: s.slice(cut + 2, -1) });
    }
    last = m.index + s.length;
  }
  if (last < text.length) out.push({ k: "text", v: text.slice(last) });
  return out;
}

export const escapeHtml = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Render inline markup to escaped HTML. Used for the crawler-visible fallback. */
export function toHtml(text = "") {
  return tokenize(text)
    .map((t) => {
      if (t.k === "b") return `<strong>${escapeHtml(t.v)}</strong>`;
      if (t.k === "code") return `<code>${escapeHtml(t.v)}</code>`;
      if (t.k === "a")
        return `<a href="${escapeHtml(t.href)}" rel="noreferrer">${escapeHtml(t.v)}</a>`;
      return escapeHtml(t.v);
    })
    .join("");
}

/** Stable anchor id for a heading, so /blog/post#heading links keep working. */
export function slugId(text = "") {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Plain text, for reading-time counts and meta descriptions. */
export function toText(text = "") {
  return tokenize(text)
    .map((t) => t.v)
    .join("");
}
