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
import { fileURLToPath } from "node:url";

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
async function fillUnits(units, adapter) {
  const drawn = [];
  const scars = [];
  const provenance = [];
  for (const u of units) {
    // 1. THE FIELD (autofill): the corpus already holds the framed unit —
    //    snipped from its bytes with an address. Match BY FRAME, never name.
    const fill = adapter.autofill ? adapter.autofill(u) : null;
    if (fill) {
      drawn.push(fill.code);
      provenance.push({ unit: u.name, source: "corpus", address: fill.address, bytes: fill.code.length });
      continue;
    }
    // 2. THE HUNT: the field lacks the framed unit — go get it. The mouth is
    //    not the first resort for structured material.
    let hunted = false;
    if (adapter.hunt) {
      const res = await adapter.hunt(u);
      if (res) {
        drawn.push(res.code);
        provenance.push({ unit: u.name, source: "hunt", url: res.url, bytes: res.code.length });
        hunted = true;
      } else if (res === null && adapter.huntScar) {
        scars.push({ unit: u.name, why: adapter.huntScar(u) });
      }
    }
    if (hunted) continue;
    // 3. THE MOUTH draws only the irreducible residue.
    let attempt = 0;
    let atom = u.spec;
    while (attempt < 4) {
      const fragment = adapter.mouthFragment(u, atom);
      const out = await draw(fragment, { maxTokens: adapter.mouthTokens ?? 240 });
      const fn = adapter.snip(out, u.name);
      const alone = fn && !String(fn).includes("this.") ? adapter.probeUnit(fn, u) : { ok: false, detail: !fn ? "no function drawn" : "used `this`" };
      if (fn && alone.ok) {
        drawn.push(fn);
        provenance.push({ unit: u.name, source: "mouth" });
        break;
      }
      const why = alone.detail;
      atom = adapter.sharpen ? adapter.sharpen(u, atom, why) : atom;
      scars.push({ unit: u.name, attempt: attempt + 1, why, atom });
      attempt += 1;
    }
  }
  return { code: drawn.join("\n\n") + "\n", scars, provenance };
}

// ── THE PIPELINE ────────────────────────────────────────────────────────────
export async function arrange({ task, args = {}, adapter }) {
  const outDir = path.resolve(args.out || path.join(HERE, "..", "arrangement-out"));
  fs.mkdirSync(outDir, { recursive: true });

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
  const { code, scars, provenance } = await fillUnits(units, adapter);
  const verdict = adapter.testUnits(code, units);
  console.log(`  folded: ${code.length} bytes, ${units.length} units`);
  const snipped = (provenance ?? []).filter((p) => p.source === "corpus");
  const drawn = (provenance ?? []).filter((p) => p.source === "mouth");
  const hunted = (provenance ?? []).filter((p) => p.source === "hunt");
  if (snipped.length) console.log(`  field snipped: ${snipped.map((p) => `${p.unit}@${p.address?.split("/").pop()}`).join(", ")}`);
  if (hunted.length) console.log(`  hunted: ${hunted.map((p) => p.unit).join(", ")}`);
  if (drawn.length) console.log(`  drawn by the mouth: ${drawn.map((p) => p.unit).join(", ")}`);
  console.log(`  test:   ${verdict.reason}${verdict.ok ? "" : " — " + verdict.detail}`);

  console.log(`\n=== THE PRODUCT ===`);
  const title = task.split(/[.,]/)[0].slice(0, 48);
  const html = adapter.toDocument({ code, units: units.map((u) => u.name), title });
  const slug = `arrangement-${Date.now()}`;
  fs.writeFileSync(path.join(outDir, `${slug}.html`), html);
  fs.writeFileSync(path.join(outDir, `${slug}.folded.${adapter.ext ?? "js"}`), code);
  const eot = {
    schema: "ArrangementEOT@1", kind: adapter.kind, giver: "heimdall", standing: "disclosed",
    prompt: task, model: MODEL,
    law: "mouth-last, hunt-first, multiple-framings, falsify-or-die",
    field: { read: "one draw named the units and each unit's own spec from the prompt" },
    corpus: {
      note: "a unit the field already holds (by FRAME, never by name) is snipped from its bytes with an address; the mouth writes only the irreducible residue",
      snipped: (provenance ?? []).filter((p) => p.source === "corpus"),
      hunted: (provenance ?? []).filter((p) => p.source === "hunt"),
      drawn: (provenance ?? []).filter((p) => p.source === "mouth"),
    },
    swarm: { verdict, scars },
    product: { widget: path.join(outDir, `${slug}.html`), folded: `${slug}.folded.${adapter.ext ?? "js"}` },
  };
  fs.writeFileSync(path.join(outDir, `${slug}.eot.json`), JSON.stringify(eot, null, 2));
  console.log(`  widget: ${path.join(outDir, `${slug}.html`)}`);
  console.log(`  eot:    ${path.join(outDir, `${slug}.eot.json`)}`);
  console.log(`  folded: ${path.join(outDir, `${slug}.folded.${adapter.ext ?? "js"}`)}`);
  if (scars.length) { console.log(`\n  scars (the dissent, disclosed):`); for (const s of scars) console.log(`    ${s.unit}: ${s.why}`); }
  return { slug, html, code, eot, verdict, scars, provenance };
}

export { execSync };