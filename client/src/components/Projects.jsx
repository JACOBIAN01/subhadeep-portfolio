// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { PROJECTS } from "../data/profileData";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

import ReviewDemo from "../assets/ReviewDemo.mp4";
import LifeDropDemo from "../assets/LifeDrop_Demo.mp4";
import AEVMDemo from "../assets/AEVM_Demo.mp4";

const EASE = [0.16, 1, 0.3, 1];

export default function Projects() {
  const projectVideos = {
    "SmartReviewX — Project Review Automation": ReviewDemo,
    "LifeDrop — Blood Donation Platform": LifeDropDemo,
    "AEVM — Advanced Electronic Voting Machine": AEVMDemo,
  };

  const modalContent = {
    "SmartReviewX — Project Review Automation": {
      title: "SmartReviewX — Project Review Automation",
      desc: `SmartReviewX automates Codingal project reviews using Python, Flask, and Selenium WebDriver — cutting review time from 3 mins to 6–7 seconds.`,
      features: [
        "AI-assisted review pipeline",
        "Secure educator login",
        "Socket.IO live progress tracking",
        "Auto feedback generation",
      ],
      stack: ["Python", "Flask", "Selenium", "WebSocket", "Tailwind"],
      link: "https://github.com/JACOBIAN01/SmartReviewX",
    },
    "LifeDrop — Blood Donation Platform": {
      title: "LifeDrop — Blood Donation Platform",
      desc: `LifeDrop connects blood donors and hospitals in real time, using Firebase Cloud Functions and Twilio alerts.`,
      features: [
        "Live blood request feed",
        "RBAC dashboards (Donor, Hospital, Admin)",
        "WhatsApp alerts via Twilio",
        "Firebase authentication",
      ],
      stack: ["React", "Firebase", "Tailwind", "Twilio API"],
      link: "https://github.com/JACOBIAN01/LifeDrop",
      live: "https://life-drop-xi.vercel.app/",
    },
    "AEVM — Advanced Electronic Voting Machine": {
      title: "AEVM — Advanced Electronic Voting Machine",
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
  };

  return (
    <section id="projects" className="bg-canvas-alt">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <SectionTitle kicker="Selected Work" title="Projects" />

        <div className="space-y-28 md:space-y-40">
          {PROJECTS.map((p, index) => {
            const project = modalContent[p.name];
            const isEven = index % 2 === 0;

            return (
              <div
                key={p.name}
                className={`flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-10 md:gap-16`}
              >
                {/* Media */}
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="flex-1 w-full overflow-hidden rounded-[28px] border border-hairline shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                >
                  <video
                    src={projectVideos[p.name]}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-64 md:h-96 object-cover"
                  />
                </motion.div>

                {/* Copy */}
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                  className="flex-1"
                >
                  <div className="text-sm text-subtle font-medium mb-3">
                    0{index + 1}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink leading-tight">
                    {project.title}
                  </h3>
                  <p className="mt-5 text-lg text-subtle leading-relaxed max-w-md">
                    {project.desc}
                  </p>

                  <div className="mt-8">
                    <h4 className="text-sm font-medium text-ink mb-3">
                      Features
                    </h4>
                    <ul className="space-y-2">
                      {project.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-[15px] text-subtle leading-relaxed"
                        >
                          <span className="mt-2.5 h-1 w-1 rounded-full bg-faint shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

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
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors duration-300"
                    >
                      <FaGithub /> View Code
                    </a>

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors duration-300"
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
