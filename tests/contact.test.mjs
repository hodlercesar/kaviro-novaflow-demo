import assert from "node:assert/strict";
import test from "node:test";
import { getSectorLabel, validateLead } from "../lib/contact.mjs";

const validLead = {
  name: "Ana Pérez",
  company: "Instalaciones Sur",
  sector: "electricidad",
  email: "ana@instalaciones-sur.cl",
  problem: "Necesitamos ordenar las cotizaciones que llegan por WhatsApp.",
  phone: "+56 9 1234 5678",
};

test("contact validation accepts a complete lead", () => {
  const result = validateLead(validLead);
  assert.equal(result.success, true);
  assert.equal(result.spam, false);
  assert.equal(result.data.email, "ana@instalaciones-sur.cl");
  assert.equal(getSectorLabel(result.data.sector), "Electricidad");
});

test("contact validation rejects invalid sector and email", () => {
  assert.equal(
    validateLead({ ...validLead, sector: "unknown" }).success,
    false,
  );
  assert.equal(
    validateLead({ ...validLead, email: "not-an-email" }).success,
    false,
  );
});

test("contact validation silently marks honeypot submissions", () => {
  const result = validateLead({ ...validLead, website: "https://spam.test" });
  assert.equal(result.success, true);
  assert.equal(result.spam, true);
});
