'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './demo.module.css';

const initialDeals = [
  { id: 1, company: 'Northstar Labs', owner: 'KM', stage: 'Proposal', value: 42000, daysIdle: 5, probability: 62 },
  { id: 2, company: 'Monarch Systems', owner: 'AR', stage: 'Negotiation', value: 18000, daysIdle: 1, probability: 78 },
  { id: 3, company: 'Kepler Works', owner: 'KM', stage: 'Discovery', value: 27000, daysIdle: 8, probability: 35 },
  { id: 4, company: 'Atelier Cloud', owner: 'LS', stage: 'Qualified', value: 56000, daysIdle: 2, probability: 48 },
];

function riskFor(deal) {
  if (deal.daysIdle >= 7 || deal.probability < 40) return 'High';
  if (deal.daysIdle >= 4 || deal.probability < 60) return 'Medium';
  return 'Low';
}

export default function DemoPage() {
  const [authenticated, setAuthenticated] = useState(null);
  const [email, setEmail] = useState('demo@kaviro.studio');
  const [password, setPassword] = useState('kaviro-demo');
  const [loginError, setLoginError] = useState('');
  const [deals, setDeals] = useState(initialDeals);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('risk');
  const [rates, setRates] = useState(null);
  const [fxError, setFxError] = useState(false);

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
    if (sort === 'value') next.sort((a, b) => b.value - a.value);
    if (sort === 'idle') next.sort((a, b) => b.daysIdle - a.daysIdle);
    if (sort === 'risk') {
      const weight = { High: 3, Medium: 2, Low: 1 };
      next.sort((a, b) => weight[riskFor(b)] - weight[riskFor(a)] || b.value - a.value);
    }
    return next;
  }, [deals, filter, sort]);

  const metrics = useMemo(() => {
    const pipeline = deals.reduce((sum, d) => sum + d.value, 0);
    const weighted = deals.reduce((sum, d) => sum + d.value * (d.probability / 100), 0);
    const atRisk = deals.filter(d => riskFor(d) === 'High').length;
    return { pipeline, weighted, atRisk };
  }, [deals]);

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
    const stages = ['Discovery', 'Qualified', 'Proposal', 'Negotiation', 'Won'];
    setDeals(current => current.map(deal => {
      if (deal.id !== id) return deal;
      const index = stages.indexOf(deal.stage);
      const nextStage = stages[Math.min(index + 1, stages.length - 1)];
      return { ...deal, stage: nextStage, daysIdle: 0, probability: Math.min(100, deal.probability + 12) };
    }));
  }

  if (authenticated === null) return <main className={styles.loading}>Loading workspace…</main>;

  if (!authenticated) {
    return (
      <main className={styles.loginShell}>
        <section className={styles.loginCard}>
          <div className={styles.logo}>N</div>
          <span className={styles.eyebrow}>NovaFlow Operations Demo</span>
          <h1>Sign in to the workspace</h1>
          <p>This is a conceptual KAVIRO Studio project. Demo credentials are prefilled.</p>
          <form onSubmit={login}>
            <label>Email<input value={email} onChange={e => setEmail(e.target.value)} type="email" /></label>
            <label>Password<input value={password} onChange={e => setPassword(e.target.value)} type="password" /></label>
            {loginError && <p className={styles.error}>{loginError}</p>}
            <button type="submit">Enter demo workspace</button>
          </form>
          <a href="/">← Back to landing page</a>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.appShell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}><span>N</span><b>NovaFlow</b></div>
        <nav><a className={styles.active}>Overview</a><a>Pipeline</a><a>Automations</a><a>Reports</a></nav>
        <button onClick={logout} className={styles.logout}>Sign out</button>
      </aside>

      <section className={styles.workspace}>
        <header className={styles.topbar}>
          <div><span className={styles.eyebrow}>Revenue operations</span><h1>Pipeline control center</h1></div>
          <div className={styles.liveBadge}>● Live business rules</div>
        </header>

        <section className={styles.metrics}>
          <article><span>Open pipeline</span><strong>${metrics.pipeline.toLocaleString()}</strong><small>4 active opportunities</small></article>
          <article><span>Weighted forecast</span><strong>${Math.round(metrics.weighted).toLocaleString()}</strong><small>Probability-adjusted</small></article>
          <article><span>High-risk deals</span><strong>{metrics.atRisk}</strong><small>Requires attention</small></article>
          <article><span>External FX data</span><strong>{rates?.rates?.EUR ? `€${rates.rates.EUR.toFixed(3)}` : '—'}</strong><small>{fxError ? 'Provider unavailable' : rates ? `USD → EUR · ${rates.date}` : 'Fetching provider…'}</small></article>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <div><span className={styles.eyebrow}>Decision queue</span><h2>Opportunities that need action</h2></div>
            <div className={styles.controls}>
              <select value={filter} onChange={e => setFilter(e.target.value)} aria-label="Filter by risk">
                <option>All</option><option>High</option><option>Medium</option><option>Low</option>
              </select>
              <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort deals">
                <option value="risk">Sort: risk</option><option value="value">Sort: value</option><option value="idle">Sort: idle days</option>
              </select>
            </div>
          </div>

          <div className={styles.tableWrap}>
            <table>
              <thead><tr><th>Company</th><th>Stage</th><th>Value</th><th>Idle</th><th>Probability</th><th>Risk</th><th></th></tr></thead>
              <tbody>{visibleDeals.map(deal => {
                const risk = riskFor(deal);
                return <tr key={deal.id}>
                  <td><b>{deal.company}</b><small>Owner {deal.owner}</small></td>
                  <td>{deal.stage}</td><td>${deal.value.toLocaleString()}</td><td>{deal.daysIdle}d</td><td>{deal.probability}%</td>
                  <td><span className={`${styles.risk} ${styles[risk.toLowerCase()]}`}>{risk}</span></td>
                  <td><button onClick={() => advanceDeal(deal.id)} disabled={deal.stage === 'Won'}>{deal.stage === 'Won' ? 'Won' : 'Advance'}</button></td>
                </tr>;
              })}</tbody>
            </table>
          </div>
        </section>

        <section className={styles.notes}>
          <article><span className={styles.eyebrow}>Business logic</span><h3>Risk scoring</h3><p>Risk changes from deal inactivity and win probability. Advancing a deal resets inactivity and raises its probability, immediately recalculating the forecast.</p></article>
          <article><span className={styles.eyebrow}>External service</span><h3>Market data integration</h3><p>The FX card is loaded through a server-side Next.js route that fetches a third-party API and handles provider failures separately from the client UI.</p></article>
        </section>
      </section>
    </main>
  );
}
