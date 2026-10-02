// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import AutoplayVideo from "./AutoplayVideo";
import { PROJECTS, FLAGSHIP_PROJECTS } from "../data/profileData";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const EASE = [0.16, 1, 0.3, 1];

function slugify(title) {
  return title
    .split(":")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function Projects() {
  const allProjects = PROJECTS.map((p) => ({
    id: p.slug,
    title: p.name,
    desc: p.desc,
    image: p.image,
    tags: p.stack.slice(0, 6),
    codeLink: p.repo,
    liveLink: p.live,
    stats: p.stats,
  }));

  return (
    <section id="projects" className="bg-canvas-alt">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <SectionTitle kicker="Selected Work" title="Projects" />

        {/* --- Flagship case studies --- */}
        {FLAGSHIP_PROJECTS.map((project, fi) => (
          <motion.div
            key={project.name}
            id={slugify(project.name)}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="bg-white border border-hairline rounded-[28px] p-8 md:p-14 mb-8 scroll-mt-24"
          >
            <div className="text-sm text-accent font-medium mb-3">
              Flagship Project
            </div>
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink leading-tight">
              {project.name}
            </h3>
            <p className="mt-5 text-lg text-subtle leading-relaxed max-w-2xl">
              {project.tagline}
            </p>

            <p className="mt-8 text-[15px] text-ink leading-relaxed max-w-2xl border-l-2 border-hairline pl-5">
              {project.problem}
            </p>

            {project.demo?.length > 0 && (
              <div className="mt-10 grid sm:grid-cols-2 gap-4">
                {project.demo.map((clip, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-hairline overflow-hidden bg-canvas-alt"
                  >
                    <AutoplayVideo clip={clip} label={`${project.name} demo ${i + 1}`} />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {project.highlights.map((highlight, i) => (
                <div
                  key={highlight.name}
                  className="rounded-2xl bg-canvas-alt p-6 flex flex-col"
                >
                  <div className="text-sm text-subtle font-medium mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h4 className="text-base font-semibold text-ink">
                    {highlight.name}
                  </h4>
                  <p className="mt-3 text-sm text-subtle leading-relaxed flex-1">
                    {highlight.desc}
                  </p>
                  <p className="mt-4 text-sm text-ink font-medium">
                    {highlight.stat}
                  </p>
                </div>
              ))}
            </div>

            {project.design && (
              <div className="mt-10">
                <div className="text-sm text-accent font-medium mb-3">
                  Design Reasoning
                </div>
                <div className="space-y-4 text-[15px] text-ink leading-relaxed max-w-2xl border-l-2 border-hairline pl-5">
                  <p>{project.design.problem}</p>
                  <p>{project.design.decision}</p>
                  <p>{project.design.reasoning}</p>
                </div>
              </div>
            )}

            {project.stats?.length > 0 && (
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-hairline pt-8">
                {project.stats.map((s) => (
                  <div key={s.k}>
                    <div className="text-xl font-semibold text-ink">{s.v}</div>
                    <div className="text-xs text-subtle mt-1">{s.k}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="border border-hairline px-3 py-1 rounded-full text-xs text-subtle"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-6">
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors duration-300"
              >
                <FaGithub aria-hidden="true" /> View Code
              </a>

              <a
                href={`/work/${slugify(project.name)}`}
                className="inline-flex items-center gap-2 text-sm text-accent hover:text-ink transition-colors duration-300"
              >
                Read case study &rarr;
              </a>

              {project.marketplace && (
                <a
                  href={project.marketplace}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors duration-300"
                >
                  <FaExternalLinkAlt aria-hidden="true" /> View on Marketplace
                </a>
              )}
            </div>

            {fi === FLAGSHIP_PROJECTS.length - 1 && allProjects[0] && (
              <a
                href={`#${allProjects[0].id}`}
                className="mt-6 inline-flex items-center gap-2 text-sm text-subtle hover:text-accent transition-colors duration-300"
              >
                See more projects ↓
              </a>
            )}
          </motion.div>
        ))}

        {/* --- Standard project grid --- */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {allProjects.map((p, index) => (
            <motion.div
              key={p.title}
              id={p.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: (index % 2) * 0.1 }}
              className="bg-white border border-hairline rounded-[28px] overflow-hidden flex flex-col scroll-mt-24 transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              {p.image && (
                <div className="w-full h-48 overflow-hidden border-b border-hairline">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-8 md:p-10 flex flex-col flex-1">
                <div className="text-sm text-subtle font-medium mb-3">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-ink leading-tight">
                  {p.title}
                </h3>
                <p className="mt-4 text-[15px] text-subtle leading-relaxed">
                  {p.desc}
                </p>


                {p.stats && (
                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-hairline pt-6">
                    {p.stats.map((s) => (
                      <div key={s.k}>
                        <div className="text-xl font-semibold text-ink">
                          {s.v}
                        </div>
                        <div className="text-xs text-subtle mt-1">{s.k}</div>
                      </div>
                    ))}
                  </div>
                )}


                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-hairline px-3 py-1 rounded-full text-xs text-subtle"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-6">
                  <a
                    href={p.codeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors duration-300"
                  >
                    <FaGithub aria-hidden="true" /> View Code
                  </a>

                  <a
                    href={`/work/${p.id}`}
                    className="flex items-center gap-2 text-sm text-accent hover:text-ink transition-colors duration-300"
                  >
                    Case study &rarr;
                  </a>

                  {p.liveLink && (
                    <a
                      href={p.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors duration-300"
                    >
                      <FaExternalLinkAlt aria-hidden="true" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
