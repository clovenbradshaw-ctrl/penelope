// organs/generation-door.mjs — THE DRAW DOOR (2026-10-01).
//
// The seam where "all generation related to eoreader7 runs through Penelope":
// every model DRAW the engine wants is asked here first. The law is the house
// law — library → box → hunt → mouth, mouth-last: the box (organs) checks the
// draw first, and only the irreducible residue goes to the mouth, which draws
// through Heimdall's channel with Penelope's one identity and the draw's
// kind, so the box's fair-share round robin sees every kind and every caller
// fairly. Every draw lands on the swatch (gym/swatch.jsonl) — the economy is
// measured, never asserted (GL-WV-05).
//
// The box today: the organs hold no raw-draw shapes — a draw prompt is
// irreducible residue by construction, so the box answers nothing and the
// verdict is `mouth`, disclosed. This is the named gap the seam exists to
// close: as organs acquire shapes, they answer here and the mouth is asked
// only for what none of them had.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SWATCH = path.join(HERE, "..", "gym", "swatch.jsonl");
const CHANNEL = "http://127.0.0.1:11434"; // Heimdall's held door for servers
const KINDS = new Set(["chat", "probe", "stream", "build", "swarm", "vision", "other"]);
const ID = { "x-er7-user": "penelope", "x-er7-caller": "penelope-gym" };
const MAX_DEFER = 6;

const bare = (m) => String(m ?? "").replace(/^er7:/, "");
const swatch = (row) => fs.appendFileSync(SWATCH, JSON.stringify({ schema: "Swatch@1", ts: new Date().toISOString(), ...row }) + "\n");

/** The door: check the box, then draw the residue through the channel.
 *  `hop` is the turn's re-entry mark (1 = the turn was already admitted at
 *  its doorway — the draw must not re-queue; 0 = full admission, the safe
 *  default for any caller that does not declare it). `keepAliveS` keeps the
 *  model resident for a long turn's worth of draws, like the engine's own
 *  direct draws do (per-request floor, aligned with the server's keep_alive). */
export async function runDrawDoor({ prompt, model = "gemma2:2b", kind = null, maxTokens = 260, temperature = 0, priority = "interactive", hop = 0, keepAliveS = 0 } = {}) {
  const ask = String(prompt ?? "").trim();
  if (!ask) return { ok: false, error: "a prompt is required — an empty draw is a named gap, never a draw" };
  const k = KINDS.has(String(kind ?? "").toLowerCase()) ? String(kind).toLowerCase() : "chat";
  const m = bare(model);
  const t0 = Date.now();
  // THE BOX, FIRST (mouth-last): the organs hold no raw-draw shape today —
  // declared here, never invented. When an organ holds the shape it answers
  // with zero draws and the swatch records the box win.
  const box = { answered: false, why: "no organ holds a raw-draw shape — the residue is the mouth's by construction" };
  let last = null;
  let j = null;
  for (let a = 0; a < MAX_DEFER; a += 1) {
    const r = await fetch(`${CHANNEL}/api/generate`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...ID,
        "x-er7-priority": priority === "interactive" ? "interactive" : "batch",
        "x-er7-kind": k,
        ...(Number.isFinite(Number(hop)) && Number(hop) >= 1 ? { "x-heimdall-hop": String(hop) } : {}),
      },
      body: JSON.stringify({ model: m, prompt: ask, stream: false, options: { num_predict: Math.max(1, Number(maxTokens) || 260), temperature: Number(temperature) || 0 }, ...(Number(keepAliveS) > 0 ? { keep_alive: `${Math.round(keepAliveS)}s` } : {}) }),
      signal: AbortSignal.timeout(240000),
    });
    if (r.status === 429 || r.status === 503) {
      last = r.status;
      const wait = Math.min(120000, (Number(r.headers.get("retry-after")) || 20) * 1000);
      await new Promise((res) => setTimeout(res, wait)); // Thea: defer, never spin
      continue;
    }
    j = await r.json().catch(() => null);
    if (!r.ok) { last = r.status; break; }
    const text = String(j?.response ?? "").trim();
    if (!text) { last = "empty"; break; }
    swatch({ weave: `draw:${k}`, class: "draw", engine: "box→mouth (heimdall channel)", mouthCalls: 1, mouthBytes: text.length, corpusBytes: 0, huntBytes: 0, boxBytes: 0, verdict: "mouth", evidence: "2026-10-01 door, GL-WV-05" });
    return {
      ok: true, text, winner: "mouth", model: j?.model ?? m, kind: k,
      promptTokens: j?.prompt_eval_count ?? 0, evalTokens: j?.eval_count ?? 0,
      ms: Date.now() - t0,
      box,
    };
  }
  swatch({ weave: `draw:${k}`, class: "draw", engine: "box→mouth (heimdall channel)", mouthCalls: 1, mouthBytes: 0, corpusBytes: 0, huntBytes: 0, boxBytes: 0, verdict: "refused", error: String(last ?? "no draw"), evidence: "2026-10-01 door, GL-WV-05" });
  return { ok: false, error: `heimdall refused the draw (${last}) after bounded defer — Thea says pace, retry later`, kind: k, box };
}

if (import.meta.url === `file://${path.resolve(process.argv[1] ?? "")}`) {
  const r = await runDrawDoor({ prompt: process.argv.slice(2).join(" ") || "Say OK" });
  console.log(JSON.stringify(r, null, 1));
  process.exit(r.ok ? 0 : 1);
}