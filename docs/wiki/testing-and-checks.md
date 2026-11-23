# Testing and checks

> **Covers:** `scripts/check-wiki.mjs`, `scripts/check-licences.mjs`, `scripts/backup.mjs`, `scripts/setup.mjs`, `playwright.config.ts`, `tests/e2e/app.spec.ts`
> **Checked against the code:** 2026-11-23

Everything must pass on the owner's computer before a commit, and again on GitHub after every push.

## The one command

`npm run check` runs, in order:

| Check | Command | What it proves |
|---|---|---|
| Wiki | `npm run check:wiki` | This wiki still matches the code ([`scripts/check-wiki.mjs`](../../scripts/check-wiki.mjs); rules in [Editing this wiki](editing-the-wiki.md)) |
| Licences | `npm run licences` | Every installed package is on the allowed list ([`scripts/check-licences.mjs`](../../scripts/check-licences.mjs), decision 3) |
| Build | `npm run build` | The types check and the app builds |
| Logic tests | `npm test` | Every file in `src/core/` (and any `*.test.ts` in `src/ui/`), with Vitest |
| Whole-app tests | `npm run test:e2e` | The real app in a browser at **phone** and **tablet** size, with Playwright ([`playwright.config.ts`](../../playwright.config.ts)) |

## Whole-app tests and screenshots

[`tests/e2e/app.spec.ts`](../../tests/e2e/app.spec.ts) taps the buttons, checks what the screen shows (through `data-*` attributes rather than pixels), checks every button is big enough for a finger, and saves screenshots to `screenshots/` (not committed). Agents look at the screenshots before showing them to the owner.

If Playwright can't download its own browser (some cloud workspaces), use an installed Google Chrome: `PW_CHANNEL=chrome npm run check`.

## On GitHub

The **Checks** workflow (`.github/workflows/check.yml`) runs `npm run check` on every push and pull request, and keeps the screenshots for two weeks. A red ✗ on GitHub means something's broken. Dependabot (`.github/dependabot.yml`) suggests library updates monthly; each must pass the same checks.

## Other scripts

- [`scripts/setup.mjs`](../../scripts/setup.mjs) (`npm run setup`): once, in session 1. Puts the app's name and repository into the docs and dates them.
- [`scripts/backup.mjs`](../../scripts/backup.mjs) (`npm run backup`): a full-history backup file outside the project folder (see [`docs/VERSION_CONTROL.md`](../VERSION_CONTROL.md)).
