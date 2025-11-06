/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useState } from "react";
import GlassCard from "./GlassCard";
import SectionTitle from "./SectionTitle";
import { JOB_CERTIFICATES, EXPERIENCE } from "../data/profileData";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Experience() {
  const [isHovered, setIsHovered] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  return (
    <section id="experience" className="mx-auto max-w-7xl px-6 py-16">
      <SectionTitle kicker="Career" title="Experience & Recognitions" />

      {/* --- Experience Card --- */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-8"
      >
        {EXPERIENCE.filter((e) => e.org === "Codingal Inc.").map((e) => (
          <GlassCard
            key={e.role}
            className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/logos/codingal.png"
                  alt="Codingal Logo"
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <div className="font-semibold text-lg text-white/90">
                    {e.role}
                  </div>
                  <div className="text-sm text-white/70">{e.org}</div>
                </div>
              </div>
              <div className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-md">
                {e.period}
              </div>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-white/80 list-disc list-inside leading-relaxed">
              {e.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </motion.div>

      {/* Divider */}
      <h3 className="text-xl font-semibold text-white/80 mt-14 mb-6 text-center">
        🏅 Recognitions & Job Certificates
      </h3>

      {/* --- Infinite Smooth Certificates Carousel --- */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Infinite scroll container */}
        <motion.div
          className="flex gap-8"
          animate={
            isHovered ? { x: 0 } : { x: ["0%", "-50%"] } // smooth continuous motion
          }
          transition={{
            ease: "linear",
            duration: 20, // full cycle duration
            repeat: Infinity,
          }}
        >
          {[...JOB_CERTIFICATES, ...JOB_CERTIFICATES].map((cert, index) => (
            <motion.div
              key={index}
              className="shrink-0 w-[340px] md:w-[420px] snap-center bg-white/15 border border-white/10 rounded-2xl backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-105"
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
                  {cert.org} • {cert.date}
                </div>
                <div className="text-sm text-blue-300 font-medium">
                  {cert.metric}
                </div>
                <p className="text-xs text-white/70 line-clamp-2">
                  {cert.desc}
                </p>

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
