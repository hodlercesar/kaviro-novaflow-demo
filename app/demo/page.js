'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './demo.module.css';

const seedDeals = [
  { id: 1, company: 'Northstar Labs', contact: 'Maya Chen', owner: 'KM', stage: 'Proposal', value: 42000, probability: 62, daysIdle: 5, next: 'Review security terms' },
  { id: 2, company: 'Monarch Systems', contact: 'Theo Grant', owner: 'AR', stage: 'Negotiation', value: 18000, probability: 78, daysIdle: 1, next: 'Finalize commercial terms' },
  { id: 3, company: 'Kepler Works', contact: 'Nina Park', owner: 'KM', stage: 'Discovery', value: 27000, probability: 35, daysIdle: 8, next: 'Confirm technical sponsor' },
  { id: 4, company: 'Atelier Cloud', contact: 'Jon Bell', owner: 'LS', stage: 'Qualified', value: 56000, probability: 48, daysIdle: 2, next: 'Schedule solution workshop' },
  { id: 5, company: 'Cobalt Studio', contact: 'Iris Cole', owner: 'AR', stage: 'Proposal', value: 33000, probability: 66, daysIdle: 3, next: 'Send revised scope' },
  { id: 6, company: 'Orbit Commerce', contact: 'Sofia Reed', owner: 'LS', stage: 'Won', value: 24000, probability: 100, daysIdle: 0, next: 'Customer success handoff' },
];

const navItems = [
  ['Overview', 'grid'], ['Pipeline', 'pipeline'], ['Automations', 'bolt'], ['Reports', 'chart'], ['Team', 'users'], ['Settings', 'settings'],
];
const stages = ['Discovery', 'Qualified', 'Proposal', 'Negotiation', 'Won'];
const owners = ['KM', 'AR', 'LS'];
const seedAutomations = [
  { id: 'stale', name: 'Stale deal escalation', detail: 'Flag opportunities idle for 7+ days and surface them in the priority queue.', enabled: true, runs: 14 },
  { id: 'probability', name: 'Probability sync', detail: 'Update forecast confidence automatically when an opportunity changes stage.', enabled: true, runs: 9 },
  { id: 'followup', name: 'Follow-up reminder', detail: 'Create a reminder when a next step has not changed after a stage transition.', enabled: false, runs: 4 },
];

function Icon({ name, size = 18 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
    pipeline: <><path d="M4 5h16M7 12h10M10 19h4"/><circle cx="4" cy="5" r="1"/><circle cx="7" cy="12" r="1"/><circle cx="10" cy="19" r="1"/></>,
    bolt: <path d="M13 2 4.5 13H11l-1 9 8.5-11H12l1-9Z"/>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06-2.12 2.12-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V20h-3v-.09A1.65 1.65 0 0 0 10.75 18.4a1.65 1.65 0 0 0-1.82.33l-.06.06-2.12-2.12.06-.06A1.65 1.65 0 0 0 7.14 15a1.65 1.65 0 0 0-1.51-1H5.5v-3h.13a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06L8.87 6l.06.06a1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1-1.51V4.8h3v.08a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06 2.12 2.12-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21v3h-.13a1.65 1.65 0 0 0-1.47 1Z"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5"/>,
    bell: <><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    trend: <><path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/></>,
    target: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3"/><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
    check: <path d="m5 12 4 4L19 6"/>,
    shield: <><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></>,
  };
  return <svg {...common}>{paths[name] || paths.grid}</svg>;
}

function money(value) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value || 0); }
function riskFor(deal) { if (deal.daysIdle >= 7 || deal.probability < 40) return 'High'; if (deal.daysIdle >= 4 || deal.probability < 60) return 'Medium'; return 'Low'; }
function initials(name) { return name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase(); }

function Sparkline({ points = '2,24 14,16 26,20 38,9 50,12 62,4' }) {
  return <svg className={styles.sparkline} viewBox="0 0 64 28" preserveAspectRatio="none"><polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke"/><path d={`M${points.replaceAll(' ', ' L')} L62,28 L2,28 Z`} opacity=".09" fill="currentColor" stroke="none"/></svg>;
}

export default function DemoPage() {
  const [authenticated, setAuthenticated] = useState(null);
  const [email, setEmail] = useState('demo@kaviro.studio');
  const [password, setPassword] = useState('kaviro-demo');
  const [loginError, setLoginError] = useState('');
  const [activeView, setActiveView] = useState('Overview');
  const [mobileNav, setMobileNav] = useState(false);
  const [deals, setDeals] = useState(seedDeals);
  const [automations, setAutomations] = useState(seedAutomations);
  const [activity, setActivity] = useState([
    { id: 1, text: 'Forecast recalculated across active opportunities', time: '2m' },
    { id: 2, text: 'Northstar Labs moved into proposal review', time: '18m' },
    { id: 3, text: 'Stale-deal automation flagged Kepler Works', time: '41m' },
  ]);
  const [query, setQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [serverMetrics, setServerMetrics] = useState(null);
  const [draft, setDraft] = useState({ company: '', contact: '', owner: 'KM', stage: 'Discovery', value: '24000', probability: '35', next: '' });

  useEffect(() => {
    fetch('/api/session').then(r => r.json()).then(d => setAuthenticated(Boolean(d.authenticated))).catch(() => setAuthenticated(false));
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    try {
      const saved = window.localStorage.getItem('novaflow-premium-v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.deals) setDeals(parsed.deals);
        if (parsed.automations) setAutomations(parsed.automations);
        if (parsed.activity) setActivity(parsed.activity);
      }
    } catch {}
  }, [authenticated]);

  useEffect(() => {
    if (!authenticated) return;
    try { window.localStorage.setItem('novaflow-premium-v1', JSON.stringify({ deals, automations, activity: activity.slice(0, 20) })); } catch {}
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      fetch('/api/forecast', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ deals }), signal: controller.signal })
        .then(r => r.ok ? r.json() : Promise.reject()).then(d => setServerMetrics(d.metrics || null)).catch(() => {});
    }, 250);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [deals, automations, activity, authenticated]);

  const metrics = useMemo(() => {
    const open = deals.filter(d => d.stage !== 'Won');
    const local = {
      pipeline: open.reduce((sum, d) => sum + d.value, 0),
      weighted: open.reduce((sum, d) => sum + d.value * d.probability / 100, 0),
      atRisk: open.filter(d => riskFor(d) === 'High').length,
      winPotential: open.filter(d => ['Proposal', 'Negotiation'].includes(d.stage)).reduce((sum, d) => sum + d.value, 0),
    };
    return { ...local, ...(serverMetrics || {}) };
  }, [deals, serverMetrics]);

  const visibleDeals = useMemo(() => {
    const term = query.trim().toLowerCase();
    return deals.filter(d => (riskFilter === 'All' || riskFor(d) === riskFilter) && (!term || `${d.company} ${d.contact} ${d.stage} ${d.owner}`.toLowerCase().includes(term)));
  }, [deals, query, riskFilter]);

  const stageTotals = useMemo(() => stages.map(stage => ({ stage, value: deals.filter(d => d.stage === stage).reduce((s, d) => s + d.value, 0), count: deals.filter(d => d.stage === stage).length })), [deals]);
  const maxStage = Math.max(...stageTotals.map(s => s.value), 1);

  function toast(text) { setNotice(text); window.setTimeout(() => setNotice(''), 2200); }
  function addActivity(text) { setActivity(current => [{ id: Date.now(), text, time: 'now' }, ...current].slice(0, 20)); }

  async function login(event) {
    event.preventDefault(); setLoginError('');
    try {
      const response = await fetch('/api/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      if (!response.ok) return setLoginError('Invalid demo credentials');
      setAuthenticated(true);
    } catch { setLoginError('Could not reach the session service'); }
  }

  async function logout() { try { await fetch('/api/session', { method: 'DELETE' }); } catch {} setAuthenticated(false); }

  function createOpportunity(event) {
    event.preventDefault();
    const value = Number(draft.value), probability = Number(draft.probability);
    if (!draft.company.trim() || !draft.contact.trim() || value <= 0 || Number.isNaN(value)) return toast('Complete the required fields');
    const item = { id: Date.now(), company: draft.company.trim(), contact: draft.contact.trim(), owner: draft.owner, stage: draft.stage, value: Math.round(value), probability: Math.max(0, Math.min(100, Math.round(probability || 0))), daysIdle: 0, next: draft.next.trim() || 'Book discovery follow-up' };
    setDeals(current => [item, ...current]); addActivity(`${item.company} created in ${item.stage}`); setModalOpen(false); toast('Opportunity created');
    setDraft({ company: '', contact: '', owner: 'KM', stage: 'Discovery', value: '24000', probability: '35', next: '' });
  }

  function advanceDeal(id) {
    const target = deals.find(d => d.id === id); if (!target) return;
    const index = stages.indexOf(target.stage); const next = stages[Math.min(stages.length - 1, index + 1)];
    setDeals(current => current.map(d => d.id === id ? { ...d, stage: next, daysIdle: 0, probability: next === 'Won' ? 100 : Math.min(95, d.probability + 12) } : d));
    addActivity(`${target.company} advanced to ${next}`); toast(`${target.company} → ${next}`);
  }

  function toggleAutomation(id) { setAutomations(current => current.map(a => a.id === id ? { ...a, enabled: !a.enabled, runs: a.runs + (!a.enabled ? 1 : 0) } : a)); toast('Automation updated'); }

  if (authenticated === null) return <main className={styles.loading}><div className={styles.loaderMark}>N</div><p>Preparing NovaFlow workspace</p></main>;

  if (!authenticated) return (
    <main className={styles.loginShell}>
      <section className={styles.loginStory}>
        <a href="/" className={styles.loginBrand}><span>N</span>NovaFlow</a>
        <div className={styles.loginCopy}><div className={styles.pill}><span/> KAVIRO Studio · Product demo</div><h1>Revenue operations,<br/>without the noise.</h1><p>A polished SaaS concept for managing pipeline, forecasting risk and automating the small decisions that slow teams down.</p><div className={styles.loginProof}><div><Icon name="shield"/><span><b>Protected session</b><small>Server-validated demo access</small></span></div><div><Icon name="bolt"/><span><b>Workflow automation</b><small>Interactive operational rules</small></span></div><div><Icon name="chart"/><span><b>Live forecasting</b><small>Metrics respond to every change</small></span></div></div></div>
        <footer>Concept application · Built by KAVIRO Studio · No real customer data</footer>
      </section>
      <section className={styles.loginPanel}><div className={styles.loginCard}><div className={styles.loginCardTop}><span className={styles.miniLogo}>N</span><span>NovaFlow Workspace</span></div><h2>Welcome back</h2><p>Use the prefilled evaluation account to explore the product.</p><form onSubmit={login}><label>Email address<input value={email} onChange={e => setEmail(e.target.value)} type="email" /></label><label>Password<input value={password} onChange={e => setPassword(e.target.value)} type="password" /></label>{loginError && <div className={styles.formError}>{loginError}</div>}<button className={styles.primaryButton} type="submit">Open workspace <Icon name="arrow"/></button></form><div className={styles.demoHint}><span>Demo credentials are already filled in</span><Icon name="check" size={15}/></div><a href="/" className={styles.backLink}>← Back to NovaFlow</a></div></section>
    </main>
  );

  return (
    <main className={styles.appShell}>
      {notice && <div className={styles.toast}><Icon name="check" size={15}/>{notice}</div>}
      <aside className={`${styles.sidebar} ${mobileNav ? styles.sidebarOpen : ''}`}>
        <div className={styles.sideTop}><a href="/" className={styles.brand}><span>N</span><b>NovaFlow</b><em>PRO</em></a><button className={styles.mobileClose} onClick={() => setMobileNav(false)}><Icon name="close"/></button></div>
        <div className={styles.workspacePicker}><span className={styles.workspaceAvatar}>KS</span><div><b>KAVIRO Studio</b><small>Revenue workspace</small></div><Icon name="chevron" size={14}/></div>
        <nav className={styles.nav}><span className={styles.navLabel}>Workspace</span>{navItems.map(([label, icon]) => <button key={label} onClick={() => { setActiveView(label); setMobileNav(false); }} className={activeView === label ? styles.navActive : ''}><Icon name={icon}/><span>{label}</span>{label === 'Automations' && <i>3</i>}</button>)}</nav>
        <div className={styles.sideBottom}><div className={styles.upgrade}><div><Icon name="bolt" size={16}/></div><b>NovaFlow Pro</b><p>Evaluation workspace with premium features enabled.</p><span>Demo environment</span></div><div className={styles.profile}><span className={styles.avatar}>KM</span><div><b>Kira Miles</b><small>Revenue lead</small></div><button onClick={logout} title="Sign out"><Icon name="logout"/></button></div></div>
      </aside>

      <section className={styles.mainArea}>
        <header className={styles.topbar}><div className={styles.topbarLeft}><button className={styles.menuButton} onClick={() => setMobileNav(true)}><Icon name="menu"/></button><div><span className={styles.breadcrumb}>Workspace / {activeView}</span><h1>{activeView}</h1></div></div><div className={styles.topActions}><label className={styles.globalSearch}><Icon name="search" size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search workspace"/><kbd>⌘ K</kbd></label><button className={styles.iconButton}><Icon name="bell"/></button><button className={styles.addButton} onClick={() => setModalOpen(true)}><Icon name="plus" size={16}/> New opportunity</button></div></header>

        <div className={styles.content}>
          {activeView === 'Overview' && <Overview metrics={metrics} deals={deals} stageTotals={stageTotals} maxStage={maxStage} activity={activity} onOpenPipeline={() => setActiveView('Pipeline')} onAdvance={advanceDeal}/>} 
          {activeView === 'Pipeline' && <Pipeline deals={visibleDeals} riskFilter={riskFilter} setRiskFilter={setRiskFilter} onAdvance={advanceDeal}/>} 
          {activeView === 'Automations' && <Automations items={automations} toggle={toggleAutomation}/>} 
          {activeView === 'Reports' && <Reports deals={deals} stageTotals={stageTotals} maxStage={maxStage}/>} 
          {activeView === 'Team' && <Team deals={deals}/>} 
          {activeView === 'Settings' && <Settings/>}
        </div>
      </section>

      {modalOpen && <div className={styles.modalBackdrop} onMouseDown={e => { if (e.target === e.currentTarget) setModalOpen(false); }}><div className={styles.modal}><div className={styles.modalHeader}><div><span className={styles.eyebrow}>Pipeline</span><h2>Create opportunity</h2><p>Add a qualified revenue opportunity to the workspace.</p></div><button onClick={() => setModalOpen(false)}><Icon name="close"/></button></div><form onSubmit={createOpportunity} className={styles.modalForm}><div className={styles.fieldGrid}><label>Company<input value={draft.company} onChange={e => setDraft({ ...draft, company: e.target.value })} placeholder="Acme Inc."/></label><label>Contact<input value={draft.contact} onChange={e => setDraft({ ...draft, contact: e.target.value })} placeholder="Jordan Lee"/></label><label>Owner<select value={draft.owner} onChange={e => setDraft({ ...draft, owner: e.target.value })}>{owners.map(o => <option key={o}>{o}</option>)}</select></label><label>Stage<select value={draft.stage} onChange={e => setDraft({ ...draft, stage: e.target.value })}>{stages.map(s => <option key={s}>{s}</option>)}</select></label><label>Deal value<input type="number" value={draft.value} onChange={e => setDraft({ ...draft, value: e.target.value })}/></label><label>Probability %<input type="number" min="0" max="100" value={draft.probability} onChange={e => setDraft({ ...draft, probability: e.target.value })}/></label></div><label>Next action<input value={draft.next} onChange={e => setDraft({ ...draft, next: e.target.value })} placeholder="Book technical discovery"/></label><div className={styles.modalActions}><button type="button" className={styles.secondaryButton} onClick={() => setModalOpen(false)}>Cancel</button><button type="submit" className={styles.primaryButton}>Create opportunity <Icon name="arrow"/></button></div></form></div></div>}
    </main>
  );
}

function Overview({ metrics, deals, stageTotals, maxStage, activity, onOpenPipeline, onAdvance }) {
  const priority = [...deals].filter(d => d.stage !== 'Won').sort((a, b) => (riskFor(a) === 'High' ? -1 : 1) || b.value - a.value).slice(0, 4);
  return <>
    <section className={styles.heroRow}><div><span className={styles.eyebrow}>Friday, Aug 28 · Live workspace</span><h2>Good evening, Kira.</h2><p>Your pipeline is healthy. Two opportunities need attention before the next forecast review.</p></div><div className={styles.healthBadge}><span className={styles.healthRing}>82</span><div><b>Pipeline health</b><small>+6 points this week</small></div></div></section>
    <section className={styles.kpiGrid}><Metric icon="pipeline" label="Open pipeline" value={money(metrics.pipeline)} delta="+12.4%" subtitle="vs. previous period" points="2,22 13,18 24,20 36,11 49,14 62,6"/><Metric icon="target" label="Weighted forecast" value={money(metrics.weighted)} delta="+8.1%" subtitle="probability adjusted" points="2,23 14,20 26,12 38,15 50,8 62,5"/><Metric icon="trend" label="Late-stage value" value={money(metrics.winPotential)} delta="4 deals" subtitle="proposal + negotiation" points="2,21 14,15 26,17 38,12 50,9 62,9"/><Metric icon="clock" label="Deals at risk" value={String(metrics.atRisk)} delta={metrics.atRisk ? 'Needs review' : 'All clear'} subtitle="based on age + confidence" danger={Boolean(metrics.atRisk)} points="2,8 14,10 26,8 38,19 50,15 62,20"/></section>
    <section className={styles.dashboardGrid}><div className={styles.panelLarge}><PanelHead title="Revenue pipeline" caption="Value by stage" action="View pipeline" onClick={onOpenPipeline}/><div className={styles.stageChart}>{stageTotals.map(s => <div key={s.stage} className={styles.stageRow}><div className={styles.stageName}><span>{s.stage}</span><small>{s.count} {s.count === 1 ? 'deal' : 'deals'}</small></div><div className={styles.barTrack}><span style={{ width: `${Math.max(4, s.value / maxStage * 100)}%` }}/></div><b>{money(s.value)}</b></div>)}</div><div className={styles.chartFooter}><div><span>Conversion to proposal</span><b>48.2%</b></div><div><span>Average deal size</span><b>{money(deals.reduce((s,d)=>s+d.value,0)/deals.length)}</b></div><div><span>Sales cycle</span><b>31 days</b></div></div></div><div className={styles.panel}><PanelHead title="Activity" caption="Latest workspace events"/><div className={styles.activityList}>{activity.slice(0, 5).map((item, i) => <div key={item.id}><span className={styles.activityDot}>{i === 0 ? <Icon name="bolt" size={12}/> : ''}</span><p>{item.text}<small>{item.time}</small></p></div>)}</div></div></section>
    <section className={styles.panel}><PanelHead title="Priority opportunities" caption="Ranked by risk, value and next action" action="Open pipeline" onClick={onOpenPipeline}/><div className={styles.opportunityTable}><div className={styles.tableHead}><span>Account</span><span>Stage</span><span>Value</span><span>Risk</span><span>Next step</span><span/></div>{priority.map(d => <DealRow key={d.id} deal={d} onAdvance={onAdvance}/>)}</div></section>
  </>;
}

function Metric({ icon, label, value, delta, subtitle, points, danger }) { return <article className={`${styles.metricCard} ${danger ? styles.metricDanger : ''}`}><div className={styles.metricTop}><span className={styles.metricIcon}><Icon name={icon}/></span><span className={styles.metricDelta}>{delta}</span></div><span className={styles.metricLabel}>{label}</span><strong>{value}</strong><div className={styles.metricBottom}><small>{subtitle}</small><Sparkline points={points}/></div></article>; }
function PanelHead({ title, caption, action, onClick }) { return <div className={styles.panelHead}><div><h3>{title}</h3><p>{caption}</p></div>{action && <button onClick={onClick}>{action}<Icon name="arrow" size={14}/></button>}</div>; }

function Pipeline({ deals, riskFilter, setRiskFilter, onAdvance }) { return <section className={styles.panel}><div className={styles.pipelineHeader}><div><h2>Opportunity pipeline</h2><p>Track active deals, risk and momentum across the revenue cycle.</p></div><div className={styles.filterTabs}>{['All','High','Medium','Low'].map(r => <button key={r} className={riskFilter === r ? styles.filterActive : ''} onClick={() => setRiskFilter(r)}>{r}</button>)}</div></div><div className={styles.opportunityTable}><div className={styles.tableHead}><span>Account</span><span>Stage</span><span>Value</span><span>Risk</span><span>Next step</span><span/></div>{deals.map(d => <DealRow key={d.id} deal={d} onAdvance={onAdvance}/>)}</div>{deals.length === 0 && <div className={styles.emptyState}><Icon name="search" size={28}/><h3>No opportunities found</h3><p>Try a different search term or risk filter.</p></div>}</section>; }

function DealRow({ deal, onAdvance }) { const risk = riskFor(deal); return <div className={styles.dealRow}><div className={styles.accountCell}><span className={styles.companyLogo}>{initials(deal.company)}</span><div><b>{deal.company}</b><small>{deal.contact} · {deal.owner}</small></div></div><span className={styles.stagePill}>{deal.stage}</span><div className={styles.valueCell}><b>{money(deal.value)}</b><small>{deal.probability}% weighted</small></div><span className={`${styles.riskPill} ${styles[`risk${risk}`]}`}><i/>{risk}</span><div className={styles.nextCell}><b>{deal.next}</b><small>{deal.daysIdle === 0 ? 'Updated today' : `${deal.daysIdle}d since update`}</small></div><button className={styles.rowAction} onClick={() => onAdvance(deal.id)} disabled={deal.stage === 'Won'} title="Advance stage">{deal.stage === 'Won' ? <Icon name="check"/> : <Icon name="chevron"/>}</button></div>; }

function Automations({ items, toggle }) { return <><section className={styles.sectionIntro}><span className={styles.eyebrow}>Workflow engine</span><h2>Automate the repetitive parts.</h2><p>Rules react to pipeline behavior and keep the team focused on decisions that need a human.</p></section><div className={styles.automationGrid}>{items.map(item => <article key={item.id} className={styles.automationCard}><div className={styles.automationIcon}><Icon name="bolt"/></div><div className={styles.automationBody}><div><span className={styles.automationStatus}>{item.enabled ? 'Active' : 'Paused'}</span><h3>{item.name}</h3><p>{item.detail}</p></div><div className={styles.automationFoot}><span><b>{item.runs}</b> runs this month</span><button onClick={() => toggle(item.id)} className={`${styles.toggle} ${item.enabled ? styles.toggleOn : ''}`} aria-label={`Toggle ${item.name}`}><i/></button></div></div></article>)}</div><section className={styles.panel}><PanelHead title="Automation performance" caption="Estimated manual work removed this month"/><div className={styles.performanceRow}><div><b>27</b><span>rule executions</span></div><div><b>5.4h</b><span>time saved</span></div><div><b>96%</b><span>successful runs</span></div><div><b>3</b><span>active workflows</span></div></div></section></>; }

function Reports({ deals, stageTotals, maxStage }) { const won = deals.filter(d => d.stage === 'Won').reduce((s,d)=>s+d.value,0); return <><section className={styles.sectionIntro}><span className={styles.eyebrow}>Revenue intelligence</span><h2>Forecast with context.</h2><p>A compact view of conversion, value concentration and pipeline quality.</p></section><div className={styles.reportGrid}><div className={styles.panelLarge}><PanelHead title="Pipeline distribution" caption="Total value across each sales stage"/><div className={styles.bigBars}>{stageTotals.map(s => <div key={s.stage}><div><span>{s.stage}</span><b>{money(s.value)}</b></div><div><i style={{ width: `${Math.max(3, s.value/maxStage*100)}%` }}/></div></div>)}</div></div><div className={styles.panel}><PanelHead title="Forecast summary" caption="Current evaluation period"/><div className={styles.forecastSummary}><div><span>Closed won</span><b>{money(won)}</b></div><div><span>Open value</span><b>{money(deals.filter(d=>d.stage!=='Won').reduce((s,d)=>s+d.value,0))}</b></div><div><span>Avg probability</span><b>{Math.round(deals.reduce((s,d)=>s+d.probability,0)/deals.length)}%</b></div><div><span>At-risk value</span><b>{money(deals.filter(d=>riskFor(d)==='High').reduce((s,d)=>s+d.value,0))}</b></div></div></div></div></>; }

function Team({ deals }) { const team = [{ id:'KM', name:'Kira Miles', role:'Revenue Lead' },{ id:'AR', name:'Alex Rowan', role:'Account Executive' },{ id:'LS', name:'Lena Shaw', role:'Solutions Lead' }]; return <><section className={styles.sectionIntro}><span className={styles.eyebrow}>Workspace members</span><h2>One pipeline, clear ownership.</h2><p>Performance and responsibility stay visible without turning the workspace into a leaderboard.</p></section><div className={styles.teamGrid}>{team.map(member => { const mine = deals.filter(d=>d.owner===member.id && d.stage!=='Won'); return <article key={member.id} className={styles.memberCard}><div className={styles.memberTop}><span className={styles.memberAvatar}>{member.id}</span><button><Icon name="more"/></button></div><h3>{member.name}</h3><p>{member.role}</p><div className={styles.memberStats}><div><b>{mine.length}</b><span>open deals</span></div><div><b>{money(mine.reduce((s,d)=>s+d.value,0))}</b><span>pipeline</span></div></div><div className={styles.memberFooter}><span className={styles.onlineDot}/> Active in workspace</div></article> })}</div></>; }

function Settings() { const [toggles, setToggles] = useState({ weekly:true, risk:true, activity:false }); return <><section className={styles.sectionIntro}><span className={styles.eyebrow}>Workspace controls</span><h2>Settings that stay out of the way.</h2><p>Configure notifications and evaluation behavior for this conceptual workspace.</p></section><section className={styles.panel}><div className={styles.settingsGroup}><h3>Notifications</h3><p>Choose which operational changes are surfaced to workspace members.</p>{[['weekly','Weekly forecast digest','A concise summary of pipeline movement every Monday.'],['risk','Risk alerts','Surface high-risk opportunities when age or confidence crosses a threshold.'],['activity','Activity summaries','Bundle low-priority workspace events into a daily digest.']].map(([id,title,desc]) => <div className={styles.settingRow} key={id}><div><b>{title}</b><span>{desc}</span></div><button onClick={() => setToggles(t => ({...t,[id]:!t[id]}))} className={`${styles.toggle} ${toggles[id] ? styles.toggleOn : ''}`}><i/></button></div>)}</div></section><section className={styles.panel}><div className={styles.settingsGroup}><h3>Demo environment</h3><p>NovaFlow is a conceptual technical demonstration. Data in this environment is fictional and stored locally for evaluation.</p><div className={styles.securityNote}><Icon name="shield"/><div><b>Evaluation-safe workspace</b><span>No real customer records are included in this demo.</span></div></div></div></section></>; }
