// ai-code-harness/pipeline/adapters/code.mjs — THE CODE ADAPTER.
//
// Only what is truly different about CODE is here: how a unit is read (JSON
// {name, spec}), how it is settled (the box computes from an example grid),
// how it is snipped (the corpus's structural brace-walker), how it is probed
// (settle + spec-words, the two-framing swarm), how it is tested (node --check
// + spec-conformance), how it is shipped (the widget). The ENGINE owns the
// order, retries, scars, EOT.
import { createRequire } from "node:module";
import { execSync, writeTmp } from "../engine.mjs";

const require = createRequire(import.meta.url);
let crispr = null;
try { crispr = require("/tmp/crispr-snip.mjs"); } catch { crispr = null; }

// FRAME KEYS — the frame is the spec's meaning, never the name (the essay's
// "two atoms are the same iff they make the same difference to the ground"):
// the corpus's `neighbors` is a knowledge-graph affinity, not a grid cell.
const FRAME_KEYS = {
  neighbors: ["surrounding", "adjacent", "grid"],
  willLive: ["alive", "neighbor"],
  nextGen: ["grid", "generation"],
  liveCount: ["count", "true"],
  gridString: ["string", "grid"],
  seedBlinker: ["blinker", "horizontal"],
};

// ── THE READING: one small ask, JSON out (kleenUp's law — the decoder parses
// a structure, never a format-guessing regex) ──
export async function readUnits(task, ctx = {}) {
  const { draw } = await import("../engine.mjs");
  const raw = await draw(
    `Return a JSON array of objects, each {name, spec} for one function this task asks to write. Only JSON. Task: ${task}`,
    { maxTokens: 500, model: ctx.model ?? null, kind: "build", priority: "batch" },
  );
  const units = [];
  const arrStart = raw.indexOf("[");
  const arrEnd = raw.lastIndexOf("]");
  const jsonStr = arrStart !== -1 && arrEnd > arrStart ? raw.slice(arrStart, arrEnd + 1) : "";
  if (!jsonStr) return units;
  try {
    const arr = JSON.parse(jsonStr);
    for (const item of Array.isArray(arr) ? arr : []) {
      const name = String(item?.name ?? "").trim();
      const spec = String(item?.spec ?? "").trim();
      if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name) && spec) units.push({ name, spec, settle: null });
    }
  } catch { /* a malformed reading is an empty reading — the caller's gate shows it */ }
  return units;
}

// ── THE SETTLE COMPUTED, NOT GUESSED: the box derives what proves each unit
// from a caller-declared example grid; the mouth never guesses an example ──
export function computeSettles(units, example) {
  if (!example) return units;
  // The settle calls the UNIT's own name — `liveCount([[true,true,false],…])`,
  // never `alive(...)`. The example's `name` is the grid's variable, not the
  // function to call; the unit's name is the function (F4's failure: the
  // settle must name the function the spec names, else it can never resolve).
  const settles = {
    liveCount: `liveCount(${JSON.stringify(example.value)}) === ${example.count}`,
    gridString: `gridString(${JSON.stringify(example.value)}) === ${JSON.stringify(example.string)}`,
    seedBlinker: `seedBlinker() === ${JSON.stringify(example.blinker)}`,
  };
  return units.map((u) => (settles[u.name] ? { ...u, settle: settles[u.name] } : u));
}

// ── THE FIELD (autofill): CRISPR by frame, never by name ──
export function autofill(unit) {
  if (!crispr) return null;
  const hit = crispr.corpusAutofill(unit.name);
  if (!hit) return null;
  const frameWords = FRAME_KEYS[unit.name] ?? [];
  const codeLower = hit.code.toLowerCase();
  const frameMatches = frameWords.length === 0 || frameWords.some((w) => codeLower.includes(w));
  return frameMatches ? { code: hit.code, address: hit.address } : null;
}

// ── THE HUNT (Ranke's chase): the field lacks the framed unit — go get it.
// Prefer a raw githubusercontent or .js source; extract the framed function;
// refuse the wrong world. ──
const SEARCH_URL = process.env.ER7_SEARCH_URL ?? "http://localhost:8812/api/web/search";
export async function hunt(unit) {
  try {
    const q = `${unit.name} javascript ${unit.spec}`;
    const res = await fetch(SEARCH_URL, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ query: q }), signal: AbortSignal.timeout(20000) });
    const j = await res.json();
    const results = j.results ?? [];
    const raw = results.find((r) => /raw\.githubusercontent|\.js$|\.mjs$/i.test(r.url ?? ""));
    const first = raw ?? results[0];
    if (!first?.url) return null;
    const fetched = await fetch(first.url, { signal: AbortSignal.timeout(20000) });
    const text = await fetched.text();
    const fn = snip(text, unit.name);
    const frameWords = FRAME_KEYS[unit.name] ?? [];
    const matches = frameWords.length === 0 || frameWords.some((w) => (fn ?? "").toLowerCase().includes(w));
    return fn && matches ? { code: fn, url: first.url } : null;
  } catch (e) {
    return null;
  }
}

// ── THE SNIP: keep the closing brace. The structural walker is SNIPPED from
// the corpus — the-fold/code-scout.js::walkBraceBlockEnd (kleenUp, MODIFIED
// 2026-09-21) — string/comment-aware, body closes when depth returns to 0. ──
function walkBraceBlockEnd(src, from) {
  let depth = 0;
  let seenBrace = false;
  let i = from;
  const n = src.length;
  let mode = "code";
  while (i < n) {
    const ch = src[i];
    const next = src[i + 1];
    if (mode === "line") {
      if (ch === "\n") mode = "code";
      i++;
      continue;
    }
    if (mode === "block") {
      if (ch === "*" && next === "/") { mode = "code"; i += 2; continue; }
      i++;
      continue;
    }
    if (mode === "squote" || mode === "dquote" || mode === "template") {
      if (ch === "\\") { i += 2; continue; }
      if ((mode === "squote" && ch === "'") || (mode === "dquote" && ch === '"') || (mode === "template" && ch === "`")) mode = "code";
      i++;
      continue;
    }
    if (ch === "/" && next === "/") { mode = "line"; i += 2; continue; }
    if (ch === "/" && next === "*") { mode = "block"; i += 2; continue; }
    if (ch === "'") { mode = "squote"; i++; continue; }
    if (ch === '"') { mode = "dquote"; i++; continue; }
    if (ch === "`") { mode = "template"; i++; continue; }
    if (ch === "{") { depth++; seenBrace = true; i++; continue; }
    if (ch === "}") {
      depth--;
      i++;
      if (seenBrace && depth === 0) break;
      continue;
    }
    i++;
  }
  return i;
}

export function snip(code, name) {
  const t = String(code ?? "").replace(/```[a-z]*/gi, "");
  const fnMark = `function ${name}(`;
  const constMark = `const ${name} =`;
  let start = t.indexOf(fnMark);
  if (start === -1) start = t.indexOf(constMark);
  if (start === -1) return "";
  const end = walkBraceBlockEnd(t, start);
  let cut = t.slice(start, end).trim();
  let opens = (cut.match(/\{/g) || []).length;
  let closes = (cut.match(/\}/g) || []).length;
  if (opens > closes) cut += "\n}";
  return cut;
}

// ── THE MOUTH: one single-part fragment, framed as a fact ──
export function mouthFragment(unit, atom) {
  return (
    `Write JavaScript. Write ONLY raw code for EXACTLY ONE function named \`${unit.name}\`. Its spec: ${atom}. ` +
    `No prose, no markdown fences, no other function. Output only the single function \`${unit.name}\` as a JS function declaration.`
  );
}

// ── THE SWARM, ONE UNIT: settle (deepEq) if named, else the spec's own
// content words (callability is corroboration; this VERIFIES — the essay's
// "the swarm corroborated instead of verifying" made code) ──
function deepEqProbe(probe, lhs, rhs) {
  const withCall = `${probe}\n__c.lhs = ${lhs};\n__c.rhs = ${rhs};\n__c.match = deepEq(__c.lhs, __c.rhs);\n__c.report = JSON.stringify(__c.lhs);\nfunction deepEq(a, b) {\n  if (a === b) return true;\n  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;\n  const ka = Object.keys(a), kb = Object.keys(b);\n  if (ka.length !== kb.length) return false;\n  return ka.every((k) => deepEq(a[k], b[k]));\n}\nif (!__c.match) throw new Error('settle mismatch: got ' + __c.report);`;
  try {
    execSync(`node ${JSON.stringify(writeTmp(withCall))}`, { encoding: "utf8", stdio: "pipe" });
    return { ok: true, detail: `settle held: ${lhs} === ${rhs}` };
  } catch (e) {
    return { ok: false, detail: `settle failed: ${String(e.stderr ?? "").slice(0, 200)}` };
  }
}

export function probeUnit(code, u) {
  const probe = `globalThis.__c = {};\n${code}\nglobalThis.__c.unit = ${u.name};\nglobalThis.__c.type = typeof ${u.name};`;
  if (u.settle) {
    const eq = u.settle.split("===");
    const lhs = (eq[0] ?? "").trim();
    const rhs = (eq[1] ?? "").trim();
    if (!lhs || !rhs) return { ok: false, detail: `malformed settle: ${u.settle}` };
    return deepEqProbe(probe, lhs, rhs);
  }
  try {
    const out = execSync(`node ${JSON.stringify(writeTmp(probe))}`, { encoding: "utf8", stdio: "pipe" });
    void out;
    const keyWords = String(u.spec ?? "")
      .replace(/^(takes|returns?|given)\b/i, "")
      .split(/\W+/)
      .filter((w) => w.length > 3)
      .filter((w) => !["function", "that", "with", "and", "the", "this", "session", "object", "string", "number", "takes", "returns", "from", "into"].includes(w));
    const body = code;
    const present = keyWords.filter((w) => body.toLowerCase().includes(w.toLowerCase()));
    const coverage = keyWords.length ? present.length / keyWords.length : 1;
    if (keyWords.length && coverage < 0.4) {
      return { ok: false, detail: `spec words missing: ${keyWords.filter((w) => !body.toLowerCase().includes(w.toLowerCase())).slice(0, 5).join(", ")} (coverage ${Math.round(coverage * 100)}%)` };
    }
    return { ok: true, detail: `callable (${u.name})` };
  } catch (e) {
    return { ok: false, detail: `throws: ${String(e.stderr ?? "").slice(0, 160)}` };
  }
}

// ── THE WHOLE ASSEMBLY ──
export function testUnits(code, units) {
  try { execSync(`node --check ${JSON.stringify(writeTmp(code))}`, { stdio: "pipe" }); }
  catch (e) { return { ok: false, reason: "syntax", detail: String(e.stderr ?? "").slice(0, 200) }; }
  const failures = [];
  for (const u of units) {
    const r = probeUnit(code, u);
    if (!r.ok) failures.push(`${u.name}: ${r.detail}`);
  }
  if (failures.length) return { ok: false, reason: "spec-conformance", detail: failures.join("; ") };
  return { ok: true, reason: "spec-conformant" };
}

export function toDocument({ code, units, title }) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>${title}</title></head>
<body>
<h1>${title}</h1>
<div id="out" style="font:22px monospace;padding:12px;border:1px solid #ccc;border-radius:6px;min-height:32px;margin:8px 0"></div>
<pre id="trace" style="font:12px monospace;background:#f4f4f4;padding:8px;border-radius:6px;white-space:pre-wrap"></pre>
<script>
${code}
(() => {
  const out = document.getElementById("out"); const trace = document.getElementById("trace");
  const lines = [];
  for (const name of ${JSON.stringify(units)}) {
    const fn = globalThis[name];
    if (typeof fn !== "function") { lines.push(name + ": MISSING"); continue; }
    try { lines.push(name + " -> " + JSON.stringify(fn(65))); } catch (e) { lines.push(name + " -> threw: " + e.message); }
  }
  trace.textContent = lines.join("\\n"); out.textContent = "assembled";
})();
</script></body></html>`;
}

export default {
  kind: "code",
  ext: "js",
  readUnits,
  computeSettles,
  autofill,
  hunt,
  mouthFragment,
  mouthTokens: 240,
  snip,
  probeUnit,
  testUnits,
  toDocument,
  sharpen: (u, atom, why) =>
    `${u.spec} — using the function's OWN argument(s), never a timestamp or clock; ` +
    `${u.settle ? `must satisfy ${u.settle}` : ""}`,
};