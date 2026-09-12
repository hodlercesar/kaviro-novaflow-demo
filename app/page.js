import Link from "next/link";
import StudioBrand from "./_components/StudioBrand";
import Brand from "./_components/Brand";
import ProductPreview from "./_components/ProductPreview";
import Icon from "./demo/components/Icon";
import styles from "./business.module.css";

const contactUrl =
  "mailto:empresakavirostudio@gmail.com?subject=Quiero%20mejorar%20un%20proceso%20con%20KAVIRO";
const problems = [
  [
    "users",
    "Clientes que se pierden",
    "Una consulta llega, queda sin respuesta y la oportunidad se enfría.",
    "Un camino claro para contactar.",
  ],
  [
    "clock",
    "Cotizaciones sin seguimiento",
    "Enviaste el presupuesto, pero el próximo contacto depende de tu memoria.",
    "Cada oportunidad, con su siguiente paso.",
  ],
  [
    "refresh",
    "Procesos manuales",
    "Copiar datos y repetir tareas ocupa tiempo que podrías dedicar a tu negocio.",
    "Menos tareas repetidas, más organización.",
  ],
  [
    "grid",
    "Información repartida",
    "Lo importante está entre conversaciones de WhatsApp y planillas de Excel.",
    "La información que necesitas, en un lugar.",
  ],
];
const services = [
  {
    icon: "target",
    title: "Web que convierte",
    description:
      "Dale a cada visita un siguiente paso: consultar, pedir una cotización o hablar contigo.",
    items: [
      "Landing pages",
      "Formularios",
      "WhatsApp",
      "Captación de clientes",
    ],
    note: "De visita a conversación",
  },
  {
    icon: "grid",
    title: "Sistemas para negocios",
    description:
      "Ordena la operación con herramientas hechas para la forma en que trabaja tu equipo.",
    items: [
      "Dashboards",
      "Seguimiento de clientes",
      "Cotizaciones",
      "Herramientas internas",
    ],
    note: "De información a decisiones",
  },
  {
    icon: "bolt",
    title: "Automatización",
    description:
      "Identifica qué se repite y conecta los pasos que hoy haces a mano, con un alcance definido.",
    items: ["Procesos repetitivos", "Organización", "Flujos digitales"],
    note: "De tareas sueltas a un proceso",
  },
];

export default function Home() {
  return (
    <div className={styles.page} lang="es">
      <a className={styles.skipLink} href="#main">
        Saltar al contenido
      </a>
      <header className={`${styles.nav} ${styles.shell}`}>
        <Link href="/" aria-label="KAVIRO Studio, inicio">
          <StudioBrand className={styles.brand} />
        </Link>
        <nav aria-label="Navegación principal">
          <a href="#servicios">Servicios</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#sectores">Sectores</a>
        </nav>
        <a href="#contacto" className={styles.navContact}>
          Hablemos <Icon name="arrow" size={16} />
        </a>
      </header>
      <main id="main">
        <section
          className={`${styles.hero} ${styles.shell}`}
          aria-labelledby="hero-title"
        >
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>TECNOLOGÍA CON UN PROPÓSITO</p>
            <h1 id="hero-title">
              Tu negocio tiene
              <br />
              potencial.
              <br />
              <span>Démosle herramientas.</span>
            </h1>
            <p className={styles.heroDescription}>
              Soluciones digitales para negocios que quieren conseguir clientes,
              organizar procesos y automatizar tareas.
            </p>
            <div className={styles.actions}>
              <a href={contactUrl} className={styles.primary}>
                Cuéntanos qué proceso quieres mejorar{" "}
                <Icon name="arrow" size={18} />
              </a>
              <a href="#proyectos" className={styles.textLink}>
                Explorar nuestras demos <Icon name="chevron" size={15} />
              </a>
            </div>
            <p className={styles.heroNote}>
              Partimos por entender cómo funciona tu negocio.
            </p>
          </div>
          <div className={styles.flowPanel}>
            <div className={styles.flowHeader}>
              <span className={styles.flowMark}>K</span>
              <span>De la consulta al siguiente paso</span>
            </div>
            <p className={styles.flowIntro}>Un proceso más claro.</p>
            <ol className={styles.flowSteps}>
              <li>
                <span className={styles.flowIcon}>
                  <Icon name="users" size={20} />
                </span>
                <div>
                  <strong>Conecta con tus clientes</strong>
                  <p>Un lugar para recibir consultas.</p>
                </div>
                <Icon name="check" size={16} />
              </li>
              <li>
                <span className={styles.flowIcon}>
                  <Icon name="pipeline" size={20} />
                </span>
                <div>
                  <strong>Organiza cada oportunidad</strong>
                  <p>Información y cotizaciones a mano.</p>
                </div>
                <Icon name="check" size={16} />
              </li>
              <li>
                <span className={styles.flowIcon}>
                  <Icon name="bolt" size={20} />
                </span>
                <div>
                  <strong>Dale continuidad</strong>
                  <p>Seguimiento y flujos digitales.</p>
                </div>
                <Icon name="check" size={16} />
              </li>
            </ol>
            <div className={styles.flowFooter}>
              <span>PERSONAS</span>
              <i aria-hidden="true" />
              <span>PROCESOS</span>
              <i aria-hidden="true" />
              <span>TECNOLOGÍA</span>
            </div>
          </div>
        </section>
        <section
          id="problemas"
          className={`${styles.section} ${styles.shell}`}
          aria-labelledby="problems-title"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>PROBLEMAS QUE RESOLVEMOS</p>
              <h2 id="problems-title">
                Que el día a día
                <br />
                no frene tu negocio.
              </h2>
            </div>
            <p>
              No todo necesita un sistema enorme. A veces, el cambio empieza por
              ordenar lo que hoy se te escapa.
            </p>
          </div>
          <div className={styles.problemGrid}>
            {problems.map(([icon, title, description, outcome]) => (
              <article key={title} className={styles.problem}>
                <Icon name={icon} size={24} />
                <h3>{title}</h3>
                <p>{description}</p>
                <span>{outcome}</span>
              </article>
            ))}
          </div>
        </section>
        <section
          id="servicios"
          className={`${styles.section} ${styles.shell}`}
          aria-labelledby="services-title"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>CÓMO PODEMOS AYUDARTE</p>
              <h2 id="services-title">
                Herramientas que responden
                <br />a lo que necesitas.
              </h2>
            </div>
            <p>
              Captar consultas, ordenar el trabajo y conectar tareas. Elegimos
              el punto de partida contigo.
            </p>
          </div>
          <div className={styles.serviceGrid}>
            {services.map((service) => (
              <article key={service.title} className={styles.service}>
                <span className={styles.serviceIcon}>
                  <Icon name={service.icon} size={24} />
                </span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>
                      <Icon name="check" size={15} />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className={styles.serviceNote}>{service.note}</span>
              </article>
            ))}
          </div>
        </section>
        <section
          id="proyectos"
          className={`${styles.section} ${styles.shell}`}
          aria-labelledby="projects-title"
        >
          <span id="product" className={styles.anchor} />
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>CREADO EN KAVIRO</p>
              <h2 id="projects-title">
                Las ideas también
                <br />
                se pueden probar.
              </h2>
            </div>
            <p>
              Dos demostraciones propias para explorar cómo una herramienta
              digital puede resolver un problema concreto.
            </p>
          </div>
          <div className={styles.productGrid}>
            <article className={`${styles.product} ${styles.quoteProduct}`}>
              <div className={styles.productTop}>
                <span className={styles.quoteBrand}>
                  <span>QF</span>QuoteFlow
                </span>
                <span className={styles.badge}>PROTOTIPO</span>
              </div>
              <div
                className={styles.quoteFlow}
                aria-label="Ejemplo de etapas de una cotización"
              >
                <span>Preparar</span>
                <Icon name="arrow" size={16} />
                <span>Enviar</span>
                <Icon name="arrow" size={16} />
                <span>Dar seguimiento</span>
              </div>
              <h3>Cotizaciones con un próximo paso.</h3>
              <p>
                Herramienta creada por KAVIRO para demostrar el seguimiento de
                cotizaciones: cliente, estado y próximo contacto en un mismo
                lugar.
              </p>
              <div className={styles.productActions}>
                <Link href="/quoteflow/demo" className={styles.secondary}>
                  Probar QuoteFlow <Icon name="arrow" size={17} />
                </Link>
                <Link href="/quoteflow" className={styles.textLink}>
                  Conocer el proyecto
                </Link>
              </div>
              <small>
                Sin cuenta · Datos ficticios · Guardado solo en tu navegador
              </small>
            </article>
            <article className={styles.product}>
              <div className={styles.productTop}>
                <Brand className={styles.novaBrand} />
                <span className={styles.badge}>DEMO TÉCNICA SAAS</span>
              </div>
              <div className={styles.novaCapabilities}>
                <span>
                  <Icon name="pipeline" size={18} />
                  Pipeline
                </span>
                <span>
                  <Icon name="chart" size={18} />
                  Proyecciones
                </span>
                <span>
                  <Icon name="shield" size={18} />
                  Acceso privado
                </span>
              </div>
              <h3>Una experiencia de producto completa.</h3>
              <p>
                Demostración técnica SaaS de KAVIRO: un panel de oportunidades
                con autenticación, persistencia y proyecciones basadas en
                reglas.
              </p>
              <div className={styles.productActions}>
                <Link href="/preview" className={styles.secondary}>
                  Probar NovaFlow <Icon name="arrow" size={17} />
                </Link>
                <Link
                  href="/sign-in?redirect_url=/demo"
                  className={styles.textLink}
                >
                  Probar con cuenta
                </Link>
              </div>
              <small>
                Demo instantánea sin guardado · Persistencia al iniciar sesión
              </small>
            </article>
          </div>
          <p className={styles.demoNote}>
            <Icon name="shield" size={17} />
            Son proyectos demostrativos propios, no trabajos para clientes
            reales. Sus datos son ficticios y las automatizaciones de las demos
            son simuladas.
          </p>
          <details className={styles.previewDetails}>
            <summary>
              Ver vista previa de NovaFlow <span>Datos ficticios</span>
            </summary>
            <div className={styles.previewContent}>
              <ProductPreview />
            </div>
          </details>
        </section>
        <section
          id="sectores"
          className={`${styles.sectors} ${styles.shell}`}
          aria-labelledby="sectors-title"
        >
          <div>
            <p className={styles.eyebrow}>CERCA DE TU OPERACIÓN</p>
            <h2 id="sectors-title">
              Para negocios que
              <br />
              hacen que todo funcione.
            </h2>
            <p>
              Si tu día pasa entre visitas, cotizaciones y llamadas, queremos
              ayudarte a darle más orden.
            </p>
          </div>
          <ul>
            {[
              "Electricidad",
              "Climatización",
              "Construcción",
              "Servicios técnicos",
              "Pequeñas empresas",
            ].map((sector) => (
              <li key={sector}>
                {sector}
                <Icon name="arrow" size={18} />
              </li>
            ))}
          </ul>
        </section>
        <section
          id="contacto"
          className={`${styles.contact} ${styles.shell}`}
          aria-labelledby="contact-title"
        >
          <span id="build" className={styles.anchor} />
          <p className={styles.eyebrow}>EMPECEMOS POR TU NEGOCIO</p>
          <h2 id="contact-title">
            Menos vueltas.
            <br />
            <span>Un siguiente paso claro.</span>
          </h2>
          <p>
            Cuéntanos cómo trabajas hoy y qué te gustaría resolver. Definimos
            contigo una solución y un alcance claro.
          </p>
          <a href={contactUrl} className={styles.primary}>
            Cuéntanos qué proceso quieres mejorar{" "}
            <Icon name="arrow" size={18} />
          </a>
          <a
            href="mailto:empresakavirostudio@gmail.com"
            className={styles.email}
          >
            empresakavirostudio@gmail.com
          </a>
        </section>
      </main>
      <footer className={`${styles.footer} ${styles.shell}`}>
        <div>
          <Link href="/" aria-label="KAVIRO Studio, inicio">
            <StudioBrand className={styles.brand} />
          </Link>
          <p>Soluciones digitales con un propósito claro.</p>
        </div>
        <nav aria-label="Enlaces del pie de página">
          <a href="#servicios">Servicios</a>
          <Link href="/quoteflow">QuoteFlow</Link>
          <Link href="/preview">NovaFlow</Link>
          <Link href="/sign-in">Iniciar sesión</Link>
        </nav>
        <div id="creator" className={styles.credits}>
          <span>Construido por Hodler César · KAVIRO Studio</span>
          <a
            href="https://github.com/hodlercesar/kaviro-novaflow-demo"
            target="_blank"
            rel="noreferrer"
          >
            Código del proyecto ↗
          </a>
          <a
            href="https://github.com/hodlercesar"
            target="_blank"
            rel="noreferrer"
          >
            Perfil de GitHub ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
