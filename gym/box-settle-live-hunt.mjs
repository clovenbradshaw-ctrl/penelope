// gym/box-settle-live-hunt.mjs — CHASE IT TO THE END: the real pipeline on a
// REAL hunt. penelope's hunt() fetches live prose; the box (composed reader,
// no model) settles what the fetched material states in a clean clause; the
// LOCAL MODEL draws only the residue. Honest settle rate on fetched text, not
// hand-seeded, and every box claim grounded.
import * as prose from "../organs/generation/adapters/prose.mjs";

const MOUTH = "gemma2:2b";

// the unit questions a real turn asks — from a real ask
const units = [
  { name: "NUL·Ground", spec: "what did the audit find about the funding" },
  { name: "SEG·Figure", spec: "what did the council approve" },
  { name: "CON·Figure", spec: "what did the report find" },
  { name: "EVA·Figure", spec: "what did the study show" },
  { name: "DEF·Pattern", spec: "what did the mayor sign" },
  { name: "SYN·Pattern", spec: "what did the court rule" },
  { name: "REC·Ground", spec: "what did the committee review" },
];

const ctx = { shadow: new Map() };

// THE LIVE HUNT — penelope's own adapter.hunt, fetching real prose into ctx.shadow
console.log("chasing live hunt...");
let hunted = 0;
for (const u of units) {
  try { const r = await prose.hunt(u, ctx); if (r) { hunted++; console.log(`  hunt ${u.name}: fetched ${String(r.code).length} chars from ${String(r.url).slice(0, 60)}`); } }
  catch (e) { console.log(`  hunt ${u.name}: failed — ${String(e.message).slice(0, 60)}`); }
}
console.log(`hunted: ${hunted} unit(s) fetched live\n`);
if (!hunted) { console.log("no live material fetched — the box has nothing to settle (a named gap, not a result)"); process.exit(0); }

// settle from the FETCHED material
const settled = await prose.computeSettles(units, {}, ctx);
const material = [...ctx.shadow.values()].join(" ").toLowerCase();

let box = 0, residue = 0, fab = 0;
console.log("BOX SETTLE on LIVE-HUNTED material (no model in the box):\n");
for (const u of settled) {
  if (u.settle) {
    box++;
    const ok = material.includes(String(u.settle.end1).toLowerCase()) && material.includes(String(u.settle.end2).toLowerCase());
    if (!ok) fab++;
    console.log(`  BOX   ${u.name}: ${u.settle.end1} —${u.settle.label}→ ${u.settle.end2}  ${ok ? "✓" : "✗ FABRICATED"}`);
  } else { residue++; console.log(`  MODEL ${u.name}: box refused → local model`); }
}
console.log(`\n  box-settled ${box}/${units.length}   model-residue ${residue}/${units.length}   box fabrications ${fab}`);

// the residue drawn by the LOCAL MODEL, anchored, checked
const r = settled.find((u) => !u.settle);
if (r) {
  const text = [...ctx.shadow.values()].join(" ").slice(0, 3000);
  try {
    const res = await fetch("http://localhost:11435/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ model: MOUTH, stream: false, options: { temperature: 0 }, messages: [{ role: "user", content: `Below are sentences copied from one text.\n\n${text}\n\nAnswer in one sentence: ${r.spec}` }] }) });
    const out = String((await res.json()).message?.content ?? "").trim();
    console.log(`\n  MODEL draw for ${r.name}: ${out.slice(0, 200)}`);
  } catch (e) { console.log(`\n  MODEL draw skipped: ${String(e.message).slice(0, 60)}`); }
}
console.log(`\nVERDICT: on live-hunted text — box settles ${box}, model draws ${residue}, box fabrications ${fab}. The honest settle rate is ${box}/${units.length}.`);