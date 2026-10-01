#!/usr/bin/env node
// Reusable diagnostic: find the first hard boundary in model-free Weave.
// It deliberately uses the normal text/prose adapter and Weave orchestration.
// Field -> hunt -> model-required; no model output is ever substituted.
//
// Optional:
//   PENELOPE_SHADOW_FILE=/path/to/shadow.json
// where shadow.json is {"url":"retained field text", ...}.
//   PENELOPE_EOREADER7_ROOT=/path/to/eoreader7
//   PENELOPE_SEARCH_URL=...
//
// The harness is intentionally artifact-neutral at the engine boundary; the
// essay topic is only the concrete diagnostic fixture requested here.

import fs from "node:fs";
import { weave } from "../organs/generation/api.mjs";

const topic = process.env.PENELOPE_NO_MODEL_TOPIC ??
  "How the Cumberland River shaped Nashville's development";
const targets = [1000, 2000, 4000, 8000, 12000];

function loadShadow() {
  const file = process.env.PENELOPE_SHADOW_FILE;
  if (!file) return new Map();
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  return new Map(Object.entries(raw ?? {}).map(([k, v]) => [k, String(v)]));
}

function words(s) {
  return String(s ?? "").trim().split(/\s+/).filter(Boolean).length;
}

function summarize(target, result, elapsedMs) {
  const p = result.evidence?.provenance ?? {};
  const events = p.events ?? [];
  const sources = p.sources ?? [];
  const ground = events.filter((e) => e.stage === "ground");
  const field = ground.filter((e) => e.transform === "autofill-frame").length;
  const hunt = ground.filter((e) => e.transform === "hunt-snip").length;
  const mouthNeeded = events.filter((e) => e.stage === "model-required").length;
  const modelDraws = events.filter((e) => e.stage === "draw").length;
  const unitNames = [...new Set(events.filter((e) => e.unit).map((e) => e.unit))];
  const sourceCounts = new Map();
  for (const e of events) if (e.source_id) sourceCounts.set(e.source_id, (sourceCounts.get(e.source_id) ?? 0) + 1);
  const reusedSourceRefs = [...sourceCounts.values()].filter((n) => n > 1).reduce((a, n) => a + n - 1, 0);
  const verdict = result.verification?.verdict ?? {};
  const folded = verdict.folded ?? {};
  const gaps = (folded.beats ?? []).filter((b) => b.gap).map((b) => b.title);
  const firstBoundary = events.find((e) => e.stage === "model-required")?.unit ?? null;
  const unresolved = mouthNeeded;
  return {
    target,
    units: unitNames.length,
    actualWords: words(result.artifact?.value ?? ""),
    field,
    hunt,
    mouthNeeded,
    modelDraws,
    unresolved,
    sourceCount: sources.length,
    sourceReuseEvents: reusedSourceRefs,
    foldGaps: gaps,
    refused: folded.refused?.length ?? 0,
    residual: folded.residual?.length ?? 0,
    verification: Boolean(result.verification?.ok),
    verificationReason: result.verification?.verdict?.reason ?? null,
    provenanceEvents: events.length,
    provenanceBytes: Buffer.byteLength(JSON.stringify(p)),
    firstBoundary,
    elapsedMs: Math.round(elapsedMs),
  };
}

const shadow = loadShadow();
const rows = [];
for (const target of targets) {
  const started = performance.now();
  const result = await weave({
    intent: `${topic}, approximately ${target} words`,
    artifact: "text",
    constraints: { targetWords: target, diagnostic: "model-free-boundary" },
    context: { shadow, noModel: true },
    verification: { grounding: true, inventedReferents: true, fold: true, provenance: "Provenance@2" },
    model: null,
  });
  const elapsed = performance.now() - started;
  const row = summarize(target, result, elapsed);
  // A model-free run must never have a successful model draw. If this fires,
  // the experiment is invalid rather than a low score.
  if (row.modelDraws !== 0) throw new Error(`INVALID MODEL-FREE RUN: ${row.modelDraws} draw events at ${target}`);
  rows.push(row);
  console.log(JSON.stringify(row));
}

const first = rows.find((r) => r.mouthNeeded > 0 || r.unresolved > 0 || r.foldGaps.length || r.residual > 0 || r.refused > 0);
console.log(JSON.stringify({
  schema: "ModelFreeWeaveBoundary@1",
  topic,
  model: null,
  modelDraws: rows.reduce((n, r) => n + r.modelDraws, 0),
  firstBoundary: first ? {
    target: first.target,
    stage: first.mouthNeeded > 0 ? "generation" : (first.foldGaps.length || first.residual > 0 || first.refused > 0 ? "folding/verification" : "evidence"),
    unit: first.firstBoundary,
  } : null,
  runs: rows,
}, null, 2));
