import test from "node:test";
import assert from "node:assert/strict";

import {
  calculateForecast,
  comparePriority,
  normalizeDeal,
  riskFor,
  validateDeals,
} from "../lib/novaflow.mjs";
import { cloneSeedDeals } from "../lib/demo-data.mjs";

test("seed forecast is deterministic", () => {
  const forecast = calculateForecast(cloneSeedDeals());
  assert.deepEqual(forecast.metrics, {
    pipeline: 176000,
    weighted: 98190,
    atRisk: 1,
    winPotential: 93000,
  });
});

test("risk scoring uses inactivity and probability", () => {
  assert.equal(riskFor({ daysIdle: 8, probability: 90 }), "High");
  assert.equal(riskFor({ daysIdle: 1, probability: 55 }), "Medium");
  assert.equal(riskFor({ daysIdle: 1, probability: 80 }), "Low");
});

test("validation strips unknown properties and rejects invalid records", () => {
  const [seed] = cloneSeedDeals();
  assert.deepEqual(normalizeDeal({ ...seed, secret: "not persisted" }), seed);
  assert.equal(validateDeals([{ ...seed, company: "" }]).success, false);
  assert.equal(validateDeals(new Array(101).fill(seed)).success, false);
});

test("priority ordering ranks risk before value", () => {
  const deals = cloneSeedDeals()
    .filter((deal) => deal.stage !== "Won")
    .sort(comparePriority);
  assert.equal(deals[0].company, "Kepler Works");
  assert.equal(deals[1].company, "Atelier Cloud");
  assert.equal(deals[2].company, "Northstar Labs");
});

test("validation rejects duplicate identifiers and non-finite numbers", () => {
  const [seed] = cloneSeedDeals();
  assert.equal(validateDeals([seed, seed]).success, false);
  assert.equal(validateDeals([{ ...seed, value: Infinity }]).success, false);
  assert.equal(validateDeals([]).success, true);
});
