"use client";

import { useEffect, useState } from "react";
import { comparePriority, riskFor } from "../../../lib/novaflow.mjs";
import styles from "../demo.module.css";
import Icon from "./Icon";
import { DealRow, Metric, money, PanelHead } from "./Ui";

export function Overview({
  metrics,
  deals,
  stageTotals,
  activity,
  forecastSource,
  userName,
  onOpenPipeline,
  onAdvance,
}) {
  const maxStage = Math.max(...stageTotals.map((stage) => stage.value), 1);
  const priority = [...deals]
    .filter((deal) => deal.stage !== "Won")
    .sort(comparePriority)
    .slice(0, 4);
  const openDeals = deals.filter((deal) => deal.stage !== "Won");
  const lateStage = openDeals.filter((deal) =>
    ["Proposal", "Negotiation"].includes(deal.stage),
  );
  const conversion = openDeals.length
    ? Math.round((lateStage.length / openDeals.length) * 100)
    : 0;
  const averageDeal = deals.length
    ? deals.reduce((sum, deal) => sum + deal.value, 0) / deals.length
    : 0;
  const averageIdle = openDeals.length
    ? Math.round(
        openDeals.reduce((sum, deal) => sum + deal.daysIdle, 0) /
          openDeals.length,
      )
    : 0;
  const health = Math.max(
    0,
    Math.min(100, 100 - metrics.atRisk * 18 - Math.max(0, averageIdle - 2) * 4),
  );

  return (
    <>
      <section className={styles.heroRow}>
        <div>
          <span className={styles.eyebrow}>
            Fictional evaluation workspace · Live interactions
          </span>
          <h2>Welcome, {userName}.</h2>
          <p>
            {metrics.atRisk
              ? `${metrics.atRisk} opportunity needs attention in this simulated pipeline.`
              : "The simulated pipeline has no high-risk opportunities right now."}
          </p>
        </div>
        <div
          className={styles.healthBadge}
          aria-label={`Simulated pipeline health score ${health} out of 100`}
        >
          <span
            className={styles.healthRing}
            style={{ "--health-score": `${health * 3.6}deg` }}
          >
            <span>{health}</span>
          </span>
          <div>
            <b>Demo health score</b>
            <small>Derived from risk + inactivity</small>
          </div>
        </div>
      </section>
      <section className={styles.kpiGrid}>
        <Metric
          icon="pipeline"
          label="Open pipeline"
          value={money(metrics.pipeline)}
          delta="Live"
          subtitle="fictional opportunity value"
          points="2,22 13,18 24,20 36,11 49,14 62,6"
        />
        <Metric
          icon="target"
          label="Weighted forecast"
          value={money(metrics.weighted)}
          delta={forecastSource}
          subtitle="probability adjusted"
          points="2,23 14,20 26,12 38,15 50,8 62,5"
        />
        <Metric
          icon="trend"
          label="Late-stage value"
          value={money(metrics.winPotential)}
          delta={`${lateStage.length} deals`}
          subtitle="proposal + negotiation"
          points="2,21 14,15 26,17 38,12 50,9 62,9"
        />
        <Metric
          icon="clock"
          label="Deals at risk"
          value={String(metrics.atRisk)}
          delta={metrics.atRisk ? "Review" : "All clear"}
          subtitle="based on age + confidence"
          danger={Boolean(metrics.atRisk)}
          points="2,8 14,10 26,8 38,19 50,15 62,20"
        />
      </section>
      <section className={styles.dashboardGrid}>
        <div className={styles.panelLarge}>
          <PanelHead
            title="Revenue pipeline"
            caption="Fictional value by stage"
            action="View pipeline"
            onClick={onOpenPipeline}
          />
          <div className={styles.stageChart}>
            {stageTotals.map((stage) => (
              <div key={stage.stage} className={styles.stageRow}>
                <div className={styles.stageName}>
                  <span>{stage.stage}</span>
                  <small>
                    {stage.count} {stage.count === 1 ? "deal" : "deals"}
                  </small>
                </div>
                <div className={styles.barTrack}>
                  <span
                    style={{
                      width: `${Math.max(4, (stage.value / maxStage) * 100)}%`,
                    }}
                  />
                </div>
                <b>{money(stage.value)}</b>
              </div>
            ))}
          </div>
          <div className={styles.chartFooter}>
            <div>
              <span>Late-stage share</span>
              <b>{conversion}%</b>
            </div>
            <div>
              <span>Average deal size</span>
              <b>{money(averageDeal)}</b>
            </div>
            <div>
              <span>Average inactivity</span>
              <b>{averageIdle} days</b>
            </div>
          </div>
        </div>
        <div className={styles.panel}>
          <PanelHead
            title="Activity"
            caption="Latest simulated workspace events"
          />
          <div className={styles.activityList}>
            {activity.slice(0, 5).map((item, index) => (
              <div key={item.id}>
                <span className={styles.activityDot}>
                  {index === 0 ? <Icon name="bolt" size={12} /> : ""}
                </span>
                <p>
                  {item.text}
                  <small>{item.time}</small>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.panel}>
        <PanelHead
          title="Priority opportunities"
          caption="Ranked by risk, then fictional value"
          action="Open pipeline"
          onClick={onOpenPipeline}
        />
        <OpportunityTable deals={priority} onAdvance={onAdvance} />
      </section>
    </>
  );
}

function OpportunityTable({ deals, onAdvance }) {
  return (
    <div className={styles.opportunityTable}>
      <div className={styles.tableHead}>
        <span>Account</span>
        <span>Stage</span>
        <span>Value</span>
        <span>Risk</span>
        <span>Next step</span>
        <span />
      </div>
      {deals.map((deal) => (
        <DealRow key={deal.id} deal={deal} onAdvance={onAdvance} />
      ))}
    </div>
  );
}

export function Pipeline({ deals, riskFilter, setRiskFilter, onAdvance }) {
  return (
    <section className={styles.panel}>
      <div className={styles.pipelineHeader}>
        <div>
          <span className={styles.eyebrow}>Fictional opportunity data</span>
          <h2>Opportunity pipeline</h2>
          <p>Search, filter and advance the evaluation dataset.</p>
        </div>
        <div
          className={styles.filterTabs}
          aria-label="Filter opportunities by risk"
        >
          {["All", "High", "Medium", "Low"].map((risk) => (
            <button
              type="button"
              key={risk}
              className={riskFilter === risk ? styles.filterActive : ""}
              onClick={() => setRiskFilter(risk)}
            >
              {risk}
            </button>
          ))}
        </div>
      </div>
      <OpportunityTable deals={deals} onAdvance={onAdvance} />
      {deals.length === 0 && (
        <div className={styles.emptyState}>
          <Icon name="search" size={28} />
          <h3>No opportunities found</h3>
          <p>Try a different search term or risk filter.</p>
        </div>
      )}
    </section>
  );
}

export function Automations({ items, toggle }) {
  const totalRuns = items.reduce((sum, item) => sum + item.runs, 0);
  const active = items.filter((item) => item.enabled).length;
  const hours = ((totalRuns * 12) / 60).toFixed(1);
  return (
    <>
      <section className={styles.sectionIntro}>
        <span className={styles.eyebrow}>Simulated workflow engine</span>
        <h2>Explore automation behavior.</h2>
        <p>
          These rules are interactive product simulations. They do not contact
          customers or external systems.
        </p>
      </section>
      <div className={styles.automationGrid}>
        {items.map((item) => (
          <article key={item.id} className={styles.automationCard}>
            <div className={styles.automationIcon}>
              <Icon name="bolt" />
            </div>
            <div className={styles.automationBody}>
              <div>
                <span className={styles.automationStatus}>
                  {item.enabled ? "Active simulation" : "Paused"}
                </span>
                <h3>{item.name}</h3>
                <p>{item.detail}</p>
              </div>
              <div className={styles.automationFoot}>
                <span>
                  <b>{item.runs}</b> simulated runs
                </span>
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className={`${styles.toggle} ${item.enabled ? styles.toggleOn : ""}`}
                  aria-label={`${item.enabled ? "Pause" : "Enable"} ${item.name}`}
                  aria-pressed={item.enabled}
                >
                  <i />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <section className={styles.panel}>
        <PanelHead
          title="Simulation summary"
          caption="Calculated from the fictional workflow dataset"
        />
        <div className={styles.performanceRow}>
          <div>
            <b>{totalRuns}</b>
            <span>simulated executions</span>
          </div>
          <div>
            <b>{hours}h</b>
            <span>estimated manual effort</span>
          </div>
          <div>
            <b>{active}</b>
            <span>active simulations</span>
          </div>
          <div>
            <b>{items.length}</b>
            <span>configured rules</span>
          </div>
        </div>
      </section>
    </>
  );
}

function FxPanel() {
  const [fx, setFx] = useState({ state: "loading" });
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/exchange", { signal: controller.signal })
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject(new Error("Provider unavailable")),
      )
      .then((data) => setFx({ state: "ready", data }))
      .catch((error) => {
        if (error.name !== "AbortError") setFx({ state: "error" });
      });
    return () => controller.abort();
  }, []);

  return (
    <div className={styles.panel}>
      <PanelHead
        title="Reference exchange rates"
        caption="Live public market reference from Frankfurter"
      />
      {fx.state === "loading" && (
        <p className={styles.integrationState}>Loading reference rates…</p>
      )}
      {fx.state === "error" && (
        <p className={styles.integrationState}>
          Market reference is temporarily unavailable. Core demo data remains
          unchanged.
        </p>
      )}
      {fx.state === "ready" && (
        <div className={styles.forecastSummary}>
          {Object.entries(fx.data.rates).map(([currency, rate]) => (
            <div key={currency}>
              <span>1 USD in {currency}</span>
              <b>
                {new Intl.NumberFormat("en-US", {
                  maximumFractionDigits: currency === "CLP" ? 0 : 3,
                }).format(rate)}
              </b>
              <small>{fx.data.dates?.[currency] || fx.data.date}</small>
            </div>
          ))}
          <div>
            <span>Oldest reference</span>
            <b>{fx.data.date}</b>
          </div>
        </div>
      )}
      <p className={styles.panelDisclaimer}>
        Reference only. NovaFlow does not present this as financial advice.
      </p>
    </div>
  );
}

export function Reports({ deals, stageTotals }) {
  const maxStage = Math.max(...stageTotals.map((stage) => stage.value), 1);
  const won = deals
    .filter((deal) => deal.stage === "Won")
    .reduce((sum, deal) => sum + deal.value, 0);
  const averageProbability = deals.length
    ? Math.round(
        deals.reduce((sum, deal) => sum + deal.probability, 0) / deals.length,
      )
    : 0;
  return (
    <>
      <section className={styles.sectionIntro}>
        <span className={styles.eyebrow}>Fictional revenue intelligence</span>
        <h2>Forecast with context.</h2>
        <p>
          All opportunity values are evaluation fixtures. Live FX data is
          clearly separated below.
        </p>
      </section>
      <div className={styles.reportGrid}>
        <div className={styles.panelLarge}>
          <PanelHead
            title="Pipeline distribution"
            caption="Fictional value across each sales stage"
          />
          <div className={styles.bigBars}>
            {stageTotals.map((stage) => (
              <div key={stage.stage}>
                <div>
                  <span>{stage.stage}</span>
                  <b>{money(stage.value)}</b>
                </div>
                <div>
                  <i
                    style={{
                      width: `${Math.max(3, (stage.value / maxStage) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.panel}>
          <PanelHead
            title="Forecast summary"
            caption="Current evaluation dataset"
          />
          <div className={styles.forecastSummary}>
            <div>
              <span>Closed won</span>
              <b>{money(won)}</b>
            </div>
            <div>
              <span>Open value</span>
              <b>
                {money(
                  deals
                    .filter((deal) => deal.stage !== "Won")
                    .reduce((sum, deal) => sum + deal.value, 0),
                )}
              </b>
            </div>
            <div>
              <span>Average probability</span>
              <b>{averageProbability}%</b>
            </div>
            <div>
              <span>At-risk value</span>
              <b>
                {money(
                  deals
                    .filter((deal) => riskFor(deal) === "High")
                    .reduce((sum, deal) => sum + deal.value, 0),
                )}
              </b>
            </div>
          </div>
        </div>
      </div>
      <FxPanel />
    </>
  );
}

export function Team({ deals }) {
  const team = [
    { id: "KM", name: "Kira Miles", role: "Revenue Lead" },
    { id: "AR", name: "Alex Rowan", role: "Account Executive" },
    { id: "LS", name: "Lena Shaw", role: "Solutions Lead" },
  ];
  return (
    <>
      <section className={styles.sectionIntro}>
        <span className={styles.eyebrow}>Fictional demo team</span>
        <h2>One pipeline, clear ownership.</h2>
        <p>
          These personas exist only to demonstrate assignment and collaboration
          UI.
        </p>
      </section>
      <div className={styles.teamGrid}>
        {team.map((member) => {
          const mine = deals.filter(
            (deal) => deal.owner === member.id && deal.stage !== "Won",
          );
          return (
            <article key={member.id} className={styles.memberCard}>
              <div className={styles.memberTop}>
                <span className={styles.memberAvatar}>{member.id}</span>
                <span className={styles.demoBadge}>Demo persona</span>
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <div className={styles.memberStats}>
                <div>
                  <b>{mine.length}</b>
                  <span>open deals</span>
                </div>
                <div>
                  <b>
                    {money(mine.reduce((sum, deal) => sum + deal.value, 0))}
                  </b>
                  <span>fictional pipeline</span>
                </div>
              </div>
              <div className={styles.memberFooter}>
                <span className={styles.onlineDot} /> Included in evaluation
                data
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

export function Settings({
  preferences,
  setPreferences,
  sync,
  onReset,
  previewMode = false,
}) {
  const rows = [
    [
      "weekly",
      "Weekly forecast digest",
      "A simulated summary preference for the evaluation workspace.",
    ],
    [
      "risk",
      "Risk alerts",
      "Surface high-risk opportunities when age or confidence crosses a threshold.",
    ],
    [
      "activity",
      "Activity summaries",
      "Bundle low-priority simulated events into a daily digest.",
    ],
  ];
  return (
    <>
      <section className={styles.sectionIntro}>
        <span className={styles.eyebrow}>Workspace controls</span>
        <h2>Clear, reversible demo settings.</h2>
        <p>
          {previewMode
            ? "Preferences are temporary in instant evaluation mode and reset when the session ends."
            : "Preferences are scoped to this signed-in browser. Opportunity data syncs separately through Neon."}
        </p>
      </section>
      <section className={styles.panel}>
        <div className={styles.settingsGroup}>
          <h3>Notification simulation</h3>
          <p>No email or external message is sent by these controls.</p>
          {rows.map(([id, title, description]) => (
            <div className={styles.settingRow} key={id}>
              <div>
                <b>{title}</b>
                <span>{description}</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  setPreferences((current) => ({
                    ...current,
                    [id]: !current[id],
                  }))
                }
                className={`${styles.toggle} ${preferences[id] ? styles.toggleOn : ""}`}
                aria-label={`${preferences[id] ? "Disable" : "Enable"} ${title}`}
                aria-pressed={preferences[id]}
              >
                <i />
              </button>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.panel}>
        <div className={styles.settingsGroup}>
          <h3>Evaluation data</h3>
          <p>
            NovaFlow is a conceptual technical demonstration. Resetting restores
            only the fictional baseline.
          </p>
          <div className={styles.securityNote}>
            <Icon name="shield" />
            <div>
              <b>{sync.label}</b>
              <span>
                No real customer records are included in this workspace.
              </span>
            </div>
          </div>
          <button
            type="button"
            className={styles.resetButton}
            onClick={onReset}
          >
            <Icon name="refresh" size={16} /> Reset fictional workspace
          </button>
        </div>
      </section>
    </>
  );
}
