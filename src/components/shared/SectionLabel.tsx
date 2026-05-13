export function SectionLabel({
  label,
  number,
  centered,
}: {
  label: string;
  number?: string;
  centered?: boolean;
}) {
  const text = (
    <span className="font-sans text-xs font-medium tracking-widest text-gold uppercase">
      {number ? `${number} — ` : ""}
      {label}
    </span>
  );

  if (centered) {
    return (
      <div className="mb-6 flex items-center justify-center gap-4">
        <div className="h-px min-w-8 flex-1 max-w-[5rem] bg-gold/50" />
        {text}
        <div className="h-px min-w-8 flex-1 max-w-[5rem] bg-gold/50" />
      </div>
    );
  }

  return (
    <div className="mb-6 flex items-center gap-2">
      <div className="h-px w-6 bg-gold" />
      {text}
    </div>
  );
}
