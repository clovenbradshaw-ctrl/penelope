// gym/weave-build.mjs — THE REAL BUILD LOOM: Penelope orchestrates, eoreader7
// engines. The seam (GL-00): material crosses only as addressed record.
//
//   node gym/weave-build.mjs --ask "<task>" [--testCommand "<cmd>"] [--out <path>]
//   node gym/weave-build.mjs --class council      (banked class: re-verify live)
//
// Two engine paths, decided by the class (never by the loom's mood):
//   banked — the shape class resolves from the library (organs + feed door +
//            sealed artifact): live bytes fetched through the door, organs run,
//            probe verdict, 0 draws. The mouth is not consulted (GL-LD-04/05).
//   new    — the class is not held: eoreader7's /v1/build is the engine. It
//            plans the independent units, draws each from its own mouth
//            concurrently, assembles and validates mechanically; the
//            testCommand gates. The loom never draws directly — every draw
//            routes through the engine (GL-WV-07).
// Every run appends a swatch row (gym/swatch.jsonl) — the economy is measured,
// never asserted (GL-WV-05).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.dirname(HERE);
const PROXY = "http://127.0.0.1:11436";
const GYM = "http://127.0.0.1:8137";
const SWATCH = path.join(HERE, "swatch.jsonl");

const BANKS = {
  council: {
    class: "council/agenda",
    organs: ["organs/window.mjs (Window@1)", "organs/agenda-shape.mjs (AgendaShape@1)", "organs/detail-fetch.mjs (DetailFetch@1)", "organs/freshness.mjs (Freshness@1)"],
    feedDoor: "/api/council/events",
    artifact: "apps/council.html (+ control + facing + record)",
    probe: "gym/probe-council.mjs (sort + own-sequence on live bytes)",
    standing: "GL-WV-01, GL-WV-06",
  },
};

const swatch = (row) => fs.appendFileSync(SWATCH, JSON.stringify({ schema: "Swatch@1", ts: new Date().toISOString(), ...row }) + "\n");

// ── banked: the library holds the class; verify against live bytes ──
export async function bankedRun(cls) {
  const bank = BANKS[cls];
  if (!bank) return { ok: false, error: `no banked class ${cls} — name one of: ${Object.keys(BANKS).join(", ")}` };
  const { window } = await import(`../organs/window.mjs`);
  const { shapeItems } = await import(`../organs/agenda-shape.mjs`);
  const r = await fetch(GYM + bank.feedDoor, { signal: AbortSignal.timeout(20000) });
  if (!r.ok) throw new Error(`feed door HTTP ${r.status}`);
  const events = await r.json();
  const { rows, gaps } = window(events.map((x) => ({ id: x.EventId, body: x.EventBodyName, date: x.EventDate, time: x.EventTime, loc: x.EventLocation })), { dateOf: "date", timeOf: "time", now: Date.now(), n: 8 });
  if (!rows.length) throw new Error("window empty — no upcoming meetings (named gap, nothing invented)");
  const sorted = rows.every((x, i) => i === 0 || rows[i - 1].at <= x.at);
  const ir = await fetch(`${GYM}${bank.feedDoor.replace("/events", "")}/events/${rows[0].rec.id}/items`, { signal: AbortSignal.timeout(20000) });
  const items = await ir.json();
  const shaped = shapeItems(items);
  const inOrder = shaped.rows.every((x, i) => i === 0 || (x.seq ?? Infinity) >= (shaped.rows[i - 1].seq ?? Infinity));
  const verdict = { sorted, agendaOwnOrder: inOrder, windowed: rows.length, gapped: gaps.length, itemGaps: shaped.gaps.length };
  const okVerdict = sorted && inOrder && rows.length > 0;
  swatch({ weave: "banked:" + cls, class: bank.class, engine: "library (organs + feed door)", mouthCalls: 0, mouthBytes: 0, corpusBytes: 0, huntBytes: events.length, boxBytes: 0, verdict: okVerdict ? "pass" : "fail", evidence: "GL-WV-01/06/07" });
  return { ok: okVerdict, class: bank.class, engine: "library (organs + feed door)", artifact: bank.artifact, verdict, probe: bank.probe, mouthCalls: 0, organs: bank.organs, standing: bank.standing };
}

// ── new: the class is not held — eoreader7 is the engine, through the REAL
// pipeline: POST /v1/ask (the plain doorway every surface uses) carries the
// task; the proxy's own build detection routes a discrete multi-unit task to
// buildCodeTask — mechanical decomposition, Gary-shaped concurrent draws,
// assembly, and the testCommand gates. If the gate fails, the loom hands the
// workspace + testCommand to /v1/code — Thea's bounded repair loop (revert +
// grounded failure into the next round, maxRounds) — never a one-shot re-run
// (GL-WV-07, GL-WV-12). Every draw routes through the door, never the loom.
// Thea paces: 429 retry-after is honored with a bounded defer, never spun
// (GL-WV-10).
const HDRS = { "content-type": "application/json", "x-er7-session": "penelope-loom", "x-er7-priority": "batch" };
async function pacedPost(url, body, { timeoutMs = 600000, maxDefer = 6 } = {}) {
  for (let d = 0; d < maxDefer; d += 1) {
    const r = await fetch(url, { method: "POST", headers: HDRS, body: JSON.stringify(body), signal: AbortSignal.timeout(timeoutMs) });
    if (r.status === 429) {
      const wait = Math.min(120000, (Number(r.headers.get("retry-after")) || 20) * 1000);
      await new Promise((res) => setTimeout(res, wait)); // Thea: defer, never spin
      continue;
    }
    return r;
  }
  return new Response(JSON.stringify({ error: "the box stayed busy past the defer budget — Thea says pace, retry later" }), { status: 429 });
}

export async function engineRun({ ask, testCommand, out, model }) {
  const build = await (await pacedPost(`${PROXY}/v1/ask`, { task: ask, testCommand: testCommand ?? null, out: out ?? null, model: model ?? "gemma2:2b" })).json();
  let j = build;
  if (build.kind !== "mechanical-code-build") {
    swatch({ weave: "engine:" + String(ask).slice(0, 40), class: "new (engine-held)", engine: "eoreader7 /v1/ask (turned, not built)", mouthCalls: 0, mouthBytes: 0, corpusBytes: 0, huntBytes: 0, boxBytes: 0, verdict: build.error ? "refused" : "turn", evidence: "GL-WV-07/08" });
    return { ok: false, error: build.error ?? `the door answered a turn, not a build (kind ${build.kind ?? "?"}) — ${String(build.answer ?? "").slice(0, 200)}` };
  }
  // Thea's remedy: a gate that fails is handed to the bounded loop, not re-run.
  if (build.verified !== true && out && testCommand) {
    const remedy = await (await pacedPost(`${PROXY}/v1/code`, {
      task: `${ask}. The gate failed: ${String(build.verifyError ?? "").slice(0, 400)}. Make the testCommand pass.`,
      workspace: path.dirname(out), testCommand, model: model ?? "gemma2:2b", maxRounds: 3,
    })).json();
    const finalCode = fs.existsSync(out) ? fs.readFileSync(out, "utf8") : (remedy.code ?? build.code ?? "");
    swatch({ weave: "engine:" + (build.units ?? []).join("+") + "+remedy", class: "new (engine-held)", engine: "eoreader7 /v1/ask → /v1/code (Thea's loop)", mouthCalls: (build.draws ?? 0) + (remedy.draws ?? 0), mouthBytes: finalCode.length, corpusBytes: 0, huntBytes: 0, boxBytes: 0, verdict: remedy.done ? "pass (remedy loop)" : String(remedy.error ?? "budget spent"), evidence: "GL-WV-07/10/12" });
    return { ok: !!remedy.done, engine: "eoreader7 /v1/ask → /v1/code (Thea's loop)", units: build.units ?? [], draws: (build.draws ?? 0) + (remedy.draws ?? 0), verified: !!remedy.done, remedy: remedy.done ? "loop converged" : String(remedy.error ?? remedy.status ?? "budget spent"), out, code: finalCode, disclosure: build.disclosure ?? null };
  }
  swatch({ weave: "engine:" + (build.units ?? []).join("+"), class: "new (engine-held)", engine: "eoreader7 /v1/ask → buildCodeTask", mouthCalls: build.draws ?? 0, mouthBytes: String(build.code ?? "").length, corpusBytes: 0, huntBytes: 0, boxBytes: 0, verdict: build.verified === true ? "pass (testCommand)" : String(build.verified ?? "unverified"), evidence: "GL-WV-07/08/09" });
  return { ok: build.verified === true, engine: "eoreader7 /v1/ask → buildCodeTask", units: build.units ?? [], draws: build.draws ?? 0, tokens: build.tokens ?? 0, verified: build.verified ?? null, verifyError: build.verifyError ?? null, out: build.out ?? null, code: build.code ?? null, disclosure: build.disclosure ?? null };
}

export async function runWeave({ ask, testCommand, out, banked, model }) {
  if (banked) return bankedRun(banked);
  if (!ask) return { ok: false, error: "an ask is required (or --class council for the banked class)" };
  return engineRun({ ask, testCommand, out, model });
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const argv = process.argv.slice(2);
  const opt = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
  const res = await runWeave({ ask: opt("--ask"), testCommand: opt("--testCommand"), out: opt("--out"), banked: opt("--class"), model: opt("--model") });
  console.log(JSON.stringify(res, null, 1));
  process.exit(res.ok ? 0 : 1);
}