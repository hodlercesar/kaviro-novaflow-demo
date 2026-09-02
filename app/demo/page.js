"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MAX_DEALS, STAGES, riskFor } from "../../lib/novaflow.mjs";
import { stageLabel } from "../../lib/ui-labels.mjs";
import styles from "./demo.module.css";
import Icon from "./components/Icon";
import NewOpportunityModal from "./components/NewOpportunityModal";
import {
  Automations,
  Overview,
  Pipeline,
  Reports,
  Settings,
  Team,
} from "./components/Views";
import { initials } from "./components/Ui";
import { useWorkspace } from "./useWorkspace";

const navItems = [
  ["Overview", "Resumen", "grid"],
  ["Pipeline", "Pipeline", "pipeline"],
  ["Automations", "Automatizaciones", "bolt"],
  ["Reports", "Informes", "chart"],
  ["Team", "Equipo", "users"],
  ["Settings", "Ajustes", "settings"],
];

function viewLabel(view) {
  return navItems.find(([key]) => key === view)?.[1] || view;
}

export default function DemoPage() {
  const { isLoaded, user } = useUser();
  const { signOut } = useClerk();
  const workspace = useWorkspace(user?.id);
  const [activeView, setActiveView] = useState("Overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [query, setQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const searchRef = useRef(null);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const noticeTimer = useRef(null);

  const toast = useCallback((text) => {
    window.clearTimeout(noticeTimer.current);
    setNotice(text);
    noticeTimer.current = window.setTimeout(() => setNotice(""), 2400);
  }, []);

  useEffect(() => () => window.clearTimeout(noticeTimer.current), []);

  useEffect(() => {
    const requestedView = new URLSearchParams(window.location.search).get("view");
    if (navItems.some(([key]) => key === requestedView)) {
      setActiveView(requestedView);
    }
  }, []);

  useEffect(() => {
    if (!mobileNav) return undefined;
    const nav = navRef.current;
    const menu = menuRef.current;
    if (!nav) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    nav.querySelector("button")?.focus();
    function handleNavigationKey(event) {
      if (event.key === "Escape") setMobileNav(false);
      if (event.key !== "Tab") return;
      const items = [
        ...nav.querySelectorAll("a[href], button:not(:disabled)"),
      ].filter((item) => item.getClientRects().length > 0);
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    const media = window.matchMedia("(max-width: 820px)");
    const closeOnDesktop = () => {
      if (!media.matches) setMobileNav(false);
    };
    media.addEventListener("change", closeOnDesktop);
    nav.addEventListener("keydown", handleNavigationKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      nav.removeEventListener("keydown", handleNavigationKey);
      media.removeEventListener("change", closeOnDesktop);
      menu?.focus();
    };
  }, [mobileNav]);

  useEffect(() => {
    function handleShortcut(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  const visibleDeals = useMemo(() => {
    const term = query.trim().toLowerCase();
    return workspace.deals.filter((deal) => {
      const matchesRisk = riskFilter === "All" || riskFor(deal) === riskFilter;
      const matchesTerm =
        !term ||
        `${deal.company} ${deal.contact} ${deal.stage} ${deal.owner}`
          .toLowerCase()
          .includes(term);
      return matchesRisk && matchesTerm;
    });
  }, [query, riskFilter, workspace.deals]);

  function addOpportunity(item) {
    if (workspace.deals.length >= MAX_DEALS) {
      toast(
        `Este espacio de evaluación admite hasta ${MAX_DEALS} oportunidades.`,
      );
      return false;
    }
    workspace.setDeals((current) => [item, ...current]);
    workspace.addActivity(
      `${item.company} se creó en ${stageLabel(item.stage).toLowerCase()}`,
    );
    toast("Oportunidad ficticia creada");
    return true;
  }

  function advanceDeal(id) {
    const target = workspace.deals.find((deal) => deal.id === id);
    if (!target || target.stage === "Won") return;
    const stageIndex = STAGES.indexOf(target.stage);
    const nextStage = STAGES[Math.min(STAGES.length - 1, stageIndex + 1)];
    workspace.setDeals((current) =>
      current.map((deal) =>
        deal.id === id
          ? {
              ...deal,
              stage: nextStage,
              daysIdle: 0,
              probability:
                nextStage === "Won" ? 100 : Math.min(95, deal.probability + 12),
            }
          : deal,
      ),
    );
    workspace.addActivity(
      `${target.company} avanzó a ${stageLabel(nextStage).toLowerCase()}`,
    );
    toast(`${target.company} → ${stageLabel(nextStage)}`);
  }

  function toggleAutomation(id) {
    workspace.setAutomations((current) =>
      current.map((automation) =>
        automation.id === id
          ? {
              ...automation,
              enabled: !automation.enabled,
              runs: automation.runs + (!automation.enabled ? 1 : 0),
            }
          : automation,
      ),
    );
    toast("Simulación de automatización actualizada");
  }

  function resetWorkspace() {
    if (
      !window.confirm(
        "¿Restablecer este espacio privado a la base ficticia de NovaFlow?",
      )
    )
      return;
    workspace.resetWorkspace();
    toast("Espacio ficticio restablecido");
  }

  if (!isLoaded || !workspace.hydrated) {
    return (
      <main className={styles.loading}>
        <div className={styles.loaderMark}>N</div>
        <p>Preparando tu espacio privado de demo</p>
      </main>
    );
  }

  const userName = user?.firstName || user?.username || "evaluador";
  const userLabel =
    user?.fullName ||
    user?.primaryEmailAddress?.emailAddress ||
    "Evaluador autenticado";
  const userInitials = initials(
    user?.fullName || user?.primaryEmailAddress?.emailAddress || "NovaFlow",
  );

  return (
    <main className={styles.appShell} lang="es">
      {notice && (
        <div className={styles.toast} role="status" aria-live="polite">
          <Icon name="check" size={15} />
          {notice}
        </div>
      )}
      {mobileNav && (
        <button
          type="button"
          className={styles.navBackdrop}
          onClick={() => setMobileNav(false)}
          aria-label="Cerrar navegación"
          tabIndex={-1}
        />
      )}
      <aside
        ref={navRef}
        id="workspace-navigation"
        className={`${styles.sidebar} ${mobileNav ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.sideTop}>
          <Link href="/" className={styles.brand}>
            <span>N</span>
            <b>NovaFlow</b>
            <em>DEMO</em>
          </Link>
          <button
            type="button"
            className={styles.mobileClose}
            onClick={() => setMobileNav(false)}
            aria-label="Cerrar navegación"
          >
            <Icon name="close" />
          </button>
        </div>
        <div className={styles.workspacePicker}>
          <span className={styles.workspaceAvatar}>KS</span>
          <div>
            <b>KAVIRO Studio</b>
            <small>Espacio conceptual de ingresos</small>
          </div>
        </div>
        <nav className={styles.nav} aria-label="Navegación del espacio">
          <span className={styles.navLabel}>ESPACIO</span>
          {navItems.map(([key, label, icon]) => (
            <button
              type="button"
              key={key}
              onClick={() => {
                setActiveView(key);
                setMobileNav(false);
              }}
              className={activeView === key ? styles.navActive : ""}
              aria-current={activeView === key ? "page" : undefined}
            >
              <Icon name={icon} />
              <span>{label}</span>
              {key === "Automations" && (
                <i>
                  {
                    workspace.automations.filter(
                      (automation) => automation.enabled,
                    ).length
                  }
                </i>
              )}
            </button>
          ))}
        </nav>
        <div className={styles.sideBottom}>
          <div className={styles.upgrade}>
            <div>
              <Icon name="shield" size={16} />
            </div>
            <b>Entorno de evaluación</b>
            <p>
              Todos los nombres de empresas, personas y valores de oportunidades
              son ficticios.
            </p>
            <span>Demo conceptual técnica</span>
          </div>
          <div className={styles.profile}>
            <span className={styles.avatar}>{userInitials}</span>
            <div>
              <b>{userLabel}</b>
              <small>Autenticado con Clerk</small>
            </div>
            <button
              type="button"
              onClick={() => signOut({ redirectUrl: "/" })}
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              <Icon name="logout" />
            </button>
          </div>
        </div>
      </aside>

      <section className={styles.mainArea}>
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button
              type="button"
              className={styles.menuButton}
              ref={menuRef}
              onClick={() => setMobileNav(true)}
              aria-label="Abrir navegación"
              aria-controls="workspace-navigation"
              aria-expanded={mobileNav}
            >
              <Icon name="menu" />
            </button>
            <div>
              <span className={styles.breadcrumb}>
                Espacio / {viewLabel(activeView)}
              </span>
              <h1>{viewLabel(activeView)}</h1>
            </div>
          </div>
          <div className={styles.topActions}>
            <span
              className={`${styles.syncPill} ${styles[`sync${workspace.sync.state}`]}`}
            >
              <Icon
                name={workspace.sync.state === "saved" ? "cloud" : "refresh"}
                size={13}
              />
              {workspace.sync.label}
            </span>
            <label className={styles.globalSearch}>
              <Icon name="search" size={16} />
              <span className={styles.srOnly}>Buscar en el espacio</span>
              <input
                ref={searchRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  if (event.target.value) setActiveView("Pipeline");
                }}
                placeholder="Buscar en el espacio"
              />
              <kbd>⌘ K</kbd>
            </label>
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => toast("No hay nuevas alertas de demo")}
              aria-label="Ver notificaciones"
            >
              <Icon name="bell" />
            </button>
            <button
              type="button"
              className={styles.addButton}
              onClick={() => setModalOpen(true)}
            >
              <Icon name="plus" size={16} /> Nueva oportunidad
            </button>
          </div>
        </header>

        <div className={styles.content}>
          {activeView === "Overview" && (
            <Overview
              metrics={workspace.metrics}
              deals={workspace.deals}
              stageTotals={workspace.stageTotals}
              activity={workspace.activity}
              forecastSource={workspace.forecastSource}
              userName={userName}
              onOpenPipeline={() => setActiveView("Pipeline")}
              onAdvance={advanceDeal}
            />
          )}
          {activeView === "Pipeline" && (
            <Pipeline
              deals={visibleDeals}
              riskFilter={riskFilter}
              setRiskFilter={setRiskFilter}
              onAdvance={advanceDeal}
            />
          )}
          {activeView === "Automations" && (
            <Automations
              items={workspace.automations}
              toggle={toggleAutomation}
            />
          )}
          {activeView === "Reports" && (
            <Reports
              deals={workspace.deals}
              stageTotals={workspace.stageTotals}
            />
          )}
          {activeView === "Team" && <Team deals={workspace.deals} />}
          {activeView === "Settings" && (
            <Settings
              preferences={workspace.preferences}
              setPreferences={workspace.setPreferences}
              sync={workspace.sync}
              onReset={resetWorkspace}
            />
          )}
        </div>
      </section>

      <NewOpportunityModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={addOpportunity}
      />
    </main>
  );
}
