# legend

Every non-ASCII symbol the tapestry prints is defined here, and every symbol defined here is printed there (gym/check-tapestry.mjs, both directions). PROFILE: the canon symbols below are EO's own; the cloth prints their SAFE counterparts (the top-level `safe` map), chosen only from the glyphs that Menlo, Courier New, Andale Mono, SF Mono and DejaVu Sans Mono ALL carry natively (fontconfig charset query, 2026-10-01; gym/glyph-ink.json) — a native glyph of a monospace font is exactly one cell, and no fallback font means no tofu and no shifted column. Measured in the same query: ⊨ is in none of seven monospace fonts, and ∅ ∃ ∀ ⇒ ↻ ↺ ↬ △ ◈ ◇ ⊞ ≣ ∈ ∉ ⟨ ⟩ are missing from five. unweave maps the safe profile back to the canon.

The tapestry carries symbols; this file carries the words. Generated from [`gym/tapestry.legend.json`](gym/tapestry.legend.json) by `gym/weave.mjs`.

## operator

| symbol | is | means |
|---|---|---|
| `∅` → printed `Ø` | NUL | hold the void: declare absence, draw the null, name the gap |
| `○` | SIG | attend: register a difference, sign an origin |
| `●` | INS | birth: make an enduring instance |
| `|` | SEG (EO canon `｜`) | cut: draw or dissolve a boundary |
| `→` | CON (EO canon `⋈`) | bond: join across a boundary |
| `△` → printed `◊` | SYN | compose: an emergent whole from parts |
| `=` | DEF (EO canon `⊢`) | define: what holds within a frame |
| `⊨` → printed `±` | EVA | judge: test against the definition |
| `↬` → printed `↔` | REC | restructure the frame when judgment breaks it |

## grain

| symbol | is | means |
|---|---|---|
| `∘` → printed `◦` | Ground | Void · the hub · 0 · the ambient a figure is read against |
| `◆` → printed `•` | Figure | Beings · the spokes · n · one difference from its ground |
| `◈` → printed `Ω` | Pattern | Fold · the rim · 1 · the difference a figure made to the next ground |

## mode

| symbol | is | means |
|---|---|---|
| `∩` → printed `÷` | Differentiate | cut something apart from something |
| `≈` | Relate | put something beside something |
| `∪` → printed `×` | Generate | bring something into being |

## domain

| symbol | is | means |
|---|---|---|
| `∃` → printed `ε` | Existence | what exists: NUL SIG INS |
| `⊞` → printed `σ` | Structure | how things hang together: SEG CON SYN |
| `∀` → printed `ι` | Interpretation | what the reader holds: DEF EVA REC |

## face

| symbol | is | means |
|---|---|---|
| `◀` → printed `←` | ACT | WHAT is done: mode × domain = the operator |
| `▲` | SITE | WHERE it lands: domain × grain = the terrain |
| `▶` → printed `↕` | STANCE | HOW it is done: mode × grain = the stance |

## status

| symbol | is | means |
|---|---|---|
| `■` | woven | resident in Penelope, checked against the repo |
| `□` | referenced | lives in the house, read at home, never forked |
| `·` | unwoven | a named void: nothing is claimed, only a gap and the control that would falsify it |

## typing

| symbol | is | means |
|---|---|---|
| `§` | registered | the cell typing is in the house's own documents (THE-27-CELLS.md) |
| `‡` | nominated | this tapestry's own typing of the act; a pointing, never a proof |

## flow

| symbol | is | means |
|---|---|---|
| `›` | then | next in the pipeline |
| `∨` → printed `√` | or | alternatives; in the pipeline, in order, the first that answers wins |
| `↺` → printed `∫` | spiral | name why, sharpen, re-draw; bounded by a budget |
| `↑` | possibility | LOW gate: the level below sets what the level above may be |
| `↓` | probability | HIGH gate: the level above sets how likely the level below is |

## provenance

| symbol | is | means |
|---|---|---|
| `≡` → printed `∏` | field | matched in the corpus, by frame, snipped with an address |
| `↻` → printed `Γ` | hunt | fetched, extracted, frame-checked, cited |
| `✗` → printed `†` | refused | typed refusal, shipped as dissent |

## logic

| symbol | is | means |
|---|---|---|
| `⇒✗` → printed `∂†` | falsified-if | the condition written before it, once observed, kills the thread |
| `∧` → printed `Λ` | and | both |
| `¬` | not | absent |
| `≠` | differs | not equal |
| `≥` | at-least | greater or equal |
| `≤` | at-most | less or equal |
| `∈` → printed `¤` | in | member of |
| `∉` → printed `¢` | not-in | not a member of |
| `Δ` | change | difference between two runs |
| `∞` | unbounded | no budget |
| `⇒` → printed `∂` | implies | if then |
| `∑` | count | how many |

## frame

| symbol | is | means |
|---|---|---|
| `╔` | frame | corner |
| `╗` | frame | corner |
| `╚` | frame | corner |
| `╝` | frame | corner |
| `═` | frame | edge |
| `║` | frame | edge |
| `╠` | zone | zone rule |
| `╣` | zone | zone rule |
| `┌` | panel | corner |
| `┐` | panel | corner |
| `└` | panel | corner |
| `┘` | panel | corner |
| `├` | panel | tee |
| `┤` | panel | tee |
| `┬` | panel | tee |
| `┴` | panel | tee |
| `─` | panel | rule |
| `│` | panel | rule |
| `┼` | panel | cross |
| `░` | thread | a woven thread, light: also the selvedge and the braid's strand |
| `▒` | thread | a woven thread, mid: also the selvedge and the braid's crossing |
| `▓` | thread | a woven thread, dense: also the selvedge and the braid's strand |
| `◇` → printed `Φ` | gem | the hub jewel; Indra's net: every thread is mirrored on the faces, the holons, the helix and the ring |
| `▫` → printed `°` | void | an empty cell: declared, not yet filled |
| `⟨` → printed `«` | key | opens the key panel |
| `⟩` → printed `»` | key | closes the key panel |
| `◦` → printed `∙` | ring | the path of one turn of the wheel: Ground (hub), Figure (spokes), Pattern (rim) |

## measure

| symbol | is | means |
|---|---|---|
| `≣` → printed `¶` | order test | the spine's Kendall t against the helix; p over n seeded shuffles of the same stages (a budget, disclosed) |

## profile

The cloth prints in the **safe** profile: the canon symbol on the left of each table above is replaced by its counterpart. `gym/unweave.mjs` maps it back.

| canon | printed |
|---|---|
| `∅` | `Ø` |
| `△` | `◊` |
| `⊨` | `±` |
| `↬` | `↔` |
| `∘` | `◦` |
| `◆` | `•` |
| `◈` | `Ω` |
| `∩` | `÷` |
| `∪` | `×` |
| `∃` | `ε` |
| `⊞` | `σ` |
| `∀` | `ι` |
| `◀` | `←` |
| `▶` | `↕` |
| `∨` | `√` |
| `↺` | `∫` |
| `≡` | `∏` |
| `↻` | `Γ` |
| `✗` | `†` |
| `⇒` | `∂` |
| `∈` | `¤` |
| `∉` | `¢` |
| `∧` | `Λ` |
| `◦` | `∙` |
| `◇` | `Φ` |
| `▫` | `°` |
| `≣` | `¶` |
| `⟨` | `«` |
| `⟩` | `»` |

## terms

- **key row**: every thread, addressed: <status><code> <level> <op><grain> <typing> <name>, then refs, then a condition ⇒✗ for an unwoven thread
- **levels**: `0` atom: one framed fragment · `1` unit: one named part, its own void cell · `2` artifact: the sealed whole · `3` loom: chat, build, notebook · `4` house: ladder, standing rules, the record
- **prefixes**: o/ organs/ · g/ gym/ · l/ ladder/ · a/ apps/ · E7/ ../eoreader7/native/ · SP/ ../eoreader7-screenshot-pipeline/native/ · ER7/ ../eoreader7/ · LP/ ../live_priors/ · FOLD/ ../the-fold/
