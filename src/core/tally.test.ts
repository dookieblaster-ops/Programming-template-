import { describe, expect, it } from "vitest";
import { EMPTY_TALLY, addToTally, canUndo, undoTally } from "./tally";

describe("a tally", () => {
  it("starts at nothing, with nothing to undo", () => {
    expect(EMPTY_TALLY.count).toBe(0);
    expect(canUndo(EMPTY_TALLY)).toBe(false);
  });

  it("counts up, by one or more", () => {
    expect(addToTally(addToTally(EMPTY_TALLY)).count).toBe(2);
    expect(addToTally(EMPTY_TALLY, 5).count).toBe(5);
  });

  it("never changes the tally it was given", () => {
    const before = addToTally(EMPTY_TALLY);
    addToTally(before);
    expect(before.count).toBe(1);
  });

  it("undoes one change at a time, back to the start, and no further", () => {
    let t = addToTally(addToTally(addToTally(EMPTY_TALLY), 2));
    expect(t.count).toBe(4);
    t = undoTally(t);
    expect(t.count).toBe(3);
    t = undoTally(t);
    expect(t.count).toBe(1);
    t = undoTally(t);
    expect(t).toEqual(EMPTY_TALLY);
    expect(undoTally(t)).toBe(t);
  });
});
