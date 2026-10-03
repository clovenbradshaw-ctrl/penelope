// gym/falsify-text-refine.mjs — FALSIFY THE UNIVERSAL REFINEMENT ON TEXT.
//
// The code tier proved the refinement general (falsify-void-refine.mjs, 4/4).
// The harder claim: it is not CODE-specific. Text production has no crisp
// assert — its "test" is the essay BARS (organs/essay-void.mjs: voice,
// grounded, houses). This runs the SAME universal organ (organs/void-refine.mjs)
// with the bars as the judge and a repertoire of text transforms, on a passage
// that fails every bar. FALSIFIED if it does not converge to a bar-passing
// passage by transforms in the cube's operator order.
//
//   node gym/falsify-text-refine.mjs
import { refine, legal, OP_ORDER } from "../organs/void-refine.mjs";
import { BARS } from "../organs/essay-void.mjs";

// ── THE JUDGE: the essay bars, naming which one failed. This is the "real
// test" for text — mechanical, no model (the same BARS the closing loop uses). ──
function judge(text) {
  if (!BARS.voice(text)) return { ok: false, failure: "voice" };
  if (!BARS.grounded(text)) return { ok: false, failure: "grounded" };
  if (!BARS.houses(text)) return { ok: false, failure: "houses" };
  return { ok: true };
}

// ── THE TEXT TRANSFORMS: each serves a void operator and MOVES the state. The
// pipeline builds in the cube's order SIG → INS → SEG → CON. ──
const TRANSFORMS = [
  { name: "strip_meta", op: "SIG", deps: [], answers: (f) => f === "voice",
    apply: (t) => t.split(/(?<=[.!?])\s+/).filter((s) => !/(this (passage|essay|section|piece)|explores|discusses|highlights)/i.test(s)).join(" ").trim() },
  { name: "house", op: "INS", deps: ["SIG"], answers: (f) => f === "houses",
    apply: (t) => t.replace(/\bthe region\b/gi, "the fold").replace(/\bthe river\b/gi, "the Cumberland River") },
  { name: "scope", op: "SEG", deps: ["SIG"], answers: (f) => f === "scope",
    apply: (t) => t.split(/(?<=[.!?])\s+/).filter((s) => !/weather|mild/i.test(s)).join(" ").trim() },
  { name: "ground", op: "CON", deps: ["SIG", "SEG"], answers: (f) => f === "grounded",
    apply: (t) => `${t.replace(/\.$/, "")} ⟦fold@0⟧.` },
];

const START = "This passage explores the vital story. It was important to the region. The weather was also mild that day.";

console.log(`\n── FALSIFY: THE UNIVERSAL REFINEMENT ON TEXT ──\n`);
console.log(`START: ${JSON.stringify(START)}`);
console.log(`bars: voice=${BARS.voice(START)} grounded=${BARS.grounded(START)} houses=${BARS.houses(START)}\n`);

const r = refine({ start: START, transforms: TRANSFORMS, judge, maxSteps: 8 });

console.log(`steps: ${r.steps}`);
console.log(`sequence: ${r.seq.join(" → ") || "(none)"}`);
if (r.refused.length) console.log(`illegal moves refused: ${r.refused.map((x) => `${x.name} needs ${x.missing.join(",")}`).join("; ")}`);
console.log(`RESULT state: ${JSON.stringify(r.state)}`);
console.log(`bars now: voice=${BARS.voice(r.state)} grounded=${BARS.grounded(r.state)} houses=${BARS.houses(r.state)}`);

// the illegal-move probe on TEXT: declare CON (ground) with only SIG declared
const groundT = TRANSFORMS.find((t) => t.op === "CON");
const illegal = legal(groundT, new Set(["SIG", "INS"]));
console.log(`\nILLEGAL-MOVE PROBE (text): declare CON (grounding) with only {SIG, INS} declared → ${illegal.ok ? "ALLOWED (bug)" : `REFUSED, missing ${illegal.missing.join(", ")}`}`);

console.log(`\nVERDICT: ${r.ok
  ? `SURVIVES ON TEXT — the universal refinement converged to a bar-passing passage (${r.seq.join(" → ")}), same organ as code, no model.`
  : `FALSIFIED ON TEXT — did not converge (${r.reason}).`}`);
process.exit(r.ok ? 0 : 1);
