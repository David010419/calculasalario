import { getCareer } from "@/lib/data";

interface RelatedCareersProps {
  careerIds: string[];
  onSelect: (id: string) => void;
}

export default function RelatedCareers({ careerIds, onSelect }: RelatedCareersProps) {
  const careers = careerIds.map(getCareer).filter((c): c is NonNullable<typeof c> => Boolean(c));
  if (careers.length === 0) return null;

  return (
    <div>
      <h3 className="mb-3 font-heading text-lg font-semibold text-text">Profesiones relacionadas</h3>
      <div className="flex flex-wrap gap-2">
        {careers.map((career) => (
          <button
            key={career.id}
            onClick={() => onSelect(career.id)}
            className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-secondary transition hover:border-primary hover:text-primary cursor-pointer"
          >
            {career.name}
          </button>
        ))}
      </div>
    </div>
  );
}
