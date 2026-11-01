// kind: "compare" — two or three lanes. Each sends a chip along; "blocked" lanes stop at
// a wall, the others run out of frame. Good for "same event, different outcome".
//
// { t: "figure", kind: "compare", label, caption, alt,
//   lanes: [{ title, status, blocked, chip?, note?, tone? }] }   // 2–3 lanes
// tone colours the status text; defaults: blocked = green, else red.
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Frame from "./Frame";
import { tone } from "../../../content/tones";

function Lane({ lane }) {
  const status = tone(lane.tone || (lane.blocked ? "green" : "red")).fg;
  return (
    <div className="rounded-2xl border border-hairline bg-white p-4">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-sans text-sm font-semibold text-ink">{lane.title}</span>
        {lane.status && (
          <span
            className="text-right font-sans text-[11px] font-bold uppercase tracking-[0.08em]"
            style={{ color: status }}
          >
            {lane.status}
          </span>
        )}
      </div>

      <div className="relative mt-3 h-11 overflow-hidden rounded-xl bg-canvas-alt">
        {lane.blocked && (
          <div
            className="absolute inset-y-0 right-[32%] w-1 rounded-full"
            style={{ background: status }}
            aria-hidden="true"
          />
        )}
        <motion.div
          aria-hidden="true"
          className="absolute top-1/2 flex h-7 -translate-y-1/2 items-center whitespace-nowrap rounded-full px-3 font-sans text-[11px] font-bold text-white shadow"
          style={{ background: lane.blocked ? "#86868b" : "#d93025" }}
          initial={{ left: "2%" }}
          whileInView={{ left: lane.blocked ? ["2%", "56%", "56%"] : ["2%", "102%"] }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            duration: lane.blocked ? 2.6 : 2.2,
            times: lane.blocked ? [0, 0.55, 1] : [0, 1],
            repeat: Infinity,
            repeatDelay: 1.4,
            ease: "easeInOut",
          }}
        >
          {lane.chip || (lane.blocked ? "stopped" : "through")}
        </motion.div>
      </div>

      {lane.note && (
        <p className="mt-2.5 font-sans text-[12px] leading-relaxed text-subtle">{lane.note}</p>
      )}
    </div>
  );
}

export default function Compare({ spec }) {
  const cols = spec.lanes.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <Frame label={spec.label}>
      <div className={`grid gap-3 ${cols}`}>
        {spec.lanes.map((l, i) => (
          <Lane key={i} lane={l} />
        ))}
      </div>
    </Frame>
  );
}
