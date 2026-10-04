// penelope/organs/voice.e2e.mjs — the end-to-end battery: router → logos →
// prompt → the local mouth, measured. Runs a bounded number of real draws
// (the box is a shared commons — GL-WV-10 — the budget is small, disclosed)
// and runs the falsify controls over the MOE routing shape:
//   routing    the envelope routes the STATISTICS question to the archons
//              whose shadows cover it, before any reasoning fires
//   veil       no response names who speaks (proper nouns in own prose)
//   rejectfab  no quotation survives that the organ cannot locate
//   aporia     an aporia envelope draws nothing at all
//   frame      the routed jurisdictions condition the response: the draw
//              must share vocabulary with its routed material more than
//              with an unrelated canon (the null-overlap shape)
//
//   node organs/voice.e2e.mjs   run the battery (real model draws)
import { loadManifest, loadVoice } from "../../eo-teachings/pythia.mjs";
import { steer } from "./steersman.mjs";
import { speakEnvelope, routedExperts, composePrompt, veilTokens, otherExcerpts } from "./voice.mjs";

let failures = 0;
const fail = (name, msg) => { failures += 1; console.error(`  ✗ ${name}: ${msg}`); };
const pass = (name, msg) => console.log(`  ✓ ${name}${msg ? ` — ${msg}` : ""}`);
const tokensOf = (s) => new Set(String(s ?? "").toLowerCase().match(/\p{L}{3,}/gu) ?? []);
const jac = (a, b) => {
  const A = tokensOf(a), B = tokensOf(b);
  let inter = 0;
  for (const t of A) if (B.has(t)) inter += 1;
  const u = A.size + B.size - inter;
  return u ? inter / u : 0;
};

const cast = loadManifest();
const model = process.env.PYTHIA_MODEL ?? "gemma2:2b";
console.log(`voice e2e (MOE routing) · model ${model} · draws direct to ollama, budget disclosed\n`);

// ── 1. THE STATISTICS QUESTION: the router checks in with the relevant
// archons BEFORE the reasoning fires; the prompt is composed LAST ──────────
const turn1 = "how do we know a correlation is real?";
const env1 = steer({ turn: turn1 });
const ex1 = routedExperts(env1);
console.log(`TURN: "${turn1}"`);
console.log(`  envelope: move=${env1.move.primary} aporia=${env1.aporia} routed(strong)=[${ex1.strong.map((a) => a.handle).join(", ")}] weak=[${ex1.weak.map((a) => a.handle).join(", ")}]`);
const comp1 = ex1.strong.length ? composePrompt(ex1, cast, turn1) : null;
if (comp1) console.log(`  frame: ${comp1.routed.map((r) => r.role).join(" | ")}`);
const v1 = await speakEnvelope(env1, cast, { turn: turn1, onNote: (n) => process.stdout.write(n) });
console.log(`\n  RESPONSE:\n  ${v1.text.slice(0, 900).replace(/\n/g, "\n  ")}`);

// ── 2. THE CONSUMPTION TURN: the prior is carried — the anti-schizoid seam ──
const turn2 = "you said morality is a sign of decline — but how do we test that?";
const env2 = steer({ turn: turn2, priorTurn: "is morality a sign of decline?" });
const v2 = await speakEnvelope(env2, cast, { turn: turn2, onNote: (n) => process.stdout.write(n) });
console.log(`\nTURN: "${turn2}"\n  envelope: move=${env2.move.primary} consumption=${env2.consumption.consumed} routed=[${routedExperts(env2).strong.map((a) => a.handle).join(", ") || "none"}]`);
console.log(`  RESPONSE:\n  ${v2.text.slice(0, 600).replace(/\n/g, "\n  ")}`);

// ── 3. APORIA TURN: nothing to hold → nothing drawn ─────────────────────────
const turn3 = "freshest tacos of the chromium launchpad";
const env3 = steer({ turn: turn3 });
const v3 = await speakEnvelope(env3, cast, { turn: turn3 });
console.log(`\nTURN: "${turn3}"\n  envelope: aporia=${env3.aporia} → drawn=${v3.record.drawn} (${v3.record.mode})`);

// ── 4. FRAME DIVERGENCE: one question, two routings ─────────────────────────
console.log(`\nFRAME: "${turn1}" — the statistics routing vs a spiritual routing`);
const envSpirit = steer({ turn: "god spiritual master bhagavata" });
const strong1 = env1.activation.filter((a) => a.lane === "shadow").slice(0, 4);
const strong2 = envSpirit.activation.filter((a) => a.lane === "shadow").slice(0, 4);
if (strong1.length && strong2.length) {
  const compA = composePrompt({ strong: strong1, weak: [] }, cast, turn1);
  const compB = composePrompt({ strong: strong2, weak: [] }, cast, turn1);
  const envA = { ...env1, activation: strong1, consumption: env1.consumption };
  const envB = { ...envSpirit, activation: strong2, consumption: envSpirit.consumption };
  const va = await speakEnvelope(envA, cast, { turn: turn1, onNote: (x) => process.stdout.write(x) });
  const vb = await speakEnvelope(envB, cast, { turn: turn1, onNote: (x) => process.stdout.write(x) });
  const matA = compA.system, matB = compB.system;
  const selfA = jac(va.text, matA), crossA = jac(va.text, matB);
  const selfB = jac(vb.text, matB), crossB = jac(vb.text, matA);
  const ownBeatsCross = selfA > crossA && selfB > crossB;
  if (!ownBeatsCross) fail("frame", `own-material overlap did not beat cross: A self=${selfA.toFixed(3)} cross=${crossA.toFixed(3)} · B self=${selfB.toFixed(3)} cross=${crossB.toFixed(3)}`);
  else pass("frame", `responses condition on their routed material: A ${selfA.toFixed(3)}>${crossA.toFixed(3)} · B ${selfB.toFixed(3)}>${crossB.toFixed(3)}`);
} else {
  console.log(`  ~ frame divergence skipped: strong routings empty (stats=${strong1.length}, spiritual=${strong2.length})`);
}

// ── THE FALSIFY CONTROLS ────────────────────────────────────────────────────
console.log(`\n== FALSIFY CONTROLS ==\n`);

{
  const leaks = [];
  for (const [label, v] of [["v1", v1], ["v2", v2]]) {
    if (!v.record || v.record.mode !== "voice") continue;
    for (const r of v.record.routed ?? []) {
      const rec = cast.get(r.handle.toLowerCase());
      if (!rec) continue;
      const material = v.record.materialKind;
      const hit = veilTokens(rec, "", otherExcerpts(rec, cast)).filter((t) => {
        const cap = t[0].toUpperCase() + t.slice(1);
        return v.text.includes(cap) && !v.text.toLowerCase().includes(`"${t}`);
      });
      if (hit.length) leaks.push(`${label}:${r.handle} leaked ${hit.join(",")}`);
    }
  }
  if (leaks.length) fail("veil", leaks.join(" · "));
  else pass("veil", "no response names who speaks");
}

{
  for (const [label, v] of [["v1", v1], ["v2", v2]]) {
    if (!v.record || v.record.mode !== "voice") continue;
    const g = v.record.grounding;
    if (g.fabricatedAfterRepair > 0) fail("rejectfab", `${label}: ${g.fabricatedAfterRepair} unlocated quotation(s) survived`);
    else pass("rejectfab", `${label}: no unlocated quotation survived (${g.quotesSupported}/${g.quotesTotal} grounded)`);
  }
}

{
  if (!v3.record.aporia || v3.record.drawn !== false) fail("aporia", "an aporia envelope drew from the mouth");
  else pass("aporia", "nothing drawn; the gap is the answer");
}

{
  if (!ex1.strong.length) fail("routing", "the statistics question routed to no strong archon");
  else pass("routing", `statistics question routed to ${ex1.strong.map((a) => a.handle).join(", ")} before the reasoning fires`);
}

console.log(`\ne2e: ${failures === 0 ? "PASS — nothing falsified on this run" : `${failures} falsification(s) — the finding is the fix`}`);
process.exit(failures === 0 ? 0 : 1);