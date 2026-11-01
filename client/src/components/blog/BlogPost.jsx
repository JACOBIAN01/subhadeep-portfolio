// A single post. Long-read layout: a narrow serif column, a reading-progress bar,
// and figures that break out wider than the text.
// The reading serif is imported here, not in main.jsx, so it only loads on /blog routes.
import "@fontsource-variable/source-serif-4";
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import Footer from "../Footer";
import Blocks from "./Blocks";
import { getPost, readingTime, formatDate } from "../../content/blog";
import { PROFILE } from "../../data/profileData";
import { SITE } from "../../data/caseMeta";
import self from "../../assets/self.webp";

function ProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-accent transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function BlogPost({ slug }) {
  const post = getPost(slug);

  useEffect(() => {
    if (post) document.title = `${post.title} | ${PROFILE.name}`;
  }, [post]);

  if (!post) {
    return (
      <main id="main" className="mx-auto max-w-2xl px-6 py-32">
        <h1 className="font-sans text-3xl font-semibold tracking-tight">Post not found</h1>
        <p className="mt-3 text-subtle">That link may be from a draft, or the slug changed.</p>
        <a href="/blog" className="mt-6 inline-block text-accent">
          &larr; All posts
        </a>
      </main>
    );
  }

  const mins = readingTime(post);
  const url = `${SITE}/blog/${post.slug}`;
  const share = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <>
      <ProgressBar />

      <header className="border-b border-hairline">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6 text-sm">
          <a
            href="/blog"
            className="inline-flex items-center gap-1.5 text-subtle transition-colors duration-300 hover:text-ink"
          >
            <FiArrowLeft size={14} aria-hidden="true" /> All posts
          </a>
          <a href="/" className="font-medium text-ink">
            {PROFILE.name}
          </a>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-[44rem] px-6 pb-20 pt-12 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {post.series && (
            <div className="font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-accent">
              {post.series} {post.seriesNo && `#${post.seriesNo}`}
            </div>
          )}

          <h1 className="mt-3 font-sans text-[2.1rem] font-semibold leading-[1.12] tracking-[-0.025em] text-ink sm:text-[2.75rem]">
            {post.title}
          </h1>

          <p className="mt-5 font-serif text-[1.3rem] leading-[1.5] text-subtle">{post.dek}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-hairline py-4">
            <img
              src={self}
              alt=""
              width="36"
              height="36"
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="font-sans text-[14px] font-medium text-ink">{PROFILE.name}</span>
            <span className="text-hairline" aria-hidden="true">
              ·
            </span>
            <time dateTime={post.date} className="font-sans text-[13px] text-subtle">
              {formatDate(post.date)}
            </time>
            <span className="text-hairline" aria-hidden="true">
              ·
            </span>
            <span className="font-sans text-[13px] text-subtle">{mins} min read</span>
            <a
              href={share}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 font-sans text-[13px] text-subtle transition-colors duration-300 hover:text-accent"
            >
              <FaLinkedin aria-hidden="true" /> Share
            </a>
          </div>
        </motion.div>

        <article className="article mt-10">
          <Blocks blocks={post.blocks} />
        </article>

        <div className="mt-16 rounded-3xl border border-hairline bg-canvas-alt p-6 sm:p-8">
          <div className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-faint">
            About {post.series || "this series"}
          </div>
          <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink">
            One trending tech story a week, explained from zero, with a demo you can run. Written
            for students and anyone who wants the mechanism rather than the headline.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-sans text-[13px] font-medium text-white transition-colors duration-300 hover:bg-black"
            >
              <FaLinkedin aria-hidden="true" /> Follow on LinkedIn
            </a>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 font-sans text-[13px] text-subtle transition-colors duration-300 hover:text-ink"
            >
              Read other posts
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
