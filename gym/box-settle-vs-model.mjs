// gym/box-settle-vs-model.mjs — THE POSITIONAL LEG'S PURPOSE, MEASURED:
// settle what the box can cleanly read from LIVE material + PRIORS; let the
// LOCAL MODEL draw only the residue. The claim: the box settles a real share
// of units with NO model, and every box-settled unit is grounded (its end1/end2
// are verbatim in the material) — so the model is asked only where the reader
// honestly refuses.
import * as prose from "../organs/generation/adapters/prose.mjs";

const MOUTH = "gemma2:2b";
const shadow = new Map([
  ["live://report", "The report found a housing shortage. The council approved a new plan. The study shows a strong effect. The audit reveals a funding gap. The mayor signed the budget. The board rejected the old rule."],
  ["live://metro", "The city faces a rising cost. The committee reviewed the proposal. The survey found a clear trend. The county reported a budget shortfall."],
]);

// the units the engine's own reading yields, plus question-shaped units about
// the material's beings (what a real turn asks).
const units = [
  { name: "SEG·Figure", spec: "what did the report find" },
  { name: "CON·Figure", spec: "what did the council approve" },
  { name: "EVA·Figure", spec: "what did the study show" },
  { name: "DEF·Pattern", spec: "what did the audit reveal" },
  { name: "SYN·Pattern", spec: "what did the mayor sign" },
  { name: "REC·Ground", spec: "what did the board reject" },
  { name: "NUL·Ground", spec: "what did the committee review" },
  { name: "INS·Pattern", spec: "how does the city manage the rising cost" }, // not a clean clause — residue
  { name: "SIG·Ground", spec: "what did the survey find" },
  { name: "SEG·Pattern", spec: "what did the county report" },
];

const ctx = { shadow };
const settled = await prose.computeSettles(units, {}, ctx);

const material = [...shadow.values()].join(" ");
const lower = material.toLowerCase();
let box = 0, residue = 0, fabricated = 0;
console.log("BOX SETTLE vs LOCAL MODEL — live material + priors, no model in the box\n");
for (const u of settled) {
  if (u.settle) {
    box++;
    const e1 = String(u.settle.end1).toLowerCase(), e2 = String(u.settle.end2).toLowerCase();
    const grounded = lower.includes(e1) && lower.includes(e2);
    if (!grounded) fabricated++;
    console.log(`  BOX   ${u.name}: ${u.settle.end1} —${u.settle.label}→ ${u.settle.end2}  ${grounded ? "✓ grounded" : "✗ FABRICATED"}`);
  } else {
    residue++;
    console.log(`  MODEL ${u.name}: (box refused) → the local model draws this`);
  }
}
console.log(`\n  box-settled: ${box}/${units.length}   model-residue: ${residue}/${units.length}   box fabrications: ${fabricated}`);

// the residue: draw ONE from the local model, anchored on the material, and
// check it against the material the same way.
const residueUnit = settled.find((u) => !u.settle);
if (residueUnit) {
  const msg = `Below are sentences copied from one text.\n\n${material}\n\nAnswer in one sentence: ${residueUnit.spec}`;
  try {
    const { doorDraw } = await import("./box-draw.mjs");
    const out = await doorDraw(msg, { model: MOUTH });
    console.log(`\n  MODEL draw for ${residueUnit.name} (${JSON.stringify(residueUnit.spec)}):\n    ${String(out ?? "").slice(0, 200)}`);
  } catch (e) { console.log(`\n  MODEL draw skipped (no local mouth): ${String(e.message).slice(0, 60)}`); }
}

console.log(`\nVERDICT: the box settles what the material states in a clean clause; the model is asked only the residue. Box fabrications: ${fabricated} (must be 0).`);