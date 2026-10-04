// penelope/organs/steersman.test.mjs — the steersman's gate.
//
// The envelope must be deterministic; it must perform the consumption move
// (Terry Gross) when a prior turn exists; it must activate from the shadow
// above the population null, fall back to the metadata lane, and declare
// APORIA — never ventriloquy — when neither lane touches the topic.
//
//   node steersman.test.mjs      run the gate, exit 0/1
import { steer } from "./steersman.mjs";

let failures = 0;
const fail = (name, msg) => { failures += 1; console.error(`  ✗ ${name}: ${msg}`); };
const pass = (name, msg) => console.log(`  ✓ ${name}${msg ? ` — ${msg}` : ""}`);

// 1. DETERMINISM — same input, byte-identical envelope
{
  const a = steer({ turn: "what is the genealogy of moral values?" });
  const b = steer({ turn: "what is the genealogy of moral values?" });
  if (JSON.stringify(a) !== JSON.stringify(b)) fail("determinism", "same turn produced different envelopes");
  else pass("determinism", "identical envelopes for identical turns");
}

// 2. CONSUMPTION (Terry Gross) — a prior turn is carried and tethered
{
  const env = steer({ turn: "but you said morality is a sign of decline", priorTurn: "is morality a sign of decline?" });
  const ok = env.consumption?.consumed === true && env.consumption.of.includes("is morality a sign of decline?") && env.move.all.includes("consumption") && env.move.all.includes("refutation");
  if (!ok) fail("consumption", `envelope did not perform the consumption move: ${JSON.stringify({ c: env.consumption, m: env.move })}`);
  else pass("consumption", "prior turn carried, move typed consumption+refutation");
}

// 3. SHADOW LANE — a topic in the canon's own vocabulary activates by shadow
{
  const env = steer({ turn: "is moral philosophie a matter of herkunft?" });
  const shadowed = env.activation.filter((a) => a.lane === "shadow");
  const nietzsche = env.activation.find((a) => a.handle.toLowerCase().includes("nietzsche"));
  if (!shadowed.length || !nietzsche) fail("shadow-lane", `no shadow activation on a canon-vocabulary topic: ${JSON.stringify(env.activation.map((a) => [a.handle, a.lane]))}`);
  else {
    const g = nietzsche.grounds.map((x) => x.term).join("+");
    const addr = nietzsche.grounds.every((x) => x.address !== null);
    pass("shadow-lane", `nietzsche activated by shadow on ${g} — grounds byte-addressed: ${addr}`);
  }
}

// 4. METADATA LANE — an English topic touches an archon's own record with
// >= 2 distinct tokens (the structural 2-floor), never one coincidental word
{
  const env = steer({ turn: "records of the grand historian" });
  const meta = env.activation.filter((a) => a.lane === "metadata");
  const sima = meta.find((a) => a.handle.toLowerCase().includes("sima"));
  if (!meta.length || !sima) fail("metadata-lane", `"records of the grand historian" touched no metadata lane (${JSON.stringify(env.activation.map((a) => [a.handle, a.lane, a.overlap]))})`);
  else pass("metadata-lane", `sima activated by metadata on ${sima.grounds.map((g) => g.term).join("+")}`);
}

// 5. APORIA — a topic no shadow touches is declared not-knowing, never ventriloquized
{
  const env = steer({ turn: "freshest tacos of the chromium launchpad" });
  if (!env.aporia) fail("aporia", `foreign topic activated something: ${JSON.stringify(env.activation.map((a) => [a.handle, a.lane, a.overlap]))}`);
  else if (!env.aporiaReasons.length) fail("aporia", "aporia without a named reason");
  else pass("aporia", "declared not-knowing, reason named");
}

// 6. THE LAW — the envelope never grades; the disclosure carries the law
{
  const env = steer({ turn: "is moral philosophie a matter of herkunft?" });
  if (!env.disclosure.includes("never a gate, never a grade")) fail("law", "the pathos disclosure is missing");
  else pass("law", "pathos discloses, never gates, never grades");
}

// 7. THE WHOLE CAST — the envelope covers every handle: activated +
// present + refused must equal the cast, and the refused are named, never
// ventriloquized
{
  const env = steer({ turn: "is moral philosophie a matter of herkunft?" });
  const total = env.activation.length + env.present.length + env.refused.length;
  const vonnegut = env.refused.find((r) => r.handle.toLowerCase().includes("vonnegut"));
  if (total !== env.roster.total) fail("whole-cast", `envelope covers ${total} of ${env.roster.total} handles`);
  else if (!vonnegut) fail("whole-cast", "a source-less archon is not named and refused");
  else if (!vonnegut.why.includes("not in the priors")) fail("whole-cast", "refusal without a named reason");
  else pass("whole-cast", `${env.activation.length} activated + ${env.present.length} present + ${env.refused.length} refused = ${total}/${env.roster.total}`);
}

console.log(`\nsteersman gate: ${failures === 0 ? "PASS" : `${failures} failure(s)`}`);
process.exit(failures === 0 ? 0 : 1);