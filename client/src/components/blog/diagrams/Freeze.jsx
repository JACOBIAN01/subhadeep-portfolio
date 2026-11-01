// Why some stolen funds stopped and some did not: a stablecoin has an issuer
// that can blacklist an address; Bitcoin and Ether do not.
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import DiagramFrame from "./DiagramFrame";

function Lane({ tone, token, note, frozen }) {
  const colour = frozen ? "#1f9d55" : "#d93025";
  return (
    <div className="rounded-2xl border border-hairline bg-white p-4">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-sans text-sm font-semibold text-ink">{token}</span>
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: colour }}>
          {frozen ? "can be frozen" : "cannot be frozen"}
        </span>
      </div>

      <div className="relative mt-3 h-11 overflow-hidden rounded-xl bg-canvas-alt">
        {/* the wall, only on the stablecoin lane */}
        {frozen && (
          <div
            className="absolute inset-y-0 right-[32%] w-1 rounded-full"
            style={{ background: colour }}
            aria-hidden="true"
          />
        )}
        <motion.div
          aria-hidden="true"
          className="absolute top-1/2 flex h-7 -translate-y-1/2 items-center rounded-full px-3 font-sans text-[11px] font-bold text-white shadow"
          style={{ background: frozen ? "#86868b" : "#d93025" }}
          initial={{ left: "2%" }}
          whileInView={{ left: frozen ? ["2%", "60%", "60%"] : ["2%", "102%"] }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            duration: frozen ? 2.6 : 2.2,
            times: frozen ? [0, 0.55, 1] : [0, 1],
            repeat: Infinity,
            repeatDelay: 1.4,
            ease: "easeInOut",
          }}
        >
          {frozen ? "stuck" : "gone"}
        </motion.div>
      </div>

      <p className="mt-2.5 font-sans text-[12px] leading-relaxed text-subtle">{note}</p>
      <span className="sr-only">{tone}</span>
    </div>
  );
}

export default function Freeze() {
  return (
    <DiagramFrame label="Same theft, two outcomes">
      <div className="grid gap-3 sm:grid-cols-2">
        <Lane
          tone="stablecoin"
          token="USDT · USDC"
          frozen
          note="Issued by Tether and Circle. Their contracts include a blacklist, so they can make tokens at a named address permanently unspendable."
        />
        <Lane
          tone="native"
          token="Bitcoin · Ether"
          frozen={false}
          note="No issuer, no blacklist, no office to call. They can only be traced, and refused at the exits where crypto turns back into normal money."
        />
      </div>
    </DiagramFrame>
  );
}
