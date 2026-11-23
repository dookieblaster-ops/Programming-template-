# Instructions for AI coding agents

These instructions apply to every AI agent working in this repository (Claude, Cursor, Copilot or others). `CLAUDE.md` and `.cursor/rules/agents.mdc` point here, so there is one set of rules.

## Before doing anything

1. Read [`COMS.md`](COMS.md): current status, decisions, open questions, next steps.
2. Read [`docs/NORTH_STAR.md`](docs/NORTH_STAR.md). Every change must serve it.
3. Read [`docs/PLAN.md`](docs/PLAN.md) for the approved plan and order of work.
4. Read the design wiki's home page, [`docs/wiki/README.md`](docs/wiki/README.md), and only the pages covering the code you'll work on.
5. Read [`docs/THIRD_PARTY_LICENSES.md`](docs/THIRD_PARTY_LICENSES.md) before adding any library.
6. Run `npm install` and `npm run check` so you know what actually works before changing anything.

If `COMS.md` still contains `{{APP_NAME}}`, this is a new app: follow "Session 1" in [`docs/VIBE_CODING_GUIDE.md`](docs/VIBE_CODING_GUIDE.md).

## Working with the owner

- The owner may not be a programmer. Use plain, short language; they often read on a phone. Do the technical work yourself; never ask them to write or debug code.
- Confirm your understanding before starting a new piece of work, then wait for "go".
- One step at a time. Finish it, test it, show it (screenshots, preview link), then wait for "go" before the next.
- When the owner lists issues or changes, list them back and wait for "go" before editing. They often think of more.
- When a choice is theirs to make, or you're stuck, give 2 or 3 options in plain words with your recommendation.
- Never change a decision recorded in `COMS.md` without the owner's agreement.
- If the chat gets long, say so and suggest wrapping up and starting a new chat.

## Engineering rules

- Keep logic in `src/core/` (plain functions, no screen code, data not changed in place) and screen code in `src/ui/`. Every core file has tests beside it (`name.test.ts`).
- All user-facing wording lives in `src/ui/messages.ts`.
- `npm run check` must pass before every commit: wiki check, licence check, build, unit tests, whole-app tests.
- Look at the screenshots yourself before sending them to the owner.
- Never commit secrets: no passwords, API keys or tokens in code or docs. Use a local `.env` file (ignored by git) and list the names, not the values, in `.env.example`.
- Everything must build and test on the owner's computer without special hardware. Note anything platform-specific in `COMS.md`.

## Version control (see [`docs/VERSION_CONTROL.md`](docs/VERSION_CONTROL.md))

- Commit after each finished step, with a clear message saying what changed and why, and push to GitHub. GitHub is the off-site backup.
- Tag each finished plan step (`git tag step-3`, pushed with `git push origin step-3`), so there is always a named point to go back to.
- **Never rewrite history:** no force-push, no `reset --hard` on pushed work, no deleting branches or tags, without the owner's explicit agreement. To undo pushed work, use `git revert`.
- Ask before deleting files you didn't create in this session.
- Experiments that may not work: use a branch (`try/<name>`), and merge only after the owner says go.
- At wrap-up, run `npm run backup` if the owner's computer is connected (it writes a full-history backup file outside the repository).

## Keeping the design wiki true

The design wiki in [`docs/wiki/`](docs/wiki/README.md) explains how the program works. **Whoever changes the code is the editor of the pages that cover it.** Rules: [`docs/wiki/editing-the-wiki.md`](docs/wiki/editing-the-wiki.md). In short:

- Update the covering page in the same commit as the code, saying what the code does now.
- Every new source file goes on some page's **Covers** line.
- Change a page's **Checked against the code** date only after re-reading the code.
- Link decisions, plans and licences; don't copy them. No test counts, line numbers or sizes.
- The order of truth: the code, then the wiki, then older notes.

## Licensing

- Only permissive licences (MIT, BSD, Apache, ISC and similar), plus LGPL kept as separate, replaceable files. Never GPL or AGPL, not even snippets. (Change this list only with the owner, and record it as a decision.)
- Add every new library to `docs/THIRD_PARTY_LICENSES.md` before using it. `npm run licences` must pass.

## Keeping context small

Every chat pays for what it reads. Keep `COMS.md` short (a brief status, the last three session log lines; older lines go to `docs/HISTORY.md`). Read only the wiki pages you need. Put detail in the wiki, not in `COMS.md`.

## At the end of every session (wrap-up)

1. Update `COMS.md`: current status, new decisions (keep the numbering), open questions, next steps, working notes, and one session log line naming the wiki pages you changed.
2. `npm run check` passes; commit and push.
3. Copy changed planning docs to wherever the owner keeps them (for example a claude.ai project). If you can't, send them as files.
4. Give the owner the start prompt for the next chat (`START_PROMPT.md`) with TODAY filled in.
