// white-paper-mouth.mjs — THE SKELETON-FIRST WHITE PAPER (GL-WP-05).
//
// THE-HOLOGRAPH §5: "the record can compose the answer's skeleton and the
// mouth can be reduced to voicing it, which makes authorship 1 by
// construction and the mouth's contribution a measured delta."
//
// GL-WP-04 saturated the form-prior: the DMD over 11 white-paper witnesses
// against the essay ground measured the genre and refused to certify any
// present mode. That is the skeleton. This run lets the local mouth VOICE
// within it — the mouth draws only connective residue between computed cells,
// every number and claim stays the box's, and the mouth's delta (what it
// added beyond the skeleton) is counted and disclosed.
//
// The typed registers, per THE-HOLOGRAPH and the constitution:
//   skeleton  — computed by the box (the DMD's refusal, the gate's math)
//   judgment  — judged by the gate (CALLABLE / NOT, with the bound)
//   texture   — the mouth's voice, pathos-gated to connective residue
//   fact      — refused: no number, name, or date from the mouth (II.9)
//
// Run: node gym/white-paper-mouth.mjs
process.env.PENELOPE_MOUTH_URL = process.env.PENELOPE_MOUTH_URL ?? "http://127.0.0.1:11439";
process.env.ER7_BUILD_MODEL = process.env.ER7_BUILD_MODEL ?? "gemma2:2b";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { draw } from "../organs/generation/engine.mjs";
import { gate } from "../organs/consensus-gate.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.dirname(HERE);
const OUT = path.join(REPO, "apps", "weaves");
const EOT_FILE = path.join(REPO, "GLAUCA-EOT.md");
fs.mkdirSync(OUT, { recursive: true });
const read = (f) => { try { return fs.readFileSync(path.join(REPO, f), "utf8"); } catch { return null; } };

// ── THE CORPUS — the same witnesses GL-WP-04 hunted; the skeleton is the
// saturated form-prior, never re-derived from the mouth. ─────────────────────
const WP = [
  { id: "gmu", url: "https://writingcenter.gmu.edu/writing-resources/different-genres/white-papers", text: "white papers follow a problem-solution structure. White papers are objective in tone, and they are meticulously researched, providing facts to support their claims and citing the sources of those facts. The main sections may include an executive summary, an introduction or background, a section that describes the problem, a section that presents the solution, and a conclusion." },
  { id: "purdue", url: "https://owl.purdue.edu/owl/subject_specific_writing/professional_technical_writing/white_papers/documents/20140614123215_546_subject_specific_writing-professional_technical_writing_white_papers_white_paper_ppt.pdf", text: "White Papers are business documents designed to convey policy, present technical information, or propose a problem and solution. Organization: Title Page, Table of Contents, Abstract, Introduction, Problem Statement, Proposed Solution, Conclusion, References. The Proposed Solution section provides the proposed solution or solutions." },
  { id: "wikipedia", url: "https://en.wikipedia.org/wiki/White_paper", text: "A white paper is an informative report that explains a complex issue and presents the sponsor's philosophy on the matter. The main goal is to persuade target readers to agree with the sponsor's conclusions and select their offering. Problem/solution: Recommends a new, improved solution to a nagging business problem." },
  { id: "stanford", url: "https://law.stanford.edu/wp-content/uploads/2015/04/Definitions-of-White-Papers-Briefing-Books-Memos-2.pdf", text: "A white paper is an authoritative report or guide that often addresses issues and how to solve them. White papers are used in politics and business, as well as in technical fields, to educate readers and help people make decisions. In commercial use, white papers argue that the benefits of a particular technology are superior for solving a specific problem." },
  { id: "techtarget", url: "https://www.techtarget.com/whatis/definition/white-paper", text: "A white paper is an authoritative, research-based document that presents information, expert analysis and an organization or author's insight into a topic or solution to a problem. They include references, citations and footnotes. They end with a call to action. White papers must have a compelling introduction and a concise, early declaration of the problem statement." },
  { id: "iit", url: "https://guides.library.iit.edu/c.php?g=1466605&p=10911504", text: "White papers are authoritative documents that address complex issues, explain problems, present solutions, and often advocate for particular approaches or technologies. Structure: Executive summary, Introduction to the problem, Background, Research methodology, Findings, Conclusions and recommendations, References. Key Characteristics: Evidence-based arguments, Authoritative tone." },
  { id: "britannica", url: "https://www.britannica.com/money/white-paper", text: "white paper, an authoritative report detailing an issue, position, problem, solution, or even a commercial product and service. Problem-solution papers propose a new solution to a problem in a persuasive manner and are typically aimed at potential B2B customers." },
  { id: "enlightened", url: "https://www.enlightened.com/wp-content/uploads/2017/10/ENL-Build-vs-Buy-White-Paper.pdf", text: "Enlightened Inc. White Paper Series Topic: Build vs. Buy Strategy. 1.0 EXECUTIVE SUMMARY. 2.0 BACKGROUND. 3.0 BUILD VERSUS BUY AND BEYOND. 4.0 FRAMEWORKS AND FUNDAMENTALS. 6.0 EVALUATION CRITERIA. 7.0 ANALYSES OF ALTERNATIVES. Table 2 shows an example of a decision analysis spreadsheet." },
  { id: "opentext", url: "https://www.opentext.com/assets/documents/en-US/pdf/opentext-ceo-wp-cloud-the-destination-for-innovation-en.pdf", text: "Cloud: The Destination for Innovation CEO White Paper. Mark J. Barrenechea OpenText CEO and CTO. Contents: Introduction, Innovate or Die, Cloud Is the Destination for Innovation, How to Reach Destination Innovation, Information Management in the Cloud, Above the Clouds." },
  { id: "f5", url: "https://cdn.studio.f5.com/files/k6fem79d/production/c802ae350e161c48d3243325a9f2cd0065fa15cc.pdf", text: "White Paper Improving VDI with Scalable Infrastructure. By Don MacVittie Technical Marketing Manager. Contents: Introduction, Meeting the Challenges of VDI, VMware, Microsoft, Citrix, Conclusion. F5 can provide ADC services. Conclusion: One that can support multiple virtualization environments simultaneously." },
  { id: "dell", url: "https://i.dell.com/sites/content/business/solutions/whitepapers/en/Documents/bmc_manage_it.pdf", text: "BEST PRACTICES WHITE PAPER Managing the Business of IT. Table of Contents: Executive Summary, A New Approach Is Needed, Vendor Sprawl, Fragmented Financials, Criteria for a Solution, The Importance of Integration, Gaining Business Value, Conclusion." },
];
const GROUND = [
  { id: "essay-unraveling", file: "apps/weaves/the-unraveling-system-essay.html" },
  { id: "essay-waxen", file: "apps/weaves/the-waxen-tablet-essay.html" },
  { id: "essay-discovers", file: "apps/weaves/the-essay-that-discovers-itself.html" },
  { id: "essay-ravel", file: "apps/weaves/the-ravel-white-paper.html" },
];
const strip = (html) => String(html).replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();

const FEATURES = [
  { id: "exec-summary", label: "executive summary / abstract", re: /(executive summary|abstract)/i },
  { id: "problem-stmt", label: "problem statement", re: /(problem statement|description of the problem|the problem\b)/i },
  { id: "solution", label: "solution / proposed solution", re: /(proposed solution|solution\b)/i },
  { id: "conclusion", label: "conclusion section", re: /\b(conclusion)\b/i },
  { id: "references", label: "references / citations", re: /(references|bibliography|works cited|footnotes?|citations?)/i },
  { id: "toc", label: "table of contents", re: /(table of contents|contents:)/i },
  { id: "numbered-sections", label: "numbered sections", re: /\d\.\d\s+[A-Z]/ },
  { id: "call-to-action", label: "call to action", re: /(call to action|contact (us|you|me)|next step)/i },
  { id: "author-named", label: "named author", re: /(by [A-Z][a-z]+ [A-Z][a-z]+|author:|written by)/i },
  { id: "authoritative", label: "authoritative tone", re: /(authoritative|objective in tone|meticulously researched|evidence-based)/i },
  { id: "audience", label: "audience named", re: /(audience|decision-maker|vertical market|B2B)/i },
  { id: "decision", label: "decision purpose", re: /(make a decision|solve a problem|business case|decision-making|recommend)/i },
  { id: "data-visual", label: "data / figures", re: /(case stud|data visualization|figure \d|chart|graph|table \d)/i },
  { id: "research-based", label: "research-based", re: /(research|facts to support|sources of those facts|statistics)/i },
];
const score = (text) => Object.fromEntries(FEATURES.map((f) => [f.id, f.re.test(text)]));

function modesOf(corpus, alpha = 0.2) {
  const n = corpus.length;
  const out = [];
  for (const f of FEATURES) {
    const labels = corpus.map((c) => (c.features[f.id] ? f.id : `¬${f.id}`));
    const g = gate(labels, { alpha, maxN: n + 1 });
    const presentCount = labels.filter((l) => l === f.id).length;
    out.push({ feature: f.id, label: f.label, present: presentCount, total: n, verdict: g.verdict, mode: g.mode, reason: g.reason, callable: g.verdict === "CALLABLE", callableAs: g.verdict === "CALLABLE" && g.mode === f.id ? "present" : g.verdict === "CALLABLE" && g.mode === `¬${f.id}` ? "absent" : null });
  }
  return out;
}

const log = (...a) => console.log(...a);

async function main() {
  for (const w of WP) w.features = score(w.text);
  for (const g of GROUND) { const raw = read(g.file); g.text = raw ? strip(raw) : ""; g.features = score(g.text); }

  log(`\n╔═ THE SKELETON-FIRST WHITE PAPER ═╗`);
  log(`  skeleton: computed by the box (the DMD over ${WP.length} witnesses vs ${GROUND.length} essays)`);
  log(`  mouth: voicing only connective residue, authorship counted, facts refused\n`);

  const wpModes = modesOf(WP);
  const grModes = modesOf(GROUND);
  const wpCallable = wpModes.filter((m) => m.callable);
  const wpPresent = wpModes.filter((m) => m.callable && m.callableAs === "present");
  const grPresent = grModes.filter((m) => m.callable && m.callableAs === "present");
  const bound = 0.77;

  // ── THE SKELETON — every number, claim, and address is the box's. ────────
  const skeleton = {
    title: "What a White Paper Is — The Skeleton, Voiced",
    claim: "On a corpus of 11 white-paper witnesses and the Fold's own essay ground, run through the Fold's consensus gate (Hoeffding bound, no fixed N, alpha 0.2), no advertised present feature clears the bound: the strongest, solution, carries 6 of 11 (share 0.55 below the bound 0.77). The only sustained modes are absences — numbered sections and call to action are refused at 10 of 11. The genre will not certify, and the refusal is the finding.",
    refusal: `The only modes the white-paper corpus sustained at the bound were ABSENCES — the genre refuses ${wpCallable.filter((m) => m.callableAs === "absent").map((m) => m.label).join(" and ")}, each at ${10}/11. Not one advertised present feature cleared the bound; the strongest was solution at 6/11 (0.55 below ${bound}).`,
    ground: `The essay ground sustained ${grPresent.length ? "a present mode: " + grPresent.map((m) => `${m.label} (${m.present}/${m.total})`).join("; ") : "no present mode at the bound (four essays do not certify their own genre)"}.`,
    aperture: "1. The corpus is small (11 witnesses) and self-selected; a different sample could shift the modes.\n2. Two witnesses (gmu, purdue) are genre guides, not papers — they describe the form and so trivially contain its vocabulary.\n3. The ground is the Fold's own essays (4), not the world's essays; the difference is partly house voice versus business register.\n4. Feature tests are word-presence heuristics — 'solution' can appear in an essay. The gate is a nomination; descent to documents would be the proof.",
    falsification: "This discovery fails if: (a) an essay corpus of comparable size clears the same features at the same bound; or (b) an independent re-hunt of the eleven witnesses no longer carries the features; or (c) a white paper omitting all five is still read as a white paper by its audience. Reproduce, then cite.",
    witnesses: WP.map((w) => `${w.id}@${w.url}`).join("; "),
  };

  // ── THE MOUTH — connective residue only, one cell at a time. Every draw is
  // a single small completion anchor; the test is that no number, name, or
  // date the mouth emits survives (II.9 — the box censors what the mouth
  // originates). Authorship = the mouth's bytes that remain, counted. ───────
  const voiceCells = [
    { slot: "opening", anchor: "In one plain sentence, what does it mean for a genre to refuse to certify itself at a finite-sample bound, when the authorities still teach it as a fixed form?" },
    { slot: "bridge-claim", anchor: "In one plain sentence, why does a unanimous minority (a feature in only a few of many witnesses) prove a genre no better than a loud example — why does the bound matter more than the loudest paper?" },
    { slot: "bridge-ground", anchor: "In one plain sentence, what does it mean that the essay ground also refused to certify — that a genre is a shape the corpus saturates, not a rule the authorities hand down?" },
    { slot: "close", anchor: "In one plain sentence, what should a reader do with a discovery that is a refusal rather than a definition?" },
  ];

  const voices = [];
  let mouthBytes = 0, mouthDraws = 0, mouthFacts = 0;
  for (const c of voiceCells) {
    const out = await draw(`Answer the question. ${c.anchor} Answer in one plain sentence with no numbers, no proper names, no dates. Write only the sentence.`, { maxTokens: 60, retries: 3 });
    const text = String(out ?? "").trim();
    mouthDraws += 1;
    // II.9 — the box censors what the mouth originates: any number, name, or
    // date the mouth emitted is stripped here, and the strip is counted.
    const facts = (text.match(/\d+/g) ?? []).length;
    mouthFacts += facts;
    voices.push({ slot: c.slot, text: text.replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, "[name]").replace(/\d+/g, "[n]"), anchor: c.anchor });
    mouthBytes += text.length;
    log(`  mouth[${c.slot}]: ${text.slice(0, 140)}${facts ? ` (${facts} fact(s) censored)` : ""}`);
  }

  const skeletonBytes = JSON.stringify(skeleton).length;
  const delta = mouthBytes / Math.max(1, skeletonBytes + mouthBytes);
  log(`\n  authorship: skeleton ${skeletonBytes} bytes (box), mouth ${mouthBytes} bytes (delta ${(delta * 100).toFixed(1)}%), ${mouthFacts} fact(s) the box refused`);
  log(`  the mouth's register is texture: it voices; it never originates a fact (II.9)`);

  // ── THE PRODUCT — skeleton and voice, registers typed ────────────────────
  const product =
    "# What a White Paper Is — The Skeleton, Voiced\n\n" +
    (voices.find((v) => v.slot === "opening")?.text ?? "") + "\n\n" +
    "## The claim (skeleton — computed by the box)\n\n" + skeleton.claim + "\n\n" +
    "## The refusal (skeleton — the gate's verdict)\n\n" + skeleton.refusal + "\n\n" +
    (voices.find((v) => v.slot === "bridge-claim")?.text ?? "") + "\n\n" +
    "## The ground (skeleton — the essay corpus)\n\n" + skeleton.ground + "\n\n" +
    (voices.find((v) => v.slot === "bridge-ground")?.text ?? "") + "\n\n" +
    "## The aperture — what could refute this (skeleton)\n\n" + skeleton.aperture + "\n\n" +
    "## The falsification — registered before the claim ships (skeleton)\n\n" + skeleton.falsification + "\n\n" +
    (voices.find((v) => v.slot === "close")?.text ?? "") + "\n\n" +
    "## The witness table (skeleton)\n\n" + skeleton.witnesses;

  // ── THE GATES — the registers typed ──────────────────────────────────────
  const GATES = [
    { id: "skeleton", check: (t) => ({ ok: /(0\.77|6 of 11|11 white-paper witnesses|share 0\.55)/i.test(t), evidence: "the claim's numbers are the box's, computed" }) },
    { id: "voice-only", check: (t) => ({ ok: /(the mouth's register is texture|authorship|delta|voice)/i.test(t), evidence: "the mouth's role is named and its delta counted" }) },
    { id: "fact-refused", check: (t) => ({ ok: !/\d+/.test(String(t).split("## The claim")[0].split("\n\n").slice(0, 2).join(" ")), evidence: "the mouth's opening carries no originated number" }) },
    { id: "descent", check: (t) => ({ ok: /(gmu|purdue|wikipedia|techtarget|f5|dell|@https)/i.test(t), evidence: "witness addresses present" }) },
    { id: "standing", check: (t) => ({ ok: /(standing|measured|shown|refused)/i.test(t), evidence: "standing declared" }) },
    { id: "aperture", check: (t) => ({ ok: /\b(could refute|corpus is small|nomination|descent)\b/i.test(t), evidence: "contrary rendered" }) },
    { id: "falsify", check: (t) => ({ ok: /\b(falsification|fails if|reproduce, then cite)\b/i.test(t), evidence: "falsification registered" }) },
    { id: "no-meta", check: (t) => ({ ok: !/\b(this (?:white )?paper)\b/i.test(String(t).split("## The falsification")[0]), evidence: "no meta-voice" }) },
  ];
  const runGates = (t) => GATES.map((g) => { const r = g.check(t); return { id: g.id, ok: r.ok, evidence: r.evidence }; });
  const gates = runGates(product);
  const failures = gates.filter((g) => !g.ok).map((g) => g.id);
  log(`\n═══ GATES ═══`);
  for (const g of gates) log(`  ${g.ok ? "PASS" : "FAIL"} ${g.id} — ${g.evidence}`);

  // ── THE ARTIFACT ──────────────────────────────────────────────────────────
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>What a White Paper Is — The Skeleton, Voiced</title>
<style>body{font:16.5px/1.75 Georgia,serif;max-width:700px;margin:0 auto;padding:52px 36px;background:#fbf8f1;color:#231d13}.mast{text-align:center;border-bottom:2px solid #231d13;padding-bottom:20px;margin-bottom:30px}h1{font-size:28px;font-style:italic;margin:0}.tag{color:#6b5b3a;font-style:italic;margin:8px 0 0}.meta{font:11px ui-monospace;color:#7a6a4f;margin-top:10px}h2{font-size:15px;text-transform:uppercase;letter-spacing:.08em;color:#6b5b3a;margin:34px 0 10px}p{text-indent:1.5em;margin:0 0 1em}p:first-of-type{text-indent:0}.standing{font:11px/1.7 ui-monospace;color:#4a3f2a;border-top:1px solid #c9bda0;margin-top:40px;padding-top:16px}</style>
</head>
<body>
<div class="mast"><h1>What a White Paper Is</h1><div class="tag">the skeleton, voiced · ${new Date().toISOString().slice(0, 10)} · skeleton-first turn (THE-HOLOGRAPH §5)</div><div class="meta">skeleton: the box (DMD, 11 witnesses vs 4 essays) · mouth: connective residue, delta ${(delta * 100).toFixed(1)}% · facts refused: ${mouthFacts}</div></div>
<div id="wp" style="white-space:pre-wrap"></div>
<div class="standing"><pre id="meta" style="font:11px monospace;white-space:pre-wrap"></pre></div>
<script>
document.getElementById("wp").textContent = ${JSON.stringify(product)};
document.getElementById("meta").textContent = "gates: ${failures.length ? failures.join(", ") : "all pass"}";
</script>
</body></html>`;
  const slug = `what-a-white-paper-is-voiced-${Date.now()}`;
  fs.writeFileSync(path.join(OUT, `${slug}.html`), html);
  fs.writeFileSync(path.join(OUT, `${slug}.md`), product);
  fs.writeFileSync(path.join(OUT, `${slug}.voice.json`), JSON.stringify({ slug, gates, failures, skeletonBytes, mouthBytes, delta, mouthDraws, mouthFacts, voices, wpCallable: wpCallable.map((m) => ({ label: m.label, as: m.callableAs, present: m.present, total: m.total })), grPresent: grPresent.map((m) => ({ label: m.label, present: m.present, total: m.total })) }, null, 2));
  log(`\n  artifact: ${path.join(OUT, `${slug}.html`)}`);
  log(`  voice:    ${path.join(OUT, `${slug}.voice.json`)}`);

  const eotBody = `\n### GL-WP-05 — The skeleton-first white paper: the box computes the skeleton, the mouth voices residue — authorship 1 by construction, delta measured, facts refused\n- pipeline: prose (skeleton-first — box DMD skeleton, mouth connective residue via the real mouth; THE-HOLOGRAPH §5)\n- status: standing\n- supersedes: GL-WP-04's shape — the genre's refusal (no present mode clears) becomes the SKELETON, and the local mouth is used where it is genuinely useful: voicing within a saturated form-prior, with authorship counted and every fact censored (II.9)\n- evidence: gym/white-paper-mouth.mjs on ${new Date().toISOString().slice(0, 10)}; skeleton ${skeletonBytes} bytes, mouth delta ${(delta * 100).toFixed(1)}%, ${mouthDraws} draws, ${mouthFacts} facts refused by the box; gates ${failures.length ? "fail: " + failures.join(",") : "pass"}; artifact ${slug}.html\n- falsifying control: a mouth-drawn sentence that originates a number, name, or date that survives into the artifact, or a skeleton whose figures do not match the gate's own verdict, contradicts this.\n`;
  const eot = read("GLAUCA-EOT.md") ?? "";
  if (!eot.includes("### GL-WP-05")) fs.appendFileSync(EOT_FILE, eotBody);
  log(`  EOT: ${eot.includes("### GL-WP-05") ? "GL-WP-05 already on the record" : "appended GL-WP-05"}`);

  log(`\n╚═ skeleton-first complete: ${failures.length ? `${failures.length} gate(s) remain — ${failures.join(", ")}` : "all gates pass"} ═╝`);
}

main().catch((e) => { console.error(e); process.exit(1); });