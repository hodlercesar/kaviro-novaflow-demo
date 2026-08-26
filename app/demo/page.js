'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './demo.module.css';

const initialDeals = [
  { id: 1, company: 'Northstar Labs', owner: 'KM', stage: 'Proposal', value: 42000, daysIdle: 5, probability: 62, contact: 'Maya Chen', next: 'Review security terms' },
  { id: 2, company: 'Monarch Systems', owner: 'AR', stage: 'Negotiation', value: 18000, daysIdle: 1, probability: 78, contact: 'Theo Grant', next: 'Finalize commercial terms' },
  { id: 3, company: 'Kepler Works', owner: 'KM', stage: 'Discovery', value: 27000, daysIdle: 8, probability: 35, contact: 'Nina Park', next: 'Confirm technical sponsor' },
  { id: 4, company: 'Atelier Cloud', owner: 'LS', stage: 'Qualified', value: 56000, daysIdle: 2, probability: 48, contact: 'Jon Bell', next: 'Schedule solution workshop' },
  { id: 5, company: 'Cobalt Studio', owner: 'AR', stage: 'Proposal', value: 33000, daysIdle: 3, probability: 66, contact: 'Iris Cole', next: 'Send revised scope' },
];

const stages = ['Discovery', 'Qualified', 'Proposal', 'Negotiation', 'Won'];
const views = ['Overview', 'Pipeline', 'Automations', 'Reports'];
const owners = ['KM', 'AR', 'LS'];
const defaultAutomations = [
  { id: 'stale', name: 'Stale-deal escalation', description: 'Flag opportunities idle for 7+ days and move them into the decision queue.', enabled: true, runs: 14 },
  { id: 'probability', name: 'Stage probability sync', description: 'Raise win probability when a deal advances while keeping the forecast consistent.', enabled: true, runs: 9 },
  { id: 'followup', name: 'Follow-up reminder', description: 'Surface a reminder when the next action has not changed after a stage transition.', enabled: false, runs: 4 },
];

function riskFor(deal) {
  if (deal.daysIdle >= 7 || deal.probability < 40) return 'High';
  if (deal.daysIdle >= 4 || deal.probability < 60) return 'Medium';
  return 'Low';
}

function money(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value || 0);
}

function shortTime(date = new Date()) {
  return new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit' }).format(date);
}

function localMetrics(deals) {
  const pipeline = deals.filter(d => d.stage !== 'Won').reduce((sum, d) => sum + d.value, 0);
  const weighted = deals.filter(d => d.stage !== 'Won').reduce((sum, d) => sum + d.value * (d.probability / 100), 0);
  const atRisk = deals.filter(d => d.stage !== 'Won' && riskFor(d) === 'High').length;
  const winPotential = deals.filter(d => ['Proposal', 'Negotiation'].includes(d.stage)).reduce((sum, d) => sum + d.value, 0);
  return { pipeline, weighted, atRisk, winPotential };
}

export default function DemoPage() {
  const [authenticated, setAuthenticated] = useState(null);
  const [email, setEmail] = useState('demo@kaviro.studio');
  const [password, setPassword] = useState('kaviro-demo');
  const [loginError, setLoginError] = useState('');
  const [loginBusy, setLoginBusy] = useState(false);
  const [activeView, setActiveView] = useState('Overview');
  const [deals, setDeals] = useState(initialDeals);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('risk');
  const [query, setQuery] = useState('');
  const [rates, setRates] = useState(null);
  const [fxError, setFxError] = useState(false);
  const [notice, setNotice] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const [serverMetrics, setServerMetrics] = useState(null);
  const [serverError, setServerError] = useState(false);
  const [automations, setAutomations] = useState(defaultAutomations);
  const [activity, setActivity] = useState([
    { id: 1, text: 'Workspace initialized with evaluation dataset', time: 'Demo' },
    { id: 2, text: 'Risk rules calculated across 5 opportunities', time: 'Demo' },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState({ company: '', contact: '', owner: 'KM', stage: 'Discovery', value: '24000', probability: '35', next: '' });

  useEffect(() => {
    fetch('/api/session')
      .then(r => r.json())
      .then(d => setAuthenticated(Boolean(d.authenticated)))
      .catch(() => setAuthenticated(false));
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    try {
      const savedDeals = window.localStorage.getItem('novaflow-deals-v2');
      const savedAutomations = window.localStorage.getItem('novaflow-automations-v2');
      const savedActivity = window.localStorage.getItem('novaflow-activity-v2');
      if (savedDeals) setDeals(JSON.parse(savedDeals));
      if (savedAutomations) setAutomations(JSON.parse(savedAutomations));
      if (savedActivity) setActivity(JSON.parse(savedActivity));
    } catch {
      // Local persistence is an enhancement; the workspace still works without it.
    }
    setHydrated(true);
  }, [authenticated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem('novaflow-deals-v2', JSON.stringify(deals));
    window.localStorage.setItem('novaflow-automations-v2', JSON.stringify(automations));
    window.localStorage.setItem('novaflow-activity-v2', JSON.stringify(activity.slice(0, 20)));
  }, [deals, automations, activity, hydrated]);

  useEffect(() => {
    if (!authenticated) return;
    setFxError(false);
    fetch('/api/exchange')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setRates)
      .catch(() => setFxError(true));
  }, [authenticated]);

  useEffect(() => {
    if (!authenticated || !hydrated) return;
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      setServerError(false);
      fetch('/api/forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deals }),
        signal: controller.signal,
      })
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(setServerMetrics)
        .catch(error => {
          if (error?.name !== 'AbortError') setServerError(true);
        });
    }, 220);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [deals, authenticated, hydrated]);

  const visibleDeals = useMemo(() => {
    let next = filter === 'All' ? [...deals] : deals.filter(deal => riskFor(deal) === filter);
    const term = query.trim().toLowerCase();
    if (term) next = next.filter(deal => `${deal.company} ${deal.contact} ${deal.owner} ${deal.stage}`.toLowerCase().includes(term));
    if (sort === 'value') next.sort((a, b) => b.value - a.value);
    if (sort === 'idle') next.sort((a, b) => b.daysIdle - a.daysIdle);
    if (sort === 'risk') {
      const weight = { High: 3, Medium: 2, Low: 1 };
      next.sort((a, b) => weight[riskFor(b)] - weight[riskFor(a)] || b.value - a.value);
    }
    return next;
  }, [deals, filter, sort, query]);

  const fallbackMetrics = useMemo(() => localMetrics(deals), [deals]);
  const metrics = serverMetrics?.metrics || fallbackMetrics;

  const stageTotals = useMemo(() => stages.map(stage => ({
    stage,
    value: deals.filter(d => d.stage === stage).reduce((sum, d) => sum + d.value, 0),
    count: deals.filter(d => d.stage === stage).length,
  })), [deals]);

  const ownerTotals = useMemo(() => owners.map(owner => ({
    owner,
    value: deals.filter(d => d.owner === owner && d.stage !== 'Won').reduce((sum, d) => sum + d.value, 0),
    weighted: deals.filter(d => d.owner === owner && d.stage !== 'Won').reduce((sum, d) => sum + d.value * d.probability / 100, 0),
  })), [deals]);

  const riskCounts = useMemo(() => ['High', 'Medium', 'Low'].map(risk => ({
    risk,
    count: deals.filter(d => d.stage !== 'Won' && riskFor(d) === risk).length,
  })), [deals]);

  function addActivity(text) {
    setActivity(current => [{ id: Date.now() + Math.random(), text, time: shortTime() }, ...current].slice(0, 20));
  }

  function showNotice(text) {
    setNotice(text);
    window.setTimeout(() => setNotice(''), 2400);
  }

  async function login(event) {
    event.preventDefault();
    setLoginError('');
    setLoginBusy(true);
    try {
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        setLoginError('Invalid demo credentials');
        return;
      }
      setAuthenticated(true);
    } catch {
      setLoginError('Could not reach the session service');
    } finally {
      setLoginBusy(false);
    }
  }

  async function logout() {
    await fetch('/api/session', { method: 'DELETE' });
    setAuthenticated(false);
    setHydrated(false);
  }

  function advanceDeal(id) {
    const target = deals.find(deal => deal.id === id);
    if (!target) return;
    const index = stages.indexOf(target.stage);
    const nextStage = stages[Math.min(index + 1, stages.length - 1)];
    setDeals(current => current.map(deal => deal.id === id ? {
      ...deal,
      stage: nextStage,
      daysIdle: 0,
      probability: nextStage === 'Won' ? 100 : Math.min(95, deal.probability + 12),
      next: nextStage === 'Won' ? 'Handoff to customer success' : deal.next,
    } : deal));
    addActivity(`${target.company} advanced from ${target.stage} to ${nextStage}`);
    showNotice(`${target.company} moved to ${nextStage}`);
  }

  function createOpportunity(event) {
    event.preventDefault();
    const value = Number(draft.value);
    const probability = Number(draft.probability);
    if (!draft.company.trim() || !draft.contact.trim() || !Number.isFinite(value) || value <= 0 || !Number.isFinite(probability)) {
      showNotice('Complete the required opportunity fields');
      return;
    }
    const newDeal = {
      id: Date.now(),
      company: draft.company.trim(),
      contact: draft.contact.trim(),
      owner: draft.owner,
      stage: draft.stage,
      value: Math.round(value),
      daysIdle: 0,
      probability: Math.max(0, Math.min(100, Math.round(probability))),
      next: draft.next.trim() || 'Book discovery follow-up',
    };
    setDeals(current => [newDeal, ...current]);
    addActivity(`${newDeal.company} created at ${newDeal.stage} for ${money(newDeal.value)}`);
    setDraft({ company: '', contact: '', owner: 'KM', stage: 'Discovery', value: '24000', probability: '35', next: '' });
    setModalOpen(false);
    showNotice('Opportunity created');
  }

  function toggleAutomation(id) {
    const rule = automations.find(item => item.id === id);
    setAutomations(current => current.map(item => item.id === id ? { ...item, enabled: !item.enabled, runs: item.runs + (!item.enabled ? 1 : 0) } : item));
    if (rule) addActivity(`${rule.name} ${rule.enabled ? 'paused' : 'enabled'}`);
  }

  function resetWorkspace() {
    setDeals(initialDeals);
    setAutomations(defaultAutomations);
    setActivity([{ id: Date.now(), text: 'Evaluation workspace reset to baseline', time: shortTime() }]);
    setFilter('All');
    setQuery('');
    setSort('risk');
    setActiveView('Overview');
    showNotice('Workspace reset');
  }

  if (authenticated === null) return <main className={styles.loading}>Preparing NovaFlow workspace…</main>;

  if (!authenticated) {
    return (
      <main className={styles.loginShell}>
        <section className={styles.loginStory}>
          <a className={styles.wordmark} href="/"><span>N</span>NovaFlow</a>
          <div>
            <span className={styles.kicker}>KAVIRO Studio · Application Demo</span>
            <h1>A revenue workspace built to show how the product behaves, not just how it looks.</h1>
            <p>Explore interactive business rules, protected server routes, persisted workspace state, automation controls and external market-data integration in one focused workflow.</p>
            <div className={styles.capabilityRow}><span>Persistent state</span><span>Server validation</span><span>Multi-view workspace</span><span>External API</span></div>
          </div>
          <small>Concept project · No real customer data</small>
        </section>
        <section className={styles.loginPanel}>
          <div className={styles.loginCard}>
            <span className={styles.eyebrow}>Demo access</span>
            <h2>Enter the workspace</h2>
            <p>Credentials are prefilled for evaluation.</p>
            <form onSubmit={login}>
              <label>Work email<input value={email} onChange={e => setEmail(e.target.value)} type="email" autoComplete="email" /></label>
              <label>Password<input value={password} onChange={e => setPassword(e.target.value)} type="password" autoComplete="current-password" /></label>
              {loginError && <p className={styles.error}>{loginError}</p>}
              <button type="submit" disabled={loginBusy}>{loginBusy ? 'Checking session…' : 'Open NovaFlow'} <span>→</span></button>
            </form>
            <a href="/">← Return to product page</a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.appShell}>
      {notice && <div className={styles.toast} role="status">{notice}</div>}
      <aside className={styles.sidebar}>
        <a className={styles.brand} href="/"><span>N</span><b>NovaFlow</b></a>
        <div className={styles.workspaceLabel}>Workspace</div>
        <nav>
          {views.map((view, index) => (
            <button key={view} className={activeView === view ? styles.active : ''} onClick={() => setActiveView(view)}>
              <i>0{index + 1}</i><span>{view}</span>
            </button>
          ))}
        </nav>
        <div className={styles.sidebarMeta}><span>KM</span><div><b>Kira Miles</b><small>Revenue lead</small></div></div>
        <button onClick={resetWorkspace} className={styles.reset}>Reset demo</button>
        <button onClick={logout} className={styles.logout}>Sign out</button>
      </aside>

      <section className={styles.workspace}>
        <header className={styles.topbar}>
          <div>
            <span className={styles.eyebrow}>Revenue operations · Interactive demo</span>
            <h1>{activeView === 'Overview' ? 'Pipeline control center' : activeView}</h1>
            <p>{activeView === 'Overview' ? "Prioritize the work most likely to change this month's outcome." : activeView === 'Pipeline' ? 'Move opportunities through a stateful pipeline and watch forecast logic react.' : activeView === 'Automations' ? 'Control operational rules and inspect the resulting activity trail.' : 'Inspect server-verified commercial metrics and portfolio concentration.'}</p>
          </div>
          <div className={styles.headerActions}>
            <div className={`${styles.liveBadge} ${serverError ? styles.degraded : ''}`}><span></span>{serverError ? 'Local fallback active' : serverMetrics ? 'Server verified' : 'Verifying rules…'}</div>
            <button className={styles.primaryAction} onClick={() => setModalOpen(true)}>+ New opportunity</button>
          </div>
        </header>

        {activeView === 'Overview' && <>
          <section className={styles.metrics}>
            <article><span>Open pipeline</span><strong>{money(metrics.pipeline)}</strong><small><b>{deals.filter(d => d.stage !== 'Won').length}</b> open opportunities</small></article>
            <article><span>Weighted forecast</span><strong>{money(Math.round(metrics.weighted))}</strong><small>Probability-adjusted</small></article>
            <article><span>Commit potential</span><strong>{money(metrics.winPotential)}</strong><small>Proposal + negotiation</small></article>
            <article><span>High-risk deals</span><strong>{metrics.atRisk}</strong><small className={metrics.atRisk ? styles.alertText : ''}>Requires attention</small></article>
          </section>

          <section className={styles.insightGrid}>
            <article className={styles.forecastCard}>
              <div className={styles.cardHeader}><div><span className={styles.eyebrow}>Pipeline health</span><h2>Stage distribution</h2></div><span className={styles.period}>Current workspace</span></div>
              <div className={styles.stageChart}>
                {stageTotals.slice(0, 4).map(item => <div className={styles.stageColumn} key={item.stage}>
                  <div className={styles.barTrack}><span style={{ height: `${Math.max(14, Math.round((item.value / Math.max(...stageTotals.map(x => x.value), 1)) * 100))}%` }}></span></div>
                  <b>{money(item.value)}</b><small>{item.stage} · {item.count}</small>
                </div>)}
              </div>
            </article>

            <article className={styles.signalCard}>
              <div className={styles.cardHeader}><div><span className={styles.eyebrow}>External service</span><h2>Market signal</h2></div><span className={styles.signalIcon}>↗</span></div>
              <div className={styles.fxValue}>{rates?.rates?.EUR ? `€${rates.rates.EUR.toFixed(3)}` : '—'}</div>
              <p>USD → EUR reference rate</p>
              <div className={styles.providerState}><span className={fxError ? styles.providerError : styles.providerOk}></span>{fxError ? 'Provider unavailable' : rates ? `Updated ${rates.date}` : 'Fetching provider…'}</div>
            </article>
          </section>

          <DecisionTable deals={visibleDeals} query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} advanceDeal={advanceDeal} />

          <section className={styles.activityGrid}>
            <article className={styles.activityPanel}><div className={styles.cardHeader}><div><span className={styles.eyebrow}>Audit trail</span><h2>Recent workspace activity</h2></div><span className={styles.period}>{activity.length} events</span></div><ActivityList activity={activity.slice(0, 5)} /></article>
            <article className={styles.serverPanel}><span className={styles.eyebrow}>Server boundary</span><h2>Forecast validation</h2><p>The client sends the current opportunity state to a protected route. The server validates the payload and recomputes the commercial metrics independently.</p><div className={styles.serverMeta}><span>POST /api/forecast</span><b>{serverError ? 'Fallback' : serverMetrics ? 'Verified' : 'Pending'}</b></div></article>
          </section>
        </>}

        {activeView === 'Pipeline' && <PipelineBoard deals={visibleDeals} query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} advanceDeal={advanceDeal} />}

        {activeView === 'Automations' && <section className={styles.automationLayout}>
          <div className={styles.automationList}>
            {automations.map(rule => <article className={styles.automationCard} key={rule.id}>
              <div><span className={styles.eyebrow}>Operational rule</span><h2>{rule.name}</h2><p>{rule.description}</p><small>{rule.runs} simulated rule executions</small></div>
              <button className={`${styles.toggle} ${rule.enabled ? styles.toggleOn : ''}`} onClick={() => toggleAutomation(rule.id)} aria-pressed={rule.enabled}><span></span>{rule.enabled ? 'Enabled' : 'Paused'}</button>
            </article>)}
          </div>
          <article className={styles.activityPanel}><div className={styles.cardHeader}><div><span className={styles.eyebrow}>Event stream</span><h2>Rule activity</h2></div></div><ActivityList activity={activity.slice(0, 8)} /></article>
        </section>}

        {activeView === 'Reports' && <section className={styles.reportLayout}>
          <article className={styles.reportCard}><div className={styles.cardHeader}><div><span className={styles.eyebrow}>Portfolio</span><h2>Pipeline by owner</h2></div><span className={styles.period}>Open value</span></div><div className={styles.reportRows}>{ownerTotals.map(item => <div key={item.owner}><span className={styles.ownerBadge}>{item.owner}</span><div><b>{money(item.value)}</b><small>{money(Math.round(item.weighted))} weighted</small></div><i style={{ width: `${Math.max(8, item.value / Math.max(...ownerTotals.map(x => x.value), 1) * 100)}%` }}></i></div>)}</div></article>
          <article className={styles.reportCard}><div className={styles.cardHeader}><div><span className={styles.eyebrow}>Risk model</span><h2>Open risk distribution</h2></div></div><div className={styles.riskReport}>{riskCounts.map(item => <div key={item.risk}><span className={`${styles.risk} ${styles[item.risk.toLowerCase()]}`}>{item.risk}</span><strong>{item.count}</strong><small>opportunities</small></div>)}</div></article>
          <article className={`${styles.reportCard} ${styles.reportWide}`}><div className={styles.cardHeader}><div><span className={styles.eyebrow}>Architecture proof</span><h2>Independent server calculation</h2></div><span className={`${styles.statusChip} ${serverError ? styles.statusBad : ''}`}>{serverError ? 'Degraded' : serverMetrics ? 'Healthy' : 'Checking'}</span></div><div className={styles.architectureGrid}><div><small>Validated records</small><b>{serverMetrics?.meta?.validatedDeals ?? deals.length}</b></div><div><small>Calculation source</small><b>{serverMetrics ? 'Server route' : 'Client fallback'}</b></div><div><small>Last verified</small><b>{serverMetrics?.meta?.calculatedAt ? new Date(serverMetrics.meta.calculatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</b></div><div><small>External FX</small><b>{fxError ? 'Unavailable' : rates ? 'Connected' : 'Loading'}</b></div></div></article>
        </section>}

        <footer className={styles.appFooter}><span>NovaFlow · Concept application by KAVIRO Studio</span><span>Persistent browser state · Protected APIs · No client data</span></footer>
      </section>

      {modalOpen && <div className={styles.modalBackdrop} onMouseDown={event => event.target === event.currentTarget && setModalOpen(false)}>
        <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="new-opportunity-title">
          <div className={styles.modalHead}><div><span className={styles.eyebrow}>Create record</span><h2 id="new-opportunity-title">New opportunity</h2></div><button onClick={() => setModalOpen(false)} aria-label="Close dialog">×</button></div>
          <form onSubmit={createOpportunity}>
            <div className={styles.formGrid}>
              <label>Company<input required value={draft.company} onChange={e => setDraft({ ...draft, company: e.target.value })} placeholder="Acme Systems" /></label>
              <label>Contact<input required value={draft.contact} onChange={e => setDraft({ ...draft, contact: e.target.value })} placeholder="Jordan Lee" /></label>
              <label>Owner<select value={draft.owner} onChange={e => setDraft({ ...draft, owner: e.target.value })}>{owners.map(owner => <option key={owner}>{owner}</option>)}</select></label>
              <label>Stage<select value={draft.stage} onChange={e => setDraft({ ...draft, stage: e.target.value })}>{stages.slice(0, 4).map(stage => <option key={stage}>{stage}</option>)}</select></label>
              <label>Value (USD)<input required min="1" type="number" value={draft.value} onChange={e => setDraft({ ...draft, value: e.target.value })} /></label>
              <label>Probability<input required min="0" max="100" type="number" value={draft.probability} onChange={e => setDraft({ ...draft, probability: e.target.value })} /></label>
            </div>
            <label>Next action<input value={draft.next} onChange={e => setDraft({ ...draft, next: e.target.value })} placeholder="Book technical workshop" /></label>
            <div className={styles.modalActions}><button type="button" onClick={() => setModalOpen(false)}>Cancel</button><button type="submit">Create opportunity →</button></div>
          </form>
        </section>
      </div>}
    </main>
  );
}

function DecisionTable({ deals, query, setQuery, filter, setFilter, sort, setSort, advanceDeal }) {
  return <section className={styles.panel}>
    <div className={styles.panelHead}>
      <div><span className={styles.eyebrow}>Decision queue</span><h2>Opportunities that need action</h2><p>Risk is recalculated from inactivity and win probability.</p></div>
      <div className={styles.controls}>
        <label className={styles.search}><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search pipeline" /></label>
        <select value={filter} onChange={e => setFilter(e.target.value)} aria-label="Filter by risk"><option>All</option><option>High</option><option>Medium</option><option>Low</option></select>
        <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort deals"><option value="risk">Risk first</option><option value="value">Highest value</option><option value="idle">Most idle</option></select>
      </div>
    </div>
    <div className={styles.tableWrap}>
      <table>
        <thead><tr><th>Account</th><th>Stage</th><th>Value</th><th>Next action</th><th>Probability</th><th>Risk</th><th></th></tr></thead>
        <tbody>{deals.map(deal => {
          const risk = riskFor(deal);
          return <tr key={deal.id}>
            <td><div className={styles.accountCell}><span>{deal.company.slice(0, 1)}</span><div><b>{deal.company}</b><small>{deal.contact} · {deal.owner}</small></div></div></td>
            <td><span className={styles.stagePill}>{deal.stage}</span><small className={styles.idle}>{deal.daysIdle}d idle</small></td>
            <td className={styles.valueCell}>{money(deal.value)}</td>
            <td><b className={styles.nextAction}>{deal.next}</b></td>
            <td><div className={styles.probability}><span><i style={{ width: `${deal.probability}%` }}></i></span><b>{deal.probability}%</b></div></td>
            <td><span className={`${styles.risk} ${styles[risk.toLowerCase()]}`}>{risk}</span></td>
            <td><button className={styles.advance} onClick={() => advanceDeal(deal.id)} disabled={deal.stage === 'Won'}>{deal.stage === 'Won' ? 'Won' : 'Advance →'}</button></td>
          </tr>;
        })}</tbody>
      </table>
      {!deals.length && <div className={styles.emptyState}>No opportunities match these filters.</div>}
    </div>
  </section>;
}

function PipelineBoard({ deals, query, setQuery, filter, setFilter, advanceDeal }) {
  return <section className={styles.pipelineSection}>
    <div className={styles.pipelineTools}>
      <label className={styles.search}><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search accounts or contacts" /></label>
      <select value={filter} onChange={e => setFilter(e.target.value)} aria-label="Filter pipeline risk"><option>All</option><option>High</option><option>Medium</option><option>Low</option></select>
    </div>
    <div className={styles.kanban}>
      {stages.map(stage => {
        const stageDeals = deals.filter(deal => deal.stage === stage);
        return <article className={styles.kanbanColumn} key={stage}>
          <header><div><span>{stage}</span><b>{stageDeals.length}</b></div><small>{money(stageDeals.reduce((sum, deal) => sum + deal.value, 0))}</small></header>
          <div className={styles.kanbanStack}>
            {stageDeals.map(deal => <div className={styles.dealCard} key={deal.id}>
              <div className={styles.dealTop}><span className={`${styles.riskDot} ${styles[`dot${riskFor(deal)}`]}`}></span><small>{riskFor(deal)} risk · {deal.daysIdle}d idle</small></div>
              <h3>{deal.company}</h3><p>{deal.contact} · {deal.owner}</p><strong>{money(deal.value)}</strong>
              <div className={styles.cardProgress}><span><i style={{ width: `${deal.probability}%` }}></i></span><b>{deal.probability}%</b></div>
              <small className={styles.cardNext}>{deal.next}</small>
              {stage !== 'Won' && <button onClick={() => advanceDeal(deal.id)}>Advance to {stages[stages.indexOf(stage) + 1]} →</button>}
            </div>)}
            {!stageDeals.length && <div className={styles.emptyColumn}>No matching opportunities</div>}
          </div>
        </article>;
      })}
    </div>
  </section>;
}

function ActivityList({ activity }) {
  return <div className={styles.activityList}>{activity.length ? activity.map(item => <div key={item.id}><span></span><p>{item.text}</p><small>{item.time}</small></div>) : <p className={styles.emptyState}>No activity yet.</p>}</div>;
}
