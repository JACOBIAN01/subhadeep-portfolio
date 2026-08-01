// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { PROJECTS, FLAGSHIP_PROJECT } from "../data/profileData";
import { FaGithub, FaExternalLinkAlt, FaFileAlt } from "react-icons/fa";

const EASE = [0.16, 1, 0.3, 1];

const PROJECT_DETAILS = {
  "SmartReviewX: Project Review Automation": {
    title: "SmartReviewX: Project Review Automation",
    desc: `SmartReviewX automates Codingal project reviews using Python, Flask, and Selenium WebDriver, cutting review time from 3 mins to 6–7 seconds.`,
    features: [
      "AI-assisted review pipeline",
      "Secure educator login",
      "Socket.IO live progress tracking",
      "Auto feedback generation",
    ],
    stack: ["Python", "Flask", "Selenium", "WebSocket", "Tailwind"],
    link: "https://github.com/JACOBIAN01/SmartReviewX",
  },
  "LifeDrop: Blood Donation Platform": {
    title: "LifeDrop: Blood Donation Platform",
    desc: `LifeDrop connects blood donors and hospitals in real time. Four role-based dashboards (User, Donor, Hospital/Organization, and Admin) each get a tailored view, and urgent requests trigger automated WhatsApp alerts via Firebase Cloud Functions and Twilio.`,
    image:
      "https://github.com/user-attachments/assets/945ef41a-e043-44dd-82f4-f48a19205354",
    features: [
      "Real-time blood request feed",
      "Role-based dashboards for User, Donor, Hospital/Org, and Admin",
      "Event-driven WhatsApp alerts (Firebase Cloud Functions + Twilio)",
      "Firebase authentication and session management",
    ],
    stack: ["React", "Firebase", "Tailwind", "Twilio API"],
    link: "https://github.com/JACOBIAN01/LifeDrop",
    live: "https://life-drop-xi.vercel.app/",
  },
  "AEVM: Advanced Electronic Voting Machine": {
    title: "AEVM: Advanced Electronic Voting Machine",
    desc: `IoT-powered voting system integrating Raspberry Pi hardware, Firebase, and React dashboards for secure, transparent elections.`,
    features: [
      "Biometric voter auth",
      "Realtime Firestore sync",
      "Live analytics dashboard",
      "Secure Raspberry Pi backend",
    ],
    stack: ["React", "Firebase", "IoT", "Python"],
    link: "https://github.com/JACOBIAN01",
  },
  "Jana Academy: Full-Stack Learning Platform": {
    title: "Jana Academy: Full-Stack Learning Platform",
    desc: `Jana Academy is a live academy platform: Google OAuth login, a real-time Quiz Arena for hosting sessions, and a role-based admin dashboard (Super Admin/Admin/User) for managing users, quiz results, and feedback.`,
    features: [
      "Google OAuth sign-in",
      "Real-time Quiz Arena with live sessions and a questions archive",
      "Role-based admin dashboard: Users, Quiz & Answers, Results, Feedback Log",
      "Production monitoring via Vercel Web Analytics and Core Web Vitals",
    ],
    stack: ["React", "Firebase Auth", "Vercel Analytics"],
    link: "https://github.com/JACOBIAN01/jana-academy-web",
    live: "https://jana-academy.vercel.app/",
  },
};

const VITAL_LABELS = {
  good: "text-emerald-600 bg-emerald-50",
  poor: "text-rose-600 bg-rose-50",
};

export default function Projects() {
  const allProjects = PROJECTS.map((p) => {
    const d = PROJECT_DETAILS[p.name];
    return {
      title: d.title,
      desc: d.desc,
      image: d.image,
      features: d.features,
      tags: d.stack,
      codeLink: d.link,
      liveLink: d.live,
      publication: p.publication,
      stats: p.stats,
      webVitals: p.webVitals,
    };
  });

  return (
    <section id="projects" className="bg-canvas-alt">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <SectionTitle kicker="Selected Work" title="Projects" />

        {/* --- Flagship case study --- */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="bg-white border border-hairline rounded-[28px] p-8 md:p-14 mb-8"
        >
          <div className="text-sm text-accent font-medium mb-3">
            Flagship Project
          </div>
          <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink leading-tight">
            {FLAGSHIP_PROJECT.name}
          </h3>
          <p className="mt-5 text-lg text-subtle leading-relaxed max-w-2xl">
            {FLAGSHIP_PROJECT.tagline}
          </p>

          <p className="mt-8 text-[15px] text-ink leading-relaxed max-w-2xl border-l-2 border-hairline pl-5">
            {FLAGSHIP_PROJECT.problem}
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {FLAGSHIP_PROJECT.pipelines.map((pipeline, i) => (
              <div
                key={pipeline.name}
                className="rounded-2xl bg-canvas-alt p-6 flex flex-col"
              >
                <div className="text-sm text-subtle font-medium mb-2">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h4 className="text-base font-semibold text-ink">
                  {pipeline.name}
                </h4>
                <p className="mt-3 text-sm text-subtle leading-relaxed flex-1">
                  {pipeline.desc}
                </p>
                <p className="mt-4 text-sm text-ink font-medium">
                  {pipeline.stat}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {FLAGSHIP_PROJECT.stack.map((t) => (
              <span
                key={t}
                className="border border-hairline px-3 py-1 rounded-full text-xs text-subtle"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={FLAGSHIP_PROJECT.repo}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors duration-300"
          >
            <FaGithub aria-hidden="true" /> View Code
          </a>
        </motion.div>

        {/* --- Standard project grid --- */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {allProjects.map((p, index) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: (index % 2) * 0.1 }}
              className="bg-white border border-hairline rounded-[28px] overflow-hidden flex flex-col transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
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

                {p.features && (
                  <ul className="mt-6 space-y-2">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-sm text-subtle leading-relaxed"
                      >
                        <span className="mt-2 h-1 w-1 rounded-full bg-faint shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

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

                {p.webVitals && (
                  <div className="mt-6 border-t border-hairline pt-6">
                    <div className="text-xs font-medium text-subtle mb-3 uppercase tracking-wide">
                      Core Web Vitals
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.webVitals.map((v) => (
                        <span
                          key={v.k}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${VITAL_LABELS[v.status]}`}
                        >
                          {v.k} {v.v}
                        </span>
                      ))}
                    </div>
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

                {p.publication && (
                  <div className="mt-6 flex items-start gap-3 text-sm text-subtle italic">
                    <FaFileAlt aria-hidden="true" className="mt-0.5 shrink-0" />
                    <span>{p.publication}</span>
                  </div>
                )}

                <div className="mt-8 flex items-center gap-6">
                  <a
                    href={p.codeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors duration-300"
                  >
                    <FaGithub aria-hidden="true" /> View Code
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
