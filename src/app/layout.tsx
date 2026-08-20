import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://calculadora-salarios.es";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Calculadora Salarios España 2025 | Por Carrera y Experiencia",
  description:
    "Calcula tu salario estimado en España según tu carrera, experiencia y comunidad autónoma. Comparativa con media nacional y proyección de crecimiento.",
  keywords: [
    "calculadora salarios España",
    "salario estimado carrera",
    "calculadora sueldo",
    "simulador salario",
    "salarios por carrera España",
  ],
  openGraph: {
    title: "Calculadora de Salarios España 2025",
    description: "Descubre cuánto deberías ganar según tu carrera, experiencia y región",
    url: SITE_URL,
    siteName: "Calculadora de Salarios España",
    images: ["/og-image.png"],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Salarios España 2025",
    description: "Descubre cuánto deberías ganar según tu carrera, experiencia y región",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Calculadora de Salarios España 2025",
  description:
    "Herramienta profesional para calcular salarios estimados según carrera, experiencia, comunidad autónoma y sector en España.",
  datePublished: "2025-01-10",
  dateModified: "2025-01-10",
  author: { "@type": "Organization", name: "Calculadora de Salarios España" },
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
    <html lang="es" className={`${poppins.variable} ${inter.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-text">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
