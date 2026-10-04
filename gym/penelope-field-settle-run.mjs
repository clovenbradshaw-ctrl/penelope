// penelope-field-settle-run.mjs — the FULL ENGINE on live material, NO MODEL.
// weave({ noModel: true }) with a seeded shadow: the box settles what the live
// material + priors can answer, and every unit that reaches the mouth is
// recorded model-required (never drawn). This is the settled-vs-drawn split.
import { weave } from "../organs/generation/api.mjs";

// LIVE material: the shadow the field/hunt retains (url -> clean prose). Each
// sentence is a single main clause so the positional clause reader can settle.
const shadow = new Map([
  ["live://metro/report", "The report found a housing shortage. The report shows a rising cost. The study found a strong effect. The audit reveals a gap."],
  ["live://metro/council", "The council approved a new plan. The council rejected the old rule. The mayor signed the budget."],
]);

const task = "Write a short piece on the housing shortage from the material";
const out = await weave({ intent: task, artifact: "prose", noModel: true, context: { shadow, example: {} } });

console.log(`\n=== ENGINE (noModel) — ${task} ===`);
console.log(`status: ${out.status} ok=${out.ok}`);
const u = out.units ?? out.weaving?.units ?? [];
const ledger = out.outcomes ?? out.weaving?.outcomes ?? [];
console.log(`units: ${u.length}`);
let settled = 0, drawnRequired = 0;
for (const o of ledger) {
  console.log(`  ${o.unit}: ${o.stage}${o.bytes != null ? ` (${o.bytes}B)` : ""}${o.text ? `  ${JSON.stringify(String(o.text).slice(0, 70))}` : ""}`);
  if (o.stage === "settle" || o.stage === "box") settled++;
  if (o.stage === "model-required") drawnRequired++;
}
if (!ledger.length) console.log("  (no outcome ledger on this shape — dumping keys:)", Object.keys(out).join(", "));
console.log(`\nbox-settled: ${settled}  |  model-required (refused to draw): ${drawnRequired}`);