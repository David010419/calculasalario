import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { ADSENSE_CLIENT, CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";
import Header from "@/components/Header";
import AdSenseLoader from "@/components/AdSenseLoader";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import "./globals.css";

const display = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Calculadora Salarios España 2026 | Sueldo neto por carrera y según quién gobierne",
    template: `%s | ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  category: "finance",
  verification: {
    google: "A2_24260YChHDsgp0oSXpn8UkEC33VRqbH5ugOKLvCo",
  },
  // Verificación de la cuenta de AdSense sin cargar su script antes del consentimiento.
  ...(ADSENSE_CLIENT ? { other: { "google-adsense-account": ADSENSE_CLIENT } } : {}),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  description:
    "Calcula tu salario estimado en España según tu carrera, experiencia y comunidad autónoma. Comparativa con media nacional y proyección de crecimiento.",
  keywords: [
    "calculadora salarios España",
    "salario estimado carrera",
    "calculadora sueldo",
    "simulador salario",
    "salarios por carrera España",
    "sueldo neto 2026",
    "calculadora sueldo neto",
    "bruto a neto",
    "IRPF 2026",
    "calculadora IRPF elecciones",
    "sueldo según quién gobierne",
    "elecciones generales 29N",
    "IRPF PP",
    "IRPF Vox",
    "IRPF Sumar",
    "IRPF PSOE",
  ],
  openGraph: {
    title: "Calculadora de Salarios España 2026",
    description: "Descubre cuánto deberías ganar según tu carrera, experiencia y región",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Salarios España 2026",
    description: "Descubre cuánto deberías ganar según tu carrera, experiencia y región",
  },
  alternates: {
    canonical: "/",
  },
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description:
        "Calculadora de salarios en España: sueldo bruto y neto por carrera, experiencia y comunidad, y comparativa del IRPF que propone cada partido.",
      inLanguage: "es-ES",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      email: CONTACT_EMAIL,
    },
  ],
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-text">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <AdSenseLoader />
      </body>
    </html>
  );
}
