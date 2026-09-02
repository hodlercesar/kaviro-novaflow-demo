"use client";

import { useEffect, useState } from "react";
import { comparePriority, riskFor } from "../../../lib/novaflow.mjs";
import {
  activityLabel,
  relativeTimeLabel,
  riskLabel,
  stageLabel,
} from "../../../lib/ui-labels.mjs";
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
            Espacio ficticio de evaluación · Interacciones reales
          </span>
          <h2>Hola, {userName}.</h2>
          <p>
            {metrics.atRisk
              ? `${metrics.atRisk} ${metrics.atRisk === 1 ? "oportunidad requiere" : "oportunidades requieren"} atención en este pipeline simulado.`
              : "El pipeline simulado no tiene oportunidades de alto riesgo ahora mismo."}
          </p>
        </div>
        <div
          className={styles.healthBadge}
          aria-label={`Puntuación simulada de salud del pipeline: ${health} de 100`}
        >
          <span
            className={styles.healthRing}
            style={{ "--health-score": `${health * 3.6}deg` }}
          >
            <span>{health}</span>
          </span>
          <div>
            <b>Salud de la demo</b>
            <small>Calculada por riesgo + inactividad</small>
          </div>
        </div>
      </section>
      <section className={styles.kpiGrid}>
        <Metric
          icon="pipeline"
          label="Pipeline abierto"
          value={money(metrics.pipeline)}
          delta="En vivo"
          subtitle="valor ficticio de oportunidades"
          points="2,22 13,18 24,20 36,11 49,14 62,6"
        />
        <Metric
          icon="target"
          label="Pronóstico ponderado"
          value={money(metrics.weighted)}
          delta={forecastSource}
          subtitle="ajustado por probabilidad"
          points="2,23 14,20 26,12 38,15 50,8 62,5"
        />
        <Metric
          icon="trend"
          label="Valor en etapa avanzada"
          value={money(metrics.winPotential)}
          delta={`${lateStage.length} ${lateStage.length === 1 ? "oportunidad" : "oportunidades"}`}
          subtitle="propuesta + negociación"
          points="2,21 14,15 26,17 38,12 50,9 62,9"
        />
        <Metric
          icon="clock"
          label="Oportunidades en riesgo"
          value={String(metrics.atRisk)}
          delta={metrics.atRisk ? "Revisar" : "Todo en orden"}
          subtitle="según antigüedad + confianza"
          danger={Boolean(metrics.atRisk)}
          points="2,8 14,10 26,8 38,19 50,15 62,20"
        />
      </section>
      <section className={styles.dashboardGrid}>
        <div className={styles.panelLarge}>
          <PanelHead
            title="Pipeline de ingresos"
            caption="Valor ficticio por etapa"
            action="Ver pipeline"
            onClick={onOpenPipeline}
          />
          <div className={styles.stageChart}>
            {stageTotals.map((stage) => (
              <div key={stage.stage} className={styles.stageRow}>
                <div className={styles.stageName}>
                  <span>{stageLabel(stage.stage)}</span>
                  <small>
                    {stage.count} {stage.count === 1 ? "oportunidad" : "oportunidades"}
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
              <span>Participación avanzada</span>
              <b>{conversion}%</b>
            </div>
            <div>
              <span>Valor promedio</span>
              <b>{money(averageDeal)}</b>
            </div>
            <div>
              <span>Inactividad promedio</span>
              <b>{averageIdle} {averageIdle === 1 ? "día" : "días"}</b>
            </div>
          </div>
        </div>
        <div className={styles.panel}>
          <PanelHead
            title="Actividad"
            caption="Últimos eventos simulados del espacio"
          />
          <div className={styles.activityList}>
            {activity.slice(0, 5).map((item, index) => (
              <div key={item.id}>
                <span className={styles.activityDot}>
                  {index === 0 ? <Icon name="bolt" size={12} /> : ""}
                </span>
                <p>
                  {activityLabel(item.text)}
                  <small>{relativeTimeLabel(item.time)}</small>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.panel}>
        <PanelHead
          title="Oportunidades prioritarias"
          caption="Ordenadas por riesgo y luego por valor ficticio"
          action="Abrir pipeline"
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
        <span>Cuenta</span>
        <span>Etapa</span>
        <span>Valor</span>
        <span>Riesgo</span>
        <span>Siguiente paso</span>
        <span />
      </div>
      {deals.map((deal) => (
        <DealRow key={deal.id} deal={deal} onAdvance={onAdvance} />
      ))}
    </div>
  );
}

export function Pipeline({ deals, riskFilter, setRiskFilter, onAdvance }) {
  const riskOptions = [
    ["All", "Todos"],
    ["High", "Alto"],
    ["Medium", "Medio"],
    ["Low", "Bajo"],
  ];

  return (
    <section className={styles.panel}>
      <div className={styles.pipelineHeader}>
        <div>
          <span className={styles.eyebrow}>Datos ficticios de oportunidades</span>
          <h2>Pipeline de oportunidades</h2>
          <p>Busca, filtra y avanza registros del conjunto de evaluación.</p>
        </div>
        <div
          className={styles.filterTabs}
          aria-label="Filtrar oportunidades por riesgo"
        >
          {riskOptions.map(([risk, label]) => (
            <button
              type="button"
              key={risk}
              className={riskFilter === risk ? styles.filterActive : ""}
              onClick={() => setRiskFilter(risk)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <OpportunityTable deals={deals} onAdvance={onAdvance} />
      {deals.length === 0 && (
        <div className={styles.emptyState}>
          <Icon name="search" size={28} />
          <h3>No se encontraron oportunidades</h3>
          <p>Prueba otro término de búsqueda o filtro de riesgo.</p>
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
        <span className={styles.eyebrow}>Motor de flujos simulado</span>
        <h2>Explora el comportamiento de las automatizaciones.</h2>
        <p>
          Estas reglas son simulaciones interactivas del producto. No contactan
          clientes ni sistemas externos.
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
                  {item.enabled ? "Simulación activa" : "Pausada"}
                </span>
                <h3>{item.name}</h3>
                <p>{item.detail}</p>
              </div>
              <div className={styles.automationFoot}>
                <span>
                  <b>{item.runs}</b> ejecuciones simuladas
                </span>
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className={`${styles.toggle} ${item.enabled ? styles.toggleOn : ""}`}
                  aria-label={`${item.enabled ? "Pausar" : "Activar"} ${item.name}`}
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
          title="Resumen de simulación"
          caption="Calculado a partir del conjunto ficticio de flujos"
        />
        <div className={styles.performanceRow}>
          <div>
            <b>{totalRuns}</b>
            <span>ejecuciones simuladas</span>
          </div>
          <div>
            <b>{hours}h</b>
            <span>esfuerzo manual estimado</span>
          </div>
          <div>
            <b>{active}</b>
            <span>simulaciones activas</span>
          </div>
          <div>
            <b>{items.length}</b>
            <span>reglas configuradas</span>
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
          : Promise.reject(new Error("Proveedor no disponible")),
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
        title="Tipos de cambio de referencia"
        caption="Referencia pública en vivo desde Frankfurter"
      />
      {fx.state === "loading" && (
        <p className={styles.integrationState}>Cargando tipos de referencia…</p>
      )}
      {fx.state === "error" && (
        <p className={styles.integrationState}>
          La referencia de mercado no está disponible temporalmente. Los datos
          principales de la demo no cambian.
        </p>
      )}
      {fx.state === "ready" && (
        <div className={styles.forecastSummary}>
          {Object.entries(fx.data.rates).map(([currency, rate]) => (
            <div key={currency}>
              <span>1 USD en {currency}</span>
              <b>
                {new Intl.NumberFormat("es-CL", {
                  maximumFractionDigits: currency === "CLP" ? 0 : 3,
                }).format(rate)}
              </b>
              <small>{fx.data.dates?.[currency] || fx.data.date}</small>
            </div>
          ))}
          <div>
            <span>Referencia más antigua</span>
            <b>{fx.data.date}</b>
          </div>
        </div>
      )}
      <p className={styles.panelDisclaimer}>
        Solo como referencia. NovaFlow no presenta estos datos como asesoría
        financiera.
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
        <span className={styles.eyebrow}>Inteligencia de ingresos ficticia</span>
        <h2>Proyecta con contexto.</h2>
        <p>
          Todos los valores de oportunidades son datos de evaluación. Los tipos
          de cambio en vivo se muestran por separado.
        </p>
      </section>
      <div className={styles.reportGrid}>
        <div className={styles.panelLarge}>
          <PanelHead
            title="Distribución del pipeline"
            caption="Valor ficticio en cada etapa comercial"
          />
          <div className={styles.bigBars}>
            {stageTotals.map((stage) => (
              <div key={stage.stage}>
                <div>
                  <span>{stageLabel(stage.stage)}</span>
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
            title="Resumen del pronóstico"
            caption="Conjunto actual de evaluación"
          />
          <div className={styles.forecastSummary}>
            <div>
              <span>Ganado cerrado</span>
              <b>{money(won)}</b>
            </div>
            <div>
              <span>Valor abierto</span>
              <b>
                {money(
                  deals
                    .filter((deal) => deal.stage !== "Won")
                    .reduce((sum, deal) => sum + deal.value, 0),
                )}
              </b>
            </div>
            <div>
              <span>Probabilidad promedio</span>
              <b>{averageProbability}%</b>
            </div>
            <div>
              <span>Valor en riesgo</span>
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
    { id: "KM", name: "Kira Miles", role: "Líder de ingresos" },
    { id: "AR", name: "Alex Rowan", role: "Ejecutivo de cuentas" },
    { id: "LS", name: "Lena Shaw", role: "Líder de soluciones" },
  ];
  return (
    <>
      <section className={styles.sectionIntro}>
        <span className={styles.eyebrow}>Equipo ficticio de demo</span>
        <h2>Un pipeline, responsables claros.</h2>
        <p>
          Estas personas existen solo para demostrar la interfaz de asignación y
          colaboración.
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
                <span className={styles.demoBadge}>Persona ficticia</span>
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <div className={styles.memberStats}>
                <div>
                  <b>{mine.length}</b>
                  <span>oportunidades abiertas</span>
                </div>
                <div>
                  <b>
                    {money(mine.reduce((sum, deal) => sum + deal.value, 0))}
                  </b>
                  <span>pipeline ficticio</span>
                </div>
              </div>
              <div className={styles.memberFooter}>
                <span className={styles.onlineDot} /> Incluido en los datos de
                evaluación
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

export function Settings({ preferences, setPreferences, sync, onReset }) {
  const rows = [
    [
      "weekly",
      "Resumen semanal del pronóstico",
      "Preferencia simulada de resumen para el espacio de evaluación.",
    ],
    [
      "risk",
      "Alertas de riesgo",
      "Destaca oportunidades de alto riesgo cuando la antigüedad o confianza cruza un umbral.",
    ],
    [
      "activity",
      "Resúmenes de actividad",
      "Agrupa eventos simulados de baja prioridad en un resumen diario.",
    ],
  ];
  return (
    <>
      <section className={styles.sectionIntro}>
        <span className={styles.eyebrow}>Controles del espacio</span>
        <h2>Ajustes de demo claros y reversibles.</h2>
        <p>
          Las preferencias corresponden a este navegador autenticado. Los datos
          de oportunidades se sincronizan por separado mediante Neon.
        </p>
      </section>
      <section className={styles.panel}>
        <div className={styles.settingsGroup}>
          <h3>Simulación de notificaciones</h3>
          <p>Estos controles no envían correos ni mensajes externos.</p>
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
                aria-label={`${preferences[id] ? "Desactivar" : "Activar"} ${title}`}
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
          <h3>Datos de evaluación</h3>
          <p>
            NovaFlow es una demostración técnica conceptual. Restablecerla solo
            recupera la base ficticia.
          </p>
          <div className={styles.securityNote}>
            <Icon name="shield" />
            <div>
              <b>{sync.label}</b>
              <span>
                Este espacio no incluye registros de clientes reales.
              </span>
            </div>
          </div>
          <button
            type="button"
            className={styles.resetButton}
            onClick={onReset}
          >
            <Icon name="refresh" size={16} /> Restablecer espacio ficticio
          </button>
        </div>
      </section>
    </>
  );
}
