/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useState } from "react";
import SectionTitle from "./SectionTitle";
import { SKILL_CERTIFICATES, ADDITIONAL_CERTIFICATIONS } from "../data/profileData";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function SkillCertificates() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="certs" className="bg-canvas-alt">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <SectionTitle kicker="Upskilling" title="Skill Certificates" />

        <h3 className="text-sm font-medium tracking-wide uppercase text-subtle -mt-6 mb-10 text-center">
          Online Learning & Course Achievements
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
              duration: 28,
              repeat: Infinity,
            }}
          >
            {[...SKILL_CERTIFICATES, ...SKILL_CERTIFICATES].map((cert, index) => (
              <div
                key={index}
                className="shrink-0 w-80 md:w-100 bg-white border border-hairline rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              >
                <div className="w-full h-44 overflow-hidden">
                  <img
                    src={cert.img}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                </div>

                <div className="p-6 space-y-2">
                  <h4 className="text-base font-medium text-ink leading-snug">
                    {cert.title}
                  </h4>
                  <div className="text-sm text-subtle">
                    {cert.platform} · {cert.date}
                  </div>
                  {cert.metric && (
                    <div className="text-sm text-accent font-medium">
                      {cert.metric}
                    </div>
                  )}
                  {cert.desc && (
                    <p className="text-xs text-subtle leading-relaxed line-clamp-2">
                      {cert.desc}
                    </p>
                  )}

                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs text-subtle hover:text-accent transition-colors duration-300 mt-2"
                    >
                      <FaExternalLinkAlt /> View Certificate
                    </a>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <p className="mt-10 text-sm text-faint text-center">
          Also certified in {ADDITIONAL_CERTIFICATIONS.join(" and ")}.
        </p>
      </div>
    </section>
  );
}
