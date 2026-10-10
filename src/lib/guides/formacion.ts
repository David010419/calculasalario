import type { Guide } from "./types";

const TODOFP = { label: "TodoFP, portal de Formación Profesional", url: "https://www.todofp.es" };
const SEPE = { label: "Servicio Público de Empleo Estatal (SEPE)", url: "https://www.sepe.es" };
const FUNDAE = { label: "Fundae, formación para el empleo", url: "https://www.fundae.es" };
const EDUCACION = {
  label: "Ministerio de Educación, Formación Profesional y Deportes",
  url: "https://www.educacionfpydeportes.gob.es",
};
const UNIVERSIDADES = {
  label: "Ministerio de Ciencia, Innovación y Universidades",
  url: "https://www.ciencia.gob.es",
};

export const FORMACION_GUIDES: Guide[] = [
  {
    slug: "formacion-profesional-grados-y-salidas",
    title: "Formación Profesional: grados, acceso y salidas laborales",
    description:
      "Guía de la FP en España: grado básico, medio y superior, cursos de especialización, requisitos de acceso, FP dual y familias con más salida laboral.",
    category: "formacion",
    emoji: "🛠️",
    minutes: 6,
    intro:
      "La Formación Profesional es la vía más directa entre estudiar y trabajar: ciclos cortos, muy prácticos y con formación en empresa. Cada vez más ofertas de empleo piden un título de FP y no uno universitario.",
    blocks: [
      { h: "Los niveles de la FP" },
      {
        table: {
          head: ["Nivel", "Duración habitual", "Título", "Acceso"],
          rows: [
            ["Grado básico", "2 cursos", "Técnico Básico", "Desde los 15 años, a propuesta del centro"],
            ["Grado medio", "2 cursos (unas 2.000 horas)", "Técnico", "Título de ESO, grado básico o prueba de acceso"],
            ["Grado superior", "2 cursos (unas 2.000 horas)", "Técnico Superior", "Bachillerato, grado medio o prueba de acceso"],
            ["Curso de especialización", "Varios meses", "Especialista o Máster de FP", "Tener un título de FP relacionado"],
          ],
        },
      },
      {
        p: "El grado superior da acceso directo a la universidad y permite convalidar créditos en grados afines. También puedes encadenar: grado medio, grado superior y después un curso de especialización.",
      },
      { h: "Formación en empresa y FP dual" },
      {
        p: "Todos los ciclos incluyen un periodo de formación en una empresa real. En la modalidad dual intensiva pasas más tiempo en la empresa, con contrato y salario. Es una de las formas más eficaces de conseguir el primer empleo: muchas empresas contratan a quien ya ha formado.",
      },
      { h: "Modalidades" },
      {
        ul: [
          "Presencial, en centros públicos, concertados o privados.",
          "A distancia o semipresencial, pensada para quien trabaja. Las prácticas y algunos exámenes siguen siendo presenciales.",
          "Pruebas libres para obtener el título examinándote por tu cuenta.",
        ],
      },
      { h: "Familias con más demanda de empleo" },
      {
        ul: [
          "Informática y comunicaciones: desarrollo de aplicaciones, sistemas y redes, ciberseguridad.",
          "Sanidad: cuidados auxiliares de enfermería, laboratorio, imagen para el diagnóstico, higiene bucodental.",
          "Electricidad y electrónica, y fabricación mecánica: mantenimiento, automatización, soldadura.",
          "Instalación y mantenimiento: climatización, energías renovables.",
          "Transporte y logística, y administración y gestión.",
          "Servicios socioculturales: atención a personas dependientes, educación infantil.",
        ],
      },
      { h: "Cuánto cuesta" },
      {
        p: "En centros públicos, el grado básico y el medio son gratuitos y el superior tiene tasas reducidas o nulas según la comunidad. Hay becas del Ministerio para grado medio y superior. Los centros privados fijan sus propios precios.",
      },
      { h: "Cómo elegir ciclo" },
      {
        ol: [
          "Mira ofertas de empleo reales del puesto que te gustaría y qué título piden.",
          "Consulta en TodoFP el plan de estudios y las salidas de cada ciclo.",
          "Pregunta en el centro por la inserción laboral de sus titulados y las empresas de prácticas.",
          "Comprueba plazos: la admisión suele abrirse en primavera y varía por comunidad.",
        ],
      },
      {
        tip: "Si ya trabajas en el sector sin título, puedes acreditar tu experiencia y convalidar parte del ciclo.",
      },
    ],
    sources: [TODOFP, EDUCACION],
    cta: { label: "Compara salarios por profesión", href: "/" },
    related: ["que-estudiar-segun-el-empleo", "cursos-gratuitos-y-certificados-de-profesionalidad", "como-conseguir-empleo-en-espana"],
  },
  {
    slug: "cursos-gratuitos-y-certificados-de-profesionalidad",
    title: "Cursos gratuitos del SEPE y certificados de profesionalidad",
    description:
      "Formación gratuita en España: cursos para desempleados y ocupados, certificados de profesionalidad, formación bonificada en la empresa y cómo acreditar tu experiencia.",
    category: "formacion",
    emoji: "🎓",
    minutes: 5,
    intro:
      "No hace falta pagar para formarse. El sistema público financia miles de cursos con título oficial, tanto si estás en paro como si trabajas, y permite convertir tu experiencia en una acreditación.",
    blocks: [
      { h: "Cursos para personas desempleadas" },
      {
        p: "Los gestionan el SEPE y los servicios de empleo de cada comunidad. Son gratuitos, muchos son presenciales y algunos incluyen becas de transporte, conciliación o manutención. Para acceder debes estar inscrito como demandante de empleo.",
      },
      { h: "Cursos para personas ocupadas" },
      {
        p: "También puedes formarte gratis si trabajas, seas asalariado o autónomo. Son cursos subvencionados, muchos en línea y fuera del horario laboral, sobre competencias digitales, idiomas, gestión y especialidades de cada sector.",
      },
      { h: "Qué es un certificado de profesionalidad" },
      {
        p: "Es un título oficial, válido en toda España, que acredita que sabes desempeñar una ocupación concreta. Hay certificados para cientos de ocupaciones, desde atención sociosanitaria hasta soldadura o desarrollo web.",
      },
      {
        table: {
          head: ["Nivel", "Requisito de acceso", "Ejemplos"],
          rows: [
            ["Nivel 1", "Sin requisitos académicos", "Operaciones auxiliares de almacén, limpieza, jardinería"],
            ["Nivel 2", "ESO o equivalente", "Atención sociosanitaria, operaciones de fontanería, actividades de venta"],
            ["Nivel 3", "Bachillerato o equivalente", "Gestión contable, desarrollo de aplicaciones, docencia de la formación"],
          ],
        },
      },
      {
        p: "Los certificados se componen de módulos. Puedes cursarlos por separado e ir acumulándolos, y se convalidan con módulos de los ciclos de FP.",
      },
      { h: "Acredita lo que ya sabes hacer" },
      {
        p: "Si llevas años trabajando sin título, existe un procedimiento permanente para reconocer competencias adquiridas por experiencia laboral o formación no oficial. Tras una evaluación, obtienes una acreditación oficial que puede completar un certificado o parte de un título de FP.",
      },
      { h: "Formación pagada por tu empresa" },
      {
        p: "Las empresas disponen cada año de un crédito para formar a su plantilla, que descuentan de sus cotizaciones. Si te interesa un curso relacionado con tu puesto, puedes proponerlo: a la empresa no le cuesta dinero adicional.",
      },
      {
        p: "Además, tienes derecho a un permiso retribuido de 20 horas anuales de formación vinculada a la actividad de la empresa si llevas al menos un año de antigüedad.",
      },
      { h: "Cómo encontrar un curso" },
      {
        ol: [
          "Entra en el buscador de cursos del SEPE y en el de tu comunidad autónoma.",
          "Filtra por provincia, modalidad y situación laboral.",
          "Comprueba si conduce a un certificado de profesionalidad.",
          "Inscríbete pronto: las plazas son limitadas y hay selección.",
        ],
      },
      {
        tip: "Desconfía de los cursos que se anuncian como «gratuitos» y piden datos bancarios o un pago por el diploma. Los cursos públicos no cobran.",
      },
    ],
    sources: [SEPE, FUNDAE, TODOFP],
    cta: { label: "Mira qué empleos están en auge", href: "/empleos-en-auge" },
    related: ["formacion-profesional-grados-y-salidas", "que-estudiar-segun-el-empleo", "como-conseguir-empleo-en-espana"],
  },
  {
    slug: "que-estudiar-segun-el-empleo",
    title: "Qué estudiar según el empleo que buscas",
    description:
      "Qué formación se pide en España para trabajar en tecnología, sanidad, educación, oficios, logística, administración y hostelería: titulaciones, duración y requisitos.",
    category: "formacion",
    emoji: "🗺️",
    minutes: 7,
    intro:
      "Cada profesión tiene su ruta de entrada, y elegir mal puede costar años. Esta guía resume qué titulación se pide de verdad en los empleos más habituales y cuál es el camino más corto para llegar.",
    blocks: [
      { h: "Tecnología" },
      {
        table: {
          head: ["Empleo", "Formación habitual", "Duración"],
          rows: [
            ["Programador de aplicaciones", "Grado superior en Desarrollo de Aplicaciones Multiplataforma o Web, o grado en Ingeniería Informática", "2 años (FP) o 4 años (grado)"],
            ["Administrador de sistemas", "Grado superior en Administración de Sistemas Informáticos en Red", "2 años"],
            ["Ciberseguridad", "FP de informática más curso de especialización en ciberseguridad, o grado y máster", "2 años más varios meses"],
            ["Análisis de datos", "Grado en Matemáticas, Estadística, Informática o Ciencia de Datos, a menudo con máster", "4 a 5 años"],
          ],
        },
      },
      {
        p: "Es el sector donde más pesa lo que sabes hacer frente al título: un portfolio con proyectos reales y certificaciones de fabricantes abre puertas. Los cursos intensivos pueden servir para reciclarse, pero no son títulos oficiales.",
      },
      { h: "Sanidad" },
      {
        table: {
          head: ["Empleo", "Formación obligatoria", "Duración"],
          rows: [
            ["Enfermería", "Grado universitario en Enfermería", "4 años"],
            ["Medicina", "Grado en Medicina y especialidad vía MIR", "6 años más 4 o 5 de residencia"],
            ["Auxiliar de enfermería", "Grado medio en Cuidados Auxiliares de Enfermería", "2 años"],
            ["Técnico de laboratorio o de imagen", "Grado superior de la familia de Sanidad", "2 años"],
            ["Fisioterapia", "Grado universitario en Fisioterapia", "4 años"],
          ],
        },
      },
      {
        p: "Son profesiones reguladas: sin el título exacto no se puede ejercer. Para trabajar en la sanidad pública hay que superar además una oposición o entrar en bolsas de empleo.",
      },
      { h: "Educación" },
      {
        ul: [
          "Maestro de infantil o primaria: grado en Educación Infantil o Primaria, 4 años.",
          "Profesor de secundaria o FP: un grado universitario más el máster de formación del profesorado, de un curso.",
          "Técnico en educación infantil (0 a 3 años): grado superior en Educación Infantil, 2 años.",
          "Para la enseñanza pública, oposición; en la concertada y privada, contratación directa.",
        ],
      },
      { h: "Oficios e industria" },
      {
        table: {
          head: ["Empleo", "Formación habitual", "Requisitos añadidos"],
          rows: [
            ["Electricista", "Grado medio en Instalaciones Eléctricas y Automáticas", "Habilitación como instalador para firmar instalaciones"],
            ["Soldador", "Grado medio en Soldadura y Calderería o certificado de profesionalidad", "Homologaciones de soldadura según el trabajo"],
            ["Fontanería y climatización", "Grado medio de Instalación y Mantenimiento", "Carnés profesionales para gas e instalaciones térmicas"],
            ["Mantenimiento industrial", "Grado superior en Mecatrónica Industrial", "—"],
            ["Mecánico de vehículos", "Grado medio en Electromecánica de Vehículos", "—"],
          ],
        },
      },
      {
        p: "Son perfiles con mucha demanda y pocos candidatos. La formación es corta y la experiencia en obra o taller cuenta tanto como el título.",
      },
      { h: "Transporte y logística" },
      {
        ul: [
          "Conductor de camión o autobús: permiso C o D y el certificado de aptitud profesional (CAP).",
          "Carretillero: curso de operador de carretillas, de pocos días.",
          "Técnico de logística: grado superior en Transporte y Logística.",
        ],
      },
      { h: "Administración, finanzas y derecho" },
      {
        ul: [
          "Administrativo: grado medio en Gestión Administrativa o superior en Administración y Finanzas.",
          "Contabilidad y finanzas: grado superior o grado en ADE, Economía o Finanzas.",
          "Abogacía: grado en Derecho, máster de acceso y examen estatal.",
          "Recursos humanos: grado en Relaciones Laborales o Psicología, o grado superior en administración.",
        ],
      },
      { h: "Hostelería, comercio y cuidados" },
      {
        ul: [
          "Cocina: grado medio en Cocina y Gastronomía; el superior prepara para dirigir cocinas.",
          "Comercio: grado medio en Actividades Comerciales; mucha contratación sin título previo.",
          "Atención a personas dependientes: grado medio o certificado de profesionalidad de atención sociosanitaria, exigido para trabajar en residencias y ayuda a domicilio.",
        ],
      },
      { h: "Cómo decidir" },
      {
        ol: [
          "Comprueba si la profesión está regulada: si lo está, solo vale el título exacto.",
          "Compara duración y coste con el sueldo de entrada y el que se alcanza con experiencia.",
          "Mira la demanda en tu zona o si estás dispuesto a mudarte.",
          "Habla con alguien que ya trabaje de eso antes de matricularte.",
        ],
      },
      {
        tip: "Un grado superior de FP y un grado universitario no compiten: muchas personas empiezan por la FP, trabajan y completan después la universidad con créditos convalidados.",
      },
    ],
    sources: [TODOFP, UNIVERSIDADES, SEPE],
    cta: { label: "Compara cuánto se cobra en cada profesión", href: "/" },
    related: ["formacion-profesional-grados-y-salidas", "cursos-gratuitos-y-certificados-de-profesionalidad", "como-negociar-el-sueldo"],
  },
];
