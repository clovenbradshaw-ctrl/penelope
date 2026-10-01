# Penelope — standing orders for any agent working here

Penelope is written by several hands at once (agents and people). Law: library →
box → hunt → mouth; no hardcoded numbers; named gaps, never invented lists; red
rungs become standing rules, never retries. See README.md.

## When you change a generation process, the record changes with it

A process change = an organ, adapter, door/route, rung, or the order of the
spine (read → settle → fill → snip → probe → test → seal).

1. Re-weave the affected thread of `TAPESTRY.md` (ASCII, 78 wide), then run
   `node gym/check-tapestry.mjs --stamp`. It verifies coverage, copies the block
   to the README's front page, and records hashes. `node gym/check-tapestry.mjs`
   (no flag) must pass before you commit.
2. APPEND to `GLAUCA-EOT.md`: a new entry, or a `supersedes: <id>` entry. Never
   rewrite what an entry says; edit in place only to sharpen (add a falsifying
   control, fix a citation). Every entry needs a real `path:line` or measured
   run as evidence, and a falsifying control.
3. A run that trips an entry's falsifying control IS the finding: supersede it.

## Concurrent writers

Append to the EOT with a single atomic append. Commit only paths you can name
(`git diff --cached --stat` first); never a bare `git commit`.
