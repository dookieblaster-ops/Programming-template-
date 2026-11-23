// The starter app's screen: the count, a big Add button and Undo. It shows the rules for src/ui:
// it uses src/core for the logic, takes its words from messages.ts, and writes what it shows into
// data-* attributes for the whole-app tests. Replace it with the app's own screens.

import type { Tally } from "../core/tally";
import { EMPTY_TALLY, addToTally, canUndo, undoTally } from "../core/tally";
import { messages } from "./messages";

export function startApp(root: HTMLElement): void {
  let tally: Tally = EMPTY_TALLY;

  const title = document.createElement("h1");
  title.textContent = messages.title;
  const intro = document.createElement("p");
  intro.className = "intro";
  intro.textContent = messages.intro;
  const count = document.createElement("p");
  count.className = "count";
  count.setAttribute("aria-live", "polite");
  const note = document.createElement("p");
  note.className = "note";
  note.setAttribute("aria-live", "polite");

  const button = (label: string, onTap: () => void, main = false) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = label;
    if (main) b.className = "main";
    b.addEventListener("click", onTap);
    return b;
  };
  const add = button(messages.add, () => show(addToTally(tally)), true);
  const undo = button(messages.undo, () => {
    if (!canUndo(tally)) note.textContent = messages.nothingToUndo;
    show(undoTally(tally));
  });
  const actions = document.createElement("div");
  actions.className = "actions";
  actions.append(add, undo);

  function show(next: Tally): void {
    if (next !== tally) note.textContent = "";
    tally = next;
    count.textContent = messages.count(tally.count);
    root.dataset.count = String(tally.count);
    undo.disabled = !canUndo(tally);
  }

  root.replaceChildren(title, intro, count, actions, note);
  show(tally);
}
