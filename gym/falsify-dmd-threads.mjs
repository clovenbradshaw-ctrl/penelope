// penelope/gym/falsify-dmd-threads.mjs — THE FINER FOLD: per-thread universes.
//
// The register-level falsify (the-fold/falsify-dmd-universe.mjs) folded each
// casual register as ONE for-whom over the whole corpus — but cosem is many
// conversations, enron many senders, irc many channel-days, nus-sms many
// person-years. Mixing them flattens the trajectory (many for-whoms, one
// universe) and the register reads below its null. This experiment folds each
// THREAD (one file = one conversation) as its own for-whom and asks:
//
//   (a) does a THREAD's own discovery trajectory have COHERENT MASS above its
//       own SHUFFLED NULL (order-dependent structure = DMD saliency)?
//   (b) does a FOREIGN claim (from another thread / invented referents) fall
//       OUTSIDE the thread's universe — by the thread's OWN beings (Sullivan:
//       buildReferents), never by string containment?
//
// Uses the real organs (eoreader7 for-whom.js, referents.js, relations-gfp.js)
// — never a re-invention. Runs standalone: node gym/falsify-dmd-threads.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { splitSentences } from "../../eoreader7/native/adapters/text/spans.js";
import { buildReferents } from "../../eoreader7/native/the-fold/referents.js";
import { extractGfpRelations } from "../../eoreader7/native/adapters/text/relations-gfp.js";
import { coherentMass, trajectoryNull, discoveryTrajectory } from "../../eoreader7/native/kernel/for-whom.js";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OC = path.resolve(HERE, "../../live_priors/19-organic-community");
const REGISTERS = {
  cosem: { dir: "cosem", note: "Singapore colloquial (Singlish)" },
  enron: { dir: "enron", note: "Enron mail — business chat" },
  irc: { dir: "ubuntu-irc/ubuntu", note: "Ubuntu #ubuntu 2004" },
  "nus-sms": { dir: "nus-sms/en", note: "SMS Singapore" },
  lccc: { dir: "lccc", note: "LCCC" },
};
const MIN_THREAD_SENTS = 10;   // a thread needs enough encounters to have dynamics
const MIN_TRAJ = 8;            // for-whom's trajectory evaluability floor

function walkFiles(d) {
  const out = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const a = path.join(d, e.name);
    if (e.isDirectory()) out.push(...walkFiles(a));
    else if (/\.(txt|md)$/i.test(e.name)) out.push(a);
  }
  return out;
}
function sentencesOf(text) {
  return splitSentences(text.replace(/^---[\s\S]*?---\n/, "")).map((s) => String(s.text ?? s)).filter((t) => (t.match(/[A-Za-z]{2,}/g) || []).length >= 3);
}

/** Sullivan + Chomsky entries for ONE thread: the GFP relations between the
 *  thread's OWN resolved beings. The trajectory is over encounterRefs, so a
 *  thread whose cast persists has real dynamics; one-off chat stays flat. */
function threadEntries(threadText, R) {
  const sents = sentencesOf(threadText);
  const entries = [];
  for (let i = 0; i < sents.length; i++) {
    const rels = extractGfpRelations(sents[i], { minRec: 2, clauseAware: false });
    for (const r of rels) {
      const e1 = String(r.end1 ?? ""), e2 = String(r.end2 ?? "");
      if (!e1 || !e2) continue;
      const ids = new Set([...(R.resolveText?.(e1) ?? new Set()), ...(R.resolveText?.(e2) ?? new Set())]);
      if (!ids.size) continue; // only relations between the thread's OWN beings count
      entries.push({ schema: "EOHyperedge@1", encounterRef: `enc${i}`, relation: String(r.label).toLowerCase().split(/\s+/)[0], referent: [...ids].sort().join("+") });
    }
  }
  return entries;
}

function threadGate(entries, { seed = 42 } = {}) {
  const traj = discoveryTrajectory(entries);
  if (traj.length < MIN_TRAJ) return { evaluable: false, trajLen: traj.length };
  const real = coherentMass(traj);
  const floor = trajectoryNull(traj, { draws: 40, seed });
  return { evaluable: true, real, floor, coherent: real > floor, trajLen: traj.length };
}

/** Is a foreign claim OUTSIDE this thread's universe? Sullivan: its beings are
 *  the referents the thread individuated. A claim that names none of them is
 *  foreign — by the thread's OWN cast, never by string match. */
function foreignRatio(claimText, R) {
  const ids = new Set(R.resolveText(claimText));
  const cast = new Set((R.index?.referents ?? []));
  if (!ids.size) return 1; // names nothing the thread individuated = fully foreign
  let in_ = 0;
  for (const id of ids) if (cast.has(id)) in_++;
  return 1 - in_ / ids.size; // 1 = nothing in the thread's universe
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("THE FINER FOLD — per-thread universes on casual / non-standard English priors\n");
  const summary = [];
  for (const key of Object.keys(REGISTERS)) {
    const reg = REGISTERS[key];
    const dir = path.join(OC, reg.dir);
    if (!fs.existsSync(dir)) { console.log(`${key}: absent, skipped`); continue; }
    const files = walkFiles(dir).slice(0, 40);
    let realThreads = 0, evalThreads = 0, gaps = 0, totalThreads = files.length;
    const coherentThreads = [];
    for (const f of files) {
      const text = fs.readFileSync(f, "utf8");
      const sents = sentencesOf(text);
      if (sents.length < MIN_THREAD_SENTS) { gaps++; continue; } // too short to have dynamics — NAMED, not silent
      const R = buildReferents(text);
      const entries = threadEntries(text, R);
      if (!entries.length) { gaps++; continue; }
      const g = threadGate(entries);
      if (!g.evaluable) { gaps++; continue; }
      evalThreads++;
      if (g.coherent) { realThreads++; coherentThreads.push({ file: path.relative(dir, f), real: +g.real.toFixed(3), floor: +g.floor.toFixed(3) }); }
    }
    const pct = evalThreads ? ((realThreads / evalThreads) * 100).toFixed(0) : "–";
    summary.push({ key, evalThreads, realThreads, gaps, totalThreads });
    console.log(`${key.padEnd(9)} ${reg.note.padEnd(34)} threads ${String(totalThreads).padStart(3)} | evaluable ${String(evalThreads).padStart(3)} | REAL universes ${String(realThreads).padStart(3)} (${pct}%) | too-short/empty ${gaps}`);
    if (coherentThreads.length) {
      console.log(`        real threads: ${coherentThreads.slice(0, 4).map((c) => `${c.file} (${c.real}>${c.floor})`).join(", ")}${coherentThreads.length > 4 ? " …" : ""}`);
    }
  }
  const tot = summary.reduce((a, r) => a + r.evalThreads, 0);
  const real = summary.reduce((a, r) => a + r.realThreads, 0);
  console.log(`\nVERDICT: ${real}/${tot} evaluable threads have a REAL universe (coherent mass above their own null). A claim is grounded iff it is admitted under the THREAD's for-whom — fold per conversation, never per corpus.`);
}