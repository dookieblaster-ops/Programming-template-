# Building an app with AI agents: the method

How this template expects you (the owner) and AI agents (Claude, Cursor and others) to work together. It's the method that built Easy Sketch CAD, written down so every new app starts with it.

## Who does what

| You, the owner | The agents |
|---|---|
| Decide **what** the app does and **why** | Decide **how**, and explain it in plain words |
| Say "go" (or "wait", or "change this") | Never build without your "go"; one step at a time |
| Try each step on your phone or laptop | Test it, check the screenshots themselves, then show you |
| Make the choices that are yours | Offer 2 or 3 options with a recommendation |

## The files that hold it together

Chats forget; files don't. Every chat starts by reading them, and ends by updating them.

| File | What it holds | Who updates it |
|---|---|---|
| `START_PROMPT.md` | The prompt you paste to start each chat, with TODAY filled in | The agent writes the next one at wrap-up |
| `COMS.md` | Where things stand, numbered decisions, open questions, next steps, last three sessions | The agent, at every wrap-up |
| `AGENTS.md` | The rules every agent follows | Rarely; with your agreement |
| `docs/NORTH_STAR.md` | What the app is for. Every change must serve it | You and the agent, once; changes are decisions |
| `docs/PLAN.md` | The current phase's steps, in order | Written with you; approved before building |
| `docs/wiki/` | How the program works now, in plain words | Whoever changes the code; a check keeps it true |
| `docs/HISTORY.md`, `docs/IDEAS.md` | Older notes and sessions; ideas for later | The agent |

## The loop

1. **Start a chat** with the start prompt. The agent reads the files, runs the checks, and tells you in about six lines where things stand and what it recommends.
2. **Say "go"** (or change the plan first).
3. **The agent builds one step**, tests it, looks at the screenshots, and shows you: screenshots, a preview link, and what to try.
4. **You try it.** List anything you want changed. The agent lists it back and waits for "go".
5. **The agent commits, tags and pushes** the finished step (see [`VERSION_CONTROL.md`](VERSION_CONTROL.md)).
6. **Next step**, or **"wrap up"**: the agent updates `COMS.md`, backs up, and gives you the next start prompt.

## Session 1 for a new app

1. On GitHub, open the template and choose **Use this template → Create a new repository**. Make it **private**.
2. Start a chat with the start prompt. Fill in the app's name, your repository, and TODAY: "Session 1: run the setup, then write the north star and the first phase plan with me".
3. The agent runs `npm run setup -- --name "My App" --repo you/my-app`, which puts the app's name everywhere and dates the docs.
4. Together you write `docs/NORTH_STAR.md` and `docs/PLAN.md`. The agent asks questions, offers options, and records each choice as a decision.
5. If the app needs a different kind of technology (a native Android app, say), the agent explains the options and records the choice; the method stays the same.

## Habits that keep it working

- **Small steps you can try.** If a step can't be tried on your phone or laptop, it's too big or too hidden.
- **Decisions are written down, numbered, and kept.** An agent never changes one without asking you.
- **Trust, but check.** `npm run check` must pass, and screenshots are looked at before you see them. If something looks wrong, say so; the agent fixes it before moving on.
- **Short chats.** Long chats get slow and forgetful. When the agent suggests wrapping up, do; the next chat picks up from the files.
- **Keep the files lean.** Every chat pays (in usage) for what it reads. `COMS.md` stays short; the wiki is read a page at a time.
- **Never paste secrets** (passwords, keys) into a chat or a file.
- **Several agents, one set of files.** Claude in a chat, Cursor on your laptop: all of them follow `AGENTS.md` and update the same files, so you can switch between them.

## When things go wrong

- **"It worked before":** ask the agent to compare with the last tag (`step-N`) and find what changed.
- **"Undo that":** the agent reverts the commit; nothing is lost.
- **The checks fail on GitHub:** paste the agent the red ✗ link, or just say "the GitHub checks failed".
- **The agent seems lost:** say "wrap up", then start a fresh chat with the start prompt.
