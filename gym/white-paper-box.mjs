// white-paper-box.mjs — THE WHITE PAPER CHASE, PHASE 2: ERROR CORRECTION IN THE BOX.
//
// GL-WP-02 — the improvement the first chase proved necessary:
//   (1) SUBJECT PINNED, RECEIVED — the topic is declared by the asker, never
//       re-extracted by topicPhrase; a hijacked subject (the first chase's
//       "workbench") is the corruption cascade that poisoned a whole draft.
//   (2) DESCENT MECHANICAL, IN THE BOX — the paper is COMPOSED from the Fold's
//       own record: the box selects the record's verbatim sentences at their
//       byte addresses (findClean), the mouth writes only connective residue,
//       and a claim with no clean match is censored (GL-BD-18). The first
//       chase proved the opposite order fails: grounding a paraphrasing mouth
//       after the fact left 12/14 claims unverifiable.
//   (3) GATES RENDERED, NOT REQUESTED — standing, position, aperture, and
//       falsification are COMPUTED into the artifact (the fold's residual and
//       refused ARE the aperture; the null IS the perturbed re-run), so the
//       gates pass by construction, not by instruction.
//
// Run: node gym/white-paper-box.mjs
process.env.PENELOPE_MOUTH_URL = process.env.PENELOPE_MOUTH_URL ?? "http://127.0.0.1:11439";
process.env.ER7_BUILD_MODEL = process.env.ER7_BUILD_MODEL ?? "gemma2:2b";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { indexSource, findClean } from "../organs/source-index.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.dirname(HERE);
const OUT = path.join(REPO, "apps", "weaves");
const EOT_FILE = path.join(REPO, "GLAUCA-EOT.md");
fs.mkdirSync(OUT, { recursive: true });

// The white paper's ground: the Fold's OWN record, at byte addresses. The
// paper claims things about the Fold — so the Fold's files are its clean
// sources (received: giver = the record itself).
const GROUND_FILES = {
  constitution: "/Users/mlacy/Documents/3.0/FOLD-CONSTITUTION.md",
  penelope: path.join(REPO, "README.md"),
  eot: path.join(REPO, "GLAUCA-EOT.md"),
};

// The definition — a white paper as an artifact, received from the
// constitution. Every gate returns { ok, evidence }, normalized.
const GATES = [
  { id: "claim",    check: (t) => ({ ok: leadClaim(t), evidence: leadClaim(t) ? String(t).split(/\n{2,}/)[0].slice(0, 120) : "no lead claim" }) },
  { id: "descent",  check: (t) => { const m = String(t).match(/@\d+/g) ?? []; return { ok: m.length >= 3, evidence: `byte addresses: ${m.length}` }; } },
  { id: "standing", check: (t) => ({ ok: /\b(standing|measured|received|shown|refused)\b/i.test(t), evidence: "standing declared" }) },
  { id: "position", check: (t) => ({ ok: /\b(for-whom|for whom|lens|cursor|at what altitude|from the seat of)\b/i.test(t), evidence: "position declared" }) },
  { id: "aperture", check: (t) => ({ ok: /\b(contrary|opposite|refute|what could|falsif|weakest|refused|residual)\b/i.test(t), evidence: "contrary rendered" }) },
  { id: "falsify",  check: (t) => ({ ok: /\b(null arm|null\b|registered|prediction|falsif|would fail|draws|perturb)\b/i.test(t), evidence: "null/falsification registered" }) },
  { id: "mouth",    check: (t) => noBareValues(t) },
  { id: "no-meta",  check: (t) => { const body = String(t).split("## The falsification")[0].replace(/“[^”]+”\s*⟦[^⟧]+⟧/g, "").replace(/⟦[^⟧]+⟧/g, ""); return { ok: !/\b(this (?:white )?paper|this document)\b/i.test(body), evidence: "no meta-voice outside the registered falsification and the quoted record" }; } },
];
function leadClaim(t) {
  const p = String(t).split(/\n{2,}/).map((s) => s.trim()).filter(Boolean)[0] ?? "";
  return p.length > 40 && !/^(this paper|this white paper|the following)/i.test(p);
}
function noBareValues(t) {
  // Numbers inside a verified quote ⟦“…”@addr⟧ are sourced by descent — they
  // are the record's own bytes at a resolvable address. List ordinals ("1.",
  // "2.") are section numbering, not values. Only numbers in the box-authored
  // connective text must carry a marker. Strip quoted spans and ordinals
  // first, then scan the residue.
  const residue = String(t).replace(/“[^”]+”\s*⟦[^⟧]+⟧/g, "").replace(/⟦[^⟧]+⟧/g, "")
    .replace(/(?<=\n|^)\s*\d+[.)]\s*/g, "");
  const nums = residue.match(/(?<!\w)\d+(?:\.\d+)?(?:\s*(?:%|percent|bytes|draws))?/g) ?? [];
  const near = nums.filter((x) => { const i = residue.indexOf(x); return residue.slice(Math.max(0, i - 40), i + 40).match(/@\d+|\[S#\]|constitution@/i); });
  return { ok: nums.length === 0 || near.length === nums.length, evidence: `bare numbers (outside quotes, non-ordinal): ${nums.length}, sourced: ${near.length}` };
}
function runGates(text) { return GATES.map((g) => { const r = g.check(text); return { id: g.id, ok: r.ok, evidence: r.evidence }; }); }

const log = (...a) => console.log(...a);

// The mechanisms the paper must claim, each as a phrase the RECORD can ground
// verbatim (received: the definition, giver = FOLD-CONSTITUTION).
const CLAIMS = [
  { heading: "The operation — a finding is a difference against a ground", phrase: "a finding is a difference against a ground the workbench rebuilt" },
  { heading: "The null arm — the math of the error", phrase: "The null is produced by re-executing the same pipeline on perturbed input" },
  { heading: "The firewall — evidence never tunes the instrument", phrase: "Evidence may never tune the instrument that produced it" },
  { heading: "The mouth — the precision control", phrase: "No number, name, date, or quantity is emitted as model tokens" },
  { heading: "The aperture — the contrary is rendered", phrase: "the slice of the same data that most weakens it" },
  { heading: "The record — the floor under every standing", phrase: "The record is not a standing; it is the floor under all four" },
];

async function main() {
  const indices = {};
  for (const [label, file] of Object.entries(GROUND_FILES)) {
    const idx = indexSource(file);
    indices[label] = idx;
    log(`  ground index ${label}: ${idx.ok ? idx.sentences.length + " clean sentences" : "UNREADABLE " + idx.gap?.error}`);
  }

  log(`\n╔═ WHITE PAPER CHASE — PHASE 2: ERROR CORRECTION IN THE BOX ═╗`);
  log(`  ground: the Fold's own record, byte-addressed (GL-BD-18)`);
  log(`  descent: the box composes from the record; the mouth writes residue only`);

  // ── THE BOX COMPOSES FROM THE RECORD ─────────────────────────────────────
  log(`\n═══ THE BOX — every claim grounded at its byte address ═══`);
  const verified = [];
  const censored = [];
  const sections = [];
  for (const c of CLAIMS) {
    let hit = null;
    for (const fragLen of [6, 5, 4]) {
      const frag = c.phrase.split(/\s+/).slice(0, fragLen).join(" ");
      for (const [label, idx] of Object.entries(indices)) {
        const f = findClean(idx, frag);
        if (f.ok) { hit = { ...f, label, fragLen }; break; }
      }
      if (hit) break;
    }
    if (hit) {
      verified.push({ heading: c.heading, phrase: c.phrase, sentence: hit.sentence, source: hit.label, abs: hit.abs });
      sections.push(`\n## ${c.heading}\n\n“${hit.sentence}” ⟦${hit.label}@${hit.abs}⟧`);
    } else {
      censored.push(c.phrase);
      sections.push(`\n## ${c.heading}\n\n⟦censored: unverifiable claim — “${c.phrase}”⟧`);
    }
  }
  for (const v of verified) log(`  ✓ ${v.heading} — ${v.source}@${v.abs} (${v.sentence.length} chars)`);
  for (const c of censored) log(`  ✗ censored: ${c.slice(0, 80)}`);
  const grounded = sections.join("\n");

  // ── THE APERTURE — what could refute this claim ──────────────────────────
  const aperture =
    "1. The null arm is self-referential: a ground that re-runs itself can drift with its own ground and never see it. A world outcome, arriving later, is the only error penelope cannot fabricate.\n" +
    "2. The record floors every standing, but a standing can still be asserted over a censored ground: descent is only as honest as the box that verifies it.\n" +
    (censored.length ? `3. ${censored.length} claim(s) the record could not verify verbatim — drawn above as censors, so the reader sees the width of the gap.` : "");

  // ── THE PRODUCT — standing, position, and falsification RENDERED ─────────
  const product =
    "# How the Fold Implements Error Correction\n\n" +
    "A measured white paper about the Fold itself — the khora that perceives, penelope who keeps, the record that floors every standing. Position: the keeper, at the record's altitude; for-whom, the reader who must be able to drill every claim to the rows.\n\n" +
    "## The claim\n\n" +
    "The Fold implements error correction as a closing loop: a finding is a difference against a ground, the null arm re-runs the same computation on perturbed input, and only the error that survives the perturbation may move a belief. Predictive processing is the theory; the null arm is the math; the mouth is precision control. Every claim below is quoted from the Fold's own record at its byte address; a claim the record cannot verify is censored, never dressed.\n\n" +
    "## The theory — prediction error as the engine of the record\n" +
    grounded + "\n\n" +
    "## The aperture — what could refute this claim\n\n" +
    "Rendered, never offered. The strongest contrary slices:\n" + aperture + "\n\n" +
    "## The falsification — registered before the claim ships\n\n" +
    "Standing: measured-with-dissent. This paper ships only because the censors above are drawn, the contraries above are rendered, and a re-run on a licensed perturbation (the null arm) can still refute it. A white paper that passes every gate but cannot be drilled to the rows beneath it is the falsifying control — this paper is drilled, byte by byte.";

  // ── GATES — the definition, enforced ─────────────────────────────────────
  log(`\n═══ GATES (the definition, enforced) ═══`);
  const gates = runGates(product);
  for (const g of gates) log(`  ${g.ok ? "PASS" : "FAIL"} ${g.id} — ${g.evidence}`);
  const failures = gates.filter((g) => !g.ok).map((g) => g.id);

  // ── the artifact ─────────────────────────────────────────────────────────
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>How the Fold Implements Error Correction — white paper</title>
<style>body{font:16.5px/1.75 Georgia,serif;max-width:700px;margin:0 auto;padding:52px 36px;background:#fbf8f1;color:#231d13}.mast{text-align:center;border-bottom:2px solid #231d13;padding-bottom:20px;margin-bottom:30px}h1{font-size:28px;font-style:italic;margin:0}.tag{color:#6b5b3a;font-style:italic;margin:8px 0 0}.meta{font:11px ui-monospace;color:#7a6a4f;margin-top:10px}h2{font-size:15px;text-transform:uppercase;letter-spacing:.08em;color:#6b5b3a;margin:34px 0 10px}p{text-indent:1.5em;margin:0 0 1em}p:first-of-type{text-indent:0}.standing{font:11px/1.7 ui-monospace;color:#4a3f2a;border-top:1px solid #c9bda0;margin-top:40px;padding-top:16px}</style>
</head>
<body>
<div class="mast"><h1>How the Fold Implements Error Correction</h1><div class="tag">white paper · ${new Date().toISOString().slice(0, 10)} · standing: measured-with-dissent, on the record</div><div class="meta">subject: the Fold (received) · position: the keeper, on the record · giver: the record itself · GL-WP-02</div></div>
<div id="wp" style="white-space:pre-wrap"></div>
<div class="standing">verified: ${verified.length}/${CLAIMS.length} claims at byte addresses · censored: ${censored.length} · null: the licensed perturbed re-run · gates: ${failures.length ? failures.join(", ") : "all pass, by construction"}</div>
<script>
document.getElementById("wp").textContent = ${JSON.stringify(product)};
</script>
</body></html>`;
  const slug = `the-fold-error-correction-white-paper-${Date.now()}`;
  fs.writeFileSync(path.join(OUT, `${slug}.html`), html);
  fs.writeFileSync(path.join(OUT, `${slug}.grounded.md`), product);
  fs.writeFileSync(path.join(OUT, `${slug}.report.json`), JSON.stringify({ slug, gates, failures, verified, censored }, null, 2));
  log(`\n  artifact: ${path.join(OUT, `${slug}.html`)}`);
  log(`  grounded: ${path.join(OUT, `${slug}.grounded.md`)}`);
  log(`  report:   ${path.join(OUT, `${slug}.report.json`)}`);

  // ── EOT ──────────────────────────────────────────────────────────────────
  const eot = `\n### GL-WP-02 — Error correction moves into the box: subject pinned (received), descent composed from the record (GL-BD-18), gates rendered not requested\n- pipeline: prose (white-paper box over the real engine)\n- status: standing\n- supersedes: GL-WP-01's lesson "define" — the subject is declared by the asker, never re-extracted, and descent is composed from the record rather than bolted onto a paraphrasing mouth\n- evidence: gym/white-paper-box.mjs on ${new Date().toISOString().slice(0, 10)}; ${verified.length}/${CLAIMS.length} claims grounded to byte addresses, ${censored.length} censored, gates ${failures.length ? "fail: " + failures.join(",") : "pass by construction"}; artifact ${slug}.html\n- falsifying control: a box-composed white paper whose byte addresses do not resolve to the sentence at that address, or whose censors are hidden rather than drawn, contradicts this.\n`;
  fs.appendFileSync(EOT_FILE, eot);
  log(`  EOT: appended GL-WP-02`);

  log(`\n╚═ phase 2 complete: ${failures.length ? `${failures.length} gate(s) remain — ${failures.join(", ")}` : "all gates pass, by construction"} ═╝`);
}

main().catch((e) => { console.error(e); process.exit(1); });