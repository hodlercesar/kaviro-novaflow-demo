import { riskFor } from "../../../lib/novaflow.mjs";
import {
  nextActionLabel,
  riskLabel,
  stageLabel,
} from "../../../lib/ui-labels.mjs";
import styles from "../demo.module.css";
import Icon from "./Icon";

export function money(value) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

export function initials(name = "") {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "NF"
  );
}

export function Sparkline({ points = "2,24 14,16 26,20 38,9 50,12 62,4" }) {
  return (
    <svg
      className={styles.sparkline}
      viewBox="0 0 64 28"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={`M${points.replaceAll(" ", " L")} L62,28 L2,28 Z`}
        opacity=".09"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function Metric({
  icon,
  label,
  value,
  delta,
  subtitle,
  points,
  danger,
}) {
  return (
    <article
      className={`${styles.metricCard} ${danger ? styles.metricDanger : ""}`}
    >
      <div className={styles.metricTop}>
        <span className={styles.metricIcon}>
          <Icon name={icon} />
        </span>
        <span className={styles.metricDelta}>{delta}</span>
      </div>
      <span className={styles.metricLabel}>{label}</span>
      <strong>{value}</strong>
      <div className={styles.metricBottom}>
        <small>{subtitle}</small>
        <Sparkline points={points} />
      </div>
    </article>
  );
}

export function PanelHead({ title, caption, action, onClick }) {
  return (
    <div className={styles.panelHead}>
      <div>
        <h3>{title}</h3>
        <p>{caption}</p>
      </div>
      {action && (
        <button type="button" onClick={onClick}>
          {action}
          <Icon name="arrow" size={14} />
        </button>
      )}
    </div>
  );
}

export function DealRow({ deal, onAdvance }) {
  const risk = riskFor(deal);
  return (
    <div className={styles.dealRow}>
      <div className={styles.accountCell}>
        <span className={styles.companyLogo}>{initials(deal.company)}</span>
        <div>
          <b>{deal.company}</b>
          <small>
            {deal.contact} · {deal.owner}
          </small>
        </div>
      </div>
      <span className={styles.stagePill}>{stageLabel(deal.stage)}</span>
      <div className={styles.valueCell}>
        <b>{money(deal.value)}</b>
        <small>{deal.probability}% ponderado</small>
      </div>
      <span className={`${styles.riskPill} ${styles[`risk${risk}`]}`}>
        <i />
        {riskLabel(risk)}
      </span>
      <div className={styles.nextCell}>
        <b>{nextActionLabel(deal.next)}</b>
        <small>
          {deal.daysIdle === 0
            ? "Actualizado hoy"
            : `Hace ${deal.daysIdle} ${deal.daysIdle === 1 ? "día" : "días"}`}
        </small>
      </div>
      <button
        type="button"
        className={styles.rowAction}
        onClick={() => onAdvance(deal.id)}
        disabled={deal.stage === "Won"}
        aria-label={
          deal.stage === "Won"
            ? `${deal.company} está cerrada como ganada`
            : `Avanzar ${deal.company} a la siguiente etapa`
        }
      >
        {deal.stage === "Won" ? <Icon name="check" /> : <Icon name="chevron" />}
      </button>
    </div>
  );
}
