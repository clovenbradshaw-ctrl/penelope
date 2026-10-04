// penelope/organs/generation/engine.test.mjs — the engine's fan-out + trace
// wall, model-free (GL-EN-17). The field or the hunt holds every unit, so the
// mouth is never asked: no model call, no network. The wall checks: the bound
// is the mouth's house cap when the mouth is the draw entry (the operator's
// override wins); only a declared-independent adapter fans out, and the EOT
// keeps read order; the trace emits GenerationTrace@1 rows as a sink and
// reconciles to the EOT provenance — a missing or drifted row is refused.
//
//   node organs/generation/engine.test.mjs   run the wall, exit 0/1
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { arrange, reconcileTrace, TRACE_SCHEMA } from "./engine.mjs";
import { HOUSE } from "../mouth.mjs";

let failures = 0;
const fail = (name, msg) => { failures += 1; console.error(`  ✗ ${name}: ${msg}`); };
const pass = (name, msg) => console.log(`  ✓ ${name}${msg ? ` — ${msg}` : ""}`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = fs.mkdtempSync(path.join(os.tmpdir(), "engine-wall-"));
const silent = async (fn) => { const log = console.log, err = console.error; console.log = () => {}; console.error = () => {}; try { return await fn(); } finally { console.log = log; console.error = err; } };
const unit = (name) => ({ name, spec: `${name}'s own spec` });
const noMouth = () => { throw new Error("the mouth must not be asked — the field/hunt held every unit"); };
const base = (over = {}) => ({
  kind: "code", ext: "js",
  readUnits: async () => [unit("a"), unit("b")],
  mouthFragment: noMouth, snip: (s) => s, probeUnit: () => ({ ok: true }),
  testUnits: () => ({ ok: true, reason: "test" }),
  toDocument: () => "<!doctype html><title>t</title>",
  ...over,
});

// 1. FIELD-ONLY: two held units, zero draws — provenance, trace sink, EOT.
{
  const adapter = base({ independent: true, autofill: (u) => ({ code: `function ${u.name}() {}`, address: `/corpus/${u.name}.js` }) });
  const r = await silent(() => arrange({ task: "two held units", args: { out }, adapter }));
  const prov = r.provenance ?? [];
  if (!(prov.length === 2 && prov.every((p) => p.source === "corpus" && Number.isFinite(p.bytes)))) fail("field-only", `provenance ${JSON.stringify(prov)}`);
  else pass("field-only", prov.map((p) => `${p.unit}←${p.source} (${p.bytes} B)`).join(", "));
  if (r.traceCheck?.ok !== true) fail("reconcile", r.traceCheck?.detail ?? "no traceCheck");
  else pass("reconcile", r.traceCheck.detail);
  if (!r.tracePath || !fs.existsSync(r.tracePath)) fail("ndjson", `no trace sink at ${r.tracePath}`);
  else {
    const rows = fs.readFileSync(r.tracePath, "utf8").trim().split("\n").map((l) => JSON.parse(l));
    const shaped = rows.length > 0 && rows.every((e) => e.schema === TRACE_SCHEMA && e.run === r.slug && e.event);
    if (!shaped) fail("ndjson", "a row is not a GenerationTrace@1 event");
    else pass("ndjson", `${rows.length} row(s) in ${path.basename(r.tracePath)}`);
  }
  const expected = process.env.PENELOPE_MOUTH_URL ? HOUSE.familyCap : 1;
  const eot = JSON.parse(fs.readFileSync(path.join(out, `${r.slug}.eot.json`), "utf8"));
  if (eot.parallelism !== expected || eot.trace?.check?.ok !== true) fail("eot", JSON.stringify({ parallelism: eot.parallelism, expected, trace: eot.trace }));
  else pass("eot", `parallelism ${eot.parallelism} (mouth ${process.env.PENELOPE_MOUTH_URL ? "set" : "unset"}), trace reconciled`);
}

// 2. FAN-OUT + ORDER: three independent hunts; the first is the slowest, so
// completion order ≠ read order; the EOT must keep read order.
{
  const mk = () => base({
    independent: true,
    readUnits: async () => [unit("a"), unit("b"), unit("c")],
    hunt: async (u) => { await sleep(u.name === "a" ? 200 : 50); return { code: `function ${u.name}() {}`, url: `https://example.test/${u.name}.js` }; },
  });
  const t0 = Date.now(); const r3 = await silent(() => arrange({ task: "three", args: { out, parallelism: 3 }, adapter: mk() })); const p3 = Date.now() - t0;
  const t1 = Date.now(); const r1 = await silent(() => arrange({ task: "three", args: { out, parallelism: 1 }, adapter: mk() })); const p1 = Date.now() - t1;
  if (!(p3 < p1 * 0.8)) fail("fan-out", `parallelism 3 took ${p3}ms, parallelism 1 took ${p1}ms — no speedup`);
  else pass("fan-out", `${p3}ms @3 vs ${p1}ms @1`);
  const order = JSON.stringify((r3.provenance ?? []).map((p) => p.unit));
  if (order !== '["a","b","c"]') fail("unit-order", `provenance order ${order} — the EOT must stay in read order`);
  else pass("unit-order", "read order preserved under concurrency");
  if (r1.eot?.parallelism !== 1 || r3.eot?.parallelism !== 3) fail("override", `p1 ${r1.eot?.parallelism}, p3 ${r3.eot?.parallelism}`);
  else pass("override", "args.parallelism overrides the bound");
}

// 3. DECLARE OR STAY SERIAL: an adapter that does not declare independence
// runs the fill serially whatever the operator asked (GL-CD-07).
{
  const adapter = base({ hunt: async () => { await sleep(10); return { code: "function a() {}", url: "https://example.test/a.js" }; } });
  const r = await silent(() => arrange({ task: "no declaration", args: { out, parallelism: 3 }, adapter }));
  if (r.eot?.parallelism !== 1) fail("declare", `undeclared adapter ran at parallelism ${r.eot?.parallelism}`);
  else pass("declare", "no independence declared → the serial fill");
}

// 4. RECONCILE REFUSES: a missing row and a drifted byte count are both found.
{
  const good = reconcileTrace([{ event: "mouth", source: "mouth", unit: "x", bytes: 5 }], [{ unit: "x", source: "mouth", bytes: 5 }]);
  const miss = reconcileTrace([], [{ unit: "x", source: "mouth", bytes: 5 }]);
  const drift = reconcileTrace([{ event: "mouth", source: "mouth", unit: "x", bytes: 4 }], [{ unit: "x", source: "mouth", bytes: 5 }]);
  if (!good.ok || miss.ok || drift.ok) fail("reconcile-refuses", JSON.stringify({ good: good.ok, miss: miss.ok, drift: drift.ok }));
  else pass("reconcile-refuses", "missing and drifted rows refused; a matching row passes");
}

console.log(`\nengine fan-out + trace wall: ${failures === 0 ? "PASS" : `${failures} failure(s)`}`);
process.exit(failures === 0 ? 0 : 1);
