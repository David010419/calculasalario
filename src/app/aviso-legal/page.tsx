import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/LegalPage";
import { CONTACT_EMAIL, LEGAL, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: `Aviso legal y condiciones de uso de ${SITE_NAME}: titularidad, propiedad intelectual y limitación de responsabilidad.`,
  alternates: { canonical: "/aviso-legal" },
};

export default function AvisoLegalPage() {
  return (
    <LegalPage title="Aviso legal">
      <LegalSection title="1. Titular del sitio web">
        <p>
          En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de
          Comercio Electrónico, se informa de los datos del titular de este sitio web:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Sitio web: {SITE_NAME} ({SITE_URL})
          </li>
          {LEGAL.ownerName && <li>Titular: {LEGAL.ownerName}</li>}
          {LEGAL.nif && <li>NIF: {LEGAL.nif}</li>}
          {LEGAL.address && <li>Domicilio: {LEGAL.address}</li>}
          <li>
            Contacto:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-primary hover:underline">
              {CONTACT_EMAIL}
            </a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="2. Objeto">
        <p>
          {SITE_NAME} ofrece de forma gratuita calculadoras y simuladores orientativos sobre
          salarios, cotizaciones e IRPF en España, incluida una comparativa de las propuestas
          fiscales publicadas por distintos partidos políticos.
        </p>
      </LegalSection>

      <LegalSection title="3. Carácter orientativo de la información">
        <p>
          Los resultados son estimaciones basadas en modelos simplificados y en información
          pública. No constituyen asesoramiento fiscal, laboral, financiero ni jurídico, y pueden
          diferir de tu nómina o de tu declaración de la renta. Para decisiones importantes
          consulta con un profesional.
        </p>
        <p>
          Las propuestas de los partidos políticos se recogen tal y como se han publicado, con los
          supuestos indicados en cada página. No son normas en vigor y pueden cambiar.
        </p>
      </LegalSection>

      <LegalSection title="4. Independencia">
        <p>
          Este sitio es independiente. No está vinculado, patrocinado ni avalado por ningún partido
          político, administración pública ni organismo oficial. Los nombres y siglas de los
          partidos se utilizan únicamente para identificar sus propuestas.
        </p>
      </LegalSection>

      <LegalSection title="5. Propiedad intelectual">
        <p>
          El diseño, los textos y el código de este sitio pertenecen a su titular. Puedes compartir
          tus resultados y enlazar libremente a cualquier página. No está permitida la reproducción
          masiva del contenido sin autorización.
        </p>
      </LegalSection>

      <LegalSection title="6. Responsabilidad">
        <p>
          El titular no se hace responsable de las decisiones tomadas a partir de la información
          del sitio, ni de los contenidos de los sitios de terceros enlazados, incluidas las
          fuentes citadas y las redes sociales a las que puedes compartir tus resultados.
        </p>
      </LegalSection>

      <LegalSection title="7. Publicidad">
        <p>
          El sitio puede mostrar publicidad de terceros y enlaces patrocinados, que se identifican
          como tales. Para anunciarte, escribe a {CONTACT_EMAIL}.
        </p>
      </LegalSection>

      <LegalSection title="8. Legislación aplicable">
        <p>Este aviso legal se rige por la legislación española.</p>
      </LegalSection>
    </LegalPage>
  );
}
