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

function riskFor(deal) {
  if (deal.daysIdle >= 7 || deal.probability < 40) return 'High';
  if (deal.daysIdle >= 4 || deal.probability < 60) return 'Medium';
  return 'Low';
}

function money(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

export default function DemoPage() {
  const [authenticated, setAuthenticated] = useState(null);
  const [email, setEmail] = useState('demo@kaviro.studio');
  const [password, setPassword] = useState('kaviro-demo');
  const [loginError, setLoginError] = useState('');
  const [deals, setDeals] = useState(initialDeals);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('risk');
  const [query, setQuery] = useState('');
  const [rates, setRates] = useState(null);
  const [fxError, setFxError] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    fetch('/api/session').then(r => r.json()).then(d => setAuthenticated(Boolean(d.authenticated))).catch(() => setAuthenticated(false));
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    fetch('/api/exchange')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setRates)
      .catch(() => setFxError(true));
  }, [authenticated]);

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

  const metrics = useMemo(() => {
    const pipeline = deals.reduce((sum, d) => sum + d.value, 0);
    const weighted = deals.reduce((sum, d) => sum + d.value * (d.probability / 100), 0);
    const atRisk = deals.filter(d => riskFor(d) === 'High').length;
    const winPotential = deals.filter(d => ['Proposal', 'Negotiation'].includes(d.stage)).reduce((sum, d) => sum + d.value, 0);
    return { pipeline, weighted, atRisk, winPotential };
  }, [deals]);

  const stageTotals = useMemo(() => stages.slice(0, 4).map(stage => ({
    stage,
    value: deals.filter(d => d.stage === stage).reduce((sum, d) => sum + d.value, 0),
  })), [deals]);

  async function login(event) {
    event.preventDefault();
    setLoginError('');
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
  }

  async function logout() {
    await fetch('/api/session', { method: 'DELETE' });
    setAuthenticated(false);
  }

  function advanceDeal(id) {
    const target = deals.find(deal => deal.id === id);
    setDeals(current => current.map(deal => {
      if (deal.id !== id) return deal;
      const index = stages.indexOf(deal.stage);
      const nextStage = stages[Math.min(index + 1, stages.length - 1)];
      return { ...deal, stage: nextStage, daysIdle: 0, probability: Math.min(100, deal.probability + 12) };
    }));
    if (target) {
      const nextStage = stages[Math.min(stages.indexOf(target.stage) + 1, stages.length - 1)];
      setNotice(`${target.company} moved to ${nextStage}`);
      window.setTimeout(() => setNotice(''), 2400);
    }
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
            <p>Explore business rules, interactive state, a server-side session route and external market-data integration in one focused workflow.</p>
            <div className={styles.capabilityRow}><span>Interactive state</span><span>Server routes</span><span>External API</span></div>
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
              <button type="submit">Open NovaFlow <span>→</span></button>
            </form>
            <a href="/">← Return to product page</a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.appShell}>
      {notice && <div className={styles.toast}>{notice}</div>}
      <aside className={styles.sidebar}>
        <a className={styles.brand} href="/"><span>N</span><b>NovaFlow</b></a>
        <div className={styles.workspaceLabel}>Workspace</div>
        <nav>
          <a className={styles.active}><i>01</i><span>Overview</span></a>
          <a><i>02</i><span>Pipeline</span></a>
          <a><i>03</i><span>Automations</span></a>
          <a><i>04</i><span>Reports</span></a>
        </nav>
        <div className={styles.sidebarMeta}><span>KM</span><div><b>Kira Miles</b><small>Revenue lead</small></div></div>
        <button onClick={logout} className={styles.logout}>Sign out</button>
      </aside>

      <section className={styles.workspace}>
        <header className={styles.topbar}>
          <div>
            <span className={styles.eyebrow}>Monday · Revenue operations</span>
            <h1>Pipeline control center</h1>
            <p>Prioritize the work most likely to change this month&apos;s outcome.</p>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.liveBadge}><span></span> Rules engine active</div>
            <button className={styles.primaryAction}>+ New opportunity</button>
          </div>
        </header>

        <section className={styles.metrics}>
          <article><span>Open pipeline</span><strong>{money(metrics.pipeline)}</strong><small><b>+12.4%</b> from last period</small></article>
          <article><span>Weighted forecast</span><strong>{money(Math.round(metrics.weighted))}</strong><small>Probability-adjusted</small></article>
          <article><span>Commit potential</span><strong>{money(metrics.winPotential)}</strong><small>Proposal + negotiation</small></article>
          <article><span>High-risk deals</span><strong>{metrics.atRisk}</strong><small className={metrics.atRisk ? styles.alertText : ''}>Requires attention</small></article>
        </section>

        <section className={styles.insightGrid}>
          <article className={styles.forecastCard}>
            <div className={styles.cardHeader}><div><span className={styles.eyebrow}>Pipeline health</span><h2>Stage distribution</h2></div><span className={styles.period}>Current quarter</span></div>
            <div className={styles.stageChart}>
              {stageTotals.map((item, index) => <div className={styles.stageColumn} key={item.stage}>
                <div className={styles.barTrack}><span style={{ height: `${Math.max(14, Math.round((item.value / Math.max(...stageTotals.map(x => x.value), 1)) * 100))}%` }}></span></div>
                <b>{money(item.value)}</b><small>{item.stage}</small>
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

        <section className={styles.panel}>
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
              <tbody>{visibleDeals.map(deal => {
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
            {!visibleDeals.length && <div className={styles.emptyState}>No opportunities match these filters.</div>}
          </div>
        </section>

        <section className={styles.notes}>
          <article><span className={styles.noteNumber}>01</span><div><span className={styles.eyebrow}>Business logic</span><h3>Risk scoring reacts immediately</h3><p>Advancing an opportunity resets inactivity, raises probability and recalculates weighted forecast and risk without a page refresh.</p></div></article>
          <article><span className={styles.noteNumber}>02</span><div><span className={styles.eyebrow}>Integration boundary</span><h3>External data stays server-side</h3><p>The client requests a Next.js route, which handles the third-party FX provider and exposes a controlled response to the interface.</p></div></article>
        </section>
        <footer className={styles.appFooter}><span>NovaFlow · Concept application by KAVIRO Studio</span><span>Built for technical evaluation · No client data</span></footer>
      </section>
    </main>
  );
}
