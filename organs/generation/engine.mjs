#!/usr/bin/env node
// ai-code-harness/pipeline/engine.mjs — THE ARRANGEMENT, DOMAIN-SHARED.
//
// The cross-domain law (recorded 2026-09-21, in the content-rules ledger):
//   MOUTH-LAST — the mouth draws only irreducible residue. The field
//                (corpus) remembers first, the hunt goes and gets second,
//                and the mouth is asked only for what neither had.
//   HUNT-FIRST — a draw that fails twice is a hunt problem, not a redraw
//                problem. Iterating the mouth is the ant-loop wall; going
//                out and getting the thing is Ranke's chase.
//   MULTIPLE-FRAMINGS — no unit is proven by one reading. The swarm reads
//                literal + structural + adversarial (code: settle + spec
//                words + frame check; prose: invented-referent + meta +
//                hollow-actor). Meaning is what survives the contention.
//   FALSIFY-OR-DIE — every artifact carries its dissent: the scars, the
//                refusals, the non-convergence. Never report a confident
//                meaning over a swarm that did not converge.
//
// The pipeline is ONE engine. What differs by domain — how a unit is READ,
// SNIPPED, PROBED, TESTED, and SHIPPED — is pulled out into an adapter:
//
//   adapter = {
//     kind: "code" | "prose",
//     readUnits(task, args)        -> [{ name, spec, settle? }]
//     computeSettles(units, ex)    -> units (the box settles, never the mouth)
//     autofill(unit)               -> { code, address } | null  (the field)
//     hunt(unit)                   -> { code, url } | null       (the chase)
//     mouthFragment(unit, atom)    -> prompt (single-part, framed)
//     snip(code, name)             -> cut (structural, keeps the close)
//     probeUnit(code, unit)        -> { ok, detail }  (the swarm, one unit)
//     testUnits(code, units)       -> { ok, reason, detail }  (the whole)
//     toDocument({code, units, title}) -> html  (the product)
//   }
//
// The engine owns the ORDER, the RETRIES, the SCARS, the EOT, the FILES.
//
// TWO ADDITIONS, wired 2026-10-02 (GL-EN-17):
//   THE FAN-OUT — the fill runs across units only when the adapter declares
//   them independent (`adapter.independent`), bounded by the mouth's own
//   house family cap when the mouth is the draw entry (organs/mouth.mjs
//   HOUSE — the measured number, never invented); without the mouth it stays
//   the serial twin (one local mouth = one job at a time; a dependent chain
//   cannot be parallelized — GL-CD-07).
//   THE TRACE — every fill/scar/gap/draw emits a deterministic event as it
//   happens: one human line, one NDJSON row, zero model calls. The trace's
//   falsifier is reconcile: its per-source byte totals must equal the EOT
//   provenance, or it is decoration and says so loudly.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
// THE UNIVERSAL REFINEMENT (organs/void-refine.mjs): when the test fails, the
// void is refined under the REAL judge, in the cube's operator order — a
// transform the judge's failure implies, illegal moves refused. Domain-agnostic
// (falsified general: 4/4 code tasks; survives on text via the essay bars).
import { refine } from "../../organs/void-refine.mjs";

export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const OLLAMA = process.env.ER7_OLLAMA_URL ?? "http://localhost:11434";
export const MODEL = process.env.ER7_BUILD_MODEL ?? "qwen2.5-coder:1.5b";
export const SEARCH_URL = process.env.ER7_SEARCH_URL ?? "http://localhost:8812/api/web/search";
// The mouth is the only draw entry (GL-RR-04/05): when PENELOPE_MOUTH_URL is
// set, a draw enters her admission and kind→wire routing first — identity and
// kind ride, a 429 defers on the retry-after — and she directs the bridge.
// Unset, this file stays the domain-shared ai-code-harness engine it is (the
// twin byte-identical twin in ai-code-harness/pipeline/engine.mjs).
const MOUTH_URL = String(process.env.PENELOPE_MOUTH_URL ?? "").replace(/\/+$/, "");
const MOUTH_IDENTITY = MOUTH_URL ? { "x-er7-user": "penelope", "x-er7-caller": "penelope-engine", "x-er7-kind": "code", "x-er7-priority": "batch" } : null;

// ── THE TRACE — the run's own record, deterministic and model-free. Every
// event is a fact the engine already holds (provenance, attempt outcomes);
// the human line prints as it happens, the NDJSON sink is the same event.
// ──
export const TRACE_SCHEMA = "GenerationTrace@1";
const shortAddr = (s) => String(s ?? "").replace(/^.*\//, "").slice(0, 48);

function humanTrace(e) {
  switch (e.event) {
    case "run": return `  ── trace ${e.run} · kind ${e.kind} · parallelism ${e.parallelism} · mouth ${e.mouth}`;
    case "field": return `  · unit ${e.unit} ← field (corpus@${shortAddr(e.address)}, ${e.bytes} B)`;
    case "hunt": return `  · unit ${e.unit} ← hunt (${String(e.url ?? "").slice(0, 72)}, ${e.bytes} B)`;
    case "mouth:draw": return `  · unit ${e.unit} — mouth draw ${e.attempt}: ${String(e.atom ?? "").slice(0, 80)}`;
    case "mouth": return `  · unit ${e.unit} ← mouth (draw ${e.attempt}, ${e.bytes} B)`;
    case "scar": return `  ✗ unit ${e.unit} — attempt ${e.attempt}: ${e.why}`;
    case "gap": return `  ○ unit ${e.unit} — named gap: nothing satisfied it after ${e.attempts} draw(s)`;
    case "test": return `  test:   ${e.reason}${e.ok ? "" : " — " + e.detail}`;
    case "council": return `  · council: ${e.ok === true ? "arrived" : e.ok === false ? `${e.findings} finding(s)` : "gap"} (${e.fired} fired)`;
    case "product": return `  product: ${e.widget} · folded ${e.bytes} B`;
    case "trace": return `  · trace ${e.ok ? "reconciled" : "RECONCILE FAILED"}: ${e.detail}`;
    default: return `  · ${e.event}${e.detail ? `: ${e.detail}` : ""}`;
  }
}

export function makeTrace({ run = "arrangement", printer = console.log, sink = null } = {}) {
  const events = [];
  let fd = null;
  if (sink) {
    fs.mkdirSync(path.dirname(sink), { recursive: true });
    fd = fs.openSync(sink, "a");
  }
  const event = (name, data = {}) => {
    const e = { schema: TRACE_SCHEMA, ts: new Date().toISOString(), run, event: name, ...data };
    events.push(e);
    if (fd !== null) { try { fs.writeSync(fd, JSON.stringify(e) + "\n"); } catch (x) { console.error(`[trace] sink write failed: ${x.message}`); } }
    if (printer) printer(humanTrace(e));
    return e;
  };
  const close = () => { if (fd !== null) { try { fs.closeSync(fd); } catch { /* already closed */ } fd = null; } };
  return { schema: TRACE_SCHEMA, run, events, event, close };
}

// ── RECONCILE — the trace's falsifier (GL-EN-17): every EOT provenance row
// must appear in the trace with the same source and byte count, and the
// per-source byte totals must agree. A pretty trace that cannot be
// reconciled is lying. ──
export function reconcileTrace(events, provenance) {
  const rows = (events ?? []).filter((e) => e.event === "field" || e.event === "hunt" || e.event === "mouth");
  const missing = [];
  for (const p of provenance ?? []) {
    const hit = rows.some((e) => e.source === p.source && e.unit === p.unit && Number(e.bytes) === Number(p.bytes));
    if (!hit) missing.push(`${p.unit} (${p.source}, ${p.bytes} B)`);
  }
  const total = (list) => list.reduce((a, x) => { const s = x.source; a[s] = (a[s] ?? 0) + (Number(x.bytes) || 0); return a; }, {});
  const t = total(rows), p = total(provenance ?? []);
  const drift = Object.keys({ ...t, ...p }).filter((s) => (t[s] ?? 0) !== (p[s] ?? 0)).map((s) => `${s}: trace ${t[s] ?? 0} ≠ eot ${p[s] ?? 0}`);
  const ok = missing.length === 0 && drift.length === 0;
  const detail = ok
    ? `trace reconciles: ${rows.length} row(s), ${Object.entries(p).map(([s, b]) => `${s} ${b} B`).join(", ")}`
    : [missing.length ? `missing: ${missing.join("; ")}` : null, drift.length ? `drift: ${drift.join("; ")}` : null].filter(Boolean).join(" · ");
  return { ok, detail };
}

export function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a.startsWith("--")) { const n = argv[i + 1]; out[a.slice(2)] = n !== undefined && !n.startsWith("--") ? (i += 1, n) : true; }
    else out._.push(a);
  }
  return out;
}

// ── THE MOUTH: one small, framed ask; retried; never steered (small-model
// law — the prompt is a completion anchor, the test decides) ──
export async function draw(prompt, { maxTokens = 240, retries = 4, model = null } = {}) {
  const url = MOUTH_URL ? `${MOUTH_URL}/api/generate` : `${OLLAMA}/api/generate`;
  const headers = MOUTH_URL ? { "content-type": "application/json", ...MOUTH_IDENTITY } : { "content-type": "application/json" };
  const body = JSON.stringify({ model: model ?? MODEL, prompt, stream: false, options: { num_predict: maxTokens, temperature: 0 } });
  for (let a = 0; a < retries; a += 1) {
    try {
      const r = await fetch(url, { method: "POST", headers, body, signal: AbortSignal.timeout(120000) });
      if (r.status === 429 && MOUTH_URL) {
        // the mouth refused the ration — defer on the retry-after, never spin
        const wait = Math.min(60000, (Number(r.headers.get("retry-after")) || 5) * 1000);
        await new Promise((res) => setTimeout(res, wait));
        continue;
      }
      const j = await r.json();
      return j.response ?? "";
    } catch (e) {
      await new Promise((r) => setTimeout(r, 3000 * (a + 1)));
    }
  }
  return "";
}

let tmpCounter = 0;
export function writeTmp(code) {
  const p = path.join(os.tmpdir(), `arrangement-${process.pid}-${tmpCounter++}.js`);
  fs.writeFileSync(p, code);
  return p;
}

// ── THE SPIRAL — draw → probe → sharpen the atom → re-draw. The dissent
// (every defection) is disclosed on the EOT. The FILL ORDER is the law:
// field (autofill) → hunt → mouth. The mouth is never the first resort. ──
async function fillUnit(u, adapter, emit) {
  const scars = [];
  // 1. THE FIELD (autofill): the corpus already holds the framed unit —
  //    snipped from its bytes with an address. Match BY FRAME, never name.
  const fill = adapter.autofill ? adapter.autofill(u) : null;
  if (fill) {
    emit("field", { unit: u.name, source: "corpus", address: fill.address, bytes: fill.code.length });
    return { code: fill.code, provenance: { unit: u.name, source: "corpus", address: fill.address, bytes: fill.code.length }, scars };
  }
  // 2. THE HUNT: the field lacks the framed unit — go get it. The mouth is
  //    not the first resort for structured material.
  if (adapter.hunt) {
    const res = await adapter.hunt(u);
    if (res) {
      emit("hunt", { unit: u.name, source: "hunt", url: res.url, bytes: res.code.length });
      return { code: res.code, provenance: { unit: u.name, source: "hunt", url: res.url, bytes: res.code.length }, scars };
    }
    if (res === null && adapter.huntScar) scars.push({ unit: u.name, why: adapter.huntScar(u) });
  }
  // 3. THE MOUTH draws only the irreducible residue.
  let attempt = 0;
  let atom = u.spec;
  while (attempt < 4) {
    emit("mouth:draw", { unit: u.name, attempt: attempt + 1, atom });
    const fragment = adapter.mouthFragment(u, atom);
    const out = await draw(fragment, { maxTokens: adapter.mouthTokens ?? 240 });
    const fn = adapter.snip(out, u.name);
    const alone = fn && !String(fn).includes("this.") ? adapter.probeUnit(fn, u) : { ok: false, detail: !fn ? "no function drawn" : "used `this`" };
    if (fn && alone.ok) {
      emit("mouth", { unit: u.name, source: "mouth", attempt: attempt + 1, bytes: fn.length });
      return { code: fn, provenance: { unit: u.name, source: "mouth", bytes: fn.length }, scars };
    }
    const why = alone.detail;
    atom = adapter.sharpen ? adapter.sharpen(u, atom, why) : atom;
    scars.push({ unit: u.name, attempt: attempt + 1, why, atom });
    emit("scar", { unit: u.name, attempt: attempt + 1, why });
    attempt += 1;
  }
  emit("gap", { unit: u.name, attempts: attempt });
  return { code: null, provenance: null, scars };
}

// ── THE FILL: units in read order, filled across a bounded pool only when
// the adapter declares them independent. Results are indexed by unit, so the
// EOT stays deterministic whatever order the pool completes in; the bound is
// the caller's (mouth family cap or the operator's override). ──
async function fillUnits(units, adapter, { parallelism = 1, trace = null } = {}) {
  const emit = trace ? trace.event : () => {};
  const results = new Array(units.length);
  const limit = Math.max(1, Math.min(parallelism, units.length || 1));
  let cursor = 0;
  await Promise.all(Array.from({ length: limit }, async () => {
    while (cursor < units.length) {
      const idx = cursor++;
      results[idx] = await fillUnit(units[idx], adapter, emit);
    }
  }));
  const drawn = [];
  const scars = [];
  const provenance = [];
  for (const r of results) {
    if (r?.code != null) drawn.push(r.code);
    if (r?.provenance) provenance.push(r.provenance);
    scars.push(...(r?.scars ?? []));
  }
  return { code: drawn.join("\n\n") + "\n", scars, provenance };
}

// ── THE PIPELINE ────────────────────────────────────────────────────────────
export async function arrange({ task, args = {}, adapter }) {
  const outDir = path.resolve(args.out || path.join(HERE, "..", "arrangement-out"));
  fs.mkdirSync(outDir, { recursive: true });
  const slug = `arrangement-${Date.now()}`;
  // THE FAN-OUT (GL-EN-17): only across units the adapter declares
  // independent, bounded by the mouth's own house family cap when the mouth
  // is the draw entry (the measured number, never invented); args.parallelism
  // is the operator's explicit override. Without the mouth: 1, the serial twin.
  const independent = adapter.independent === true;
  const mouthCap = independent && MOUTH_URL ? (await import("../mouth.mjs")).HOUSE.familyCap : 1;
  const parallelism = independent ? Math.max(1, Math.floor(Number(args.parallelism) > 0 ? Number(args.parallelism) : mouthCap)) : 1;
  const tracePath = args.trace === false ? null : path.join(outDir, `${slug}.trace.jsonl`);
  const trace = makeTrace({ run: slug, sink: tracePath, printer: args.quiet ? null : console.log });
  trace.event("run", { task, kind: adapter.kind, parallelism, mouth: MOUTH_URL ? "penelope" : "direct" });

  console.log(`\n=== THE FIELD READS THE PROMPT ===`);
  console.log(`  "${task}"\n`);
  let units = await adapter.readUnits(task);
  units = units ?? [];
  let example = null;
  if (args.example) { try { example = JSON.parse(args.example); } catch { example = null; } }
  if (example && units.length && adapter.computeSettles) units = adapter.computeSettles(units, example);
  console.log(`  units + per-unit specs (from the reading, not a dictionary):`);
  for (const u of units) console.log(`    ${u.name}: ${u.spec}${u.settle ? `  [settle: ${u.settle}]` : ""}`);

  console.log(`\n=== THE SPIRAL — field first, hunt second, mouth last ===`);
  const { code, scars, provenance } = await fillUnits(units, adapter, { parallelism, trace });
  let verdict = adapter.testUnits(code, units);
  trace.event("test", { ok: verdict.ok === true, reason: verdict.reason, detail: verdict.detail ?? null });
  // THE REFINEMENT (the universal step): a failing test is refined under the
  // judge itself, in the cube's operator order — the adapter's own transforms
  // move the artifact, illegal moves refused. Domain-agnostic: the same step
  // for code (a testCommand) and text (the essay bars). The mouth is never
  // re-asked; the transforms are held pieces.
  let finalCode = code;
  let refinement = null;
  if (!verdict.ok && Array.isArray(adapter.refineTransforms) && adapter.refineTransforms.length) {
    const r = refine({ start: code, transforms: adapter.refineTransforms, judge: (s) => { const v = adapter.testUnits(s, units); return { ok: v.ok === true, failure: v.reason }; } });
    refinement = { ok: r.ok, steps: r.steps, seq: r.seq, refused: r.refused, reason: r.reason ?? null };
    if (r.ok) { finalCode = r.state; verdict = adapter.testUnits(finalCode, units); }
    trace.event("refine", { ok: r.ok, steps: r.steps, seq: r.seq });
    console.log(`  refine: ${r.ok ? "converged" : "stopped"} — ${r.seq.join(" → ") || "(none)"}${r.refused.length ? ` · illegal refused: ${r.refused.map((x) => x.name).join(", ")}` : ""}`);
  }
  console.log(`  folded: ${finalCode.length} bytes, ${units.length} units`);
  const snipped = (provenance ?? []).filter((p) => p.source === "corpus");
  const drawn = (provenance ?? []).filter((p) => p.source === "mouth");
  const hunted = (provenance ?? []).filter((p) => p.source === "hunt");
  if (snipped.length) console.log(`  field snipped: ${snipped.map((p) => `${p.unit}@${p.address?.split("/").pop()}`).join(", ")}`);
  if (hunted.length) console.log(`  hunted: ${hunted.map((p) => p.unit).join(", ")}`);
  if (drawn.length) console.log(`  drawn by the mouth: ${drawn.map((p) => p.unit).join(", ")}`);
  console.log(`  test:   ${verdict.reason}${verdict.ok ? "" : " — " + verdict.detail}`);

  console.log(`\n=== THE PRODUCT ===`);
  const title = task.split(/[.,]/)[0].slice(0, 48);
  const html = adapter.toDocument({ code: finalCode, units: units.map((u) => u.name), title });
  fs.writeFileSync(path.join(outDir, `${slug}.html`), html);
  fs.writeFileSync(path.join(outDir, `${slug}.folded.${adapter.ext ?? "js"}`), finalCode);
  trace.event("product", { widget: path.join(outDir, `${slug}.html`), folded: `${slug}.folded.${adapter.ext ?? "js"}`, bytes: finalCode.length });
  // THE TRACE'S OWN FALSIFIER (GL-EN-17): reconcile before the EOT is sealed
  // — a trace that cannot be reconciled is decoration and says so loudly.
  const traceCheck = reconcileTrace(trace.events, provenance);
  trace.event("trace", { ok: traceCheck.ok, detail: traceCheck.detail });
  trace.close();
  if (!traceCheck.ok) console.error(`  ✗ trace reconcile failed: ${traceCheck.detail}`);
  const eot = {
    schema: "ArrangementEOT@1", kind: adapter.kind, giver: "heimdall", standing: "disclosed",
    prompt: task, model: MODEL,
    law: "mouth-last, hunt-first, multiple-framings, falsify-or-die; fan out only independent units; the trace reconciles (GL-EN-17)",
    parallelism,
    trace: { schema: TRACE_SCHEMA, path: tracePath, events: trace.events.length, check: traceCheck },
    field: { read: "one draw named the units and each unit's own spec from the prompt" },
    corpus: {
      note: "a unit the field already holds (by FRAME, never by name) is snipped from its bytes with an address; the mouth writes only the irreducible residue",
      snipped: (provenance ?? []).filter((p) => p.source === "corpus"),
      hunted: (provenance ?? []).filter((p) => p.source === "hunt"),
      drawn: (provenance ?? []).filter((p) => p.source === "mouth"),
    },
    swarm: { verdict, scars },
    ...(refinement ? { refinement } : null),
    product: { widget: path.join(outDir, `${slug}.html`), folded: `${slug}.folded.${adapter.ext ?? "js"}` },
  };
  fs.writeFileSync(path.join(outDir, `${slug}.eot.json`), JSON.stringify(eot, null, 2));
  console.log(`  widget: ${path.join(outDir, `${slug}.html`)}`);
  console.log(`  eot:    ${path.join(outDir, `${slug}.eot.json`)}`);
  console.log(`  folded: ${path.join(outDir, `${slug}.folded.${adapter.ext ?? "js"}`)}`);
  if (tracePath) console.log(`  trace:  ${tracePath}${traceCheck.ok ? "" : " (RECONCILE FAILED)"}`);
  if (scars.length) { console.log(`\n  scars (the dissent, disclosed):`); for (const s of scars) console.log(`    ${s.unit}: ${s.why}`); }
  return { slug, html, code: finalCode, eot, verdict, scars, provenance, parallelism, tracePath, traceCheck };
}

export { execSync };