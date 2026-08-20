interface AdSlotProps {
  variant: "top" | "middle" | "bottom" | "smartlink";
  className?: string;
}

const LABELS: Record<AdSlotProps["variant"], string> = {
  top: "Publicidad",
  middle: "Publicidad",
  bottom: "Publicidad",
  smartlink: "Ofertas patrocinadas",
};

const SIZES: Record<AdSlotProps["variant"], string> = {
  top: "min-h-[100px] max-w-[300px]",
  middle: "min-h-[90px] w-full",
  bottom: "min-h-[100px] max-w-[300px]",
  smartlink: "min-h-[52px] w-full",
};

export default function AdSlot({ variant, className = "" }: AdSlotProps) {
  return (
    <div
      className={`ad-container-${variant} my-5 flex items-center justify-center rounded-lg border border-dashed border-border bg-surface/60 mx-auto ${SIZES[variant]} ${className}`}
      aria-hidden="true"
      data-ad-slot={variant}
    >
      <span className="text-xs uppercase tracking-wide text-text-muted">{LABELS[variant]}</span>
    </div>
  );
}
