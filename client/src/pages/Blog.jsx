// The blog. /blog lists every post; /blog/<slug> shows one post.
// Each post is one JSON file: src/content/blog/<slug>.json (file name = slug).
// The post format is described in CLAUDE.md at the repo root.
import { Component, useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import BlogFigure from "../components/BlogFigures";
import { PROFILE } from "../data/profileData";
import { SITE } from "../data/caseMeta";
import {
  BLOG_TAGLINE,
  blocksOf,
  isPublishable,
  newestFirst,
  slugFromFileName,
  summarize,
} from "../data/blogMeta";
import { slugify } from "../utils/slugify";
import self from "../assets/self.webp";

/* ------------------------------------------------------------------ loading posts */
// Which posts exist and their URLs follow src/data/blogMeta.js, the same rules the build
// uses, so the list, the post pages and the sitemap always agree.

// Vite gives each JSON file its own small download, fetched only when asked for.
// So a post page downloads just that post.
const POST_FILES = import.meta.glob("../content/blog/*.json", { import: "default" });

async function loadPost(slug) {
  const loadFile = POST_FILES[`../content/blog/${slug}.json`];
  if (!loadFile) return null;
  const post = await loadFile();
  return isPublishable(post) ? { ...post, slug } : null;
}

// The /blog list. In production it reads blog/posts.json, a small summary the build writes,
// so the list never downloads whole posts. The dev server has no build step, so there it
// reads the post files directly; a file that fails to load is skipped, not fatal.
async function loadPostList() {
  if (!import.meta.env.DEV) {
    const response = await fetch("/blog/posts.json");
    return response.ok ? response.json() : [];
  }

  const results = await Promise.allSettled(
    Object.entries(POST_FILES).map(async ([path, loadFile]) => ({
      post: await loadFile(),
      slug: slugFromFileName(path),
    }))
  );
  return results
    .filter((result) => result.status === "fulfilled" && isPublishable(result.value.post))
    .map((result) => summarize(result.value.post, result.value.slug))
    .sort(newestFirst);
}

/* ------------------------------------------------------------------ small helpers */

const SERIF = 'Charter, "Iowan Old Style", "Source Serif 4", Georgia, "Times New Roman", serif';
const EASE = [0.16, 1, 0.3, 1];

function formatDate(isoDate) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

// Inline formatting inside any text: **bold**, `code` and [link text](https://...).
// Only complete pairs count: an unclosed "**" is left as plain text.
const INLINE_PATTERN = /\*\*(.+?)\*\*|`(.+?)`|\[(.+?)\]\((.+?)\)/g;

// The same text with the formatting marks removed: "The **real** bug" -> "The real bug".
function plainText(text) {
  if (typeof text !== "string") return "";
  return text.replace(INLINE_PATTERN, (whole, bold, code, linkText) => bold || code || linkText);
}

// Anchor ids for every heading in a post. Repeated headings get "-2", "-3", ... so each
// link jumps to the right place. Returns a list matching the blocks, by position.
function headingIds(blocks) {
  const timesSeen = {};
  return blocks.map((block) => {
    if (!block || (block.t !== "h2" && block.t !== "h3")) return null;
    const base = slugify(plainText(block.c)) || "section";
    timesSeen[base] = (timesSeen[base] || 0) + 1;
    return timesSeen[base] === 1 ? base : `${base}-${timesSeen[base]}`;
  });
}

function Inline({ text }) {
  const source = typeof text === "string" ? text : "";
  const parts = [];
  let lastEnd = 0;

  for (const match of source.matchAll(INLINE_PATTERN)) {
    const [whole, bold, code, linkText, linkHref] = match;
    parts.push(source.slice(lastEnd, match.index));
    if (bold) parts.push(<strong key={match.index}>{bold}</strong>);
    else if (code) parts.push(<code key={match.index}>{code}</code>);
    else
      parts.push(
        <a key={match.index} href={linkHref} target="_blank" rel="noreferrer">
          {linkText}
        </a>
      );
    lastEnd = match.index + whole.length;
  }

  parts.push(source.slice(lastEnd));
  return parts;
}

// If one block has bad data, hide just that block instead of crashing the whole page.
class SkipIfBroken extends Component {
  state = { broken: false };
  static getDerivedStateFromError() {
    return { broken: true };
  }
  render() {
    return this.state.broken ? null : this.props.children;
  }
}

/* ------------------------------------------------------------------ article styles */

// Long-read typography. Only elements marked "blog-prose" get it, so callouts, the timeline,
// figures and sources keep their own styles.
const ARTICLE_CSS = `
.blog-prose { font-family: ${SERIF}; font-size: 1.3125rem; line-height: 1.75; color: #27272a; margin-top: 1.6em; }
.blog-prose.lead { font-size: 1.5rem; line-height: 1.55; color: var(--color-ink); margin-top: 0; }
h2.blog-prose, h3.blog-prose { font-family: var(--font-sans); font-weight: 600; color: var(--color-ink); scroll-margin-top: 5rem; }
h2.blog-prose { font-size: 1.875rem; line-height: 1.22; letter-spacing: -0.022em; margin-top: 2.2em; }
h3.blog-prose { font-size: 1.375rem; line-height: 1.3; letter-spacing: -0.018em; margin-top: 1.8em; }
h2.blog-prose + .blog-prose, h3.blog-prose + .blog-prose { margin-top: 0.7em; }
ul.blog-prose, ol.blog-prose { padding-left: 1.6em; display: flex; flex-direction: column; gap: 0.85em; }
ul.blog-prose { list-style: disc; }
ol.blog-prose { list-style: decimal; }
.blog-prose li::marker { color: var(--color-faint); }
blockquote.blog-prose { margin-top: 2.5rem; margin-bottom: 2.5rem; border-left: 2px solid var(--color-ink); padding-left: 1.5rem; font-size: 1.4rem; line-height: 1.45; color: var(--color-ink); }
.blog-prose a { text-decoration: underline; text-decoration-color: var(--color-hairline); text-underline-offset: 3px; }
.blog-prose a:hover { text-decoration-color: var(--color-accent); }
.blog-prose strong { font-weight: 600; color: var(--color-ink); }
.blog-prose code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.86em; background: var(--color-canvas-alt); border: 1px solid var(--color-hairline); border-radius: 5px; padding: 0.1em 0.36em; }
@media (max-width: 640px) {
  .blog-prose { font-size: 1.1875rem; line-height: 1.7; }
  .blog-prose.lead { font-size: 1.3125rem; }
}
`;

/* ------------------------------------------------------------------ blocks */

const CALLOUT_STYLES = {
  documented: { color: "#0066cc", background: "#f5f9ff", label: "Documented" },
  ourbuild: { color: "#6a3fc6", background: "#f8f5ff", label: "Our build" },
  note: { color: "#86868b", background: "#f5f5f7", label: "Note" },
};

function SmallLabel({ children }) {
  return (
    <div className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-faint">
      {children}
    </div>
  );
}

function Callout({ block }) {
  const style = CALLOUT_STYLES[block.kind] || CALLOUT_STYLES.note;
  return (
    <aside
      className="mt-8 rounded-2xl p-5 font-sans"
      style={{ background: style.background, borderLeft: `3px solid ${style.color}` }}
    >
      <div className="text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: style.color }}>
        {style.label}
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-ink">
        <Inline text={block.c} />
      </p>
      {block.src && <p className="mt-2 text-[12px] text-faint">Source: {block.src}</p>}
    </aside>
  );
}

function Timeline({ items }) {
  return (
    <ol className="mt-8 font-sans">
      {items.map((item, i) => (
        <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
          {i < items.length - 1 && <span className="absolute bottom-0 left-[5px] top-3 w-px bg-hairline" />}
          <span className="relative mt-1.5 h-2.5 w-2.5 flex-none rounded-full bg-accent" />
          <div>
            <div className="text-[13px] font-bold text-accent">{item.when}</div>
            <p className="mt-1 text-[15px] leading-relaxed text-ink">
              <Inline text={item.what} />
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Figure({ block }) {
  // Only the interactive "gate" figure is useful to a screen reader as-is. For the
  // animated ones, the reader hears the written description (`alt`) instead.
  const interactive = block.kind === "gate";
  return (
    <figure className="mt-10 lg:-mx-24">
      {block.alt && <p className="sr-only">{block.alt}</p>}
      <motion.div
        aria-hidden={!interactive}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <BlogFigure spec={block} />
      </motion.div>
      {block.caption && (
        <figcaption className="mt-3.5 text-center font-sans text-[13px] leading-normal text-faint">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

function Block({ block, headingId }) {
  const items = Array.isArray(block.items) ? block.items : [];

  switch (block.t) {
    case "lead":
      return <p className="blog-prose lead"><Inline text={block.c} /></p>;
    case "p":
      return <p className="blog-prose"><Inline text={block.c} /></p>;
    case "h2":
      return <h2 className="blog-prose" id={headingId}><Inline text={block.c} /></h2>;
    case "h3":
      return <h3 className="blog-prose" id={headingId}><Inline text={block.c} /></h3>;
    case "ul":
      return <ul className="blog-prose">{items.map((item, i) => <li key={i}><Inline text={item} /></li>)}</ul>;
    case "ol":
      return <ol className="blog-prose">{items.map((item, i) => <li key={i}><Inline text={item} /></li>)}</ol>;
    case "quote":
      return <blockquote className="blog-prose"><Inline text={block.c} /></blockquote>;
    case "callout":
      return <Callout block={block} />;
    case "timeline":
      return <Timeline items={items} />;
    case "code":
      return (
        <pre className="mt-8 overflow-x-auto rounded-2xl border border-hairline bg-white p-5 text-[13px] leading-relaxed">
          <code>{block.code}</code>
        </pre>
      );
    case "figure":
      return <Figure block={block} />;
    case "keytakeaway":
      return (
        <aside className="mt-10 rounded-3xl border border-ink/10 bg-canvas-alt p-6 font-sans">
          <SmallLabel>{block.title || "In one card"}</SmallLabel>
          <ul className="mt-4 flex flex-col gap-3">
            {items.map((item, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                <span><Inline text={item} /></span>
              </li>
            ))}
          </ul>
        </aside>
      );
    case "sources":
      return (
        <aside className="mt-10 font-sans">
          <SmallLabel>Sources</SmallLabel>
          <ul className="mt-3 flex flex-col gap-2">
            {items.map((item, i) => (
              <li key={i} className="text-[14px]">
                <a href={item.href} target="_blank" rel="noreferrer" className="text-subtle hover:text-ink">
                  {item.label}
                </a>
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

/* ------------------------------------------------------------------ pages */

function ReadingProgress() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let waitingForFrame = false;

    function update() {
      waitingForFrame = false;
      const page = document.documentElement;
      const scrollable = page.scrollHeight - page.clientHeight;
      setPercent(scrollable > 0 ? Math.round((page.scrollTop / scrollable) * 1000) / 10 : 0);
    }

    // Scroll and resize can fire many times per frame; redraw at most once per frame.
    function scheduleUpdate() {
      if (waitingForFrame) return;
      waitingForFrame = true;
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-0.5" aria-hidden="true">
      <div className="h-full bg-accent" style={{ width: `${percent}%` }} />
    </div>
  );
}

function SeriesLabel({ post }) {
  if (!post.series) return null;
  return (
    <span className="font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-accent">
      {post.series} {post.seriesNo && `#${post.seriesNo}`}
    </span>
  );
}

function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-2xl px-6 py-32">
      <h1 className="text-3xl font-semibold tracking-tight">Post not found</h1>
      <a href="/blog" className="mt-6 inline-block text-accent">&larr; All posts</a>
    </main>
  );
}

function PostPage({ slug }) {
  const [post, setPost] = useState(undefined); // undefined = loading, null = not found

  useEffect(() => {
    loadPost(slug).then(setPost).catch(() => setPost(null));
  }, [slug]);

  useEffect(() => {
    if (post) document.title = `${post.title} | ${PROFILE.name}`;
  }, [post]);

  if (post === undefined) return null;
  if (post === null) return <NotFound />;

  // The header uses the same tidy summary as the /blog list (plain text only), and each
  // block is drawn inside SkipIfBroken, so odd data in the file can't crash the page.
  const info = summarize(post, slug);
  const blocks = blocksOf(post);
  const ids = headingIds(blocks);
  const postUrl = `${SITE}/blog/${slug}`;
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;

  return (
    <>
      <style>{ARTICLE_CSS}</style>
      <ReadingProgress />
      <PageHeader backHref="/blog" backLabel="All posts" />

      <main id="main" className="mx-auto max-w-[44rem] px-6 pb-20 pt-12 sm:pt-16">
        <SeriesLabel post={info} />
        <h1 className="mt-3 text-[2.1rem] font-semibold leading-[1.12] tracking-[-0.025em] text-ink sm:text-[2.75rem]">
          {info.title}
        </h1>
        {info.dek && (
          <p className="mt-5 text-[1.3rem] leading-[1.5] text-subtle" style={{ fontFamily: SERIF }}>
            {info.dek}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-hairline py-4 text-[13px] text-subtle">
          <img src={self} alt="" width="36" height="36" className="h-9 w-9 rounded-full object-cover" />
          <span className="text-[14px] font-medium text-ink">{PROFILE.name}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={info.date}>{formatDate(info.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{info.minutes} min read</span>
          <a href={shareUrl} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1.5 hover:text-accent">
            <FaLinkedin aria-hidden="true" /> Share
          </a>
        </div>

        <article className="mt-10">
          {blocks.map((block, i) =>
            block && typeof block === "object" ? (
              <SkipIfBroken key={i}>
                <Block block={block} headingId={ids[i]} />
              </SkipIfBroken>
            ) : null
          )}
        </article>

        <div className="mt-16 rounded-3xl border border-hairline bg-canvas-alt p-6 sm:p-8">
          <SmallLabel>About {info.series || "this series"}</SmallLabel>
          <p className="mt-3 text-[15px] leading-relaxed text-ink">
            One trending tech story a week, explained from zero, with a demo you can try. Written for
            students and anyone who wants the mechanism rather than the headline.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-[13px]">
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-medium text-white hover:bg-black">
              <FaLinkedin aria-hidden="true" /> Follow on LinkedIn
            </a>
            <a href="/blog" className="rounded-full border border-hairline px-4 py-2 text-subtle hover:text-ink">
              Read other posts
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.title = `Writing | ${PROFILE.name}`;
    loadPostList().then(setPosts).catch(() => setPosts([]));
  }, []);

  return (
    <>
      <PageHeader backHref="/" backLabel="Portfolio" />
      <main id="main" className="mx-auto max-w-3xl px-6 pb-20 pt-16 sm:pt-24">
        <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Writing</h1>
        <p className="mt-5 max-w-xl text-[1.25rem] leading-relaxed text-subtle" style={{ fontFamily: SERIF }}>
          {BLOG_TAGLINE}
        </p>

        <div className="mt-14">
          {posts.map((post) => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="group block border-t border-hairline py-8 last:border-b">
              <div className="flex flex-wrap gap-x-3 text-[12px] text-faint">
                <SeriesLabel post={post} />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>· {post.minutes} min read</span>
              </div>
              <h2 className="mt-2.5 text-2xl font-semibold leading-snug tracking-tight text-ink group-hover:text-accent sm:text-[1.75rem]">
                {post.title}
              </h2>
              {post.dek && (
                <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-subtle" style={{ fontFamily: SERIF }}>
                  {post.dek}
                </p>
              )}
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent">
                Read <FiArrowRight size={13} aria-hidden="true" />
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
  return slug ? <PostPage slug={slug} /> : <IndexPage />;
}
