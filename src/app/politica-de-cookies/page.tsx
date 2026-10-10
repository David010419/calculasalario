import type { Metadata } from "next";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import LegalPage, { LegalSection } from "@/components/LegalPage";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: `Política de cookies de ${SITE_NAME}: qué cookies y almacenamiento local se usan, para qué y cómo cambiar tu elección.`,
  alternates: { canonical: "/politica-de-cookies" },
};

const ROWS = [
  {
    name: "theme",
    type: "Técnica · almacenamiento local",
    purpose: "Recordar el modo claro u oscuro",
    duration: "Hasta que la borres",
  },
  {
    name: "salario-historial",
    type: "Técnica · almacenamiento local",
    purpose: "Guardar tus últimos cálculos en tu dispositivo",
    duration: "Hasta que la borres",
  },
  {
    name: "cookie-consent",
    type: "Técnica · almacenamiento local",
    purpose: "Recordar tu elección sobre las cookies",
    duration: "Hasta que la borres",
  },
  {
    name: "Google AdSense",
    type: "Publicidad · terceros",
    purpose: "Mostrar y medir anuncios. Solo cuando la publicidad esté activa y según tu consentimiento",
    duration: "La que fije Google",
  },
];

export default function CookiesPage() {
  return (
    <LegalPage title="Política de cookies">
      <LegalSection title="1. Qué son las cookies">
        <p>
          Las cookies y tecnologías similares, como el almacenamiento local del navegador, son
          pequeños archivos que un sitio web guarda en tu dispositivo para recordar información
          entre visitas.
        </p>
      </LegalSection>

      <LegalSection title="2. Qué usa este sitio">
        <div className="game-card overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-border text-left text-xs uppercase tracking-wide">
                <th scope="col" className="px-4 py-3 font-bold">Nombre</th>
                <th scope="col" className="px-4 py-3 font-bold">Tipo</th>
                <th scope="col" className="px-4 py-3 font-bold">Finalidad</th>
                <th scope="col" className="px-4 py-3 font-bold">Duración</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.name} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-semibold text-text">{row.name}</td>
                  <td className="px-4 py-3">{row.type}</td>
                  <td className="px-4 py-3">{row.purpose}</td>
                  <td className="px-4 py-3">{row.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Las entradas técnicas son necesarias para que el sitio funcione como esperas y no
          requieren consentimiento. Para saber cuántas visitas recibe el sitio usamos Vercel Web
          Analytics, que no utiliza cookies ni guarda identificadores en tu dispositivo: solo
          genera estadísticas agregadas y anónimas.
        </p>
      </LegalSection>

      <LegalSection title="3. Cookies de publicidad">
        <p>
          Cuando haya anuncios, Google y sus socios pueden usar cookies para mostrar anuncios,
          personalizados o no según lo que elijas, y medir su rendimiento. Puedes consultar cómo
          usa Google esta información en policies.google.com/technologies/partner-sites.
        </p>
      </LegalSection>

      <LegalSection title="4. Cómo cambiar tu elección">
        <p>Puedes volver a ver el aviso de cookies y cambiar tu elección en cualquier momento:</p>
        <CookieSettingsButton />
        <p>
          También puedes borrar o bloquear las cookies y el almacenamiento local desde la
          configuración de tu navegador.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
