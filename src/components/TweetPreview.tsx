/** Vista previa del mensaje que se va a publicar, con el aspecto de una publicación de X. */
export default function TweetPreview({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border-2 border-ink bg-white p-4 text-left text-[#0f172a] shadow-[3px_3px_0_var(--color-ink)]">
      <div className="flex items-center gap-2.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f172a] font-heading text-lg font-bold text-sun">
          €
        </span>
        <span className="leading-tight">
          <span className="block font-heading text-sm font-semibold">Tú</span>
          <span className="block text-xs text-[#5b6478]">así se verá tu publicación</span>
        </span>
        <span aria-hidden="true" className="ml-auto text-xl font-bold">
          𝕏
        </span>
      </div>
      <p className="mt-3 text-[15px] font-semibold leading-relaxed">
        {text.split("\n").map((line, i) => (
          <span key={i} className="block min-h-[0.6rem]">
            {line.split(/(#\S+)/).map((part, j) =>
              part.startsWith("#") ? (
                <span key={j} className="text-[#1d9bf0]">
                  {part}
                </span>
              ) : (
                part
              )
            )}
          </span>
        ))}
      </p>
    </div>
  );
}
