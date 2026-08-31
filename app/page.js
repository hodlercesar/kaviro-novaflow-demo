import Link from "next/link";
import Brand from "./_components/Brand";
import ProductPreview from "./_components/ProductPreview";
import Icon from "./demo/components/Icon";
import styles from "./home.module.css";

const benefits = [
  ["pipeline", "Organiza", "Cada oportunidad, en su etapa."],
  ["target", "Prioriza", "El siguiente paso, a la vista."],
  ["chart", "Proyecta", "Forecast basado en probabilidades."],
  ["bolt", "Simula", "Explora reglas de seguimiento."],
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
            PRODUCTO CONCEPTUAL · KAVIRO STUDIO
          </p>
          <h1 id="hero-title">
            Tu pipeline.
            <br />
            <span>Todo más claro.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Oportunidades, prioridades y forecast. En un solo lugar.
          </p>
          <div className={styles.heroActions}>
            <Link href="/demo" className={styles.primary}>
              Explorar demo <Icon name="arrow" />
            </Link>
            <a href="#product" className={styles.secondary}>
              Ver el producto <span aria-hidden="true">↓</span>
            </a>
          </div>
          <span className={styles.heroNote}>
            Acceso con Clerk · Espacio personal de evaluación
          </span>
        </section>
        <section
          id="product"
          className={`${styles.productSection} ${styles.shell}`}
          aria-label="Vista previa de NovaFlow"
        >
          <div className={styles.productIntro}>
            <span>01 / PRODUCTO EN FOCO</span>
            <span>Menos ruido. Más contexto.</span>
          </div>
          <ProductPreview />
        </section>
        <section
          className={`${styles.benefits} ${styles.shell}`}
          aria-labelledby="benefits-title"
        >
          <h2 id="benefits-title">De la oportunidad al siguiente paso.</h2>
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
            <span className={styles.overline}>DISEÑO + INGENIERÍA</span>
            <h2 id="build-title">Un concepto. Una aplicación funcional.</h2>
            <p>
              Portfolio técnico de KAVIRO Studio. Sin clientes ni resultados
              inventados.
            </p>
          </div>
          <ul aria-label="Tecnologías utilizadas">
            {["Next.js", "React", "Clerk", "Neon", "Vercel"].map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </section>
        <section
          className={`${styles.finalSection} ${styles.shell}`}
          aria-labelledby="final-title"
        >
          <div className={styles.finalCta}>
            <span className={styles.eyebrow}>EL SIGUIENTE PASO ES TUYO</span>
            <h2 id="final-title">Entra. Explora. Hazlo fluir.</h2>
            <Link href="/demo" className={styles.primary}>
              Explorar demo <Icon name="arrow" />
            </Link>
            <p>Demo conceptual. Solo datos ficticios.</p>
          </div>
        </section>
      </main>
      <footer className={`${styles.footer} ${styles.shell}`}>
        <Link href="/" aria-label="NovaFlow, inicio">
          <Brand className={styles.brand} />
        </Link>
        <span>Diseñado y construido por KAVIRO Studio</span>
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
