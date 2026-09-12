export const industries = [
  {
    slug: "electricidad",
    name: "Electricidad",
    eyebrow: "SOLUCIONES PARA INSTALADORES",
    title: "Más claridad entre cada visita y cada cotización.",
    intro:
      "Cuando las consultas llegan por distintos canales, responder a tiempo y dar seguimiento puede quedar en segundo plano.",
    problem:
      "Una instalación, una mantención o una reparación empieza con una consulta. Sin un siguiente paso definido, la oportunidad se enfría mientras el equipo está en terreno.",
    signals: [
      "Consultas mezcladas con conversaciones personales",
      "Presupuestos enviados sin una fecha de seguimiento",
      "Datos de clientes repartidos entre WhatsApp y planillas",
    ],
    solutions: [
      {
        title: "Captar cada solicitud",
        text: "Un punto de entrada claro para recibir consultas y pedir la información necesaria antes de coordinar una visita.",
        icon: "target",
      },
      {
        title: "Ordenar las oportunidades",
        text: "Una vista simple para saber qué trabajo está por preparar, enviar o retomar.",
        icon: "grid",
      },
      {
        title: "Volver a contactar a tiempo",
        text: "Recordatorios y flujos digitales para que el próximo contacto no dependa de la memoria.",
        icon: "clock",
      },
    ],
    quoteFlow:
      "QuoteFlow puede servir como punto de partida para registrar presupuestos de instalaciones y mantenciones, con estado y próximo contacto.",
    cta: "Ordenar mis cotizaciones de electricidad",
  },
  {
    slug: "climatizacion",
    name: "Climatización",
    eyebrow: "SOLUCIONES PARA CLIMATIZACIÓN",
    title: "Que cada visita técnica tenga un siguiente paso.",
    intro:
      "Desde una revisión hasta una instalación, el trabajo continúa después de la visita. KAVIRO ayuda a darle continuidad al proceso.",
    problem:
      "Las solicitudes de mantención, reparación e instalación suelen avanzar por mensajes, fotos y llamadas. Cuando falta una vista común, se vuelve difícil recordar qué debe ocurrir después.",
    signals: [
      "Visitas técnicas sin información centralizada",
      "Cotizaciones que quedan esperando confirmación",
      "Seguimientos que dependen de revisar conversaciones antiguas",
    ],
    solutions: [
      {
        title: "Recibir solicitudes completas",
        text: "Formularios y páginas que ordenan el motivo de consulta, ubicación y datos de contacto.",
        icon: "users",
      },
      {
        title: "Conectar visita y propuesta",
        text: "Un proceso digital para pasar de la información técnica a una cotización con contexto.",
        icon: "pipeline",
      },
      {
        title: "Mantener la continuidad",
        text: "Estados y próximos pasos visibles para coordinar la conversación después de enviar una propuesta.",
        icon: "bolt",
      },
    ],
    quoteFlow:
      "QuoteFlow ayuda a demostrar cómo registrar una propuesta, definir su siguiente contacto y mantener visible el estado de cada oportunidad.",
    cta: "Mejorar el seguimiento de climatización",
  },
  {
    slug: "construccion",
    name: "Construcción",
    eyebrow: "SOLUCIONES PARA CONSTRUCCIÓN",
    title: "Orden para avanzar desde el primer contacto.",
    intro:
      "Un proyecto puede comenzar con una recomendación, una visita o una solicitud de presupuesto. La información necesita un lugar donde continuar.",
    problem:
      "Cuando cada oportunidad se coordina de una forma distinta, se pierde tiempo buscando antecedentes y confirmando quién debe responder.",
    signals: [
      "Antecedentes de proyectos en múltiples conversaciones",
      "Presupuestos con revisiones y próximos pasos poco visibles",
      "Tareas internas que se repiten sin un flujo compartido",
    ],
    solutions: [
      {
        title: "Centralizar la información",
        text: "Un espacio común para reunir los datos iniciales y ordenar la conversación con cada prospecto.",
        icon: "grid",
      },
      {
        title: "Dar seguimiento a presupuestos",
        text: "Estados claros para saber qué propuesta requiere una respuesta o una nueva coordinación.",
        icon: "pipeline",
      },
      {
        title: "Conectar al equipo",
        text: "Herramientas internas que ayudan a que cada persona conozca el próximo paso del proceso.",
        icon: "users",
      },
    ],
    quoteFlow:
      "Cuando el proceso parte por presupuestos, QuoteFlow puede mostrar una forma simple de registrar el estado y el próximo contacto.",
    cta: "Ordenar mi proceso de construcción",
  },
  {
    slug: "servicios-tecnicos",
    name: "Servicios técnicos",
    eyebrow: "SOLUCIONES PARA SERVICIOS TÉCNICOS",
    title: "Menos mensajes sueltos. Más continuidad para cada servicio.",
    intro:
      "Reparaciones, mantenciones y soporte necesitan una operación que conecte la solicitud, la cotización y la coordinación.",
    problem:
      "El equipo resuelve lo urgente, pero el seguimiento de cada solicitud queda repartido entre chats, llamadas y archivos. Eso hace difícil saber qué está pendiente.",
    signals: [
      "Solicitudes que llegan por WhatsApp, teléfono y correo",
      "Clientes esperando respuesta después de una visita",
      "Tareas repetitivas que no están documentadas",
    ],
    solutions: [
      {
        title: "Crear un punto de entrada",
        text: "Una página y un formulario para recibir la información esencial de cada requerimiento.",
        icon: "target",
      },
      {
        title: "Ver el estado del servicio",
        text: "Dashboards y herramientas internas para ordenar solicitudes, clientes y tareas pendientes.",
        icon: "chart",
      },
      {
        title: "Automatizar lo repetitivo",
        text: "Flujos digitales que conectan avisos, organización y próximos pasos con un alcance claro.",
        icon: "bolt",
      },
    ],
    quoteFlow:
      "QuoteFlow puede ayudar a visualizar el seguimiento de cotizaciones y conversaciones que todavía están abiertas.",
    cta: "Mejorar mi operación técnica",
  },
];

export function getIndustry(slug) {
  return industries.find((industry) => industry.slug === slug);
}
