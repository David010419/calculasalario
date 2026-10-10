import TweetPreview from "./TweetPreview";
import { campaignShareText } from "@/lib/share";
import { SITE_URL } from "@/lib/site";

const CAMPAIGN_URL = `${SITE_URL}/salario-segun-gobierno`;

export default function CampaignBanner() {
  const text = campaignShareText();
  const xIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(CAMPAIGN_URL)}`;
  const whatsappIntent = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text}\n${CAMPAIGN_URL}`)}`;

  return (
    <aside
      aria-label="Haz campaña compartiendo el simulador"
      className="game-hero mt-14 overflow-hidden rounded-[1.25rem] border-2 border-ink shadow-[6px_6px_0_var(--color-ink)]"
    >
      <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="game-chip px-3 py-1 text-xs sm:text-sm">📣 Haz campaña</span>
          <h2 className="text-outline mt-3 font-heading text-3xl font-bold leading-tight sm:text-4xl">
            Que <span className="text-sun">todo el mundo</span> sepa cuánto cobraría
          </h2>
          <p className="mt-2 text-base font-semibold text-white/90">
            Publica el simulador con un toque: el mensaje ya va escrito, con los cuatro partidos y
            el enlace para que cada uno calcule el suyo.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={xIntent}
              target="_blank"
              rel="noopener noreferrer"
              className="game-btn animate-nudge px-6 py-3.5 text-lg"
              style={{ background: "#000000" }}
            >
              𝕏 Publicar en X
            </a>
            <a
              href={whatsappIntent}
              target="_blank"
              rel="noopener noreferrer"
              className="game-btn px-5 py-3.5 text-base"
              style={{ background: "#128c7e" }}
            >
              💬 Enviar por WhatsApp
            </a>
          </div>
        </div>
        <div className="lg:rotate-1">
          <TweetPreview text={text} />
        </div>
      </div>
    </aside>
  );
}
