import Link from "next/link";
import styles from "./quoteflow.module.css";

const features = [
  {
    title: "Registra lo esencial",
    text: "Guarda cliente, servicio, monto y contexto sin llenar un CRM complejo.",
  },
  {
    title: "Define el siguiente contacto",
    text: "Cada propuesta puede tener un estado y una próxima fecha visible para el equipo.",
  },
  {
    title: "Retoma la conversación",
    text: "Abre WhatsApp desde la misma ficha cuando llegue el momento de volver a contactar.",
  },
];

const audiences = [
  "Electricidad y climatización",
  "Construcción y mantención",
  "Servicios técnicos",
  "Pequeñas empresas de servicios",
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
          <span className={styles.badge}>
            DEMO DE PRODUCTO · DATOS FICTICIOS
          </span>
          <h1>No pierdas cotizaciones por falta de seguimiento.</h1>
          <p>
            QuoteFlow ayuda a pequeños negocios de servicios a saber qué
            cotizaron, qué deben volver a contactar y qué oportunidades siguen
            abiertas.
          </p>
          <div className={styles.heroActions}>
            <Link href="/quoteflow/demo" className={styles.primary}>
              Probar demo interactiva
            </Link>
            <Link href="/contacto" className={styles.secondary}>
              Solicitar evaluación
            </Link>
          </div>
          <p className={styles.microcopy}>
            Sin registro para la demo · cambios guardados solo en tu navegador ·
            herramienta creada por KAVIRO
          </p>
        </div>

        <div className={styles.preview} aria-label="Vista previa de QuoteFlow">
          <div className={styles.previewTop}>
            <div>
              <span className={styles.previewEyebrow}>Resumen</span>
              <strong>Septiembre</strong>
            </div>
            <span className={styles.liveDot}>Datos de ejemplo</span>
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
          <span>UN FLUJO BREVE Y VISIBLE</span>
          <h2>Del presupuesto enviado al próximo contacto.</h2>
          <p>
            QuoteFlow ordena el momento que suele quedar pendiente: qué se
            cotizó, en qué estado está y qué paso sigue.
          </p>
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
          <span className={styles.sectionLabel}>
            PARA QUIENES TRABAJAN POR PROYECTO O SERVICIO
          </span>
          <h2>
            Si cotizas por WhatsApp, correo o Excel, queremos hablar contigo.
          </h2>
          <p>
            QuoteFlow está pensado como un punto de partida para equipos que
            necesitan recordar a quién contactar y qué cotización está en juego
            sin sumar una plataforma pesada.
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
        <span>UNA DEMOSTRACIÓN DE KAVIRO</span>
        <h2>Prueba el flujo con datos ficticios y cuéntanos qué mejorarías.</h2>
        <p>
          QuoteFlow no es un caso de éxito ni una herramienta desplegada para
          clientes reales. Es una demostración propia para explorar una forma
          más clara de cotizar, recordar y hacer seguimiento.
        </p>
        <div className={styles.heroActions}>
          <Link href="/quoteflow/demo" className={styles.primary}>
            Abrir QuoteFlow
          </Link>
          <Link href="/contacto" className={styles.secondary}>
            Cuéntanos tu proceso
          </Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>QuoteFlow es un prototipo beta creado por KAVIRO Studio.</p>
        <div className={styles.footerLinks}>
          <Link href="/">Volver a KAVIRO Studio</Link>
          <Link href="/privacidad">Privacidad</Link>
        </div>
      </footer>
    </main>
  );
}
