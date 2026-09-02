import styles from "./demo.module.css";

export default function DemoLoading() {
  return (
    <main className={styles.loading}>
      <div className={styles.loaderMark}>N</div>
      <p>Preparando tu espacio privado de demo</p>
    </main>
  );
}
