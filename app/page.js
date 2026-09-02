import Link from "next/link";
import Brand from "./_components/Brand";
import ProductPreview from "./_components/ProductPreview";
import Icon from "./demo/components/Icon";
import styles from "./home.module.css";

const benefits = [
  ["pipeline", "Gestiona", "Gestiona cada oportunidad."],
  ["bolt", "Automatiza", "Explora reglas simuladas."],
  ["chart", "Proyecta", "Proyección por probabilidad."],
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
            NOVAFLOW · DEMO CONCEPTUAL DE KAVIRO STUDIO
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
            <Link href="/demo" className={styles.primary}>
              Explorar NovaFlow <Icon name="arrow" />
            </Link>
          </div>
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
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
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
