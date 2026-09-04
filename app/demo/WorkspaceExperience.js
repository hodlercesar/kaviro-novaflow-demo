"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MAX_DEALS, STAGES, riskFor } from "../../lib/novaflow.mjs";
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

const navItems = [
  ["Overview", "grid"],
  ["Pipeline", "pipeline"],
  ["Automations", "bolt"],
  ["Reports", "chart"],
  ["Team", "users"],
  ["Settings", "settings"],
];

export default function WorkspaceExperience({
  workspace,
  viewer,
  ready = true,
  mode = "authenticated",
  onSignOut,
}) {
  const isPreview = mode === "preview";
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
        `This evaluation workspace supports up to ${MAX_DEALS} opportunities.`,
      );
      return false;
    }
    workspace.setDeals((current) => [item, ...current]);
    workspace.addActivity(`${item.company} created in ${item.stage}`);
    toast("Fictional opportunity created");
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
    workspace.addActivity(`${target.company} advanced to ${nextStage}`);
    toast(`${target.company} → ${nextStage}`);
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
    toast("Automation simulation updated");
  }

  function resetWorkspace() {
    if (
      !window.confirm(
        isPreview
          ? "Reset this instant preview to the fictional NovaFlow baseline?"
          : "Reset this private workspace to the fictional NovaFlow baseline?",
      )
    )
      return;
    workspace.resetWorkspace();
    toast("Fictional workspace reset");
  }

  if (!ready || !workspace.hydrated) {
    return (
      <main className={styles.loading}>
        <div className={styles.loaderMark}>N</div>
        <p>
          {isPreview
            ? "Preparing instant evaluation workspace"
            : "Preparing your private demo workspace"}
        </p>
      </main>
    );
  }

  const userName = isPreview
    ? "evaluator"
    : viewer?.firstName || viewer?.username || "there";
  const userLabel = isPreview
    ? "Instant evaluator"
    : viewer?.fullName || viewer?.email || "Signed-in evaluator";
  const userInitials = isPreview
    ? "EV"
    : initials(viewer?.fullName || viewer?.email || "NovaFlow");

  return (
    <main className={styles.appShell}>
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
          aria-label="Dismiss navigation"
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
            aria-label="Close navigation"
          >
            <Icon name="close" />
          </button>
        </div>
        <div className={styles.workspacePicker}>
          <span className={styles.workspaceAvatar}>KS</span>
          <div>
            <b>KAVIRO Studio</b>
            <small>Concept revenue workspace</small>
          </div>
        </div>
        <nav className={styles.nav} aria-label="Workspace navigation">
          <span className={styles.navLabel}>Workspace</span>
          {navItems.map(([label, icon]) => (
            <button
              type="button"
              key={label}
              onClick={() => {
                setActiveView(label);
                setMobileNav(false);
              }}
              className={activeView === label ? styles.navActive : ""}
              aria-current={activeView === label ? "page" : undefined}
            >
              <Icon name={icon} />
              <span>{label}</span>
              {label === "Automations" && (
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
            <b>Evaluation environment</b>
            <p>
              All company names, people and opportunity values are fictional.
            </p>
            <span>Technical concept demo</span>
          </div>
          <div className={styles.profile}>
            <span className={styles.avatar}>{userInitials}</span>
            <div>
              <b>{userLabel}</b>
              <small>
                {isPreview
                  ? "No account · changes are temporary"
                  : "Authenticated with Clerk"}
              </small>
            </div>
            <button
              type="button"
              onClick={() => {
                if (isPreview) {
                  window.location.href = "/sign-in?redirect_url=/demo";
                  return;
                }
                onSignOut?.();
              }}
              aria-label={isPreview ? "Open persistent workspace" : "Sign out"}
              title={isPreview ? "Open persistent workspace" : "Sign out"}
            >
              <Icon name={isPreview ? "arrow" : "logout"} />
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
              aria-label="Open navigation"
              aria-controls="workspace-navigation"
              aria-expanded={mobileNav}
            >
              <Icon name="menu" />
            </button>
            <div>
              <span className={styles.breadcrumb}>
                Workspace / {activeView}
              </span>
              <h1>{activeView}</h1>
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
              <span className={styles.srOnly}>Search workspace</span>
              <input
                ref={searchRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  if (event.target.value) setActiveView("Pipeline");
                }}
                placeholder="Search workspace"
              />
              <kbd>⌘ K</kbd>
            </label>
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => toast("No new demo alerts")}
              aria-label="View notifications"
            >
              <Icon name="bell" />
            </button>
            <button
              type="button"
              className={styles.addButton}
              onClick={() => setModalOpen(true)}
            >
              <Icon name="plus" size={16} /> New opportunity
            </button>
          </div>
        </header>

        <div className={styles.content}>
          {isPreview && (
            <section
              className={styles.previewBanner}
              aria-label="Instant evaluation mode"
            >
              <div>
                <Icon name="shield" size={16} />
                <span>
                  <b>Instant evaluation mode</b>
                  <small>
                    Try the product without an account. Changes stay only in
                    this tab.
                  </small>
                </span>
              </div>
              <Link href="/sign-in?redirect_url=/demo">
                Try persistent workspace <Icon name="arrow" size={14} />
              </Link>
            </section>
          )}
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
              previewMode={isPreview}
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
