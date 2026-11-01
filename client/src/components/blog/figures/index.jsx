// Maps a figure block's `kind` to its renderer. Specs for each kind are documented at the
// top of its file and in docs/blog-authoring.md; src/content/blog/validate.js checks them.
import Flow from "./Flow";
import Compare from "./Compare";
import Split from "./Split";
import Gate from "./Gate";

const KINDS = { flow: Flow, compare: Compare, split: Split, gate: Gate };

export default function Figure({ spec }) {
  const C = KINDS[spec.kind];
  return C ? <C spec={spec} /> : null;
}
