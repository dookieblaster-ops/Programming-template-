// Makes a full-history backup of the repository in one file (a "git bundle"): every commit,
// branch and tag. It's written outside the project folder, by default to a "backups" folder next
// to it; set BACKUP_DIR to choose another place (a USB drive, a synced cloud folder).
// Only committed work is included, so commit first. Restore with:  git clone <file> <folder>
// Run: npm run backup        (see docs/VERSION_CONTROL.md)

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, statSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });

try {
  git("rev-parse", "HEAD");
} catch {
  console.error("Nothing to back up yet: this folder has no commits (or isn't a git repository).");
  process.exit(1);
}

const dir = resolve(process.env.BACKUP_DIR ?? join(root, "..", "backups"));
if (dir === root || dir.startsWith(root + "/")) {
  console.error(`BACKUP_DIR (${dir}) is inside the project folder. Choose a folder outside it.`);
  process.exit(1);
}
mkdirSync(dir, { recursive: true });

const now = new Date();
const pad = (n) => String(n).padStart(2, "0");
const stamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
const file = join(dir, `${basename(root)}-${stamp}.bundle`);
if (existsSync(file)) {
  console.error(`${file} already exists. Try again in a minute.`);
  process.exit(1);
}

const uncommitted = git("status", "--porcelain").trim();
git("bundle", "create", file, "--all");
git("bundle", "verify", file);
const commits = git("rev-list", "--all", "--count").trim();
const mb = (statSync(file).size / 1024 / 1024).toFixed(1);

console.log(`Backup made: ${file} (${mb} MB, ${commits} commits, every branch and tag).`);
if (uncommitted) console.log("Note: there are uncommitted changes, which aren't in the backup. Commit them, then back up again.");
console.log(`To restore it: git clone "${file}" restored-copy`);
