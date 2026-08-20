export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: "¿Cómo se calcula el salario estimado?",
    answer:
      "Partimos de rangos salariales reales por carrera basados en estudios de mercado y datos del Ministerio de Trabajo 2024-2025, y aplicamos modificadores según tus años de experiencia, nivel de especialización, la comunidad autónoma y el sector en el que trabajas.",
  },
  {
    question: "¿Por qué varía el salario por comunidad autónoma?",
    answer:
      "El coste de vida, la concentración de empresas y la demanda laboral varían significativamente entre regiones. Madrid, Cataluña y País Vasco suelen ofrecer salarios más altos, mientras que otras comunidades presentan salarios algo más ajustados pero también un coste de vida menor.",
  },
  {
    question: "¿Incluye impuestos el cálculo?",
    answer:
      "Sí. Aplicamos una estimación de la cotización a la Seguridad Social y de la retención de IRPF según los tramos estatales de 2024-2025, para mostrarte tanto tu salario bruto como el neto que recibirías realmente.",
  },
  {
    question: "¿Es un cálculo 100% exacto?",
    answer:
      "No. Es una estimación orientativa basada en rangos de mercado y promedios estadísticos. Tu salario real puede variar según la empresa, el convenio colectivo, tus habilidades específicas y la negociación individual.",
  },
  {
    question: "¿Cómo se calcula la proyección de carrera?",
    answer:
      "Simulamos un crecimiento salarial compuesto: más rápido en los primeros años de carrera (hasta un 6% anual) y progresivamente más moderado a medida que acumulas experiencia y te acercas a la madurez profesional (en torno al 2-3,5% anual).",
  },
  {
    question: "¿Qué diferencia hay entre salario bruto y neto?",
    answer:
      "El salario bruto es el total pactado antes de descuentos. El neto es lo que realmente recibes en tu cuenta tras restar la cotización a la Seguridad Social y la retención de IRPF.",
  },
  {
    question: "¿Los datos se actualizan?",
    answer:
      "Los rangos salariales y modificadores se revisan periódicamente para reflejar la evolución del mercado laboral español y las tendencias sectoriales de cada profesión.",
  },
  {
    question: "¿Puedo comparar dos carreras distintas?",
    answer:
      "Sí, puedes calcular una carrera, guardar el resultado y volver a calcular con otra combinación de carrera, experiencia, región y sector para comparar ambos resultados lado a lado.",
  },
];
