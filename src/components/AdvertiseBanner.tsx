import { CONTACT_EMAIL } from "@/lib/site";

const SUBJECT = encodeURIComponent("Publicidad en CalculaSalario");

export default function AdvertiseBanner() {
  return (
    <aside
      id="publicidad"
      aria-label="Publicidad y colaboraciones"
      className="game-card mt-14 scroll-mt-24 p-5 sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading text-xs font-semibold uppercase tracking-wide text-primary">
            Empresas y marcas
          </p>
          <h2 className="mt-1 font-heading text-xl font-bold text-text sm:text-2xl">
            📢 ¿Quieres anunciarte aquí?
          </h2>
          <p className="mt-1 max-w-xl text-sm font-semibold text-text-muted">
            Gestorías, bancos, formación, empleo o cualquier empresa que quiera llegar a gente que
            está mirando su nómina. También colaboraciones con medios. Escríbenos y te contamos
            formatos y tarifas.
          </p>
        </div>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${SUBJECT}`}
          className="game-btn game-btn-sun shrink-0 self-start px-5 py-3 text-base sm:self-center"
        >
          ✉️ {CONTACT_EMAIL}
        </a>
      </div>
    </aside>
  );
}
