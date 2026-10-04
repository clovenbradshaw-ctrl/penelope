// gym/box-draw.mjs — the ablations' draw, wired through the DOOR (Autonoe's
// record + Telemachus's threshold). A research ablation that draws a model is
// still a draw: it must land on the swatch and pass through the generation
// door — never straight to ollama (Telemachus's duty, 2026-10-04). The door
// swatches, honors the ration, and keeps the economy measured.
//
// THE SUITOR HELD: forgetfulness of duties — the ablation that drew past the
// door and left no row. The box-vs-model ablations previously POSTed to
// localhost:11435 with zero record; this is the seam that fixes all of them.
import { runDrawDoor } from "../organs/generation-door.mjs";

/** One draw through the door: the prompt as a `chat` draw, swatched, rationed.
 *  Returns the model's text, or null if the door refused. */
export async function doorDraw(prompt, { model = "gemma2:2b", maxTokens = 300 } = {}) {
  const r = await runDrawDoor({ prompt: String(prompt ?? ""), model, kind: "chat", maxTokens, temperature: 0 });
  return r?.ok ? r.text : null;
}