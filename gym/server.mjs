// chat-sys/server.mjs — live server: facing page + folded app + promptable local-mouth chat.
//
// Serves the launch-exp dir, plus:
//   POST /api/chat {prompt, model?} -> local ollama draw (free chat, logged)
//   POST /api/rung {task}           -> task in {fmtAgo, filter, paths}:
//                                      draw from mouth, probe with the organ,
//                                      verdict + running score, appended to
//                                      ladder-live.jsonl
//   GET  /api/score                 -> scoreboard from the log
// What improves in real time is the SYSTEM (standing rules accumulate,
// box owns more shapes) — the mouth doesn't learn. The scoreboard says so.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const EXP = path.join(HERE, "..", "apps"); // serve the repo's own apps (single source of truth)
const PROXY = "http://127.0.0.1:11436"; // Heimdall admission lives here; no direct model URL remains
const LOG = path.join(HERE, "ladder-live.jsonl");

// All draws route through Heimdall admission (the proxy's shared mouth),
// never ollama direct: x-er7-session gives Penelope her own profile,
// x-er7-priority: batch queues her behind interactive. 429/503 +
// Retry-After are honored with bounded backoff, then a typed refusal —
// never a silent stop, never a wedge.
const er7model = (m) => (String(m).startsWith("er7:") ? m : `er7:${m}`);

// Two routes, by evidence (2026-10-01):
// - chat goes through Heimdall admission (shared mouth er7:gemma2:2b).
// - code draws go DIRECT to ollama. Measured reason: the chat doors'
//   hard-meaning auto-route swallows code prompts whole and returns a
//   swarm verdict instead of a draw ("Hard meaning (truncated_end)…",
//   logged). This matches house precedent (code-build.js and the
//   arrangement engine both draw direct). Consolidation falsified for
//   code draws — disclosed, not hidden.
const OLLAMA = "http://localhost:11434";

async function drawChat(prompt) {
  const body = JSON.stringify({
    model: "er7:gemma2:2b", stream: false, temperature: 0,
    messages: [{ role: "user", content: prompt }],
  });
  let last = null;
  for (let a = 0; a < 3; a += 1) {
    const r = await fetch(`${PROXY}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-er7-session": "penelope-gym",
        "x-er7-priority": "batch",
      },
      body,
      signal: AbortSignal.timeout(150000),
    });
    if (r.status === 429 || r.status === 503) {
      last = r.status;
      const wait = Math.min(60000, (Number(r.headers.get("retry-after")) || 20) * 1000);
      await new Promise((res) => setTimeout(res, wait));
      continue;
    }
    const j = await r.json();
    const text = j.choices?.[0]?.message?.content ?? "";
    if (text) return text;
    throw new Error(`heimdall-ok-but-empty (status ${r.status})`);
  }
  throw new Error(`heimdall-refused (${last}) after bounded backoff — named gap, retry later`);
}

async function draw(model, prompt, num_predict = 260) {
  const r = await fetch(`${OLLAMA}/api/generate`, {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ model, prompt, stream: false, options: { num_predict, temperature: 0 } }),
    signal: AbortSignal.timeout(150000),
  });
  const j = await r.json();
  return j.response ?? "";
}
// The chat door talks (prose around code); raw generate didn't. So the
// snip extracts function-shaped spans instead of loading whole text.
const snipJs = (t) => {
  const src = String(t ?? "").replace(/```[a-z]*/gi, "");
  const spans = [...src.matchAll(/function\s+[A-Za-z_$][\w$]*\s*\([^)]*\)\s*\{/g)];
  if (!spans.length) return src.trim();
  // cut from first function head to the last closing brace on its own line
  const start = spans[0].index;
  const end = src.lastIndexOf("\n}");
  return (end > start ? src.slice(start, end + 3) : src.slice(start)).trim();
};
function loadJs(src, names) {
  const f = new Function(`${src}\nreturn { ${names.join(", ")} };`);
  return f();
}
// probes (mirror the organs; box-side, no model)
const PROBES = {
  fmtAgo: {
    files: null, names: ["fmtAgo"], model: "gemma2:2b", tokens: 180,
    prompt: `Write JavaScript. Output ONLY raw code, no prose, no fences. Exactly one function. Spec: fmtAgo(t, now) takes epoch-ms t and epoch-ms now, returns short relative string. Golden pair: fmtAgo(970000, 1000000) is "30s ago"; fmtAgo(700000, 1000000) is "5m ago". function fmtAgo(t, now){}`,
    cases: [[[970000, 1000000], "30s ago"], [[700000, 1000000], "5m ago"], [[1000000 - 3 * 3600000, 1000000], "3h ago"], [[1000000 - 2 * 86400000, 1000000], "2d ago"]],
    run(f) { return this.cases.map(([a, w]) => { try { const g = f.fmtAgo(...a); return { ok: g === w, got: String(g).slice(0, 40), want: w }; } catch (e) { return { ok: false, got: "threw: " + String(e.message).slice(0, 60), want: w }; } }); },
  },
  filter: {
    names: ["filterLaunches", "resolveDetail"], model: "gemma2:2b", tokens: 300,
    prompt: `Write JavaScript. Output ONLY raw code, no prose, no fences. Exactly TWO pure functions (arguments only, never mutate inputs, no document/window/fetch). Spec: filterLaunches(q, items) keeps items where the CONCATENATED string (item.mission + " " + item.site).toLowerCase() includes String(q).toLowerCase(). Guard missing fields with || "". resolveDetail(id, items) returns the match or else null (never undefined — use || null). function filterLaunches(q, items){}`,
    cases: null, // built per-run (fresh items)
    run(f) {
      const mk = () => [{ id: "a", mission: "Crew-13", site: "Cape" }, { id: "b", mission: "Starlink", site: "Vandenberg" }];
      const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
      const out = [];
      try { const g = f.filterLaunches("CREW", mk()); out.push({ ok: eq(g, [mk()[0]]), got: JSON.stringify(g).slice(0, 60), want: "crew-row" }); }
      catch (e) { out.push({ ok: false, got: "threw: " + String(e.message).slice(0, 60), want: "crew-row" }); }
      try { const g = f.resolveDetail("zz", mk()); out.push({ ok: g === null, got: String(g).slice(0, 40), want: "null" }); }
      catch (e) { out.push({ ok: false, got: "threw: " + String(e.message).slice(0, 60), want: "null" }); }
      return out;
    },
  },
  paths: {
    names: [], model: "gemma2:2b", tokens: 120,
    prompt: `Launch detail JSON has these URL-ish fields: flightclub_url (string), infoURLs (array of {url}), vidURLs (array of {url}), webcast_live (boolean flag). Output ONLY raw JSON, no prose: {"webcast": "<dot-path to the first livestream URL>", "info": "<dot-path to the first info URL>"}. Numeric segments index arrays.`,
    runText(txt) {
      let p = null;
      try { const s = txt.slice(txt.indexOf("{"), txt.lastIndexOf("}") + 1); p = JSON.parse(s); }
      catch { return [{ ok: false, got: txt.slice(0, 60), want: "parseable JSON" }]; }
      const out = [];
      out.push({ ok: p.webcast === "vidURLs.0.url", got: String(p.webcast).slice(0, 40), want: "vidURLs.0.url" });
      out.push({ ok: p.info === "infoURLs.0.url", got: String(p.info).slice(0, 40), want: "infoURLs.0.url" });
      return out;
    },
  },
};

// The ask-back channel — a build may pause and ask instead of guessing
// (build-clarify's posture: the reverse prompt; an answer that moves
// nothing is never re-asked). Pending asks live in gym/asks.jsonl; every
// ask and answer is logged. The build that asked resumes with the answer
// on the record.
const ASK = path.join(HERE, "asks.jsonl");
const pendingAsks = () => {
  try { return fs.readFileSync(ASK, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)).filter((a) => !a.answer); }
  catch { return []; }
};
function logAsk(row) { fs.appendFileSync(ASK, JSON.stringify(row) + "\n"); }

function score() {
  let rows = [];
  try { rows = fs.readFileSync(LOG, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)); } catch {}
  const by = {};
  for (const r of rows) {
    if (r.kind !== "rung" || !r.task) continue;
    by[r.task] ??= { task: r.task, attempts: 0, passes: 0, mouth: 0, box: 0 };
    by[r.task].attempts += 1;
    if (r.pass) by[r.task].passes += 1;
    by[r.task][r.winner] += 1;
  }
  return { tasks: Object.values(by), total: rows.length };
}

const MIME = { ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".css": "text/css" };
const server = http.createServer(async (req, res) => {
  try {
    const u = new URL(req.url, "http://x");
    if (req.method === "GET" && (u.pathname === "/" || u.pathname === "/chat")) {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(fs.readFileSync(path.join(HERE, "chat.html")));
      return;
    }
    if (req.method === "GET" && u.pathname === "/api/score") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(score()));
      return;
    }
    if (req.method === "GET" && u.pathname === "/api/asks") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(pendingAsks()));
      return;
    }
    if (req.method === "POST" && (u.pathname === "/api/ask" || u.pathname === "/api/answer")) {
      let body = "";
      for await (const c of req) body += c;
      const j = JSON.parse(body || "{}");
      if (u.pathname === "/api/ask") {
        const id = "ask-" + Date.now();
        const row = { id, t: Date.now(), kind: "ask", question: String(j.question ?? "").slice(0, 500), context: String(j.context ?? "").slice(0, 300), answer: null };
        logAsk(row);
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ id }));
        return;
      }
      const rows = (() => { try { return fs.readFileSync(ASK, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)); } catch { return []; } })();
      const i = rows.findIndex((r) => r.id === j.id);
      if (i < 0) { res.writeHead(404); res.end("no such ask"); return; }
      rows[i].answer = String(j.answer ?? "");
      rows[i].answeredAt = Date.now();
      fs.writeFileSync(ASK, rows.map((r) => JSON.stringify(r)).join("\n") + "\n");
      fs.appendFileSync(LOG, JSON.stringify({ t: Date.now(), kind: "answer", id: j.id, answer: String(j.answer ?? "").slice(0, 300) }) + "\n");
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ ok: true }));
      return;
    }
    if (req.method === "POST" && u.pathname === "/api/chat-stream") {
      // SSE live tokens. Direct ollama, measured 2026-10-01: both proxy
      // streaming doors hang (code 000, 90s, zero bytes — /v1/chat/completions
      // and /api/chat); non-stream heimdall works but shows nothing until the
      // whole draw lands. The stream is the chat loom now; /api/chat keeps the
      // heimdall-routed non-stream path. Every chat is logged either way.
      let body = "";
      for await (const c of req) body += c;
      const { prompt, model } = JSON.parse(body || "{}");
      res.writeHead(200, { "content-type": "text/event-stream", "cache-control": "no-cache", connection: "keep-alive" });
      const flush = (o) => res.write(`data: ${JSON.stringify(o)}\n\n`);
      let full = "";
      try {
        const r = await fetch(`${OLLAMA}/api/generate`, {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ model: model ?? "gemma2:2b", prompt: String(prompt ?? ""), stream: true, options: { temperature: 0 } }),
          signal: AbortSignal.timeout(240000),
        });
        if (!r.ok || !r.body) throw new Error("draw failed HTTP " + r.status);
        const reader = r.body.getReader();
        const dec = new TextDecoder();
        let buf = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          let nl;
          while ((nl = buf.indexOf("\n")) >= 0) {
            const line = buf.slice(0, nl); buf = buf.slice(nl + 1);
            if (!line.trim()) continue;
            let j;
            try { j = JSON.parse(line); } catch { continue; }
            const tok = j.response ?? "";
            if (tok) { full += tok; flush({ t: tok }); }
            if (j.done) { flush({ done: true }); break; }
          }
        }
      } catch (e) {
        flush({ err: String(e.message ?? e).slice(0, 200) });
      }
      fs.appendFileSync(LOG, JSON.stringify({ t: Date.now(), kind: "chat", stream: true, model: model ?? "gemma2:2b", prompt: String(prompt).slice(0, 200), text: full.slice(0, 400) }) + "\n");
      res.end();
      return;
    }
    if (req.method === "POST" && (u.pathname === "/api/chat" || u.pathname === "/api/rung")) {
      let body = "";
      for await (const c of req) body += c;
      const { prompt, task, model } = JSON.parse(body || "{}");
      if (u.pathname === "/api/chat") {
        const text = await drawChat(String(prompt ?? ""));
        fs.appendFileSync(LOG, JSON.stringify({ t: Date.now(), kind: "chat", model: model ?? "gemma2:2b", prompt: String(prompt).slice(0, 200) }) + "\n");
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ text }));
        return;
      }
      const P = PROBES[task];
      if (!P) { res.writeHead(400); res.end("unknown task"); return; }
      const raw = await draw(model ?? P.model, P.prompt, P.tokens);
      let results;
      if (P.runText) results = P.runText(raw);
      else {
        try {
          const f = loadJs(snipJs(raw), P.names);
          results = P.run(f);
        } catch (e) { results = [{ ok: false, got: "load: " + String(e.message).slice(0, 80), want: "runnable" }]; }
      }
      const pass = results.length > 0 && results.every((r) => r.ok);
      const row = { t: Date.now(), kind: "rung", task, model: model ?? P.model, pass, winner: pass ? "mouth" : "box", results, draw: raw.slice(0, 600) };
      fs.appendFileSync(LOG, JSON.stringify(row) + "\n");
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ ...row, score: score() }));
      return;
    }
    // static: launch-exp first, then chat-sys dir
    const rel = decodeURIComponent(u.pathname).replace(/^\/+/, "").replace(/\.\./g, "");
    for (const base of [EXP, HERE]) {
      const fp = path.join(base, rel || "index.html");
      if (fs.existsSync(fp) && fs.statSync(fp).isFile()) {
        res.writeHead(200, { "content-type": MIME[path.extname(fp)] ?? "application/octet-stream" });
        res.end(fs.readFileSync(fp));
        return;
      }
    }
    res.writeHead(404); res.end("nope");
  } catch (e) {
    res.writeHead(500); res.end(String(e.message).slice(0, 200));
  }
});
server.listen(8137, "127.0.0.1", () => console.log("live on http://127.0.0.1:8137/ (facing) http://127.0.0.1:8137/chat (chat)"));
