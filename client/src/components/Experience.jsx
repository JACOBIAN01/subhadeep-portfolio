/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useState } from "react";
import GlassCard from "./GlassCard";
import SectionTitle from "./SectionTitle";
import Marquee from "./Marquee";
import Modal from "./Modal";
import { JOB_CERTIFICATES, EXPERIENCE, MANAGER_APPRECIATION } from "../data/profileData";
import { FaExternalLinkAlt, FaGraduationCap } from "react-icons/fa";
import codingalLogo from "../assets/Codingal.png";
import newtonLogo from "../assets/newton.jpeg"
import adityaManagerPhoto from "../assets/aditya_manager.jpg";

const EASE = [0.16, 1, 0.3, 1];

const ORG_LOGOS = {
  Codingal: codingalLogo,
  'Newton School of Technology':newtonLogo,
};

export default function Experience() {
  const [showAppreciation, setShowAppreciation] = useState(false);

  return (
    <section id="experience" className="bg-canvas">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <SectionTitle kicker="Career" title="Experience & Recognitions" />

        {/* --- Experience Timeline --- */}
        <div className="grid grid-cols-1 gap-8">
          {EXPERIENCE.map((e) => (
            <GlassCard key={`${e.org}-${e.role}`}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  {ORG_LOGOS[e.org] ? (
                    <img
                      src={ORG_LOGOS[e.org]}
                      alt={`${e.org} Logo`}
                      width={44}
                      height={44}
                      loading="lazy"
                      decoding="async"
                      className="w-11 h-11 rounded-xl object-cover border border-hairline"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-xl bg-canvas-alt border border-hairline flex items-center justify-center text-subtle">
                      <FaGraduationCap className="text-lg" aria-hidden="true" />
                    </div>
                  )}
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

              {e.org === "Newton School of Technology" && (
                <div className="mt-6 pt-6 border-t border-hairline">
                  <div className="text-xs font-medium tracking-wide uppercase text-accent mb-3">
                    Manager Recognition
                  </div>
                  <div className="flex items-start gap-4">
                    <img
                      src={adityaManagerPhoto}
                      alt={MANAGER_APPRECIATION.name}
                      width={48}
                      height={48}
                      loading="lazy"
                      decoding="async"
                      className="w-12 h-12 rounded-full object-cover shrink-0 border border-hairline"
                    />
                    <div>
                      <p className="text-[15px] text-ink leading-relaxed">
                        &ldquo;{MANAGER_APPRECIATION.quote}&rdquo;
                      </p>
                      <div className="mt-2 text-sm text-subtle">
                        {MANAGER_APPRECIATION.name} &middot;{" "}
                        {MANAGER_APPRECIATION.role}
                      </div>
                      <button
                        onClick={() => setShowAppreciation(true)}
                        className="mt-3 text-sm text-accent hover:text-ink transition-colors duration-300"
                      >
                        Read full appreciation &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </GlassCard>
          ))}
        </div>

        {/* Divider */}
        <h3 className="text-sm font-medium tracking-wide uppercase text-subtle mt-24 mb-10 text-center">
          Recognitions & Job Certificates
        </h3>

        {/* --- Infinite Smooth Certificates Carousel --- */}
        <Marquee duration={26} gap="gap-8">
          {JOB_CERTIFICATES.map((cert) => (
            <CertCard key={cert.title} cert={cert} />
          ))}
          <div className="flex gap-8" aria-hidden="true" inert={true}>
            {JOB_CERTIFICATES.map((cert) => (
              <CertCard key={`dup-${cert.title}`} cert={cert} />
            ))}
          </div>
        </Marquee>
      </div>

      <Modal
        open={showAppreciation}
        onClose={() => setShowAppreciation(false)}
        title="Manager Appreciation Email"
      >
        <object
          data="/manager-appreciation.pdf"
          type="application/pdf"
          className="w-full h-full"
          aria-label="Manager appreciation email PDF"
        >
          <div className="p-8 text-center text-sm text-subtle">
            Your browser can't preview this PDF inline.{" "}
            <a
              href="/manager-appreciation.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:text-ink transition-colors duration-300"
            >
              Open it in a new tab
            </a>
            .
          </div>
        </object>
      </Modal>
    </section>
  );
}

function CertCard({ cert }) {
  return (
    <div className="shrink-0 w-80 md:w-95 bg-white border border-hairline rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      <div className="w-full h-72 md:h-80 bg-canvas-alt flex items-center justify-center p-4">
        <img
          src={cert.img}
          alt={cert.title}
          loading="lazy"
          decoding="async"
          className="max-w-full max-h-full object-contain rounded-lg"
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
        <div className="text-sm text-accent font-medium">{cert.metric}</div>
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
            <FaExternalLinkAlt aria-hidden="true" /> View Certificate
          </a>
        )}
      </div>
    </div>
  );
}
