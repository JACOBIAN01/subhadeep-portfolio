// src/components/SectionTitle.jsx
export default function SectionTitle({ kicker, title, right }) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        {kicker && (
          <div className="text-xs tracking-widest uppercase text-white/60 mb-1">
            {kicker}
          </div>
        )}
        <h2 className="text-2xl md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          {title}
        </h2>
      </div>
      {right && <div>{right}</div>}
    </div>
  );
}
