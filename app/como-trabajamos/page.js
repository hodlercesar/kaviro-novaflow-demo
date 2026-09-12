import Link from "next/link";
import Icon from "../demo/components/Icon";
import CommercialFooter from "../_components/CommercialFooter";
import CommercialHeader from "../_components/CommercialHeader";
import baseStyles from "../sectores/sector.module.css";
import styles from "./process.module.css";

export const metadata = {
  title: "Cómo trabajamos",
  description:
    "Conoce el proceso de KAVIRO Studio para transformar problemas de negocio en soluciones digitales.",
  alternates: {
    canonical: "/como-trabajamos",
  },
};

const processSteps = [
  [
    "01",
    "Diagnóstico",
    "Entendemos tu negocio, tus procesos actuales y los puntos donde pierdes tiempo, clientes u oportunidades.",
  ],
  [
    "02",
    "Propuesta",
    "Diseñamos una solución digital enfocada en tus objetivos, evitando herramientas innecesarias.",
  ],
  [
    "03",
    "Desarrollo",
    "Construimos sitios web, herramientas internas y automatizaciones adaptadas a las necesidades del negocio.",
  ],
  [
    "04",
    "Mejora continua",
    "Te acompañamos después del lanzamiento para mejorar y adaptar la solución según evolucione tu empresa.",
  ],
];

const capabilities = [
  {
    icon: "target",
    title: "Webs profesionales",
    description:
      "Una presencia digital clara para que las personas entiendan tu servicio y sepan cómo contactarte.",
    items: [
      "Páginas orientadas a captar clientes",
      "Formularios",
      "Integración con canales de contacto",
    ],
  },
  {
    icon: "grid",
    title: "Herramientas de negocio",
    description:
      "Sistemas que reúnen la información que tu equipo necesita para dar continuidad al trabajo.",
    items: [
      "Seguimiento de clientes",
      "Cotizaciones",
      "Dashboards",
      "Procesos internos",
    ],
  },
  {
    icon: "bolt",
    title: "Automatización",
    description:
      "Flujos digitales para que las tareas repetitivas tengan un orden y un siguiente paso.",
    items: [
      "Reducir tareas repetitivas",
      "Organizar información",
      "Mejorar seguimiento",
    ],
  },
];

const sectors = [
  ["Electricidad", "electricidad"],
  ["Climatización", "climatizacion"],
  ["Construcción", "construccion"],
  ["Servicios técnicos", "servicios-tecnicos"],
];

export default function HowWeWorkPage() {
  return (
    <div className={baseStyles.page} lang="es">
      <CommercialHeader styles={baseStyles} />
      <main className={`${baseStyles.main} ${baseStyles.shell}`}>
        <div className={baseStyles.breadcrumbs}>
          <Link href="/">KAVIRO Studio</Link>
          <span>/</span>
          <span>Cómo trabajamos</span>
        </div>

        <section className={baseStyles.hero} aria-labelledby="process-title">
          <div>
            <p className={baseStyles.eyebrow}>UNA FORMA CLARA DE AVANZAR</p>
            <h1 id="process-title">
              Transformamos problemas de negocio en soluciones digitales
            </h1>
            <p className={baseStyles.heroLead}>
              Analizamos cómo trabaja tu empresa, identificamos oportunidades de
              mejora y construimos herramientas digitales adaptadas a tus
              procesos.
            </p>
            <div className={baseStyles.heroActions}>
              <Link href="/contacto" className={baseStyles.primary}>
                Solicitar evaluación <Icon name="arrow" size={17} />
              </Link>
              <a href="#soluciones" className={baseStyles.secondary}>
                Ver soluciones <Icon name="chevron" size={15} />
              </a>
            </div>
          </div>
          <aside
            className={baseStyles.heroPanel}
            aria-labelledby="approach-title"
          >
            <div className={baseStyles.heroPanelLabel}>
              <span>Una conversación a la vez</span>
              <span>KAVIRO</span>
            </div>
            <h2 id="approach-title">
              Primero entendemos. Después construimos.
            </h2>
            <p>
              Cada negocio tiene una forma de trabajar. La solución empieza por
              reconocerla y encontrar el punto donde una herramienta puede
              ayudar.
            </p>
            <ul className={baseStyles.signalList}>
              <li>
                <Icon name="check" size={16} />
                Un alcance que puedas entender.
              </li>
              <li>
                <Icon name="check" size={16} />
                Herramientas conectadas a tu operación.
              </li>
            </ul>
          </aside>
        </section>

        <section className={baseStyles.section} aria-labelledby="steps-title">
          <div className={baseStyles.sectionHeading}>
            <p className={baseStyles.eyebrow}>NUESTRO PROCESO</p>
            <h2 id="steps-title">Nuestro proceso</h2>
            <p>
              Avanzamos por etapas para que cada decisión tenga un propósito y
              puedas ver cómo toma forma la solución.
            </p>
          </div>
          <ol className={styles.processGrid}>
            {processSteps.map(([number, title, text]) => (
              <li key={number} className={styles.processCard}>
                <span className={styles.processNumber}>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="soluciones"
          className={baseStyles.section}
          aria-labelledby="capabilities-title"
        >
          <div className={baseStyles.sectionHeading}>
            <p className={baseStyles.eyebrow}>QUÉ PODEMOS CONSTRUIR</p>
            <h2 id="capabilities-title">Qué podemos construir</h2>
            <p>
              Elegimos la combinación adecuada según el problema y el momento de
              tu negocio.
            </p>
          </div>
          <div className={baseStyles.solutionGrid}>
            {capabilities.map((capability) => (
              <article key={capability.title} className={baseStyles.solution}>
                <span className={baseStyles.solutionIcon}>
                  <Icon name={capability.icon} size={21} />
                </span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
                <ul className={styles.capabilityList}>
                  {capability.items.map((item) => (
                    <li key={item}>
                      <Icon name="check" size={15} />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={baseStyles.section} aria-labelledby="sectors-title">
          <div className={baseStyles.sectionHeading}>
            <p className={baseStyles.eyebrow}>CERCA DE TU OPERACIÓN</p>
            <h2 id="sectors-title">Trabajamos con negocios de servicios.</h2>
            <p>
              Explora situaciones habituales y encuentra un punto de partida más
              cercano a tu día a día.
            </p>
          </div>
          <div className={styles.sectorLinks}>
            {sectors.map(([name, slug]) => (
              <Link
                key={slug}
                href={`/sectores/${slug}`}
                className={styles.sectorLink}
              >
                <span>{name}</span>
                <Icon name="arrow" size={16} />
              </Link>
            ))}
          </div>
        </section>

        <section className={baseStyles.cta} aria-labelledby="process-cta-title">
          <p className={baseStyles.eyebrow}>SIGUIENTE PASO</p>
          <h2 id="process-cta-title">
            ¿Tienes un proceso que quieres mejorar?
          </h2>
          <p>
            Cuéntanos cómo funciona hoy y conversemos sobre una primera mejora
            posible.
          </p>
          <Link href="/contacto" className={baseStyles.primary}>
            Cuéntanos tu idea <Icon name="arrow" size={17} />
          </Link>
        </section>
      </main>
      <CommercialFooter styles={baseStyles} />
    </div>
  );
}
