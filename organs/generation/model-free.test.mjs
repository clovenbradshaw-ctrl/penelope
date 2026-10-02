import test from "node:test";
import assert from "node:assert/strict";
import { weave } from "./api.mjs";

test("Weave model-free mode never falls through to a model", async () => {
  const adapter = {
    kind: "diagnostic",
    ext: "txt",
    readUnits() {
      return [
        { name: "field", spec: "a grounded fact" },
        { name: "mouth", spec: "a missing fact" },
      ];
    },
    autofill(unit) {
      return unit.name === "field" ? { code: "A grounded fact from the corpus.", address: "fixture:field" } : null;
    },
    hunt() {
      return null;
    },
    mouthFragment() {
      throw new Error("mouthFragment must not be reached in model-free mode");
    },
    snip(value) { return String(value ?? ""); },
    probeUnit() { return { ok: true, detail: "fixture" }; },
    testUnits(value) { return { ok: true, reason: "fixture", folded: { beats: [], refused: [], residual: [] } }; },
    toDocument({ code }) { return code; },
  };

  const result = await weave({
    intent: "model-free diagnostic",
    artifact: adapter,
    noModel: true,
    model: null,
  });

  const events = result.evidence.provenance.events;
  assert.equal(result.model, null);
  assert.equal(events.filter((e) => e.stage === "draw").length, 0);
  assert.equal(events.filter((e) => e.stage === "model-required").length, 1);
  assert.equal(events.filter((e) => e.stage === "ground" && e.transform === "autofill-frame").length, 1);
  assert.equal(events.filter((e) => e.stage === "ground" && e.transform === "hunt-snip").length, 0);
  assert.ok(events.some((e) => e.stage === "verify"));
  assert.ok(events.some((e) => e.stage === "materialize"));
  assert.equal(result.repair.scars[0].why.startsWith("model-required"), true);
});
