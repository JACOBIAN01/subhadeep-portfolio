/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import Marquee from "./Marquee";
import { SKILL_CERTIFICATES, ADDITIONAL_CERTIFICATIONS } from "../data/profileData";

function SkillCertCard({ cert }) {
  return (
    <div className="shrink-0 w-80 md:w-100 bg-white border border-hairline rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
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
          {cert.platform} · {cert.date}
        </div>
        {cert.metric && (
          <div className="text-sm text-accent font-medium">{cert.metric}</div>
        )}
        {cert.desc && (
          <p className="text-xs text-subtle leading-relaxed line-clamp-2">
            {cert.desc}
          </p>
        )}
      </div>
    </div>
  );
}

export default function SkillCertificates() {
  return (
    <section id="certs" className="bg-canvas-alt">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <SectionTitle kicker="Upskilling" title="Skill Certificates" />

        <h3 className="text-sm font-medium tracking-wide uppercase text-subtle -mt-6 mb-10 text-center">
          Online Learning & Course Achievements
        </h3>

        {/* --- Infinite Smooth Certificates Carousel --- */}
        <Marquee duration={28} gap="gap-8">
          {SKILL_CERTIFICATES.map((cert) => (
            <SkillCertCard key={cert.title} cert={cert} />
          ))}
          <div className="flex gap-8" aria-hidden="true" inert={true}>
            {SKILL_CERTIFICATES.map((cert) => (
              <SkillCertCard key={`dup-${cert.title}`} cert={cert} />
            ))}
          </div>
        </Marquee>

        <p className="mt-10 text-sm text-subtle text-center">
          Also certified in {ADDITIONAL_CERTIFICATIONS.join(" and ")}.
        </p>
      </div>
    </section>
  );
}
