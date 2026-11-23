# Third-party libraries and licences

Every library the app uses or is built with, and its licence (decision 3 in `COMS.md`). `npm run licences` checks every installed package, including indirect ones, against the allowed list in [`scripts/check-licences.mjs`](../scripts/check-licences.mjs).

## The rules

- **Allowed:** permissive licences (MIT, BSD, Apache 2.0, ISC and similar).
- **Allowed with care:** LGPL, only as separate, replaceable files that we never change, and credited in the app.
- **Never:** GPL or AGPL, not even small snippets copied from them; or any licence not on the list (MPL, for example, needs the owner's decision first).
- Add a library here **before** using it. If unsure, ask the owner and record the answer as a decision.
- Before selling the app, have a lawyer review this list.

## Libraries

| Library | What it's for | Licence | In the app, or only to build and test it |
|---|---|---|---|
| TypeScript | The language the app is written in | Apache 2.0 | Build only |
| Vite | Builds the app and serves it while developing | MIT | Build only |
| Vitest | Logic tests | MIT | Test only |
| Playwright | Whole-app tests and screenshots at phone and tablet size | Apache 2.0 | Test only |
| @types/node | Type information for the build scripts | MIT | Build only |
