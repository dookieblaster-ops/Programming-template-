# Version control and backups

How the app's work is saved, backed up and undone (decision 5 in `COMS.md`). Written for the owner: no Git knowledge needed.

## The idea in four lines

- **A commit** is a save point: a snapshot of every file, with a note saying what changed.
- **Pushing** copies the save points to GitHub. GitHub is the first backup, off your computer.
- **A tag** is a named save point, like `step-3`, at the end of each plan step: an easy place to go back to.
- **A backup file** (`npm run backup`) is the whole history in one file on your own computer or drive: a second backup, in case GitHub is ever unavailable.

## What the agents do

| When | What | Why |
|---|---|---|
| After each finished step | `npm run check` passes, then a commit with a clear message, a tag (`step-N`), and a push | Every step is saved, checked and backed up |
| On every push to main | GitHub runs the same checks (the "Checks" workflow) | A second pair of eyes; a red ✗ on GitHub means something's broken |
| Before anything risky | A branch (`try/<name>`), merged only after your go | Experiments can be thrown away without touching the main line |
| At wrap-up | `npm run backup`, if your computer is connected | A full copy outside GitHub |
| Never, without your agreement | Force-pushing, rewriting history, deleting branches or tags | These can lose work for good |

## Undoing things

- **The last change was wrong:** ask the agent to "revert the last commit". It adds a new commit that undoes it, so nothing is lost and it can be redone.
- **Go back to how it was at a step:** "go back to step-3". The agent reverts the commits after that tag, or starts a branch from it, and explains which.
- **Something got deleted:** it's still in an earlier commit. Ask the agent to bring it back from history.

## Backups on your own computer

`npm run backup` writes one file, such as `backups/my-app-2026-11-23-0645.bundle`, **outside** the project folder (by default in a `backups` folder next to it; set `BACKUP_DIR` to choose another place, such as a USB drive or a synced cloud folder). It contains every commit, branch and tag. It only includes committed work, so commit first.

Every so often, copy the newest backup file to a second place (a USB drive, or a cloud folder that isn't GitHub). Old ones can be deleted; each file holds the whole history.

**To restore** from a backup file (an agent can do this for you):

```
git clone my-app-2026-11-23-0645.bundle my-app-restored
```

## Keeping GitHub safe

- Keep the repository **private** unless you choose otherwise.
- Turn on two-factor sign-in for your GitHub account.
- Never put passwords, API keys or tokens in the code or the docs. If one ever lands in a commit, change the key at its source straight away (deleting it from the code isn't enough: it's still in the history), then tell the agent.
- Dependabot (`.github/dependabot.yml`) suggests library updates once a month. An agent checks each one: the licence check and all tests must pass.

## Commit messages

One short first line saying what changed ("Step 4: chaining lines into outlines"), then a few lines on why and anything notable. Agents add their attribution lines at the end.
