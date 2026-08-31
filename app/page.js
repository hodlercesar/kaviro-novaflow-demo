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
          <a href="#build">El proyecto</a>
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
            NOVAFLOW · CONCEPT DEMO
          </p>
          <h1 id="hero-title">
            Tu pipeline.
            <br />
            <span>Todo más claro.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Pipeline, prioridades y forecast.
          </p>
          <div className={styles.heroActions}>
            <Link href="/demo" className={styles.primary}>
              Explorar demo <Icon name="arrow" />
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
                <h3 lang="en">{title}</h3>
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
          <div lang="en">
            <h2 id="build-title">Conceptual SaaS product</h2>
            <p>Built by KAVIRO Studio</p>
          </div>
          <ul aria-label="Tecnologías utilizadas">
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
