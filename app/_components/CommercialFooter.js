import Link from "next/link";
import StudioBrand from "./StudioBrand";

export default function CommercialFooter({ styles }) {
  return (
    <footer className={`${styles.footer} ${styles.shell}`}>
      <div>
        <Link href="/" aria-label="KAVIRO Studio, inicio">
          <StudioBrand className={styles.brand} />
        </Link>
        <p>Soluciones digitales con un propósito claro.</p>
      </div>
      <nav aria-label="Enlaces del pie de página">
        <Link href="/#servicios">Servicios</Link>
        <Link href="/quoteflow">QuoteFlow</Link>
        <Link href="/preview">NovaFlow</Link>
        <Link href="/contacto">Contacto</Link>
        <Link href="/privacidad">Privacidad</Link>
      </nav>
      <div className={styles.credits}>
        <span>Construido por Hodler César · KAVIRO Studio</span>
        <a
          href="https://github.com/hodlercesar/kaviro-novaflow-demo"
          target="_blank"
          rel="noreferrer"
        >
          Código del proyecto ↗
        </a>
      </div>
    </footer>
  );
}
