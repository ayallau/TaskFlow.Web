import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const now = new Date();
const timestamp = [
  `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`,
  `${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}-${String(now.getSeconds()).padStart(2, "0")}-${String(now.getMilliseconds()).padStart(3, "0")}`,
].join("T");
const archivePath = resolve(
  repositoryRoot,
  `git-archive-project-state-${timestamp}.zip`,
);

const result = spawnSync(
  "git",
  ["archive", "--format=zip", `--output=${archivePath}`, "HEAD"],
  { cwd: repositoryRoot, stdio: "inherit" },
);

if (result.error) {
  console.error(`Failed to run git archive: ${result.error.message}`);
  process.exitCode = 1;
} else if (result.status !== 0) {
  process.exitCode = result.status ?? 1;
} else {
  console.log(`Git archive created: ${archivePath}`);
}
