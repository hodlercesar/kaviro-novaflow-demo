const Arrow = () => <span aria-hidden="true">↗</span>;

const features = [
  ['01', 'Pipeline clarity', 'See every opportunity, blocker and next action in one focused revenue workspace.'],
  ['02', 'Smart automations', 'Remove repetitive handoffs with lightweight workflows your team can understand and control.'],
  ['03', 'Decision-ready reporting', 'Turn activity into useful signals with dashboards built around the questions leaders actually ask.']
];

const metrics = [
  ['31%', 'faster handoffs'],
  ['2.4×', 'clearer pipeline'],
  ['8.2h', 'saved / rep / month']
];

export default function Home() {
  return (
    <main>
      <header className="nav shell">
        <a className="brand" href="#top" aria-label="NovaFlow home"><span className="brandMark">N</span>NovaFlow</a>
        <nav aria-label="Primary navigation">
          <a href="#product">Product</a><a href="#proof">Results</a><a href="#process">How it works</a>
        </nav>
        <a className="navCta" href="#contact">Book a walkthrough <Arrow /></a>
      </header>

      <section className="hero shell" id="top">
        <div className="eyebrow"><span></span> Revenue operations without the noise</div>
        <h1>Turn scattered sales work into <em>forward motion.</em></h1>
        <p className="heroCopy">NovaFlow gives growing B2B teams one calm place to manage pipeline, automate handoffs and make revenue decisions with confidence.</p>
        <div className="heroActions"><a className="btn primary" href="#contact">Start with your workflow <Arrow /></a><a className="btn text" href="#product">Explore the product ↓</a></div>
        <div className="trustRow"><span>Built for focused teams</span><div></div><strong>Northstar</strong><strong>Atelier</strong><strong>Monarch</strong><strong>Kepler</strong></div>

        <div className="dashboardWrap" aria-label="NovaFlow product preview">
          <div className="dashboardGlow"></div>
          <div className="dashboard">
            <aside className="dashSide">
              <div className="miniLogo">N</div>
              <div className="dashNav active">Overview</div><div className="dashNav">Pipeline</div><div className="dashNav">Automations</div><div className="dashNav">Reports</div>
              <div className="dashProfile"><span>KM</span><div><b>Kira Miles</b><small>Revenue lead</small></div></div>
            </aside>
            <div className="dashMain">
              <div className="dashTop"><div><small>MONDAY, 24 AUG</small><h3>Good morning, Kira.</h3></div><button>+ New opportunity</button></div>
              <div className="statGrid">
                <article><small>OPEN PIPELINE</small><b>$428.6k</b><span className="up">↑ 12.4%</span></article>
                <article><small>WIN RATE</small><b>34.8%</b><span className="up">↑ 4.1%</span></article>
                <article><small>AVG. CYCLE</small><b>22 days</b><span>↓ 3 days</span></article>
              </div>
              <div className="dashLower">
                <article className="chartCard"><div className="cardHead"><div><small>PIPELINE MOMENTUM</small><h4>Revenue forecast</h4></div><span>Last 6 months⌄</span></div><div className="chart"><span className="bar b1"></span><span className="bar b2"></span><span className="bar b3"></span><span className="bar b4"></span><span className="bar b5"></span><span className="bar b6"></span><i className="chartLine"></i></div><div className="months"><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span></div></article>
                <article className="activityCard"><div className="cardHead"><div><small>PRIORITY</small><h4>Needs attention</h4></div><b>4</b></div><div className="activity"><span className="dot coral"></span><div><b>Northstar renewal</b><small>No activity in 5 days</small></div><em>$42k</em></div><div className="activity"><span className="dot mint"></span><div><b>Monarch expansion</b><small>Proposal viewed 2h ago</small></div><em>$18k</em></div><div className="activity"><span className="dot sand"></span><div><b>Kepler onboarding</b><small>Handoff waiting</small></div><em>$27k</em></div></article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell" id="product">
        <div className="sectionHead"><div><div className="eyebrow"><span></span> Designed around momentum</div><h2>Less admin. More signal.</h2></div><p>NovaFlow keeps the essentials visible and pushes everything else out of the way, so teams spend less time maintaining systems and more time moving deals forward.</p></div>
        <div className="featureGrid">{features.map(([n,t,d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><a href="#contact">See the workflow <Arrow /></a></article>)}</div>
      </section>

      <section className="darkSection" id="proof"><div className="shell proofGrid"><div><div className="eyebrow light"><span></span> Outcomes over activity</div><h2>Built to make good work easier to repeat.</h2><p>One operating layer for the moments where revenue teams usually lose context, speed or ownership.</p><a className="btn lightBtn" href="#contact">See NovaFlow in action <Arrow /></a></div><div className="metrics">{metrics.map(([v,l]) => <article key={v}><b>{v}</b><span>{l}</span></article>)}</div></div></section>

      <section className="section shell" id="process"><div className="processGrid"><div><div className="eyebrow"><span></span> From messy to manageable</div><h2>Your process, made visible.</h2></div><div className="steps"><article><span>1</span><div><h3>Connect the work</h3><p>Bring your pipeline and key handoffs into one clear operating view.</p></div></article><article><span>2</span><div><h3>Define what matters</h3><p>Set lightweight rules, ownership and automations around the moments that slow revenue down.</p></div></article><article><span>3</span><div><h3>Improve from signal</h3><p>Use focused reporting to see what is working, what is blocked and what deserves attention next.</p></div></article></div></div></section>

      <section className="ctaSection shell" id="contact"><div className="ctaCard"><div className="eyebrow light"><span></span> Ready when your team is</div><h2>Make your revenue process feel lighter.</h2><p>Start with one workflow. See the difference in how your team moves.</p><a className="btn lightBtn" href="mailto:hello@example.com">Book a walkthrough <Arrow /></a><small>Concept demo — no real product or customer data.</small></div></section>

      <footer className="shell footer"><a className="brand" href="#top"><span className="brandMark">N</span>NovaFlow</a><p>Conceptual SaaS landing page designed & built by KAVIRO Studio for frontend demonstration purposes.</p><span>© 2026 Concept project</span></footer>
    </main>
  );
}
