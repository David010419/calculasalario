import { calcBreakdown, formatEUR } from "./calculations";
import { SCENARIOS } from "./scenarios";

export interface ShareRow {
  id: string;
  party: string;
  emoji: string;
  color: string;
  netoMensual: number;
  diffMensual: number;
}

export const SHARE_HASHTAGS = "#29N #EleccionesGenerales";

function diffMark(value: number): string {
  if (value > 0) return ` ▲ +${formatEUR(value)}`;
  if (value < 0) return ` ▼ −${formatEUR(Math.abs(value))}`;
  return " ＝";
}

function partyLines(rows: ShareRow[]): string[] {
  return rows.map((row) =>
    row.id === "actual"
      ? `${row.emoji} ${row.party} (hoy): ${formatEUR(row.netoMensual)}/mes`
      : `${row.emoji} ${row.party}: ${formatEUR(row.netoMensual)}${diffMark(row.diffMensual)}`
  );
}

/** Texto del resultado de un usuario, para X, WhatsApp y el portapapeles. */
export function resultShareText(brutoAnual: number, hijos: number, rows: ShareRow[]): string {
  const hijosText = hijos > 0 ? ` · ${hijos === 1 ? "1 hijo" : `${hijos} hijos`}` : "";
  return [
    "💶 Mi sueldo según quién gobierne",
    `${formatEUR(brutoAnual)} brutos${hijosText}`,
    "",
    ...partyLines(rows),
    "",
    "🗳️ ¿Y el tuyo? Calcúlalo y comparte 👇",
    SHARE_HASHTAGS,
  ].join("\n");
}

const CAMPAIGN_EXAMPLE = 30000;

/** Tuit genérico para difundir el simulador, con un ejemplo de 30.000 € brutos. */
export function campaignShareText(): string {
  const actual = calcBreakdown(CAMPAIGN_EXAMPLE, "actual");
  const rows: ShareRow[] = SCENARIOS.map((scenario) => {
    const breakdown = calcBreakdown(CAMPAIGN_EXAMPLE, scenario.id);
    return {
      id: scenario.id,
      party: scenario.party,
      emoji: scenario.emoji,
      color: scenario.badgeColor,
      netoMensual: breakdown.netoMensual,
      diffMensual: breakdown.netoMensual - actual.netoMensual,
    };
  });
  return [
    "🗳️ ¿Cuánto cobrarías según quién gobierne?",
    `Ejemplo con ${formatEUR(CAMPAIGN_EXAMPLE)} brutos:`,
    "",
    ...partyLines(rows),
    "",
    "💶 Calcula el tuyo en 10 segundos 👇",
    SHARE_HASHTAGS,
  ].join("\n");
}
