import { formatEUR } from "@/lib/calculations";
import { getCareer } from "@/lib/data";
import type { CalculatorInput } from "@/lib/types";

export interface HistoryEntry {
  input: CalculatorInput;
  netoMensual: number;
  timestamp: number;
}

interface HistoryPanelProps {
  entries: HistoryEntry[];
  onSelect: (input: CalculatorInput) => void;
  onClear: () => void;
}

export default function HistoryPanel({ entries, onSelect, onClear }: HistoryPanelProps) {
  if (entries.length === 0) return null;

  return (
    <div className="game-card p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-heading text-sm font-semibold text-text">Búsquedas recientes</h3>
        <button onClick={onClear} className="text-xs text-text-muted hover:text-primary cursor-pointer">
          Borrar
        </button>
      </div>
      <ul className="space-y-1">
        {entries.map((entry, i) => {
          const career = getCareer(entry.input.careerId);
          if (!career) return null;
          return (
            <li key={`${entry.timestamp}-${i}`}>
              <button
                onClick={() => onSelect(entry.input)}
                className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm text-secondary transition hover:bg-background cursor-pointer"
              >
                <span>{career.name}</span>
                <span className="font-medium text-text-muted">{formatEUR(entry.netoMensual)}/mes</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
