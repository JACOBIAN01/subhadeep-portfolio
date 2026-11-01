// kind: "gate" — interactive. The reader switches rules on and off, sends the requests,
// and watches which ones get through. Rules are data (see src/content/gate.js).
//
// { t: "figure", kind: "gate", label, caption, alt,
//   rules: [{ id, name, hint?, why, block: { field, op, value } }],      // 1–6
//   requests: [{ id, label, detail?, bad?: true, tag?: "rogue", fields: { ... } }], // 1–3
//   action?: "Send both requests",
//   passed?: "Signed and paid out.",          // a good request got through
//   passedBad?: "Signed. The money is gone.", // a bad request got through
//   stopped?: "Blocked",                      // prefix before the rule's `why`
//   openNote?: "shown after a run where every request got through" }
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiX, FiPlay, FiRotateCcw } from "react-icons/fi";
import Frame from "./Frame";
import { evaluate, matches } from "../../../content/gate";

function Toggle({ on, onChange, name, hint }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="flex w-full items-start gap-3 rounded-xl border border-hairline bg-white p-3 text-left transition-colors duration-300 hover:border-ink/30"
    >
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-5 w-9 flex-none items-center rounded-full p-0.5 transition-colors duration-300"
        style={{ background: on ? "#1f9d55" : "#d2d2d7" }}
      >
        <motion.span
          className="h-4 w-4 rounded-full bg-white shadow"
          animate={{ x: on ? 16 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 34 }}
        />
      </span>
      <span>
        <span className="block font-sans text-[13px] font-semibold text-ink">{name}</span>
        {hint && (
          <span className="mt-0.5 block font-sans text-[12px] leading-snug text-subtle">{hint}</span>
        )}
      </span>
    </button>
  );
}

function Result({ spec, request, active, enabled, step, ran }) {
  const stoppedBy = evaluate(request, spec.rules, enabled);
  const stopAt = stoppedBy ? active.indexOf(stoppedBy) : -1;
  const settled = ran && (stoppedBy ? step > stopAt : step >= active.length);
  const bad = !!request.bad;

  return (
    <div className="rounded-2xl border border-hairline bg-white p-4">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-sans text-[13px] font-semibold text-ink">{request.label}</span>
        <span
          className="font-sans text-[11px] font-bold uppercase tracking-[0.08em]"
          style={{ color: bad ? "#d93025" : "#0066cc" }}
        >
          {request.tag || (bad ? "bad" : "good")}
        </span>
      </div>
      {request.detail && <p className="mt-1 font-sans text-[12px] text-subtle">{request.detail}</p>}

      <ul className="mt-3 flex flex-col gap-1.5">
        {active.length === 0 && (
          <li className="font-sans text-[12px] italic text-faint">No rules switched on.</li>
        )}
        {active.map((r, i) => {
          const reached = step > i;
          const skipped = stopAt > -1 && i > stopAt;
          const blocked = reached && !skipped && matches(r.block, request.fields || {});
          return (
            <li
              key={r.id}
              className="flex items-center gap-2 font-sans text-[12px] transition-opacity duration-300"
              style={{ opacity: reached && !skipped ? 1 : 0.25 }}
            >
              <span
                aria-hidden="true"
                className="flex h-4 w-4 flex-none items-center justify-center rounded-full text-white"
                style={{ background: !reached || skipped ? "#d2d2d7" : blocked ? "#d93025" : "#1f9d55" }}
              >
                {blocked ? <FiX size={10} /> : <FiCheck size={10} />}
              </span>
              <span className={blocked ? "font-semibold text-ink" : "text-subtle"}>{r.name}</span>
            </li>
          );
        })}
      </ul>

      <AnimatePresence mode="wait">
        {settled && (
          <motion.div
            key={stoppedBy ? "stopped" : "passed"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 rounded-xl px-3 py-2 font-sans text-[12px] font-semibold"
            style={{
              background: stoppedBy ? "#eafaf0" : bad ? "#fdecea" : "#eff6ff",
              color: stoppedBy ? "#1f7a3a" : bad ? "#c2331b" : "#0066cc",
            }}
          >
            {stoppedBy
              ? `${spec.stopped || "Blocked"}: ${stoppedBy.why}.`
              : bad
                ? spec.passedBad || "Got through."
                : spec.passed || "Allowed."}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Gate({ spec }) {
  const off = () => Object.fromEntries(spec.rules.map((r) => [r.id, false]));
  const [enabled, setEnabled] = useState(off);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [ran, setRan] = useState(false);
  const active = spec.rules.filter((r) => enabled[r.id]);

  useEffect(() => {
    if (!running) return;
    if (step > active.length) {
      setRunning(false);
      return;
    }
    const id = setTimeout(() => setStep((s) => s + 1), 520);
    return () => clearTimeout(id);
  }, [running, step, active.length]);

  const reset = (next) => {
    setEnabled(next);
    setStep(0);
    setRunning(false);
    setRan(false);
  };
  const done = ran && step > active.length;
  const allPassed = done && spec.requests.every((r) => !evaluate(r, spec.rules, enabled));

  return (
    <Frame>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-faint">
          {spec.label || "Try it"}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setStep(0);
              setRan(true);
              setRunning(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 font-sans text-[13px] font-medium text-white transition-colors duration-300 hover:bg-black"
          >
            <FiPlay size={12} aria-hidden="true" /> {spec.action || "Run"}
          </button>
          <button
            type="button"
            onClick={() => reset(off())}
            className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 font-sans text-[13px] text-subtle transition-colors duration-300 hover:text-ink"
          >
            <FiRotateCcw size={12} aria-hidden="true" /> Reset
          </button>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {spec.rules.map((r) => (
          <Toggle
            key={r.id}
            on={enabled[r.id]}
            onChange={(on) => reset({ ...enabled, [r.id]: on })}
            name={r.name}
            hint={r.hint}
          />
        ))}
      </div>

      <div className={`mt-4 grid gap-3 ${spec.requests.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {spec.requests.map((r) => (
          <Result key={r.id} spec={spec} request={r} active={active} enabled={enabled} step={step} ran={ran} />
        ))}
      </div>

      <div aria-live="polite" className="sr-only">
        {done
          ? spec.requests
              .map((r) => {
                const s = evaluate(r, spec.rules, enabled);
                return `${r.label}: ${s ? `blocked, ${s.why}` : "allowed"}.`;
              })
              .join(" ")
          : ""}
      </div>

      <AnimatePresence>
        {allPassed && spec.openNote && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 font-sans text-[13px] leading-relaxed text-subtle"
          >
            {spec.openNote}
          </motion.p>
        )}
      </AnimatePresence>
    </Frame>
  );
}
