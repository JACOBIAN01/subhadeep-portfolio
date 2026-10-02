import { useEffect } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import AutoplayVideo from "./AutoplayVideo";
import Footer from "./Footer";
import { FLAGSHIP_PROJECTS, PROJECTS, PROFILE } from "../data/profileData";
import { getCaseMeta } from "../data/caseMeta";

const slugify = (name) =>
  name
    .split(":")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function findCase(slug) {
  const flagship = FLAGSHIP_PROJECTS.find((p) => slugify(p.name) === slug);
  if (flagship) {
    return {
      name: flagship.name,
      summary: flagship.tagline,
      problem: flagship.problem,
      points: flagship.highlights.map((h) => ({ title: h.name, body: h.desc, note: h.stat })),
      stats: flagship.stats,
      stack: flagship.stack,
      repo: flagship.repo,
      extra: flagship.marketplace && { href: flagship.marketplace, label: "VS Code Marketplace" },
      demo: flagship.demo,
    };
  }
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return null;
  return {
    name: p.name,
    summary: p.desc,
    points: p.features.map((f) => ({ body: f })),
    stats: p.stats,
    stack: p.stack,
    repo: p.repo,
    extra: p.live && { href: p.live, label: "Live demo" },
  };
}

export default function CaseStudy({ slug }) {
  const study = findCase(slug);
  const meta = getCaseMeta(slug);

  useEffect(() => {
    if (meta) document.title = `${meta.title} | ${PROFILE.name}`;
  }, [meta]);

  if (!study) {
    return (
      <main id="main" className="mx-auto max-w-3xl px-6 py-32">
        <h1 className="text-3xl font-semibold">Case study not found</h1>
        <a href="/#projects" className="mt-6 inline-block text-accent">
          &larr; Back to projects
        </a>
      </main>
    );
  }

  return (
    <>
      <header className="border-b border-hairline">
        <div className="mx-auto max-w-4xl px-6 h-14 flex items-center justify-between text-sm">
          <a href="/#projects" className="text-subtle hover:text-ink transition-colors duration-300">
            &larr; All projects
          </a>
          <a href="/" className="font-medium text-ink">
            {PROFILE.name}
          </a>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="text-sm font-medium text-accent mb-3">Case study</div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink leading-[1.1]">
          {study.name}
        </h1>
        <p className="mt-6 text-lg text-subtle leading-relaxed max-w-2xl">{study.summary}</p>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <a
            href={study.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors duration-300"
          >
            <FaGithub aria-hidden="true" /> View code
          </a>
          {study.extra && (
            <a
              href={study.extra.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors duration-300"
            >
              <FaExternalLinkAlt aria-hidden="true" /> {study.extra.label}
            </a>
          )}
        </div>

        {study.demo?.length > 0 && (
          <div className="mt-12 grid sm:grid-cols-2 gap-4">
            {study.demo.map((clip, i) => (
              <div key={i} className="rounded-2xl border border-hairline overflow-hidden bg-canvas-alt">
                <AutoplayVideo clip={clip} label={`${study.name} demo ${i + 1}`} />
              </div>
            ))}
          </div>
        )}

        {study.problem && (
          <section className="mt-14">
            <h2 className="text-sm font-medium tracking-wide uppercase text-subtle mb-4">The problem</h2>
            <p className="text-[17px] text-ink leading-relaxed max-w-2xl">{study.problem}</p>
          </section>
        )}

        <section className="mt-14">
          <h2 className="text-sm font-medium tracking-wide uppercase text-subtle mb-6">
            {study.problem ? "How it works" : "What it does"}
          </h2>
          <ul className="space-y-6">
            {study.points.map((pt, i) => (
              <li key={i} className="border-l-2 border-hairline pl-5">
                {pt.title && <h3 className="text-base font-semibold text-ink">{pt.title}</h3>}
                <p className="mt-1 text-[15px] text-subtle leading-relaxed">{pt.body}</p>
                {pt.note && <p className="mt-2 text-sm font-medium text-ink">{pt.note}</p>}
              </li>
            ))}
          </ul>
        </section>

        {study.stats?.length > 0 && (
          <section className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-hairline pt-8">
            {study.stats.map((s) => (
              <div key={s.k}>
                <div className="text-xl font-semibold text-ink">{s.v}</div>
                <div className="text-xs text-subtle mt-1">{s.k}</div>
              </div>
            ))}
          </section>
        )}

        <section className="mt-12 flex flex-wrap gap-2">
          {study.stack.map((t) => (
            <span key={t} className="border border-hairline px-3 py-1 rounded-full text-xs text-subtle">
              {t}
            </span>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
