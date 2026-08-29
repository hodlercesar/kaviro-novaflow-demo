import styles from './home.module.css';

function Icon({ name }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  if (name === 'dashboard') return <svg {...common}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="4" rx="1.5"/><rect x="14" y="11" width="7" height="10" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>;
  if (name === 'pipeline') return <svg {...common}><path d="M4 6h6"/><path d="M14 6h6"/><path d="M10 6l2 2 2-2"/><path d="M6 10v8"/><path d="M18 10v8"/><rect x="3" y="17" width="6" height="4" rx="1"/><rect x="15" y="17" width="6" height="4" rx="1"/></svg>;
  if (name === 'zap') return <svg {...common}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>;
  if (name === 'chart') return <svg {...common}><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/></svg>;
  if (name === 'lock') return <svg {...common}><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>;
  if (name === 'database') return <svg {...common}><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>;
  if (name === 'api') return <svg {...common}><path d="M8 9l-4 3 4 3"/><path d="M16 9l4 3-4 3"/><path d="M14 5l-4 14"/></svg>;
  if (name === 'users') return <svg {...common}><circle cx="9" cy="8" r="3"/><path d="M3 20c.4-3.7 2.4-6 6-6s5.6 2.3 6 6"/><path d="M16 5.5a3 3 0 0 1 0 5"/><path d="M17.5 14c2.3.6 3.3 2.5 3.5 5"/></svg>;
  if (name === 'arrow') return <svg {...common}><path d="M5 12h14"/><path d="M14 7l5 5-5 5"/></svg>;
  return null;
}

const capabilities = [
  { icon: 'pipeline', title: 'Pipeline control', copy: 'Create, search, prioritize and advance opportunities through an operational multi-stage workspace.' },
  { icon: 'zap', title: 'Automations', copy: 'Toggle workflow rules, track execution behavior and surface follow-ups inside the same product surface.' },
  { icon: 'chart', title: 'Forecasting & reports', copy: 'Server-verified metrics, weighted pipeline logic and visual reporting for faster business decisions.' },
  { icon: 'dashboard', title: 'Responsive product UI', copy: 'A premium application shell designed to feel deliberate on desktop, tablet and mobile—not just a mockup.' },
];

const architecture = [
  { icon: 'lock', title: 'Protected application routes', copy: 'Authenticated workspace boundaries and protected application services.', badge: 'Auth' },
  { icon: 'database', title: 'Persistent workspace state', copy: 'Product state survives reloads while the architecture remains ready for deeper database persistence.', badge: 'State' },
  { icon: 'api', title: 'Server-side business logic', copy: 'Forecast and risk calculations are independently validated beyond the client interface.', badge: 'API' },
  { icon: 'users', title: 'SaaS-ready product model', copy: 'Structured around users, workspaces, pipeline data, roles and future multi-tenant growth.', badge: 'Scale' },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={`${styles.nav} ${styles.shell}`}>
        <a className={styles.brand} href="#top" aria-label="NovaFlow home"><span className={styles.brandMark}>N</span>NovaFlow</a>
        <nav className={styles.navLinks} aria-label="Primary navigation"><a href="#product">Product</a><a href="#architecture">Architecture</a><a href="#build">Build</a></nav>
        <div className={styles.navActions}><a className={styles.ghostBtn} href="#product">See capabilities</a><a className={styles.solidBtn} href="/demo">Open workspace <Icon name="arrow" /></a></div>
      </header>

      <section className={styles.hero} id="top">
        <div className={`${styles.heroGrid} ${styles.shell}`}>
          <div>
            <div className={styles.eyebrow}><span className={styles.eyebrowDot}></span>KAVIRO concept SaaS · live application</div>
            <h1>Revenue operations, <span>without the chaos.</span></h1>
            <p className={styles.heroCopy}>NovaFlow is a functional SaaS product concept that turns pipeline activity, automation and forecasting into one focused operating workspace—built to demonstrate real product thinking, not only visual design.</p>
            <div className={styles.heroActions}><a className={styles.primaryCta} href="/demo">Explore live workspace <Icon name="arrow" /></a><a className={styles.secondaryCta} href="#product">See what is inside</a></div>
            <div className={styles.proofLine}><span><i></i>Protected workspace</span><span><i></i>Interactive state</span><span><i></i>Server logic</span><span><i></i>Responsive UI</span></div>
          </div>

          <div className={styles.previewWrap} aria-label="NovaFlow dashboard preview">
            <div className={styles.previewGlow}></div>
            <div className={styles.browser}>
              <div className={styles.browserTop}><i></i><i></i><i></i><div className={styles.urlBar}>app.novaflow.demo / workspace / overview</div></div>
              <div className={styles.appFrame}>
                <aside className={styles.side}>
                  <div className={styles.sideBrand}><span className={styles.miniMark}>N</span>NovaFlow</div>
                  <div className={styles.sideLabel}>Workspace</div>
                  <div className={`${styles.sideItem} ${styles.sideActive}`}><Icon name="dashboard"/>Overview</div>
                  <div className={styles.sideItem}><Icon name="pipeline"/>Pipeline</div>
                  <div className={styles.sideItem}><Icon name="zap"/>Automations</div>
                  <div className={styles.sideItem}><Icon name="chart"/>Reports</div>
                  <div className={styles.sideFooter}><div className={styles.userRow}><span className={styles.avatar}>KM</span><div className={styles.userText}><b>Kira Miles</b><span>Revenue lead · demo</span></div></div></div>
                </aside>
                <div className={styles.appMain}>
                  <div className={styles.appTop}><div><small>REVENUE WORKSPACE</small><h3>Overview</h3></div><button className={styles.newBtn}>＋ New opportunity</button></div>
                  <div className={styles.kpis}>
                    <article className={styles.kpi}><small>OPEN PIPELINE</small><b>$176k</b><span className={styles.positive}>↑ 12.8% this cycle</span></article>
                    <article className={styles.kpi}><small>WEIGHTED FORECAST</small><b>$101k</b><span className={styles.positive}>Server verified</span></article>
                    <article className={styles.kpi}><small>AT RISK</small><b>1 deal</b><span>Dynamic scoring</span></article>
                    <article className={styles.kpi}><small>WIN POTENTIAL</small><b>$93k</b><span>Proposal + negotiation</span></article>
                  </div>
                  <div className={styles.mainCards}>
                    <article className={styles.panel}><div className={styles.panelHead}><div><small>PIPELINE DISTRIBUTION</small><b>Stage value</b></div><span>Live workspace</span></div><div className={styles.bars}><i></i><i></i><i></i><i></i><i></i></div><div className={styles.barLabels}><span>Discovery</span><span>Qualified</span><span>Proposal</span><span>Negotiation</span><span>Won</span></div></article>
                    <article className={styles.panel}><div className={styles.panelHead}><div><small>DECISION QUEUE</small><b>Needs attention</b></div><span>3 items</span></div><div className={styles.queue}><div className={styles.queueItem}><span className={styles.queueDot}></span><div><b>Kepler Works</b><span>8 days idle · high risk</span></div><em>$27k</em></div><div className={styles.queueItem}><span className={styles.queueDot}></span><div><b>Northstar Labs</b><span>Proposal · medium risk</span></div><em>$42k</em></div><div className={styles.queueItem}><span className={styles.queueDot}></span><div><b>Atelier Cloud</b><span>Qualified · stable</span></div><em>$56k</em></div></div></article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.techStrip}><div className={`${styles.techInner} ${styles.shell}`}><span>Technical scope</span><b>Next.js</b><b>React</b><b>Protected APIs</b><b>Server validation</b><b>Responsive UI</b><b>Persistent state</b></div></div>

      <section className={styles.section} id="product"><div className={styles.shell}>
        <div className={styles.sectionHead}><div><div className={styles.sectionKicker}>Product surface</div><h2>Looks premium. Behaves like a product.</h2></div><p>The goal is not to fake a giant company. It is to show how KAVIRO approaches a modern SaaS build: clear hierarchy, deliberate interaction, operational depth and enough technical behavior to evaluate the work seriously.</p></div>
        <div className={styles.featureGrid}>{capabilities.map(item => <article className={styles.featureCard} key={item.title}><div className={styles.iconBox}><Icon name={item.icon}/></div><h3>{item.title}</h3><p>{item.copy}</p><a href="/demo">Open in workspace <Icon name="arrow" /></a></article>)}</div>
      </div></section>

      <section className={styles.architecture} id="architecture"><div className={`${styles.archGrid} ${styles.shell}`}>
        <div className={styles.archCopy}><div className={styles.sectionKicker}>Under the interface</div><h2>A demo with visible technical depth.</h2><p>NovaFlow remains a fictional concept project, but the implementation is intentionally structured around the same concerns real SaaS products face: route protection, state, business rules, data boundaries and scalable product structure.</p><div className={styles.heroActions}><a className={styles.primaryCta} href="/demo">Test the application <Icon name="arrow" /></a></div></div>
        <div className={styles.archList}>{architecture.map(item => <article className={styles.archItem} key={item.title}><div className={styles.archItemIcon}><Icon name={item.icon}/></div><div><b>{item.title}</b><span>{item.copy}</span></div><span className={styles.archBadge}>{item.badge}</span></article>)}</div>
      </div></section>

      <section className={styles.ctaSection} id="build"><div className={`${styles.ctaCard} ${styles.shell}`}><div className={styles.eyebrow}><span className={styles.eyebrowDot}></span>Built by KAVIRO Studio</div><h2>Open the application. Judge the work yourself.</h2><p>No invented production numbers, no fake customer claims and no hidden mockup-only flow. NovaFlow is a conceptual SaaS application designed as a live technical portfolio piece.</p><a className={styles.primaryCta} href="/demo">Launch NovaFlow <Icon name="arrow" /></a><div className={styles.ctaMeta}>Concept project · Fictional evaluation data · 2026</div></div></section>

      <footer className={styles.footer}><div className={`${styles.footerInner} ${styles.shell}`}><a className={styles.footerBrand} href="#top"><span>N</span>NovaFlow</a><p>Conceptual SaaS application designed and built by KAVIRO Studio for product and technical evaluation.</p><span>© 2026 KAVIRO Studio</span></div></footer>
    </main>
  );
}
