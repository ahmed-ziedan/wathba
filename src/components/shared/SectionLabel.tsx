export function SectionLabel({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="w-6 h-px bg-gold" />
      <span className="text-gold text-xs font-medium tracking-widest uppercase font-sans">
        {number} — {label}
      </span>
    </div>
  );
}
