import { defineConfig, devices } from "@playwright/test";

/**
 * End-to-end regression suite. Runs against the production build:
 *   npm run build && npm run test:e2e
 * (the web server is started automatically, or reused if already running).
 */
const PORT = Number(process.env.E2E_PORT ?? 3100);

export default defineConfig({
  testDir: "./e2e",
  timeout: 90_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    ...devices["Desktop Chrome"],
    viewport: { width: 1440, height: 900 },
    launchOptions: {
      // Software WebGL for headless machines without a GPU.
      args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
    },
  },
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
