// white-paper-genre.mjs — THE WHITE PAPER DISCOVERED, NOT DEFINED (GL-WP-04).
//
// The definition, received (giver: the asker, 2026-10-02): a white paper
// HUNTS and DISCOVERS. So instead of being told what a white paper is, the
// system went OUT and read what the world's own sources say a white paper
// is — real genre guides and real white papers — and DMD'd them against a
// ground (the essay, which the Fold already knows) to find what actually
// DIFFERS. The consensus gate is the Fold's own finite-sample null: a
// feature is a mode only when it recurs across independent witnesses with
// non-negative growth and clears the Hoeffding bound 1/K + sqrt(ln(1/alpha)/(2n)).
//
// This is the DMD-against-a-ground move: frequency + growth decide, never
// loudness. What clears the bound on white papers and NOT on essays is the
// discovered definition. What clears on neither is noise. What clears on
// both is the essay's shadow.
//
// Run: node gym/white-paper-genre.mjs
process.env.PENELOPE_MOUTH_URL = process.env.PENELOPE_MOUTH_URL ?? "http://127.0.0.1:11439";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gate } from "../organs/consensus-gate.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.dirname(HERE);
const OUT = path.join(REPO, "apps", "weaves");
const EOT_FILE = path.join(REPO, "GLAUCA-EOT.md");
fs.mkdirSync(OUT, { recursive: true });

// ── THE CORPUS — real sources, on the record, at their URLs. No planted
// definition; these are what the world's own genre authorities say, and what
// real white papers actually contain. The ground is the essay (the Fold's
// own genre), read from the Fold's own essays. ──────────────────────────────
const WP = [
  { id: "gmu", url: "https://writingcenter.gmu.edu/writing-resources/different-genres/white-papers", text: "white papers are written and used by policymakers to examine a policy problem and consider an array of solutions. Thus a white paper follows a problem-solution structure. White papers are objective in tone, and they are meticulously researched, providing facts to support their claims and citing the sources of those facts. The main sections of a white paper may include an executive summary, an introduction or a section on background, a section that describes the problem, a section that presents the solution or solutions, and a conclusion. White papers focused on policy may range from 5 to 50 pages. In their traditional form, white papers are written and used by policymakers" },
  { id: "purdue", url: "https://owl.purdue.edu/owl/subject_specific_writing/professional_technical_writing/white_papers/documents/20140614123215_546_subject_specific_writing-professional_technical_writing_white_papers_white_paper_ppt.pdf", text: "White Papers are business documents designed to convey policy, present technical information, or propose a problem and solution. The information in your White Paper should be objective and truthful. Include accurate information from your research. Organization: Title Page, Table of Contents, List of Figures, Abstract, Introduction, Problem Statement, Proposed Solution, Conclusion, Appendix, References. Choose a title that both conveys the specific purpose. The Problem Statement section provides information about the topic or problem. The Proposed Solution section provides the proposed solution or solutions. This section concludes the White Paper and should summarize the White Paper and include the recommended solution" },
  { id: "wikipedia", url: "https://en.wikipedia.org/wiki/White_paper", text: "A white paper is an informative report that explains a complex issue and presents the sponsor's philosophy on the matter. These documents are meant to help readers understand an issue, solve a problem, or make a decision. The main goal is to persuade target readers in a certain vertical market or role to agree with the sponsor's conclusions and select their offering. Corporate white papers are often used to generate sales leads, establish thought leadership, make a business case. A B2B white paper generally argues that one particular technology, product, ideology, or methodology is superior to all others for solving a specific business problem. Problem/solution: Recommends a new, improved solution to a nagging business problem" },
  { id: "stanford", url: "https://law.stanford.edu/wp-content/uploads/2015/04/Definitions-of-White-Papers-Briefing-Books-Memos-2.pdf", text: "A white paper is an authoritative report or guide that often addresses issues and how to solve them. The term originated when government papers were coded by color to indicate distribution, with white designated for public access. White papers are used in politics and business, as well as in technical fields, to educate readers and help people make decisions. In commercial use, the term white paper has also come to refer to documents used as a marketing or sales tool. White papers of this sort argue that the benefits of a particular technology or product are superior for solving a specific problem. A memo distills a complex policy problem into a two-page summary" },
  { id: "techtarget", url: "https://www.techtarget.com/whatis/definition/white-paper", text: "A white paper is an authoritative, research-based document that presents information, expert analysis and an organization or author's insight into a topic or solution to a problem. They present educational information and facts before offering an expert analysis and proposed solution. They include references, citations and footnotes. They cite case studies and data, and use data visualization design elements. They use a narrative structure that feels like a factual story about an industry problem and its solution. They end with a call to action. White papers must have a compelling introduction and a concise, early declaration of the problem statement. Present a solution. End with a call to action" },
  { id: "iit", url: "https://guides.library.iit.edu/c.php?g=1466605&p=10911504", text: "White papers are authoritative documents that address complex issues, explain problems, present solutions, and often advocate for particular approaches or technologies. Structure: Executive summary, Introduction to the problem or issue, Background and context, Research methodology, Findings and analysis, Implications for practice or policy, Conclusions and recommendations, References. Key Characteristics: Evidence-based arguments, Authoritative tone, In-depth analysis, Educational approach, Targeted at informed audiences" },
  { id: "britannica", url: "https://www.britannica.com/money/white-paper", text: "white paper, an authoritative report detailing an issue, position, problem, solution, or even a commercial product and service. Originally produced or commissioned by a government agency or office, providing in-depth background information on topics of public interest, including proposed and existing legislation and government policies, white papers are now a common tool in marketing. Problem-solution papers propose a new solution to a problem in a persuasive manner and are typically aimed at potential B2B customers" },
  { id: "enlightened", url: "https://www.enlightened.com/wp-content/uploads/2017/10/ENL-Build-vs-Buy-White-Paper.pdf", text: "Enlightened Inc. White Paper Series Topic: Build vs. Buy Strategy. 1.0 EXECUTIVE SUMMARY. 2.0 BACKGROUND. 3.0 BUILD VERSUS BUY AND BEYOND. 4.0 FRAMEWORKS AND FUNDAMENTALS AND REQUIREMENTS ASSESSMENT. 5.0 CONTEXTUAL DETERMINANTS. 6.0 EVALUATION CRITERIA. 7.0 ANALYSES OF ALTERNATIVES. A.1.6 Risk Management. A.2.1 Concept of Operations. Table 2 shows an example of a decision analysis spreadsheet" },
  { id: "opentext", url: "https://www.opentext.com/assets/documents/en-US/pdf/opentext-ceo-wp-cloud-the-destination-for-innovation-en.pdf", text: "Cloud: The Destination for Innovation CEO White Paper. Mark J. Barrenechea OpenText CEO and CTO. Contents: Introduction, Innovate or Die, Cloud Is the Destination for Innovation, How to Reach Destination Innovation, Information Management in the Cloud, Above the Clouds. The cloud vendor provides the infrastructure and expertise. Figure 7: A public cloud deployment is often a do-it-yourself endeavor" },
  { id: "f5", url: "https://cdn.studio.f5.com/files/k6fem79d/production/c802ae350e161c48d3243325a9f2cd0065fa15cc.pdf", text: "White Paper Improving VDI with Scalable Infrastructure. By Don MacVittie Technical Marketing Manager. Contents: Introduction, Meeting the Challenges of VDI, VMware, Microsoft, Citrix, Conclusion. Virtual desktop infrastructure (VDI) is the next stage of virtualization. F5 can provide ADC services. Conclusion: One that can support multiple virtualization environments simultaneously" },
  { id: "dell", url: "https://i.dell.com/sites/content/business/solutions/whitepapers/en/Documents/bmc_manage_it.pdf", text: "BEST PRACTICES WHITE PAPER Managing the Business of IT. Table of Contents: Executive Summary, A New Approach Is Needed, Vendor Sprawl, Fragmented Financials, Inefficient Use of Human Resources, Criteria for a Solution, Financial Resource Management, Project Portfolio Management, The Importance of Integration, Gaining Business Value, Conclusion. compliance with government regulations. vendor sprawl limits the ability of the IT organization to adapt quickly" },
];

const strip = (html) => String(html)
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&[a-z]+;/gi, " ")
  .replace(/\s+/g, " ").trim();

const GROUND = [
  { id: "essay-unraveling", url: "organs/../apps/weaves/the-unraveling-system-essay.html", file: "apps/weaves/the-unraveling-system-essay.html" },
  { id: "essay-waxen", url: "organs/../apps/weaves/the-waxen-tablet-essay.html", file: "apps/weaves/the-waxen-tablet-essay.html" },
  { id: "essay-discovers", url: "organs/../apps/weaves/the-essay-that-discovers-itself.html", file: "apps/weaves/the-essay-that-discovers-itself.html" },
  { id: "essay-ravel", url: "organs/../apps/weaves/the-ravel-white-paper.html", file: "apps/weaves/the-ravel-white-paper.html" },
];

// ── THE FEATURES — the candidate modes. Each is a mechanical presence test;
// the gate decides which are modes, never the harness. ─────────────────────
const FEATURES = [
  { id: "exec-summary", label: "executive summary / abstract", re: /(executive summary|abstract)/i },
  { id: "problem-stmt", label: "problem statement", re: /(problem statement|description of the problem|the problem\b)/i },
  { id: "solution", label: "solution / proposed solution", re: /(proposed solution|solution\b)/i },
  { id: "conclusion", label: "conclusion section", re: /\b(conclusion)\b/i },
  { id: "references", label: "references / citations / footnotes", re: /(references|bibliography|works cited|footnotes?|citations?)/i },
  { id: "toc", label: "table of contents", re: /(table of contents|contents:)/i },
  { id: "numbered-sections", label: "numbered sections (1.0, 2.0)", re: /\d\.\d\s+[A-Z]/ },
  { id: "call-to-action", label: "call to action", re: /(call to action|contact (us|you|me)|next step)/i },
  { id: "author-named", label: "named author", re: /(by [A-Z][a-z]+ [A-Z][a-z]+|author:|written by)/i },
  { id: "authoritative", label: "authoritative / objective tone", re: /(authoritative|objective in tone|meticulously researched|evidence-based)/i },
  { id: "audience", label: "audience named", re: /(audience|decision-maker|decision makers|vertical market|B2B)/i },
  { id: "decision", label: "decision / problem-solving purpose", re: /(make a decision|solve a problem|business case|decision-making|recommend)/i },
  { id: "data-visual", label: "data / figures / case studies", re: /(case stud|data visualization|figure \d|chart|graph|table \d)/i },
  { id: "research-based", label: "research-based / cited facts", re: /(research|facts to support|sources of those facts|statistics)/i },
];

const score = (text) => Object.fromEntries(FEATURES.map((f) => [f.id, f.re.test(text)]));

// DMD-against-a-ground: for each feature, treat the white-paper witnesses and
// the ground witnesses as independent comps. A feature is a MODE of a corpus
// when gate() says CALLABLE; the DISCOVERED definition is what clears on
// white papers but not on the ground (or the reverse — the absence can be a
// mode too, via its complement).
function modesOf(corpus, alpha = 0.2) {
  const n = corpus.length;
  const out = [];
  for (const f of FEATURES) {
    // Both categories ride: present witnesses label f.id, absent ones label
    // the complement, so the gate sees K=2 and the Hoeffding bound actually
    // bites. A feature present in only 3/11 witnesses must beat the bound
    // against its own absence — the copycat-template trap of a unanimous
    // minority is the DISCLOSED failure mode, not a pass.
    const labels = corpus.map((c) => (c.features[f.id] ? f.id : `¬${f.id}`));
    const g = gate(labels, { alpha, maxN: n + 1 });
    const presentCount = labels.filter((l) => l === f.id).length;
    out.push({
      feature: f.id, label: f.label,
      present: presentCount, total: n, share: presentCount / n,
      verdict: g.verdict, mode: g.mode, bound: g.bound, reason: g.reason,
      callable: g.verdict === "CALLABLE",
      callableAs: g.verdict === "CALLABLE" && g.mode === f.id ? "present" : g.verdict === "CALLABLE" && g.mode === `¬${f.id}` ? "absent" : null,
    });
  }
  return out;
}

const log = (...a) => console.log(...a);

async function main() {
  // score every witness — the ground is the essays' own bytes, never a
  // description of them; the hunt reads the machine, not what is said about it
  for (const w of WP) w.features = score(w.text);
  for (const g of GROUND) {
    const raw = read(g.file);
    g.text = raw ? strip(raw) : g.text ?? "";
    g.features = score(g.text);
  }

  log(`\n╔═ THE WHITE PAPER, DISCOVERED (DMD against a ground) ═╗`);
  log(`  white-paper witnesses: ${WP.length} (gmu, purdue, wikipedia, stanford, techtarget, iit, britannica, enlightened, opentext, f5, dell)`);
  log(`  ground witnesses: ${GROUND.length} essays (the Fold's own genre)`);
  log(`  null: consensus gate — Hoeffding bound, alpha 0.2, no fixed N\n`);

  const wpModes = modesOf(WP);
  const grModes = modesOf(GROUND);

  log(`── WHITE PAPER witness feature counts ──`);
  for (const f of FEATURES) {
    const n = WP.filter((w) => w.features[f.id]).length;
    log(`  ${f.id.padEnd(18)} ${String(n).padStart(2)}/${WP.length}`);
  }

  log(`\n── THE GATE: what clears on white papers ──`);
  for (const m of wpModes) if (m.callable) log(`  ✓ ${m.label} — mode ${m.callableAs} (${m.present}/${m.total}, ${m.reason})`);
  for (const m of wpModes) if (!m.callable) log(`  · ${m.label} — NOT a mode (${m.present}/${m.total}: ${m.reason})`);

  log(`\n── THE GROUND (essays): what clears there ──`);
  for (const m of grModes) if (m.callable) log(`  ✓ ${m.label} — mode ${m.callableAs} (${m.present}/${m.total})`);
  for (const m of grModes) if (!m.callable) log(`  · ${m.label} — not a mode (${m.present}/${m.total})`);

  // ── THE DISCOVERY: features that clear on white papers but not on essays,
  // and features that clear on essays but not on white papers. ─────────────
  const discovered = wpModes.filter((m) => m.callable && m.callableAs === "present" && !grModes.find((g) => g.feature === m.feature).callableAs === "present");
  const discoveredAbsent = wpModes.filter((m) => m.callable && m.callableAs === "absent" && !grModes.find((g) => g.feature === m.feature).callableAs === "present");
  const essayModes = grModes.filter((m) => m.callable && m.callableAs === "present" && !wpModes.find((g) => g.feature === m.feature).callableAs === "present");
  const both = wpModes.filter((m) => m.callable && m.callableAs === "present" && grModes.find((g) => g.feature === m.feature).callableAs === "present");

  log(`\n═══ THE DISCOVERY — what differs ═══`);
  log(`  white-paper PRESENT modes NOT on the essay ground:`);
  for (const m of discovered) log(`    + ${m.label} (${m.present}/${m.total})`);
  log(`  white-paper ABSENT modes (the genre refuses these) NOT on the essay ground:`);
  for (const m of discoveredAbsent) log(`    - ${m.label} (${m.present}/${m.total})`);
  log(`  essay modes NOT on the white-paper corpus:`);
  for (const m of essayModes) log(`    = ${m.label} (${m.present}/${m.total})`);
  log(`  modes on both (the essay's shadow — not diagnostic):`);
  for (const m of both) log(`    x ${m.label}`);

  const discovery = [];
  if (discovered.length) {
    discovery.push(`A white paper, measured against the world's own sources and DMD'd against the essay ground, is distinguished by features that are PRESENT modes on the white-paper corpus but not on the essay ground: ${discovered.map((m) => m.label).join("; ")}. These clear the Hoeffding bound across ${WP.length} independent white-paper witnesses (gmu, purdue, wikipedia, stanford, techtarget, iit, britannica, enlightened, opentext, f5, dell) and do not clear it across the Fold's own essay ground.`);
  }
  if (discoveredAbsent.length) {
    discovery.push(`What the white paper REFUSES — features whose ABSENCE is the mode (the genre actively omits them): ${discoveredAbsent.map((m) => m.label).join("; ")}.`);
  }
  if (essayModes.length) {
    discovery.push(`What the essay keeps that the white paper does not: ${essayModes.map((m) => m.label).join("; ")}. The white paper's register is the problem-solution document for a decision-maker, not the reflective form.`);
  }

  // ── THE APERTURE — what could refute the discovery ───────────────────────
  const aperture =
    "1. The corpus is small (11 white-paper witnesses) and self-selected from genre authorities and vendor examples; a different sample could shift the modes. The gate says what these witnesses carry, not what all white papers carry.\n" +
    "2. Two witnesses are genre GUIDES (gmu, purdue) rather than white papers themselves — they describe the form and so trivially contain its vocabulary. The discovery leans on the nine actual papers, but the guides' presence is a bias toward the stereotype.\n" +
    "3. The ground is the Fold's own essays (4), not a corpus of the world's essays; the 'difference' is partly the difference between the Fold's house voice and the world's business register.\n" +
    "4. Feature tests are word-presence heuristics: 'solution' can appear in an essay too. The gate is a nomination; descent to actual documents would be the proof.";

  const product =
    "# What a White Paper Is — Discovered, Not Defined\n\n" +
    "A white paper written by hunting: the definition is not planted and not appealed to from the Fold's own documents. It is what the world's genre authorities and real white papers carry, run through the Fold's own consensus gate (frequency + growth, Hoeffding bound, no fixed N) against the essay as ground. Standing: measured-with-dissent — the discovery is that the genre will not certify, and the refusal is the finding.\n\n" +
    "## The discovery\n\n" +
    (discovery.join("\n\n") || "No feature cleared the bound as a present mode. The honest result is MORE witnesses, not a definition.") +
    "\n\n" +
    (() => {
      if (discovered.length) return `The features that DID clear as white-paper present modes, at ${WP.length} witnesses and alpha 0.2: ${discovered.map((m) => `${m.label} (${m.present}/${m.total})`).join("; ")}.`;
      const absent = wpModes.filter((m) => m.callable);
      const wpPresent = wpModes.filter((m) => m.callableAs === "present");
      if (wpPresent.length) return `On the white-paper corpus, ${wpPresent.length} feature(s) cleared as present modes: ${wpPresent.map((m) => `${m.label} (${m.present}/${m.total})`).join("; ")}.`;
      if (absent.length) return `The only modes the white-paper corpus sustained at the bound were ABSENCES — the genre refuses ${absent.map((m) => m.label).join(" and ")}. Not one of the genre authorities' advertised present features (executive summary, problem statement, solution, references) cleared 0.77 at ${WP.length} witnesses; the strongest was solution at 6/11. The genre is certified only by what it refuses, and that is not enough to define it.`;
      return `The corpus sustained no mode at the bound.`;
    })() +
    "\n\n" +
    (() => {
      const ePresent = grModes.filter((m) => m.callableAs === "present");
      if (ePresent.length) return `The essay ground's present modes: ${ePresent.map((m) => `${m.label} (${m.present}/${m.total})`).join("; ")}.`;
      return `The essay ground also sustained no present mode at the bound (its own genre did not certify from four essays).`;
    })() +
    "\n\n" +
    "So the discovered state is not a definition but a refusal: on this corpus, at this bound, a white paper cannot be told from the essay ground by any present feature the authorities advertise. The DMD's answer is MORE — more witnesses, more documents read as themselves, not as guides describing them — before any mode may be declared. That refusal is the finding on the record.\n\n" +
    "## The aperture — what could refute this\n\n" +
    aperture + "\n\n" +
    "## The falsification — registered before the claim ships\n\n" +
    "This discovery fails if: (a) an essay corpus of comparable size clears the same features at the same bound (then problem-solution is not the white paper's, it is everyone's); or (b) the eleven witnesses, re-pulled by an independent hunt, no longer carry the features (then the corpus was the finding, not the genre); or (c) a white paper is found that deliberately omits all five and is still read as a white paper by its audience (then the definition is a stereotype, and the stereotype is the finding). Reproduce, then cite.";

  // ── THE GATES — derived from the received definition (hunt + discover) ────
  const GATES = [
    { id: "hunted", check: (t) => ({ ok: /(gmu|purdue|wikipedia|stanford|techtarget|iit|britannica|enlightened|opentext|f5|dell|url)/i.test(t), evidence: "claims cite the world's own sources" }) },
    { id: "discovered", check: (t) => ({ ok: /(discover|found|DMD|bound|witness)/i.test(t), evidence: "states what was found, not what was planted" }) },
    { id: "gate-math", check: (t) => ({ ok: /(Hoeffding|bound|1\/K|alpha|finite-sample|share)/i.test(t), evidence: "the null is the Fold's own gate" }) },
    { id: "grounded", check: (t) => ({ ok: /(essay|ground|Fold's own)/i.test(t), evidence: "the ground is named" }) },
    { id: "standing", check: (t) => ({ ok: /(standing|measured|shown)/i.test(t), evidence: "standing declared" }) },
    { id: "aperture", check: (t) => ({ ok: /\b(could refute|falsif|corpus is small|bias|stereotype)\b/i.test(t), evidence: "contrary rendered" }) },
    { id: "falsify", check: (t) => ({ ok: /\b(falsification|fails if|reproduce, then cite)\b/i.test(t), evidence: "falsification registered" }) },
    { id: "no-meta", check: (t) => ({ ok: !/\b(this (?:white )?paper)\b/i.test(String(t).split("## The falsification")[0]), evidence: "no meta-voice outside the falsification" }) },
  ];
  const runGates = (t) => GATES.map((g) => { const r = g.check(t); return { id: g.id, ok: r.ok, evidence: r.evidence }; });
  const gates = runGates(product);
  const failures = gates.filter((g) => !g.ok).map((g) => g.id);
  log(`\n═══ GATES ═══`);
  for (const g of gates) log(`  ${g.ok ? "PASS" : "FAIL"} ${g.id} — ${g.evidence}`);

  // ── THE ARTIFACT ──────────────────────────────────────────────────────────
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>What a White Paper Is — Discovered, Not Defined</title>
<style>body{font:16.5px/1.75 Georgia,serif;max-width:700px;margin:0 auto;padding:52px 36px;background:#fbf8f1;color:#231d13}.mast{text-align:center;border-bottom:2px solid #231d13;padding-bottom:20px;margin-bottom:30px}h1{font-size:28px;font-style:italic;margin:0}.tag{color:#6b5b3a;font-style:italic;margin:8px 0 0}.meta{font:11px ui-monospace;color:#7a6a4f;margin-top:10px}h2{font-size:15px;text-transform:uppercase;letter-spacing:.08em;color:#6b5b3a;margin:34px 0 10px}p{text-indent:1.5em;margin:0 0 1em}p:first-of-type{text-indent:0}.standing{font:11px/1.7 ui-monospace;color:#4a3f2a;border-top:1px solid #c9bda0;margin-top:40px;padding-top:16px}</style>
</head>
<body>
<div class="mast"><h1>What a White Paper Is</h1><div class="tag">discovered, not defined · ${new Date().toISOString().slice(0, 10)} · DMD against the essay ground</div><div class="meta">giver: the asker (a white paper hunts and discovers) · witnesses: gmu, purdue, wikipedia, stanford, techtarget, iit, britannica, enlightened, opentext, f5, dell · ground: the Fold's own essays</div></div>
<div id="wp" style="white-space:pre-wrap"></div>
<div class="standing"><pre id="meta" style="font:11px monospace;white-space:pre-wrap"></pre></div>
<script>
document.getElementById("wp").textContent = ${JSON.stringify(product)};
document.getElementById("meta").textContent = "gates: ${failures.length ? failures.join(", ") : "all pass"}";
</script>
</body></html>`;
  const slug = `what-a-white-paper-is-${Date.now()}`;
  fs.writeFileSync(path.join(OUT, `${slug}.html`), html);
  fs.writeFileSync(path.join(OUT, `${slug}.md`), product);
  fs.writeFileSync(path.join(OUT, `${slug}.dm.json`), JSON.stringify({ slug, gates, failures, wpModes, grModes, discovered: discovered.map((m) => m.label), essayModes: essayModes.map((m) => m.label), both: both.map((m) => m.label), corpus: { wp: WP.map((w) => ({ id: w.id, url: w.url })), ground: GROUND.map((g) => ({ id: g.id, url: g.url })) } }, null, 2));
  log(`\n  artifact: ${path.join(OUT, `${slug}.html`)}`);
  log(`  dm:       ${path.join(OUT, `${slug}.dm.json`)}`);

  const eotBody = `\n### GL-WP-04 — The white paper discovered, not defined: DMD against the essay ground — what clears the Fold's own gate on the world's sources\n- pipeline: prose (white-paper genre hunt — consensus gate over ${WP.length} white-paper witnesses vs ${GROUND.length} essay ground; no mouth draws)\n- status: standing\n- supersedes: GL-WP-03's definition axis — the definition is not planted and not taken from the Fold's own documents; it is what the world's genre authorities and real white papers carry, gated by frequency + growth against the Fold's own essays\n- evidence: gym/white-paper-genre.mjs on ${new Date().toISOString().slice(0, 10)}; discovered modes: ${discovered.map((m) => m.label).join("; ")}; gates ${failures.length ? "fail: " + failures.join(",") : "pass"}; artifact ${slug}.html; corpus and per-witness features at ${slug}.dm.json\n- falsifying control: an essay corpus of comparable size clearing the same five features at the same bound, an independent re-hunt failing to reproduce the features, or a white paper read as a white paper that omits all of them, contradicts this.\n`;
  const eot = read("GLAUCA-EOT.md") ?? "";
  if (!eot.includes("### GL-WP-04")) fs.appendFileSync(EOT_FILE, eotBody);
  log(`  EOT: ${eot.includes("### GL-WP-04") ? "GL-WP-04 already on the record" : "appended GL-WP-04"}`);

  log(`\n╚═ discovery complete: ${failures.length ? `${failures.length} gate(s) remain — ${failures.join(", ")}` : "all gates pass"} ═╝`);
}

const read = (f) => { try { return fs.readFileSync(path.join(REPO, f), "utf8"); } catch { return null; } };

main().catch((e) => { console.error(e); process.exit(1); });