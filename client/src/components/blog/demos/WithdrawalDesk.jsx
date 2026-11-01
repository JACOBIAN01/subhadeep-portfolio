// Interactive: a simplified withdrawal desk. Two requests arrive, the reader chooses
// which defences are on, and watches which ones get a signature.
// Our build: a teaching model of approval rules. Not Binance's system, not an attack,
// and nothing here touches a network.
import { useCallback, useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiX, FiPlay, FiRotateCcw } from "react-icons/fi";

const DEFENCES = [
  {
    id: "allowlist",
    name: "Address allowlist",
    hint: "Only pay out to destinations saved and cooled off in advance.",
    blocks: (r) => !r.knownAddress,
    why: "destination is not on the allowlist",
  },
  {
    id: "limit",
    name: "Per-transaction limit",
    hint: "No single automated withdrawal above 100 ETH.",
    blocks: (r) => r.amount > 100,
    why: "amount is over the 100 ETH automated limit",
  },
  {
    id: "approver",
    name: "Second human approver",
    hint: "Anything unusual waits for a second person on a separate device.",
    blocks: (r) => !r.routine,
    why: "no second approver signed off",
  },
  {
    id: "anomaly",
    name: "Anomaly detection",
    hint: "Flag withdrawals far outside the normal pattern.",
    blocks: (r) => r.amount > 1000,
    why: "size is far outside the normal pattern",
  },
];

const REQUESTS = [
  {
    id: "customer",
    label: "Customer withdrawal",
    detail: "0.4 ETH to an address this account has used before",
    amount: 0.4,
    knownAddress: true,
    routine: true,
  },
  {
    id: "rogue",
    label: "Request from the compromised machine",
    detail: "12,000 ETH to an address first seen today",
    amount: 12000,
    knownAddress: false,
    routine: false,
  },
];

/** Returns {signed, stoppedBy} for a request under the enabled defences. */
function evaluate(request, enabled) {
  for (const d of DEFENCES) {
    if (enabled[d.id] && d.blocks(request)) return { signed: false, stoppedBy: d };
  }
  return { signed: true, stoppedBy: null };
}

function Toggle({ on, onChange, name, hint }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="group flex w-full items-start gap-3 rounded-xl border border-hairline bg-white p-3 text-left transition-colors duration-300 hover:border-ink/30"
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
        <span className="mt-0.5 block font-sans text-[12px] leading-snug text-subtle">{hint}</span>
      </span>
    </button>
  );
}

function Verdict({ request, enabled, step }) {
  const result = evaluate(request, enabled);
  const activeDefences = DEFENCES.filter((d) => enabled[d.id]);
  const reachedEnd = step >= activeDefences.length;
  const stopIndex = result.stoppedBy ? activeDefences.indexOf(result.stoppedBy) : -1;
  const settled = result.stoppedBy ? step > stopIndex : reachedEnd;
  const rogue = request.id === "rogue";

  return (
    <div className="rounded-2xl border border-hairline bg-white p-4">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-sans text-[13px] font-semibold text-ink">{request.label}</span>
        <span
          className="font-sans text-[11px] font-bold uppercase tracking-[0.08em]"
          style={{ color: rogue ? "#d93025" : "#0066cc" }}
        >
          {rogue ? "rogue" : "legitimate"}
        </span>
      </div>
      <p className="mt-1 font-sans text-[12px] text-subtle">{request.detail}</p>

      <ul className="mt-3 flex flex-col gap-1.5">
        {activeDefences.length === 0 && (
          <li className="font-sans text-[12px] italic text-faint">No checks switched on.</li>
        )}
        {activeDefences.map((d, i) => {
          const reached = step > i;
          const blocked = reached && d.blocks(request);
          const skipped = stopIndex > -1 && i > stopIndex;
          return (
            <li
              key={d.id}
              className="flex items-center gap-2 font-sans text-[12px] transition-opacity duration-300"
              style={{ opacity: reached && !skipped ? 1 : 0.25 }}
            >
              <span
                aria-hidden="true"
                className="flex h-4 w-4 flex-none items-center justify-center rounded-full text-white"
                style={{
                  background: !reached || skipped ? "#d2d2d7" : blocked ? "#d93025" : "#1f9d55",
                }}
              >
                {blocked ? <FiX size={10} /> : <FiCheck size={10} />}
              </span>
              <span className={blocked ? "font-semibold text-ink" : "text-subtle"}>{d.name}</span>
            </li>
          );
        })}
      </ul>

      <AnimatePresence mode="wait">
        {settled && (
          <motion.div
            key={result.signed ? "signed" : "blocked"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 rounded-xl px-3 py-2 font-sans text-[12px] font-semibold"
            style={{
              background: result.signed ? (rogue ? "#fdecea" : "#eff6ff") : "#eafaf0",
              color: result.signed ? (rogue ? "#c2331b" : "#0066cc") : "#1f7a3a",
            }}
          >
            {result.signed
              ? rogue
                ? "Signed. The money is gone."
                : "Signed and paid out."
              : `Blocked: ${result.stoppedBy.why}.`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function WithdrawalDesk() {
  const [enabled, setEnabled] = useState({
    allowlist: false,
    limit: false,
    approver: false,
    anomaly: false,
  });
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);

  const activeCount = DEFENCES.filter((d) => enabled[d.id]).length;

  const run = useCallback(() => {
    setStep(0);
    setRunning(true);
  }, []);

  useEffect(() => {
    if (!running) return;
    if (step > activeCount) {
      setRunning(false);
      return;
    }
    const id = setTimeout(() => setStep((s) => s + 1), 520);
    return () => clearTimeout(id);
  }, [running, step, activeCount]);

  const set = (id) => (on) => {
    setEnabled((e) => ({ ...e, [id]: on }));
    setStep(0);
    setRunning(false);
  };

  const bothSigned =
    step > activeCount && REQUESTS.every((r) => evaluate(r, enabled).signed);

  return (
    <div className="rounded-3xl border border-hairline bg-canvas p-4 sm:p-6" data-animated>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-faint">
          Withdrawal desk · our build
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={run}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 font-sans text-[13px] font-medium text-white transition-colors duration-300 hover:bg-black"
          >
            <FiPlay size={12} aria-hidden="true" /> Send both requests
          </button>
          <button
            type="button"
            onClick={() => {
              setEnabled({ allowlist: false, limit: false, approver: false, anomaly: false });
              setStep(0);
              setRunning(false);
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 font-sans text-[13px] text-subtle transition-colors duration-300 hover:text-ink"
          >
            <FiRotateCcw size={12} aria-hidden="true" /> Reset
          </button>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {DEFENCES.map((d) => (
          <Toggle
            key={d.id}
            on={enabled[d.id]}
            onChange={set(d.id)}
            name={d.name}
            hint={d.hint}
          />
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {REQUESTS.map((r) => (
          <Verdict key={r.id} request={r} enabled={enabled} step={step} />
        ))}
      </div>

      <div aria-live="polite" className="sr-only">
        {step > activeCount
          ? REQUESTS.map((r) => {
              const v = evaluate(r, enabled);
              return `${r.label}: ${v.signed ? "signed" : `blocked, ${v.stoppedBy.why}`}.`;
            }).join(" ")
          : ""}
      </div>

      <AnimatePresence>
        {bothSigned && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 font-sans text-[13px] leading-relaxed text-subtle"
          >
            With no checks on, the desk cannot tell the two apart: both requests arrived through a
            machine it already trusts. Switch on any single defence and the rogue one stops, while
            the customer still gets paid.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
