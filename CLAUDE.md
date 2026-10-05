# ⛔ LEGACY REPOSITORY — STOP, DO NOT WORK IN THIS REPO

`clovenbradshaw-ctrl/penelope-legacy` (formerly `clovenbradshaw-ctrl/penelope`) is **frozen and kept for history only**.
It is stale. Nothing here is the source of truth.

## The current repo(s) — use these instead

- **https://github.com/scores-patch-points/penelope**  (local checkout: `/Users/mlacy/Documents/3.0/penelope`)

All Fold work now lives under the **`scores-patch-points`** GitHub account.

## Rules for any agent or tool that lands here

- Do **not** edit, commit, push, open PRs or issues, or vendor/copy code from this repo.
- Do **not** clone this repo into a workspace, or add its URL (or `clovenbradshaw-ctrl.github.io/penelope`) to configs, docs or imports.
- If you were sent here by an old clone URL, a search result, an import path or a doc, switch to the current repo above and fix that reference.

## Name map (old -> current)

| old name | current name |
|---|---|
| `clovenbradshaw-ctrl/eoreader7` | `scores-patch-points/khora` (the engine) |
| `clovenbradshaw-ctrl/live_priors` | `scores-patch-points/ethos` |
| `clovenbradshaw-ctrl/the-fold` (old surface) | `scores-patch-points/the-fold` is the **chat app**; the reading/research surface is `scores-patch-points/holodeck` |
| `clovenbradshaw-ctrl/holodeck`, `heimdall`, `penelope`, `opencode-fold` | same names under `scores-patch-points` |

**The Fold** (capitalised) means the whole suite of repos; `the-fold` means only the chat app.

---

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
4. **The house round (the handmaidens)** — `node gym/handmaidens.mjs` must be
   run after a process change, and each member's finding addressed before
   commit: Eurycleia (every generation thread named), Autonoe (every draw
   recorded on the swatch), Iphthime (every claim grounded — no uncited law,
   no ghost thread), Telemachus (every draw inside the sanctioned door). A
   member that reports a suitor means the change is not finished — the suitors
   are forgetfulness of duties and hallucinations that creep in. The round
   failing is the honest state; the suitors it names are the work left undone.

## Concurrent writers

Append to the EOT with a single atomic append. Commit only paths you can name
(`git diff --cached --stat` first); never a bare `git commit`.
