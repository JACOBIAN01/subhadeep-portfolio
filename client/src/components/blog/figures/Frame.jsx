// Shared chrome for every figure: a light card with a small label.
export default function Frame({ label, children }) {
  return (
    <div className="rounded-3xl border border-hairline bg-canvas p-4 sm:p-6" data-animated>
      {label && (
        <div className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-faint">
          {label}
        </div>
      )}
      {children}
    </div>
  );
}
