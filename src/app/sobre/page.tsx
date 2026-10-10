import type { Metadata } from "next";
import Link from "next/link";
import { CAREERS, CCAAS } from "@/lib/data";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre nosotros y metodología",
  description:
    "Conoce la metodología detrás de la Calculadora de Salarios España: fuentes de datos, cálculo de IRPF y objetivo de la herramienta.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-text sm:text-3xl">Sobre nosotros</h1>
      <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">
        Calculadora de Salarios España es una herramienta gratuita para ayudarte a entender cuánto
        podrías ganar según tu carrera, tu experiencia, tu comunidad autónoma y el sector en el que
        trabajas. Nuestro objetivo es aportar transparencia salarial al mercado laboral español.
      </p>

      <h2 className="mt-8 font-heading text-lg font-semibold text-text sm:text-xl">
        Metodología
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-text-muted">
        Partimos de rangos salariales orientativos de elaboración propia para {CAREERS.length}+
        profesiones. Sobre ese rango aplicamos modificadores por años de experiencia, nivel de
        especialización, comunidad autónoma (cubrimos las {CCAAS.length} CC.AA.) y tipo de sector.
        Después calculamos la cotización a la Seguridad Social y el IRPF con la normativa de 2026:
        tipo de cotización del trabajador del 6,50 %, 2.000 € de gastos deducibles, reducción por
        rendimientos del trabajo, mínimo personal y deducción para rentas bajas.
      </p>

      <h2 className="mt-8 font-heading text-lg font-semibold text-text sm:text-xl">
        Simulador electoral
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-text-muted">
        El{" "}
        <Link href="/salario-segun-gobierno" className="font-semibold text-primary hover:underline">
          simulador de sueldo según quién gobierne
        </Link>{" "}
        aplica al mismo salario el IRPF que propone cada partido. Cada propuesta enlaza su fuente y
        explica los supuestos que hemos tenido que tomar. Es un proyecto independiente, sin
        vinculación con ningún partido ni administración.
      </p>

      <h2 className="mt-8 font-heading text-lg font-semibold text-text sm:text-xl">
        Guías
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-text-muted">
        Además de las calculadoras publicamos{" "}
        <Link href="/guias" className="font-semibold text-primary hover:underline">
          guías gratuitas
        </Link>{" "}
        sobre nómina e impuestos, búsqueda de empleo y formación. Enlazamos las fuentes oficiales
        de cada una para que puedas comprobar los datos.
      </p>

      <h2 className="mt-8 font-heading text-lg font-semibold text-text sm:text-xl">
        Contacto
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-text-muted">
        Si encuentras un error o quieres proponer una mejora, escríbenos a{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-primary hover:underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>

      <h2 className="mt-8 font-heading text-lg font-semibold text-text sm:text-xl">
        Limitaciones
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-text-muted">
        Los resultados son estimaciones orientativas, no una tasación oficial. El salario real
        depende de la empresa, el convenio colectivo aplicable, la negociación individual y otros
        factores no capturados por este modelo. Consulta siempre con un asesor laboral o fiscal para
        decisiones importantes.
      </p>

      <Link href="/" className="mt-8 inline-block font-semibold text-primary hover:underline">
        ← Volver a la calculadora
      </Link>
    </div>
  );
}
