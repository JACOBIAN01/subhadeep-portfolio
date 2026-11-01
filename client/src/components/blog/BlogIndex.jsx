// /blog — the post list.
import "@fontsource-variable/source-serif-4";
import "./article.css";
import { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Footer from "../Footer";
import { POSTS, readingTime, formatDate } from "../../content/blog";
import { PROFILE } from "../../data/profileData";

export default function BlogIndex() {
  useEffect(() => {
    document.title = `Writing | ${PROFILE.name}`;
  }, []);

  return (
    <>
      <header className="border-b border-hairline">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6 text-sm">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-subtle transition-colors duration-300 hover:text-ink"
          >
            <FiArrowLeft size={14} aria-hidden="true" /> Portfolio
          </a>
          <a href="/" className="font-medium text-ink">
            {PROFILE.name}
          </a>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-3xl px-6 pb-20 pt-16 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-sans text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Writing
          </h1>
          <p className="mt-5 max-w-xl font-reading text-[1.25rem] leading-relaxed text-subtle">
            Long-form explainers of one trending tech story a week, from zero, with diagrams you
            can watch and demos you can run.
          </p>
        </motion.div>

        <div className="mt-14 flex flex-col">
          {POSTS.map((post, i) => (
            <motion.a
              key={post.slug}
              href={`/blog/${post.slug}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group border-t border-hairline py-8 last:border-b"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[12px] text-faint">
                {post.series && (
                  <span className="font-bold uppercase tracking-[0.1em] text-accent">
                    {post.series} {post.seriesNo && `#${post.seriesNo}`}
                  </span>
                )}
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{readingTime(post)} min read</span>
              </div>

              <h2 className="mt-2.5 font-sans text-2xl font-semibold leading-snug tracking-tight text-ink transition-colors duration-300 group-hover:text-accent sm:text-[1.75rem]">
                {post.title}
              </h2>

              <p className="mt-3 max-w-2xl font-reading text-[1.0625rem] leading-relaxed text-subtle">
                {post.dek}
              </p>

              <span className="mt-4 inline-flex items-center gap-1.5 font-sans text-[13px] font-medium text-accent">
                Read
                <FiArrowRight
                  size={13}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </span>
            </motion.a>
          ))}
        </div>

        {POSTS.length === 0 && (
          <p className="mt-10 font-sans text-subtle">First post coming shortly.</p>
        )}
      </main>

      <Footer />
    </>
  );
}
