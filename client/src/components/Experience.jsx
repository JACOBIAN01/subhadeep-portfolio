/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useState } from "react";
import GlassCard from "./GlassCard";
import SectionTitle from "./SectionTitle";
import { JOB_CERTIFICATES, EXPERIENCE } from "../data/profileData";
import { FaExternalLinkAlt } from "react-icons/fa";
import logo from "../assets/Codingal.png";

const EASE = [0.16, 1, 0.3, 1];

export default function Experience() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="experience" className="bg-canvas">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <SectionTitle kicker="Career" title="Experience & Recognitions" />

        {/* --- Experience Card --- */}
        <div className="grid grid-cols-1 gap-8">
          {EXPERIENCE.filter((e) => e.org === "Codingal Inc.").map((e) => (
            <GlassCard key={e.role}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={logo}
                    alt="Codingal Logo"
                    className="w-11 h-11 rounded-xl object-cover border border-hairline"
                  />
                  <div>
                    <div className="font-medium text-lg text-ink">
                      {e.role}
                    </div>
                    <div className="text-sm text-subtle">{e.org}</div>
                  </div>
                </div>
                <div className="text-xs text-subtle bg-canvas-alt px-3 py-1.5 rounded-full">
                  {e.period}
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {e.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[15px] text-subtle leading-relaxed"
                  >
                    <span className="mt-2.5 h-1 w-1 rounded-full bg-faint shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>

        {/* Divider */}
        <h3 className="text-sm font-medium tracking-wide uppercase text-subtle mt-24 mb-10 text-center">
          Recognitions & Job Certificates
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
              duration: 26,
              repeat: Infinity,
            }}
          >
            {[...JOB_CERTIFICATES, ...JOB_CERTIFICATES].map((cert, index) => (
              <div
                key={index}
                className="shrink-0 w-80 md:w-95 bg-white border border-hairline rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
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
                    {cert.org} · {cert.date}
                  </div>
                  <div className="text-sm text-accent font-medium">
                    {cert.metric}
                  </div>
                  <p className="text-xs text-subtle leading-relaxed line-clamp-2">
                    {cert.desc}
                  </p>

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
      </div>
    </section>
  );
}
