// organs/fold-at-point.mjs — the universe folded at a point (2026-10-01).
//
// Identity is the universe folded at a point, bounded by differences that make
// a difference, for a particular for-whom. An essay IS such a fold: the same
// universe (the clean sources) folds differently at different for-whoms, and
// the fold's identity is the consequence it makes there. This organ is the
// ETHOS: it selects, from the universe, the claims whose differences make a
// difference TO the for-whom — the load-bearing threads of the fold.
//
// The box selects by the for-whom's stake (its significant words, plus each
// section's aspect); a clean sentence that shares the stake is a load-bearing
// difference; the rest of the universe stays outside the fold. Two for-whoms →
// two stakes → two selections → two identities, by consequence.
//
// PURE (node builtins). Selftest:
//   node --input-type=module -e "import('./organs/fold-at-point.mjs').then(m=>m.selftest())"

export const FOLD_SCHEMA = "FoldAtPoint@1";

const STOP = new Set(["the", "and", "that", "with", "this", "from", "have", "been", "which", "what", "there", "for", "in", "of", "to", "a", "an", "is", "are", "it", "as", "on", "at", "by", "who", "whose", "one", "must", "will", "about", "into", "its", "their", "your", "not", "but", "so", "how", "why", "what", "does"]);
const words = (s) => new Set(String(s).toLowerCase().split(/\W+/).filter((w) => w.length > 3 && !STOP.has(w)));
const overlap = (text, stake) => { let n = 0; for (const w of words(text)) if (stake.has(w)) n++; return n; };

/** Fold the universe at the for-whom: select, per section, the clean sentences
 *  whose differences make a difference to that point. `indices` = { label:
 *  SourceIndex }. Each selected claim carries its byte address — the ethos
 *  spine of the essay. */
export function foldAtPoint({ forWhom = "", indices = {}, sections = [], per = 2, minOverlap = 2 } = {}) {
  const stake = words(forWhom);
  const folds = [];
  const used = new Set();
  for (const sec of sections) {
    const secStake = new Set([...stake, ...words(sec.aspect)]);
    const scored = [];
    for (const [label, idx] of Object.entries(indices)) {
      if (!idx?.ok) continue;
      for (const s of idx.sentences) {
        const o = overlap(s.text, secStake);
        if (o >= minOverlap) scored.push({ text: s.text, abs: s.abs, len: s.len, src: label, overlap: o });
      }
    }
    scored.sort((a, b) => b.overlap - a.overlap || a.abs - b.abs);
    const selected = [];
    for (const c of scored) {
      const key = c.src + "@" + c.abs;
      if (used.has(key)) continue;
      used.add(key);
      selected.push(c);
      if (selected.length >= per) break;
    }
    folds.push({ section: sec.name, aspect: sec.aspect, claims: selected });
  }
  return { schema: FOLD_SCHEMA, ok: true, forWhom, stake: [...stake], folds };
}

export async function selftest() {
  const t = (n, c) => { if (!c) { console.error("FAIL", n); process.exitCode = 1; } else console.log("ok", n); };
  const { indexSource } = await import("./source-index.mjs");
  const REP = "/Users/mlacy/Documents/3.0/live_priors/01-literature-books/gutenberg/pg55201_The_Republic_by_Plato.txt";
  const WM = "/tmp/wm-research.txt";
  const indices = { republic: indexSource(REP), research: indexSource(WM) };
  const holder = foldAtPoint({ forWhom: "the one who keeps a memory in a box and must learn to let it go", indices, sections: [{ name: "the classical image", aspect: "how the wax hardens and crowds with a long life" }] });
  const learner = foldAtPoint({ forWhom: "the student learning how memory works and how to keep it", indices, sections: [{ name: "the modern research", aspect: "the prefrontal cortex maintaining representations in working memory" }] });
  t("the fold selects claims whose differences make a difference to the for-whom", holder.ok && holder.folds[0].claims.length >= 1);
  t("identity by consequence: different for-whoms fold different claims", (() => {
    const h = holder.folds[0].claims.map((c) => c.src + "@" + c.abs);
    const l = learner.folds[0].claims.map((c) => c.src + "@" + c.abs);
    return h.some((k) => !l.includes(k)) || l.some((k) => !h.includes(k));
  })());
  t("every selected claim carries a byte address", holder.folds[0].claims.every((c) => c.abs > 0 && c.src));
}