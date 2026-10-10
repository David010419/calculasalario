"use client";

import { useState } from "react";
import { formatEUR } from "@/lib/calculations";
import { SALARY_PAGES, salarySlug } from "@/lib/seo-pages";
import { resultShareText, type ShareRow } from "@/lib/share";
import TweetPreview from "./TweetPreview";

export type { ShareRow };

interface ShareResultsProps {
  brutoAnual: number;
  hijos: number;
  rows: ShareRow[];
}

const STORY_WIDTH = 1080;
const STORY_HEIGHT = 1920;

function signed(value: number): string {
  if (value === 0) return "0 €";
  return `${value > 0 ? "+" : "−"}${formatEUR(Math.abs(value))}`;
}

/** Página de sueldo más cercana, para que el enlace compartido abra una comparativa real. */
function sharePath(brutoAnual: number): string {
  const nearest = SALARY_PAGES.reduce((a, b) =>
    Math.abs(b - brutoAnual) < Math.abs(a - brutoAnual) ? b : a
  );
  return `/salario-segun-gobierno/${salarySlug(nearest)}`;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function drawStory(brutoAnual: number, hijos: number, rows: ShareRow[], host: string): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = STORY_WIDTH;
  canvas.height = STORY_HEIGHT;
  const ctx = canvas.getContext("2d")!;
  const styles = getComputedStyle(document.documentElement);
  const display = `${styles.getPropertyValue("--font-display").trim() || "Arial"}, Arial, sans-serif`;
  const ink = "#0f172a";

  const bg = ctx.createLinearGradient(0, 0, STORY_WIDTH, STORY_HEIGHT);
  bg.addColorStop(0, "#0f1b3d");
  bg.addColorStop(1, "#1e3a8a");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, STORY_WIDTH, STORY_HEIGHT);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Etiqueta superior
  ctx.fillStyle = "#fde047";
  roundRect(ctx, 240, 170, 600, 84, 42);
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = ink;
  ctx.stroke();
  ctx.fillStyle = ink;
  ctx.font = `600 40px ${display}`;
  ctx.fillText("🗳️ Elecciones 29-N", STORY_WIDTH / 2, 214);

  ctx.fillStyle = "#ffffff";
  ctx.font = `700 92px ${display}`;
  ctx.fillText("Mi sueldo según", STORY_WIDTH / 2, 370);
  ctx.fillStyle = "#fde047";
  ctx.fillText("quién gobierne", STORY_WIDTH / 2, 480);

  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = `600 46px ${display}`;
  const hijosText = hijos > 0 ? ` · ${hijos === 1 ? "1 hijo" : `${hijos} hijos`}` : "";
  ctx.fillText(`${formatEUR(brutoAnual)} brutos al año${hijosText}`, STORY_WIDTH / 2, 590);

  // Una tarjeta por partido
  const cardX = 90;
  const cardW = STORY_WIDTH - cardX * 2;
  const cardH = 200;
  const gap = 30;
  let y = 660;
  for (const row of rows) {
    ctx.fillStyle = ink;
    roundRect(ctx, cardX + 10, y + 10, cardW, cardH, 36);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    roundRect(ctx, cardX, y, cardW, cardH, 36);
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = ink;
    ctx.stroke();

    ctx.fillStyle = row.color;
    roundRect(ctx, cardX + 36, y + 40, 250, 120, 28);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = `700 56px ${display}`;
    ctx.fillText(row.party, cardX + 161, y + 102);

    ctx.textAlign = "right";
    ctx.fillStyle = ink;
    ctx.font = `700 84px ${display}`;
    ctx.fillText(`${formatEUR(row.netoMensual)}`, cardX + cardW - 40, y + 76);
    ctx.font = `600 42px ${display}`;
    if (row.id === "actual") {
      ctx.fillStyle = "#5b6478";
      ctx.fillText("al mes · ley actual", cardX + cardW - 40, y + 152);
    } else {
      ctx.fillStyle = row.diffMensual > 0 ? "#059669" : row.diffMensual < 0 ? "#dc2626" : "#5b6478";
      ctx.fillText(`${signed(row.diffMensual)} al mes`, cardX + cardW - 40, y + 152);
    }
    ctx.textAlign = "center";
    y += cardH + gap;
  }

  ctx.fillStyle = "#ffffff";
  ctx.font = `700 60px ${display}`;
  ctx.fillText("¿Y tú? Prueba el tuyo 👇", STORY_WIDTH / 2, y + 70);
  ctx.fillStyle = "#fde047";
  ctx.font = `600 46px ${display}`;
  ctx.fillText(`${host}/salario-segun-gobierno`, STORY_WIDTH / 2, y + 160);
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = `500 30px ${display}`;
  ctx.fillText("Simulación orientativa del IRPF sobre el salario", STORY_WIDTH / 2, STORY_HEIGHT - 70);

  return canvas;
}

export default function ShareResults({ brutoAnual, hijos, rows }: ShareResultsProps) {
  const [status, setStatus] = useState("");

  function shareOnX() {
    const url = `${window.location.origin}${sharePath(brutoAnual)}`;
    const intent = new URL("https://twitter.com/intent/tweet");
    intent.searchParams.set("text", resultShareText(brutoAnual, hijos, rows));
    intent.searchParams.set("url", url);
    window.open(intent.toString(), "_blank", "noopener,noreferrer");
  }

  function shareOnWhatsApp() {
    const url = `${window.location.origin}${sharePath(brutoAnual)}`;
    // encodeURIComponent en lugar de URLSearchParams: WhatsApp no siempre trata "+" como espacio.
    const text = encodeURIComponent(`${resultShareText(brutoAnual, hijos, rows)}
${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank", "noopener,noreferrer");
  }

  async function shareOnInstagram() {
    setStatus("Creando tu imagen…");
    await document.fonts.ready;
    const canvas = drawStory(brutoAnual, hijos, rows, window.location.host);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) {
      setStatus("No se pudo crear la imagen. Inténtalo de nuevo.");
      return;
    }
    const file = new File([blob], "mi-sueldo-segun-gobierno.png", { type: "image/png" });

    // En móvil se abre el menú de compartir del sistema, donde aparece Instagram.
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: "Mi sueldo según quién gobierne" });
        setStatus("");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          setStatus("");
          return;
        }
      }
    }

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(link.href);
    setStatus("Imagen descargada: súbela a tu historia de Instagram.");
  }

  async function copyLink() {
    const url = `${window.location.origin}${sharePath(brutoAnual)}`;
    try {
      await navigator.clipboard.writeText(`${resultShareText(brutoAnual, hijos, rows)}\n${url}`);
      setStatus("Texto y enlace copiados.");
    } catch {
      setStatus("No se pudo copiar. Copia el enlace de la barra de direcciones.");
    }
  }

  return (
    <div
      id="compartir"
      className="mt-6 scroll-mt-24 rounded-2xl border-2 border-ink bg-sun p-5 text-[#0f172a] shadow-[5px_5px_0_var(--color-ink)] sm:p-6"
    >
      <p className="font-heading text-xs font-semibold uppercase tracking-wide">
        Reta a tus amigos
      </p>
      <h3 className="font-heading text-2xl font-bold sm:text-3xl">📣 Comparte tu resultado</h3>
      <p className="mt-1 text-sm font-bold">
        Enseña cuánto cobrarías con cada partido y que prueben el suyo.
      </p>
      <div className="mt-4">
        <TweetPreview text={resultShareText(brutoAnual, hijos, rows)} />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={shareOnX}
          className="game-btn px-4 py-3.5 text-base"
          style={{ background: "#000000" }}
        >
          𝕏 Compartir en X
        </button>
        <button
          type="button"
          onClick={shareOnWhatsApp}
          className="game-btn px-4 py-3.5 text-base"
          style={{ background: "#128c7e" }}
        >
          💬 Compartir por WhatsApp
        </button>
        <button
          type="button"
          onClick={shareOnInstagram}
          className="game-btn px-4 py-3.5 text-base"
          style={{ background: "linear-gradient(45deg, #f58529, #dd2a7b 50%, #8134af)" }}
        >
          📸 Compartir en Instagram
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="game-btn px-4 py-3.5 text-base"
          style={{ background: "#ffffff", color: "#0f172a" }}
        >
          🔗 Copiar texto
        </button>
      </div>
      <p role="status" className="mt-3 min-h-5 text-sm font-bold">
        {status}
      </p>
    </div>
  );
}
