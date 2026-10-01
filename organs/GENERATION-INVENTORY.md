# Generation organs — every form of generation, under Penelope

**Pulled in, not forked from scratch.** Portable modules are copied with
provenance (source commit below); coupled modules are referenced, never
copied — copying them would fork their kernel dependencies and rot.

## Resident (copied, dependency-free)

| organ | from | commit | why portable |
|---|---|---|---|
| `generation/engine.mjs` | `ai-code-harness/pipeline/engine.mjs` | 229b686 | node builtins only (the arrangement: read → spiral field/hunt/mouth → test → product → EOT) |
| `generation/adapters/code.mjs` | `ai-code-harness/pipeline/adapters/code.mjs` | 229b686 | imports only ../engine.mjs + optional /tmp/crispr (try/catch) |
| `generation/adapters/prose.mjs` | `ai-code-harness/pipeline/adapters/prose.mjs` | 229b686 | imports only node:module + ../engine.mjs |
| `consensus-gate.mjs` | born here (quake/launch harvests) | penelope 44ca2f2 | no imports |
| `detail-fetch.mjs` | born here (R9–R10) | penelope founding | no imports |
| `behavior-check.mjs` | born here (R11) | penelope founding | no imports |
| `freshness.mjs` | born here (R12) | penelope founding | no imports |

## Referenced (coupled — read at source, do not copy)

| organ | home | commit | coupling (why not copied) |
|---|---|---|---|
| `code-build.js` (mechanical fan-out build) | `eoreader7/native/organs/code-build.js` | 14dc2c5 | imports eoreader7 `postprocess.mjs` validators |
| `talk-build.js` + `talk-reader.js` + `talk-reason.js` (conversation builds) | `eoreader7/native/organs/` | main | kernel `notes.js`, English parser, claim-acts |
| `belief-page.js` + `page/prose/music-medium.js` (renderers) | `eoreader7/native/adapters/build/` | main | fold types, license table, MIDI stack |
| `widget-build.mjs` (one-prompt widget driver) | `ai-code-harness/widget-build.mjs` | d080841 | imports `code-build.js` above |
| `look.js` (image→structure, mechanical + vision) | `eoreader7/native/organs/look.js` | main | OpenCV/Tesseract env + vision ladder + AntiStrauss gate |

## Falsifying control

A generation task Penelope cannot route — to a resident organ, a
referenced organ, or an honest named gap — fails loudly at intake. If a
referenced organ's home moves, this file's commit pins go stale and the
stale pin itself is the finding (re-resolve, don't guess).
