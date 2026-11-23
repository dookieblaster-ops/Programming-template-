// Every word the app shows, in one place, so it's easy to review and keep plain.

export const messages = {
  title: "{{APP_NAME}}",
  intro: "This is the starter app: tap Add to count. Undo takes the last tap back.",
  add: "Add",
  undo: "Undo",
  count: (n: number) => (n === 1 ? "1 tap" : `${n} taps`),
  nothingToUndo: "Nothing to undo yet.",
} as const;
