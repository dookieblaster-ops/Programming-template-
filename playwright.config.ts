import { defineConfig, devices } from "@playwright/test";

// Whole-app tests and screenshots at phone and tablet size.
// First time on a new computer: `npx playwright install chromium`.
// To use an already-installed Google Chrome instead: PW_CHANNEL=chrome npm run test:e2e
const channel = process.env.PW_CHANNEL;
const browser = channel ? { channel } : {};

export default defineConfig({
  testDir: "tests/e2e",
  outputDir: "test-results",
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:4173",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run build && npx vite preview --port 4173 --strictPort",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "phone",
      use: {
        ...devices["Pixel 7"],
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 3,
        ...browser,
      },
    },
    {
      name: "tablet",
      use: {
        ...devices["Galaxy Tab S4"],
        viewport: { width: 820, height: 1180 },
        deviceScaleFactor: 2,
        ...browser,
      },
    },
  ],
});
