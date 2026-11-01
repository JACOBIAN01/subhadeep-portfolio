// Shared chrome for every blog diagram: a light card with a small label,
// so diagrams read as one family across posts.
export default function DiagramFrame({ label, children, tint = "#fbfbfd" }) {
  return (
    <div
      className="rounded-3xl border border-hairline p-4 sm:p-6"
      style={{ background: tint }}
      data-animated
    >
      {label && (
        <div className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-faint">
          {label}
        </div>
      )}
      {children}
    </div>
  );
}
