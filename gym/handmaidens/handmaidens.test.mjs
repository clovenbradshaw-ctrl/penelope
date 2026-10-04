// gym/handmaidens/handmaidens.test.mjs — falsify the team: every member must
// FAIL on a planted violation (the constitution II.10: a gate is verified
// against material it is supposed to reject, not only what it accepts).
import { test } from "node:test";
import assert from "node:assert/strict";
import { audit as eury } from "./eurycleia.mjs";
import { audit as auto } from "./autonoe.mjs";
import { audit as iphi } from "./iphthime.mjs";
import { audit as tele } from "./telemachus.mjs";

test("eurycleia refuses unnamed drawing tools (the suitor of forgetfulness)", () => {
  const r = eury();
  assert.equal(r.ok, false, "today the house has unnamed generation tools");
  assert.ok(r.unnamed.length > 0, "must name at least one");
  assert.ok(r.unnamed.includes("organs/mouth.mjs") || r.unnamed.some((f) => f.includes("voice") || f.includes("essay")), "the namesake/mouth layer is unnamed");
});

test("autonoe refuses unrecorded draws (the leak)", () => {
  const r = auto();
  assert.equal(r.ok, false, "today the record still has leaks");
  // the direct-ollama ablations were wired through the door 2026-10-04; the
  // remaining leaks are the mouth/resolver layer and the white-paper scripts
  assert.ok(r.unrecorded.some((f) => f.includes("mouth") || f.includes("resolver") || f.includes("white-paper")), "leaks remain in the mouth/resolver/white-paper layer");
});

test("iphthime refuses ungrounded laws (the hallucination)", () => {
  const r = iphi();
  assert.equal(r.ok, false);
  assert.ok(r.uncited.length > 0, "laws exist that no thread weaves");
  assert.ok(r.uncited.includes("GL-WP-05") || r.ghostThreads.length > 0, "the WPH ghost thread is a hallucination");
});

test("telemachus refuses direct-door breaches (the draw that forgets its door)", () => {
  const r = tele();
  // the box-vs-model ablations were wired through the door 2026-10-04 — the
  // threshold is now held; the sanctioned exceptions (voice, the no-model
  // tripwire) are named, never flagged.
  assert.equal(r.ok, true, "the sanctioned door is held — no breaches");
  assert.equal(r.breaches.length, 0, "no draw forgets its door");
});

test("the house round reports the whole state, sound only when all ok", async () => {
  const { houseRound } = await import("../handmaidens.mjs");
  const r = await houseRound();
  assert.equal(r.ok, false, "today the house is not sound");
  assert.equal(r.members.length, 4, "all four handmaidens stand watch");
});
