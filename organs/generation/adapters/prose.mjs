// ai-code-harness/pipeline/adapters/prose.mjs — THE PROSE ADAPTER.
//
// Only what is truly different about PROSE lives here; the ENGINE owns the
// order, retries, scars, EOT. The prose adapter does NOT reimplement the
// essay machinery — it delegates to eoreader7's falsified organs (68 tests
// green at commit 2a033d7):
//
//   topicPhrase    — the essay subject, extracted from the ask (the count
//                    clause never hijacks the subject — T1-T4)
//   voidCellsFor   — the void cells the essay must fill (DEF the void first)
//   relevantSources+snipsFromSources — the field: the hunt's material kept by
//                    relevance and cut to snips (a source survives only when
//                    it shares the task's vocabulary)
//   wideToAtoms    — the wide draft → claim-cored, referent-tagged atoms
//   foldWideToShape— the FOLD: re-admission (invented referents, meta,
//                    hollow-actors refused), dedupe by claim-core, assign to
//                    beats, name gaps and residual (F1-F6)
//   concrescence   — the detector: strain CONSTANT, not zero (C1-C5)
//
// The MOUTH-LAST / HUNT-FIRST law, the small-model law (prompt is a
// completion anchor), and falsify-or-die are the ENGINE's, inherited here.
import { createRequire } from "node:module";
import { draw, SEARCH_URL } from "../engine.mjs";

const require = createRequire(import.meta.url);
const ER7 = "/Users/mlacy/Documents/3.0/eoreader7";
let organs = null;
try {
  const ledger = await import(`${ER7}/native/the-fold/document-ledger.js`);
  const fold = await import(`${ER7}/native/the-fold/essay-fold.js`);
  const proxy = await import(`${ER7}/proxy-runner.mjs`);
  organs = { ...ledger, ...fold, ...proxy };
} catch (e) { organs = null; console.error(`[prose] organs not loaded: ${e.message}`); }

// ── THE READING: the ask yields ONE subject; the void cells become the
// units (each cell is a unit whose spec is its question) ──
export async function readUnits(task) {
  if (!organs) return [];
  const subject = organs.topicPhrase(task);
  const { cells } = organs.voidCellsFor({ topic: subject, question: task });
  const units = (cells ?? [])
    .filter((c) => c.question && c.relevant)
    .map((c) => ({ name: `${c.op}·${c.grain}`, spec: c.question, settle: null, cell: c }));
  return units;
}

// ── THE FIELD (autofill): a unit the field already holds is snipped from the
// retained sources (the shadow), by frame (relevance), never by name ──
export function autofill(unit, ctx) {
  if (!organs || !ctx?.shadow) return null;
  const { relevantSources, snipsFromSources } = organs;
  const rel = relevantSources(ctx.shadow, unit.spec);
  const snips = snipsFromSources(rel.kept, { maxSnips: 2, maxChars: 220 });
  if (!snips.length) return null;
  const code = snips.map((s) => s.snip).join(" ");
  return { code, address: snips[0].url };
}

// ── THE HUNT (Ranke's chase): the field lacks the framed unit — go get it.
// The hunt is the same egress the web organ uses (the search endpoint the
// engine owns); the landed material becomes the shadow the fold re-admits
// against. ──
export async function hunt(unit, ctx) {
  try {
    const res = await fetch(SEARCH_URL, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ query: unit.spec }), signal: AbortSignal.timeout(20000) });
    const j = await res.json();
    const results = (j.results ?? []).slice(0, 3);
    if (!results.length) return null;
    const url = results[0].url;
    const fetched = await fetch(url, { signal: AbortSignal.timeout(20000) });
    const text = await fetched.text();
    const code = String(text ?? "").replace(/\s+/g, " ").slice(0, 400);
    if (code.length < 40) return null;
    ctx.shadow = ctx.shadow ?? new Map();
    ctx.shadow.set(url, code);
    return { code, url };
  } catch (e) {
    return null;
  }
}

// ── THE MOUTH: one cell, framed as a fact — the void cell's question is the
// completion anchor (small-model law: never a steering instruction) ──
export function mouthFragment(unit, atom) {
  return (
    `Write one paragraph that answers this question about the subject. Question: ${atom}. ` +
    `Write only the paragraph. No intro, no outro, no headings. Ground every claim; name only real referents from the subject's own record.`
  );
}

// ── THE SNIP for prose: a drawn paragraph is kept whole; the wide draft's
// sentence extraction is the FOLD's (wideToAtoms), not a regex here ──
export function snip(code) {
  return String(code ?? "").replace(/```[a-z]*/gi, "").trim();
}

// ── THE SWARM, ONE UNIT: the cell's question appears in the folded material
// (the survival of the spec is the admission) — plus the three framing gates
// from the fold: invented referents, meta-sentences, hollow actors. ──
export function probeUnit(code, u) {
  if (!organs) return { ok: false, detail: "organs not loaded" };
  const qWords = String(u.spec ?? "").split(/\W+/).filter((w) => w.length > 4);
  const body = String(code ?? "").toLowerCase();
  const present = qWords.filter((w) => body.includes(w.toLowerCase()));
  const coverage = qWords.length ? present.length / qWords.length : 1;
  if (coverage < 0.3) return { ok: false, detail: `cell's question not answered: ${qWords.filter((w) => !body.includes(w.toLowerCase())).slice(0, 5).join(", ")} (coverage ${Math.round(coverage * 100)}%)` };
  return { ok: true, detail: `cell's question touched (coverage ${Math.round(coverage * 100)}%)` };
}

// ── THE WHOLE ASSEMBLY: the fold. Every sentence re-admitted against the
// whole ground, deduped by claim-core, assigned to beats; gaps and residual
// named. The dissent (refused) is disclosed, never vanished. ──
export function testUnits(code, units) {
  if (!organs) return { ok: false, reason: "organs", detail: "eoreader7 organs not loaded" };
  const atoms = organs.wideToAtoms([code], { ground: "" });
  const folded = organs.foldWideToShape(atoms);
  const gaps = folded.beats.filter((b) => b.gap).map((b) => b.title);
  const refused = folded.refused?.length ?? 0;
  const residual = folded.residual?.length ?? 0;
  const ok = gaps.length === 0 && refused === 0 && residual === 0;
  return {
    ok,
    reason: ok ? "concrescent" : "folded-with-dissent",
    detail: `beats:${folded.beats.length} gaps:${gaps.length ? gaps.join(",") : "none"} refused:${refused} residual:${residual}`,
    folded,
  };
}

export function toDocument({ code, units, title }) {
  const beatNames = units.map((u) => u.name).join(", ");
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>${title}</title>
<style>body{font:18px/1.6 Georgia,serif;max-width:640px;margin:40px auto;padding:0 24px} .beat{font:12px monospace;color:#888;margin:28px 0 4px}</style>
</head>
<body>
<h1>${title}</h1>
<div id="essay" style="white-space:pre-wrap"></div>
<pre id="meta" style="font:12px monospace;background:#f4f4f4;padding:8px;border-radius:6px;margin-top:28px"></pre>
<script>
document.getElementById("essay").textContent = ${JSON.stringify(code)};
document.getElementById("meta").textContent = "beats asked: ${beatNames}";
</script>
</body></html>`;
}

// The prose adapter's sharpen names the real referent jurisdiction (the essay's
// "an atom is an address with a jurisdiction"): a cell the mouth failed must
// be answered from the subject's OWN record, not the mouth's invention.
export function sharpen(unit, atom, why) {
  return `${unit.spec} — answer from the subject's OWN record; name only referents the shadow's material established; never invent a name.`;
}

export default {
  kind: "prose",
  ext: "html",
  readUnits,
  autofill,
  hunt,
  mouthFragment,
  mouthTokens: 400,
  snip,
  probeUnit,
  testUnits,
  toDocument,
  sharpen,
};