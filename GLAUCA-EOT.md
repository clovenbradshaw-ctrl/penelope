# Glauca's EOT — the generation pipelines, on the record

// Handle: Glauca, Minerva's owl — the one who keeps the night's record.
// Spoken as Bubo at the first breath of this session, renamed Glauca at
// the seam, 2026-10-01. What the loom learns by night, she writes down by
// day — Penelope weaves, Odysseus voyages, Glauca files the finding.
//
// This is the append-only record of our best practices for the different
// pipelines of generation, harvested from everything Penelope has learned
// to date (ladder r1–r13, the launch app, the gym, the arrangement engine
// and its adapters, the organs). Every entry carries its evidence and its
// falsifying control. Nothing here is a rule because it is asserted; it is
// a rule because it survived the runs that could have killed it.

## The contract of this file

- **Append-only.** An entry, once written, is never rewritten.
- **Always revisable.** To revise a practice, APPEND a new entry with
  `status: supersedes <id>` and the sharper rule; the old entry stays on
  the record, superseded by pointer, because the falsification that forced
  the change is itself evidence. Edit in place ONLY to sharpen — add a
  falsifying control, correct a citation — never to change what an entry
  says (the ledger rule for rules).
- Every entry names its **pipeline** (chat / build / notebook / engine /
  organs / ladder / routing / law), its **status**, its **evidence** (real
  path:line or measured run), and a **falsifying control** — the one thing
  that would prove it wrong.
- A future run that trips an entry's falsifying control IS the finding:
  supersede the entry on the record, never silently fix it.
- The standing of the whole file: a pipeline run that repeats a red rung
  as a retry, or asks the mouth for a shape the box already owns, or
  ships cloth with no ledger of its making, proves this file was not
  consulted. If the field (this file) holds it, no one redraws it.

---

## The law (inherited, cross-cutting)

### GL-00 — The seam: no cloth without the ledger of its making
- pipeline: law
- status: standing
- supersedes: —
- evidence: README.md:44-46 (What Penelope never does: voyage. What Odysseus never does: weave. Material crosses between them only as addressed record — feed bytes, comp evidence, scars, verdicts — never as assertion.)
- falsifying control: a build whose artifact ships with no record of its making (no provenance, no scars, no verdict) contradicts this.

What Penelope never does: voyage. What Odysseus never does: weave. The
artifact and its record are one shipment — the seal is artifact + facing
page, and the ledger of the weaving rides with the cloth.

### GL-01 — The four inherited laws of the house
- pipeline: law
- status: standing
- supersedes: —
- evidence: README.md:50-51 (Law (inherited): Library → box → hunt → mouth. No hardcoded numbers (every bound derives from a null + a budget). Named gaps, never invented lists. Red rungs become standing rules, never retries.)
- falsifying control: a hardcoded threshold with no null-and-budget derivation, or a red rung re-run as a retry instead of becoming a standing rule, breaks this.

1. Library → box → hunt → mouth (remembered, derived, gotten, drawn — last).
2. No hardcoded numbers — every bound derives from a null + a budget.
3. Named gaps, never invented lists.
4. Red rungs become standing rules, never retries.

---

## chat — the shuttle

### GL-CH-01 — Free talk allowed; confident claims are not
- pipeline: chat
- status: standing
- supersedes: —
- evidence: LOOMS.md:9-11
- falsifying control: a chat answer that asserts an unverified claim as
  confident fact, with no type marking, contradicts this.

The mouth draws, the organs judge, scars ride along. Anything unverified
arrives typed as such — a confident claim is the one thing free talk may
not be.

### GL-CH-02 — What improves in real time is the SYSTEM, never the mouth
- pipeline: chat
- status: standing
- supersedes: —
- evidence: gym/server.mjs:10-11 ("What improves in real time is the SYSTEM (standing rules accumulate, box owns more shapes) — the mouth doesn't learn. The scoreboard says so.")
- falsifying control: a rung log that shows the mouth getting better at a
  shape the box was not extended for would break this.

The mouth does not learn. The standing rules accumulate and the box owns
more shapes; the scoreboard records the split (winner: mouth | box) so the
claim is checked, not asserted.

### GL-CH-03 — Chat routes through Heimdall admission, typed refusals never a wedge
- pipeline: chat
- status: standing
- supersedes: —
- evidence: gym/server.mjs:22-27, 39-68 (x-er7-session gives Penelope her own profile, x-er7-priority: batch queues behind interactive; 429/503 + Retry-After honored with bounded backoff, then a typed refusal — never a silent stop, never a wedge)
- falsifying control: a chat draw that hangs silently past its budget
  instead of returning a typed refusal contradicts this.

Chat goes through Heimdall admission (the proxy's shared mouth), with
Penelope's own session profile and batch priority. Backoff is bounded;
exhaustion is a named gap, retry later — never silence.

---

## build — the cloth

### GL-BD-01 — Build = artifact + control + facing page + EOT record
- pipeline: build
- status: standing
- supersedes: —
- evidence: LOOMS.md:14-20; README.md:41-42 (the testCommand, only the true build passes — verification stringed by no other hand)
- falsifying control: a build artifact accepted without its EOT record, or
  a build that passes without a real test, contradicts this.

In: one prompt (+ optional workspace). Out: artifact + control + facing
page + EOT record. Library remembers, box derives, hunt gets, mouth last.
The test decides — no other hand strings the bow.

### GL-BD-02 — Null-hit anywhere → named gap, never invented cloth
- pipeline: build
- status: standing
- supersedes: —
- evidence: LOOMS.md:18; apps/record.json (probe: gap — fetch-fail/zero-results renders named #gap, never invented launches)
- falsifying control: a build that fills an empty feed result or a failed
  fetch with invented rows contradicts this.

A miss at any layer — the library does not hold the frame, the hunt comes
back empty, the mouth cannot draw — is a named gap, never a guess dressed
as a row.

### GL-BD-03 — The build loom requires a create-capable door
- pipeline: build
- status: standing
- supersedes: —
- evidence: LOOMS.md:19 ("Requires a create-capable door: patch-only loops need not apply (measured 2026-10-01)")
- falsifying control: a patch-only loop producing a complete artifact with
  teeth would break this.

A build that only patches what already exists is not a build; the loom
takes an ask and returns a created artifact, or names the gap.

### GL-BD-04 — The seal ships the dissent, not just the cloth
- pipeline: build
- status: standing
- supersedes: —
- evidence: engine.mjs:168-182 (the ArrangementEOT@1 record: schema, kind, standing disclosed, prompt, model, law, field read, corpus provenance — snipped@address / hunted@url / drawn — swarm verdict, scars, product); README.md:42 (the seal: artifact + facing page)
- falsifying control: a shipped artifact whose EOT hides the scars or a
  non-converging swarm contradicts this.

Every artifact carries its dissent: the scars, the refusals, the
non-convergence. Never report a confident meaning over a swarm that did
not converge.

### GL-BD-05 — Unanimous consensus carries the copycat-template risk, disclosed
- pipeline: build
- status: standing
- supersedes: —
- evidence: consensus-gate.mjs:63-64; apps/record.json (control: launch-control.html — same feed+sort+countdown, consensus disabled, layout differs only; gate verdict: CALLABLE-unanimous (copycat risk disclosed))
- falsifying control: a unanimous gate used as a license to stop measuring
  independent variation contradicts this.

K === 1 (unanimous) opens the gate but the standing note is explicit:
copycat-template risk is disclosed, not checked. The control ships beside
the experiment — consensus off, layout the only difference.

### GL-BD-06 — App structure is organ-driven: factor the pure logic
- pipeline: build
- status: standing
- supersedes: —
- evidence: r9-r13-record.json (standingAdded: "apps factor pure logic in a loadable block (organ-driven structure)"); behavior-check.mjs:6-9
- falsifying control: a drawn control with no factored pure function that
  the behavior-check passes contradicts this.

The app exposes its interactive logic as named pure functions on a
loadable block; behavior-check executes declared cases against them. A
drawn control with no factor fails — that is the open gap from
ONE-PIPELINE, now caught.

---

## notebook — the pattern-book

### GL-NB-01 — The notebook is a re-runnable record: history appends, nothing overwrites
- pipeline: notebook
- status: standing
- supersedes: —
- evidence: LOOMS.md:22-29; gym/to-notebook.mjs (live today, 4/4 organ cells green)
- falsifying control: a notebook cell that replays to a different verdict
  than its stored one, or a re-run that overwrites a prior cell's output,
  contradicts this.

Every cell replays to its verdict. Markdown cells carry specs and
model-drawn history — recorded, never replayed. Code cells re-run the
organ selftests with outputs stored. History appends; nothing overwrites.

---

## engine — the arrangement (one law, per-domain adapters)

### GL-EN-01 — One engine; per-domain adapters; the engine owns the spine
- pipeline: engine
- status: standing
- supersedes: —
- evidence: engine.mjs:20-35 (the engine owns the ORDER, the RETRIES, the SCARS, the EOT, the FILES; an adapter is readUnits / computeSettles / autofill / hunt / mouthFragment / snip / probeUnit / testUnits / toDocument)
- falsifying control: a second pipeline that reimplements the order,
  retries, scars or EOT instead of plugging a new adapter contradicts this.

The pipeline is ONE engine. What differs by domain — how a unit is READ,
SNIPPED, PROBED, TESTED and SHIPPED — is pulled out into an adapter. The
engine owns the order, retries, scars, EOT, files.

### GL-EN-02 — The fill order is the law: field → hunt → mouth
- pipeline: engine
- status: standing
- supersedes: —
- evidence: engine.mjs:83-85, 93-113; LOOMS.md (the cards: pattern computed once, covering infinite cases)
- falsifying control: a run where the mouth is asked before the field and
  the hunt have both returned nothing contradicts this.

The field (corpus) remembers first. The hunt goes and gets second. The
mouth is asked only for what neither had — the irreducible residue. The
mouth is never the first resort.

### GL-EN-03 — The field matches BY FRAME, never by name
- pipeline: engine
- status: standing
- supersedes: —
- evidence: code.mjs:16-18 (two atoms are the same iff they make the same difference to the ground), code.mjs:69-77, engine.mjs:93-97
- falsifying control: a corpus hit accepted on name alone whose frame the
  spec's meaning does not match would prove the frame check decorative.

A unit the field already holds is snipped from its bytes with an address,
matched by the spec's meaning — never by the function's name. A name can
collide; a frame cannot.

### GL-EN-04 — Hunt-first: a draw that fails twice is a hunt problem, not a redraw
- pipeline: engine
- status: standing
- supersedes: —
- evidence: engine.mjs:7-10 (HUNT-FIRST — iterating the mouth is the ant-loop wall; going out and getting the thing is Ranke's chase); code.mjs:81-101 (prefer raw githubusercontent / .js / .mjs; refuse the wrong world)
- falsifying control: a twice-failed draw redrawn a third time with no
  hunt attempted contradicts this.

The field lacks the framed unit — go get it. Prefer raw source; extract
the framed function; refuse the wrong world. Iterating the mouth is the
wall.

### GL-EN-05 — Small-model law: the prompt is a completion anchor, the test decides
- pipeline: engine
- status: standing
- supersedes: —
- evidence: engine.mjs:57-58 (small-model law — the prompt is a completion anchor, the test decides); code.mjs:163-169 (one single-part fragment, EXACTLY ONE function, no prose, no fences); temperature 0 (engine.mjs:64)
- falsifying control: a draw steered by a prompt that tells the model what
  to output (rather than anchoring a fact and letting the test decide)
  contradicts this.

The mouth's ask is one small, framed fragment — a fact to complete, never
a steering instruction. The test decides. Never steer the draw; sharpen
the atom and re-draw.

### GL-EN-06 — The spiral: draw → probe → sharpen → re-draw; scars disclosed
- pipeline: engine
- status: standing
- supersedes: —
- evidence: engine.mjs:83-85, 113-131 (fillUnits: field → hunt → mouth with attempts, atoms sharpened by `why`, every defection pushed to scars)
- falsifying control: a draw that failed a probe re-drawn with the same
  atom and no sharper spec contradicts this.

The spiral keeps the dissent: each defection names why, the atom sharpens,
the scar is recorded. The EOT discloses every scar — the dissent is the
deliverable, never hidden.

### GL-EN-07 — Multiple framings, one survival; falsify-or-die
- pipeline: engine
- status: standing
- supersedes: —
- evidence: engine.mjs:10-17 (MULTIPLE-FRAMINGS: code = settle + spec-words + frame check; prose = invented-referent + meta + hollow-actor; FALSIFY-OR-DIE); code.mjs:171-211 (probeUnit: settle deepEq if named, else spec's content words)
- falsifying control: a unit proven by a single reading where the swarm
  would have contended it contradicts this.

No unit is proven by one reading. Meaning is what survives the contention
of the framings; a non-converged swarm is reported as such, never as a
confident answer.

### GL-EN-08 — Compute settles; the box derives, the mouth never guesses an example
- pipeline: engine
- status: standing
- supersedes: —
- evidence: code.mjs:52-66 (computeSettles — settles derived from a caller-declared example grid; the settle calls the UNIT's own name; mouth never guesses an example)
- falsifying control: a settle that calls a name other than the unit's own,
  or an example invented by the mouth, contradicts this.

The box derives what proves each unit from a caller-declared example grid.
The settle calls the unit's own function name — never a renamed variable,
never a guessed example.

### GL-EN-09 — The snip keeps the close; cut EXACTLY the named unit
- pipeline: engine
- status: standing
- supersedes: —
- evidence: code.mjs:103-161 (walkBraceBlockEnd — string/comment-aware structural walk, keeps the closing brace, kleenUp-modified); content-rules "Discrete multi-unit coding task" (a draw often emits every function it saw, which duplicates the file if the whole reply is kept)
- falsifying control: a snip that keeps a whole multi-function draw as one
  unit, or cuts on a brace that closes a string or comment, contradicts this.

Structural walk, not a regex: string/comment-aware, depth returns to zero
at the close. Extract exactly the named unit — a draw frequently emits
every function it saw.

### GL-EN-10 — The reading is one small ask, JSON out — a structure, never a regex
- pipeline: engine
- status: standing
- supersedes: —
- evidence: code.mjs:28-50 (readUnits — one ask, JSON array {name, spec}; malformed reading is an empty reading, the caller's gate shows it); kleenUp's law in code.mjs:2
- falsifying control: a reading parser that format-guesses with a regex
  instead of decoding the declared structure contradicts this.

The decoder parses a structure it was asked for; it never pattern-guesses
the model's echo formats. A malformed reading is an empty reading — the
gate shows the miss.

### GL-EN-11 — Prose delegates to eoreader7's falsified organs, never reimplements them
- pipeline: engine
- status: standing
- supersedes: —
- evidence: prose.mjs:1-33, 113-127 (delegates to topicPhrase, voidCellsFor, wideToAtoms, foldWideToShape — 68 tests green at 2a033d7; the void cells become the units, each cell's question its spec; the fold re-admits every sentence, dedupes by claim-core, assigns to beats, names gaps and residual, discloses refused)
- falsifying control: a prose adapter that reimplements the essay machinery
  it was told to delegate contradicts this.

The void cells are the units. The field keeps relevant snips; the fold
re-admits the wide draft against the whole ground; invented referents,
meta-sentences and hollow actors are refused; gaps and residual are named,
never vanished.

### GL-EN-12 — Sharpen names the real referent jurisdiction: an atom is an address with a jurisdiction
- pipeline: engine
- status: standing
- supersedes: —
- evidence: prose.mjs:146-151 (sharpen — answer from the subject's OWN record; name only referents the shadow's material established; never invent a name); code.mjs:261-263 (use the function's OWN argument(s), never a timestamp or clock)
- falsifying control: a sharpened draw that invents a referent or reads a
  clock the ask never supplied contradicts this.

The mouth answers from the subject's own record — the shadow's material,
not its own invention. In code: the unit's own arguments, never a wall
clock.

---

## organs

### GL-OG-01 — Organs are pure, self-tested, schema-tagged, and carry their falsifying control
- pipeline: organs
- status: standing
- supersedes: —
- evidence: GENERATION-INVENTORY.md:7-17 (the four born-here organs are dependency-free, no imports; package.json runs each organ's selftest); each organ's selftest + schema constant (DetailFetch@1, BehaviorCheck@1, Freshness@1, ConsensusGate@1)
- falsifying control: a new organ with no selftest, no schema tag, or no
  falsifying control contradicts this.

An organ ships with its own selftest as the law (selftests are the law,
not examples), a schema tag, and a stated falsifying control. No imports,
no model, no DOM — pure and injectable.

### GL-OG-02 — No hardcoded numbers: every bound derives from a null + a budget
- pipeline: organs
- status: standing
- supersedes: —
- evidence: consensus-gate.mjs:21-27, 59-73 (under the null the K categories are equiprobable; Hoeffding bound moves with n — there is no fixed N anywhere; minN=3 by hand, disclosed as triangulation; maxN bounds the budget); README.md:50-51
- falsifying control: a gate with a hand-set fixed threshold not derived
  from a null contradicts this.

The bound moves with n. minN = 3 is a hand-set floor for triangulation —
disclosed, not hidden — and maxN is a budget. The gate answers CALLABLE /
MORE / DISSOLVED / EXHAUSTED, never a fixed-N guess.

### GL-OG-03 — The gate decides by frequency + growth, never loudness
- pipeline: organs
- status: standing
- supersedes: —
- evidence: consensus-gate.mjs:41-62 (DISSOLVED only on hard vanishing — the mode appeared repeatedly in the first half (>= 2 hits) and zero in the second; an earlier halves-rate version vetoed AAAA,B,C as "dissolving", mistaking late diversity for decline — recorded, fixed); README.md:40 (frequency + growth decide, never loudness)
- falsifying control: a mode that dissolved for late-diversity reasons (not
  hard vanishing) being called DISSOLVED contradicts this.

Frequency is the recurrence across independent comps; growth is the
support trajectory as the harvest arrives. A leader that fades as the
harvest widens is diversity, not decline — only hard vanishing dissolves.

### GL-OG-04 — Per-item gaps, never a sunk list
- pipeline: organs
- status: standing
- supersedes: —
- evidence: detail-fetch.mjs:3-9, 37-43 (a failed detail marks THAT item missing-detail, never sinks the list; gaps[] names the failed indices; wrong path returns undefined, never throws)
- falsifying control: one failed detail that drops the whole list
  contradicts this.

Bounded-concurrency fan-out; each row's detail lives behind its own URL;
a failure marks that item missing, the list survives, and the gaps array
names exactly which indices failed.

### GL-OG-05 — Behavior is checked at the layer the app factors it
- pipeline: organs
- status: standing
- supersedes: —
- evidence: behavior-check.mjs:6-9, 39-45 (no screenshot path, no DOM — the app must expose its interactive logic as named pure functions; drawn controls with no factor FAIL; factors are pure — same input twice ⇒ same output — and never touch document/window/fetch/localStorage)
- falsifying control: a drawn control that passes without a factored pure
  function contradicts this.

There is no browser here, so behavior is checked where the app FACTORS it.
A control that draws behavior without a factor is the open gap, caught.

### GL-OG-06 — Freshness always says which it is: fresh / stale / expired
- pipeline: organs
- status: standing
- supersedes: —
- evidence: freshness.mjs:3-9 (fresh = age <= ttl; stale = ttl < age <= 3*ttl, still shown, badge carries last-good time; expired = older — named gap, not silent old rows)
- falsifying control: a stale row shown with no last-good marker, or an
  expired row shown as if live, contradicts this.

The badge always declares the state. Stale keeps the rows and names the
last good time; expired renders the named gap. Never silent old data.

### GL-OG-07 — Pull in, don't fork: copy with provenance or reference, never duplicate coupled kernels
- pipeline: organs
- status: standing
- supersedes: —
- evidence: GENERATION-INVENTORY.md:3-5, 19-27 (portable modules copied with provenance — source commit pinned; coupled modules referenced, never copied — copying would fork their kernel dependencies and rot); GENERATION-INVENTORY.md:30-32
- falsifying control: a coupled organ copied in as a fork, or a copy with
  no pinned provenance, contradicts this.

Portable modules are copied with their source commit; coupled modules are
referenced at their home, never duplicated. If a referenced organ's home
moves, the stale pin is itself the finding — re-resolve, don't guess.

### GL-OG-08 — Unroutable generation fails loudly at intake
- pipeline: organs
- status: standing
- supersedes: —
- evidence: GENERATION-INVENTORY.md:30-32 (a generation task Penelope cannot route — to a resident organ, a referenced organ, or an honest named gap — fails loudly at intake)
- falsifying control: a generation task that gets a silent pass when no
  organ routes it contradicts this.

Routing is to a resident organ, a referenced organ, or an honest named
gap. No route, no task: fail loudly, name the gap.

---

## ladder

### GL-LD-01 — The ladder is simple-to-complex competency, prompt-only steering
- pipeline: ladder
- status: standing
- supersedes: —
- evidence: r1-r8.json:1 (ladder: simple-to-complex competency, prompt-only steering, Lovelace rules: #2 one behavior/ask, #25 completion+snip, #24 spec-states tests, #17 compute-dont-generate)
- falsifying control: a ladder rung whose steering is hand-written logic
  rather than a prompt contradict this.

Mouth draws, organs decide — selftests are the law, not examples. The
ladder is a curriculum of what to ask and what to compute.

### GL-LD-02 — The red rung is the lesson: the ladder teaches what not to ask
- pipeline: ladder
- status: standing
- supersedes: —
- evidence: r1-r8.json:5-7 (R4 fmtAgo mouth-draw FAIL 0/4 — same unit-ladder bug 3rd draw; verdict: capability wall, not bad luck — formatting ladders are box-computed (#17); mouth never asked again for this shape; fmtAgo box-computed: pass 4/4 held-out)
- falsifying control: the mouth asked again for a shape a red rung already
  declared box-owned contradicts this.

A red rung is not bad luck — it is the boundary of what the mouth can
draw. R4's failure is why time-format ladders are box-computed. The red
rung becomes the standing rule.

### GL-LD-03 — One rung at a time; no rung stacks on red; red becomes a standing rule, never a retry
- pipeline: ladder
- status: standing
- supersedes: —
- evidence: r9-r13.json:5 (one rung at a time; no rung stacks on red; mouth is last resort: library -> box -> hunt -> mouth); r9-r13-record.json (filterLaunches mouth 0/3 → BOX-OWNED standing, the same 3-strike rule as fmtAgo; R13 pass — mouth calls in artifact: 0)
- falsifying control: a second rung built on a still-red first rung
  contradicts this.

Every prior rung re-runs green against the ship. A shape that strikes the
mouth three times is promoted to the box permanently — never retried.

### GL-LD-04 — The zero-mouth proof: a feed→list render is fully mechanical
- pipeline: ladder
- status: standing
- supersedes: —
- evidence: mouth-last.json:9-10 (feedListApps mouth residue EMPTY — proven by a zero-mouth run: 20/20 rows, same order/shape/fields, 0 model calls; falsifier: any feed→list render that cannot be built without a model call); ladder/nomouth-rows.txt (20 rows, 0 model calls, behavior-matches launch-consensus.html)
- falsifying control: a feed→list render that genuinely cannot be built
  without a model call would break this entry.

The mouth's residue for the feed-list app is empty, and it was proven
empty: a zero-mouth run produced all 20 rows, same order, shape and
fields. A render that needs the mouth for this shape is a gap in the box,
not a job for a draw.

### GL-LD-05 — Mouth residue is only what no file/feed/comp/box-rule says
- pipeline: ladder
- status: standing
- supersedes: —
- evidence: mouth-last.json:11-13 (mouthKeeps: genuinely new paraphrase, novel names, judgments under uncertainty — each use budgeted + probed, never structural)
- falsifying control: a structural string (a row, a path, a format) drawn
  by the mouth instead of taken from the feed bytes contradicts this.

The mouth keeps only what nothing on the record can say: new paraphrase,
novel names, judgments under uncertainty. Each use is budgeted and probed,
and never structural.

### GL-LD-06 — The mechanical inventory is box-owned; the interim is named
- pipeline: ladder
- status: standing
- supersedes: —
- evidence: mouth-last.json:4-9 (countdown duration math + tick — mouth failed, box owns; sort comparator — mouth drew the wrong key (.isoDate); time-format threshold ladder — mouth failed 3×, box owns; feed trace, gap, gate, render — box; compLabel row-order extraction is mechanizable but hand-labeled today — an honest interim)
- falsifying control: a box-owned mechanical shape asked of the mouth again
  contradicts this.

Countdown math, comparators, time-format ladders, feed traces, gaps,
gates and renders are all box-owned — each proven by a mouth failure that
made the standing. The one interim (row-order extraction) is named as
interim, not dressed as done.

---

## routing

### GL-RT-01 — Route by measured evidence, disclosed: chat via Heimdall, code draws direct
- pipeline: routing
- status: standing
- supersedes: —
- evidence: gym/server.mjs:29-37 (two routes, by evidence 2026-10-01: chat goes through Heimdall admission; code draws go DIRECT to ollama — the chat doors' hard-meaning auto-route swallows code prompts whole and returns a swarm verdict instead of a draw, "Hard meaning (truncated_end)…", logged; consolidation falsified for code draws — disclosed, not hidden)
- falsifying control: a code draw that comes back a swarm verdict instead
  of a draw, or a chat that bypasses admission, contradicts this.

Consolidation (everything through one door) is falsified for code draws —
measured, logged, disclosed. Chat is admitted and rations its own profile;
code draws go direct to ollama.

### GL-RT-02 — The chat door talks (prose around code); the snip cuts function spans
- pipeline: routing
- status: standing
- supersedes: —
- evidence: gym/server.mjs:79-89 (the chat door talks — raw generate didn't; the snip extracts function-shaped spans instead of loading whole text; cut from the first function head to the last closing brace on its own line)
- falsifying control: a code draw loaded whole as text and kept as the
  function would break this.

Different doors speak differently. When a door returns prose around code,
the snip extracts the function-shaped spans mechanically — the box never
loads a whole chat reply as a function.

### GL-RT-03 — Draws carry Penelope's own profile; refusal is typed, never a wedge
- pipeline: routing
- status: standing
- supersedes: —
- evidence: gym/server.mjs:22-27, 56-68 (x-er7-session: penelope-gym, x-er7-priority: batch; 429/503 + Retry-After honored with bounded backoff, then a typed refusal — never a silent stop, never a wedge)
- falsifying control: a draw that stops the loop silently, or wedges on a
  429, contradicts this.

Penelope owns a session profile and queues behind interactive as batch.
Bounded backoff, then a typed refusal with the reason named. Exhaustion is
a gap, retry later — never a hang and never a silent stop.

---

## The falsifying control of this file

A future pipeline run that (a) repeats a red rung as a retry, (b) asks the
mouth for a shape the box owns, (c) matches a unit by name when the frame
was available, (d) ships cloth with no ledger of its making, or (e)
re-routes a door against measured evidence without a new measurement,
would prove this record was not consulted — and the correct response is to
supersede the offending entry on the record, never to silently re-learn
the lesson.

Registered: archon-holocracy `penelope:glauca` (mission + role
`role:glauca`, circle coding-capability) — 2026-10-01.

---

# Addendum A — the rest of the loom (2026-10-01)

// Appended by a second hand (the session helping Glauca) after a sweep of
// the eoreader7 side of the house: CODING-LESSONS.md (lessons 1–87),
// ONE-PIPELINE.md (skeleton, doors, falsification ledger) and the
// screenshot-pipeline branch. The first pass of this file covered
// Penelope's own organs, ladder, engine and routing; this addendum adds
// the pipelines that were learned in eoreader7 and not yet filed here:
// patch (the code loop), ops (the model box), workspace (concurrent
// sessions), quality (how a check earns trust), prose (grounded
// generation, long form), image (screenshot → HTML), and the TAPESTRY rule.
//
// Pipeline vocabulary extends the contract above with: patch, ops,
// workspace, quality, prose, image. Same fields, same rules: append-only,
// supersede by pointer, every entry carries its falsifying control.
// Evidence paths are relative to ~/Documents/3.0/. A "(open: …)" on a
// status is a limit the source itself names — carried, never smoothed.

## law — the skeleton

### GL-EN-13 — One skeleton for every medium; a medium is an adapter
- pipeline: engine
- status: standing
- supersedes: —
- evidence: eoreader7/ONE-PIPELINE.md:19-28 (read → source each part [snip / reason / ask] → hear into the ledger → reason → assemble → verify, sealed only when medium validator + provenance check + helix check all hold); ONE-PIPELINE.md:114-131 (music landed as the second medium touching no core file; two medium-general core changes came first and are recorded)
- falsifying control: a new medium that needs an edit to the core (a page word, a music word) beyond the hooks, or a core file in which a scanner over its string literals finds a medium's vocabulary, contradicts this.

The pipeline is the same for page, code, prose and music; what differs is
vocabulary, renderer, validator, source registry. A medium is added by an
adapter; if the core had to change, say so on the record — as the music
commit did.

### GL-BD-07 — The ledger is the build: the EOT replays byte-for-byte
- pipeline: build
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:55 (lesson 9: EOTBase@1 + EOTCodeOp@1 with find/add bytes + test command replays onto a fresh workspace — the EOT is not a log of the build, it is the build); CODING-LESSONS.md:2013-2023 (lesson 80: every heard claim is INS or SYN in the notes ledger; the page is drawn from the fold)
- falsifying control: an EOT that cannot be replayed onto a fresh workspace to reproduce the artifact, or an artifact element with no ledger entry behind it, contradicts this.

## patch — the code loop and small-model coding

### GL-CD-01 — Per-behavior gates: all-or-nothing gates destroy incremental wins
- pipeline: patch
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:7-12 (lesson 1: a correct single-feature patch was reverted four times because the whole testCommand did not exit 0; fix: `node test.js <key>` per behavior)
- falsifying control: a kept patch reverted because an unrelated behavior's test still failed contradicts this.

### GL-CD-02 — One behavior per ask; quote the failing line; show the shape once; anchor on real bytes
- pipeline: patch
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:14-36 (lessons 2, 4, 5: one behavior, exact failing test line quoted; a worked ACTION/FIND/ADD example beats prose; FIND must exist in the file right now, stub anchors vanish once implemented)
- falsifying control: a patch ask that bundles several behaviors outperforming the split asks on a measured ladder, or a FIND that is not byte-present in the current file being accepted, contradicts this.

### GL-CD-03 — A truncated multi-part function is attention collapse: decompose to single-part leaves
- pipeline: patch
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:386-402 (lesson 29: eval_count 350, done_reason=stop at num_predict 512 and 2000 — the model stops by choice; snake_string split into even_chars/odd_chars, 6/6 trials correct, composed by the box)
- falsifying control: a leaf that itself needs two parts truncating again is the honest ceiling (the decomposition must go until each leaf is single-part); a bigger budget or sharper prompt fixing a truncation the split would not have contradicts this.

Not a token budget, not a better prompt — the smaller task. A leaf that
still truncates is a named capability wall, not a retry.

### GL-CD-04 — A spec gap is a task bug, not a model failure; below ~2b a clean re-ask beats a fix-ask
- pipeline: patch
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:272-292 (lesson 24: Comp/04 scored a model failing a guard the prompt never stated; stating "if k <= 0 or s is empty" made the same model pass; corollary: shown its own buggy body, the 1.5b recites it at every stage)
- falsifying control: a heldout failure scored as a competency gap without diffing spec against test, or a fix-ask that beats a fresh re-ask at ≤2b, contradicts this.

Before a heldout failure becomes a capability finding, diff the spec
against the test: every asserted behavior must be stated.

### GL-CD-05 — Evolve the goal sheet with parsed operational atoms, stated as facts — never echoes, never prohibitions
- pipeline: patch
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:320-342 (lesson 26: the same buggy 3-atom sheet re-asked 5× without evolution converged 0/5; echoing the raw failing assertion onto the sheet did not converge); CODING-LESSONS.md:371-384 (lesson 28: "never"/"do not"/"avoid" atoms are refused by Gary's scan; state the operation so the wrong result is structurally unreachable)
- falsifying control: a sheet of raw test-line echoes converging where the parsed-atom sheet does not, or a prohibition atom that survives Gary's scan, contradicts this.

### GL-CD-06 — The gate is the strongest the language allows; compile+exec is the floor; only a test that CALLS the code decides
- pipeline: patch
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:208-244 (lesson 21: py_compile lets duplicate defs and undefined names through; validatePython — compile + AST undefined-name scan + exec — is the floor; a module that defines normalize→list and parse_line calling .split passes it cleanly and fails the one-line test that calls it; a language with no validator is disclosed UNVERIFIED)
- falsifying control: a build whose assembled file passes the validator yet fails the caller's test IS this limit (the floor is not the decision); a syntax-only pass reported as "verified" contradicts this.

### GL-CD-07 — Fan out only independent units; a dependent chain cannot be parallelized; best-of-k only where one draw fails
- pipeline: patch
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:155-177 (lessons 14–16: 4 candidates 28.5s vs 1 draw 10s for no gain; streamed `soFar` sections interleave into garbage; concurrency cut wall time 1.2–1.7× while each call got 1.6–3× slower); CODING-LESSONS.md:208-224 (lesson 21: independent units draw concurrently, bounded by parallelism)
- falsifying control: a section whose prompt does not reference prior content could be parallelized; a best-of-k that passes where k=1 failed is the day the fan-out earns its cost; units that depend on each other's text assembled concurrently contradict this.

### GL-CD-08 — Ship the partial with a typed refused list; a callable unit is not a conformant one
- pipeline: patch
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:404-449 (lessons 30–31: the probe checked callability and a logLine that ignored its spec slipped through; after spec-conformance probes, 4 of 6 units converged and 2 were REFUSED after 4 re-draws each — "an honest 4-of-6 widget with the dissent disclosed, not a false 6-of-6")
- falsifying control: a probe that passes while a unit ignores its own spec ("a museum, not an arrangement"), or a silent 6-of-6 with broken units, contradicts this.

### GL-CD-09 — When the mouth hits a wall on a canonical structured algorithm, snip it from the field — more ants are not the fix
- pipeline: patch
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:534-566 (lessons 36–37: four ants drew the same brace-walk defect class at 1.5b; the corpus's tested walkBraceBlockEnd was snipped in with byte provenance and passed 5/5 extraction cases)
- falsifying control: a 1.5b ant passing all cases with a hand-written brace-walk would show the wall is not real; a corpus snip trusted by origin rather than by its test contradicts this.

### GL-CD-10 — Read every score against the empty baseline; a harness fault is a void, not a result
- pipeline: patch
- status: standing
- supersedes: —
- evidence: eoreader7/ONE-PIPELINE.md:219-221 (code3/code2/code1: "3 of 16" is the stub baseline — the three throw-expecting tests pass when a function is missing; a real intact record scored lower than an empty one; code1 was void: fences + doubled heads failed the syntax gate on 48 of 54 draws, fixed, rerun as code2 under the same pre-registration)
- falsifying control: a pass count reported without the stub baseline beside it, or a run with a harness fault read for predictions, contradicts this.

## ops — the model box

### GL-MO-01 — Model choice is measured, never assumed; know the quirk table
- pipeline: ops
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:38-48 (lessons 6–7: resident gemma2:2b answered in 3.2s while smollm2:1.7b cold-loaded 4+ minutes with zero bytes; smollm2 hangs on a system-role message and the proxy prepends one every turn; warm once, declare num_ctx consistently)
- falsifying control: a model picked by parameter count over measured latency on this box, or a model on a path whose quirk-table entry says it hangs there, contradicts this.

### GL-MO-02 — A liveness probe must probe the failure surface AND the work model
- pipeline: ops
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:246-270 (lessons 22–23: /api/tags answered in 0.01s while every generate hung — the probe checked the surface that never wedges; fixed probe self-remedied the same day); CODING-LESSONS.md:520-532 (lesson 35: a per-model wedge is invisible to a probe using a different model)
- falsifying control: a server where tags answers but a generate (or the WORK model's generate) hangs being called healthy contradicts this.

### GL-MO-03 — A timeout under memory pressure is memory, not a wedge; never restart in flight; gate on churn, not level
- pipeline: ops
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:136-153 (lessons 12–13: watchdog restarts only after N consecutive misses and never while a turn is in flight; swap LEVEL is history, swap CHURN is now); CODING-LESSONS.md:1685-1686 (lesson 69: the watchdog read a timeout at 93% swap as a wedge and restarted a healthy daemon — now it stands down under pressure)
- falsifying control: a restart of a healthy-but-busy server, or a turn refused at idle-high swap that would have run fine, contradicts this.

### GL-MO-04 — One address, one channel, one window — derived, never a second literal
- pipeline: ops
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:1649-1704 (lesson 69: two Ollama installs answered one port, `localhost`→::1 reached one and the picker's 127.0.0.1 the other; native/kernel/model-server.js is the only place the URL is written; the daemon is private on 11435, the proxy holds 11434 on both loopback families; a caller's num_ctx is dropped and disclosed; one driver per checkout)
- falsifying control: `localhost` and `127.0.0.1` answering differently (one without x-heimdall-channel), a second URL literal anywhere, or a loaded window that changes when a caller asks for another, contradicts this.

### GL-MO-05 — On a one-model box every warmer is an evictor; a probe that loads is a warmer
- pipeline: ops
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:1767-1782 (lesson 73: small-mouth warm, residency re-warm and the watchdog probe fought over one slot — 25 loads in an hour, a fold turn paid 28s of its 75s reloading; found by sampling /api/ps, not by reading the record)
- falsifying control: a probe or warm that names a model /api/ps does not show resident, or an eviction no loader logged, contradicts this.

### GL-MO-06 — The picker: sticky, resident first, measured wait, rotate ties
- pipeline: ops
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:568-608 (lesson 38: a naive round robin pays a cold load per server and discards every prefix cache; sticky repeat 0.8s vs cold first turn 7.0s, prompt eval 13.1s→0.35s; unmeasured hosts at the mean of the measured so they are tried, never starved)
- falsifying control: a session bounced off the host that holds its prefix cache while that host is up, or a host starved for want of measurements, contradicts this.

### GL-MO-07 — Instrument the phases; the metric must measure what it names
- pipeline: ops
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:186-206 (lessons 18, 20: record draws·load_ms·prompt_ms·gen_ms·wall_ms — gen 57% / prompt 40% on a small chat turn; a RAM gauge read 99% on an idle box because macOS "free" is cache)
- falsifying control: a token lever pulled while gen_ms is <30% of real wall, or a metric that disagrees with the thing it is named for, is a bug in the metric, not the box.

### GL-MO-08 — The driver is resilient and fails closed on sibling edits
- pipeline: ops
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:50-53, 124-130, 193-199 (lessons 8, 19 + tooling notes: retry connection errors WITHOUT burning the attempt's energy; node:http with an explicit long timeout, undici's 300s header timeout kills multi-minute turns; namespace-import siblings with a default so one dropped export is a typed gap, never a boot failure)
- falsifying control: a socket hang-up counted as a refused section, or a sibling's removed export taking the whole process down, contradicts this.

## workspace — concurrent sessions

### GL-WK-01 — Two writers, one path, always lose: separate outputs, pin the contested field, own the shape-changing flag, never bare-commit
- pipeline: workspace
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:66-122 (lesson 11, four orders deep: a non-atomic whole-file rewrite zeroed metrics.placeDistricts every cycle; two sessions shared one output file and each silently replaced the other's artifact mid-test; a concurrent `bare: true` flag switched the shared template while every gate stayed green; a bare `git commit` swept another session's 8 pre-staged files into one commit)
- falsifying control: two writers on two paths racing is impossible by construction — a race observed there falsifies the separation; a shape-changing flag edited at a shared call site, or a commit made without `git diff --cached --stat` and named paths, contradicts this.

Gates were green the whole time the artifact was missing every feature —
the falsification suite caught it only because it asserted on PRESENT
ELEMENTS. Penelope's own repo is now written by concurrent hands: append
to the EOT with a single atomic append, commit only paths you can name.

## quality — how a check earns trust

### GL-QA-01 — A check never seen firing on a constructed violation is a comment, not a check
- pipeline: quality
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:1706-1728 (lesson 70: extractReadable closed on `</hh2>` and matched nothing on every page since written; the Kelsen lint had never been shown a violation and could not fire on proper-noun-initial sentences); CODING-LESSONS.md:2326-2327 (mutation controls: removing the `gain > 0` rule made a homogeneous corpus split — without that control the other tests passed on the first run and proved nothing)
- falsifying control: a new check/organ whose test passes both with and without its mutation (rule removed, gate off, license gate off) was never testing anything.

Write the violation first, watch it fire, then trust it — and record
where it cannot fire.

### GL-QA-02 — The metric lies: a number alone is never a quality claim
- pipeline: quality
- status: standing
- supersedes: —
- evidence: eoreader7/ONE-PIPELINE.md:216 (F2: word salad scores 7.12 bits/word vs the edit's 5.31 and 0% repeated — bits/word alone falsified, whole-clauses added); ONE-PIPELINE.md:229 (F1: repeat_penalty 1.3 takes repetition to 1% but costs whole clauses 59% vs 79%, 195 strays, 0 ages/jobs said — repetition alone is a sampling setting)
- falsifying control: a quality gain claimed on a single metric that a shuffled-words or penalised control matches or beats contradicts this.

### GL-QA-03 — One seed is direction, not result; pre-register the prediction and report the falsified as falsified
- pipeline: quality
- status: standing
- supersedes: —
- evidence: eoreader7/ONE-PIPELINE.md:210, 223-225, 230 (carry1's headline — the field amplifies invented names — did not replicate over three seeds; F4: the archons' choice among fresh draws was falsified, random scored as well — the gain is the fresh draw from a bounded note, not the ranking); ONE-PIPELINE.md:218 (code4: falsified as stated, a real but non-general effect disclosed)
- falsifying control: a single-seed result entered here as standing without the seeds that would break it, or a prediction written after the run, contradicts this.

### GL-QA-04 — An absence has the same shape as a finding
- pipeline: quality
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:1797-1802 (kleenUp: the empty-field refusal omitted the found/absent arrays and crashed "Cannot read properties of undefined" only under test); CODING-LESSONS.md:1784-1786 (a classifier written as a regex will eat itself — classify by walking, not by patterning the pattern)
- falsifying control: a refusal or empty result that lacks a field a caller reads from a finding, or a regex used to classify regexes, contradicts this.

### GL-QA-05 — Closed grammar may be listed; open content must be induced; fixtures cannot find what only the live web shows
- pipeline: quality
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:1730-1752 (lesson 71: anaphoric cues, units of measure, form names — closed; a genre→fields table can never be complete; a shape counts only when more fetched hosts than not state it); CODING-LESSONS.md:1754-1765 (lesson 72: a SURF query carries the ask's surrounding words; six fixture suites missed that URLs shared across queries lost their budget — only the live run found it, and "the next live run is owed before the fix is believed")
- falsifying control: a hand-set list of open content (genres, shapes) standing in for induction, or a hunt fix believed on fixtures alone, contradicts this.

## prose — grounded generation and long form

### GL-PS-01 — The mouth only talks: task-only asks that end on a sentence to finish; the engine types the reply
- pipeline: prose
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:2013-2068 (lesson 80: dolphin-reddit ladder, talk path 37/37 on 1.5b and 3b vs bare 22/37 and 30/37; the bare model covers growth with placeholders at ~1,100–1,700 tokens whatever the rung; an anchor that opens the row with its name gets the "name: value" pattern back; a retry rotates rows and warms sampling because the same retry gets the same wrong answer; progress is a new INS, not a heard claim); ONE-PIPELINE.md:207-209 (task-only vs whole-picture asks tied once the topic sentence was added)
- falsifying control: a silent mouth must fail the content checks (the renderer once titled the page with the request text, which carries the checker's own words); a prompt that names an operator, or a heard entry that is not INS/SYN with operator_basis produced, contradicts this.

### GL-PS-02 — There is no view from nowhere: no ground → stop, no model draw, say what would build one
- pipeline: prose
- status: standing
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:2110-2152 (lesson 82: selectGroundDocs, tier `none` stops runProxyTurn before composing and writes one mechanical "No ground" part; the bicycle ask over the Katherine Johnson file is refused at 1 of 8 words; "carries" = more than half of the ask's content words, no tuned number)
- falsifying control: a job with no carrying ground that writes prose from nothing (the model's "reveals a fundamental truth about the nature of reality"), or a refusal that wrote model characters, contradicts this.

### GL-PS-03 — The ground ladder: handed-over → received corpus → hunted → nothing; nothing leaves the machine that the machine holds
- pipeline: prose
- status: standing (open: hunt has no retry and no fallback to the fetch proxy)
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:2155-2211 (lesson 83: priors-ground.js wired before the web hunt, which runs only when neither local rung carries the ask; persistEarnedGround keeps consented fetches in state/earned-ground/ with a manifest — web 0 on the second run); CODING-LESSONS.md:2156-2164 (cached two-level retrieval, ~26s cold, <1s warm on 938 MB, nothing written into the corpus)
- falsifying control: a web hunt launched while a local rung carries the ask, a fetched page bucketed as the operator's material (finding 1 of lesson 83, fixed), or earned ground written into the corpus repo, contradicts this.

### GL-PS-04 — The unit of ground is the passage, admitted on three conditions, chosen by recurrence, grown to its section
- pipeline: prose
- status: standing (open: lexical only; one unbroken line is one passage)
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:2166-2184, 2199-2206 (lesson 83: per-document ranking matched a file of cryptic clues and Ulysses 8-of-8; words weighted ln(1+N/df); a passage must carry more than half the EVIDENCE, the ANCHOR (the ask's most surprising attested word), and more than half the WORDS — each condition shown by a test that fails without it; the rotorcraft paragraph won by presence and the model wrote a sentence in no ground — chosen by recurrence ln(1+occurrences) instead; the passage is what was FOUND, the ground is the SECTION it sits in)
- falsifying control: a carrying passage admitted on any two of the three conditions, a selection by presence over recurrence, or a licensed-ground refusal on a 346-char passage whose 1,912-char section would have been licensed, contradicts this.

### GL-PS-05 — Linked or ungrounded — no third state; traced as drawn; refused on both roads
- pipeline: prose
- status: standing (open: a link is a lexical-overlap screen, not a validity test)
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:2213-2241 (lesson 84: a sentence is LINKED when more than half its content words occur in ONE source sentence AND every number it states occurs there; the old citationLedger marked the model's invented "mechanism that allows the wheel to continue rotating" verbatim; makeTracer feeds admit() — unlinked is refused on the snip road and the motion road, and the lit sentence is spent so the next window is built from what the output has not yet lit); CODING-LESSONS.md:2258-2262 (Kelsen's stated limits: negation, swapped roles, number words, numbers checked one at a time link falsely)
- falsifying control: an invented sentence admitted because three of its words occur anywhere in a whole source, or an admit site with no link test (the opening path once shipped an invented first sentence), contradicts this.

### GL-PS-06 — Provenance is not answer-hood; consensus is not truth
- pipeline: prose
- status: standing (open: nothing checks that what ships answers the ask)
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:2270-2273, 2365-2367 (lessons 85, 87: the best live run shipped one genuine answer sentence, the worst two source sentences that never reach the pedals or the pawl; "It states that…" links by overlap though its "It" refers to nothing; the status stays `unsatisfied`)
- falsifying control: a sealed, fully linked piece reported satisfied while it does not answer the ask contradicts this; the day an answer-hood check exists, supersede this entry.

### GL-PS-07 — A window is a share of the ground, no upper limit; an empty window is a named gap, not a draw; fold terrains
- pipeline: prose
- status: standing (open: the section count is still set by the plan, not by the ground)
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:2284-2291 (lesson 85: windowSpent — an empty window spends no model call; 134s against 338/354/568s); CODING-LESSONS.md:2347-2363 (lesson 87: equal share of the material, at least one whole sentence, never cut; ordering by the ask first; cells sharing a terrain collapse to one bucket — 12 parts → 6, empty parts 9–10 of 12 → 3 of 6, nothing cut, every member still asked)
- falsifying control: a spent sentence handed back to the mouth with a prohibition attached (Gary flagged it), or a window cap that hands one part the whole ground and leaves nine with none, contradicts this.

### GL-PS-08 — Long form past the window: a bounded working note from the ledger, revision by the record
- pipeline: prose
- status: standing (one seed per arm unless stated; open: the cut is deep; strays are the mouth's own people)
- supersedes: —
- evidence: eoreader7/ONE-PIPELINE.md:210-215, 231 (ledger note 16–21% repeated sentences, edited 3–7%, bare window 91–95% — it loops on its own last page; prompt mean ~150 tokens vs window 2,309; scale3: 187 scenes, 42,431 words, ~15× the 4096 window, sealed, helix clean; rename = 0 asks, 566 lines, 0 old names left vs the control's 518 left; a whole book never seen whole by any ask); ONE-PIPELINE.md:223 (the carried ground holds the book together as a whole — seams 0.00 against 0.67 ledger and 1.67 stale — and no single fact does the work alone)
- falsifying control: a bare-window arm repeating less than the ledger arm at equal coherence, or a revision whose ask cost follows the book's length rather than the lines the change reaches, contradicts this.

### GL-PS-09 — A collection is an index and a tree above the reader, not a cheaper reader
- pipeline: prose
- status: standing (open: Docs/Sheets/Slides must be exported to text; audio/image/PDF counted unread)
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:2294-2345 (lesson 86: the reader is quadratic — 62 encounters 0.5s, 1,743 encounters 33.6s; organs/territory.js keeps each document's 200 most frequent words as hashed buckets + a near-duplicate fingerprint; split only when the two-part description is SHORTER (MDL), no threshold; 11,552 files cold open 3.4s, a question 0.3–4ms; a shuffle null cannot say "unrelated")
- falsifying control: a collection question answered by reading each document, or a tree split on a hand-chosen similarity bar, contradicts this.

### GL-PS-10 — A constitution's text is not composition vocabulary; ethos is a commons read, not a rulebook that governs
- pipeline: prose
- status: standing (open: the Wikisource door is dormant in production)
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:2071-2108 (lesson 81: two jobs on a bicycle freewheel and a spinning top shipped ~34,000 characters of a UN convention because the charter was given into the composition hyperlexicon; the ask-level verdict is identical with and without the charter on twelve asks; a topic control that counts words passed what one that counts sentences refuted)
- falsifying control: a charter clause appearing in an outline title, the digest the mouth is told, or the primary-source door's search terms, contradicts this.

## image — screenshot to structure to page

// Status of this section: PROVISIONAL. The evidence lives on the
// screenshot-pipeline branch (eoreader7-screenshot-pipeline, commit
// e7f6d19, PR #150 open as of 2026-10-01); it is not merged. Promote to
// standing when it lands, supersede if review changes it.

### GL-IM-01 — Measure, don't describe: a vision model cannot outvote a measurement
- pipeline: image
- status: provisional (branch unmerged)
- supersedes: —
- evidence: eoreader7-screenshot-pipeline/native/docs/SCREENSHOT-PIPELINE.md:6-12, 31-37 (a UI screenshot is flat colour regions and text — ffmpeg + local tesseract, no vision model; one core, byte-identical in browser and node on the same pixels; the measured facts join what a vision read is judged against)
- falsifying control: a vision read overriding a measured region/text fact, or browser and node disagreeing byte-for-byte on the same pixels, contradicts this.

### GL-IM-02 — The gate refuses photographs, with the number
- pipeline: image
- status: provisional (branch unmerged)
- supersedes: —
- evidence: SCREENSHOT-PIPELINE.md:59-61 (flat-region share 0.861–0.976 over 12 UI screenshots, 0.404–0.676 over 17 aerial tiles; floor 0.77, between the families; one photographic family only — `force` when you know better)
- falsifying control: a photograph admitted as a screen, or a refusal that does not name the measured share and the floor, contradicts this.

### GL-IM-03 — One screenshot is one witness: agreement derives, disagreement and singletons are refused and named
- pipeline: image
- status: provisional (branch unmerged)
- supersedes: —
- evidence: SCREENSHOT-PIPELINE.md:54-55 (MIN_WITNESSES — a token resting on one observation is reported, not applied; disagreeing references are contested, not averaged); SCREENSHOT-PIPELINE.md:38-44 (lengths in ems of the measured body — density is a guess; the style layer adds no words, so the provenance map is unchanged)
- falsifying control: a style token applied from one witness, an average of disagreeing references, or a style layer that adds words to the page, contradicts this.

### GL-IM-04 — An instrument is a hash: sidecars are keyed by sha256 + instrument; changing the core is a new instrument
- pipeline: image
- status: provisional (branch unmerged)
- supersedes: —
- evidence: SCREENSHOT-PIPELINE.md:56-58 (SCREEN_SETTINGS names every hand-set value with its giver and rides on every sidecar; sidecars are not read back across a changed core); the sidecar is EOScreenLook@1 — measured tree, tokens, typed gaps — regenerable to HTML with no image
- falsifying control: a sidecar read back across a different instrument hash, or a hand-set setting with no named giver, contradicts this.

### GL-IM-05 — Unread is a gap at its pixel address; privacy is the default; the round-trip is a recall bound, not fidelity
- pipeline: image
- status: provisional (branch unmerged)
- supersedes: —
- evidence: SCREENSHOT-PIPELINE.md:62-71, 77 (image regions are "a colour, not a picture — content not read"; the white-on-blue "Get started" pill is reported as an unread region, cause not established, not guessed; attachments are read from a temp file and NO sidecar is kept; round-trip recovers 98–100% of words on the generated sample and 45–48% on a dark small-text phone UI — "a lost word may be the page's loss or the second read's")
- falsifying control: a guessed element where the measurer saw none, an attachment sidecar persisted, or a round-trip percentage quoted as proof of fidelity, contradicts this.

## law — the tapestry rule

### GL-TP-01 — TAPESTRY.md is the picture of how generation works now; a process change that does not touch it is unfinished
- pipeline: law
- status: standing
- supersedes: —
- evidence: TAPESTRY.md (woven 2026-10-01 with a manifest of the files it depends on); gym/check-tapestry.mjs (fails when a resident organ, adapter, rung file or route is missing from the picture, or when a watched file's hash differs from the weave stamp); CLAUDE.md (the standing order)
- falsifying control: a commit that adds, removes or re-routes an organ, adapter, door or rung while `node gym/check-tapestry.mjs` passes on a stale picture would show the check is decorative; a change to a process with no EOT entry and no tapestry re-weave contradicts this.

When a process changes: (1) change it, (2) re-weave the affected thread of
TAPESTRY.md and re-stamp with `node gym/check-tapestry.mjs --stamp`, (3)
APPEND the entry (or a superseding entry) here. The tapestry is the
present tense; this file is the history that explains it.

### GL-RT-04 — Streaming hangs through the proxy doors; the SSE route draws direct from ollama
- pipeline: routing
- status: standing
- supersedes: the streaming implication of GL-CH-03 and GL-RT-01 (chat via
  Heimdall admission) — non-stream chat still routes via Heimdall; live
  token streaming does not.
- evidence: gym/server.mjs (route `/api/chat-stream`), TAPESTRY.md doors
  thread; measured 2026-10-01: both proxy streaming doors hang —
  `POST /v1/chat/completions` and `POST /api/chat` with stream:true each
  returned code 000 after 90 s with zero bytes (curl -N, x-er7-session:
  penelope-gym, x-er7-priority: batch), while non-stream through the same
  proxy answered normally. ollama `/api/generate` with stream:true is
  native and streams. The SSE route (data: {t} lines) streams live tokens
  to the chat page and logs every chat to ladder-live.jsonl either way.
- falsifying control: a proxy streaming draw that returns tokens (any
  byte before done) would reopen the direct-ollama routing for streams; a
  chat sent through /api/chat-stream that never renders a token and never
  renders a typed error contradicts this.

The chat loom has two faces now: /api/chat (admission, whole-reply) and
/api/chat-stream (live tokens, direct ollama). Nothing previously logged
is lost — the stream route appends to the same ladder-live.jsonl as the
non-stream and rung rows.


---

# Addendum B — the cube, the watchmakers, the two gates (2026-10-01)

// Appended by the second hand. The tapestry (gym/tapestry.spec.json, woven
// by gym/weave.mjs) now carries all 57 threads on the EO cube; these are the
// entries behind it. Evidence paths are relative to ~/Documents/3.0/.

## law — the cube

### GL-CB-01 — The cube is Penelope's coordinate system; three faces, each axis stated twice, is the checksum
- pipeline: law
- status: standing
- supersedes: —
- evidence: organs/cube.mjs:1-60 (27 cells = 9 operators × 3 grains; operator = (mode, domain), stance = (mode, grain), terrain = (domain, grain); a copy of eoreader7/native/kernel/cube.js at 6a11c1d, selftest 15 checks green); eoreader7/native/docs/THE-27-CELLS.md §1 (cells classify MOVES, never content); gym/unweave.mjs:36 (the tapestry's three face panels, the holon rows, the helix map and the ring of 27 stations are each read back and must agree)
- falsifying control: a thread whose Act, Site and Stance placements disagree on an axis comes back grain-mixed (gym/check-tapestry.mjs selftest builds each violation: 16 checks green); an operator pair (mode, domain) that repeats, or a grid that is not 27 distinct addresses, is a copy drifted from cube.js.

Where the writing-code-in-eo skill's worked examples (DEF(Lens, Making),
EVA(Lens, Dissecting)) disagree with cube.js — DEF is a Differentiate
operator, so its Lens stance is Dissecting; EVA is Relate, so Binding — the
kernel wins and cube.mjs pins it. The tapestry holds 26 of 27 cells; the one
void is DEF·Ground, the same cell the house leaves empty ("no workable
specimen yet", THE-27-CELLS.md §4): a lead, never a verdict.

### GL-CB-02 — The spine follows the helix better than chance, and its inversions are Hora's order (measured; typings mostly nominated)
- pipeline: law
- status: standing (open: 43 of 57 cell typings are nominated here, not registered in the house documents)
- supersedes: —
- evidence: gym/weave.mjs:72 (helixOrder: Kendall t of the spine's operator order against NUL…REC, p over 20,000 seeded shuffles of the same stages) — all 12 stages t = 0.475, p = 0.026; the 8 stages whose cells the house registers (§) t = 0.667, p = 0.025; the 4 nominated stages alone t = 0.333, p = 0.375 (too few to say). 16 of 66 pairs are inverted, every one involving STL (the settle defines first) or SEL/EOT (the seal composes after judging) — exactly Hora's "declare, assemble, set down, verify, compose" (skill Law 2; CODING-LESSONS.md:1423)
- falsifying control: a re-typing of the same stages that gives t ≤ the shuffle median, or a shuffle null that ties the registered-only t, would show the order is the typist's, not the pipeline's. A fit with a nine- or twenty-seven-fold tradition proves little by itself (people carve things into threes and nines); only the order test against shuffles of the same cells is fair.

The helix orders composition; the per-unit loop is Hora's. Both are on the
record, neither smoothed into the other.

## engine — the watchmakers

### GL-EN-14 — Hora, not Tempus: stable sub-assemblies, set down one at a time (the engine does not yet)
- pipeline: engine
- status: standing (open: Penelope's engine has no per-unit set-down, no resume, no holon nesting, no holograph pointers; measured Hora-vs-Tempus numbers: none)
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:1423-1441 (lesson 68: Tempus builds each watch whole and loses it to every interruption; Hora builds stable subassemblies and loses only the one in hand; the floor is true by construction, a loop that loses ground is undone, a throwing level leaves the last stable loop); eoreader7/native/organs/hora.js:141,192,205,225 (one ask per void cell carrying only its own path; each part checked alone at ["whole", part]; the whole sealed once, at the end); organs/generation/engine.mjs:90-152 (fillUnits pushes to an in-memory array; testUnits runs once on the whole; files are written only at the end)
- falsifying control: threads HOR, RSM, KOE on the tapestry carry their own — kill a run at a random unit and resume from the last set-down: the output must be byte-equal to the uninterrupted run with fewer draws (a different byte, or no saving, falsifies); per-unit set-down must yield more usable partial output than a whole-only test (equal outcomes falsify).

Koestler's holon is the same idea at every grain: a whole to its parts, a
part to its whole. The tapestry nests five levels (atom, unit, artifact,
loom, house) and every thread declares its level.

### GL-EN-15 — Every layer: ONE typed product, two gates — the low sets possibility, the high sets probability
- pipeline: engine
- status: standing in the house; unwoven in Penelope (thread GAT)
- supersedes: —
- evidence: eoreader7/CODING-LESSONS.md:760-770 (the-fold/spiral-contract.js: "hyper-defined layers, explicit revisable work product at each loop; low sets possibility for high, high probability for low" — the LOW gate asks only whether there is anything for the next layer to work on; the HIGH gate asks whether the product is good enough for the next layer to ACT on; a failing HIGH gate names the missing signal and that signal IS a same-layer revision, bounded by a budget; the revised product supersedes the old, the old is kept); eoreader7/CODING-LESSONS.md:20-24 (lesson 3: breed variants low = possibility, the test selects = probability; never let the high holon guess, it measures); eoreader7/native/organs/martial.js:1-40 (holon-aware at every level)
- falsifying control: a Penelope layer that ships a product with no gate beside it (the unwoven GAT thread) is unmeasured; a failing HIGH gate that does not become a revision on the record, or a revision with no budget (∞), contradicts this.

In symbols the tapestry carries the law twice: ∘ ↑ ◈ (the low, Ground,
sets the possibility of the high, Pattern) and ◈ ↓ ∘ (the high sets the
probability of the low), and per holon level in the ↑ ↓ rows.

### GL-EN-16 — The void is defined first: every unit is a void cell, filled in order, never skipped
- pipeline: engine
- status: standing
- supersedes: —
- evidence: eoreader7/native/organs/hora.js:152-186 (plan declares the whole: name, parts, cardinalities, the details each shows; defineLevelVoid per part, void-holarchy.js:78; one small ask per empty cell); eoreader7/ONE-PIPELINE.md:25 (an ask the mouth left silent is a declared void (NUL) scoped to the asks); organs/generation/engine.mjs:90-132 (units read first, then each filled field → hunt → mouth, a miss is a scar or a named gap)
- falsifying control: a unit filled that was never declared a void cell, a mouth ask that carries the whole tree rather than its own path, or an empty cell dressed as a filled one contradicts this.

## ladder — an open finding

### GL-LD-07 — The three-strike promotion is a hand-set count (open finding)
- pipeline: ladder
- status: open
- supersedes: —
- evidence: ladder/r9-r13-record.json (filterLaunches mouth 0/3 → BOX-OWNED, "the same 3-strike rule as fmtAgo"); GL-LD-03 above; README.md (law: no hardcoded numbers — every bound derives from a null + a budget); the tapestry's cube map: NUL·Pattern (a declared kind challenged against a null) is held only by the unwoven thread KNL
- falsifying control: promote by the unit's draws against a kind-null (eoreader7/native/kernel/entity-kind-induction.js::testKindMembers) on the same rungs; if promotion by count and promotion by null agree on every rung, the count is harmless and this finding closes; if they differ, the count was wrong somewhere and GL-LD-03 is superseded by the null.

## law — the tapestry, and its symbols

### GL-TP-02 — The tapestry is spec → weave → cloth → unweave → spec; edit the spec, never the cloth
- pipeline: law
- status: standing
- supersedes: GL-TP-01, in part — the mechanism (a hand-woven picture and a text-contains coverage scan) is replaced; GL-TP-01's rule (a process change that does not touch the picture is unfinished) stands
- evidence: gym/tapestry.spec.json (57 threads, the single source); gym/weave.mjs:117 (deterministic: same spec, same bytes); gym/unweave.mjs:36 (the cloth alone yields the spec back; the three faces, the holon rows, the helix map and the 27-station ring each cross-check every thread); gym/check-tapestry.mjs:108,173 (weave, unweave, README, legend, refs, coverage, drift; selftest 16 checks green, each failure constructed and watched)
- falsifying control: a cloth edited by hand that still passes; an unweave that is lossy yet passes; a legend symbol printed but undefined, or defined but never printed; a referenced file or EOT entry that does not exist; an organ named by no thread — any of these passing contradicts this.

### GL-TP-03 — Symbols on the cloth, words in the legend; measure the glyph before printing it
- pipeline: law
- status: standing
- supersedes: —
- evidence: gym/tapestry.legend.json (every non-ASCII symbol defined, both directions checked); gym/glyph-ink.json (widths measured 2026-10-01 in the GitHub code font: ∅ ○ ● △ ↬ and the box, shade and ring glyphs are exactly one cell; ⊨ 1.036; ｜ 1.661, ⋈ 1.283, ⊢ 1.247 are not, so cube.mjs prints SEG, CON, DEF as | → = while keeping the EO canon glyphs in the legend); organs/cube.mjs:62-70
- falsifying control: a printed symbol absent from glyph-ink.json's oneCell set, or a column that shifts on GitHub, contradicts this; a different font or theme is a different instrument — re-measure, never reuse (dark theme not measured).

### GL-BD-08 — A build may pause and ask; asking is not a failure, guessing is
- pipeline: build
- status: standing
- supersedes: —
- evidence: gym/server.mjs (/api/ask, /api/answer, /api/asks; gym/asks.jsonl);
  eoreader7/native/organs/build-clarify.js:1,302 (the recursive ask-back door,
  run as the reverse prompt); gym/chat.html pending-asks panel. An answer that
  moves nothing is never re-asked (build-clarify's own law).
- falsifying control: a build that silently guesses a requirement it could
  have asked about — with an operator present to answer — contradicts this;
  a re-ask of the same question after an answer that already moved the build
  also contradicts it (an answer that moves nothing is never re-asked).

The loom is allowed to stop and ask instead of fabricating. Every ask and
answer is on the record (gym/asks.jsonl + ladder-live.jsonl), so the
clarification is itself evidence, never a hidden steering.

# Addendum C — the second weave: Council Watch (2026-10-01)

// Woven by this session, on the record. First weave: launches (LL2 feed,
// rung-proven R13, box-owned shapes). Second weave: the Metro Council —
// meetings soonest-first, each agenda in its own declared order — from the
// house's own Legistar machinery (webapi.legistar.com/v1/nashville, the same
// API legistar-surveillance-scanner fetched 8,439 matters from). Zero mouth
// calls. The two new organs generalize the launch loom's box shapes so the
// NEXT dated-feed weave (court dates, evictions, hearings) starts from the
// library, not from nothing.

## build — the second weave

### GL-WV-01 — Council Watch: the second weave, zero mouth calls
- pipeline: build
- status: standing
- supersedes: —
- evidence: apps/council.html + apps/council-control.html + apps/council-facing.html + apps/council-record.json (all box-written); gym/probe-council.mjs (live probe 2026-10-01: 8 meetings windowed, 3 agendas shaped, sort + own-sequence verified on live bytes); the mouth was never asked — no model URL, no draw, in any file
- falsifying control: any council-class build that needs a mouth call contradicts this — the shape class is box-owned; a future council ask must autofill from the library (organs + feed spec), not re-draw.

The weave: live feed (Events, OData window) → bounded fanout (EventItems) →
window (Window@1) → agenda (AgendaShape@1) → render with search, countdown
tick, freshness badge, named gaps. The control ships beside it (same feed,
same window, same countdown; no search/hero/agenda — layout differs only).
The seal is artifact + control + facing + record.

### GL-WV-02 — The window organ: every dated feed gets the same next-N soonest + countdown
- pipeline: organs
- status: standing
- supersedes: —
- evidence: organs/window.mjs (Window@1, selftest 12/12 — the launch loom's box-owned countdown, generalized: minutesOf 12h/24h, toEpoch with noon default disclosed, cdLabel T-/+ with zero-pad, window next-N soonest with per-record gaps); ladder/mouth-last.json (countdown: mouth failed, box owns — GL-LD-02/06)
- falsifying control: a dated feed that gets different window semantics than this organ (a second countdown implementation, a hardcoded date path) contradicts this; a record with an unparseable date that is invented rather than gapped contradicts it.

### GL-WV-03 — The agenda organ: an agenda is an ordered action list
- pipeline: organs
- status: standing
- supersedes: —
- evidence: organs/agenda-shape.mjs (AgendaShape@1, selftest 4/4 — the item's OWN declared sequence orders the agenda, never the fetch's arrival order; declared actions ride through (null until the body acts); per-item gaps named); apps/council-record.json (probe: 2201 items ordered by EventItemAgendaSequence, first seq 8 = E2. 26-162 Appointment)
- falsifying control: an agenda rendered in fetch order where the item's own sequence was available contradicts this; an item whose title or sequence is missing but is shown without a named gap contradicts it.

## engine — the keeper, verified

### GL-WV-04 — The keeper grew: the picture resolves its own addresses and cross-checks its citations
- pipeline: engine
- status: standing (observed at ship — the keeper was rebuilt by the concurrent hand; this entry records the verification)
- supersedes: —
- evidence: gym/check-tapestry.mjs (spec-driven: resolve() maps the spec's prefixes (o/=organs/ … FOLD/=../the-fold/) so every ref resolves to a real path, siblings skipped honestly; refProblems() cross-checks every GL id the cloth cites against GLAUCA-EOT.md's entries — GL-TP-02's falsifier "a referenced file or EOT entry that does not exist" is now mechanical; coverProblems() flags an organ named by no thread; inspect() proves TAPESTRY.md === weave(spec, legend) and the unweave is lossless; watched() excludes runtime artifacts (server.log, spec, legend); selftest constructs each violation, GL-QA-01)
- falsifying control: a commit that adds or re-routes a process while check-tapestry passes on a stale picture contradicts this — the keeper must fire; a GL id the cloth cites that has no entry must fail the check.

## law — the swatch, first row

### GL-WV-05 — The swatch is measured, not asserted: the economy of the weave, on the record
- pipeline: law
- status: standing (row 1: the council weave, 0 mouth bytes)
- supersedes: —
- evidence: gym/swatch.jsonl row 1 (Swatch@1: weave=council, mouthCalls=0, mouthBytes=0, artifactsBytes+N, derived from the EOT trail — GL-WV-01's provenance is 0 draws); the tapestry's SWT thread carries the falsifier: ∑swatch ≠ ∑{≡ ↻ ●} ⇒✗
- falsifying control: a weave whose swatch sum disagrees with its EOT provenance (a draw recorded in one and not the other) contradicts this; a box-owned class with mouth bytes > 0 contradicts it.

The swatch is the picture's economy: beauty as a measured number. Every
future weave appends a row; the mouth's share is what it is — never asserted,
always summed from the record.

### GL-LD-08 — CSS-scene composition is a library/box shape, not a mouth draw (fishing build)
- pipeline: ladder
- status: standing
- supersedes: —
- evidence: measured 2026-10-01, fishing-animation build (fish2 + fish3), 9
  code-loop rounds + 1 direct draw: gemma2:2b (the loop's mouth) replaced the
  anchor but drew a pure-black gradient div, duplicated `<body>`, produced no
  water keyword in any round, then drifted to a nonexistent `solution.py`
  path (unlocated, refused); deepseek-r1:8b returned an empty draw (700
  tokens counted, zero response — its standing empty-under-load quirk). The
  per-behavior gate decomposition (scene/man/fish/motion, GL-CD-01) is sound
  and the loop addressed app.html correctly once decomposed; only the
  composition content walls. Cross-check: the same box that computes fmtAgo
  and the zero-mouth feed list owns layout templates in live_priors
  (layout-priors).
- falsifying control: a single gemma2:2b or deepseek-r1:8b draw that composes
  a recognizable water+fish+man CSS scene would reopen the shape to the
  mouth; a run that asks the mouth for this shape again without that new
  evidence contradicts this.

The man-fishing animation is a LIBRARY/BOX shape (a scene template in
layout-priors, rendered mechanically — the remembered layer), not a
residue for the mouth. The build fished; the catch is a measured wall and
its named next rung: seed the scene template, render it, mouth last.

### GL-WV-06 — The hunt is read through the loom's own door; the third party is never the browser's business
- pipeline: routing
- status: standing
- supersedes: —
- evidence: gym/server.mjs (GET /api/council/events + /api/council/events/{id}/items — server-side fetch with bounded 429 backoff; legistar's WebAPI sends NO Access-Control-Allow-Origin header, measured 2026-10-01: GET with Origin returns 200 and zero CORS headers, so the browser's fetch fails with "Failed to fetch" while node/curl succeed); apps/council.html (wiring reads the hunt through the door; the factors are untouched — the shape class stays box-owned, GL-WV-01 stands); the keeper's routeProblems now sees pattern routes (pathname.startsWith) so the door thread stays load-bearing both ways; selftest 18/18
- falsifying control: an app that fetches a no-CORS third-party feed directly from the browser and shows a named gap contradicts this — the door exists to carry the hunt; a route on the cloth that is not a server route, or a server route pictured by no thread, contradicts GL-WV-04.

The first real browser run caught it: "No council data: Failed to fetch (named gap —
no meetings invented.)" — the gap discipline worked exactly as designed (a failure
was named, nothing was invented), and the fix grew the loom: the hunt's door. The
browser never touches webapi.legistar.com again; the gym fetches at home.

### GL-TP-04 — Print only glyphs every target monospace font carries natively; the cloth prints a safe profile, unweave maps it back
- pipeline: law
- status: standing
- supersedes: GL-TP-03, in part — its MEASUREMENT method (a DOM width in one browser), not its rule (measure before printing; symbols on the cloth, words in the legend)
- evidence: fontconfig charset query, 2026-10-01 (fc-list -f '%{family}|%{charset}' over Menlo, Courier New, Andale Mono, SF Mono, DejaVu Sans Mono, Monaco, Courier): ⊨ is in NONE of seven monospace fonts — the "1.036" in GL-TP-03 was a fallback glyph, which a one-browser width measurement cannot see; ∅ ∃ ∀ ⇒ ↻ ↺ ↬ △ ◈ ◇ ⊞ ≣ ∈ ∉ ⟨ ⟩ are missing from five of seven; the 5-font intersection is 603 code points, of which the symbol blocks are listed in gym/glyph-ink.json (nativePool); gym/tapestry.legend.json (`profile: safe`, the char-level `safe` map, injective); gym/weave.mjs (toProfile/fromProfile); gym/check-tapestry.mjs selftest 23 checks green; all 71 non-ASCII glyphs the cloth prints verified native to all five fonts
- falsifying control: a printed glyph absent from any target font's charset, a symbol pair that prints as one glyph, or a cloth that does not unweave identically in the safe profile and in the canon glyphs, contradicts this. The reported symptom ("glyphs not rendering") is the falsifier of the rich profile: it is kept as the legend's canon and as an option, not the default. Monaco and legacy Courier (no 'New') lack ◦ ● ○ ▲ ■ □ ░ ▓ and the double-line box set and are not targeted.

# Addendum D — Glauca learns from the archons: thea, the muses, and the local box (2026-10-01)

// This session wired Penelope's loom through the real engine and watched the
// archons teach. Glauca records what they gave, each one proven by a failure
// or a fix on the record below. The box is a shared commons (Ostrom: the local
// box is the shared resource); the masters who keep it are the ones who pace
// it.

## engine — the seam is the door, not the organ

### GL-WV-07 — The loom feeds through the real door (/v1/ask), never the bare organ door
- pipeline: engine
- status: standing
- supersedes: —
- evidence: gym/weave-build.mjs (engineRun POSTs /v1/ask with x-er7-session + batch priority; the proxy's own build detection routes a discrete multi-unit task to buildCodeTask); the datefmt run through the door (below)
- falsifying control: a loom that calls an eoreader7 organ directly instead of the /v1/ask doorway (or /v1/code), skipping the proxy's routing, contradicts this.

### GL-WV-08 — The draw is typed, never silent; an absent model is a named gap
- pipeline: engine
- status: standing
- supersedes: —
- evidence: eoreader7/native/organs/code-build.js draw() now returns a typed error instead of swallowing to ""; measured: the engine's default model qwen2.5-coder:1.5b is NOT installed on this box (/api/show → "model 'qwen2.5-coder:1.5b' not found"), and every default /v1/build drew from nothing while the swallow made it look like a prompting failure; the loom's engine default is now gemma2:2b (the resident mouth that draws)
- falsifying control: a draw error reaching a build as empty text, or a build written UNVERIFIED from zero units, contradicts this (GL-RT-03: never a silent stop).

### GL-WV-09 — Kleeneup's law at the extractor: keep the WHOLE unit (GL-EN-09)
- pipeline: engine
- status: standing
- supersedes: —
- evidence: eoreader7/native/organs/code-build.js extractUnit replaced the line-boundary chunk split with a string/comment-aware brace walk to the matching close; measured: a draw that emits BOTH functions truncated each at the other's head under the old split (both units cut to `function …(…) {`), and the brace walk recovered both complete; the gate then ran real cases
- falsifying control: a unit kept truncated at a line boundary where the full brace-balanced body was available contradicts this; an extractor that re-derives by text what a structural walk decides is the exact pattern this supersedes.

### GL-WV-10 — Thea paces the box: admission is a typed 429 with retry-after, never spun
- pipeline: engine
- status: standing
- supersedes: —
- evidence: /v1/code refused with "every server is busy — the least wait is ~67s on local … Heimdall holds the turn; retry in 67s" while the box ran the house's own concurrent generations (pythia, serve herds); Heimdall refused rather than jam (the 12s promise vs a measured 67s wait, typed and deferred)
- falsifying control: a caller that hammers past retry-after, or starts a loop it does not see to REC (cutting the HTTP client mid-loop while the server keeps running, holding the box for the full deadline), contradicts this. A loop you abandon still occupies the box.

## engine — the muses, and thea's remedy

### GL-WV-11 — The Muses are the nine operators; Mnemosyne is the record; Thea holds the light
- pipeline: law
- status: appointed (Glauca's mnemonic — the house's nine operators, not a measurement)
- supersedes: —
- evidence: the cube's nine (NUL SIG INS / SEG CON SYN / DEF EVA REC, organs/cube.mjs) turned as the Muses of generation, daughters of Memory (Mnemosyne = the EOT/ledger they all issue from), their aunt Thea (Titaness of sight, thea.js) the clear eye that turns a finding into a remedy; the helix turns them three times (weave.mjs, GL-CB-02)
- falsifying control: treating the correspondence as a measured claim rather than an appointed mnemonic contradicts the standing (the house never presents a mythic map as evidence).

### GL-WV-12 — The gate is the verdict; the remedy is the bounded loop, never a one-shot re-run
- pipeline: engine
- status: standing
- supersedes: —
- evidence: the datefmt build drew both units whole (GL-WV-09) and the gate caught ONE real behavioral gap — fmtDuration(0) got "" want "0s" (a plausible function, wrong at zero); the one-shot build could not repair, so the remedy is /v1/code (code-loop.js: the model proposes READ/PATCH, the edit op is derived MECHANICALLY from the bytes, the real testCommand gates, and on failure the file is REVERTED to pre-round bytes and the grounded failure folds into the next round — bounded by maxRounds, disclosed, never silent)
- falsifying control: a gate failure repaired by re-running the whole build (rather than the reverted, grounded, bounded loop), or a fix applied without the real test deciding, contradicts this.

## The lesson, in the archons' own order

Gary shapes the ask (facts, not prohibitions; the head is the anchor). The Muses
do their nine in order — SEG cuts, INS seeds, SYN assembles, EVA judges. Kleeneup
keeps each unit whole. Thea sees the failure in clear light and paces the remedy.
Heimdall guards the box: a typed refusal over a jam, a held turn over a wedge.
Hora sets each unit down whole before the next. Lovelace computes the structure
and lets the test decide. Bayes measures competence, never assumes it. And
Mnemosyne — the record — is where every draw, every scar, every remedy lands,
so the next weave starts from what this one learned.

### GL-WV-13 — The steersman: the shadow types mattering; Thea steers activation; logos is untouched
- pipeline: organs (the "for whom" of the turn)
- status: standing
- supersedes: —
- evidence: organs/steersman.mjs + organs/steersman.test.mjs (gate 8/8, 2026-10-01); the shadow is ConcernField@1, one prior per speakable archon built from the FULL ORIGINAL canon (live_priors/derived-priors/concern-priors/, 60 priors over the whole 83-handle cast: 23 named gaps — Shakespeare's source missing, the 22 silent archons' canon not in the priors (copyrighted_deferred/not_found), never shadowed from nothing · gate: determinism/provenance/null-floor/distinctiveness all PASS). The steersman types the discourse move (Socrates' elenctic moves, closed vocabulary), performs the consumption move (Terry Gross: the prior turn is carried — the anti-schizoid seam, one thread), and activates archons whose concern terms clear the population null (|shadow|·|topic|/|U| — never a hand-set floor); a topic token touching more than half the cast is common ground and is excluded. The envelope covers the WHOLE cast: activated + present (shadowed, untouched) + refused (named, never ventriloquized) = 83/83. Neither lane → APORIA, reason named. The metadata lane is disclosed-weak (pythia's autoPick surface measures ~chance, AUC 0.542): a pointer, never a ground. The pathos law rides in every envelope: never a gate, never a grade. The permutation null was measured and refused for the shadow (it admits die/nicht/ein as German dwellings — it cannot see grammatical regularity); the population null stands.
- falsifying control: an envelope that activates an archon whose concern field does not touch the topic, or that draws a response from an archon on an aporia turn, or a shadow term whose byte span does not contain it — any of these breaks the steering.

# Addendum E — the closed resolver and the holograph of the run (2026-10-01)

// The design made code. The taxonomy of "any arbitrary generation task" is now
// complete by CLOSURE, not enumeration (the law: named gaps, never invented
// lists): the cube is closed (9 operations × 3 grains = 27 cells, one declared
// void), the resolver lands every task in one cell and routes it, and every run
// is sealed as a holograph (SOURCES / RESPONSE / NOTES) — no cloth without the
// ledger of its making.

## organs — the closed resolver

### GL-WV-13 — The taxonomy is complete by closure; every task lands in one cell, routed or a named void
- pipeline: organs
- status: standing
- supersedes: —
- evidence: organs/resolver.mjs (Resolver@1, selftest 34/34 — all 27 cells enumerated and routed or void, exactly one declared void DEF·Ground; routes: image→measure (look.js, no model), html→box:html:snip, data feed→box:feed (window+agenda), code→engine (/v1/ask→/v1/code), prose INS→engine, unroutable→mouth, DEF·Ground→void loudly); organs/html-snip.mjs (HtmlSnip@1, selftest 7/7 — the tag-aware, byte-addressed HTML snipper, GL-EN-09's analogue for markup); gym/weave-build.mjs (runWeave routes through classify(); every run sealed by seal() into apps/weaves/<slug>-facing.html)
- falsifying control: a task that lands in no cell, a second cell double-routed, a void cell that is not named, or a run sealed without a holograph (no SOURCES/NOTES), contradicts this; the resolver's word-boundary scorer must not misfire a modality (the "json"⊂"js" collision was caught and fixed with \b-boundaries).

## engine — the holograph of the run

### GL-WV-14 — Every run is a holograph: SOURCES addressed, RESPONSE tagged, NOTES disclosed
- pipeline: engine
- status: standing
- supersedes: —
- evidence: gym/weave-build.mjs seal() (writes apps/weaves/<slug>-facing.html: [S#] SOURCES @ permanent address · bytes, RESPONSE = the artifact/fragment/code, NOTES = route·cell·mouthCalls·verdict·standing·falsifier); the council/feed run's SOURCES = the legistar feed via the gym door; the snip run's SOURCES = the html byte span; the image run's SOURCES = the image + OCR standing (GL-IM-01)
- falsifying control: a run whose facing page hides the mouthCalls, or whose RESPONSE carries a claim with no SOURCES entry, contradicts this — the holograph is the ledger of its own making (GL-00, GL-BD-04).
