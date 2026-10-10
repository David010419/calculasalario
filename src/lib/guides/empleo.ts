import type { Guide } from "./types";

const SEPE = { label: "Servicio Público de Empleo Estatal (SEPE)", url: "https://www.sepe.es" };
const EMPLEATE = { label: "Portal Empléate", url: "https://www.empleate.gob.es" };
const EURES = { label: "EURES, portal europeo de empleo", url: "https://eures.europa.eu" };
const MITES = { label: "Ministerio de Trabajo y Economía Social", url: "https://www.mites.gob.es" };
const EUROPASS = { label: "Europass, currículum europeo", url: "https://europass.europa.eu" };

export const EMPLEO_GUIDES: Guide[] = [
  {
    slug: "como-conseguir-empleo-en-espana",
    title: "Cómo conseguir empleo en España: plan paso a paso",
    description:
      "Plan práctico para buscar trabajo en España: dónde encontrar ofertas, cómo organizar la búsqueda, qué ayudas públicas existen y qué errores evitar.",
    category: "empleo",
    emoji: "🧭",
    minutes: 6,
    intro:
      "Buscar trabajo funciona mejor cuando se trata como un proyecto con método y no como una espera. Este plan ordena los pasos, desde decidir a qué te presentas hasta hacer seguimiento de cada candidatura.",
    blocks: [
      { h: "1. Define el objetivo antes de enviar nada" },
      {
        p: "Elige dos o tres puestos concretos y revisa veinte ofertas reales de cada uno. Apunta qué requisitos se repiten: titulación, herramientas, idiomas, experiencia. Esa lista te dice qué tienes ya, qué te falta y qué palabras deben aparecer en tu currículum.",
      },
      { h: "2. Dónde están las ofertas" },
      {
        ul: [
          "Portales generalistas como InfoJobs, LinkedIn e Indeed, donde se publica la mayoría de vacantes.",
          "El portal público Empléate y el servicio de empleo de tu comunidad autónoma.",
          "Portales especializados de tu sector: tecnología, sanidad, hostelería, educación.",
          "Las páginas de empleo de las propias empresas, donde a veces se publica antes que en los portales.",
          "Empresas de trabajo temporal, una vía de entrada rápida en industria, logística y hostelería.",
          "Empleo público: las convocatorias se publican en el BOE y en los boletines autonómicos.",
        ],
      },
      { h: "3. El mercado oculto" },
      {
        p: "Muchas vacantes se cubren por recomendación antes de publicarse. Cuenta a tu entorno qué buscas con precisión, retoma el contacto con antiguos compañeros y profesores, y envía candidaturas espontáneas a empresas que te interesen aunque no tengan oferta abierta.",
      },
      { h: "4. Inscríbete como demandante de empleo" },
      {
        p: "Darte de alta en el servicio público de empleo de tu comunidad es gratuito y abre la puerta a cursos subvencionados, orientación laboral y programas de contratación. Es obligatorio para cobrar la prestación por desempleo y para muchos programas, y conviene hacerlo aunque no tengas derecho a paro.",
      },
      { h: "5. Organiza la búsqueda" },
      {
        ol: [
          "Reserva un horario fijo al día, como si fuera una jornada de trabajo.",
          "Lleva una hoja con cada candidatura: empresa, puesto, fecha, contacto y estado.",
          "Adapta el currículum a cada oferta en lugar de enviar el mismo cien veces.",
          "Haz seguimiento a los siete o diez días con un mensaje breve.",
          "Revisa cada dos semanas qué está funcionando y ajusta.",
        ],
      },
      { h: "6. Ayudas que conviene conocer" },
      {
        ul: [
          "Garantía Juvenil: programa para menores de 30 años que no estudian ni trabajan, con formación y ofertas específicas.",
          "Formación gratuita para desempleados y ocupados a través del SEPE y las comunidades.",
          "EURES: red europea con ofertas en otros países de la UE y ayudas a la movilidad.",
          "Orientadores laborales públicos, que revisan tu currículum sin coste.",
        ],
      },
      { h: "Errores frecuentes" },
      {
        ul: [
          "Presentarse a todo sin filtrar: baja la calidad de cada candidatura.",
          "No tener el perfil de LinkedIn actualizado y coherente con el currículum.",
          "Ignorar las ofertas que piden un requisito que no cumples del todo. Si cumples la mayoría, preséntate.",
          "Aceptar trabajar sin contrato o pagar por acceder a una oferta: son señales de fraude.",
        ],
      },
      {
        tip: "Antes de la primera entrevista, mira el rango salarial del puesto para tu experiencia y tu comunidad. Llegar con una cifra te da ventaja.",
      },
    ],
    sources: [SEPE, EMPLEATE, EURES],
    cta: { label: "Mira cuánto se paga en tu profesión", href: "/" },
    related: ["como-hacer-un-curriculum", "preparar-entrevista-de-trabajo", "como-negociar-el-sueldo"],
  },
  {
    slug: "como-hacer-un-curriculum",
    title: "Cómo hacer un currículum que pase los filtros",
    description:
      "Cómo escribir un currículum eficaz en España: estructura, logros con cifras, palabras clave para los filtros automáticos y errores que descartan candidatos.",
    category: "empleo",
    emoji: "📄",
    minutes: 5,
    intro:
      "Un reclutador dedica pocos segundos a la primera lectura de un currículum, y en muchas empresas un programa lo filtra antes. El objetivo no es contarlo todo, sino que se vea rápido que encajas.",
    blocks: [
      { h: "Estructura que funciona" },
      {
        ol: [
          "Nombre, teléfono, correo, ciudad y enlace a LinkedIn o portfolio.",
          "Titular de una línea con el puesto al que aspiras.",
          "Resumen de tres o cuatro líneas: experiencia, especialidad y qué aportas.",
          "Experiencia, de la más reciente a la más antigua.",
          "Formación reglada y cursos relevantes.",
          "Idiomas con nivel real y herramientas que dominas.",
        ],
      },
      { p: "Una página si tienes menos de diez años de experiencia; dos como máximo." },
      { h: "Escribe logros, no tareas" },
      {
        p: "«Atención al cliente» describe un puesto. «Atendí una media de 60 consultas diarias y reduje las reclamaciones repetidas» describe a una persona. Siempre que puedas, añade una cifra, un plazo o un resultado.",
      },
      { h: "Cómo superar los filtros automáticos" },
      {
        ul: [
          "Usa las mismas palabras que la oferta para el puesto, las herramientas y las titulaciones.",
          "Evita tablas complejas, columnas múltiples e imágenes con texto: algunos programas no los leen.",
          "Guarda el archivo en PDF con un nombre claro, salvo que pidan otro formato.",
          "Escribe los títulos de sección de forma estándar: Experiencia, Formación, Idiomas.",
        ],
      },
      { h: "Qué no hace falta poner" },
      {
        ul: [
          "DNI, estado civil, fecha de nacimiento o dirección completa.",
          "La foto es habitual en España pero no obligatoria. Si la incluyes, que sea profesional.",
          "Experiencias muy antiguas sin relación con el puesto.",
          "Frases genéricas como «persona proactiva y trabajadora» sin un ejemplo que las respalde.",
        ],
      },
      { h: "Si no tienes experiencia" },
      {
        p: "Pon la formación primero y cuenta prácticas, proyectos de clase, voluntariado, trabajos de verano y cualquier responsabilidad real. Un proyecto propio terminado vale más que una lista de cursos.",
      },
      { h: "Los huecos en el currículum" },
      {
        p: "No los escondas. Indica el periodo y qué hiciste: cuidado de un familiar, formación, búsqueda activa. Una explicación breve genera menos dudas que un salto de fechas sin aclarar.",
      },
      {
        tip: "Pide a otra persona que lo lea durante diez segundos y te diga a qué puesto cree que te presentas. Si duda, falta claridad.",
      },
    ],
    sources: [EUROPASS, SEPE],
    cta: { label: "Consulta el rango salarial de tu puesto", href: "/" },
    related: ["como-conseguir-empleo-en-espana", "preparar-entrevista-de-trabajo", "como-negociar-el-sueldo"],
  },
  {
    slug: "preparar-entrevista-de-trabajo",
    title: "Cómo preparar una entrevista de trabajo",
    description:
      "Cómo preparar una entrevista de trabajo: qué investigar, cómo responder con el método STAR, qué preguntar, qué no pueden preguntarte y cómo hablar de sueldo.",
    category: "empleo",
    emoji: "🎤",
    minutes: 5,
    intro:
      "La mayoría de entrevistas se ganan antes de entrar. Quien ha preparado ejemplos concretos y sabe qué necesita la empresa transmite seguridad sin tener que improvisar.",
    blocks: [
      { h: "Antes: qué investigar" },
      {
        ul: [
          "Qué hace la empresa, a quién vende y qué ha publicado últimamente.",
          "La oferta, línea por línea: cada requisito es una posible pregunta.",
          "Quién te entrevista y qué papel tiene.",
          "El rango salarial habitual del puesto para tu experiencia y tu zona.",
        ],
      },
      { h: "Responde con el método STAR" },
      {
        p: "Para las preguntas del tipo «cuéntame una vez que…», ordena la respuesta en cuatro pasos:",
      },
      {
        ol: [
          "Situación: el contexto, en una frase.",
          "Tarea: qué te tocaba resolver a ti.",
          "Acción: qué hiciste exactamente.",
          "Resultado: qué pasó, con cifras si las hay.",
        ],
      },
      { p: "Prepara cinco o seis historias reales que puedas adaptar a preguntas sobre conflictos, errores, liderazgo, presión y logros." },
      { h: "Preguntas que casi siempre aparecen" },
      {
        ul: [
          "«Háblame de ti»: un resumen de dos minutos orientado al puesto, no tu biografía.",
          "«¿Por qué quieres trabajar aquí?»: conecta algo concreto de la empresa con lo que sabes hacer.",
          "«¿Cuál es tu mayor debilidad?»: una real y qué estás haciendo para corregirla.",
          "«¿Por qué dejaste tu anterior trabajo?»: sin criticar a nadie.",
          "«¿Qué expectativas salariales tienes?»: da un rango razonado.",
        ],
      },
      { h: "Lo que tú deberías preguntar" },
      {
        ul: [
          "Cómo es un día normal en el puesto y con quién trabajarías.",
          "Qué se espera que hayas conseguido a los seis meses.",
          "Cómo es el horario real, el teletrabajo y la formación.",
          "Cuáles son los siguientes pasos del proceso y sus plazos.",
        ],
      },
      { h: "Lo que no pueden preguntarte" },
      {
        p: "Preguntas sobre embarazo o planes de tener hijos, estado civil, religión, ideología, orientación sexual, afiliación sindical o salud sin relación con el puesto no son legítimas, porque pueden dar lugar a discriminación. Puedes reconducir con educación: «prefiero centrarme en lo que puedo aportar al puesto».",
      },
      { h: "Entrevistas por videollamada" },
      {
        ul: [
          "Prueba cámara, micrófono y conexión con antelación.",
          "Coloca la cámara a la altura de los ojos y busca un fondo neutro con luz de frente.",
          "Ten a mano el currículum, la oferta y tus notas.",
        ],
      },
      {
        tip: "Envía un mensaje de agradecimiento el mismo día. Es breve, poco habitual y te mantiene presente.",
      },
    ],
    sources: [SEPE, MITES],
    cta: { label: "Llega con una cifra: calcula tu salario", href: "/" },
    related: ["como-negociar-el-sueldo", "como-hacer-un-curriculum", "como-conseguir-empleo-en-espana"],
  },
  {
    slug: "como-negociar-el-sueldo",
    title: "Cómo negociar el sueldo: en una oferta y en una subida",
    description:
      "Cómo negociar el salario en España: cómo calcular tu rango, cuándo hablar de dinero, qué pedir además del sueldo y cómo plantear una subida.",
    category: "empleo",
    emoji: "🤝",
    minutes: 5,
    intro:
      "Negociar el sueldo incomoda, pero unos minutos de conversación pueden valer miles de euros al año, y las subidas futuras se calculan sobre lo que aceptes hoy.",
    blocks: [
      { h: "Calcula tu rango antes de hablar" },
      {
        ol: [
          "Busca cuánto se paga en tu puesto según experiencia, comunidad y tipo de empresa.",
          "Mira las tablas salariales de tu convenio colectivo: marcan el mínimo legal para tu grupo.",
          "Fija tres cifras: la que pedirás, la que te parece justa y tu mínimo para aceptar.",
        ],
      },
      { p: "Habla siempre en bruto anual. Es la cifra que maneja la empresa y la única comparable entre ofertas." },
      { h: "Cuándo hablar de dinero" },
      {
        p: "Lo ideal es cuando la empresa ya ha decidido que te quiere. Si preguntan al principio, da un rango amplio y añade que depende del conjunto de condiciones. Si puedes, pregunta antes qué banda tienen prevista para el puesto.",
      },
      { h: "Cómo responder a una oferta" },
      {
        ul: [
          "Agradece y pide uno o dos días para estudiarla. Es normal y no pone en riesgo la oferta.",
          "Contesta con una cifra concreta y una razón: tu experiencia, un resultado, el rango del mercado.",
          "Evita justificarla con necesidades personales. Lo que cuenta es el valor del puesto.",
          "Pide la oferta final por escrito antes de dejar tu trabajo actual.",
        ],
      },
      { h: "Si el sueldo no se mueve, negocia el resto" },
      {
        ul: [
          "Días de teletrabajo y flexibilidad horaria.",
          "Días de vacaciones adicionales.",
          "Formación pagada y tiempo para hacerla.",
          "Variable o bonus con objetivos claros.",
          "Retribución flexible: seguro médico, transporte, guardería o comida, con ventajas fiscales.",
          "Una revisión salarial pactada a los seis meses.",
        ],
      },
      { h: "Cómo pedir una subida" },
      {
        ol: [
          "Elige el momento: tras un buen resultado o antes de que se cierren los presupuestos.",
          "Pide una reunión específica, no lo plantees en el pasillo.",
          "Lleva una lista de logros con cifras y de responsabilidades nuevas que has asumido.",
          "Di la cifra que pides y calla: deja que la otra parte responda.",
          "Si la respuesta es no, pregunta qué tendría que pasar para que fuera sí y en qué plazo.",
        ],
      },
      { h: "Tus derechos" },
      {
        p: "El convenio fija un mínimo, no un máximo. Hombres y mujeres deben cobrar lo mismo por trabajos de igual valor, y las empresas están obligadas a llevar un registro retributivo. La directiva europea de transparencia retributiva prevé además que los candidatos conozcan la banda salarial antes de negociar; su aplicación en España depende de la norma que la incorpore.",
      },
      {
        tip: "Una subida de 2.000 € brutos no son 2.000 € netos. Calcula el neto antes de decidir si compensa frente a otras mejoras.",
      },
    ],
    sources: [MITES, { label: "Boletín Oficial del Estado: convenios colectivos", url: "https://www.boe.es" }],
    cta: { label: "Calcula el rango salarial de tu puesto", href: "/" },
    related: ["preparar-entrevista-de-trabajo", "salario-bruto-y-neto", "como-conseguir-empleo-en-espana"],
  },
];
