// slugify-gate.mjs — the loom's gate for the slugify/countWords build (golden
// pairs, the house's gate style: the test decides, never the prose).
// Usage: node slugify-gate.mjs <path-to-built-module>
import fs from "node:fs";
const file = process.argv[2];
if (!file) { console.error("gate: no module path"); process.exit(1); }
const src = fs.readFileSync(file, "utf8");
const f = new Function(src + "\nreturn { slugify, countWords };")();
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const cases = [
  ["slugify('Hello, World!')", f.slugify("Hello, World!"), "hello-world"],
  ["slugify('  A  B  ')  ", f.slugify("  A  B  "), "a-b"],
  ["slugify('Already-Kebab')", f.slugify("Already-Kebab"), "already-kebab"],
  ["slugify('under_score')", f.slugify("under_score"), "under-score"],
  ["countWords('the quick brown fox')", f.countWords("the quick brown fox"), 4],
  ["countWords('   ')  ", f.countWords("   "), 0],
  ["countWords('a   b')  ", f.countWords("a   b"), 2],
];
let bad = 0;
for (const [name, got, want] of cases) {
  const ok = eq(got, want);
  if (!ok) { bad += 1; console.error("GATE-FAIL", name, "got", JSON.stringify(got), "want", JSON.stringify(want)); }
}
if (bad) { console.error(bad + " gate failures"); process.exit(1); }
console.log("gate: 7/7 golden pairs hold");