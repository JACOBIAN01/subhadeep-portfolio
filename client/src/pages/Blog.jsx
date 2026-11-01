// /blog and /blog/:slug. One template for every post: each post is a JSON file in
// src/content/blog/, picked up automatically. Adding a post never needs a code change.
// Post format: see CLAUDE.md at the repo root.
import { useEffect, useState, Fragment } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Footer from "../components/Footer";
import BlogFigure from "../components/BlogFigures";
import { PROFILE } from "../data/profileData";
import { SITE } from "../data/caseMeta";
import self from "../assets/self.webp";

const POSTS = Object.values(
  import.meta.glob("../content/blog/*.json", { eager: true, import: "default" })
).sort((a, b) => b.date.localeCompare(a.date));

const SERIF = 'Charter, "Iowan Old Style", "Source Serif 4", Georgia, "Times New Roman", serif';
const EASE = [0.16, 1, 0.3, 1];

// Reading-column typography, scoped to .article so nothing leaks into the rest of the site.
const ARTICLE_CSS = `
.article{font-family:${SERIF};font-size:1.3125rem;line-height:1.75;color:#27272a}
.article>p{margin-top:1.6em}
.article .lead{font-size:1.5rem;line-height:1.55;color:var(--color-ink);margin-top:0}
.article h2,.article h3{font-family:var(--font-sans);font-weight:600;color:var(--color-ink);scroll-margin-top:5rem}
.article h2{font-size:1.875rem;line-height:1.22;letter-spacing:-.022em;margin-top:2.2em}
.article h3{font-size:1.375rem;line-height:1.3;letter-spacing:-.018em;margin-top:1.8em}
.article>h2+p,.article>h3+p{margin-top:.7em}
.article a{text-decoration:underline;text-decoration-color:var(--color-hairline);text-underline-offset:3px}
.article a:hover{text-decoration-color:var(--color-accent)}
.article strong{font-weight:600;color:var(--color-ink)}
.article code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.86em;background:var(--color-canvas-alt);border:1px solid var(--color-hairline);border-radius:5px;padding:.1em .36em}
.article>ul,.article>ol{margin-top:1.5em;padding-left:1.6em;display:flex;flex-direction:column;gap:.85em}
.article>ul{list-style:disc}.article>ol{list-style:decimal}
.article>ul>li::marker,.article>ol>li::marker{color:var(--color-faint)}
.article pre code{border:0;background:none;padding:0}
.article>figure{margin-top:2.4em}
.article figcaption{font-family:var(--font-sans);font-size:.8125rem;line-height:1.5;color:var(--color-faint);margin-top:.9rem;text-align:center}
@media (max-width:640px){.article{font-size:1.1875rem;line-height:1.7}.article .lead{font-size:1.3125rem}}
`;

const CALLOUTS = {
  documented: { bar: "#0066cc", bg: "#f5f9ff", label: "Documented" },
  ourbuild: { bar: "#6a3fc6", bg: "#f8f5ff", label: "Our build" },
  note: { bar: "#86868b", bg: "#f5f5f7", label: "Note" },
};

const anchor = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

function readingTime(post) {
  const text = post.blocks
    .map((b) => [b.c, ...(b.items || []).map((i) => (typeof i === "string" ? i : i.what || ""))].join(" "))
    .join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 220));
}

/** **bold**, `code` and [text](url) inside any text field. */
function Inline({ text = "" }) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g).map((s, i) => {
    if (s.startsWith("**")) return <strong key={i}>{s.slice(2, -2)}</strong>;
    if (s.startsWith("`")) return <code key={i}>{s.slice(1, -1)}</code>;
    const m = s.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (m)
      return (
        <a key={i} href={m[2]} target="_blank" rel="noreferrer">
          {m[1]}
        </a>
      );
    return <Fragment key={i}>{s}</Fragment>;
  });
}

const Label = ({ children }) => (
  <div className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-faint">{children}</div>
);

function Block({ b }) {
  switch (b.t) {
    case "lead":
      return <p className="lead"><Inline text={b.c} /></p>;
    case "p":
      return <p><Inline text={b.c} /></p>;
    case "h2":
      return <h2 id={anchor(b.c)}>{b.c}</h2>;
    case "h3":
      return <h3 id={anchor(b.c)}>{b.c}</h3>;
    case "ul":
    case "ol": {
      const List = b.t;
      return <List>{b.items.map((it, i) => <li key={i}><Inline text={it} /></li>)}</List>;
    }
    case "quote":
      return (
        <blockquote className="my-10 border-l-2 border-ink pl-6 text-[1.4rem] leading-[1.45] text-ink">
          <Inline text={b.c} />
        </blockquote>
      );
    case "callout": {
      const s = CALLOUTS[b.kind] || CALLOUTS.note;
      return (
        <aside className="my-8 rounded-2xl p-5 font-sans" style={{ background: s.bg, borderLeft: `3px solid ${s.bar}` }}>
          <div className="text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: s.bar }}>{s.label}</div>
          <p className="mt-2 text-[15px] leading-relaxed text-ink"><Inline text={b.c} /></p>
          {b.src && <p className="mt-2 text-[12px] text-faint">Source: {b.src}</p>}
        </aside>
      );
    }
    case "timeline":
      return (
        <ol className="my-8 font-sans">
          {b.items.map((it, i) => (
            <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
              {i < b.items.length - 1 && <span className="absolute bottom-0 left-[5px] top-2 w-px bg-hairline" />}
              <span className="relative z-10 mt-1.5 h-2.5 w-2.5 flex-none rounded-full bg-accent" />
              <div>
                <div className="text-[13px] font-bold text-accent">{it.when}</div>
                <p className="mt-1 text-[15px] leading-relaxed text-ink"><Inline text={it.what} /></p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "code":
      return (
        <pre className="my-8 overflow-x-auto rounded-2xl border border-hairline bg-white p-5 text-[13px] leading-relaxed">
          <code>{b.code}</code>
        </pre>
      );
    case "figure":
      return (
        <figure className="lg:-mx-24">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <BlogFigure spec={b} />
          </motion.div>
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>
      );
    case "keytakeaway":
      return (
        <aside className="my-10 rounded-3xl border border-ink/10 bg-canvas-alt p-6 font-sans">
          <Label>{b.title || "In one card"}</Label>
          <ul className="mt-4 flex flex-col gap-3">
            {b.items.map((it, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                <span><Inline text={it} /></span>
              </li>
            ))}
          </ul>
        </aside>
      );
    case "sources":
      return (
        <aside className="my-10 font-sans">
          <Label>Sources</Label>
          <ul className="mt-3 flex flex-col gap-2">
            {b.items.map((it, i) => (
              <li key={i} className="text-[14px]">
                <a href={it.href} target="_blank" rel="noreferrer" className="text-subtle hover:text-ink">{it.label}</a>
              </li>
            ))}
          </ul>
        </aside>
      );
    case "divider":
      return <div className="my-12 text-center text-faint" aria-hidden="true">···</div>;
    default:
      return null;
  }
}

function ProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-0.5" aria-hidden="true">
      <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
    </div>
  );
}

function TopBar({ back, label }) {
  return (
    <header className="border-b border-hairline">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6 text-sm">
        <a href={back} className="inline-flex items-center gap-1.5 text-subtle hover:text-ink">
          <FiArrowLeft size={14} aria-hidden="true" /> {label}
        </a>
        <a href="/" className="font-medium text-ink">{PROFILE.name}</a>
      </div>
    </header>
  );
}

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, ease: EASE } };

function Post({ post }) {
  useEffect(() => {
    document.title = `${post.title} | ${PROFILE.name}`;
  }, [post]);
  const share = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE}/blog/${post.slug}`)}`;

  return (
    <>
      <ProgressBar />
      <TopBar back="/blog" label="All posts" />
      <main id="main" className="mx-auto max-w-[44rem] px-6 pb-20 pt-12 sm:pt-16">
        <motion.div {...fadeIn}>
          {post.series && (
            <div className="font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-accent">
              {post.series} {post.seriesNo && `#${post.seriesNo}`}
            </div>
          )}
          <h1 className="mt-3 text-[2.1rem] font-semibold leading-[1.12] tracking-[-0.025em] text-ink sm:text-[2.75rem]">
            {post.title}
          </h1>
          <p className="mt-5 text-[1.3rem] leading-[1.5] text-subtle" style={{ fontFamily: SERIF }}>{post.dek}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-hairline py-4 text-[13px] text-subtle">
            <img src={self} alt="" width="36" height="36" className="h-9 w-9 rounded-full object-cover" />
            <span className="text-[14px] font-medium text-ink">{PROFILE.name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{readingTime(post)} min read</span>
            <a href={share} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1.5 hover:text-accent">
              <FaLinkedin aria-hidden="true" /> Share
            </a>
          </div>
        </motion.div>

        <style>{ARTICLE_CSS}</style>
        <article className="article mt-10">
          {post.blocks.map((b, i) => <Block key={i} b={b} />)}
        </article>

        <div className="mt-16 rounded-3xl border border-hairline bg-canvas-alt p-6 sm:p-8">
          <Label>About {post.series || "this series"}</Label>
          <p className="mt-3 text-[15px] leading-relaxed text-ink">
            One trending tech story a week, explained from zero, with a demo you can try. Written for
            students and anyone who wants the mechanism rather than the headline.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-[13px]">
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-medium text-white hover:bg-black">
              <FaLinkedin aria-hidden="true" /> Follow on LinkedIn
            </a>
            <a href="/blog" className="rounded-full border border-hairline px-4 py-2 text-subtle hover:text-ink">Read other posts</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Index() {
  useEffect(() => {
    document.title = `Writing | ${PROFILE.name}`;
  }, []);
  return (
    <>
      <TopBar back="/" label="Portfolio" />
      <main id="main" className="mx-auto max-w-3xl px-6 pb-20 pt-16 sm:pt-24">
        <motion.div {...fadeIn}>
          <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Writing</h1>
          <p className="mt-5 max-w-xl text-[1.25rem] leading-relaxed text-subtle" style={{ fontFamily: SERIF }}>
            Long-form explainers of one trending tech story a week, from zero, with diagrams you can
            watch and demos you can try.
          </p>
        </motion.div>
        <div className="mt-14">
          {POSTS.map((p) => (
            <a key={p.slug} href={`/blog/${p.slug}`} className="group block border-t border-hairline py-8 last:border-b">
              <div className="flex flex-wrap gap-x-3 text-[12px] text-faint">
                {p.series && <span className="font-bold uppercase tracking-[0.1em] text-accent">{p.series} {p.seriesNo && `#${p.seriesNo}`}</span>}
                <time dateTime={p.date}>{formatDate(p.date)}</time>
                <span>· {readingTime(p)} min read</span>
              </div>
              <h2 className="mt-2.5 text-2xl font-semibold leading-snug tracking-tight text-ink group-hover:text-accent sm:text-[1.75rem]">{p.title}</h2>
              <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-subtle" style={{ fontFamily: SERIF }}>{p.dek}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent">
                Read <FiArrowRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function Blog({ path }) {
  const slug = path.split("/")[2];
  if (!slug) return <Index />;
  const post = POSTS.find((p) => p.slug === slug);
  if (post) return <Post post={post} />;
  return (
    <main id="main" className="mx-auto max-w-2xl px-6 py-32">
      <h1 className="text-3xl font-semibold tracking-tight">Post not found</h1>
      <a href="/blog" className="mt-6 inline-block text-accent">&larr; All posts</a>
    </main>
  );
}
