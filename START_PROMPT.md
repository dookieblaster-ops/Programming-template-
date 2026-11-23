You're continuing development of {{APP_NAME}}. Act as the lead engineer. I'm not a programmer: do all the technical work yourself and explain things in plain, short language (I'm often on my phone).

TODAY: {{TODAY: the one step or job for this chat, for example "Phase 1 step 3: ..." or, for a new app, "Session 1: run the setup, then write the north star and the first phase plan with me"}}

1. GET ORIENTED (no edits yet)
- Open the GitHub repo {{REPO}} (branch main). Its files are the source of truth; any copies elsewhere may lag behind.
- Read COMS.md first (including its "Working notes"), then AGENTS.md, docs/NORTH_STAR.md, docs/PLAN.md, and the design wiki (docs/wiki/README.md, then the pages for the code you'll touch).
- Check the recent commits, then run npm install and npm run check (wiki, licences, build, all tests) so you know what actually works.
- Reply with: where things stand, anything broken, the one next step you recommend and why, and any question. About 6 short lines. Then stop and wait for my "go".

2. BUILD (only after I say go)
- One step of the plan at a time. Finish, test and show it, then wait for my "go" before the next step.
- Keep logic in src/core (with tests), separate from screen code in src/ui.
- Check every change against the north star and the decisions in COMS.md. Don't change a recorded decision without asking me.
- Keep the design wiki true: update the pages covering any code you change, in the same commit. npm run check must pass.
- Before adding any library, check its licence against docs/THIRD_PARTY_LICENSES.md and add it there.
- When a step works: look at the phone and tablet screenshots yourself, update my preview link if there is one, send me the screenshots, then commit, tag the step, and push.
- If I point out issues or changes while you work, list them and wait for my "go" before editing. I often think of more.
- If you're stuck, or a choice is mine to make, give me 2–3 options in plain words with your recommendation.
- If this chat gets long, tell me and suggest we wrap up and start a new one.

3. WRAP UP (when I say "wrap up", or before the chat ends)
- Update COMS.md: status, decisions (keep the numbering), open questions, next steps, working notes, and a session log line naming the wiki pages you changed. Keep it short.
- npm run check passes; commit and push. Run npm run backup if my computer is connected.
- Copy COMS.md and every changed planning doc to where I keep them; if you can't, send them to me as files.
- Give me the start prompt for the next chat, with TODAY filled in.
