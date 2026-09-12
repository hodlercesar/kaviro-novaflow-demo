import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { getProductPreview } from "../lib/product-preview.mjs";
import { seedDeals } from "../lib/demo-data.mjs";
import { calculateForecast } from "../lib/novaflow.mjs";
import { mascotPose } from "../lib/mascot-state.mjs";

test("public preview shares exact fictional dashboard calculations", () => {
  const before = JSON.stringify(seedDeals);
  const preview = getProductPreview();
  assert.deepEqual(preview.metrics, calculateForecast(seedDeals).metrics);
  assert.equal(preview.metrics.weighted, 98190);
  assert.deepEqual(
    preview.priority.map((deal) => deal.id),
    ["kepler-works", "atelier-cloud", "northstar-labs"],
  );
  assert.equal(JSON.stringify(seedDeals), before);
  assert.equal(
    preview.stageTotals.reduce((sum, stage) => sum + stage.value, 0),
    200000,
  );
});

test("mascot follows field metadata without credential values", () => {
  assert.equal(mascotPose(), "idle");
  assert.equal(mascotPose({ type: "text", name: "identifier" }), "email");
  assert.equal(mascotPose({ type: "text", name: "username" }), "email");
  assert.equal(mascotPose({ type: "email" }), "email");
  assert.equal(mascotPose({ type: "password" }), "shield");
  assert.equal(mascotPose({ type: "text", name: "password" }), "peek");
  assert.equal(mascotPose({ type: "text", id: "password-field" }), "peek");
  assert.equal(mascotPose({ type: "tel", name: "code" }), "idle");
});

test("password privacy takes precedence over identifier-like field names", () => {
  assert.equal(mascotPose({ type: "password", name: "username" }), "shield");
  assert.equal(mascotPose({ type: "text", id: "new-password-field" }), "peek");
});

test("KAVIRO commercial home exposes its message and technical demos", async () => {
  const home = await readFile(
    new URL("../app/page.js", import.meta.url),
    "utf8",
  );
  const preview = await readFile(
    new URL("../app/preview/page.js", import.meta.url),
    "utf8",
  );
  const workspace = await readFile(
    new URL("../app/demo/WorkspaceExperience.js", import.meta.url),
    "utf8",
  );

  assert.match(home, /href="\/preview"/);
  assert.match(home, /KAVIRO Studio/);
  assert.match(home, /Soluciones digitales para negocios/);
  assert.match(home, /QuoteFlow/);
  assert.match(home, /href="\/quoteflow\/demo"/);
  assert.match(home, /sign-in\?redirect_url=\/demo/);
  assert.match(home, /href="\/contacto"/);
  assert.match(home, /href=\{`\/sectores\/\$\{slug\}`\}/);
  assert.match(preview, /usePreviewWorkspace/);
  assert.match(workspace, /Instant evaluation mode/);
});

test("commercial lead generation routes are present", async () => {
  const files = [
    "../app/contacto/page.js",
    "../app/contacto/LeadForm.js",
    "../app/sectores/page.js",
    "../app/sectores/[slug]/page.js",
    "../app/_content/industries.js",
  ];

  for (const file of files) {
    const source = await readFile(new URL(file, import.meta.url), "utf8");
    assert.ok(source.length > 0, `${file} should contain the route`);
  }

  const contact = await readFile(
    new URL("../app/contacto/LeadForm.js", import.meta.url),
    "utf8",
  );
  assert.match(contact, /Solicitar evaluación/);
  assert.match(contact, /No\s+guardamos tus datos/);

  const industries = await readFile(
    new URL("../app/_content/industries.js", import.meta.url),
    "utf8",
  );
  for (const slug of [
    "electricidad",
    "climatizacion",
    "construccion",
    "servicios-tecnicos",
  ]) {
    assert.match(industries, new RegExp(`slug: "${slug}"`));
  }
});

test("the KAVIRO process page explains the commercial journey", async () => {
  const processPage = await readFile(
    new URL("../app/como-trabajamos/page.js", import.meta.url),
    "utf8",
  );
  const sitemap = await readFile(
    new URL("../app/sitemap.js", import.meta.url),
    "utf8",
  );

  assert.match(
    processPage,
    /Transformamos problemas de negocio en soluciones digitales/,
  );
  assert.match(processPage, /Nuestro proceso/);
  assert.match(processPage, /Qué podemos construir/);
  assert.match(processPage, /Trabajamos con negocios de servicios/);
  assert.match(processPage, /href="\/contacto"/);
  assert.match(processPage, /href=\{`\/sectores\/\$\{slug\}`\}/);
  assert.match(sitemap, /como-trabajamos/);
});
