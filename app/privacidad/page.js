import Link from "next/link";
import CommercialFooter from "../_components/CommercialFooter";
import CommercialHeader from "../_components/CommercialHeader";
import styles from "../contacto/contact.module.css";

export const metadata = {
  title: "Privacidad",
  description: "Cómo tratamos la información que compartes con KAVIRO Studio.",
};

export default function PrivacyPage() {
  return (
    <div className={styles.page} lang="es">
      <CommercialHeader styles={styles} />
      <main className={styles.main + " " + styles.shell}>
        <div className={styles.breadcrumbs}>
          <Link href="/">KAVIRO Studio</Link>
          <span>/</span>
          <span>Privacidad</span>
        </div>

        <section className={styles.intro} aria-labelledby="privacy-title">
          <p className={styles.eyebrow}>INFORMACIÓN CLARA</p>
          <h1 id="privacy-title">Tu información merece un trato claro.</h1>
          <p>
            Esta página explica qué datos recibimos cuando nos contactas y para
            qué los usamos.
          </p>
        </section>

        <div className={styles.legal}>
          <section>
            <h2>Qué información recibimos</h2>
            <p>
              Si solicitas una evaluación, recibimos tu nombre, empresa, sector,
              email, teléfono opcional y la descripción del proceso que quieres
              mejorar.
            </p>
          </section>

          <section>
            <h2>Para qué la usamos</h2>
            <p>
              Usamos esos datos únicamente para entender tu solicitud,
              responderte y conversar sobre un posible alcance de trabajo. El
              formulario no crea una cuenta ni guarda registros en la base de
              datos de KAVIRO.
            </p>
          </section>

          <section>
            <h2>Envío y conservación</h2>
            <p>
              El formulario envía la solicitud al correo de KAVIRO mediante el
              proveedor de email configurado para el sitio. La solicitud puede
              quedar en ese buzón y en los registros del proveedor según sus
              propias políticas. No vendemos ni compartimos tus datos para
              publicidad.
            </p>
          </section>

          <section>
            <h2>Analítica y demos</h2>
            <p>
              Esta versión no utiliza cookies de marketing ni analítica de
              terceros. QuoteFlow y NovaFlow son demostraciones: sus datos son
              ficticios y no deben contener información de clientes reales.
            </p>
          </section>

          <section>
            <h2>Preguntas o solicitudes</h2>
            <p>
              Para pedir una corrección o eliminación, escríbenos a{" "}
              <a href="mailto:empresakavirostudio@gmail.com">
                empresakavirostudio@gmail.com
              </a>
              .
            </p>
          </section>
        </div>

        <Link href="/" className={styles.emailLink}>
          Volver a KAVIRO Studio
        </Link>
      </main>
      <CommercialFooter styles={styles} />
    </div>
  );
}
