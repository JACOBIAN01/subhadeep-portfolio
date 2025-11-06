// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { PROJECTS } from "../data/profileData";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

import ReviewDemo from "../assets/ReviewDemo.mp4";
import LifeDropDemo from "../assets/LifeDrop_Demo.mp4";
import AEVMDemo from "../assets/AEVM_Demo.mp4";

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
    <section id="projects" className="mx-auto max-w-7xl px-6 py-16 space-y-20">
      <h2 className="text-3xl font-semibold text-cyan-300 mb-8 text-center">
         Projects
      </h2>

      {PROJECTS.map((p, index) => {
        const project = modalContent[p.name];
        const isEven = index % 2 === 0; // Alternate layout (video left/right)

        return (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`flex flex-col ${
              isEven ? "md:flex-row" : "md:flex-row-reverse"
            } items-center gap-8 bg-white/10 border border-white/10 rounded-3xl shadow-xl backdrop-blur-lg p-6 md:p-10`}
          >
            {/* Video Section */}
            <motion.div
              className="flex-1 w-full overflow-hidden rounded-2xl shadow-lg border border-white/10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <video
                src={projectVideos[p.name]}
                controls
                autoPlay
                muted
                loop
                className="w-full h-64 md:h-80 object-cover rounded-2xl"
              />
            </motion.div>

            {/* Description Section */}
            <motion.div
              className="flex-1 text-white space-y-4"
              initial={{ opacity: 0, x: isEven ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold">{project.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {project.desc}
              </p>

              <div>
                <h4 className="font-semibold mb-1">✨ Features</h4>
                <ul className="list-disc list-inside text-white/70 text-sm">
                  {project.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-1">🛠 Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="border border-white/10 bg-white/5 px-2 py-1 rounded-lg text-xs text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-5 pt-2">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-blue-400 transition"
                >
                  <FaGithub /> View Code
                </a>

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm hover:text-green-400 transition"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </section>
  );
}
