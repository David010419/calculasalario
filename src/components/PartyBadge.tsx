import type { CSSProperties } from "react";
import type { TaxScenario } from "@/lib/scenarios";

interface PartyBadgeProps {
  scenario: TaxScenario;
  className?: string;
  style?: CSSProperties;
}

/** Emblema propio con las siglas y el color del partido (no es el logotipo oficial). */
export default function PartyBadge({ scenario, className = "", style }: PartyBadgeProps) {
  return (
    <span
      className={`flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-ink font-heading font-bold text-white shadow-[3px_3px_0_var(--color-ink)] sm:h-20 sm:w-20 ${
        scenario.party.length > 3 ? "text-sm sm:text-lg" : "text-lg sm:text-2xl"
      } ${className}`}
      style={{ backgroundColor: scenario.badgeColor, ...style }}
    >
      {scenario.party}
    </span>
  );
}
