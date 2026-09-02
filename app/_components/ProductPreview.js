import Link from "next/link";
import Icon from "../demo/components/Icon";
import { getProductPreview } from "../../lib/product-preview.mjs";
import { riskFor } from "../../lib/novaflow.mjs";
import {
  activityLabel,
  relativeTimeLabel,
  riskLabel,
  stageLabel,
} from "../../lib/ui-labels.mjs";
import Brand from "./Brand";
import styles from "../home.module.css";

const money = (value) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export default function ProductPreview() {
  const { metrics, stageTotals, priority, activity, automation, openCount } =
    getProductPreview();
  const maximum = Math.max(...stageTotals.map((stage) => stage.value), 1);
  const cards = [
    [
      "Pipeline abierto",
      money(metrics.pipeline),
      `${openCount} oportunidades abiertas`,
    ],
    ["Pronóstico ponderado", money(metrics.weighted), "Según probabilidad"],
    [
      "En riesgo",
      `${metrics.atRisk} ${metrics.atRisk === 1 ? "oportunidad" : "oportunidades"}`,
      "Requiere un siguiente paso",
    ],
    [
      "Valor en etapa avanzada",
      money(metrics.winPotential),
      "Propuesta + negociación",
    ],
  ];

  return (
    <figure className={styles.preview} aria-labelledby="preview-caption">
      <div className={styles.frameTop}>
        <span className={styles.windowDots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>
          NovaFlow <span className={styles.framePath}>/ espacio</span>
        </span>
        <span aria-hidden="true" />
      </div>
      <div className={styles.workspace} lang="es">
        <aside
          className={styles.sidebar}
          aria-label="Navegación de vista previa, no interactiva"
        >
          <Brand className={styles.previewBrand} />
          <span className={styles.sideLabel}>ESPACIO</span>
          {[
            ["grid", "Resumen"],
            ["pipeline", "Pipeline"],
            ["bolt", "Automatizaciones"],
            ["chart", "Informes"],
            ["users", "Equipo"],
          ].map(([icon, title], i) => (
            <span
              key={title}
              className={i === 0 ? styles.activeNav : styles.sideNav}
            >
              <Icon name={icon} size={16} />
              {title}
              {i === 0 && <i />}
            </span>
          ))}
          <div className={styles.sideFoot}>
            <span className={styles.sampleAvatar}>D</span>
            <span>
              Espacio de muestra<small>KAVIRO Studio</small>
            </span>
          </div>
        </aside>
        <div className={styles.previewMain}>
          <div className={styles.previewHeader}>
            <div>
              <h2>Resumen</h2>
            </div>
            <Link href="/demo" className={styles.previewAction}>
              Abrir espacio
              <Icon name="arrow" size={14} />
            </Link>
          </div>
          <div className={styles.metrics}>
            {cards.map(([label, value, detail], i) => (
              <div key={label} className={styles.metric}>
                <span>
                  {label}
                  <Icon
                    name={["pipeline", "chart", "clock", "target"][i]}
                    size={14}
                  />
                </span>
                <strong>{value}</strong>
                <small>{detail}</small>
              </div>
            ))}
          </div>
          <div className={styles.previewGrid}>
            <section
              className={styles.panel}
              aria-label="Pipeline ficticio por etapa"
            >
              <div className={styles.panelHead}>
                <h3>Distribución del pipeline</h3>
                <span>USD</span>
              </div>
              <div className={styles.chart}>
                {stageTotals.map(({ stage, value }, i) => (
                  <div key={stage} className={styles.chartColumn}>
                    <div className={styles.barTrack}>
                      <div
                        className={styles.bar}
                        style={{
                          height: `${Math.max(4, (value / maximum) * 100)}%`,
                          "--bar-opacity": 0.5 + i * 0.12,
                        }}
                      >
                        <span>{money(value)}</span>
                      </div>
                    </div>
                    <small>{stageLabel(stage)}</small>
                  </div>
                ))}
              </div>
            </section>
            <section
              className={styles.panel}
              aria-label="Prioridades ficticias de oportunidades"
            >
              <div className={styles.panelHead}>
                <h3>Requiere atención</h3>
                <Link href="/demo?view=Pipeline" className={styles.previewAction}>
                  Ver todas <Icon name="arrow" size={13} />
                </Link>
              </div>
              <div className={styles.queue}>
                {priority.map((deal) => (
                  <div key={deal.id} className={styles.queueRow}>
                    <span
                      className={
                        riskFor(deal) === "High"
                          ? styles.riskHigh
                          : styles.riskMedium
                      }
                    />
                    <div>
                      <strong>{deal.company}</strong>
                      <small>
                        {stageLabel(deal.stage)} · riesgo{" "}
                        {riskLabel(riskFor(deal)).toLowerCase()}
                      </small>
                    </div>
                    <b>{money(deal.value)}</b>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className={styles.previewBottom}>
            <section className={styles.activity}>
              <h3>Actividad reciente</h3>
              {activity.map((item) => (
                <p key={item.id}>
                  <span className={styles.activityDot} />
                  {activityLabel(item.text)}{" "}
                  <small>· {relativeTimeLabel(item.time)}</small>
                </p>
              ))}
            </section>
            <section className={styles.automation}>
              <span className={styles.automationIcon}>
                <Icon name="bolt" size={18} />
              </span>
              <div>
                <h3>{automation.name}</h3>
                <p>7+ días sin actividad → cola prioritaria</p>
                <span>Simulación de flujo</span>
              </div>
            </section>
          </div>
        </div>
      </div>
      <figcaption id="preview-caption">
        <span className={styles.captionDot} />
        Demo conceptual · Datos ficticios
      </figcaption>
    </figure>
  );
}
