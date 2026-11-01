// Blog rules shared by the site (src/pages/Blog.jsx) and the build (scripts/prerender.mjs),
// so both always agree on which posts exist, their URLs and their reading time.
// Plain JS (no JSX, no asset imports) so the build script can import it in Node.

export const BLOG_TAGLINE =
  "One trending tech story a week, explained from zero, with diagrams you can watch and demos you can try.";

// The file name is the post's slug: ".../binance-6-3-billion.json" -> "binance-6-3-billion".
export function slugFromFileName(fileName) {
  return fileName.split("/").pop().replace(/\.json$/, "");
}

// A real calendar date written as YYYY-MM-DD. Date.parse alone isn't enough: it quietly
// turns "2026-02-30" into 2 March, so the date must come back unchanged.
function isIsoDate(text) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return false;
  const time = Date.parse(`${text}T00:00:00Z`);
  return !Number.isNaN(time) && new Date(time).toISOString().slice(0, 10) === text;
}

// Today as YYYY-MM-DD (UTC).
export function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

// A post is published only if it has a title, a description (needed for the LinkedIn
// preview card) and a valid date that isn't after `today`. Anything else is skipped
// everywhere: no page, no list entry, no sitemap entry. A post dated in the future goes
// live with the first build on or after its date.
export function isPublishable(post, today = todayIso()) {
  return (
    Boolean(post) &&
    typeof post.title === "string" &&
    typeof post.description === "string" &&
    typeof post.date === "string" &&
    isIsoDate(post.date) &&
    post.date <= today
  );
}

// A post's blocks, or an empty list if the file has none.
export function blocksOf(post) {
  return Array.isArray(post.blocks) ? post.blocks : [];
}

function countWords(text) {
  return typeof text === "string" ? text.split(/\s+/).filter(Boolean).length : 0;
}

// About 220 words a minute, counting paragraphs, list items and timeline entries.
// Safe on any data: odd blocks just count as zero words.
export function readingTime(post) {
  let words = 0;
  for (const block of blocksOf(post)) {
    if (!block || typeof block !== "object") continue;
    words += countWords(block.c);
    const items = Array.isArray(block.items) ? block.items : [];
    for (const item of items) {
      words += countWords(typeof item === "string" ? item : item?.what);
    }
  }
  return Math.max(1, Math.round(words / 220));
}

// The few fields the /blog list needs, so the list never downloads whole posts.
export function summarize(post, slug) {
  return {
    slug,
    title: post.title,
    dek: typeof post.dek === "string" ? post.dek : "",
    date: post.date,
    series: typeof post.series === "string" ? post.series : "",
    seriesNo: typeof post.seriesNo === "string" ? post.seriesNo : "",
    minutes: readingTime(post),
  };
}

export function newestFirst(a, b) {
  return b.date.localeCompare(a.date);
}
