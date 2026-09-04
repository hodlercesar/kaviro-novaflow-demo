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

test("portfolio exposes instant and persistent evaluation paths", async () => {
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
  assert.match(home, /Construido por Hodler César/);
  assert.match(home, /sign-in\?redirect_url=\/demo/);
  assert.match(preview, /usePreviewWorkspace/);
  assert.match(workspace, /Instant evaluation mode/);
});
