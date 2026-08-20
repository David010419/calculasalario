"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import CalculatorForm from "./CalculatorForm";
import ResultsPanel from "./ResultsPanel";
import HistoryPanel, { type HistoryEntry } from "./HistoryPanel";
import AdSlot from "./AdSlot";
import { computeFullResult } from "@/lib/calculations";
import type { CalculatorInput } from "@/lib/types";

const DEFAULT_INPUT: CalculatorInput = {
  careerId: "ingenieria-informatica",
  years: 3,
  ccaaId: "madrid",
  sectorId: "privado",
  levelId: "junior",
};

const HISTORY_KEY = "salario-historial";

function inputFromParams(params: URLSearchParams): CalculatorInput | null {
  const careerId = params.get("carrera");
  if (!careerId) return null;
  return {
    careerId,
    years: Number(params.get("exp") ?? DEFAULT_INPUT.years),
    ccaaId: params.get("ccaa") ?? DEFAULT_INPUT.ccaaId,
    sectorId: (params.get("sector") as CalculatorInput["sectorId"]) ?? DEFAULT_INPUT.sectorId,
    levelId: (params.get("nivel") as CalculatorInput["levelId"]) ?? DEFAULT_INPUT.levelId,
  };
}

function inputKey(input: CalculatorInput): string {
  return `${input.careerId}|${input.years}|${input.ccaaId}|${input.sectorId}|${input.levelId}`;
}

function writeInputToURL(input: CalculatorInput) {
  const params = new URLSearchParams({
    carrera: input.careerId,
    exp: String(input.years),
    ccaa: input.ccaaId,
    sector: input.sectorId,
    nivel: input.levelId,
  });
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, "", newUrl);
}

export default function Calculator() {
  const searchParams = useSearchParams();
  const [input, setInput] = useState<CalculatorInput>(DEFAULT_INPUT);
  const [submittedInput, setSubmittedInput] = useState<CalculatorInput>(DEFAULT_INPUT);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);
  const lastAppliedKeyRef = useRef<string>(inputKey(DEFAULT_INPUT));

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      // One-time hydration of client-only localStorage state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      /* ignore corrupted storage */
    }
  }, []);

  const persistHistory = useCallback((entries: HistoryEntry[]) => {
    setHistory(entries);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
    } catch {
      /* storage unavailable */
    }
  }, []);

  const applyCalculation = useCallback(
    (next: CalculatorInput, opts: { updateUrl: boolean; scroll: boolean }) => {
      lastAppliedKeyRef.current = inputKey(next);
      setSubmittedInput(next);
      if (opts.updateUrl) writeInputToURL(next);

      const fullResult = computeFullResult(next);
      if (fullResult) {
        setHistory((prev) => {
          const filtered = prev.filter((h) => h.input.careerId !== next.careerId);
          const updated: HistoryEntry[] = [
            { input: next, netoMensual: fullResult.breakdown.netoMensual, timestamp: Date.now() },
            ...filtered,
          ].slice(0, 5);
          try {
            localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
          } catch {
            /* storage unavailable */
          }
          return updated;
        });
      }

      if (opts.scroll) {
        requestAnimationFrame(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    },
    []
  );

  // Sync when the URL changes from an external navigation (career chip links, etc.)
  useEffect(() => {
    const fromUrl = inputFromParams(searchParams);
    if (!fromUrl) return;
    if (inputKey(fromUrl) === lastAppliedKeyRef.current) return;
    setInput(fromUrl);
    applyCalculation(fromUrl, { updateUrl: false, scroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const result = useMemo(() => computeFullResult(submittedInput), [submittedInput]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams({
      carrera: submittedInput.careerId,
      exp: String(submittedInput.years),
      ccaa: submittedInput.ccaaId,
      sector: submittedInput.sectorId,
      nivel: submittedInput.levelId,
    });
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  }, [submittedInput]);

  function handleSelectCareer(careerId: string) {
    const next = { ...submittedInput, careerId };
    setInput(next);
    applyCalculation(next, { updateUrl: true, scroll: true });
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <div className="lg:sticky lg:top-20 space-y-5">
          <CalculatorForm
            input={input}
            onChange={setInput}
            onSubmit={() => applyCalculation(input, { updateUrl: true, scroll: true })}
          />
          <HistoryPanel
            entries={history}
            onSelect={(historicInput) => {
              setInput(historicInput);
              applyCalculation(historicInput, { updateUrl: true, scroll: true });
            }}
            onClear={() => persistHistory([])}
          />
        </div>
      </div>

      <div className="lg:col-span-3" ref={resultsRef}>
        <AdSlot variant="middle" />
        {result && (
          <ResultsPanel
            input={submittedInput}
            result={result}
            shareUrl={shareUrl}
            onSelectCareer={handleSelectCareer}
          />
        )}
      </div>
    </div>
  );
}
