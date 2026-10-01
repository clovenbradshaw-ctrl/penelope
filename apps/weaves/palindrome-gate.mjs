// palindrome-gate.mjs — the loom's gate for the isPalindrome build (golden
// pairs: the house's gate style, the test decides, never the prose).
// Usage: node palindrome-gate.mjs <path-to-built-module>
import fs from "node:fs";
const file = process.argv[2];
if (!file) { console.error("gate: no module path"); process.exit(1); }
const src = fs.readFileSync(file, "utf8");
const f = new Function(src + "\nreturn { isPalindrome };")();
const cases = [
  ["racecar", f.isPalindrome("racecar") === true],
  ["level", f.isPalindrome("level") === true],
  ["hello", f.isPalindrome("hello") === false],
  ["A man a plan a canal Panama", f.isPalindrome("A man a plan a canal Panama".toLowerCase().replace(/[^a-z]/g, "")) === true],
  ["empty", f.isPalindrome("") === true],
];
let fail = 0;
for (const [name, ok] of cases) { if (!ok) { console.error("FAIL", name); fail++; } else console.log("ok", name); }
process.exit(fail ? 1 : 0);