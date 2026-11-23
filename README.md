# {{APP_NAME}}

<!-- After session 1: one or two sentences on what the app is, from docs/NORTH_STAR.md. -->

**Status:** set-up. See [`COMS.md`](COMS.md) for where things stand, and the design wiki ([`docs/wiki/`](docs/wiki/README.md)) for how the program works.

---

## Built from the app template

This repository started from **Programming-template**: a starting point for building an app with AI agents (Claude, Cursor and others) when the owner isn't a programmer. It brings the method, the files that hold a project together across many chats, automatic checks, and version control with backups. The method is explained in [`docs/VIBE_CODING_GUIDE.md`](docs/VIBE_CODING_GUIDE.md).

### Starting a new app

1. On GitHub, open the template and choose **Use this template → Create a new repository**. Make it **private**.
2. Start a chat (Claude, or Cursor on your laptop) with the prompt in [`START_PROMPT.md`](START_PROMPT.md). Fill in the app's name, the repository, and TODAY: *"Session 1: run the setup, then write the north star and the first phase plan with me"*.
3. The agent runs `npm run setup`, then writes the north star and the plan with you.
4. From then on: one step per "go", and "wrap up" at the end of each chat.

### What's inside

```
.
├── START_PROMPT.md               The prompt you paste to begin each chat
├── COMS.md                       Handoff: status, numbered decisions, open questions, next steps, last sessions
├── AGENTS.md                     Rules for every AI agent (CLAUDE.md and .cursor/rules point here)
├── docs/
│   ├── NORTH_STAR.md             What the app is for (written in session 1)
│   ├── PLAN.md                   The current phase's steps, in order
│   ├── VIBE_CODING_GUIDE.md      How the owner and the agents work together
│   ├── VERSION_CONTROL.md        Saving, backups and undoing, in plain words
│   ├── THIRD_PARTY_LICENSES.md   Every library and its licence; the licensing rules
│   ├── HISTORY.md, IDEAS.md      Older notes and sessions; ideas for later
│   └── wiki/                     Design wiki: how the program works (kept true by a check)
├── src/
│   ├── core/                     Logic: plain functions, no screen code, tests beside each file
│   ├── ui/                       The screen; all wording in ui/messages.ts
│   └── main.ts                   Starts the app
├── tests/e2e/                    Whole-app tests and screenshots at phone and tablet size
├── scripts/                      Setup, wiki check, licence check, backup
└── .github/                      Checks on every push, library updates, issue and pull request forms
```

The starter app is a tiny tally (tap to count, Undo) that shows how the pieces fit. Session 1 replaces it with the app's first real step.

### Commands

Needs Node.js 20 or newer (the version is in `.nvmrc`). Works on Linux, Windows and Mac.

```
npm install
npx playwright install --with-deps chromium   # first time only: the browser for the screen tests
npm run dev            # runs the app; the "Network" address it prints also opens on a phone on the same Wi-Fi
npm run check          # wiki check, licence check, build, and every test
npm run backup         # a full-history backup file outside the project folder
npm run setup -- --name "My App" --repo you/my-app   # once, in session 1
```

### Rules in one place

The rules for agents are in [`AGENTS.md`](AGENTS.md): plain words, one step at a time with your "go", tests and screenshots before showing you, decisions recorded and kept, the wiki updated with the code, permissive licences only, never rewriting history, and short handoff files so every chat starts quickly and cheaply.
