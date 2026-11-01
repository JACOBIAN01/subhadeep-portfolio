// Renders the block array of a post. Every block type here must also be handled by
// scripts/prerender.mjs, which emits the same content as plain HTML for crawlers.
import { Fragment } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { tokenize, slugId } from "../../content/inline";
import { getFigure } from "./registry";

/** Inline **bold**, `code` and [links](href). */
export function Inline({ text }) {
  return tokenize(text).map((t, i) => {
    if (t.k === "b") return <strong key={i}>{t.v}</strong>;
    if (t.k === "code") return <code key={i}>{t.v}</code>;
    if (t.k === "a")
      return (
        <a key={i} href={t.href} target="_blank" rel="noreferrer">
          {t.v}
        </a>
      );
    return <Fragment key={i}>{t.v}</Fragment>;
  });
}

const CALLOUT_STYLES = {
  documented: { bar: "#0066cc", bg: "#f5f9ff", label: "Documented" },
  ourbuild: { bar: "#6a3fc6", bg: "#f8f5ff", label: "Our build" },
  note: { bar: "#86868b", bg: "#f5f5f7", label: "Note" },
};

/** Figures sit outside the reading column so diagrams get room to breathe. */
function Figure({ caption, children }) {
  return (
    <figure className="not-prose lg:-mx-24">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function MissingFigure({ id, alt }) {
  return (
    <div className="rounded-2xl border border-dashed border-hairline bg-canvas-alt p-6 font-sans text-[13px] text-subtle">
      <strong className="text-ink">Figure “{id}” is not registered.</strong>
      <p className="mt-1">{alt}</p>
    </div>
  );
}

export default function Blocks({ blocks }) {
  return blocks.map((b, i) => {
    switch (b.t) {
      case "lead":
        return (
          <p key={i} className="lead">
            <Inline text={b.c} />
          </p>
        );

      case "p":
        return (
          <p key={i}>
            <Inline text={b.c} />
          </p>
        );

      case "h2":
        return (
          <h2 key={i} id={slugId(b.c)}>
            {b.c}
          </h2>
        );

      case "h3":
        return (
          <h3 key={i} id={slugId(b.c)}>
            {b.c}
          </h3>
        );

      case "ul":
        return (
          <ul key={i}>
            {b.items.map((it, j) => (
              <li key={j}>
                <Inline text={it} />
              </li>
            ))}
          </ul>
        );

      case "ol":
        return (
          <ol key={i}>
            {b.items.map((it, j) => (
              <li key={j}>
                <Inline text={it} />
              </li>
            ))}
          </ol>
        );

      case "quote":
        return (
          <blockquote
            key={i}
            className="my-10 border-l-2 border-ink pl-6 text-[1.4rem] leading-[1.45] text-ink"
          >
            <Inline text={b.c} />
            {b.cite && (
              <span className="mt-2 block font-sans text-[13px] font-medium text-faint">
                {b.cite}
              </span>
            )}
          </blockquote>
        );

      case "callout": {
        const s = CALLOUT_STYLES[b.kind] || CALLOUT_STYLES.note;
        return (
          <aside
            key={i}
            className="not-prose my-8 rounded-2xl p-5 font-sans"
            style={{ background: s.bg, borderLeft: `3px solid ${s.bar}` }}
          >
            <div
              className="text-[11px] font-bold uppercase tracking-[0.1em]"
              style={{ color: s.bar }}
            >
              {s.label}
            </div>
            <p className="mt-2 text-[15px] leading-relaxed text-ink">
              <Inline text={b.c} />
            </p>
            {b.src && <p className="mt-2 text-[12px] text-faint">Source: {b.src}</p>}
          </aside>
        );
      }

      case "timeline":
        return (
          <ol key={i} className="not-prose my-8 flex list-none flex-col gap-0 p-0 font-sans">
            {b.items.map((it, j) => (
              <li key={j} className="relative flex gap-4 pb-6 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-[5px] top-2 w-px bg-hairline last:hidden"
                  style={{ display: j === b.items.length - 1 ? "none" : undefined }}
                />
                <span
                  aria-hidden="true"
                  className="relative z-10 mt-1.5 h-2.5 w-2.5 flex-none rounded-full bg-accent"
                />
                <div>
                  <div className="text-[13px] font-bold tracking-tight text-accent">{it.when}</div>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink">
                    <Inline text={it.what} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        );

      case "code":
        return (
          <figure key={i} className="not-prose my-8">
            <pre className="overflow-x-auto rounded-2xl border border-hairline bg-white p-5 text-[13px] leading-relaxed">
              <code className="font-mono">{b.code}</code>
            </pre>
            {b.caption && <figcaption>{b.caption}</figcaption>}
          </figure>
        );

      case "diagram":
      case "demo": {
        const Figure_ = getFigure(b.id);
        return (
          <Figure key={i} caption={b.caption}>
            {Figure_ ? <Figure_ /> : <MissingFigure id={b.id} alt={b.alt} />}
          </Figure>
        );
      }

      case "keytakeaway":
        return (
          <aside
            key={i}
            className="not-prose my-10 rounded-3xl border border-ink/10 bg-canvas-alt p-6 font-sans"
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-faint">
              {b.title || "In one card"}
            </div>
            <ul className="mt-4 flex list-none flex-col gap-3 p-0">
              {b.items.map((it, j) => (
                <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                  <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                  <span>
                    <Inline text={it} />
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        );

      case "sources":
        return (
          <aside key={i} className="not-prose my-10 font-sans">
            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-faint">
              Sources
            </div>
            <ul className="mt-3 flex list-none flex-col gap-2 p-0">
              {b.items.map((it, j) => (
                <li key={j} className="text-[14px] leading-relaxed">
                  <a
                    href={it.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-subtle underline decoration-hairline underline-offset-4 transition-colors duration-300 hover:text-ink"
                  >
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        );

      case "divider":
        return (
          <div key={i} className="my-12 text-center text-faint" aria-hidden="true">
            ···
          </div>
        );

      default:
        return null;
    }
  });
}
