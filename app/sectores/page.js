import Link from "next/link";
import Icon from "../demo/components/Icon";
import CommercialFooter from "../_components/CommercialFooter";
import CommercialHeader from "../_components/CommercialHeader";
import { industries } from "../_content/industries";
import styles from "./sector.module.css";

export const metadata = {
  title: "Soluciones por industria",
  description:
    "Soluciones digitales de KAVIRO para electricidad, climatización, construcción y servicios técnicos.",
};

export default function IndustriesPage() {
  return (
    <div className={styles.page} lang="es">
      <CommercialHeader styles={styles} />
      <main className={`${styles.main} ${styles.shell}`}>
        <div className={styles.breadcrumbs}>
          <Link href="/">KAVIRO Studio</Link>
          <span>/</span>
          <span>Sectores</span>
        </div>

        <section className={styles.hero} aria-labelledby="industries-title">
          <div>
            <p className={styles.eyebrow}>CERCA DE TU OPERACIÓN</p>
            <h1 id="industries-title">
              Herramientas digitales para el trabajo que ya haces.
            </h1>
            <p className={styles.heroLead}>
              Conocemos los procesos que empiezan con una consulta, una visita o
              una cotización. Explora cómo podemos ayudarte a darles
              continuidad.
            </p>
            <div className={styles.heroActions}>
              <Link href="/contacto" className={styles.primary}>
                Cuéntanos qué quieres mejorar <Icon name="arrow" size={17} />
              </Link>
              <Link href="/#proyectos" className={styles.secondary}>
                Ver demostraciones
              </Link>
            </div>
          </div>
          <div className={styles.heroPanel}>
            <div className={styles.heroPanelLabel}>
              <span>Un punto de partida</span>
              <span>KAVIRO</span>
            </div>
            <h2>Personas, procesos y tecnología.</h2>
            <p>
              Partimos por entender qué se repite, qué se pierde y qué necesita
              tu equipo para avanzar con más claridad.
            </p>
          </div>
        </section>

        <section
          className={styles.section}
          aria-labelledby="industry-list-title"
        >
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>ELIGE TU CONTEXTO</p>
            <h2 id="industry-list-title">
              Una conversación más relevante empieza aquí.
            </h2>
          </div>
          <div className={styles.solutionGrid}>
            {industries.map((industry) => (
              <article key={industry.slug} className={styles.solution}>
                <span className={styles.solutionIcon}>
                  <Icon name={industry.solutions[0].icon} size={21} />
                </span>
                <h3>{industry.name}</h3>
                <p>{industry.intro}</p>
                <Link
                  href={`/sectores/${industry.slug}`}
                  className={styles.backLink}
                >
                  Ver cómo podemos ayudar <Icon name="arrow" size={15} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="industries-cta-title">
          <p className={styles.eyebrow}>EMPECEMOS POR TU PROCESO</p>
          <h2 id="industries-cta-title">¿No encuentras tu industria?</h2>
          <p>
            Cuéntanos cómo trabajas hoy. Podemos identificar juntos un primer
            proceso para ordenar.
          </p>
          <Link href="/contacto" className={styles.primary}>
            Solicitar evaluación <Icon name="arrow" size={17} />
          </Link>
        </section>
      </main>
      <CommercialFooter styles={styles} />
    </div>
  );
}
