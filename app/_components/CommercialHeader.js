import Link from "next/link";
import Icon from "../demo/components/Icon";
import StudioBrand from "./StudioBrand";

export default function CommercialHeader({ styles }) {
  return (
    <header className={`${styles.nav} ${styles.shell}`}>
      <Link href="/" aria-label="KAVIRO Studio, inicio">
        <StudioBrand className={styles.brand} />
      </Link>
      <nav className={styles.navLinks} aria-label="Navegación principal">
        <Link href="/#servicios">Servicios</Link>
        <Link href="/#proyectos">Proyectos</Link>
        <Link href="/sectores">Sectores</Link>
      </nav>
      <Link href="/contacto" className={styles.navContact}>
        Hablemos <Icon name="arrow" size={16} />
      </Link>
    </header>
  );
}
