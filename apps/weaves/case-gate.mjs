// case-gate.mjs — the loom's gate for the toCamelCase/toSnakeCase build
// (golden pairs: the house's gate style, the test decides, never the prose).
// Usage: node case-gate.mjs <path-to-built-module>
import fs from "node:fs";
const file = process.argv[2];
if (!file) { console.error("gate: no module path"); process.exit(1); }
const src = fs.readFileSync(file, "utf8");
const f = new Function(src + "\nreturn { toCamelCase, toSnakeCase };")();
const cases = [
  ["camel space", f.toCamelCase("hello world") === "helloWorld"],
  ["camel snake", f.toCamelCase("snake_case_text") === "snakeCaseText"],
  ["camel dash", f.toCamelCase("foo-bar-baz") === "fooBarBaz"],
  ["camel already", f.toCamelCase("alreadyCamel") === "alreadyCamel"],
  ["camel empty", f.toCamelCase("") === ""],
  ["snake camel", f.toSnakeCase("helloWorld") === "hello_world"],
  ["snake camel2", f.toSnakeCase("fooBarBaz") === "foo_bar_baz"],
  ["snake space", f.toSnakeCase("hello world") === "hello_world"],
  ["snake already", f.toSnakeCase("already_snake") === "already_snake"],
  ["snake empty", f.toSnakeCase("") === ""],
];
let fail = 0;
for (const [name, ok] of cases) { if (!ok) { console.error("FAIL", name); fail++; } else console.log("ok", name); }
process.exit(fail ? 1 : 0);