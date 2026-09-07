import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const landing = fs.readFileSync("app/quoteflow/page.js", "utf8");
const demo = fs.readFileSync("app/quoteflow/demo/QuoteFlowDemo.js", "utf8");

test("QuoteFlow exposes a clear validation landing and instant demo", () => {
  assert.match(landing, /No pierdas cotizaciones por falta de seguimiento/);
  assert.match(landing, /\/quoteflow\/demo/);
  assert.match(landing, /Quiero ser tester/);
});

test("QuoteFlow demo covers the core quote follow-up workflow", () => {
  assert.match(demo, /Nueva/);
  assert.match(demo, /Seguimiento/);
  assert.match(demo, /Ganada/);
  assert.match(demo, /Perdida/);
  assert.match(demo, /Próximo contacto/);
  assert.match(demo, /WhatsApp/);
  assert.match(demo, /localStorage/);
});
