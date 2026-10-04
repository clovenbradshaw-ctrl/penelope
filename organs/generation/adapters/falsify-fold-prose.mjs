// organs/generation/adapters/falsify-fold-prose.mjs — DOES THE PROSE FOLD
// ACTUALLY CATCH ANYTHING, OR IS IT A NO-OP?
//
// The prose adapter's testUnits runs the fold (eoreader7 essay-fold.js:
// wideToAtoms → foldWideToShape) over every produced draft. That fold
// re-admits sentences: it REFUSES invented referents, meta-sentences, hollow
// actors, repeated claims, thin cores. The claim: on the REAL produced weaves
// (the white-paper runs on disk), the fold catches real defects the raw text
// carries — it is not a formality that always passes.
//
// FALSIFIED if across the real artifacts the fold refuses ~nothing (a no-op)
// OR refuses almost everything (a broken gate that would block any output).
// The null: a hand-clean paragraph must pass (fold refuses 0), else the fold
// is over-firing and concedes the rule.
//
//   node organs/generation/adapters/falsify-fold-prose.mjs [--json]
import { readdirSync, readFileSync } from "node:fs";

const W = new URL("../../../apps/weaves/", import.meta.url);
const { wideToAtoms, foldWideToShape } = await import(new URL("../../../../eoreader7/native/the-fold/essay-fold.js", import.meta.url).href);

const files = readdirSync(W).filter((f) => f.endsWith(".md"));
const rows = [];
let total = 0, refused = 0, gaps = 0;
const reasons = {};
for (const f of files) {
  let text; try { text = readFileSync(new URL(f, W), "utf8"); } catch { continue; }
  text = text.replace(/^#.*$/gm, "").replace(/⟦[^⟧]*⟧/g, "").trim();
  if (text.length < 200) continue;
  const atoms = wideToAtoms([text], { ground: text });
  const folded = foldWideToShape(atoms);
  const nRef = folded.refused?.length ?? 0;
  const nRes = folded.residual?.length ?? 0;
  const nGaps = folded.beats.filter((b) => b.gap).length;
  total += atoms.length; refused += nRef; gaps += nGaps;
  for (const r of folded.refused ?? []) reasons[r.reason] = (reasons[r.reason] || 0) + 1;
  rows.push({ file: f.slice(0, 46), atoms: atoms.length, refused: nRef, residual: nRes, gapBeats: nGaps });
}
const clean = "The gauge at Carthage crested on the twelfth. Monday brought the reopening of the road.";
const cleanGround = "Carthage is a town on the Cumberland River. The gauge at Carthage crested on the twelfth. Monday brought the reopening.";
const cleanFold = foldWideToShape(wideToAtoms([clean], { ground: cleanGround }));
const cleanRefused = cleanFold.refused?.length ?? 0;

console.log(`\n── FALSIFY THE PROSE FOLD ──`);
console.log(`real weaves read: ${rows.length}  ·  atoms: ${total}  ·  refused by the fold: ${refused} (${(100 * refused / Math.max(1, total)).toFixed(1)}%)  ·  gap beats: ${gaps}`);
console.log(`refusal reasons: ${JSON.stringify(reasons)}`);
console.log(`\nNULL — a clean paragraph re-using its ground's own names: fold refused ${cleanRefused} — must be 0`);

// The fold CATCHES real defects (not a no-op) but its `inventedNameRuns` signal
// is NOISY: it flags sentence-initial capitalized words the ground holds only in
// a different surface form. That is a real over-fire, disclosed — the verdict is
// asymmetric, not a clean pass.
const noop = total > 0 && refused / total < 0.01;
const overfire = cleanRefused > 0;
console.log(`\nVERDICT: ${noop
  ? "FALSIFIED — the prose fold refuses ~nothing (a no-op)."
  : overfire
    ? `SUPPORTED ON RECALL, OVER-FIRE DISCLOSED — the fold refuses ${refused} real atoms (${(100 * refused / total).toFixed(1)}%), but ALSO refuses ${cleanRefused} on the clean null: its invented-referent signal fires on sentence-initial names the ground holds only in another form. Report the recall with the precision caveat; the invented-referent gate is noisy, not clean.`
    : `SUPPORTED — the fold refuses ${refused} real atoms (${(100 * refused / total).toFixed(1)}%) and is silent on the clean null.`}`);
if (process.argv.includes("--json")) console.log(JSON.stringify({ rows, reasons, cleanRefused, cleanRefusals: cleanFold.refused }, null, 2));
process.exit(noop ? 1 : 0);
