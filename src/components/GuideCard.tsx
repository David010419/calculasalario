import Link from "next/link";
import { GUIDE_CATEGORIES, type Guide } from "@/lib/guides";

export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={`/guias/${guide.slug}`}
      className="game-card flex h-full flex-col p-5 transition hover:-translate-y-1"
    >
      <span className="flex items-center justify-between">
        <span aria-hidden="true" className="text-3xl">
          {guide.emoji}
        </span>
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
          {GUIDE_CATEGORIES[guide.category].name}
        </span>
      </span>
      <span className="mt-3 font-heading text-lg font-semibold leading-snug text-text">
        {guide.title}
      </span>
      <span className="mt-2 flex-1 text-sm text-text-muted">{guide.description}</span>
      <span className="mt-4 text-sm font-bold text-primary">
        Leer guía · {guide.minutes} min →
      </span>
    </Link>
  );
}
