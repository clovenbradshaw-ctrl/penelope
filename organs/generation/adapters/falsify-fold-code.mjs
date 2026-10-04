// organs/generation/adapters/falsify-fold-code.mjs — THE RECORDED RESULT:
// the code fold gate was FALSIFIED and removed from code.mjs.
//
// The claim tested was: a code fold gate would catch a real defect in drawn
// code that node --check and spec-conformance do not. It was run over the REAL
// recorded harness draws, with a null on the bodies that actually went green.
//
// RESULT (2026-10-02, 594 recorded runs, 1047 raw draws, 337 distinct bodies):
//   · the fold gate refused 0 of 337 distinct bodies.
//   · node --check already refused 0 of them (the fold was redundant regardless).
//   · false positives on the 330 bodies that went green: 0.
//   → the gate added nothing on code. It was NOT brought in. The essay fold's
//     re-admission runs where it was derived and falsified — on PROSE.
//
// This file stays as the evidence for that decision and re-runs the null the
// gate would have had: it must fire on nothing, because it caught nothing.
//
//   node organs/generation/adapters/falsify-fold-code.mjs
import { readdirSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { writeTmp } from "../engine.mjs";

const RESULTS = new URL("../../../../eoreader7/native/eval/the-fold/results/", import.meta.url);
const files = readdirSync(RESULTS).filter((f) => f.startsWith("harness-rounds-") && f.endsWith(".json"));

// The gate's two rules, reproduced here as the FALSIFIER's own predicate (the
// gate is gone from code.mjs; this is the claim under test, standalone).
const metaLike = /as an ai|language model|the user (requested|asked)|i (will|am going to|have)|here'?s the|the (implementation|following code)/i;
function foldGateWouldRefuse(code) {
  const text = String(code ?? "");
  for (const ln of text.split("\n")) {
    const m = /(?:^|\/\/|#|\/\*)\s*(.+?)(?:\*\/)?\s*$/.exec(ln);
    const s = (m?.[1] ?? "").trim();
    if (s.split(/\s+/).length >= 3 && /[a-z]/.test(s) && metaLike.test(s)) return "fold_apparatus";
  }
  if (/\(\s*the source\s*\)|\bARG0\b|\(the claim\)/.test(text)) return "fold_rendered";
  return null;
}
const syntaxOk = (code) => { try { execSync(`node --check ${JSON.stringify(writeTmp(code))}`, { stdio: "pipe" }); return true; } catch { return false; } };

let draws = 0, refused = 0, refusedSyntaxClean = 0, greenRefused = 0, greenClean = 0;
const unique = new Map();
for (const f of files) {
  let r; try { r = JSON.parse(readFileSync(new URL(f, RESULTS), "utf8")); } catch { continue; }
  const rounds = Array.isArray(r) ? r : r.rounds || [];
  for (const x of rounds) {
    if (!x.add) continue;
    draws += 1;
    if (!unique.has(x.add)) unique.set(x.add, x.add);
    if (x.testExitCode === 0) { greenClean += 1; if (foldGateWouldRefuse(x.add)) greenRefused += 1; }
  }
}
for (const add of unique.values()) {
  const reason = foldGateWouldRefuse(add);
  if (reason) { refused += 1; if (syntaxOk(add)) refusedSyntaxClean += 1; }
}
const total = unique.size;
console.log(`\n── FALSIFY THE CODE FOLD GATE (recorded result) ──`);
console.log(`recorded runs: ${files.length}  ·  raw draws: ${draws}  ·  distinct bodies: ${total}`);
console.log(`gate would refuse: ${refused} of ${total} (${(100 * refused / Math.max(1, total)).toFixed(1)}%)`);
console.log(`  uniquely beyond node --check: ${refusedSyntaxClean}`);
console.log(`  false positives on green bodies (${greenClean}): ${greenRefused}`);
const falsified = refusedSyntaxClean === 0 || greenRefused > 0;
console.log(`\nVERDICT: ${falsified
  ? `FALSIFIED — ${refusedSyntaxClean} unique catch beyond node --check${greenRefused ? `, ${greenRefused} false positive(s)` : ""}. The code fold gate was NOT brought in; the fold runs where it was derived and falsified — on prose (falsify-fold-prose.mjs).`
  : `SUPPORTED — ${refusedSyntaxClean} unique catches, no false positives; the gate would have earned its slot.`}`);
process.exit(falsified ? 1 : 0);
