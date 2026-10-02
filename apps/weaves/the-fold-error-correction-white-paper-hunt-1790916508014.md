# How the Fold Actually Implements Error Correction

A white paper written as a hunt. The definition it was received under: a white paper hunts and discovers — it reads the machine and reports what it does, not what it says about itself. Standing: measured-with-dissent. Every claim below carries a code address or a measured run; nothing cites the constitution's promises.

## The discovery

1. The Fold's prose engine does not implement the null arm its constitution describes.

2. No "perturb" appears in organs/generation/engine.mjs or organs/generation/adapters/prose.mjs; the constitution's II.4 re-execution-on-perturbed-input is law, not implementation, in the prose path.

3. What the prose engine's test computes instead is a concrescence fold: testUnits (prose.mjs:113) runs wideToAtoms then foldWideToShape (prose.mjs:116) and reports the dissent — beats, gaps, refused, residual — as the verdict.

4. The error signal that actually controls the machine is the mouth's ration.

5. mouth.mjs:31 admits 40 draws per 15 minutes per identity; mouth.mjs:91 refuses with 429 + Retry-After on exhaust. The swatch measures it: 5 refused draws in gym/swatch.jsonl.

6. Precision control in the Fold is therefore a budget, not a weight — a 429 with a retry-after is the machine's gain term, and it is measured, not imagined.

7. The machine's real finite-sample null is the consensus gate.

8. consensus-gate.mjs:40 clears a mode only when its share passes 1/K + sqrt(ln(1/alpha)/(2n)) — the Hoeffding bound that moves with n, no fixed N anywhere — and consensus-gate.mjs:64 is its verdict.

9. So the theory that fits this machine is not 'predictive processing as the free-energy integral'; it is bounded sampling: the machine believes a mode when enough independent witnesses clear a finite-sample bound, and refuses to believe it otherwise.

## The aperture — what could refute this

1. The consensus gate is not called by the prose engine either: it lives in gym/to-notebook.mjs and gym/white-paper-box.mjs, not in engine.mjs. The prose path's error signal is the fold alone; the gate is a sibling, not a parent.
2. Absence is a weak claim: 'no perturb' could be a naming choice. If the null arm were implemented under another name (shuffle, nullArm, deal), the discovery misreads the code. The grep is a nomination, and the aperture keeps it one.
3. The swatch's refused draws are few (5); the ration's bite is measured but thin. A different load profile could show the mouth never actually throttles, which would hollow the precision-control claim.

## The falsification — registered before the claim ships

This discovery fails if: (a) a perturbation re-run is found under another name in the prose engine's test path (the grep is a nomination, not a proof); or (b) the consensus gate is wired into a prose run and decides its verdict (then bounded sampling is in the engine, not beside it); or (c) the swatch shows the ration never throttles a real session (then the 'budget, not weight' claim is decoration). Reproduce, then cite.