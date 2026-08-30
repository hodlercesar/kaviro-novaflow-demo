"use client";

import styles from "./status.module.css";
import Link from "next/link";

export default function ErrorPage({ reset }) {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.mark}>N</div>
        <h1>NovaFlow hit a problem.</h1>
        <p>
          Your account and fictional workspace data remain isolated. Try
          rendering this view again.
        </p>
        <div className={styles.actions}>
          <button type="button" onClick={reset}>
            Try again
          </button>
          <Link href="/">Return home</Link>
        </div>
      </section>
    </main>
  );
}
