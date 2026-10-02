// organs/snip-cite.mjs — the mechanical quote (2026-10-01).
//
// A model NEVER writes a verbatim quote. The mouth names the citation; the box
// SNIPS it at its permanent byte address and substitutes the source's own
// bytes. Kleeneup's law, applied to generation: a thing is found by its byte
// address in the field, never by a pattern guessed over it; a drifted address
// is REFUSED, never silently re-found. The failure that earned this:
// 2026-10-01 — hand-typed "verbatim" quotes in the waxen-tablet essay did NOT
// resolve in the source (indexOf −1; line breaks and footnote markers the
// author did not copy). The mouth's residue is the connective prose and the
// choice of WHICH address to cite; the quote itself is always the box's snip.
//
// The mouth's draft carries citations as ⟦<source>@<byte-address>⟧ markers.
// replaceCites resolves each through a snip and substitutes the verbatim bytes
// in curly quotes; a marker the box cannot resolve stays a named gap, never the
// mouth's guess.
//
// PURE (node builtins only). Selftest:
//   node --input-type=module -e "import('./organs/snip-cite.mjs').then(m=>m.selftest())"
import fs from "node:fs";

export const SNIP_SCHEMA = "SnipCite@1";

/** Snip the verbatim sentence at a permanent byte address in a source file.
 *  The sentence is the run from `abs` to its first terminal (. ! ?) followed by
 *  whitespace, allowing hard-wrapped line breaks (the fold's sentence join).
 *  A drifted address (out of range, or bytes that do not form a sentence) is a
 *  typed refusal, never a re-found guess. */
export function snipSentence(sourcePath, abs, { maxLen = 320 } = {}) {
  let src;
  try { src = fs.readFileSync(sourcePath, "utf8"); } catch (e) { return { ok: false, gap: { kind: "source_unreadable", error: e.message } }; }
  const bytes = new TextEncoder().encode(src);
  if (!Number.isInteger(abs) || abs < 0 || abs >= bytes.length) return { ok: false, gap: { kind: "address_out_of_range", abs } };
  const tail = new TextDecoder().decode(bytes.slice(abs, Math.min(abs + maxLen, bytes.length)));
  let i = 0;
  while (i < tail.length) {
    const ch = tail[i];
    if ((ch === "." || ch === "!" || ch === "?") && (i + 1 >= tail.length || /\s/.test(tail[i + 1]))) break;
    i += 1;
  }
  const end = Math.min(i + 1, tail.length);
  const quote = tail.slice(0, end).replace(/\s+/g, " ").trim();
  if (!quote) return { ok: false, gap: { kind: "empty_snip", abs } };
  const len = new TextEncoder().encode(tail.slice(0, end)).length;
  return { ok: true, quote, abs, len, source: sourcePath, verified: true };
}

/** Replace every ⟦source@abs⟧ marker in the mouth's draft with the box's snip.
 *  `resolve(sourcePath, abs)` defaults to snipSentence. A refused citation is
 *  left as ⟦REFUSED: …⟧ on the page and named on the result — a gap, never a
 *  guess. */
export function replaceCites(draft, { resolve = null } = {}) {
  const re = /⟦([^⟧]+)@(\d+)⟧/g;
  const out = [];
  let last = 0, m;
  const snips = [];
  while ((m = re.exec(draft))) {
    out.push(draft.slice(last, m.index));
    const source = m[1], abs = Number(m[2]);
    const r = (resolve ?? snipSentence)(source, abs);
    if (r.ok) { out.push(`“${r.quote}”`); snips.push({ source, abs, quote: r.quote, len: r.len, verified: true }); }
    else { snips.push({ source, abs, gap: r.gap?.kind ?? "unresolved", verified: false }); out.push(`⟦REFUSED ${source}@${abs} — ${r.gap?.kind ?? "unresolved"}⟧`); }
    last = m.index + m[0].length;
  }
  out.push(draft.slice(last));
  const refused = snips.filter((s) => !s.verified);
  return { text: out.join(""), snips, refused };
}

export function selftest() {
  const t = (n, c) => { if (!c) { console.error("FAIL", n); process.exitCode = 1; } else console.log("ok", n); };
  const REP = "/Users/mlacy/Documents/3.0/live_priors/01-literature-books/gutenberg/pg55201_The_Republic_by_Plato.txt";
  // a real byte address: the waxen-tablet sentence's own bytes
  const src = fs.readFileSync(REP, "utf8");
  const start = src.indexOf("The waxen tablet of the memory");
  const abs = new TextEncoder().encode(src.slice(0, start)).length;
  const r = snipSentence(REP, abs);
  t("a byte address snips the verbatim sentence", r.ok && r.quote.includes("waxen tablet") && r.verified);
  t("a drifted address is refused, never re-found", snipSentence(REP, 3).gap?.kind === "address_out_of_range" || snipSentence(REP, 10 ** 9).gap?.kind === "address_out_of_range");
  t("a bad source is a typed gap", snipSentence("/no/such/file.txt", abs).gap?.kind === "source_unreadable");
  // the mouth's draft with citation markers → the box substitutes verbatim
  const draft = "Memory hardens: ⟦" + REP + "@" + abs + "⟧. The box, not the mouth, wrote that sentence.";
  const rep = replaceCites(draft);
  t("the mouth's citation marker becomes a mechanical snip", /“The waxen tablet/.test(rep.text) && rep.refused.length === 0);
  t("a refused citation stays a named gap, never the mouth's guess", replaceCites("See ⟦/no/file@5⟧ here.").refused.length === 1 && /REFUSED/.test(replaceCites("See ⟦/no/file@5⟧ here.").text));
}