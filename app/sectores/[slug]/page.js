import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "../../demo/components/Icon";
import CommercialFooter from "../../_components/CommercialFooter";
import CommercialHeader from "../../_components/CommercialHeader";
import { getIndustry, industries } from "../../_content/industries";
import styles from "../sector.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  return {
    title: `${industry.name}: soluciones digitales para negocios`,
    description: industry.intro,
  };
}

export default async function IndustryPage({ params }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  return (
    <div className={styles.page} lang="es">
      <CommercialHeader styles={styles} />
      <main className={`${styles.main} ${styles.shell}`}>
        <div className={styles.breadcrumbs}>
          <Link href="/">KAVIRO Studio</Link>
          <span>/</span>
          <Link href="/sectores">Sectores</Link>
          <span>/</span>
          <span>{industry.name}</span>
        </div>

        <section className={styles.hero} aria-labelledby="industry-title">
          <div>
            <p className={styles.eyebrow}>{industry.eyebrow}</p>
            <h1 id="industry-title">{industry.title}</h1>
            <p className={styles.heroLead}>{industry.intro}</p>
            <div className={styles.heroActions}>
              <Link
                href={`/contacto?sector=${industry.slug}`}
                className={styles.primary}
              >
                {industry.cta} <Icon name="arrow" size={17} />
              </Link>
              <Link href="/quoteflow/demo" className={styles.secondary}>
                Probar QuoteFlow
              </Link>
            </div>
          </div>
          <aside className={styles.heroPanel} aria-labelledby="signals-title">
            <div className={styles.heroPanelLabel}>
              <span>Lo que suele frenarte</span>
              <span>01</span>
            </div>
            <h2 id="signals-title">El trabajo no termina en la consulta.</h2>
            <p>{industry.problem}</p>
            <ul className={styles.signalList}>
              {industry.signals.map((signal) => (
                <li key={signal}>
                  <Icon name="check" size={16} />
                  {signal}
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className={styles.section} aria-labelledby="solutions-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>CÓMO AYUDA KAVIRO</p>
            <h2 id="solutions-title">Un proceso más claro para tu equipo.</h2>
            <p>
              Elegimos el punto de partida según lo que hoy se repite, se pierde
              o requiere demasiadas coordinaciones.
            </p>
          </div>
          <div className={styles.solutionGrid}>
            {industry.solutions.map((solution) => (
              <article key={solution.title} className={styles.solution}>
                <span className={styles.solutionIcon}>
                  <Icon name={solution.icon} size={21} />
                </span>
                <h3>{solution.title}</h3>
                <p>{solution.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="quoteflow-title">
          <div className={styles.quoteFlow}>
            <span className={styles.quoteMark}>QF</span>
            <div>
              <p className={styles.eyebrow}>UNA DEMOSTRACIÓN DE KAVIRO</p>
              <h3 id="quoteflow-title">¿Dónde entra QuoteFlow?</h3>
              <p>{industry.quoteFlow}</p>
              <Link href="/quoteflow">
                Conocer QuoteFlow <Icon name="arrow" size={15} />
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="industry-cta-title">
          <p className={styles.eyebrow}>SIGUIENTE PASO</p>
          <h2 id="industry-cta-title">Hablemos de cómo funciona tu negocio.</h2>
          <p>
            Cuéntanos qué proceso quieres ordenar y revisaremos un primer
            alcance contigo.
          </p>
          <Link
            href={`/contacto?sector=${industry.slug}`}
            className={styles.primary}
          >
            Solicitar evaluación <Icon name="arrow" size={17} />
          </Link>
        </section>
      </main>
      <CommercialFooter styles={styles} />
    </div>
  );
}
