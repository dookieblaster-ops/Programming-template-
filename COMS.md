# {{APP_NAME}}: Communications and Handoff (COMS)

This file lets a new chat or coding agent pick up where the last one stopped. It's read in full at the start of every chat, so keep it short. Update it at the end of every working session.

## Start here (for the next chat or agent)

1. Read this file, then `AGENTS.md`, `docs/NORTH_STAR.md`, `docs/PLAN.md`, and the design wiki's home page (`docs/wiki/README.md`) plus the pages for the code you'll work on.
2. Run `npm install` and `npm run check` so you know what actually works.
3. Tell the owner briefly where things stand and the next step you recommend.
4. Wait for the owner's "go" before building anything. After each finished step, wait for "go" again.

## How to work with the owner

- Plain, short language; the owner often reads on a phone. Do the technical work yourself.
- When the owner points out issues or changes, list them and wait for "go". They often think of more.
- One step at a time.

## Where things live

- **Code and docs:** GitHub, `{{REPO}}` (private), branch `main`. The repository is the source of truth.
- **How the program works:** the design wiki, [`docs/wiki/`](docs/wiki/README.md) (decision 4).
- **Older notes and sessions:** [`docs/HISTORY.md`](docs/HISTORY.md). **Ideas for later:** [`docs/IDEAS.md`](docs/IDEAS.md).
- **Backups:** GitHub, plus `npm run backup` files on the owner's computer (decision 5, [`docs/VERSION_CONTROL.md`](docs/VERSION_CONTROL.md)).

## Working notes (for agents)

- **Keeping this file short:** keep "Current status" brief (detail goes in the wiki), keep the last three session log lines here, and move older ones to the top of the log in `docs/HISTORY.md`.
- **Tests in a cloud workspace without Playwright's browser:** if Google Chrome is installed, run `PW_CHANNEL=chrome npm run check`. On a new computer the first run needs `npx playwright install --with-deps chromium`.
- **Screenshots:** the whole-app tests save phone and tablet screenshots to `screenshots/` (not committed). Look at them before sending them.

## Current status

**Phase:** set-up. Built from the app template on {{START_DATE}}. The starter "tally" screen is a placeholder to be replaced by the app's first real step.

**Working now:** the starter app (a tally with Undo), its tests, the wiki and licence checks, the backup script, and the automatic checks on GitHub.

## Decisions made

| # | Decision | Date |
|---|---|---|
| 1 | Built from the app template: the owner decides what and why; agents decide how, explain in plain words, and work one step at a time, waiting for "go". | {{START_DATE}} |
| 2 | Starting stack (change it in session 1 if the app needs something else, and record why): a TypeScript web app built with Vite, tested with Vitest (logic) and Playwright (whole app, phone and tablet size). | {{START_DATE}} |
| 3 | Licensing: permissive licences, plus LGPL kept as separate replaceable files; never GPL or AGPL. Every library listed in `docs/THIRD_PARTY_LICENSES.md`; `npm run licences` enforces it. | {{START_DATE}} |
| 4 | A design wiki in `docs/wiki/` explains how the program works, in plain words. Whoever changes the code updates the pages that cover it; `npm run check:wiki` enforces it; the whole wiki is reviewed at the end of each phase. | {{START_DATE}} |
| 5 | Version control: commit and push after every finished step; tag each plan step; never rewrite pushed history without the owner's agreement; GitHub checks every push; `npm run backup` keeps full-history backups off GitHub too. | {{START_DATE}} |

## Open questions

1. **What the app is.** Write the north star with the owner (session 1).
2. **Platforms.** Phone, tablet, desktop, web, app stores? This decides whether the starting stack (decision 2) fits.

## Recommended next steps

1. **Session 1:** run `npm run setup`, write the north star and the first phase plan with the owner, and replace the starter tally with the app's first step.

## Session log

The last three sessions; older ones are in [`docs/HISTORY.md`](docs/HISTORY.md).

| Date | What happened |
|---|---|
| {{START_DATE}} | Repository created from the app template. |
