import Link from "next/link";
import styles from "./quoteflow.module.css";

const features = [
  {
    title: "Cotizaciones bajo control",
    text: "Guarda cliente, monto, estado y próxima acción en un solo lugar.",
  },
  {
    title: "Seguimiento visible",
    text: "Detecta qué cotizaciones necesitan contacto antes de que se enfríen.",
  },
  {
    title: "WhatsApp a un toque",
    text: "Abre la conversación del cliente desde la misma ficha de seguimiento.",
  },
];

const audiences = [
  "Electricistas e instaladores",
  "Técnicos y mantención",
  "Talleres y servicios automotrices",
  "Freelancers y pequeños equipos",
];

export const metadata = {
  title: "QuoteFlow — Seguimiento simple de cotizaciones",
  description:
    "Prototipo beta para pequeños negocios de servicios que quieren ordenar cotizaciones y seguimientos sin un CRM complejo.",
};

export default function QuoteFlowLanding() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Volver a KAVIRO">
          <span className={styles.logo}>QF</span>
          <span>
            <strong>QuoteFlow</strong>
            <small>by KAVIRO</small>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Navegación QuoteFlow">
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#para-quien">Para quién</a>
          <Link href="/quoteflow/demo" className={styles.navCta}>
            Probar demo
          </Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.badge}>BETA PRIVADA · PROTOTIPO EN VALIDACIÓN</span>
          <h1>No pierdas cotizaciones por falta de seguimiento.</h1>
          <p>
            QuoteFlow ayuda a pequeños negocios de servicios a saber qué cotizaron,
            qué deben volver a contactar y qué oportunidades terminaron ganando.
          </p>
          <div className={styles.heroActions}>
            <Link href="/quoteflow/demo" className={styles.primary}>
              Probar demo interactiva
            </Link>
            <a
              href="mailto:empresakavirostudio@gmail.com?subject=Quiero%20probar%20QuoteFlow"
              className={styles.secondary}
            >
              Quiero ser tester
            </a>
          </div>
          <p className={styles.microcopy}>
            Sin registro para la demo · datos ficticios · cambios guardados solo en tu navegador
          </p>
        </div>

        <div className={styles.preview} aria-label="Vista previa de QuoteFlow">
          <div className={styles.previewTop}>
            <div>
              <span className={styles.previewEyebrow}>Resumen</span>
              <strong>Septiembre</strong>
            </div>
            <span className={styles.liveDot}>Demo</span>
          </div>
          <div className={styles.metrics}>
            <article>
              <span>Cotizado</span>
              <strong>$4.820.000</strong>
            </article>
            <article>
              <span>Ganado</span>
              <strong>$1.740.000</strong>
            </article>
            <article>
              <span>Por seguir</span>
              <strong>4</strong>
            </article>
          </div>
          <div className={styles.quoteList}>
            <div>
              <span className={styles.avatar}>JM</span>
              <p>
                <strong>Instalación eléctrica</strong>
                <small>Juan Martínez · $680.000</small>
              </p>
              <span className={styles.statusFollow}>Seguimiento</span>
            </div>
            <div>
              <span className={styles.avatar}>CP</span>
              <p>
                <strong>Mantención preventiva</strong>
                <small>Comercial Plaza · $420.000</small>
              </p>
              <span className={styles.statusSent}>Enviada</span>
            </div>
            <div>
              <span className={styles.avatar}>LR</span>
              <p>
                <strong>Tablero eléctrico</strong>
                <small>Lucía Rojas · $1.120.000</small>
              </p>
              <span className={styles.statusWon}>Ganada</span>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className={styles.section}>
        <div className={styles.sectionHeading}>
          <span>MENOS CRM. MÁS SEGUIMIENTO.</span>
          <h2>Lo esencial para no dejar dinero olvidado en WhatsApp.</h2>
        </div>
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <article key={feature.title} className={styles.featureCard}>
              <span className={styles.number}>0{index + 1}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="para-quien" className={styles.audience}>
        <div>
          <span className={styles.sectionLabel}>PARA NEGOCIOS DE SERVICIOS</span>
          <h2>Si cotizas por WhatsApp, correo o Excel, queremos hablar contigo.</h2>
          <p>
            Esta primera versión se está construyendo para equipos pequeños que no
            necesitan un CRM gigante, sino recordar a quién contactar y qué cotización
            está en juego.
          </p>
        </div>
        <ul>
          {audiences.map((item) => (
            <li key={item}>
              <span>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.validation}>
        <span>OBJETIVO DE ESTA BETA</span>
        <h2>Conseguir el primer negocio que diga: “sí, esto me sirve”.</h2>
        <p>
          No estamos prometiendo automatizaciones mágicas ni reemplazar herramientas
          empresariales. Estamos validando una solución simple para cotizar, recordar y
          hacer seguimiento.
        </p>
        <div className={styles.heroActions}>
          <Link href="/quoteflow/demo" className={styles.primary}>
            Abrir QuoteFlow
          </Link>
          <a
            href="mailto:empresakavirostudio@gmail.com?subject=Feedback%20QuoteFlow"
            className={styles.secondary}
          >
            Enviar feedback
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>QuoteFlow es un prototipo beta creado por KAVIRO Studio.</p>
        <Link href="/">Volver a NovaFlow</Link>
      </footer>
    </main>
  );
}
