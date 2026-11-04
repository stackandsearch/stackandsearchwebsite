// Starts the production server, runs the smoke tests against it, then stops it.
// Zero dependencies. Requires a production build first (`npm run build`).
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = process.env.SMOKE_PORT ?? "3100";
const HOST = "127.0.0.1";
const BASE_URL = `http://${HOST}:${PORT}`;

if (!existsSync(".next/BUILD_ID")) {
  console.error("No production build found. Run `npm run build` first.");
  process.exit(1);
}

const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "-H", HOST, "-p", PORT],
  { stdio: ["ignore", "ignore", "inherit"] },
);

async function waitForServer(timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`next start exited early (code ${server.exitCode}). Is port ${PORT} already in use?`);
    }
    try {
      const res = await fetch(BASE_URL);
      await res.arrayBuffer();
      return;
    } catch {
      // Server is not accepting connections yet.
    }
    await sleep(300);
  }
  throw new Error(`Server did not answer on ${BASE_URL} within ${timeoutMs / 1000}s.`);
}

let exitCode = 1;
try {
  await waitForServer();
  const tests = spawn(process.execPath, ["--test", "tests/smoke/smoke.test.mjs"], {
    stdio: "inherit",
    env: { ...process.env, BASE_URL },
  });
  exitCode = await new Promise((resolve) => tests.on("exit", (code) => resolve(code ?? 1)));
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
} finally {
  server.kill();
}
process.exit(exitCode);
