import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const command = process.argv[2] || "dev";
if (!["dev", "build", "start"].includes(command)) throw new Error("Expected dev, build, or start");
const preload = fileURLToPath(new URL("../tests/fixtures/offline.mjs", import.meta.url));
const child = spawn(process.execPath, [
  "node_modules/next/dist/bin/next", command,
  ...(command === "build" ? [] : ["--hostname", "127.0.0.1", "--port", "3100"]),
], {
  stdio: "inherit",
  env: {
    ...process.env,
    NODE_OPTIONS: `${process.env.NODE_OPTIONS || ""} --import=${preload}`,
    NEXT_PUBLIC_SANITY_PROJECT_ID: "offline",
    NEXT_PUBLIC_SANITY_DATASET: "test",
    NEXT_PUBLIC_SITE_URL: "http://127.0.0.1:3100",
    NEXT_PUBLIC_SITE_INDEXABLE: "false",
    NEXT_TELEMETRY_DISABLED: "1",
    RESEND_API_KEY: "",
    GOOGLE_SHEETS_WEBHOOK_URL: "",
    SANITY_REVALIDATE_SECRET: "",
  },
});
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => child.kill(signal));
child.on("exit", (code) => process.exit(code ?? 1));
