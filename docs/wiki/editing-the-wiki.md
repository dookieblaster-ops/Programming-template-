# Editing this wiki

> **Covers:** none (rules for editors)
> **Checked against the code:** 2026-11-23

This wiki is only useful if it's true. These rules keep it that way across many chats and agents (decision 4).

## Who is the editor

**Whoever changes the code updates the wiki**, in the same commit: a Claude chat, Cursor, or any other agent. There is no separate wiki writer. The owner doesn't need to edit it; if something reads wrong or unclear, they say so, and the next editor fixes it. At wrap-up, the editor names the pages they changed in `COMS.md`'s session log line.

## When to update it

| You changed... | Update |
|---|---|
| How something works | The page that covers that file: say what it does **now** |
| A new, renamed or deleted source file | The **Covers** line of the right page (every file must be covered) |
| A new big part of the app | A new page, with a row on the [home page](README.md) |
| A new test helper, script or check | [Testing and checks](testing-and-checks.md) |
| A new word the app uses, or a new code name for an idea | [Glossary](glossary.md) |
| A decision or the plan | `COMS.md` or `docs/PLAN.md`; the wiki only links to them |

## How to update a page

1. Run `npm run check:wiki`. It lists any page covering a file you changed.
2. **Re-read the code you changed**, then the page. Change the words to match what the code does now.
3. Set **Checked against the code** to today's date (YYYY-MM-DD) on every page you re-checked, and only after reading the code.
4. Run `npm run check` before committing.

## Writing rules

- **Plain, short words.** The owner reads this on a phone. Use the app's own words first; give a technical term once, in brackets.
- **Link, don't copy.** Decisions, plans, licences and status live in one place each.
- **Name code with a link:** for example [`addToTally`](../../src/core/tally.ts). The checker makes sure every linked name still exists in that file.
- **Nothing that goes stale by itself:** no test counts, line numbers, file sizes or version numbers.
- **Not sure? Say so.** Start the sentence with "Unverified:", then check it and remove the word before the session ends. The checker fails while one is left.
- **Describe what is.** Plans belong in the plan.

## The accuracy safeguards

`npm run check:wiki` (part of `npm run check`) fails if:

1. **A source file isn't covered.** Every file in `src/`, `scripts/` and `tests/` (other than unit tests), and the root build files, must be on some page's **Covers** line.
2. **A path doesn't exist.** Every covered file and every link to a file must exist.
3. **A linked code name is gone.** When a name in backticks links to a file, that name must still appear in that file.
4. **A decision or open question doesn't exist** in `COMS.md`.
5. **A code change has no page change.** A covered file with uncommitted changes needs at least one of its pages changed too (at least its date).
6. **A page is older than its code.** A covered file was committed after the page, and after the page's **Checked** date (with a day's leeway).
7. **A page is missing from the home page**, a wiki link is broken, a page has no **Covers** or **Checked** line, a test count appears, or "Unverified" is left in.

What it can't catch: **an explanation that's wrong in words.** That's why the date only changes after reading the code, and why the whole wiki is reviewed against the code at the end of each phase.

## Page template

```markdown
# Title

> **Covers:** `src/core/example.ts`, `src/ui/example.ts`
> **Checked against the code:** YYYY-MM-DD

One or two sentences: what this part does, in plain words.

## How it works
Short sections, tables and lists, naming code with links to its file.

## Where to change things
Which file to edit for the usual changes.
```
