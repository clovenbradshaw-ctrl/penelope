# The tapestry — how generation works now

The present tense of Penelope's generation pipelines. [GLAUCA-EOT.md](GLAUCA-EOT.md)
is the append-only history that explains each thread; this picture is
rewoven whenever a process changes, and `node gym/check-tapestry.mjs` fails
when it is stale (an organ, adapter, route or rung missing from it, a
dangling reference, a README that differs, or a watched file changed since
the last weave).

<!-- tapestry:external: code-build.js talk-build.js talk-reader.js talk-reason.js belief-page.js music-medium.js widget-build.mjs look.js -->
<!-- tapestry:generated: ladder-live.jsonl -->
<!-- tapestry:begin -->
```text
#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=
#                                                                            #
#                P E N E L O P E  --  T H E   T A P E S T R Y                #
#  how generation works, woven 2026-10-01 (present tense of GLAUCA-EOT.md)   #
#                                                                            #
# THE ASK   "a launch tracker" . "a pomodoro widget" . "an essay on X"       #
#    |                                                                       #
#    +----------------------+---------------------------+                    #
#    |                      |                           |                    #
#  CHAT, the shuttle     BUILD, the cloth           NOTEBOOK, pattern-book   #
#  gym/server.mjs        ladder r1-r13 + the        gym/to-notebook.mjs      #
#  /api/chat-stream      engine (see SPINE)         cells replay to verdict  #
#  /api/chat /api/rung   in: prompt (+ workspace)   markdown = recorded,     #
#  free talk; anything   out: artifact + control    never replayed           #
#  unverified arrives    + facing page + EOT        code = organ selftests   #
#  TYPED, scars ride     needs a create-capable     re-run, outputs stored   #
#    |                   door; null-hit = a NAMED   history appends, nothing #
#    |                   GAP, never invented cloth  overwrites               #
#    |                      |                           |                    #
#    +----------------------+---------------------------+                    #
#                           |                                                #
# =[ THE LAW ]============================================================== #
#   library ---> box ---> hunt ---> mouth        (the mouth is LAST)         #
#   remembered   derived  gotten    drawn: only the irreducible residue      #
#   no hardcoded numbers: every bound = a null + a budget                    #
#   named gaps, never invented lists . red rungs become rules, never retries #
# ========================================================================== #
#                           |                                                #
#  THE SPINE  (organs/generation/engine.mjs owns order, retries, scars,      #
#  |           EOT, files; an adapter owns what differs by medium)           #
#  |                                                                         #
#  READ    one small ask, JSON out -> [{name, spec}]. a structure, never a   #
#  |       regex. a malformed reading is an EMPTY reading; the gate shows it #
#  |                                                                         #
#  SETTLE  the BOX derives what proves each unit from a declared example     #
#  |       grid; the settle calls the unit's own name; mouth never guesses   #
#  |                                                                         #
#  FILL    per unit, first hit wins, in this order only:                     #
#  |        1 FIELD  corpus match by FRAME not name -> snip, byte address    #
#  |        2 HUNT   search -> raw source -> extract -> frame check          #
#  |                 (wrong world REFUSED and disclosed, never spliced)      #
#  |        3 MOUTH  one single-part framed fragment, temp 0, a completion   #
#  |                 anchor, never steered. the test decides                 #
#  |                                                                         #
#  SNIP    structural brace-walk (string/comment aware), EXACTLY the named   #
#  |       unit; prose around code (chat door talks) -> cut function spans   #
#  |                                                                         #
#  PROBE   the swarm, many framings: settle deepEq + spec words + frame      #
#  |        fail -> SPIRAL: name why, sharpen the atom (the unit's OWN args, #
#  |                never a clock), re-draw fresh (never "fix this"), scar   #
#  |        3 strikes on a shape -> BOX-OWNED standing rule, no 4th draw     #
#  |        still failing -> REFUSED: typed, shipped as dissent (4 of 6, not #
#  |                a false 6 of 6)                                          #
#  |                                                                         #
#  TEST    assembled whole + held-out cases. compile+exec is the floor; only #
#  |       a test that CALLS the code decides. no other hand strings the bow #
#  |                                                                         #
#  SEAL    artifact + facing page + EOT (ArrangementEOT@1): scars, refusals, #
#          provenance (snipped@addr / hunted@url / drawn), swarm verdict     #
#                           |                                                #
# =[ ORGANS ]  pure . selftested . schema-tagged . no model, no DOM ======== #
#  consensus-gate  ConsensusGate@1  many comps, one mode survives the null   #
#                                   CALLABLE|MORE|DISSOLVED|EXHAUSTED        #
#                                   frequency + growth, never loudness       #
#  detail-fetch    DetailFetch@1    two-hop fan-out; a failed item is a gap, #
#                                   the list survives                        #
#  behavior-check  BehaviorCheck@1  dead controls FAIL; checked where app    #
#                                   FACTORS its logic (pure functions)       #
#  freshness       Freshness@1      fresh | stale (badge + last-good) |      #
#                                   expired (a named gap, never silent rows) #
# ========================================================================== #
#                           |                                                #
#  THE MEDIA  (one skeleton, a medium is an adapter)                         #
#  code     generation/adapters/code.mjs    units -> functions               #
#  prose    generation/adapters/prose.mjs   void cells = units; the          #
#                                           fold re-admits, names gaps       #
#  page     talk-build.js + belief-page.js  the mouth only TALKS; the        #
#                                           ledger is the build              #
#  image    look.js + screen sense (prov.)  MEASURE, never describe          #
#  music    music-medium.js                 snipped bars, licensed           #
#  (resident = copied with a pinned commit; referenced = read at home,       #
#   never forked. an unroutable task FAILS LOUDLY at intake)                 #
#                           |                                                #
#  PROSE GROUND  no view from nowhere                                        #
#    handed-over -> live_priors -> hunted -> NONE (stop: "No ground")        #
#    a sentence is LINKED to one source sentence or it is UNGROUNDED         #
#                           |                                                #
# =[ THE DOORS ]  routed by measured evidence, disclosed =================== #
#  chat --> Heimdall admission (shared mouth, x-er7-session penelope-gym,    #
#           batch priority; 429/503 + Retry-After -> bounded backoff ->      #
#           a typed refusal; never a hang, never silence)                    #
#  stream --> ollama DIRECT (both proxy streaming doors hang — measured      #
#           2026-10-01: /v1/chat/completions and /api/chat, code 000, 90s,   #
#           zero bytes; the SSE route is the chat loom's live face)          #
#  code --> ollama DIRECT (the chat door's hard-meaning route swallows code  #
#           prompts whole and answers a swarm verdict, not a draw)           #
# ========================================================================== #
#                           |                                                #
#  THE LADDER   mouth draws, organs decide; one rung at a time               #
#  |                                                                         #
#  |  BY DAY  weave                      BY NIGHT  unweave                   #
#  |  assemble from library spec +       revert the failing patch            #
#  |  traced fields; r1-r8 baseline,     dissolve what is not pattern        #
#  |  r9-r13 teeth, mouth-last order     demote the mouth's shape to the box #
#  |                                                                         #
#  |  a red rung is the mouth's boundary: R4 fmtAgo 0/4 -> box-computed;     #
#  |  filterLaunches 0/3 -> box-owned; feed->list proven ZERO-mouth, 20/20   #
#  |  scoreboard /api/score says who won each rung: mouth | box              #
#                           |                                                #
# =[ THE RECORD ]  no cloth without the ledger of its making =============== #
#  apps/record.json . ladder/*.json . gym/ladder-live.jsonl                  #
#  gym/chat.html (chat page) . ladder/nomouth-rows.txt (zero-mouth proof)    #
#  penelope-notebook.ipynb . GLAUCA-EOT.md (best practices, append-only)     #
#  Odysseus voyages, Penelope weaves: material crosses only as addressed     #
#  record, never as assertion                                                #
# ========================================================================== #
#                                                                            #
#   re-weave: node gym/check-tapestry.mjs --stamp   history: GLAUCA-EOT.md   #
#                                                                            #
=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
```
<!-- tapestry:end -->

## Re-weaving (the standing order)

1. Change the process. 2. Re-weave the affected thread above (keep the
frame 78 wide; ASCII only). 3. `node gym/check-tapestry.mjs --stamp` — it
verifies coverage, copies this block onto the README's front page, and
records the watched files' hashes. 4. APPEND the entry (or a superseding
entry) to GLAUCA-EOT.md. A process change that skips 2–4 is unfinished.
`external` names are organs referenced at their home (eoreader7), never
copied; `generated` names are runtime artifacts.
