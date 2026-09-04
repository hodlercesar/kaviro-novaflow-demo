import Link from "next/link";
import Icon from "../demo/components/Icon";
import { getProductPreview } from "../../lib/product-preview.mjs";
import { riskFor } from "../../lib/novaflow.mjs";
import Brand from "./Brand";
import styles from "../home.module.css";

const money = (value) =>
  new Intl.NumberFormat("en-US", {
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
      "Open pipeline",
      money(metrics.pipeline),
      `${openCount} open opportunities`,
    ],
    ["Weighted forecast", money(metrics.weighted), "Probability-weighted"],
    ["At risk", `${metrics.atRisk} deal`, "Needs a next step"],
    ["Late-stage value", money(metrics.winPotential), "Proposal + negotiation"],
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
          NovaFlow <span className={styles.framePath}>/ workspace</span>
        </span>
        <span className={styles.sampleBadge}>Fictional dataset</span>
      </div>
      <div className={styles.workspace} lang="en">
        <aside
          className={styles.sidebar}
          aria-label="Preview navigation (non-interactive)"
        >
          <Brand className={styles.previewBrand} />
          <span className={styles.sideLabel}>WORKSPACE</span>
          {[
            ["grid", "Overview"],
            ["pipeline", "Pipeline"],
            ["bolt", "Automations"],
            ["chart", "Reports"],
            ["users", "Team"],
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
              Demo workspace<small>Concept demo</small>
            </span>
          </div>
        </aside>
        <div className={styles.previewMain}>
          <div className={styles.previewHeader}>
            <div>
              <h2>Overview</h2>
            </div>
            <Link href="/preview" className={styles.previewAction}>
              Open instant demo
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
              aria-label="Fictional pipeline by stage"
            >
              <div className={styles.panelHead}>
                <h3>Pipeline distribution</h3>
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
                    <small>{stage}</small>
                  </div>
                ))}
              </div>
            </section>
            <section
              className={styles.panel}
              aria-label="Fictional opportunity priorities"
            >
              <div className={styles.panelHead}>
                <h3>Needs attention</h3>
                <Icon name="target" size={16} />
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
                        {deal.stage} · {riskFor(deal).toLowerCase()} risk
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
              <h3>
                Recent activity <span>Sample</span>
              </h3>
              {activity.map((item) => (
                <p key={item.id}>
                  <span className={styles.activityDot} />
                  {item.text}
                </p>
              ))}
            </section>
            <section className={styles.automation}>
              <span className={styles.automationIcon}>
                <Icon name="bolt" size={18} />
              </span>
              <div>
                <h3>{automation.name}</h3>
                <p>7+ days idle → priority queue</p>
                <span>Workflow simulation</span>
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
