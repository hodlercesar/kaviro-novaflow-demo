import Link from "next/link";
import Brand from "./_components/Brand";
import ProductPreview from "./_components/ProductPreview";
import Icon from "./demo/components/Icon";
import styles from "./home.module.css";

const benefits = [
  ["pipeline", "Track", "Gestiona cada oportunidad."],
  ["bolt", "Automate", "Explora reglas simuladas."],
  ["chart", "Forecast", "Proyección por probabilidad."],
];

export default function Home() {
  return (
    <div className={styles.page} lang="es">
      <a className={styles.skipLink} href="#main">
        Saltar al contenido
      </a>
      <header className={`${styles.nav} ${styles.shell}`}>
        <Link href="/" aria-label="NovaFlow, inicio">
          <Brand className={styles.brand} />
        </Link>
        <nav aria-label="Navegación principal">
          <a href="#product">Producto</a>
          <a href="#creator">Hodler César</a>
          <a href="#build">KAVIRO Studio</a>
        </nav>
        <Link href="/sign-in" className={styles.navLogin}>
          Iniciar sesión <Icon name="arrow" size={16} />
        </Link>
      </header>
      <main id="main">
        <section
          className={`${styles.hero} ${styles.shell}`}
          aria-labelledby="hero-title"
        >
          <p className={styles.eyebrow}>
            <span />
            NOVAFLOW · CONCEPT DEMO BY KAVIRO STUDIO
          </p>
          <h1 id="hero-title">
            Tu pipeline.
            <br />
            <span>Todo más claro.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Una demo interactiva que muestra cómo diseñamos, construimos y
            mejoramos productos web.
          </p>
          <div className={styles.heroActions}>
            <Link href="/preview" className={styles.primary}>
              Ver demo instantánea <Icon name="arrow" />
            </Link>
            <Link
              href="/sign-in?redirect_url=/demo"
              className={styles.secondary}
            >
              Probar persistencia
            </Link>
          </div>
          <p className={styles.heroNote}>
            Sin registro para la demo instantánea · datos 100% ficticios
          </p>
        </section>
        <section
          id="product"
          className={`${styles.productSection} ${styles.shell}`}
          aria-label="Vista previa de NovaFlow"
        >
          <ProductPreview />
        </section>
        <section
          className={`${styles.benefits} ${styles.shell}`}
          aria-labelledby="benefits-title"
        >
          <h2 id="benefits-title" className={styles.srOnly}>
            Capacidades
          </h2>
          <div className={styles.benefitGrid}>
            {benefits.map(([icon, title, copy]) => (
              <article key={title}>
                <span className={styles.featureIcon}>
                  <Icon name={icon} size={20} />
                </span>
                <h3 lang="en">{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          id="creator"
          className={`${styles.creator} ${styles.shell}`}
          aria-labelledby="creator-title"
        >
          <div className={styles.creatorCopy}>
            <span className={styles.creatorKicker}>PORTFOLIO ENGINEERING</span>
            <h2 id="creator-title">Construido por Hodler César.</h2>
            <p>
              NovaFlow es un proyecto técnico de portafolio creado para demostrar
              frontend, lógica de producto, autenticación, persistencia y
              despliegue. No corresponde a trabajo realizado para un cliente.
            </p>
            <p className={styles.creatorMeta}>
              Desarrollo web en formación · React · Next.js · JavaScript ·
              PostgreSQL
            </p>
          </div>
          <div className={styles.creatorLinks} aria-label="Enlaces profesionales">
            <a
              href="https://github.com/hodlercesar"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://github.com/hodlercesar/kaviro-novaflow-demo"
              target="_blank"
              rel="noreferrer"
            >
              Ver código <span aria-hidden="true">↗</span>
            </a>
            <a href="mailto:empresakavirostudio@gmail.com">Contacto</a>
          </div>
        </section>

        <section
          id="build"
          className={`${styles.build} ${styles.shell}`}
          aria-labelledby="build-title"
        >
          <div>
            <h2 id="build-title">¿Tienes un proyecto en mente?</h2>
            <p>
              Cuéntanos qué necesitas. En KAVIRO Studio desarrollamos landing
              pages, mejoras web, React/Next.js e integraciones con un alcance
              claro desde el inicio.
            </p>
            <div style={{ marginTop: 16 }}>
              <a
                href="mailto:empresakavirostudio@gmail.com?subject=Quiero%20hablar%20de%20mi%20proyecto%20con%20KAVIRO%20Studio"
                className={styles.primary}
              >
                Cuéntame qué necesitas <Icon name="arrow" size={16} />
              </a>
            </div>
          </div>
          <ul aria-label="Tecnologías utilizadas en NovaFlow">
            {["Next.js", "React", "Clerk", "Neon", "Vercel"].map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </section>
      </main>
      <footer className={`${styles.footer} ${styles.shell}`}>
        <Link href="/" aria-label="NovaFlow, inicio">
          <Brand className={styles.brand} />
        </Link>
        <a
          href="https://github.com/hodlercesar/kaviro-novaflow-demo"
          target="_blank"
          rel="noreferrer"
        >
          Código del proyecto <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </div>
  );
}
