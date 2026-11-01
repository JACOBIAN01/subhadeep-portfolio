// kind: "split" — two panes side by side, each with a proportion bar, and an optional
// token moving between them. Good for "where things live" (cold/hot, cache/disk, ...).
//
// { t: "figure", kind: "split", label, caption, alt,
//   panes: [{ kicker, title, body?, share?, shareLabel?, icon?, tone? }],   // exactly 2
//   mover?: "₿",              // a token that travels from pane 1 to pane 2 on a loop
//   out?: "pays out to you" } // optional label for a second hop out of pane 2
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Frame from "./Frame";
import Icon from "./icons";
import { tone } from "../../../content/tones";

const travel = (delay) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: [0, 1, 1, 0] },
  viewport: { once: false, amount: 0.4 },
  transition: { duration: 3.2, times: [0, 0.12, 0.8, 1], repeat: Infinity, repeatDelay: 1.2, delay },
});

function Pane({ pane, fallbackTone }) {
  const t = tone(pane.tone || fallbackTone);
  return (
    <div
      className="flex-1 rounded-2xl border p-5 sm:p-6"
      style={{ borderColor: `${t.fg}33`, background: t.bg }}
    >
      <div className="flex items-center gap-2" style={{ color: t.fg }}>
        {pane.icon && <Icon name={pane.icon} />}
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.1em]">
          {pane.kicker}
        </span>
      </div>
      <div className="mt-2 font-sans text-lg font-semibold tracking-tight text-ink">{pane.title}</div>
      {pane.body && (
        <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-subtle">{pane.body}</p>
      )}
      {typeof pane.share === "number" && (
        <div className="mt-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white">
            <motion.div
              className="h-full rounded-full"
              style={{ background: t.fg }}
              initial={{ width: 0 }}
              whileInView={{ width: `${pane.share}%` }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <div className="mt-1.5 font-sans text-[11px] font-medium" style={{ color: t.fg }}>
            {pane.shareLabel || `${pane.share}%`}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Split({ spec }) {
  const [a, b] = spec.panes;
  return (
    <Frame label={spec.label}>
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-5">
        <Pane pane={a} fallbackTone="blue" />
        <div className="relative flex items-center justify-center sm:w-16" aria-hidden="true">
          <div className="h-px w-full bg-hairline sm:h-full sm:w-px" />
          {spec.mover && (
            <motion.div
              {...travel(0)}
              className="absolute flex h-7 min-w-7 items-center justify-center rounded-full bg-ink px-1.5 font-sans text-[10px] font-bold text-white shadow-md"
            >
              {spec.mover}
            </motion.div>
          )}
        </div>
        <Pane pane={b} fallbackTone="orange" />
      </div>

      {spec.out && (
        <div className="mt-4 flex items-center justify-end gap-2" aria-hidden="true">
          <span className="font-sans text-[11px] font-medium text-subtle">{spec.out}</span>
          {spec.mover && (
            <motion.span
              {...travel(1.4)}
              className="flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 font-sans text-[10px] font-bold text-white"
              style={{ background: tone(b.tone || "orange").fg }}
            >
              {spec.mover}
            </motion.span>
          )}
        </div>
      )}
    </Frame>
  );
}
