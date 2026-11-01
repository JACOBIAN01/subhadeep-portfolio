// Checks every post before the build writes anything. A malformed post fails the build
// with a readable list of problems instead of shipping a broken page.
// Run by scripts/prerender.mjs on every build; quick check alone: node scripts/check-blog.mjs
import { TONES, ICON_NAMES } from "../tones.js";
import { OPS } from "../gate.js";

const TEXT_BLOCKS = ["lead", "p", "h2", "h3", "quote"];
const BLOCK_TYPES = [
  ...TEXT_BLOCKS,
  "ul",
  "ol",
  "callout",
  "timeline",
  "code",
  "figure",
  "keytakeaway",
  "sources",
  "divider",
];
const CALLOUT_KINDS = ["documented", "ourbuild", "note"];
const FIGURE_KINDS = ["flow", "compare", "split", "gate"];

const isStr = (v) => typeof v === "string" && v.trim().length > 0;
const isArr = (v, min = 1, max = Infinity) => Array.isArray(v) && v.length >= min && v.length <= max;

function checkLinks(text, where, err) {
  for (const m of String(text).matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    if (!/^(https:\/\/|\/)/.test(m[1])) err(`${where}: link "${m[1]}" must start with https:// or /`);
  }
}

function checkTone(t, where, err) {
  if (t !== undefined && !TONES[t]) err(`${where}: unknown tone "${t}" (use ${Object.keys(TONES).join(", ")})`);
}

function checkIcon(i, where, err) {
  if (i !== undefined && !ICON_NAMES.includes(i)) err(`${where}: unknown icon "${i}"`);
}

function checkCond(c, where, err) {
  if (!c || typeof c !== "object") return err(`${where}: missing condition`);
  if (c.any || c.all) {
    const list = c.any || c.all;
    if (!isArr(list)) return err(`${where}: any/all needs a non-empty list`);
    return list.forEach((x, i) => checkCond(x, `${where}.${c.any ? "any" : "all"}[${i}]`, err));
  }
  if (!isStr(c.field)) err(`${where}: condition needs a "field"`);
  if (!OPS[c.op]) err(`${where}: unknown op "${c.op}" (use ${Object.keys(OPS).join(", ")})`);
  if (!("value" in c)) err(`${where}: condition needs a "value"`);
}

function checkFigure(b, where, err) {
  if (!FIGURE_KINDS.includes(b.kind)) return err(`${where}: unknown figure kind "${b.kind}" (use ${FIGURE_KINDS.join(", ")})`);
  if (!isStr(b.alt)) err(`${where}: figures need "alt", a sentence or two explaining the mechanism in words`);

  if (b.kind === "flow") {
    if (!isArr(b.steps, 2, 5)) err(`${where}: flow needs 2–5 steps`);
    else b.steps.forEach((s, i) => {
      if (!isStr(s.title)) err(`${where}.steps[${i}]: needs a title`);
      checkIcon(s.icon, `${where}.steps[${i}]`, err);
    });
    if (b.runs !== undefined) {
      if (!isArr(b.runs, 1, 3)) err(`${where}: flow runs must be 1–3 items`);
      else b.runs.forEach((r, i) => checkTone(r.tone, `${where}.runs[${i}]`, err));
    }
  }

  if (b.kind === "compare") {
    if (!isArr(b.lanes, 2, 3)) err(`${where}: compare needs 2–3 lanes`);
    else b.lanes.forEach((l, i) => {
      if (!isStr(l.title)) err(`${where}.lanes[${i}]: needs a title`);
      if (typeof l.blocked !== "boolean") err(`${where}.lanes[${i}]: needs blocked: true or false`);
      checkTone(l.tone, `${where}.lanes[${i}]`, err);
    });
  }

  if (b.kind === "split") {
    if (!isArr(b.panes, 2, 2)) err(`${where}: split needs exactly 2 panes`);
    else b.panes.forEach((p, i) => {
      if (!isStr(p.title)) err(`${where}.panes[${i}]: needs a title`);
      if (p.share !== undefined && !(typeof p.share === "number" && p.share >= 0 && p.share <= 100))
        err(`${where}.panes[${i}]: share must be a number 0–100`);
      checkTone(p.tone, `${where}.panes[${i}]`, err);
      checkIcon(p.icon, `${where}.panes[${i}]`, err);
    });
  }

  if (b.kind === "gate") {
    if (!isArr(b.rules, 1, 6)) err(`${where}: gate needs 1–6 rules`);
    else {
      const ids = new Set();
      b.rules.forEach((r, i) => {
        const w = `${where}.rules[${i}]`;
        if (!isStr(r.id)) err(`${w}: needs an id`);
        else if (ids.has(r.id)) err(`${w}: duplicate id "${r.id}"`);
        ids.add(r.id);
        if (!isStr(r.name)) err(`${w}: needs a name`);
        if (!isStr(r.why)) err(`${w}: needs "why" (shown as "Blocked: <why>.")`);
        checkCond(r.block, `${w}.block`, err);
      });
    }
    if (!isArr(b.requests, 1, 3)) err(`${where}: gate needs 1–3 requests`);
    else b.requests.forEach((r, i) => {
      if (!isStr(r.id) || !isStr(r.label)) err(`${where}.requests[${i}]: needs id and label`);
      if (!r.fields || typeof r.fields !== "object") err(`${where}.requests[${i}]: needs a fields object`);
    });
  }
}

function checkBlock(b, where, err) {
  if (!b || !BLOCK_TYPES.includes(b.t)) return err(`${where}: unknown block type "${b?.t}" (use ${BLOCK_TYPES.join(", ")})`);
  if (TEXT_BLOCKS.includes(b.t)) {
    if (!isStr(b.c)) err(`${where}: "${b.t}" needs text in "c"`);
    else checkLinks(b.c, where, err);
  }
  if (b.t === "ul" || b.t === "ol" || b.t === "keytakeaway") {
    if (!isArr(b.items)) err(`${where}: "${b.t}" needs items`);
    else b.items.forEach((it, i) => {
      if (!isStr(it)) err(`${where}.items[${i}]: must be text`);
      else checkLinks(it, `${where}.items[${i}]`, err);
    });
  }
  if (b.t === "callout") {
    if (!CALLOUT_KINDS.includes(b.kind)) err(`${where}: callout kind must be ${CALLOUT_KINDS.join(", ")}`);
    if (!isStr(b.c)) err(`${where}: callout needs text in "c"`);
    if (b.kind === "documented" && !isStr(b.src)) err(`${where}: documented callouts need a "src"`);
  }
  if (b.t === "timeline") {
    if (!isArr(b.items)) err(`${where}: timeline needs items`);
    else b.items.forEach((it, i) => {
      if (!isStr(it.when) || !isStr(it.what)) err(`${where}.items[${i}]: needs "when" and "what"`);
    });
  }
  if (b.t === "code" && !isStr(b.code)) err(`${where}: code block needs "code"`);
  if (b.t === "sources") {
    if (!isArr(b.items)) err(`${where}: sources needs items`);
    else b.items.forEach((it, i) => {
      if (!isStr(it.label) || !/^https:\/\//.test(it.href || "")) err(`${where}.items[${i}]: needs label and an https:// href`);
    });
  }
  if (b.t === "figure") checkFigure(b, where, err);
}

/** Returns a list of human-readable problems. Empty list = all good. */
export function validatePosts(posts) {
  const problems = [];
  const slugs = new Set();
  for (const p of posts) {
    const err = (msg) => problems.push(`[${p.slug || "?"}] ${msg}`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug || "")) err(`meta.slug must be kebab-case`);
    if (slugs.has(p.slug)) err(`duplicate slug`);
    slugs.add(p.slug);
    for (const k of ["title", "dek", "description"]) if (!isStr(p[k])) err(`meta.${k} is required`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(p.date || "")) err(`meta.date must be YYYY-MM-DD`);
    if (!isArr(p.blocks)) err(`blocks must be a non-empty list`);
    else p.blocks.forEach((b, i) => checkBlock(b, `blocks[${i}]`, err));
    if (!p.blocks?.some((b) => b.t === "sources")) err(`every post needs a "sources" block`);
  }
  return problems;
}
