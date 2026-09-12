import Link from "next/link";
import Icon from "../demo/components/Icon";
import CommercialFooter from "../_components/CommercialFooter";
import CommercialHeader from "../_components/CommercialHeader";
import LeadForm from "./LeadForm";
import styles from "./contact.module.css";

export const metadata = {
  title: "Solicitar evaluación",
  description:
    "Cuéntale a KAVIRO qué proceso quieres mejorar y conversemos sobre un primer alcance.",
};

export default async function ContactPage({ searchParams }) {
  const params = searchParams ? await searchParams : {};
  const defaultSector = typeof params?.sector === "string" ? params.sector : "";

  return (
    <div className={styles.page} lang="es">
      <CommercialHeader styles={styles} />
      <main className={`${styles.main} ${styles.shell}`}>
        <div className={styles.breadcrumbs}>
          <Link href="/">KAVIRO Studio</Link>
          <span>/</span>
          <span>Contacto</span>
        </div>

        <section className={styles.intro} aria-labelledby="contact-title">
          <p className={styles.eyebrow}>EMPECEMOS POR TU NEGOCIO</p>
          <h1 id="contact-title">Cuéntanos qué proceso quieres mejorar.</h1>
          <p>
            Con unas pocas respuestas podemos entender tu punto de partida y
            conversar sobre una solución digital con un alcance claro.
          </p>
        </section>

        <div className={styles.contactGrid}>
          <section className={styles.formCard} aria-labelledby="form-title">
            <h2 id="form-title">Solicita una evaluación inicial</h2>
            <p>
              Describe el proceso tal como funciona hoy. No necesitas preparar
              una presentación ni conocer una herramienta específica.
            </p>
            <LeadForm defaultSector={defaultSector} />
          </section>

          <aside className={styles.asideCard} aria-labelledby="aside-title">
            <p className={styles.eyebrow}>QUÉ PUEDES CONTARNOS</p>
            <h2 id="aside-title">
              El contexto ayuda a encontrar el primer paso.
            </h2>
            <p>
              Puedes hablarnos de una parte concreta de tu operación, aunque
              todavía no tengas definida la solución.
            </p>
            <ul className={styles.asideList}>
              <li>
                <Icon name="check" size={16} />
                Cómo llegan hoy tus consultas o solicitudes.
              </li>
              <li>
                <Icon name="check" size={16} />
                Qué ocurre después de enviar una cotización.
              </li>
              <li>
                <Icon name="check" size={16} />
                Qué tarea repetitiva te quita más tiempo.
              </li>
            </ul>
            <p className={styles.asideNote}>
              Tu solicitud se envía al equipo de KAVIRO para que podamos
              responderte. El formulario no crea una cuenta ni guarda datos en
              la base de datos del sitio.
            </p>
            <a
              href="mailto:empresakavirostudio@gmail.com"
              className={styles.emailLink}
            >
              empresakavirostudio@gmail.com
            </a>
          </aside>
        </div>

        <Link href="/" className={styles.emailLink}>
          <Icon name="chevron" size={15} /> Volver a KAVIRO Studio
        </Link>
      </main>
      <CommercialFooter styles={styles} />
    </div>
  );
}
