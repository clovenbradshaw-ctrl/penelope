// clamp-gate.mjs — the loom's gate for the clamp/lerp build (golden pairs:
// the house's gate style, the test decides, never the prose).
// Usage: node clamp-gate.mjs <path-to-built-module>
import fs from "node:fs";
const file = process.argv[2];
if (!file) { console.error("gate: no module path"); process.exit(1); }
const src = fs.readFileSync(file, "utf8");
const f = new Function(src + "\nreturn { clamp, lerp };")();
const eps = 1e-9;
const cases = [
  ["clamp inside", f.clamp(5, 0, 10) === 5],
  ["clamp below", f.clamp(-3, 0, 10) === 0],
  ["clamp above", f.clamp(42, 0, 10) === 10],
  ["clamp edge", f.clamp(10, 0, 10) === 10],
  ["lerp mid", Math.abs(f.lerp(0, 10, 0.5) - 5) < eps],
  ["lerp low", Math.abs(f.lerp(2, 8, 0) - 2) < eps],
  ["lerp high", Math.abs(f.lerp(2, 8, 1) - 8) < eps],
  ["lerp quarter", Math.abs(f.lerp(0, 100, 0.25) - 25) < eps],
];
let fail = 0;
for (const [name, ok] of cases) { if (!ok) { console.error("FAIL", name); fail++; } else console.log("ok", name); }
process.exit(fail ? 1 : 0);