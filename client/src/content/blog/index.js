// The blog's post registry. Plain JS so scripts/prerender.mjs can import it in Node
// to emit per-post <title>, social tags, crawler-visible HTML, the sitemap and the RSS feed.
//
// To add a post: create ./<slug>.js exporting { meta, blocks }, import it here, and add it
// to POSTS. Newest first. See ../../../../CLAUDE.md for the content rules.
import * as binance from "./binance-6-3-billion.js";
import { toText } from "../inline.js";

export const POSTS = [binance].map((m) => ({ ...m.meta, blocks: m.blocks }));

export const getPost = (slug) => POSTS.find((p) => p.slug === slug);

/** Rough reading time in minutes, counted from the prose only. */
export function readingTime(post) {
  let words = 0;
  for (const b of post.blocks) {
    const bits = [];
    if (b.c) bits.push(b.c);
    if (b.items) for (const i of b.items) bits.push(typeof i === "string" ? i : i.what || i.label || "");
    if (b.caption) bits.push(b.caption);
    for (const s of bits) words += toText(s).trim().split(/\s+/).filter(Boolean).length;
  }
  return Math.max(1, Math.round(words / 220));
}

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
