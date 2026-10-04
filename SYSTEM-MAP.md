# THE SYSTEM MAP — how eoreader7, penelope, and the fold fit

A map, not a history. Every node is a real file. The one law is at the bottom;
every piece is one move toward it.

## The one loop (the whole project)

```
   NL ──language-specific grammar──▶ EOT ──box settles + DMD universe──▶ ANSWER
     ▲                                    │  (no model)
     └─────────local model draws ONLY the residue──────────────┘
```

NL enters through the language's OWN grammar (measured, per language), becomes
the language-neutral EOT (the GFP arrangement, cube-addressed), the BOX settles
what the material states in a clean clause, the DMD-bounded universe admits or
refuses it, and the LOCAL MODEL draws only the residue — and declines when the
material doesn't state it.

## The three bodies

### 1. eoreader7 — the khora (the perceiver · ground-producer)
Reads anything into the record, model-free where possible.

| layer | files | what it is |
|---|---|---|
| **kernel** | `cube.js` | the 9 operators × 3 grains = the 27 cells; `STANCE_BY_MODE` = the 9 stances |
| | `for-whom.js` | **every assertion has a for-whom**, gated by DMD saliency (coherent mass > shuffled null) + material + relevance |
| | `eot-rich.js` | NL → EOTRich@1: content nodes, absorbed function words, cube-addressed arcs |
| | `eot-realize.js` | EOT → NL: order + morphology + closed set, no model (the realizer) |
| | `gfp-claim.js` | the language-neutral GFP: `end1 —label→ end2`, renderable through any declared order |
| | `dmd.js` / `dmd-stream.js` | the DMD operator / streaming modes — the coherent structure a reading has above noise |
| | `perspective.js` | a holder's beliefs: holds / doubts / refuses / conceded |
| | `theory-of-mind.js` | fold the universe at any `body:mind` — the for-whom, generalized |
| **adapters** (the language grammars — Sullivan's lens) | `english-parser.js` | the trained parser — the ONE disclosed model in reading |
| | `relations-gfp.js` | the GFP reader: figure-connector-figure by recurrence, no model |
| | `relations-positional.js` | the clause reader: subject/verb/object by the language's MEASURED order |
| | `relations-language.js` | dispatch: GFP base, SVO/SOV/VSO only when a RoleConfig declares it |
| | `copula-claims.js` | the material's own polarity: holds / refuses / open |
| | `spans.js`, `surfaces.js` | sentences with offsets; names individuated |
| **organs** | `stance.js` | the English evaluative lens (one giver), the Gornick probe |
| **the-fold** (reading machinery) | `referents.js` | **every surface binds to an unnamed referent**; aliases fold onto one id |
| | `field-of-record.js` | the holograph: keyless memory (THE_HOLOGRAPH / SHADOW / ECHO) |
| | `resolutions.js` | the discourse at any active referent: ATMOSPHERE / LENS / PARADIGM |
| | `document-ledger.js` | the void cells + holonic satisfaction (strain/turn/landing) |
| | `eot-draft.js` → `prosify.js` | the void → draft → mouth |
| | `archon-rules.js` | the archons' probes (Zinsser, Caro, Gornick, …) judge the piece |

### 2. penelope — the keeper (the record · the mouth · the judgment)
The generation spine, one adapter per medium, the box settles.

```
readUnits → BOX SETTLES (composed reader, no model) → field/hunt → MOUTH (local model, residue only) → test → seal
                      │
                      └─ DMD-bounded universe (Sullivan + Chomsky): admits or refuses each assertion
```

| file | what it is |
|---|---|
| `organs/generation/engine.mjs` | the engine: read → settle → fill → snip → probe → test → seal; awaits computeSettles |
| `organs/generation/adapters/prose.mjs` | **the prose adapter**: `computeSettles` (box, no model), `inUniverse` (DMD-bounded grounding), the mouth draws the residue |
| `organs/mouth.mjs` | the decision layer: every draw enters her admission/ration/kind; the bridge executes |
| `GLAUCA-EOT.md` | the ledger — every law and experiment, append-only (GL-*) |
| `gym/box-vs-model-experiment.mjs` | the ablation: box+model ≤ model-only fabrication (18 ≤ 21), settle rate disclosed |
| `gym/box-settle-live-hunt.mjs` | the honest settle rate on live-fetched material (2/7 on junk, 9/10 on clean) |

### 3. the fold / holodeck — the surface (the reading/research surface)
The browser page is the app; its runtime is the pipeline.

| file | what it is |
|---|---|
| `index.html` | the surface; no build step |
| `holodeck-ask.js` | the full pipeline in the tab: retrieval mechanical, model only as the mouth, attribution after, Gary at the door |
| `holodeck-summary.js` | the summary ladder — **folds at an identity** (`forWhom`): the difference that makes a difference to it (stance-inversion = the turn) |
| `holodeck-reader.js` | the browser port of the model-free reader (GFP dispatch, clause-aware) |
| `holodeck-lang.js` | GFP → the language's DECLARED order → NL (the back leg), per language |
| `falsify-dmd-universe.mjs` | grounding as DMD saliency on the casual priors (nus-sms the only real universe) |
| `falsify-holodeck-reader.mjs` | the composed reader swap, falsified and reverted (its gain did not beat its shuffle) |

## The data layer

**live_priors** — the received corpus, read through the registers:
proper English (books, encyclopedic, gov-legal, news) and the **casual / non-standard English** (cosem Singlish, enron, irc, nus-sms, lccc) — the priors the box settles against.

**eoreader7/native/priors** — the measured priors: `pos-en`, `role-config-{eng,arb,heb}` (each language's OWN order), `parser-eng-ewt` (the model), `morphology-eng`.

## The seams (who talks to whom)

```
   penelope ──ER7_HOME──▶ eoreader7's organs (document-ledger, referents, relations, dmd)
   the-fold ──vendor/eoreader7──▶ the same organs, ported to the browser
   penelope ──composed reader──▶ the-fold's summary ladder (shared)
   penelope's mouth ──channel──▶ eoreader7's proxy (heimdall, ollama)
   live_priors ──▶ both penelope's box and the-fold's ladder
```

## The one law

> **The world must fold at a point — an identity.** Every assertion has a
> for-whom and is bounded by DMD saliency: a claim is grounded iff it sits
> inside the material's own coherent modes (above its shuffled null), it found
> the material, and it makes a difference to the question (Bateson). A summary
> or answer is what the material says TO that identity — bounded by differences
> that make a difference, measured, never assumed, refused rather than guessed.

## The honest state (what the falsifiers say)

- **fold-at-identity** beats its shuffled null: p = 0.031 (the turn is real).
- **box+model ≤ model-only** fabrication (18 ≤ 21); box settles verbatim, 0 fabrications.
- **DMD universe**: nus-sms clears its null — the only real casual universe; cosem/enron/irc are below their nulls (their reading is flat, one-off).
- **coverage is the wall**: the positional clause reader fires on ~8% of real prose; the rest is the local model's residue, which fabricates unless the box bounds it.
- **the LLM pretends**: to perspective, to grounding, to theory of mind. Every organ above is the mechanical version — reasoned, citable, per for-whom, DMD-bounded, and it refuses rather than invents.