export const seedDeals = Object.freeze([
  {
    id: "northstar-labs",
    company: "Northstar Labs",
    contact: "Maya Chen",
    owner: "KM",
    stage: "Proposal",
    value: 42000,
    probability: 62,
    daysIdle: 5,
    next: "Review security terms",
  },
  {
    id: "monarch-systems",
    company: "Monarch Systems",
    contact: "Theo Grant",
    owner: "AR",
    stage: "Negotiation",
    value: 18000,
    probability: 78,
    daysIdle: 1,
    next: "Finalize commercial terms",
  },
  {
    id: "kepler-works",
    company: "Kepler Works",
    contact: "Nina Park",
    owner: "KM",
    stage: "Discovery",
    value: 27000,
    probability: 35,
    daysIdle: 8,
    next: "Confirm technical sponsor",
  },
  {
    id: "atelier-cloud",
    company: "Atelier Cloud",
    contact: "Jon Bell",
    owner: "LS",
    stage: "Qualified",
    value: 56000,
    probability: 48,
    daysIdle: 2,
    next: "Schedule solution workshop",
  },
  {
    id: "cobalt-studio",
    company: "Cobalt Studio",
    contact: "Iris Cole",
    owner: "AR",
    stage: "Proposal",
    value: 33000,
    probability: 66,
    daysIdle: 3,
    next: "Send revised scope",
  },
  {
    id: "orbit-commerce",
    company: "Orbit Commerce",
    contact: "Sofia Reed",
    owner: "LS",
    stage: "Won",
    value: 24000,
    probability: 100,
    daysIdle: 0,
    next: "Demo handoff completed",
  },
]);

export const seedAutomations = Object.freeze([
  {
    id: "stale",
    name: "Stale deal escalation",
    detail:
      "Flag opportunities idle for 7+ days and surface them in the priority queue.",
    enabled: true,
    runs: 14,
  },
  {
    id: "probability",
    name: "Probability sync",
    detail:
      "Update forecast confidence automatically when an opportunity changes stage.",
    enabled: true,
    runs: 9,
  },
  {
    id: "followup",
    name: "Follow-up reminder",
    detail:
      "Create a reminder when a next step has not changed after a stage transition.",
    enabled: false,
    runs: 4,
  },
]);

export const seedActivity = Object.freeze([
  {
    id: "forecast-seed",
    text: "Forecast recalculated across the fictional opportunity set",
    time: "2m",
  },
  {
    id: "northstar-seed",
    text: "Northstar Labs moved into proposal review",
    time: "18m",
  },
  {
    id: "kepler-seed",
    text: "Stale-deal simulation flagged Kepler Works",
    time: "41m",
  },
]);

export function cloneSeedDeals() {
  return seedDeals.map((deal) => ({ ...deal }));
}

export function cloneSeedAutomations() {
  return seedAutomations.map((automation) => ({ ...automation }));
}

export function cloneSeedActivity() {
  return seedActivity.map((item) => ({ ...item }));
}
