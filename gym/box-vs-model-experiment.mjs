// gym/box-vs-model-experiment.mjs — THE DECISIVE ABLATION: box+model vs
// model-only on held-out prose, scored MECHANICALLY.
//
// The claim (falsifiable): adding the box (the composed reader, no model)
// BEFORE the mouth cannot increase fabrication — box-settled answers are
// verbatim in the material (0 by construction), so the whole arm's fabrication
// is the residue the model draws; and the box covers a real share, so the
// model draws less. Falsified if box+model fabricates MORE than model-only, or
// the box's settled answers are NOT verbatim (a fabrication with a clean face).
//
// Arms, same units, same material, same mouth (gemma2:2b, temperature 0):
//   A  model-only — the mouth answers every unit from the material.
//   B  box+model  — the box settles what it can; the mouth draws the residue.
//
// Metrics (all mechanical):
//   fabrication  figures/names in an answer NOT in the material (restatement.js)
//   coverage     units answered / units asked
//   settle       how many units the box settled (its honest reach)
//   declines     the mouth says "not stated" instead of filling (the honest arm)
import * as prose from "../organs/generation/adapters/prose.mjs";
import { readFileSync } from "node:fs";
import { extractFigures, extractNames } from "/Users/mlacy/Documents/3.0/eoreader7/native/the-fold/restatement.js";
import { buildReferents } from "/Users/mlacy/Documents/3.0/eoreader7/native/the-fold/referents.js";

const MOUTH = "gemma2:2b";
const DOCS = [
  { name: "call-wild", file: "/Users/mlacy/Documents/3.0/eoreader7/native/eval/the-fold/fixtures/call-wild-ch1-excerpt.md" },
  { name: "call-wild", file: "/Users/mlacy/Documents/3.0/eoreader7/native/eval/the-fold/fixtures/call-wild-ch1-excerpt.md" },
  { name: "scotus", file: "/Users/mlacy/Documents/3.0/eoreader7/native/eval/the-fold/fixtures/scotus-oral-argument-excerpt.md" },
  { name: "ukpga", file: "/Users/mlacy/Documents/3.0/eoreader7/native/eval/the-fold/fixtures/ukpga-2017-1.md" },
];
const UNITS_PER_DOC = 3;

async function mouth(text, material) {
  const { doorDraw } = await import("./box-draw.mjs");
  return await doorDraw(`Below are sentences copied from one text.\n\n${material.slice(0, 3000)}\n\nAnswer in one sentence: ${text}`, { model: MOUTH });
}

/** units from the material's own referents: what does the text say about X. */
function unitsFrom(text, k = UNITS_PER_DOC) {
  const R = buildReferents(text);
  const ids = [...(R.index?.referents ?? [])];
  const names = ids.map((id) => R.represent(id)).filter((n) => n && n.length >= 3).slice(0, k);
  return names.map((n) => ({ name: `unit:${n}`, spec: `what does the text say about ${n}` }));
}

const toArr = (x) => (x instanceof Set ? [...x] : Array.isArray(x) ? x : typeof x === "object" && x ? Object.keys(x) : []);
const figOf = (ans, mat) => toArr(extractFigures(ans)).filter((f) => !mat.includes(f));
const nameOf = (ans, mat) => toArr(extractNames(ans)).filter((n) => !mat.includes(n));
const DECLINE = /(does not state|does not say|not stated|not mentioned|doesn't state|no mention)/i;

console.log(`BOX vs MODEL — held-out prose, mouth ${MOUTH}, mechanical scoring\n`);
const summary = [];
for (const doc of DOCS) {
  const material = readFileSync(doc.file, "utf8").replace(/\s+/g, " ").trim().slice(0, 8000);
  const units = unitsFrom(material);
  // ARM B: box settles, model draws the residue
  const ctx = { shadow: new Map([["material", material]]) };
  const afterBox = await prose.computeSettles(units.map((u) => ({ ...u })), {}, ctx);
  // ARM A: model-only on the SAME units
  let A = { ans: [], fab: 0, cov: 0, decl: 0 };
  for (const u of units) {
    const out = await mouth(u.spec, material);
    const fab = figOf(out, material).length + nameOf(out, material).length;
    A.ans.push({ spec: u.spec, out, fab });
    A.fab += fab; A.cov++; if (DECLINE.test(out)) A.decl++;
  }
  let B = { settle: 0, model: 0, fab: 0, cov: 0, decl: 0, ans: [] };
  for (const u of afterBox) {
    if (u.settle) {
      B.settle++; B.cov++;
      // box-settled must be VERBATIM in the material — a fabrication with a clean face is the falsifier.
      // Only a POSITIONAL (clause) settle is the box's honest claim; a recurrence fragment is not a settle.
      const basis = String(u.settle.basis ?? "");
      const e1 = String(u.settle.end1), e2 = String(u.settle.end2);
      const verbatim = material.includes(e1) && material.includes(e2);
      const clean = basis.includes("positional") && verbatim;
      B.fab += clean ? 0 : 1;
      B.ans.push({ spec: u.spec, out: `${e1} ${u.settle.label} ${e2}`, fab: clean ? 0 : 1, box: true, clean });
    } else {
      B.model++; B.cov++;
      const out = await mouth(u.spec, material);
      const fab = figOf(out, material).length + nameOf(out, material).length;
      B.fab += fab; B.ans.push({ spec: u.spec, out, fab }); if (DECLINE.test(out)) B.decl++;
    }
  }
  console.log(`${doc.name}: units ${units.length}`);
  console.log(`  A model-only   fab ${A.fab}  cov ${A.cov}/${units.length}  declines ${A.decl}`);
  console.log(`  B box+model    fab ${B.fab}  cov ${B.cov}/${units.length}  settle ${B.settle}  model-residue ${B.model}  declines ${B.decl}`);
  for (const a of B.ans ?? []) console.log(`     ${a.box ? "BOX " : "MODEL"} ${a.spec.slice(0, 40)}: ${JSON.stringify(a.out.slice(0, 60))} ${a.fab ? `✗fab${a.fab}` : ""}`);
  console.log("");
  summary.push({ doc: doc.name, A: { fab: A.fab, cov: A.cov, decl: A.decl }, B: { fab: B.fab, cov: B.cov, settle: B.settle, model: B.model, decl: B.decl } });
}
const tot = summary.reduce((s, r) => ({ A: { fab: s.A.fab + r.A.fab, cov: s.A.cov + r.A.cov }, B: { fab: s.B.fab + r.B.fab, cov: s.B.cov + r.B.cov, settle: s.B.settle + r.B.settle, model: s.B.model + r.B.model } }), { A: { fab: 0, cov: 0 }, B: { fab: 0, cov: 0, settle: 0, model: 0 } });
console.log("TOTALS");
console.log(`  A model-only   fab ${tot.A.fab}  cov ${tot.A.cov}`);
console.log(`  B box+model    fab ${tot.B.fab}  cov ${tot.B.cov}  box-settled ${tot.B.settle}  model-drawn ${tot.B.model}`);
console.log(`\nVERDICT: ${tot.B.fab <= tot.A.fab ? `SUPPORTED — box+model fabricates ≤ model-only (${tot.B.fab} ≤ ${tot.A.fab}); box-settled ${tot.B.settle} units verbatim by construction` : `FALSIFIED — box+model fabricated MORE (${tot.B.fab} > ${tot.A.fab})`}`);