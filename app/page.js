const Arrow = () => <span aria-hidden="true">↗</span>;

const features = [
  ['01', 'Stateful pipeline', 'Create, search, filter and advance opportunities across a persistent multi-stage workspace.'],
  ['02', 'Server-verified logic', 'A protected route validates opportunity payloads and independently recalculates forecast and risk metrics.'],
  ['03', 'Operational depth', 'Switch between Pipeline, Automations and Reports while an activity trail records workspace changes.']
];

const metrics = [
  ['4', 'functional workspace views'],
  ['3', 'server route handlers'],
  ['1', 'external API integration']
];

export default function Home() {
  return (
    <main>
      <header className="nav shell">
        <a className="brand" href="#top" aria-label="NovaFlow home"><span className="brandMark">N</span>NovaFlow</a>
        <nav aria-label="Primary navigation">
          <a href="#product">Product</a><a href="#proof">Architecture</a><a href="#process">How it works</a>
        </nav>
        <a className="navCta" href="/demo">Open live app <Arrow /></a>
      </header>

      <section className="hero shell" id="top">
        <div className="eyebrow"><span></span> KAVIRO concept application · SaaS operations</div>
        <h1>Turn scattered sales work into <em>forward motion.</em></h1>
        <p className="heroCopy">NovaFlow is a functional B2B SaaS concept built to demonstrate multi-view product UI, persistent client state, validated server-side business logic, protected routes and external service integration.</p>
        <div className="heroActions"><a className="btn primary" href="/demo">Explore the live workspace <Arrow /></a><a className="btn text" href="#product">See the build approach ↓</a></div>
        <div className="trustRow"><span>Technical scope</span><div></div><strong>Next.js</strong><strong>React</strong><strong>Protected APIs</strong><strong>Persistent state</strong></div>

        <div className="dashboardWrap" aria-label="NovaFlow product preview">
          <div className="dashboardGlow"></div>
          <div className="dashboard">
            <aside className="dashSide">
              <div className="miniLogo">N</div>
              <div className="dashNav active">Overview</div><div className="dashNav">Pipeline</div><div className="dashNav">Automations</div><div className="dashNav">Reports</div>
              <div className="dashProfile"><span>KM</span><div><b>Kira Miles</b><small>Demo persona</small></div></div>
            </aside>
            <div className="dashMain">
              <div className="dashTop"><div><small>INTERACTIVE WORKSPACE</small><h3>Pipeline control center</h3></div><button>+ New opportunity</button></div>
              <div className="statGrid">
                <article><small>OPEN PIPELINE</small><b>$176k</b><span className="up">Persisted state</span></article>
                <article><small>WEIGHTED FORECAST</small><b>$101k</b><span className="up">Server verified</span></article>
                <article><small>HIGH RISK</small><b>1 deal</b><span>Dynamic scoring</span></article>
              </div>
              <div className="dashLower">
                <article className="chartCard"><div className="cardHead"><div><small>PIPELINE DISTRIBUTION</small><h4>Stage value</h4></div><span>Live workspace⌄</span></div><div className="chart"><span className="bar b1"></span><span className="bar b2"></span><span className="bar b3"></span><span className="bar b4"></span><span className="bar b5"></span><span className="bar b6"></span><i className="chartLine"></i></div><div className="months"><span>Disc.</span><span>Qual.</span><span>Prop.</span><span>Neg.</span><span>Won</span><span>FX</span></div></article>
                <article className="activityCard"><div className="cardHead"><div><small>DECISION QUEUE</small><h4>Needs attention</h4></div><b>3</b></div><div className="activity"><span className="dot coral"></span><div><b>Kepler Works</b><small>8 days idle · high risk</small></div><em>$27k</em></div><div className="activity"><span className="dot mint"></span><div><b>Northstar Labs</b><small>Proposal · medium risk</small></div><em>$42k</em></div><div className="activity"><span className="dot sand"></span><div><b>Atelier Cloud</b><small>Qualified · medium risk</small></div><em>$56k</em></div></article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell" id="product">
        <div className="sectionHead"><div><div className="eyebrow"><span></span> Beyond a marketing page</div><h2>A working product surface you can actually evaluate.</h2></div><p>The workspace exposes behavior as well as presentation: persisted state, validated server calculations, multiple product views, failure handling, responsive layout and explicit server/client boundaries.</p></div>
        <div className="featureGrid">{features.map(([n,t,d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><a href="/demo">Test the workflow <Arrow /></a></article>)}</div>
      </section>

      <section className="darkSection" id="proof"><div className="shell proofGrid"><div><div className="eyebrow light"><span></span> Technical evaluation</div><h2>Built so architecture, state and business behavior are visible.</h2><p>The project separates interactive client state from protected server routes. Forecast metrics are recalculated independently on the backend, external FX data is normalized server-side, and the workspace records user-driven state transitions.</p><a className="btn lightBtn" href="/demo">Open application <Arrow /></a></div><div className="metrics">{metrics.map(([v,l]) => <article key={l}><b>{v}</b><span>{l}</span></article>)}</div></div></section>

      <section className="section shell" id="process"><div className="processGrid"><div><div className="eyebrow"><span></span> Application flow</div><h2>From sign-in to operational decision.</h2></div><div className="steps"><article><span>1</span><div><h3>Enter a protected workspace</h3><p>Authenticate through a server route and access application-only services through an HTTP-only session cookie.</p></div></article><article><span>2</span><div><h3>Change real workspace state</h3><p>Create and advance opportunities, switch product views and keep the evaluation state across reloads.</p></div></article><article><span>3</span><div><h3>Verify server boundaries</h3><p>See forecast data independently validated by the backend and external FX data loaded through a protected integration route.</p></div></article></div></div></section>

      <section className="ctaSection shell" id="contact"><div className="ctaCard"><div className="eyebrow light"><span></span> Evaluate the build</div><h2>Open the application, not a mockup.</h2><p>NovaFlow remains a fictional concept project and contains no real customer data, fabricated clients or invented production results.</p><a className="btn lightBtn" href="/demo">Launch live workspace <Arrow /></a><small>Concept application · Built by KAVIRO Studio</small></div></section>

      <footer className="shell footer"><a className="brand" href="#top"><span className="brandMark">N</span>NovaFlow</a><p>Conceptual SaaS application designed and built by KAVIRO Studio for technical evaluation.</p><span>© 2026 Concept project</span></footer>
    </main>
  );
}
