// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import Marquee from "./Marquee";
import {
  TESTIMONIALS,
  TESTIMONIAL_TICKER,
  TESTIMONIAL_STATS,
} from "../data/profileData";

const EASE = [0.16, 1, 0.3, 1];

const RATING_STYLES = {
  Awesome: "text-emerald-600 bg-emerald-50",
  Good: "text-blue-600 bg-blue-50",
  Average: "text-amber-600 bg-amber-50",
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-canvas">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <SectionTitle kicker="Student Voices" title="What Students Say" />
        <p className="text-[15px] text-subtle -mt-8 mb-4 max-w-xl">
          Real feedback from live System Design and engineering sessions at
          Newton School of Technology.
        </p>
        <p className="text-sm text-accent font-medium mb-14">
          Curated from {TESTIMONIAL_STATS.total} lecture feedback responses (
          {TESTIMONIAL_STATS.period}) &middot; {TESTIMONIAL_STATS.positiveRate}
          % rated Awesome or Good
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.quote}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 3) * 0.08 }}
              className="bg-white border border-hairline rounded-3xl p-8 flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              <div
                className="text-5xl text-faint leading-none font-serif"
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <p className="mt-3 text-[15px] text-ink leading-relaxed flex-1">
                {t.quote}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${RATING_STYLES[t.rating]}`}
                >
                  {t.rating}
                </span>
                <span className="text-xs text-subtle">{t.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14">
          <Marquee duration={36} gap="gap-4">
            {TESTIMONIAL_TICKER.map((line) => (
              <TickerItem key={line} text={line} />
            ))}
            <div className="flex gap-4" aria-hidden="true" inert={true}>
              {TESTIMONIAL_TICKER.map((line) => (
                <TickerItem key={`dup-${line}`} text={line} />
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
}

function TickerItem({ text }) {
  return (
    <div className="shrink-0 flex items-center gap-2 border border-hairline rounded-full px-4 py-2 text-xs text-subtle whitespace-nowrap">
      <span className="h-1 w-1 rounded-full bg-faint shrink-0" aria-hidden="true" />
      {text}
    </div>
  );
}
