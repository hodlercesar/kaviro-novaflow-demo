# NovaFlow — KAVIRO Studio Functional SaaS Demo

NovaFlow is a conceptual B2B revenue-operations application created by **KAVIRO Studio** as a public engineering demonstration.

**Live demo:** https://kaviro-novaflow-demo.vercel.app  
**Interactive workspace:** https://kaviro-novaflow-demo.vercel.app/demo

> NovaFlow is a fictional product. It is not presented as client work and contains no real customer data or fabricated results.

## What this project demonstrates

- Responsive product UI across landing and application views
- Next.js App Router architecture
- Client-side state management for pipeline interactions
- Business rules for risk scoring and weighted revenue forecasting
- Filtering, sorting and state-driven UI updates
- Server-side route handlers
- Functional demo authentication using an HTTP-only session cookie
- External API integration through a server-side endpoint
- Provider-error handling separated from UI state
- Vercel-oriented deployment structure

## Interactive demo

The `/demo` workspace includes a small revenue pipeline. Users can filter and sort opportunities, advance deals through stages and see risk and weighted-forecast calculations update immediately.

Demo credentials are prefilled on the sign-in screen:

- Email: `demo@kaviro.studio`
- Password: `kaviro-demo`

The credentials are intentionally public because this is a portfolio demo, not a production account system. The session itself is handled server-side with an HTTP-only cookie.

## External service integration

`/api/exchange` calls the Frankfurter public foreign-exchange API from the server and exposes normalized exchange-rate data to the workspace. Errors are handled as a separate backend failure state.

## Persistence status

A production database is **not connected yet**. Pipeline data in the current public demo is seeded in application state and is intentionally not described as persistent storage.

The next architecture milestone is a real Postgres persistence layer with user-scoped records. This repository will not claim database integration until that service is actually provisioned and connected.

## Stack

- Next.js 15
- React 19
- JavaScript
- CSS Modules + custom CSS
- Next.js Route Handlers
- HTTP-only cookie session
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

KAVIRO Studio focuses on scoped web delivery, responsive frontend implementation and conversion-oriented product experiences. NovaFlow exists so collaborators can evaluate implementation quality, UI judgment and application logic without relying on unverified client claims.
