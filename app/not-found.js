import styles from "./status.module.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.mark}>N</div>
        <h1>Page not found.</h1>
        <p>
          The requested NovaFlow route does not exist. The public concept and
          private demo workspace are still available.
        </p>
        <div className={styles.actions}>
          <Link href="/">Return home</Link>
          <Link href="/demo">Open demo</Link>
        </div>
      </section>
    </main>
  );
}
