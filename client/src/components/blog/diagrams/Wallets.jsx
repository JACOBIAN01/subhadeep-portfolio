// Cold wallet vs hot wallet. A coin refills the hot wallet from cold storage,
// then pays out to a customer, on a loop.
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiLock, FiUnlock } from "react-icons/fi";
import DiagramFrame from "./DiagramFrame";

const coin = (delay) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: [0, 1, 1, 0] },
  viewport: { once: false, amount: 0.4 },
  transition: { duration: 3.2, times: [0, 0.12, 0.8, 1], repeat: Infinity, repeatDelay: 1.2, delay },
});

function Pane({ tone, icon, kicker, title, body, share }) {
  const accent = tone === "cold" ? "#0066cc" : "#ff9500";
  const wash = tone === "cold" ? "#eff6ff" : "#fff7ed";
  return (
    <div
      className="flex-1 rounded-2xl border p-5 sm:p-6"
      style={{ borderColor: `${accent}33`, background: wash }}
    >
      <div className="flex items-center gap-2" style={{ color: accent }}>
        {icon}
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.1em]">{kicker}</span>
      </div>
      <div className="mt-2 font-sans text-lg font-semibold tracking-tight text-ink">{title}</div>
      <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-subtle">{body}</p>
      <div className="mt-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-white">
          <motion.div
            className="h-full rounded-full"
            style={{ background: accent }}
            initial={{ width: 0 }}
            whileInView={{ width: `${share}%` }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <div className="mt-1.5 font-sans text-[11px] font-medium" style={{ color: accent }}>
          {share}% of funds, roughly
        </div>
      </div>
    </div>
  );
}

export default function Wallets() {
  return (
    <DiagramFrame label="Where an exchange keeps customer funds">
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-5">
        <Pane
          tone="cold"
          icon={<FiLock size={14} aria-hidden="true" />}
          kicker="Cold wallet"
          title="The vault"
          body="Keys kept offline. Slow to open, on purpose. Most customer funds sleep here."
          share={95}
        />

        <div className="relative flex items-center justify-center sm:w-16" aria-hidden="true">
          <div className="h-px w-full bg-hairline sm:h-full sm:w-px" />
          <motion.div
            {...coin(0)}
            className="absolute flex h-7 w-7 items-center justify-center rounded-full bg-ink font-sans text-[10px] font-bold text-white shadow-md"
          >
            ₿
          </motion.div>
        </div>

        <Pane
          tone="hot"
          icon={<FiUnlock size={14} aria-hidden="true" />}
          kicker="Hot wallet"
          title="The till"
          body="Online so withdrawals pay out instantly. Holds a working balance, not everything."
          share={5}
        />
      </div>

      <div className="mt-4 flex items-center justify-end gap-2" aria-hidden="true">
        <span className="font-sans text-[11px] font-medium text-subtle">pays out to you</span>
        <motion.span
          {...coin(1.4)}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff9500] font-sans text-[10px] font-bold text-white"
        >
          ₿
        </motion.span>
      </div>
    </DiagramFrame>
  );
}
