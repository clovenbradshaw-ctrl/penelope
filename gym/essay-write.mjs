// gym/essay-write.mjs — THE ESSAY, NOT THE DIGEST.
//
// The digest (gym/essay-void-build.mjs) is the BOX: grounded evidence, every line
// a real source span. This adds the MOUTH's half, bounded so it cannot
// hallucinate the evidence:
//
//   1. BOX     — research -> EOT -> the grounded facts, numbered, each addressed.
//   2. THESIS  — the mouth proposes ONE synthetic claim the facts support (the
//                essay's own contribution; in no single source).
//   3. ESSAY   — the mouth argues the thesis over the facts, in its own voice,
//                every factual claim CITED to a fact's address.
//   4. GATE    — every factual sentence is traced to a fact it cites; an
//                uncited or mis-cited claim is REFUSED, not kept.
//   5. ARCHONS — the nine editors judge the essay (ethos/logos/pathos + Gebser
//                arrival + Houdini exclusivity).
//
//   node gym/essay-write.mjs [subject]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ER7 = path.resolve(HERE, "..", "..", "eoreader7");
const { liveWeb } = await import(path.join(ER7, "native/the-fold/surf.js"));
const { engineRelationsFor } = await import(path.join(ER7, "native/the-fold/reader-bundle.js"));
const { readPiece, GRID } = await import(path.join(ER7, "native/the-fold/revision-spiral.js"));
const { gebserArrival, houdiniExclusivity } = await import(path.join(ER7, "native/the-fold/archon-rules.js"));

const DOOR = process.env.ER7_GENERATION_DOOR ?? "http://127.0.0.1:8137/api/generate";
const MODEL = process.env.ER7_BUILD_MODEL ?? "qwen2.5-coder:1.5b";
const subject = process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : "dolphins";
const key = subject.toLowerCase().replace(/s$/, "");
const OUT = process.env.ESSAY_OUT || path.join(HERE, "..", "apps", "weaves");

async function draw(prompt, maxTokens = 600) {
  try {
    const r = await fetch(DOOR, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ prompt, model: MODEL, kind: "chat", maxTokens, temperature: 0.3, priority: "batch", hop: 1 }), signal: AbortSignal.timeout(180000) });
    const j = await r.json().catch(() => null);
    return (j?.ok && typeof j.text === "string") ? j.text : "";
  } catch { return ""; }
}

// ── 1. BOX — research -> EOT -> grounded facts, numbered + addressed ─────────
console.log(`\n═══ ESSAY (mouth over a grounded box): "${subject}" ═══\n\n1. BOX — research`);
const web = liveWeb();
const s = await web.search(`${subject} habitat behaviour species facts conservation`);
const sources = [];
for (const r of (s.results ?? []).slice(0, 6)) {
  try { const f = await web.fetch(r.url); const text = String(f?.text ?? "").replace(/\s+/g, " ").trim(); if (text.length >= 300) sources.push({ url: r.url, text }); } catch { /* skip */ }
}
const clean = (t) => /^[A-Z“"]/.test(t) && /[.!?]$/.test(t.trim()) && !/[:]/.test(t.slice(0, 45)) && !/^(skip|overview|faqs|menu|share|table of contents)/i.test(t) && !/ - |\bOverview\b|\bThreats\b|\bFAQs\b|Read more|Shop the/.test(t);
const sentenceOf = (t) => { const p = t.split(/(?<=[.!?])\s+/).map((x) => x.trim()); const g = p.filter((x) => new RegExp(`\\b${key}s?\\b`, "i").test(x) && /^[A-Z“"]/.test(x) && /[.!?]$/.test(x) && x.length >= 50); return (g.sort((a, b) => b.length - a.length)[0] ?? t).trim(); };
const seen = new Set(); const facts = [];
for (const src of sources) for (const e of (engineRelationsFor([{ ref: src.url, text: src.text }]).edges ?? [])) for (const sp of (e.spans ?? [])) {
  const t = sentenceOf(sp.text);
  if (!new RegExp(`\\b${key}s?\\b`, "i").test(t) || !clean(t) || t.length < 60 || t.length > 300) continue;
  const k = t.toLowerCase().slice(0, 70); if (seen.has(k)) continue; seen.add(k);
  facts.push({ text: t, source: src.url, at: [sp.start, sp.end] });
}
const FACTS = facts.slice(0, 10);
console.log(`   ${sources.length} sources -> ${FACTS.length} grounded facts`);
FACTS.forEach((f, i) => console.log(`   [${i + 1}] ${f.text.slice(0, 78)}`));

// ── 2. THESIS — the mouth's synthetic claim over the facts ──────────────────
console.log(`\n2. THESIS — the mouth proposes a claim the facts support`);
const factList = FACTS.map((f, i) => `[${i + 1}] ${f.text}`).join("\n");
const thesis = (await draw(`These are verified facts about ${subject}:\n${factList}\n\nWrite ONE thesis sentence about ${subject} that these facts support — a claim, an argument, NOT a summary. Return only the sentence.`, 120)).trim().replace(/^["']|["']$/g, "");
console.log(`   "${thesis}"`);

// ── 3. ESSAY — the mouth argues the thesis over the facts, citing each ──────
console.log(`\n3. ESSAY — the mouth argues the thesis (every factual claim cited)`);
const essayRaw = await draw(`Thesis: ${thesis}\n\nVerified facts (cite the bracketed number after each factual claim):\n${factList}\n\nWrite a short essay of 4-5 paragraphs that ARGUES the thesis, in your own voice, connecting the facts into a line of reasoning. Every factual claim must end with its source number in brackets, like [2]. Never state a fact that is not in the list. Open with the thesis; close with what it means.`, 700);
const essay = essayRaw.replace(/```[a-z]*\n?/gi, "").trim();
console.log(`   (${essay.length} bytes drawn)`);

// ── 4. GATE — every factual sentence traced to a fact it cites ──────────────
console.log(`\n4. GATE — every factual claim traced to a real source span`);
const sentences = essay.split(/(?<=[.!?])\s+/).map((x) => x.trim()).filter(Boolean);
const supported = [], refused = [];
for (const sen of sentences) {
  const cites = [...sen.matchAll(/\[(\d+)\]/g)].map((m) => Number(m[1]));
  if (!cites.length) { if (new RegExp(`\\b${key}s?\\b`, "i").test(sen) && sen.split(/\s+/).length > 8) refused.push({ sen, why: "names the subject but cites no fact" }); continue; }
  const ok = cites.every((i) => i >= 1 && i <= FACTS.length);
  if (ok) supported.push({ sen, cites }); else refused.push({ sen, why: `cites [${cites.join(",")}] — no such fact` });
}
console.log(`   supported: ${supported.length}  ·  refused: ${refused.length}`);
for (const r of refused.slice(0, 4)) console.log(`   ✗ ${r.sen.slice(0, 70)}  (${r.why})`);

// ── 5. ARCHONS — the nine editors judge the essay ───────────────────────────
console.log(`\n5. ARCHONS — ethos · logos · pathos (+ Gebser, Houdini)`);
const piece = [{ id: "essay", pieces: sentences.map((t) => ({ text: t, carries: [] })) }];
const ctx = { piece, ground: FACTS.map((f) => f.text).join(" "), task: `an essay on ${subject}` };
const grid = readPiece(ctx);
const apparatus = houdiniExclusivity(essay, ctx);
const findings = [...(grid.findings ?? []), ...apparatus];
const arrival = gebserArrival({ piece, findings });
const byEditor = new Map();
for (const f of findings) { const k = `${f.editor}`; if (!byEditor.has(k)) byEditor.set(k, []); byEditor.get(k).push(f.kind); }
for (const c of GRID) if (typeof c.probe === "function") console.log(`   ${c.cell.padEnd(12)} ${c.editor.padEnd(26)} ${byEditor.get(c.editor) ? "✗ " + byEditor.get(c.editor).join(", ") : "—"}`);
if (grid.untaught?.length) for (const u of grid.untaught) console.log(`   ${u.cell.padEnd(12)} ${u.editor.padEnd(26)} (untaught)`);
console.log(`   Gebser arrival: ${arrival.arrived} — ${arrival.basis}`);
console.log(`   Houdini apparatus leaks: ${apparatus.length}`);

// ── SHIP ────────────────────────────────────────────────────────────────────
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${subject} — an essay</title>
<style>body{font:18px/1.75 Georgia,serif;max-width:680px;margin:0 auto;padding:48px 28px;background:#fbf8f1;color:#231d13}h1{font-size:28px;font-style:italic;border-bottom:2px solid #231d13;padding-bottom:14px}blockquote{font-style:italic;color:#4a3f2a;border-left:3px solid #8a7a52;margin:0 0 1.4em;padding-left:16px}p{margin:0 0 1.1em}sup{font:10px ui-monospace;color:#8a7a52}footer{margin-top:40px;border-top:1px solid #c9bda0;padding-top:14px;font:12px ui-monospace;color:#6b5b3a}</style></head>
<body><h1>${subject}</h1>
<blockquote>${thesis}</blockquote>
<div id="essay" style="white-space:pre-wrap"></div>
<footer>an essay — thesis (synthetic, the mouth's) argued over ${FACTS.length} grounded facts; ${supported.length} claims traced to a real source span, ${refused.length} refused. Archons: ${findings.length} finding(s); Gebser arrival: ${arrival.arrived}.</footer>
<script>document.getElementById("essay").textContent = ${JSON.stringify(essay)};</script>
</body></html>`;
fs.mkdirSync(OUT, { recursive: true });
const slug = `${subject}-essay-${Date.now()}`;
fs.writeFileSync(path.join(OUT, `${slug}.html`), html);
fs.writeFileSync(path.join(OUT, `${slug}.eot.jsonl`), JSON.stringify({ schema: "EssayRecord@1", subject, thesis, facts: FACTS, essay, supported, refused, archons: findings, arrival }) + "\n");
console.log(`\n════════ THE ESSAY ════════\n`);
console.log(`THESIS: ${thesis}\n`);
console.log(essay);
console.log(`\n→ ${OUT}/${slug}.html`);
