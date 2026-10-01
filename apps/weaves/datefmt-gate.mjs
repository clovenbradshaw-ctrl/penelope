// datefmt-gate.mjs — the loom's gate for the engine build (golden pairs,
// the house's gate style: the test decides, never the prose).
// Usage: node datefmt-gate.mjs <path-to-built-module>
import fs from "node:fs";
const file = process.argv[2];
if (!file) { console.error("gate: no module path"); process.exit(1); }
const src = fs.readFileSync(file, "utf8");
const f = new Function(src + "\nreturn { parseDate, fmtDuration };")();
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const cases = [
  ["parseDate('2026-10-06')", f.parseDate("2026-10-06"), { y: 2026, m: 10, d: 6 }],
  ["parseDate('nope')", f.parseDate("nope"), null],
  ["parseDate('2026-1-6')", f.parseDate("2026-1-6"), null],
  ["fmtDuration(93784000)", f.fmtDuration(93784000), "1d 2h 3m 4s"],
  ["fmtDuration(0)", f.fmtDuration(0), "0s"],
  ["fmtDuration(65000)", f.fmtDuration(65000), "1m 5s"],
];
let bad = 0;
for (const [name, got, want] of cases) {
  const ok = eq(got, want);
  if (!ok) { bad += 1; console.error("GATE-FAIL", name, "got", JSON.stringify(got), "want", JSON.stringify(want)); }
}
if (bad) { console.error(bad + " gate failures"); process.exit(1); }
console.log("gate: 6/6 golden pairs hold");