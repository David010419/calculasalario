import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-surface/95 backdrop-blur dark:border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-ink bg-sun font-heading text-lg font-bold text-[#0f172a] shadow-[2px_2px_0_var(--color-ink)]">
            €
          </span>
          <span className="font-heading text-base font-bold text-text sm:text-lg">
            Calcula<span className="text-primary">Salario</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-bold text-secondary md:flex">
          <Link href="/" className="hover:text-primary">Calculadora</Link>
          <Link href="/empleos-en-auge" className="hover:text-primary">Empleos en auge</Link>
          <Link href="/faq" className="hover:text-primary">FAQ</Link>
          <Link href="/sobre" className="hover:text-primary">Sobre nosotros</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/salario-segun-gobierno" className="game-chip px-3 py-1.5 text-xs sm:text-sm">
            🗳️ Modo 29-N
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
