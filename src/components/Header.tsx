import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            €
          </span>
          <span className="font-heading text-base font-bold text-text sm:text-lg">
            Calculadora Salarios <span className="text-primary">España</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-secondary sm:flex">
          <Link href="/" className="hover:text-primary">Calculadora</Link>
          <Link href="/empleos-en-auge" className="hover:text-primary">Empleos en auge</Link>
          <Link href="/faq" className="hover:text-primary">FAQ</Link>
          <Link href="/sobre" className="hover:text-primary">Sobre nosotros</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
