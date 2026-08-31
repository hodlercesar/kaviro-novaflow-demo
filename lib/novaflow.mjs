export const STAGES = Object.freeze([
  "Discovery",
  "Qualified",
  "Proposal",
  "Negotiation",
  "Won",
]);
export const OWNERS = Object.freeze(["KM", "AR", "LS"]);
export const RISKS = Object.freeze(["High", "Medium", "Low"]);
export const MAX_DEALS = 100;

function cleanText(value, maximum) {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  if (!normalized || normalized.length > maximum) return null;
  return normalized;
}

function finiteNumber(value, minimum, maximum) {
  return Number.isFinite(value) && value >= minimum && value <= maximum
    ? value
    : null;
}

export function normalizeDeal(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const id =
    typeof value.id === "string" || Number.isSafeInteger(value.id)
      ? String(value.id).slice(0, 80)
      : null;
  const company = cleanText(value.company, 120);
  const contact = cleanText(value.contact, 120);
  const next = cleanText(value.next, 180);
  const owner = OWNERS.includes(value.owner) ? value.owner : null;
  const stage = STAGES.includes(value.stage) ? value.stage : null;
  const amount = finiteNumber(value.value, 0, 100000000);
  const probability = finiteNumber(value.probability, 0, 100);
  const daysIdle = finiteNumber(value.daysIdle, 0, 3650);

  if (
    !id ||
    !company ||
    !contact ||
    !next ||
    !owner ||
    !stage ||
    amount === null ||
    probability === null ||
    daysIdle === null
  ) {
    return null;
  }

  return {
    id,
    company,
    contact,
    owner,
    stage,
    value: Math.round(amount),
    probability: Math.round(probability),
    daysIdle: Math.round(daysIdle),
    next,
  };
}

export function validateDeals(value) {
  if (!Array.isArray(value) || value.length > MAX_DEALS)
    return { success: false, data: [] };
  const data = value.map(normalizeDeal);
  if (data.some((deal) => deal === null)) return { success: false, data: [] };
  if (new Set(data.map((deal) => deal.id)).size !== data.length)
    return { success: false, data: [] };
  return { success: true, data };
}

export function riskFor(deal) {
  if (deal.stage === "Won") return "Low";
  if (deal.daysIdle >= 7 || deal.probability < 40) return "High";
  if (deal.daysIdle >= 4 || deal.probability < 60) return "Medium";
  return "Low";
}

export function calculateForecast(deals) {
  const openDeals = deals.filter((deal) => deal.stage !== "Won");
  const pipeline = openDeals.reduce((sum, deal) => sum + deal.value, 0);
  const weighted = openDeals.reduce(
    (sum, deal) => sum + deal.value * (deal.probability / 100),
    0,
  );
  const atRisk = openDeals.filter((deal) => riskFor(deal) === "High").length;
  const winPotential = deals
    .filter((deal) => ["Proposal", "Negotiation"].includes(deal.stage))
    .reduce((sum, deal) => sum + deal.value, 0);

  const riskBreakdown = Object.fromEntries(
    RISKS.map((risk) => [
      risk.toLowerCase(),
      openDeals.filter((deal) => riskFor(deal) === risk).length,
    ]),
  );
  const stageTotals = STAGES.map((stage) => {
    const stageDeals = deals.filter((deal) => deal.stage === stage);
    return {
      stage,
      count: stageDeals.length,
      value: stageDeals.reduce((sum, deal) => sum + deal.value, 0),
    };
  });

  return {
    metrics: {
      pipeline: Math.round(pipeline),
      weighted: Math.round(weighted),
      atRisk,
      winPotential: Math.round(winPotential),
    },
    riskBreakdown,
    stageTotals,
  };
}

export function comparePriority(left, right) {
  const riskRank = { High: 0, Medium: 1, Low: 2 };
  const byRisk = riskRank[riskFor(left)] - riskRank[riskFor(right)];
  if (byRisk !== 0) return byRisk;
  return right.value - left.value;
}
