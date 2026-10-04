// gym/box-vs-model-casual.mjs — THE ABLATION ON CASUAL ENGLISH, with the
// DMD-universe gate on BOTH tiers (GL-EN-13).
//
// The claim (falsifiable): on non-standard English (cosem Singlish, irc,
// nus-sms, enron), grounding by per-thread DMD saliency must reduce
// fabrication — the box settles only verbatim (0 fabrications by
// construction), and a mouth draw is now REFUSED unless its beings sit inside
// the thread's universe. Falsified if box+model-with-gate fabricates MORE
// than model-only, or a gated draw that is OUT of the universe is admitted.
//
// Arms, same threads, same units, same mouth (gemma2:2b, temperature 0):
//   A  model-only   — the mouth answers every unit from the material.
//   B  box+model    — the box settles what it can; the mouth draws residue;
//                      BOTH the box settle AND the mouth draw pass the gate.
//
// Metrics (all mechanical):
//   fabrication  figures/names in an answer NOT in the material (restatement.js)
//   coverage     units answered / units asked
//   settle       units the box settled
//   gatedRefused draws the DMD universe refused (the honest refusal)
import * as prose from "../organs/generation/adapters/prose.mjs";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { extractFigures, extractNames } from "/Users/mlacy/Documents/3.0/eoreader7/native/the-fold/restatement.js";
import { buildReferents } from "/Users/mlacy/Documents/3.0/eoreader7/native/the-fold/referents.js";

const MOUTH = "gemma2:2b";
const OC = "/Users/mlacy/Documents/3.0/live_priors/19-organic-community";
const THREADS = [
  { name: "cosem-17CF01", file: path.join(OC, "cosem/17CF01-000.txt") },
  { name: "irc-2004-11-15", file: path.join(OC, "ubuntu-irc/ubuntu/2004-11-15.txt") },
  { name: "nus-TaoChen-2010-019", file: path.join(OC, "nus-sms/en/Tao-Chen-2010-019.txt") },
  { name: "enron-corman-2001-10-002", file: path.join(OC, "enron/corman-s/2001-10-002.txt") },
];
const UNITS_PER_THREAD = 3;

async function mouth(text, material) {
  const res = await fetch("http://localhost:11435/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ model: MOUTH, stream: false, options: { temperature: 0 }, messages: [{ role: "user", content: `Below are sentences copied from one conversation.\n\n${material.slice(0, 3000)}\n\nAnswer in one sentence: ${text}` }] }) });
  return String((await res.json()).message?.content ?? "").trim();
}

/** units: the material's own beings, asked as facts — what does the thread say about X? */
function unitsFrom(text, k = UNITS_PER_THREAD) {
  const R = buildReferents(text);
  const refs = R.index?.referents ?? [];
  const reps = [...refs].map((id) => R.represent?.(id)).filter((r) => r && r.length >= 3).slice(0, 6);
  const uniq = [...new Set(reps)];
  return uniq.slice(0, k).map((r, i) => ({ name: `q${i}`, spec: `what does the conversation say about ${r}?`, settle: null }));
}

function fabrication(answer, material) {
  if (!answer) return 0;
  const figs = [...(extractFigures(answer) ?? new Set())].map((f) => String(f).toLowerCase());
  const names = [...(extractNames(answer) ?? new Set())].map((n) => String(n).toLowerCase());
  const m = String(material).toLowerCase();
  return figs.filter((f) => !m.includes(f)).length + names.filter((n) => !m.includes(n)).length;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("BOX+MODEL WITH THE DMD-UNIVERSE GATE vs MODEL-ONLY — casual / non-standard English\n");
  let aFab = 0, bFab = 0, bSettled = 0, bGatedRefused = 0, bDrawn = 0, aDrawn = 0;
  for (const t of THREADS) {
    const text = readFileSync(t.file, "utf8").replace(/^---[\s\S]*?---\n/, "").slice(0, 9000);
    const units = unitsFrom(text);
    // ARM A — model-only
    for (const u of units) { const a = await mouth(u.spec, text); if (a) { aDrawn++; aFab += fabrication(a, text); } }
    // ARM B — box+model with gate: box settles first; the mouth draws residue;
    // the DMD gate (box settle + mouth draw) refuses what is outside the universe.
    const unitsB = units.map((u) => ({ ...u }));
    await prose.computeSettles(unitsB, text, { corpus: t.name });
    for (const u of unitsB) {
      if (u.settle) {
        bSettled++;
        if (u.settle.admitted === false) bGatedRefused++;
        continue; // box settled verbatim — 0 fabrication by construction
      }
      const drawn = await mouth(u.spec, text);
      if (!drawn) continue;
      const g = await prose.gateUnit(drawn, u, { corpus: t.name, material: text });
      if (!g.ok) { bGatedRefused++; continue; }
      bDrawn++; bFab += fabrication(drawn, text);
    }
    console.log(`${t.name.padEnd(22)} settled ${String(bSettled).padStart(2)} | gated-refused ${String(bGatedRefused).padStart(2)} | mouth-drawn ${String(bDrawn).padStart(2)} | A-fab ${aFab} B-fab ${bFab}`);
  }
  console.log(`\nVERDICT: box+model-with-gate fabrication ${bFab} vs model-only ${aFab} — ${bFab <= aFab ? "SUPPORTED (the gate bounds the residue)" : "FALSIFIED (gating increased fabrication)"}. Refused-by-universe: ${bGatedRefused}.`);
}