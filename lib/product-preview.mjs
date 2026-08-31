import { seedActivity, seedAutomations, seedDeals } from "./demo-data.mjs";
import { calculateForecast, comparePriority } from "./novaflow.mjs";

// Public by design: never read a visitor's private workspace for marketing.
export function getProductPreview() {
  return {
    ...calculateForecast(seedDeals),
    priority: seedDeals
      .filter((deal) => deal.stage !== "Won")
      .sort(comparePriority)
      .slice(0, 3),
    activity: seedActivity.slice(0, 2),
    automation: seedAutomations[0],
  };
}
