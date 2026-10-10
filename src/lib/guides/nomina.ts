import { calcBreakdown, formatEUR } from "../calculations";
import type { Guide } from "./types";

const AEAT = { label: "Agencia Tributaria", url: "https://sede.agenciatributaria.gob.es" };
const SEG_SOCIAL = { label: "Seguridad Social", url: "https://www.seg-social.es" };
const MITES = { label: "Ministerio de Trabajo y Economía Social", url: "https://www.mites.gob.es" };
const HACIENDA_SMI = {
  label: "Ministerio de Hacienda — deducción del SMI en 2026",
  url: "https://www.hacienda.gob.es/es-ES/Prensa/Noticias/Paginas/2026/20260217-NP-CM-SMI-DEDUCCION-2026.aspx",
};

const pct = (value: number) => `${value.toFixed(1).replace(".", ",")} %`;

const b30 = calcBreakdown(30000);
const irpfPct30 = (b30.irpf / 30000) * 100;
// Con 14 pagas la cotización se prorratea en las 12 mensualidades y las extras no la llevan.
const ordinaria14 = Math.round((30000 / 14) * (1 - b30.irpf / 30000) - b30.seguridadSocial / 12);
const extra14 = Math.round((30000 / 14) * (1 - b30.irpf / 30000));

const netRows = [18000, 24000, 30000, 40000, 60000].map((bruto) => {
  const b = calcBreakdown(bruto);
  return [
    formatEUR(bruto),
    formatEUR(b.seguridadSocial),
    formatEUR(b.irpf),
    formatEUR(b.netoAnual),
    formatEUR(b.netoMensual),
  ];
});

export const NOMINA_GUIDES: Guide[] = [
  {
    slug: "tramos-irpf-2026",
    title: "Tramos del IRPF en 2026: cómo se calcula lo que pagas",
    description:
      "Los tramos del IRPF de 2026 explicados con ejemplos: qué es el tipo marginal, por qué subir de tramo no te hace cobrar menos y cuánto pagas de verdad.",
    category: "nomina",
    emoji: "🧮",
    minutes: 5,
    intro:
      "El IRPF es el impuesto que más pesa en una nómina y también el peor entendido. La idea clave es que no se aplica un único porcentaje a todo tu sueldo: tu renta se trocea en tramos y cada trozo paga su propio tipo.",
    blocks: [
      { h: "La escala general de 2026" },
      {
        p: "El IRPF tiene una parte estatal y otra autonómica. Sumando la escala estatal y una autonómica de referencia igual a la estatal, los tramos quedan así:",
      },
      {
        table: {
          head: ["Base liquidable", "Tipo total", "Parte estatal"],
          rows: [
            ["Hasta 12.450 €", "19 %", "9,5 %"],
            ["De 12.450 € a 20.200 €", "24 %", "12 %"],
            ["De 20.200 € a 35.200 €", "30 %", "15 %"],
            ["De 35.200 € a 60.000 €", "37 %", "18,5 %"],
            ["De 60.000 € a 300.000 €", "45 %", "22,5 %"],
            ["Más de 300.000 €", "47 %", "24,5 %"],
          ],
        },
      },
      {
        p: "Cada comunidad autónoma puede modificar su mitad de la escala, así que el resultado real varía en unos cientos de euros al año según dónde vivas.",
      },
      { h: "Tipo marginal y tipo efectivo no son lo mismo" },
      {
        p: "El tipo marginal es el porcentaje que paga tu último euro ganado. El tipo efectivo es lo que pagas de media sobre todo tu sueldo, y siempre es bastante más bajo.",
      },
      {
        p: `Un ejemplo: con ${formatEUR(30000)} brutos y sin hijos, tu último euro está en el tramo del 30 %, pero el IRPF total es de ${formatEUR(b30.irpf)}, es decir, un ${pct(irpfPct30)} de tu sueldo.`,
      },
      { h: "Subir de tramo no te hace cobrar menos" },
      {
        p: "Es el mito más extendido. Si una subida te hace pasar de tramo, solo la parte del sueldo que supera el límite paga el tipo más alto. El resto sigue tributando igual que antes. Una subida de sueldo bruto siempre deja más neto.",
      },
      {
        tip: "Lo que sí puede ocurrir es que tu retención mensual suba un poco tras un aumento, porque la empresa recalcula el porcentaje para todo el año.",
      },
      { h: "Qué se resta antes de aplicar los tramos" },
      {
        ul: [
          "La cotización a la Seguridad Social que paga el trabajador.",
          "2.000 € de gastos deducibles, iguales para todos los asalariados.",
          "La reducción por rendimientos del trabajo, que beneficia a los salarios bajos.",
          "El mínimo personal de 5.550 € y los mínimos por hijos, que funcionan como una parte del sueldo libre de impuesto.",
        ],
      },
      { h: "Retención en nómina frente a declaración" },
      {
        p: "Lo que ves en la nómina es un adelanto: la empresa retiene cada mes una estimación del IRPF anual. En la declaración de la renta se hace la cuenta definitiva y Hacienda devuelve o cobra la diferencia.",
      },
    ],
    sources: [AEAT],
    cta: { label: "Calcula tu IRPF según quién gobierne", href: "/salario-segun-gobierno" },
    related: ["salario-bruto-y-neto", "que-es-deflactar-el-irpf", "como-leer-tu-nomina"],
  },
  {
    slug: "como-leer-tu-nomina",
    title: "Cómo leer tu nómina paso a paso",
    description:
      "Guía para entender una nómina española: devengos, bases de cotización, deducciones de Seguridad Social, retención de IRPF y líquido a percibir.",
    category: "nomina",
    emoji: "🧾",
    minutes: 5,
    intro:
      "Una nómina parece un jeroglífico, pero siempre tiene las mismas tres partes: lo que ganas, lo que te descuentan y lo que te ingresan. Con esta guía sabrás leer cualquier recibo de salarios.",
    blocks: [
      { h: "1. El encabezado" },
      {
        p: "Recoge los datos de la empresa y los tuyos: categoría o grupo profesional, antigüedad, tipo de contrato y periodo que se liquida. Comprueba que el grupo profesional coincide con el trabajo que haces, porque de él depende el salario mínimo que fija tu convenio.",
      },
      { h: "2. Los devengos: lo que ganas" },
      {
        ul: [
          "Salario base: la cantidad fija que marca el convenio para tu grupo.",
          "Complementos salariales: antigüedad, nocturnidad, turnos, productividad, idiomas.",
          "Horas extraordinarias, si las hay.",
          "Pagas extra prorrateadas, si cobras en 12 pagas.",
          "Percepciones no salariales: dietas o plus de transporte, que pueden no cotizar ni tributar dentro de ciertos límites.",
        ],
      },
      { p: "La suma de todo es el total devengado, tu salario bruto del mes." },
      { h: "3. Las deducciones: lo que te descuentan" },
      { p: "Hay dos grandes bloques. El primero son las cotizaciones a la Seguridad Social, que en 2026 suman un 6,50 % para un contrato indefinido:" },
      {
        table: {
          head: ["Concepto", "Tipo del trabajador", "Para qué sirve"],
          rows: [
            ["Contingencias comunes", "4,70 %", "Pensiones, bajas por enfermedad común"],
            ["Desempleo", "1,55 % (1,60 % si el contrato es temporal)", "Prestación por paro"],
            ["Formación profesional", "0,10 %", "Cursos y formación para el empleo"],
            ["Mecanismo de equidad intergeneracional", "0,15 %", "Refuerzo del fondo de pensiones"],
          ],
        },
      },
      {
        p: "El segundo bloque es la retención de IRPF: un porcentaje que la empresa calcula según tu sueldo anual y tu situación familiar, y que ingresa en Hacienda a tu nombre.",
      },
      { h: "4. El líquido a percibir" },
      {
        p: "Es el total devengado menos las deducciones: tu salario neto, lo que llega al banco.",
      },
      { h: "5. Las bases de cotización" },
      {
        p: "Al pie aparecen las bases sobre las que se calculan las cotizaciones. Son importantes aunque no se miren nunca: de ellas dependen tu futura pensión, el paro y lo que cobras en una baja. La empresa paga además su propia cotización, bastante mayor que la tuya, que no sale de tu bruto.",
      },
      {
        tip: "Guarda todas tus nóminas. Son la prueba de lo que has cobrado y cotizado, y te las pedirán para una hipoteca, un alquiler o una reclamación.",
      },
      { h: "Errores que conviene revisar" },
      {
        ul: [
          "Que la antigüedad sea correcta.",
          "Que el salario base no esté por debajo de las tablas de tu convenio.",
          "Que la retención de IRPF refleje tu situación familiar actual. Si ha cambiado, comunícalo con el modelo 145.",
        ],
      },
    ],
    sources: [SEG_SOCIAL, AEAT, MITES],
    cta: { label: "Calcula tu salario neto por profesión", href: "/" },
    related: ["salario-bruto-y-neto", "tramos-irpf-2026", "12-o-14-pagas"],
  },
  {
    slug: "salario-bruto-y-neto",
    title: "Salario bruto y neto: diferencia y cómo pasar de uno a otro",
    description:
      "Qué diferencia hay entre salario bruto y neto, qué se descuenta y cuánto queda limpio en 2026 con ejemplos de 18.000 € a 60.000 € brutos.",
    category: "nomina",
    emoji: "⚖️",
    minutes: 4,
    intro:
      "Las ofertas de empleo hablan en bruto anual y tu banco en neto mensual. Entender el paso de uno a otro evita sorpresas al firmar un contrato.",
    blocks: [
      { h: "Qué es cada uno" },
      {
        ul: [
          "Salario bruto: lo pactado con la empresa antes de descuentos. Es la cifra del contrato y de las ofertas.",
          "Salario neto: lo que recibes tras restar la cotización a la Seguridad Social y la retención de IRPF.",
        ],
      },
      { h: "Cuánto queda de neto en 2026" },
      {
        p: "Estimación para un trabajador por cuenta ajena, sin hijos, con contrato indefinido y la escala general de IRPF:",
      },
      {
        table: {
          head: ["Bruto anual", "Seguridad Social", "IRPF", "Neto anual", "Neto al mes (12 pagas)"],
          rows: netRows,
        },
      },
      {
        p: "Cuanto más alto es el sueldo, mayor es el porcentaje que se va en impuestos: el IRPF es progresivo. La cotización, en cambio, es un porcentaje fijo hasta una base máxima de 5.101,20 € al mes.",
      },
      { h: "Qué hace variar tu neto" },
      {
        ul: [
          "Los hijos y otras personas a tu cargo, que reducen el IRPF.",
          "La comunidad autónoma, que fija la mitad de la escala.",
          "El tipo de contrato: el temporal cotiza un poco más por desempleo.",
          "Retribución en especie, como seguro médico o tique restaurante, que puede estar exenta.",
        ],
      },
      { h: "El coste para la empresa es otra cifra" },
      {
        p: "Por encima de tu bruto, la empresa paga su parte de cotizaciones, en torno a un tercio adicional. Ese coste total es el que valora al decidir un sueldo, y explica por qué una subida de 1.000 € brutos le cuesta bastante más.",
      },
      {
        tip: "Al comparar ofertas, usa siempre el bruto anual. Comparar netos mensuales engaña si una oferta es en 12 pagas y la otra en 14.",
      },
    ],
    sources: [AEAT, SEG_SOCIAL],
    cta: { label: "Mira tu neto exacto por salario", href: "/salario-segun-gobierno" },
    related: ["como-leer-tu-nomina", "12-o-14-pagas", "tramos-irpf-2026"],
  },
  {
    slug: "12-o-14-pagas",
    title: "12 o 14 pagas: qué cambia y cuál conviene",
    description:
      "Diferencias entre cobrar en 12 o en 14 pagas: el bruto anual es el mismo, pero cambia lo que recibes cada mes. Ejemplo con 30.000 € brutos.",
    category: "nomina",
    emoji: "📅",
    minutes: 4,
    intro:
      "Cobrar en 14 pagas no significa cobrar más. El salario anual es idéntico: lo único que cambia es cómo se reparte a lo largo del año.",
    blocks: [
      { h: "De dónde salen las pagas extra" },
      {
        p: "El Estatuto de los Trabajadores reconoce al menos dos gratificaciones extraordinarias al año: una en Navidad y otra en la fecha que fije el convenio, normalmente en verano. El convenio puede permitir que se prorrateen, y entonces cobras 12 mensualidades algo más altas.",
      },
      { h: "Ejemplo con 30.000 € brutos" },
      {
        table: {
          head: ["", "12 pagas", "14 pagas"],
          rows: [
            ["Bruto por paga", formatEUR(2500), formatEUR(Math.round(30000 / 14))],
            ["Neto de un mes normal", formatEUR(b30.netoMensual), formatEUR(ordinaria14)],
            ["Neto de la paga extra", "—", formatEUR(extra14)],
            ["Neto anual", formatEUR(b30.netoAnual), formatEUR(b30.netoAnual)],
          ],
        },
      },
      {
        p: "La paga extra es más alta que un mes normal porque la cotización a la Seguridad Social de las extras se reparte entre las doce mensualidades. La retención de IRPF, en cambio, se aplica con el mismo porcentaje a todas las pagas.",
      },
      { h: "Ventajas de cada opción" },
      {
        ul: [
          "12 pagas: ingresos más altos cada mes y más fáciles de planificar. Útil si tienes gastos fijos ajustados.",
          "14 pagas: un ahorro forzoso que llega en verano y Navidad, cuando suele haber más gastos.",
        ],
      },
      { h: "Lo que no cambia" },
      {
        ul: [
          "El IRPF total del año.",
          "Lo que cotizas y, por tanto, tu pensión y tu paro.",
          "La indemnización por despido, que se calcula con el salario anual completo.",
        ],
      },
      {
        tip: "Si dejas la empresa a mitad de año con 14 pagas, en el finiquito te deben la parte proporcional de las extras que ya has generado.",
      },
      { h: "¿Puedo elegir?" },
      {
        p: "Depende del convenio colectivo. Algunos obligan a un sistema, otros dejan elegir al trabajador y otros exigen acuerdo con la empresa. Consulta el tuyo antes de pedir el cambio.",
      },
    ],
    sources: [MITES, SEG_SOCIAL],
    cta: { label: "Compara tu neto en 12 y 14 pagas", href: "/salario-segun-gobierno" },
    related: ["salario-bruto-y-neto", "como-leer-tu-nomina", "salario-minimo-2026"],
  },
  {
    slug: "salario-minimo-2026",
    title: "Salario mínimo en 2026: cuánto es y cuánto queda neto",
    description:
      "El salario mínimo interprofesional de 2026 es de 1.221 € al mes en 14 pagas, 17.094 € al año. Cuánto es en 12 pagas, a jornada parcial y cuánto IRPF paga.",
    category: "nomina",
    emoji: "📌",
    minutes: 4,
    intro:
      "El salario mínimo interprofesional (SMI) es el suelo legal: ningún trabajador a jornada completa puede cobrar menos. En 2026 son 17.094 € brutos al año.",
    blocks: [
      { h: "Las cifras de 2026" },
      {
        table: {
          head: ["Forma de cobro", "Importe bruto"],
          rows: [
            ["Anual", "17.094 €"],
            ["Mensual en 14 pagas", "1.221 €"],
            ["Mensual en 12 pagas", "1.424,50 €"],
          ],
        },
      },
      { p: "La subida se aplica con efectos desde el 1 de enero de 2026." },
      { h: "¿El salario mínimo paga IRPF?" },
      {
        p: "En la práctica, no. Hacienda ha elevado a 590,89 € la deducción para rentas bajas, de modo que quien cobra hasta 17.094 € no paga IRPF en su declaración. La deducción se va reduciendo a medida que sube el sueldo y desaparece en 20.000 €.",
      },
      {
        p: "Sí se sigue pagando la cotización a la Seguridad Social, un 6,50 % del bruto, que es la que da derecho a pensión, paro y bajas.",
      },
      { h: "Jornada parcial" },
      {
        p: "El SMI se aplica en proporción a las horas trabajadas. Con media jornada, el mínimo es la mitad. Lo que no puede hacer la empresa es pagar por hora menos de lo que resulta del SMI.",
      },
      { h: "Qué cuenta para llegar al mínimo" },
      {
        p: "Se compara el SMI anual con tu salario anual en dinero, sumando salario base y complementos salariales. Las dietas y los gastos que te reembolsan no cuentan. El salario en especie, como alojamiento o manutención, no puede usarse para rebajar el dinero por debajo del SMI.",
      },
      {
        tip: "Tu convenio puede fijar un mínimo más alto que el SMI para tu grupo profesional. Si es así, manda el convenio.",
      },
      { h: "Qué hacer si cobras menos" },
      {
        ol: [
          "Comprueba tu jornada real y el convenio aplicable.",
          "Reclama por escrito a la empresa la diferencia.",
          "Si no hay respuesta, acude a tus representantes sindicales o a la Inspección de Trabajo.",
          "Las diferencias salariales se pueden reclamar durante un año.",
        ],
      },
    ],
    sources: [HACIENDA_SMI, MITES],
    cta: { label: "Calcula el neto de tu sueldo", href: "/salario-segun-gobierno" },
    related: ["salario-bruto-y-neto", "tramos-irpf-2026", "como-leer-tu-nomina"],
  },
  {
    slug: "que-es-deflactar-el-irpf",
    title: "Qué es deflactar el IRPF y cómo afectaría a tu nómina",
    description:
      "Deflactar el IRPF significa ajustar los tramos a la inflación. Qué es la progresividad en frío, quién gana más y qué proponen los partidos para el 29-N.",
    category: "nomina",
    emoji: "📉",
    minutes: 4,
    intro:
      "Deflactar el IRPF es uno de los términos más repetidos de la campaña electoral. Significa algo sencillo: subir los límites de los tramos al mismo ritmo que los precios.",
    blocks: [
      { h: "El problema: la progresividad en frío" },
      {
        p: "Imagina que los precios suben un 3 % y tu empresa te sube el sueldo un 3 %. Tu poder de compra es el mismo. Pero si los tramos del IRPF no se mueven, una parte mayor de tu sueldo cae en tramos altos y pagas un porcentaje mayor de impuestos sin ser más rico. A ese efecto se le llama progresividad en frío.",
      },
      { h: "Qué hace la deflactación" },
      {
        p: "Eleva los límites de los tramos y, normalmente, también el mínimo personal y familiar. Así, un sueldo que solo ha crecido con la inflación paga el mismo porcentaje que antes.",
      },
      { h: "Quién nota más el cambio" },
      {
        ul: [
          "Quienes tienen el sueldo cerca del salto entre dos tramos.",
          "Las rentas medias, que concentran la mayor parte del ahorro en euros.",
          "Las rentas muy bajas apenas lo notan, porque ya pagan poco o nada de IRPF.",
        ],
      },
      { h: "Qué se propone para el 29-N" },
      {
        p: "El PP plantea deflactar un 10 % el primer tramo, un 5 % el segundo y un 3 % el tercero, subir un 10 % el mínimo personal y duplicar los mínimos por hijos. Otros partidos optan por vías distintas: Vox propone sustituir la escala por dos tipos y Sumar, subir los tipos a las rentas más altas.",
      },
      {
        p: "Varias comunidades autónomas ya han deflactado en los últimos años su mitad de la escala, por lo que el efecto de una medida estatal depende también de dónde vivas.",
      },
      { h: "El coste" },
      {
        p: "Deflactar reduce la recaudación. Quienes la defienden argumentan que el Estado ha ingresado más por la inflación sin haber subido impuestos formalmente; quienes la critican señalan que resta recursos a los servicios públicos y que beneficia más, en euros, a quien más gana.",
      },
      {
        tip: "En nuestro simulador puedes ver cuántos euros al mes te supondría la propuesta de deflactación con tu sueldo exacto.",
      },
    ],
    sources: [
      {
        label: "El Español — plan fiscal del PP",
        url: "https://www.elespanol.com/espana/politica/20260309/plan-feijoo-crisis-iran-medidas-estructurales-rescaten-clase-media-deflactar-irpf/1003744162416_0.amp.html",
      },
      AEAT,
    ],
    cta: { label: "Mira cuánto cobrarías con cada partido", href: "/salario-segun-gobierno" },
    related: ["tramos-irpf-2026", "salario-bruto-y-neto", "salario-minimo-2026"],
  },
];
