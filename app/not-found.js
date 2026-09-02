import styles from "./status.module.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.mark}>N</div>
        <h1>Página no encontrada.</h1>
        <p>
          La ruta solicitada de NovaFlow no existe. La presentación pública y
          el espacio privado de demo siguen disponibles.
        </p>
        <div className={styles.actions}>
          <Link href="/">Volver al inicio</Link>
          <Link href="/demo">Abrir demo</Link>
        </div>
      </section>
    </main>
  );
}
