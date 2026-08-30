# NovaFlow

A conceptual revenue-operations SaaS by **KAVIRO Studio**. Built for product and engineering evaluation—not presented as client work, a commercial service, or evidence of real business results.

**All accounts, people, opportunities and revenue figures in the seed dataset are fictional.** Authentication accounts are real Clerk identities. Do not enter sensitive customer information into this evaluation app.

## Product scope

- Public product landing and authenticated `/demo` workspace.
- Clerk sign-in, sign-up and sign-out. No shared demo password or parallel session mechanism.
- Opportunity creation, search, risk filters and stage advancement.
- Deterministic risk scoring and probability-weighted forecasting, validated on the server.
- User-scoped Neon persistence for opportunities; explicit local fallback status.
- Simulated automations, fictional team personas and browser-local preferences/activity.
- Reference FX rates from Frankfurter, with independent failure handling.

Automations do **not** send email, run background jobs or use AI. Activity is a lightweight evaluation feed, not a durable audit log. Team personas are **not** real workspace members. The app has no billing or real-time collaboration.

## Stack

Next.js 15 App Router · React 18 · JavaScript · CSS Modules · Clerk · Neon Postgres · Vercel.

## Local setup

Use Node.js 24 and the pnpm version in `package.json`.

1. Run `pnpm install --frozen-lockfile`.
2. Copy `.env.example` to `.env.local` and replace the placeholders with **development** Clerk and Neon values. Never commit credentials.
3. Apply `db/migrations/001_novaflow_workspaces.sql` to the intended Neon development branch. The app does not create tables during requests.
4. Run `pnpm dev` and open `http://localhost:3000`.
5. Sign in with a Clerk test account to evaluate `/demo`.

The database client accepts `STORAGE_URL`, `DATABASE_URL`, `POSTGRES_URL`, or `NEON_DATABASE_URL`, in that precedence order, for compatibility with existing deployment configuration. Prefer a single `DATABASE_URL` for new environments.

## Architecture

| Boundary                     | Responsibility                                            |
| ---------------------------- | --------------------------------------------------------- |
| `app/page.js`                | Public product presentation                               |
| `app/sign-in`, `app/sign-up` | Clerk authentication UI                                   |
| `middleware.js`              | Clerk request/session context                            |
| `app/demo/layout.js`         | Server-side authentication gate                           |
| `app/demo/page.js`           | Workspace shell and user interactions                     |
| `app/demo/components`        | Focused dashboard views and accessible opportunity dialog |
| `app/demo/useWorkspace.js`   | Hydration, per-user browser fallback and debounced saves  |
| `lib/novaflow.mjs`           | Shared validation, risk and forecast rules                |
| `lib/demo-data.mjs`          | Explicit fictional baseline                               |
| `lib/db.js`                  | Database access, imported only by API handlers            |

### APIs

Every handler checks Clerk authentication on the server. Identity comes from `auth()`, never from a client-supplied user ID.

| Route           | Method | Behavior                                    |
| --------------- | ------ | ------------------------------------------- |
| `/api/deals`    | GET    | Read the signed-in user's workspace         |
| `/api/deals`    | PUT    | Validate and save that user's opportunities |
| `/api/forecast` | POST   | Validate and calculate; never persist       |
| `/api/exchange` | GET    | Fetch cached public reference rates         |

Workspace responses are private and not shared-cacheable. SQL uses parameterized tagged templates. Record limits, allowed fields and numeric boundaries are validated server-side.

### Persistence contract

Neon is canonical when available. One row in `novaflow_workspaces` belongs to one Clerk `user_id`. The browser cache is keyed by that same identity (`novaflow:workspace:v2:<userId>`); the old global demo cache is not imported. Anonymous users cannot access workspace APIs.

Opportunity saves are debounced. A visible status distinguishes saving, saved-to-Neon and browser-only fallback. If a local-only change conflicts with an existing Neon workspace on a later load, Neon wins. Simultaneous tabs/devices use last-write-wins; conflict resolution is outside this demo's scope. Browser-local activity, automation toggles and preferences do not sync between devices.

## Quality checks

```sh
pnpm lint
pnpm test
pnpm build
pnpm format:check
```

`pnpm check` runs all four. Build requires a valid Clerk publishable key. Automated unit tests cover deterministic business rules and validation; they do not replace a real authenticated browser test.

Before publishing, test desktop/mobile, keyboard navigation, protected redirects, sign-in/sign-out, creation, stage advancement, reload persistence, reset, and provider/database failure states. Verify two separate Clerk users cannot see one another's data.

## Deployment review

- Use separate Clerk development/production instances and separate Neon branches for preview/production.
- Apply the migration before deploying. Existing tables should be inspected before any schema change.
- Configure Clerk authorized domains, social providers and redirects for the deployment.
- Development-mode Clerk branding is controlled by the Clerk instance/keys, not hidden with CSS.
- Verify security headers, authenticated API responses and runtime logs.
- Review changes and deploy explicitly; no production deployment is part of the review branch workflow.

## Deliberate limitations

This is a portfolio demonstration, not a production CRM. It has no organization authorization, database row-level security, optimistic concurrency, full offline synchronization, abuse-rate limiting or user-data retention automation. Those require a separate production scope. Clerk protects identity; each database query enforces ownership at the application boundary.
