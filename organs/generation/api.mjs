// organs/generation/api.mjs — THE PUBLIC GENERATION CONTRACT.
// One orchestration API for arbitrary artifacts. The engine owns the lifecycle;
// an artifact adapter owns only what is genuinely medium-specific.
//
// Contract:
//   generate({ intent, artifact, constraints, context, verification, ... })
//
// The result separates artifact, materialization, verification, evidence, and
// repair. Adding a medium means registering an adapter, not another engine.
import { arrange } from "./engine.mjs";

const adapters = new Map();

export function registerGenerationAdapter(kind, adapter) {
  const name = String(kind ?? "").trim();
  if (!name) throw new Error("generation adapter kind is required");
  if (!adapter || typeof adapter.readUnits !== "function" || typeof adapter.testUnits !== "function") {
    throw new Error("generation adapter " + name + " must provide readUnits() and testUnits()");
  }
  adapters.set(name, adapter);
  return adapter;
}

export function generationAdapter(kind) {
  return adapters.get(String(kind ?? "")) ?? null;
}

export function generationKinds() {
  return [...adapters.keys()].sort();
}

async function loadBuiltins() {
  if (!adapters.has("code")) registerGenerationAdapter("code", (await import("./adapters/code.mjs")).default);
  if (!adapters.has("prose")) registerGenerationAdapter("prose", (await import("./adapters/prose.mjs")).default);
  return adapters;
}

function normalizeArtifact(result, kind) {
  return {
    kind,
    value: result.html ?? result.code ?? result.result?.code ?? result.result?.html ?? null,
  };
}

/**
 * Generate an artifact through the single Penelope orchestration contract.
 *
 * artifact may be a registered kind or an adapter object. A missing/unknown
 * kind is a named gap; Penelope never guesses the medium from prose.
 */
export async function generate({
  intent,
  artifact,
  constraints = {},
  context = {},
  verification = {},
  model = null,
  output = null,
} = {}) {
  const task = String(intent ?? "").trim();
  if (!task) return { schema: "GenerationResult@1", ok: false, status: "gap", error: "generation intent is required" };

  await loadBuiltins();
  const kind = typeof artifact === "string" ? artifact : artifact?.kind;
  const adapter = typeof artifact === "object" && artifact?.readUnits ? artifact : generationAdapter(kind);
  if (!adapter) {
    return {
      schema: "GenerationResult@1",
      ok: false,
      status: "gap",
      error: kind
        ? "no generation adapter registered for artifact kind " + kind
        : "artifact kind is required — name the medium or register an adapter",
      availableArtifacts: generationKinds(),
    };
  }

  const ctx = { ...context, constraints, verification, model, artifact: kind ?? adapter.kind };
  const args = { out: output ?? undefined };
  if (context?.example !== undefined) args.example = JSON.stringify(context.example);

  const result = await arrange({
    task,
    args,
    adapter: {
      ...adapter,
      readUnits: (t) => adapter.readUnits(t, ctx),
      computeSettles: adapter.computeSettles ? (units, example) => adapter.computeSettles(units, example, ctx) : undefined,
      autofill: adapter.autofill ? (unit) => adapter.autofill(unit, ctx) : undefined,
      hunt: adapter.hunt ? (unit) => adapter.hunt(unit, ctx) : undefined,
      mouthFragment: adapter.mouthFragment ? (unit, atom) => adapter.mouthFragment(unit, atom, ctx) : undefined,
      snip: (value, name) => adapter.snip(value, name, ctx),
      probeUnit: (value, unit) => adapter.probeUnit(value, unit, ctx),
      testUnits: (value, units) => adapter.testUnits(value, units, ctx),
      toDocument: (value) => adapter.toDocument(value, ctx),
      sharpen: adapter.sharpen ? (unit, atom, why) => adapter.sharpen(unit, atom, why, ctx) : undefined,
    },
  });

  const verified = result.verdict?.ok === true;
  return {
    schema: "GenerationResult@1",
    ok: verified,
    status: verified ? "verified" : "unverified",
    intent: task,
    artifact: normalizeArtifact(result, kind ?? adapter.kind),
    materialization: {
      widget: result.eot?.product?.widget ?? null,
      folded: result.eot?.product?.folded ?? null,
      slug: result.slug ?? null,
    },
    verification: {
      ok: verified,
      contract: verification,
      verdict: result.verdict ?? null,
    },
    evidence: {
      provenance: result.provenance ?? [],
      eot: result.eot ?? null,
    },
    repair: {
      scars: result.scars ?? [],
      converged: (result.scars ?? []).length === 0 && verified,
    },
    model: model ?? process.env.ER7_BUILD_MODEL ?? "qwen2.5-coder:1.5b",
  };
}

export default { generate, registerGenerationAdapter, generationAdapter, generationKinds };
