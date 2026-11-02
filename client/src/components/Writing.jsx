// The "Writing" section on the home page: the newest blog posts as cards.
// Clicking a card opens that post. New posts appear on their own: the cards read the
// small post list the build writes (see src/data/blogList.js), never whole posts.
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import SectionTitle from "./SectionTitle";
import { formatDate, loadPostList } from "../data/blogList";

const EASE = [0.16, 1, 0.3, 1];
const CARDS_SHOWN = 3;

function PostCard({ post, index }) {
  return (
    <motion.a
      href={`/blog/${post.slug}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.1 }}
      className="group flex flex-col rounded-2xl border border-hairline bg-white p-5 md:p-6 transition-shadow duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {post.series && (
        <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
          {post.series} {post.seriesNo && `#${post.seriesNo}`}
        </div>
      )}
      <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
        {post.title}
      </h3>
      {post.dek && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-subtle">{post.dek}</p>
      )}

      {/* Pushes the date row to the bottom so cards in a row line up. */}
      <div className="flex-1" />
      <div className="mt-4 flex items-center justify-between gap-4 border-t border-hairline pt-3 text-xs text-subtle">
        <span>
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.minutes} min read
        </span>
        <span className="inline-flex items-center gap-1 text-[13px] font-medium text-accent">
          Read <FiArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.a>
  );
}

export default function Writing() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPostList()
      .then((list) => setPosts(list.slice(0, CARDS_SHOWN)))
      .catch(() => setPosts([]));
  }, []);

  // The section appears only once the post list has loaded, too late for the browser's own
  // jump to "#writing". So when the page was opened at /#writing, scroll here ourselves.
  useEffect(() => {
    if (posts.length > 0 && window.location.hash === "#writing") {
      document.getElementById("writing")?.scrollIntoView();
    }
  }, [posts.length]);

  // Nothing published yet (or the list couldn't load): show no empty section.
  if (posts.length === 0) return null;

  return (
    <section id="writing" className="bg-canvas-alt">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <SectionTitle
          kicker="Writing"
          title="Tech stories, explained from zero"
          right={
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors duration-300 hover:text-ink"
            >
              See all posts <FiArrowRight aria-hidden="true" />
            </a>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
