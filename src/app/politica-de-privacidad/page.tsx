import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { LegalSection } from "@/components/LegalPage";
import { CONTACT_EMAIL, LEGAL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Política de privacidad de ${SITE_NAME}: qué datos se tratan, con qué finalidad y cómo ejercer tus derechos.`,
  alternates: { canonical: "/politica-de-privacidad" },
};

const LINK = "font-semibold text-primary hover:underline";

export default function PrivacidadPage() {
  return (
    <LegalPage title="Política de privacidad">
      <LegalSection title="1. Resumen">
        <p>
          {SITE_NAME} no tiene registro de usuarios ni formularios. Los datos que introduces en las
          calculadoras (salario, profesión, comunidad, hijos) se procesan en tu propio navegador y
          no se envían ni se guardan en nuestros servidores.
        </p>
      </LegalSection>

      <LegalSection title="2. Responsable del tratamiento">
        <p>
          {LEGAL.ownerName
            ? `${LEGAL.ownerName}, titular de ${SITE_NAME}.`
            : `El titular de ${SITE_NAME}.`}{" "}
          Contacto:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className={LINK}>
            {CONTACT_EMAIL}
          </a>
          . Más datos en el{" "}
          <Link href="/aviso-legal" className={LINK}>
            aviso legal
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="3. Qué datos se tratan">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-text">Datos de las calculadoras:</strong> se quedan en tu
            dispositivo. El historial de cálculos y la preferencia de modo claro u oscuro se guardan
            en el almacenamiento local de tu navegador y puedes borrarlos cuando quieras.
          </li>
          <li>
            <strong className="text-text">Datos técnicos de navegación:</strong> como cualquier
            sitio web, el proveedor de alojamiento registra de forma automática datos técnicos
            (dirección IP, fecha, página solicitada, navegador) para servir las páginas y
            garantizar la seguridad.
          </li>
          <li>
            <strong className="text-text">Correo electrónico:</strong> si nos escribes, trataremos
            tu dirección y el contenido del mensaje únicamente para responderte.
          </li>
          <li>
            <strong className="text-text">Publicidad:</strong> cuando haya anuncios activos, el
            proveedor de publicidad (Google) puede usar cookies e identificadores para mostrar y
            medir anuncios, según lo que elijas en el aviso de consentimiento. Consulta la{" "}
            <Link href="/politica-de-cookies" className={LINK}>
              política de cookies
            </Link>
            .
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Finalidad y base jurídica">
        <p>
          Los datos técnicos se tratan por interés legítimo en el funcionamiento y la seguridad del
          sitio. Los correos, para atender tu consulta. Las cookies publicitarias, solo con tu
          consentimiento.
        </p>
      </LegalSection>

      <LegalSection title="5. Conservación">
        <p>
          Los registros técnicos se conservan el tiempo que establezca el proveedor de alojamiento.
          Los correos, el tiempo necesario para atender la consulta. Lo guardado en tu navegador
          permanece hasta que lo borres.
        </p>
      </LegalSection>

      <LegalSection title="6. Destinatarios">
        <p>
          No vendemos ni cedemos datos personales. Intervienen como proveedores el servicio de
          alojamiento web y, cuando haya anuncios, Google como proveedor de publicidad, que puede
          tratar datos fuera del Espacio Económico Europeo con las garantías previstas en la
          normativa.
        </p>
        <p>
          Al usar los botones de compartir se abre la red social que elijas (X, WhatsApp,
          Instagram), que aplica su propia política de privacidad.
        </p>
      </LegalSection>

      <LegalSection title="7. Tus derechos">
        <p>
          Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y
          portabilidad escribiendo a {CONTACT_EMAIL}. También puedes presentar una reclamación ante
          la Agencia Española de Protección de Datos (www.aepd.es).
        </p>
      </LegalSection>
    </LegalPage>
  );
}
