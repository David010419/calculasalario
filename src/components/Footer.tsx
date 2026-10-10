import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-text-muted sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} CalculaSalario. Datos referenciales,
            no sustituyen asesoramiento laboral o fiscal profesional.
          </p>
          <nav className="flex flex-wrap gap-4">
            <Link href="/" className="hover:text-primary">Calculadora</Link>
            <Link href="/salario-segun-gobierno" className="hover:text-primary">Según el gobierno</Link>
            <Link href="/guias" className="hover:text-primary">Guías</Link>
            <Link href="/empleos-en-auge" className="hover:text-primary">Empleos en auge</Link>
            <Link href="/faq" className="hover:text-primary">FAQ</Link>
            <Link href="/sobre" className="hover:text-primary">Sobre nosotros</Link>
            <Link href="/#publicidad" className="hover:text-primary">Publicidad</Link>
            <Link href="/aviso-legal" className="hover:text-primary">Aviso legal</Link>
            <Link href="/politica-de-privacidad" className="hover:text-primary">Privacidad</Link>
            <Link href="/politica-de-cookies" className="hover:text-primary">Cookies</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
