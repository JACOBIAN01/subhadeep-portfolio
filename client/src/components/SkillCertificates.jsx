/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useState } from "react";
import SectionTitle from "./SectionTitle";
import { SKILL_CERTIFICATES } from "../data/profileData";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function SkillCertificates() {
  const [isHovered, setIsHovered] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  return (
    <section id="skill-certificates" className="mx-auto max-w-7xl px-6 py-16">
      <SectionTitle kicker="Upskilling" title="Skill Certificates" />

      <h3 className="text-xl font-semibold text-white/80 mt-10 mb-6 text-center">
        📜 Online Learning & Course Achievements
      </h3>

      {/* --- Infinite Smooth Certificates Carousel --- */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex gap-8"
          animate={isHovered ? { x: 0 } : { x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 22,
            repeat: Infinity,
          }}
        >
          {[...SKILL_CERTIFICATES, ...SKILL_CERTIFICATES].map((cert, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="shrink-0 w-[320px] md:w-[400px] bg-white/15 border border-white/10 rounded-2xl backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Certificate Image */}
              <div className="w-full h-48 rounded-t-2xl overflow-hidden">
                <img
                  src={cert.img}
                  alt={cert.title}
                  className="w-full h-full object-cover"
                  draggable="false"
                />
              </div>

              {/* Certificate Content */}
              <div className="p-5 text-white space-y-2">
                <h4 className="text-lg font-semibold text-white/90">
                  {cert.title}
                </h4>
                <div className="text-sm text-white/60">
                  {cert.platform} • {cert.date}
                </div>
                {cert.metric && (
                  <div className="text-sm text-blue-300 font-medium">
                    {cert.metric}
                  </div>
                )}
                {cert.desc && (
                  <p className="text-xs text-white/70 line-clamp-2">
                    {cert.desc}
                  </p>
                )}

                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-white/80 hover:text-blue-300 transition mt-2"
                  >
                    <FaExternalLinkAlt /> View Certificate
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
