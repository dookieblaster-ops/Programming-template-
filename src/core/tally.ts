// The starter app's logic: a tally (tap to count, with Undo). It shows the rules for src/core:
// plain functions, no screen code, data never changed in place, tests beside it (tally.test.ts).
// Replace it with the app's own logic.

/** A tally: the count now, and the counts before each change (for Undo). */
export interface Tally {
  readonly count: number;
  readonly history: readonly number[];
}

export const EMPTY_TALLY: Tally = { count: 0, history: [] };

/** A new tally with `by` added (1 if left out). The old tally is unchanged. */
export function addToTally(tally: Tally, by = 1): Tally {
  return { count: tally.count + by, history: [...tally.history, tally.count] };
}

/** The tally as it was before the last change; the same tally if there's nothing to undo. */
export function undoTally(tally: Tally): Tally {
  const before = tally.history[tally.history.length - 1];
  return before === undefined ? tally : { count: before, history: tally.history.slice(0, -1) };
}

/** True if there is something to undo. */
export const canUndo = (tally: Tally): boolean => tally.history.length > 0;
