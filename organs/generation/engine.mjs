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
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execSync } from "node:child_process";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { ProvenanceLedger, byteRange } from "./provenance.mjs";

export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const OLLAMA = process.env.ER7_OLLAMA_URL ?? "http://localhost:11434";
export const MODEL = process.env.ER7_BUILD_MODEL ?? "qwen2.5-coder:1.5b";
export const SEARCH_URL = process.env.ER7_SEARCH_URL ?? "http://localhost:8812/api/web/search";

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
export async function draw(prompt, { maxTokens = 240, retries = 4, model = null, kind = "build", priority = "batch" } = {}) {
  // Explicit model-free mode: never substitute the configured default model.
  if (model === null) return "";
  // Every model draw enters Penelope's draw door. The engine remains the
  // orchestrator; admission/routing belongs to the door, not this engine.
  const { runDrawDoor } = await import("../generation-door.mjs");
  let last = "";
  for (let a = 0; a < retries; a += 1) {
    const r = await runDrawDoor({ prompt, model: model ?? MODEL, kind, priority, maxTokens });
    if (r.ok) return r.text;
    last = r.error ?? "draw failed";
    await new Promise((res) => setTimeout(res, 3000 * (a + 1)));
  }
  return last ? "" : "";
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
async function fillUnits(units, adapter, ctx = {}) {
  const drawn = [];
  const scars = [];
  const ledger = ctx.provenanceLedger ?? new ProvenanceLedger({ artifact: ctx.artifact ?? adapter.kind });
  const addSource = (spec) => ledger.source(spec);
  const addContribution = ({ unit, stage, code, source_id, parent = null, detail = null, transform = null }) => {
    const text = String(code ?? "");
    const offset = drawn.length ? Buffer.byteLength(drawn.join("

") + "
") : 0;
    if (text) drawn.push(text);
    const end = offset + Buffer.byteLength(text);
    ledger.event({ stage, source_id, unit: unit.name, parent, range: byteRange(offset, end), detail, transform });
  };

  for (const u of units) {
    const unitSource = addSource({ kind: "unit", locator: { artifact: ctx.artifact ?? adapter.kind, name: u.name, spec: u.spec } });
    ledger.event({ stage: "arrange", source_id: unitSource, unit: u.name, transform: "unit-spec" });

    const fill = adapter.autofill ? adapter.autofill(u, ctx) : null;
    if (fill) {
      const source = addSource({ kind: "corpus", locator: fill.address ?? "corpus:unknown", anchor: fill.address ?? null });
      addContribution({ unit: u, stage: "ground", code: fill.code, source_id: source, parent: unitSource, transform: "autofill-frame" });
      continue;
    }

    if (adapter.hunt) {
      const res = await adapter.hunt(u, ctx);
      if (res) {
        const source = addSource({ kind: "hunt", locator: res.url ?? "hunt:unknown", anchor: res.url ?? null });
        addContribution({ unit: u, stage: "ground", code: res.code, source_id: source, parent: unitSource, transform: "hunt-snip" });
        continue;
      }
      if (res === null && adapter.huntScar) scars.push({ unit: u.name, why: adapter.huntScar(u) });
    }

    let attempt = 0;
    let atom = u.spec;
    while (attempt < 4) {
      const fragment = adapter.mouthFragment(u, atom, ctx);
      const source = addSource({ kind: "draw", locator: { adapter: adapter.kind, unit: u.name, attempt: attempt + 1, prompt: fragment } });
      ledger.event({ stage: "draw-request", source_id: source, parent: unitSource, unit: u.name, transform: "prompt-from-spec", detail: { attempt: attempt + 1 } });
      const out = await draw(fragment, {
        maxTokens: adapter.mouthTokens ?? 240,
        model: ctx.model ?? null,
        kind: ["code", "application"].includes(ctx.artifact ?? adapter.kind) ? "build" : ["prose", "document", "text"].includes(ctx.artifact ?? adapter.kind) ? "chat" : "other",
        priority: "batch",
      });
      const fn = adapter.snip(out, u.name);
      const alone = fn && !String(fn).includes("this.") ? adapter.probeUnit(fn, u, ctx) : { ok: false, detail: !fn ? "no function drawn" : "used `this`" };
      if (fn && alone.ok) {
        addContribution({ unit: u, stage: "draw", code: fn, source_id: source, parent: unitSource, detail: { attempt: attempt + 1 }, transform: "draw→snip" });
        break;
      }
      const why = alone.detail;
      const nextAtom = adapter.sharpen ? adapter.sharpen(u, atom, why, ctx) : atom;
      ledger.event({ stage: "repair", source_id: source, parent: unitSource, unit: u.name, transform: "failed-draw→sharpened-prior", detail: { attempt: attempt + 1, why, from: atom, to: nextAtom } });
      scars.push({ unit: u.name, attempt: attempt + 1, why, atom: nextAtom });
      atom = nextAtom;
      attempt += 1;
    }
  }

  ledger.event({ stage: "fold", transform: "contributions→artifact", detail: { bytes: Buffer.byteLength(drawn.join("

") + "
"), units: units.length } });
  return { code: drawn.join("

") + "
", scars, provenance: ledger.eot() };
}

// ── THE PIPELINE ────────────────────────────────────────────────────────────
export async function arrange({ task, args = {}, adapter, context = {} }) {
  const outDir = path.resolve(args.out || path.join(HERE, "..", "arrangement-out"));
  fs.mkdirSync(outDir, { recursive: true });

  console.log(`
=== THE FIELD READS THE PROMPT ===`);
  console.log(`  "${task}"
`);
  const ledger = new ProvenanceLedger({ artifact: context.artifact ?? adapter.kind });
  const taskSource = ledger.source({ kind: "intent", locator: { task, artifact: context.artifact ?? adapter.kind } });
  ledger.event({ stage: "intent", source_id: taskSource, transform: "request→task" });
  const priorSource = ledger.source({ kind: "prior", locator: { adapter: adapter.kind, constraints: context.constraints ?? {}, verification: context.verification ?? {} } });
  ledger.event({ stage: "prior", source_id: priorSource, parent: taskSource, transform: "constraints+verification→generation-prior" });
  context.provenanceLedger = ledger;
  let units = await adapter.readUnits(task, context);
  ledger.event({ stage: "read", source_id: taskSource, parent: priorSource, transform: "task→units", detail: { units: (units ?? []).map((u) => ({ name: u.name, spec: u.spec })) } });
  units = units ?? [];
  let example = null;
  if (args.example) { try { example = JSON.parse(args.example); } catch { example = null; } }
  if (example && units.length && adapter.computeSettles) units = adapter.computeSettles(units, example, context);
  console.log(`  units + per-unit specs (from the reading, not a dictionary):`);
  for (const u of units) console.log(`    ${u.name}: ${u.spec}${u.settle ? `  [settle: ${u.settle}]` : ""}`);

  console.log(`
=== THE SPIRAL — field first, hunt second, mouth last ===`);
  const { code, scars, provenance } = await fillUnits(units, adapter, context);
  const verdict = adapter.testUnits(code, units, context);
  const verifySource = ledger.source({ kind: "verification", locator: { adapter: adapter.kind, verdict: verdict.reason } });
  ledger.event({ stage: "verify", source_id: verifySource, transform: "artifact→verification", detail: verdict });
  console.log(`  folded: ${code.length} bytes, ${units.length} units`);
  const refs = provenance?.refs ?? [];
  const snipped = refs.filter((p) => p.stage === "corpus");
  const drawn = refs.filter((p) => p.stage === "mouth");
  const hunted = refs.filter((p) => p.stage === "hunt");
  if (snipped.length) console.log(`  field snipped: ${snipped.map((p) => `${p.unit}@${p.address?.split("/").pop()}`).join(", ")}`);
  if (hunted.length) console.log(`  hunted: ${hunted.map((p) => p.unit).join(", ")}`);
  if (drawn.length) console.log(`  drawn by the mouth: ${drawn.map((p) => p.unit).join(", ")}`);
  console.log(`  test:   ${verdict.reason}${verdict.ok ? "" : " — " + verdict.detail}`);

  console.log(`
=== THE PRODUCT ===`);
  const title = task.split(/[.,]/)[0].slice(0, 48);
  const html = adapter.toDocument({ code, units: units.map((u) => u.name), title }, context);
  ledger.event({ stage: "materialize", source_id: taskSource, transform: "artifact→document", detail: { htmlBytes: Buffer.byteLength(html), artifactBytes: Buffer.byteLength(code) } });
  const slug = `arrangement-${Date.now()}`;
  fs.writeFileSync(path.join(outDir, `${slug}.html`), html);
  fs.writeFileSync(path.join(outDir, `${slug}.folded.${adapter.ext ?? "js"}`), code);
  const eot = {
    schema: "ArrangementEOT@2", kind: adapter.kind, giver: "heimdall", standing: "disclosed",
    prompt: task, model: MODEL,
    law: "mouth-last, hunt-first, multiple-framings, falsify-or-die",
    field: { read: "one draw named the units and each unit's own spec from the prompt" },
    provenance,
    corpus: {
      note: "a unit the field already holds (by FRAME, never by name) is snipped from its bytes with an address; the mouth writes only the irreducible residue",
      snipped,
      hunted,
      drawn,
      sourceTable: provenance?.sources ?? [],
    },
    swarm: { verdict, scars },
    product: { widget: path.join(outDir, `${slug}.html`), folded: `${slug}.folded.${adapter.ext ?? "js"}` },
  };
  fs.writeFileSync(path.join(outDir, `${slug}.eot.json`), JSON.stringify(eot, null, 2));
  console.log(`  widget: ${path.join(outDir, `${slug}.html`)}`);
  console.log(`  eot:    ${path.join(outDir, `${slug}.eot.json`)}`);
  console.log(`  folded: ${path.join(outDir, `${slug}.folded.${adapter.ext ?? "js"}`)}`);
  if (scars.length) { console.log(`
  scars (the dissent, disclosed):`); for (const s of scars) console.log(`    ${s.unit}: ${s.why}`); }
  return { slug, html, code, eot, verdict, scars, provenance };
}

export { execSync };