// src/components/TechMarquee.jsx
import Marquee from "./Marquee";
import { STACK } from "../data/profileData";

function StackItem({ t }) {
  return (
    <div className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors duration-500">
      <span className="text-lg" aria-hidden="true">
        {t.icon}
      </span>
      <span className="text-xs tracking-wide">{t.name}</span>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div id="stack" className="border-t border-white/10 mt-20 md:mt-28">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Marquee duration={32} gap="gap-12">
          {STACK.map((t) => (
            <StackItem key={t.name} t={t} />
          ))}
          <div className="flex gap-12" aria-hidden="true" inert={true}>
            {STACK.map((t) => (
              <StackItem key={`dup-${t.name}`} t={t} />
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
}
