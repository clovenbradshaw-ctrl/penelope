// white-paper-run.mjs — THE WHITE PAPER CHASE (GL-WP).
//
// The closing loop applied to a new output type: penelope DEFINES what a
// white paper is (through the real prose engine), DRAFTS one through the same
// engine, EVALUATES the draft against her own definition (the gates), records
// LESSONS on the ledger, and produces a CORRECTED draft with the lessons
// folded into the atom. The engine, the mouth, the bridge, the hunt, and the
// eoreader7 fold organs are the REAL pipeline — nothing here is a stub.
//
//   phase A: DEFINE         — arrange() prose run: "what is a white paper"
//   phase B: DEFINE-EVAL    — her definition against the constitution gates
//   phase C: DRAFT          — arrange() prose run: the white paper itself
//   phase D: EVAL           — the draft against her definition (error correction)
//   phase E: LESSONS        — failures -> EssayLesson@1 + GLAUCA-EOT entry
//   phase F: CORRECTED      — arrange() prose run, lessons folded into specs
//
// Run: node gym/white-paper-run.mjs --out <dir>   (default: apps/weaves)
process.env.PENELOPE_MOUTH_URL = process.env.PENELOPE_MOUTH_URL ?? "http://127.0.0.1:11439";
process.env.ER7_BUILD_MODEL = process.env.ER7_BUILD_MODEL ?? "gemma2:2b";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { arrange, parseArgs } from "../organs/generation/engine.mjs";
import proseAdapter from "../organs/generation/adapters/prose.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.dirname(HERE);
const OUT = path.resolve(process.argv[2] ?? path.join(REPO, "apps", "weaves"));
const LESSONS_FILE = path.join(REPO, "gym", "essay-lessons.jsonl");
const EOT_FILE = path.join(REPO, "GLAUCA-EOT.md");
fs.mkdirSync(OUT, { recursive: true });

// The budget (derived, never invented): the mouth's ration is 40 draws per
// 15 min per identity (organs/mouth.mjs HOUSE.ration); three runs at up to 4
// attempts per unit stay inside it at 6 units each with one unit of margin.
const UNIT_BUDGET = 6;

// ────────────────────────────────────────────────────────────────────────────
// THE DEFINITION — a white paper as an artifact, received from the
// constitution (giver: FOLD-CONSTITUTION.md). Eight gates, each mechanical
// enough to run, each naming the article that produces it.
// ────────────────────────────────────────────────────────────────────────────
const GATES = [
  { id: "claim",      article: "II.6", check: (t) => leadClaim(t) },
  { id: "descent",    article: "II.3", check: (t) => hasMarkers(t, /⟦|\[S#\]|@(?:[0-9a-f]{6,}|[A-Za-z0-9:/.-]+\.(?:html|md|txt|json|org))|\b(?:line\s+\d+|vol\.?\s+\d+|§)/i, 2) },
  { id: "standing",   article: "I.1", check: (t) => /\b(standing|measured|received|shown|refused)\b/i.test(t) },
  { id: "position",   article: "II.8", check: (t) => /\b(for-whom|for whom|lens|cursor|at what altitude|from the seat of|position)\b/i.test(t) },
  { id: "aperture",   article: "III.4", check: (t) => /\b(contrary|opposite|refute|what could|falsif|limit(?:ation)?|weakest)\b/i.test(t) },
  { id: "falsify",    article: "II.5", check: (t) => /\b(null arm|null\b|registered|prediction|falsif|would fail|draws)\b/i.test(t) },
  { id: "mouth",      article: "II.9", check: (t) => noBareValues(t) },
  { id: "no-meta",    article: "II.9", check: (t) => !/\b(this (?:white )?paper|this document|the author of this)\b/i.test(t) },
];

function leadClaim(t) {
  const p = String(t).split(/\n{2,}/).map((s) => s.trim()).filter(Boolean)[0] ?? "";
  return { ok: p.length > 40 && !/^(this paper|this white paper|the following)/i.test(p), evidence: p.slice(0, 140) };
}

function hasMarkers(t, re, n) {
  const hits = String(t).match(re) ?? [];
  return { ok: hits.length >= n, evidence: `markers: ${hits.length} (${hits.slice(0, 3).join(", ")})` };
}

function noBareValues(t) {
  const nums = String(t).match(/(?<!\w)\d+(?:\.\d+)?(?:\s*(?:%|percent|bytes|draws|p\s*=\s*\d))?/g) ?? [];
  const near = nums.filter((x) => { const i = t.indexOf(x); return t.slice(Math.max(0, i - 30), i + 30).match(/⟦|\[S#\]|@|\b(?:n\s*=|p\s*=|draws?|null|measured|received)\b/i); });
  return { ok: nums.length === 0 || near.length === nums.length, evidence: `numbers: ${nums.length}, sourced: ${near.length}` };
}

function runGates(text) {
  return GATES.map((g) => {
    const r = g.check(text);
    return { id: g.id, article: g.article, ok: r.ok, evidence: r.evidence };
  });
}

// ────────────────────────────────────────────────────────────────────────────
// THE WHITE-PAPER ADAPTER — the engine owns the spine; only the product shape
// and the unit budget differ from the prose adapter. The definition is folded
// into every unit's spec so the mouth writes in the definition, not about it.
// ────────────────────────────────────────────────────────────────────────────
function wpAdapter(definition, lessons = []) {
  const adapter = { ...proseAdapter };
  adapter.readUnits = async (task) => {
    const units = await proseAdapter.readUnits(task);
    const essayFirst = [...units.filter((u) => u.cell?.essay), ...units.filter((u) => !u.cell?.essay)];
    const capped = essayFirst.slice(0, UNIT_BUDGET);
    const def = definition ? ` The white paper, as defined here: ${definition}` : "";
    const les = lessons.length ? ` The lessons from the prior draft, which this draft MUST honor: ${lessons.join(" ")}` : "";
    return capped.map((u) => ({ ...u, spec: `${u.spec}${def}${les}` }));
  };
  adapter.toDocument = ({ code, units, title }) => {
    const beatNames = units.map((u) => u.name).join(", ");
    return `<!doctype html>
<html><head><meta charset="utf-8"><title>${title} — white paper</title>
<style>body{font:16.5px/1.75 Georgia,serif;max-width:700px;margin:0 auto;padding:52px 36px;background:#fbf8f1;color:#231d13}.mast{text-align:center;border-bottom:2px solid #231d13;padding-bottom:20px;margin-bottom:30px}h1{font-size:28px;font-style:italic;margin:0}.tag{color:#6b5b3a;font-style:italic;margin:8px 0 0}.meta{font:11px ui-monospace;color:#7a6a4f;margin-top:10px}h2{font-size:15px;text-transform:uppercase;letter-spacing:.08em;color:#6b5b3a;margin:34px 0 10px}p{text-indent:1.5em;margin:0 0 1em}p:first-of-type{text-indent:0}.abs{background:#fffdf8;border:1px solid #d9cfb4;border-left:4px solid #8a7a52;padding:18px 22px;font-size:15px}.standing{font:11px/1.7 ui-monospace;color:#4a3f2a;border-top:1px solid #c9bda0;margin-top:40px;padding-top:16px}</style>
</head>
<body>
<div class="mast"><h1>${title}</h1><div class="tag">white paper · ${new Date().toISOString().slice(0, 10)} · standing, on the record</div></div>
<div id="wp" style="white-space:pre-wrap"></div>
<pre id="meta" style="font:12px monospace;background:#f4f4f4;padding:8px;border-radius:6px;margin-top:28px"></pre>
<script>
document.getElementById("wp").textContent = ${JSON.stringify(code)};
document.getElementById("meta").textContent = "beats asked: ${beatNames}";
</script>
</body></html>`;
  };
  return adapter;
}

const log = (...a) => console.log(...a);

async function main() {
  const argv = parseArgs(process.argv.slice(2));
  const out = argv.out ? path.resolve(argv.out) : OUT;
  fs.mkdirSync(out, { recursive: true });

  log(`\n╔═ THE WHITE PAPER CHASE ═╗`);
  log(`  engine: real prose engine (mouth ${process.env.PENELOPE_MOUTH_URL}, model ${process.env.ER7_BUILD_MODEL})`);
  log(`  unit budget: ${UNIT_BUDGET} (essay cells first; the mouth's 40/15min ration, house law)`);
  log(`  out: ${out}\n`);

  // ── PHASE A — DEFINE ─────────────────────────────────────────────────────
  log(`\n═══ PHASE A — DEFINE: what is a white paper, as an artifact? ═══`);
  const defineTask = "Define what a white paper is as an artifact in the Fold: its claim, its standings, its gates, its null arm, and how it differs from an essay. A white paper is a measured claim about the workbench itself, carrying descent, a declared position, a rendered aperture, and a registered falsification. Write the definition as prose.";
  const defRun = await arrange({ task: defineTask, args: {}, adapter: wpAdapter(null) });
  const definition = String(defRun.code ?? "").trim();
  log(`\n  definition drafted (${definition.length} bytes)`);
  log(`  engine verdict: ${defRun.verdict.ok ? "concrescent" : defRun.verdict.reason} — ${defRun.verdict.detail}`);
  if (defRun.scars.length) { log(`  scars (dissent): ${defRun.scars.map((s) => `${s.unit}:${s.why}`).join(" | ")}`); }

  // ── PHASE B — DEFINE-EVAL ────────────────────────────────────────────────
  log(`\n═══ PHASE B — DEFINE-EVAL: her definition against the gates ═══`);
  const defGates = runGates(definition);
  for (const g of defGates) log(`  ${g.ok ? "PASS" : "FAIL"} ${g.id} [${g.article}] ${g.evidence}`);
  const defGaps = defGates.filter((g) => !g.ok).map((g) => g.id);

  // ── PHASE C — DRAFT ──────────────────────────────────────────────────────
  log(`\n═══ PHASE C — DRAFT: the white paper, through the same spine ═══`);
  const task = "White paper: how the Fold implements error correction — predictive processing as the theory, the null arm as the math, the mouth as precision control. A measured claim about the workbench, with descent, a declared position, a rendered aperture, and a registered falsification.";
  const draft = await arrange({ task, args: {}, adapter: wpAdapter(definition) });
  const draftText = String(draft.code ?? "").trim();
  log(`\n  draft folded (${draftText.length} bytes, ${draft.units?.length ?? "?"} units)`);
  log(`  engine verdict: ${draft.verdict.ok ? "concrescent" : draft.verdict.reason} — ${draft.verdict.detail}`);
  if (draft.scars.length) { log(`  scars: ${draft.scars.map((s) => `${s.unit}:${s.why}`).join(" | ")}`); }

  // ── PHASE D — EVAL ───────────────────────────────────────────────────────
  log(`\n═══ PHASE D — EVAL: the draft against her definition ═══`);
  const gates = runGates(draftText);
  for (const g of gates) log(`  ${g.ok ? "PASS" : "FAIL"} ${g.id} [${g.article}] ${g.evidence}`);
  const failures = gates.filter((g) => !g.ok).map((g) => g.id);

  // ── PHASE E — LESSONS ────────────────────────────────────────────────────
  log(`\n═══ PHASE E — LESSONS ═══`);
  const lessons = [];
  if (failures.includes("descent")) lessons.push("grounded: every load-bearing sentence carries a source marker (⟦address⟧ or [S#]), or the draft is a draft, never the shroud.");
  if (failures.includes("standing")) lessons.push("standing: the artifact declares its standing out loud (measured / received / shown / refused) — an undeclared claim wears the record's floor.");
  if (failures.includes("position")) lessons.push("position: the draft names its for-whom and its altitude; a reading without a declared lens is refused, not shown.");
  if (failures.includes("aperture")) lessons.push("aperture: the strongest contrary slice is rendered, never offered — name what could refute the claim and show it.");
  if (failures.includes("falsify")) lessons.push("falsify: register the prediction or null arm before the claim ships — a claim with no registered bar is shown, never measured.");
  if (failures.includes("mouth")) lessons.push("mouth: no number, name, or date is emitted as model tokens — every value is a reference to a computed cell, resolved at render time.");
  if (failures.includes("no-meta")) lessons.push("voice: write in the paper, not about it — no 'this paper' framing; the subject is the subject.");
  if (failures.includes("claim")) lessons.push("claim: open with the load-bearing thesis; a preamble that delays the claim is a register that will drift.");
  if (!lessons.length) lessons.push("concrescent: the draft passed every gate on the first weave — record it so the next white paper starts above this one.");
  if (defGaps.length) lessons.push(`define: the definition itself missed [${defGaps.join(", ")}] — a definition that fails its own gates is received, not measured.`);

  for (const l of lessons) log(`  lesson: ${l}`);
  const lessonRow = { schema: "EssayLesson@1", ts: new Date().toISOString(), round: Date.now(), artifact: "white-paper", fails: failures.map((id) => ({ n: 1, fail: [id] })), lesson: lessons.join(" ") };
  fs.appendFileSync(LESSONS_FILE, JSON.stringify(lessonRow) + "\n");
  log(`  appended ${LESSONS_FILE}`);

  // ── PHASE F — CORRECTED DRAFT ────────────────────────────────────────────
  log(`\n═══ PHASE F — CORRECTED DRAFT: lessons folded into every atom ═══`);
  const corrected = await arrange({ task, args: {}, adapter: wpAdapter(definition, lessons) });
  const correctedText = String(corrected.code ?? "").trim();
  log(`\n  corrected draft folded (${correctedText.length} bytes)`);
  log(`  engine verdict: ${corrected.verdict.ok ? "concrescent" : corrected.verdict.reason} — ${corrected.verdict.detail}`);
  const gates2 = runGates(correctedText);
  for (const g of gates2) log(`  ${g.ok ? "PASS" : "FAIL"} ${g.id} [${g.article}] ${g.evidence}`);
  const remaining = gates2.filter((g) => !g.ok).map((g) => g.id);

  // ── THE CHASE LOG (the record) ───────────────────────────────────────────
  const chase = {
    schema: "WhitePaperChase@1", ts: new Date().toISOString(), model: process.env.ER7_BUILD_MODEL,
    unitBudget: UNIT_BUDGET,
    definition: { text: definition.slice(0, 1200), gates: defGates, gaps: defGaps },
    draft: { artifact: draft.slug, verdict: draft.verdict, gates, failures, scars: draft.scars },
    lessons,
    corrected: { artifact: corrected.slug, verdict: corrected.verdict, gates: gates2, remaining },
    falsifyingControl: "a white paper that passes every gate but cannot be drilled to the rows beneath it (descent is a marker, not a resolution) contradicts this chase.",
  };
  const chaseFile = path.join(out, `white-paper-chase-${Date.now()}.json`);
  fs.writeFileSync(chaseFile, JSON.stringify(chase, null, 2));
  log(`\n  chase record: ${chaseFile}`);

  // ── THE EOT ENTRY (append-only, standing) ────────────────────────────────
  const eot = `\n## white paper — the chase\n\n### GL-WP-01 — The closing loop on a new output type: penelope defines the white paper, drafts through the real spine, error-corrects against her own definition\n- pipeline: prose (white-paper adapter over the real engine)\n- status: standing\n- supersedes: —\n- evidence: gym/white-paper-run.mjs — phases A→F on ${chase.ts.slice(0, 10)}; the draft's gates at ${chaseFile.split("/").pop()}; lessons appended to gym/essay-lessons.jsonl. Definition gaps: ${defGaps.join(", ") || "none"}. Draft failures: ${failures.join(", ") || "none"}. Corrected remaining: ${remaining.join(", ") || "none"}.\n- falsifying control: a white paper that passes every gate but cannot be drilled to the rows beneath it, or a corrected draft that reproduces a gate it was taught, contradicts this.\n`;
  fs.appendFileSync(EOT_FILE, eot);
  log(`  EOT: appended GL-WP-01 to ${EOT_FILE}`);

  log(`\n╚═ chase complete: ${chase.definition.text.length > 0 ? "defined" : "undefined"} → ${failures.length} draft failures → ${lessons.length} lessons → ${remaining.length} remaining ═╝`);
}

main().catch((e) => { console.error(e); process.exit(1); });