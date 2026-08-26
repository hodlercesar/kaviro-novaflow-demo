# NovaFlow — KAVIRO Studio Functional SaaS Demo

NovaFlow is a conceptual B2B revenue-operations application created by **KAVIRO Studio** as a public engineering demonstration.

**Production:** https://kaviro-novaflow-demo.vercel.app  
**Interactive workspace:** `/demo`

> NovaFlow is a fictional product. It is not presented as client work and contains no real customer data or fabricated results.

## What this project demonstrates

- Responsive product UI across landing and application views
- Next.js App Router architecture
- Four functional workspace views: Overview, Pipeline, Automations and Reports
- Client-side state transitions with browser persistence for the evaluation workspace
- Opportunity creation, filtering, searching, sorting and stage advancement
- Business rules for risk scoring and probability-weighted forecasting
- Protected Next.js route handlers behind an HTTP-only demo session cookie
- Independent server-side validation and forecast recomputation through `/api/forecast`
- External FX integration through `/api/exchange`
- Explicit loading, validation, provider-failure and local-fallback states
- Activity/audit trail for user-driven workspace changes
- Responsive desktop and mobile application layouts
- Vercel Git preview and production deployment workflow

## Interactive demo

The `/demo` application is intentionally more than a static dashboard. Evaluators can:

1. Sign in using the prefilled demo credentials.
2. Create new opportunities with validated inputs.
3. Search and filter the workspace by account and risk.
4. Advance deals through the pipeline and watch probability, risk and forecast values react.
5. Switch to a Kanban-style pipeline view.
6. Enable and pause simulated operational automations.
7. Review portfolio and risk reports.
8. Inspect an activity trail of workspace changes.
9. Reload the browser without losing the current evaluation dataset.
10. Reset the workspace back to its known baseline at any time.

Demo credentials are prefilled on the sign-in screen:

- Email: `demo@kaviro.studio`
- Password: `kaviro-demo`

The credentials are intentionally public because this is an evaluation application, not a production account system. Authentication state is handled through an HTTP-only cookie.

## Server-verified forecast

`POST /api/forecast` is a protected route that receives the current opportunity dataset, validates record shape and numeric boundaries, and independently recalculates:

- Open pipeline value
- Weighted forecast
- High-risk opportunity count
- Commit potential
- Risk distribution
- Stage totals

The UI can fall back to a local calculation if the server route becomes unavailable, and it exposes that degraded state instead of hiding it.

## External service integration

`GET /api/exchange` is protected by the demo session and calls the Frankfurter public foreign-exchange API from the server. The route applies a timeout, checks the provider response shape, normalizes the data and exposes a controlled failure response to the client.

## Persistence scope

The evaluation workspace persists browser state through `localStorage`, which is appropriate for a self-contained public demo and lets evaluators reload without losing their changes.

A production database is **not** connected, and this repository does not claim otherwise. Real multi-user persistence, user-scoped records and durable audit history would require a database layer such as Postgres.

## Stack

- Next.js 15
- React 19
- JavaScript
- CSS Modules + custom CSS
- Next.js Route Handlers
- HTTP-only cookie session
- Browser-persisted evaluation state
- External REST API integration
- Vercel

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` or `http://localhost:3000/demo`.

## Build

```bash
npm run build
npm start
```

## About KAVIRO Studio

KAVIRO Studio focuses on scoped web delivery, responsive frontend implementation and conversion-oriented product experiences. NovaFlow exists so collaborators can evaluate implementation quality, product judgment and application logic without relying on unverified client claims.
