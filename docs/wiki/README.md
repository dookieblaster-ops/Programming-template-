# {{APP_NAME}} design wiki

> **Covers:** none (the overview)
> **Checked against the code:** 2026-11-23

This wiki explains **how the program works today**, in plain words, for the owner and for every agent who works on the code. Agents read this page, then only the pages for the code they'll touch.

## Where each kind of answer lives

The wiki describes; it doesn't decide. It links to these instead of copying them.

| Question | Where the answer lives |
|---|---|
| What are we building, and why? | [`docs/NORTH_STAR.md`](../NORTH_STAR.md) |
| What has been decided? | [`COMS.md`](../../COMS.md), "Decisions made" (numbered) |
| What's built, and what's next? | [`COMS.md`](../../COMS.md); the order of work is in [`docs/PLAN.md`](../PLAN.md) |
| How does the program work now? | **This wiki** |
| How do we save, back up and undo? | [`docs/VERSION_CONTROL.md`](../VERSION_CONTROL.md) |
| Which libraries, under which licences? | [`docs/THIRD_PARTY_LICENSES.md`](../THIRD_PARTY_LICENSES.md) |
| How do agents work here? | [`AGENTS.md`](../../AGENTS.md) and [`docs/VIBE_CODING_GUIDE.md`](../VIBE_CODING_GUIDE.md) |

## Pages

| Page | What it explains |
|---|---|
| [Architecture](architecture.md) | The parts of the program, how they fit, and how it starts |
| [Testing and checks](testing-and-checks.md) | The tests, the checks behind `npm run check`, the scripts, and the checks on GitHub |
| [Glossary](glossary.md) | The app's plain words and the names in the code |
| [Editing this wiki](editing-the-wiki.md) | Who updates it, when, and the checks that keep it accurate |

Add a page for each big part of the app as it's built (and a row here).
