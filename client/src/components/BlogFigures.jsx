// Animated and interactive figures for blog posts, drawn from the post's JSON.
// { "t": "figure", "kind": "flow" | "compare" | "split" | "gate", ... }. Specs: CLAUDE.md.
import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  FiKey, FiLock, FiUnlock, FiMonitor, FiServer, FiDatabase, FiGlobe, FiUser, FiUsers,
  FiMail, FiSearch, FiShield, FiAlertTriangle, FiCloud, FiFileText, FiSmartphone,
  FiCheck, FiX, FiPlay, FiRotateCcw,
} from "react-icons/fi";

const ICONS = {
  key: FiKey, lock: FiLock, unlock: FiUnlock, laptop: FiMonitor, server: FiServer,
  database: FiDatabase, globe: FiGlobe, user: FiUser, users: FiUsers, mail: FiMail,
  search: FiSearch, shield: FiShield, alert: FiAlertTriangle, cloud: FiCloud,
  file: FiFileText, phone: FiSmartphone,
};
const TONES = {
  blue: ["#0066cc", "#eff6ff"], orange: ["#ff9500", "#fff7ed"], red: ["#d93025", "#fdecea"],
  green: ["#1f9d55", "#eafaf0"], purple: ["#6a3fc6", "#f5f1fd"], grey: ["#86868b", "#f5f5f7"],
};
const tone = (t, fallback = "blue") => TONES[t] || TONES[fallback];

function Icon({ name }) {
  const C = ICONS[name];
  return C ? <C size={14} aria-hidden="true" /> : null;
}

function Frame({ label, action, children }) {
  return (
    <div className="rounded-3xl border border-hairline bg-canvas p-4 font-sans sm:p-6">
      {(label || action) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-faint">{label}</span>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

/** Is `ref` on screen? Animations only run while visible. */
function useVisible() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.35 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, on];
}

// ---------------------------------------------------------------- flow
// steps: [{title, sub, icon, focus}] (2–5) · runs: [{label, tone}] (1–3, cycled) · note
function Flow({ spec }) {
  const { steps, runs = [{}], note } = spec;
  const [ref, live] = useVisible();
  const [run, setRun] = useState(0);
  const pass = steps.length * 0.6 + 1.6;
  useEffect(() => {
    if (!live || runs.length < 2) return;
    const id = setInterval(() => setRun((r) => (r + 1) % runs.length), pass * 1000);
    return () => clearInterval(id);
  }, [live, runs.length, pass]);
  const [c] = tone(runs[run].tone);
  const cols = ["", "", "sm:grid-cols-2", "sm:grid-cols-3", "sm:grid-cols-4", "sm:grid-cols-5"][steps.length];

  return (
    <Frame label={spec.label}>
      <div ref={ref} className={`grid grid-cols-2 gap-3 sm:gap-2 ${cols}`}>
        {steps.map((s, i) => (
          <div key={i} className="relative">
            <div
              className="h-full rounded-2xl bg-white p-3"
              style={{ border: s.focus ? "2px solid #1d1d1f" : "1px solid var(--color-hairline)" }}
            >
              <div className="flex items-center justify-between text-ink">
                <span className="text-[10px] font-bold tracking-[0.1em] text-faint">{String(i + 1).padStart(2, "0")}</span>
                <Icon name={s.icon} />
              </div>
              <div className="mt-1.5 text-[13px] font-semibold leading-tight text-ink">{s.title}</div>
              {s.sub && <div className="mt-0.5 text-[11px] leading-snug text-subtle">{s.sub}</div>}
            </div>
            {live && (
              <motion.div
                key={`${run}-${i}`}
                aria-hidden="true"
                className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
                style={{ background: c }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0.4, 1, 1, 0.4] }}
                transition={{
                  duration: 0.95, delay: i * 0.6, times: [0, 0.25, 0.7, 1],
                  repeat: runs.length < 2 ? Infinity : 0, repeatDelay: pass - 0.95,
                }}
              />
            )}
          </div>
        ))}
      </div>
      {(runs[run].label || note) && (
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          {runs[run].label && (
            <motion.span key={run} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-[13px] font-semibold" style={{ color: c }}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: c }} /> {runs[run].label}
            </motion.span>
          )}
          {note && <span className="text-[12px] text-subtle">{note}</span>}
        </div>
      )}
    </Frame>
  );
}

// ---------------------------------------------------------------- compare
// lanes: [{title, status, blocked, chip, note, tone}] (2–3)
function Compare({ spec }) {
  return (
    <Frame label={spec.label}>
      <div className={`grid gap-3 ${spec.lanes.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {spec.lanes.map((l, i) => {
          const [c] = tone(l.tone, l.blocked ? "green" : "red");
          return (
            <div key={i} className="rounded-2xl border border-hairline bg-white p-4">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-semibold text-ink">{l.title}</span>
                <span className="text-right text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: c }}>{l.status}</span>
              </div>
              <div className="relative mt-3 h-11 overflow-hidden rounded-xl bg-canvas-alt" aria-hidden="true">
                {l.blocked && <div className="absolute inset-y-0 right-[32%] w-1 rounded-full" style={{ background: c }} />}
                <motion.div
                  className="absolute top-1/2 flex h-7 -translate-y-1/2 items-center whitespace-nowrap rounded-full px-3 text-[11px] font-bold text-white shadow"
                  style={{ background: l.blocked ? "#86868b" : "#d93025" }}
                  initial={{ left: "2%" }}
                  whileInView={{ left: l.blocked ? ["2%", "56%", "56%"] : ["2%", "102%"] }}
                  transition={{ duration: l.blocked ? 2.6 : 2.2, times: l.blocked ? [0, 0.55, 1] : [0, 1], repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
                >
                  {l.chip || (l.blocked ? "stopped" : "through")}
                </motion.div>
              </div>
              {l.note && <p className="mt-2.5 text-[12px] leading-relaxed text-subtle">{l.note}</p>}
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

// ---------------------------------------------------------------- split
// panes: [{kicker, title, body, share, shareLabel, icon, tone}] (exactly 2) · mover · out
function Split({ spec }) {
  const travel = (delay) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: [0, 1, 1, 0] },
    transition: { duration: 3.2, times: [0, 0.12, 0.8, 1], repeat: Infinity, repeatDelay: 1.2, delay },
  });
  const pane = (p, fallback) => {
    const [c, bg] = tone(p.tone, fallback);
    return (
      <div className="flex-1 rounded-2xl border p-5 sm:p-6" style={{ borderColor: `${c}33`, background: bg }}>
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: c }}>
          <Icon name={p.icon} /> {p.kicker}
        </div>
        <div className="mt-2 text-lg font-semibold tracking-tight text-ink">{p.title}</div>
        {p.body && <p className="mt-1.5 text-[13px] leading-relaxed text-subtle">{p.body}</p>}
        {typeof p.share === "number" && (
          <div className="mt-4">
            <div className="h-2 overflow-hidden rounded-full bg-white">
              <motion.div className="h-full rounded-full" style={{ background: c }} initial={{ width: 0 }} whileInView={{ width: `${p.share}%` }} viewport={{ once: true }} transition={{ duration: 1 }} />
            </div>
            <div className="mt-1.5 text-[11px] font-medium" style={{ color: c }}>{p.shareLabel || `${p.share}%`}</div>
          </div>
        )}
      </div>
    );
  };
  const [a, b] = spec.panes;
  return (
    <Frame label={spec.label}>
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
        {pane(a, "blue")}
        <div className="relative flex items-center justify-center sm:w-16" aria-hidden="true">
          <div className="h-px w-full bg-hairline sm:h-full sm:w-px" />
          {spec.mover && <motion.div {...travel(0)} className="absolute flex h-7 min-w-7 items-center justify-center rounded-full bg-ink px-1.5 text-[10px] font-bold text-white shadow-md">{spec.mover}</motion.div>}
        </div>
        {pane(b, "orange")}
      </div>
      {spec.out && (
        <div className="mt-4 flex items-center justify-end gap-2 text-[11px] font-medium text-subtle" aria-hidden="true">
          {spec.out}
          {spec.mover && <motion.span {...travel(1.4)} className="flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white" style={{ background: tone(b.tone, "orange")[0] }}>{spec.mover}</motion.span>}
        </div>
      )}
    </Frame>
  );
}

// ---------------------------------------------------------------- gate (interactive)
// rules: [{id, name, hint, why, block: {field, op, value} | {any|all: [...]}}] (1–6)
// requests: [{id, label, tag, detail, bad, fields}] (1–3) · action · passed · passedBad · stopped · openNote
const OPS = {
  ">": (a, b) => a > b, ">=": (a, b) => a >= b, "<": (a, b) => a < b, "<=": (a, b) => a <= b,
  is: (a, b) => a === b, not: (a, b) => a !== b,
  in: (a, b) => b.includes(a), notIn: (a, b) => !b.includes(a), includes: (a, b) => a.includes(b),
};
const matches = (c, f) =>
  c.any ? c.any.some((x) => matches(x, f)) : c.all ? c.all.every((x) => matches(x, f)) : !!OPS[c.op]?.(f[c.field], c.value);

function Gate({ spec }) {
  const off = () => Object.fromEntries(spec.rules.map((r) => [r.id, false]));
  const [enabled, setEnabled] = useState(off);
  const [step, setStep] = useState(-1); // -1 = not run yet
  const active = spec.rules.filter((r) => enabled[r.id]);
  const stopper = (req) => active.find((r) => matches(r.block, req.fields || {}));
  const done = step > active.length;

  useEffect(() => {
    if (step < 0 || done) return;
    const id = setTimeout(() => setStep((s) => s + 1), 520);
    return () => clearTimeout(id);
  }, [step, done]);

  const toggle = (id) => {
    setEnabled((e) => ({ ...e, [id]: !e[id] }));
    setStep(-1);
  };
  const button = (
    <div className="flex gap-2 text-[13px]">
      <button type="button" onClick={() => setStep(0)} className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 font-medium text-white hover:bg-black">
        <FiPlay size={12} aria-hidden="true" /> {spec.action || "Run"}
      </button>
      <button type="button" onClick={() => { setEnabled(off()); setStep(-1); }} className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 text-subtle hover:text-ink">
        <FiRotateCcw size={12} aria-hidden="true" /> Reset
      </button>
    </div>
  );

  return (
    <Frame label={spec.label || "Try it"} action={button}>
      <div className="grid gap-2 sm:grid-cols-2">
        {spec.rules.map((r) => (
          <button key={r.id} type="button" role="switch" aria-checked={enabled[r.id]} onClick={() => toggle(r.id)} className="flex items-start gap-3 rounded-xl border border-hairline bg-white p-3 text-left hover:border-ink/30">
            <span className="mt-0.5 flex h-5 w-9 flex-none items-center rounded-full p-0.5 transition-colors" style={{ background: enabled[r.id] ? "#1f9d55" : "#d2d2d7" }} aria-hidden="true">
              <motion.span className="h-4 w-4 rounded-full bg-white shadow" animate={{ x: enabled[r.id] ? 16 : 0 }} />
            </span>
            <span>
              <span className="block text-[13px] font-semibold text-ink">{r.name}</span>
              {r.hint && <span className="mt-0.5 block text-[12px] leading-snug text-subtle">{r.hint}</span>}
            </span>
          </button>
        ))}
      </div>

      <div className={`mt-4 grid gap-3 ${spec.requests.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {spec.requests.map((req) => {
          const stop = stopper(req);
          const stopAt = active.indexOf(stop);
          const settled = step >= 0 && (stop ? step > stopAt : step >= active.length);
          return (
            <div key={req.id} className="rounded-2xl border border-hairline bg-white p-4">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[13px] font-semibold text-ink">{req.label}</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: req.bad ? "#d93025" : "#0066cc" }}>{req.tag || (req.bad ? "bad" : "good")}</span>
              </div>
              {req.detail && <p className="mt-1 text-[12px] text-subtle">{req.detail}</p>}
              <ul className="mt-3 flex flex-col gap-1.5 text-[12px]">
                {active.length === 0 && <li className="italic text-faint">No rules switched on.</li>}
                {active.map((r, i) => {
                  const reached = step > i && (stopAt < 0 || i <= stopAt);
                  const blocked = reached && r === stop;
                  return (
                    <li key={r.id} className="flex items-center gap-2 transition-opacity" style={{ opacity: reached ? 1 : 0.25 }}>
                      <span className="flex h-4 w-4 items-center justify-center rounded-full text-white" style={{ background: !reached ? "#d2d2d7" : blocked ? "#d93025" : "#1f9d55" }} aria-hidden="true">
                        {blocked ? <FiX size={10} /> : <FiCheck size={10} />}
                      </span>
                      <span className={blocked ? "font-semibold text-ink" : "text-subtle"}>{r.name}</span>
                    </li>
                  );
                })}
              </ul>
              <AnimatePresence>
                {settled && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 rounded-xl px-3 py-2 text-[12px] font-semibold"
                    style={{ background: stop ? "#eafaf0" : req.bad ? "#fdecea" : "#eff6ff", color: stop ? "#1f7a3a" : req.bad ? "#c2331b" : "#0066cc" }}>
                    {stop ? `${spec.stopped || "Blocked"}: ${stop.why}.` : req.bad ? spec.passedBad || "Got through." : spec.passed || "Allowed."}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {done ? spec.requests.map((r) => `${r.label}: ${stopper(r) ? `blocked, ${stopper(r).why}` : "allowed"}.`).join(" ") : ""}
      </p>
      {done && spec.openNote && spec.requests.every((r) => !stopper(r)) && (
        <p className="mt-4 text-[13px] leading-relaxed text-subtle">{spec.openNote}</p>
      )}
    </Frame>
  );
}

const KINDS = { flow: Flow, compare: Compare, split: Split, gate: Gate };

export default function BlogFigure({ spec }) {
  const C = KINDS[spec.kind];
  return C ? <C spec={spec} /> : null;
}
