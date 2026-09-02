"use client";

import styles from "./status.module.css";
import Link from "next/link";

export default function ErrorPage({ reset }) {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.mark}>N</div>
        <h1>NovaFlow encontró un problema.</h1>
        <p>
          Tu cuenta y los datos ficticios del espacio siguen aislados. Intenta
          cargar esta vista nuevamente.
        </p>
        <div className={styles.actions}>
          <button type="button" onClick={reset}>
            Intentar de nuevo
          </button>
          <Link href="/">Volver al inicio</Link>
        </div>
      </section>
    </main>
  );
}
