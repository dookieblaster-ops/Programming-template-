import { expect, test } from "@playwright/test";

// Whole-app tests for the starter app, at phone and tablet size (playwright.config.ts).
// They read what the screen shows from data-* attributes, not from pixels.

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("tap Add to count; Undo takes the last tap back", async ({ page }) => {
  const app = page.locator("#app");
  await expect(app).toHaveAttribute("data-count", "0");
  await expect(page.getByRole("button", { name: "Undo" })).toBeDisabled();
  for (let i = 0; i < 3; i++) await page.getByRole("button", { name: "Add" }).click();
  await expect(app).toHaveAttribute("data-count", "3");
  await expect(page.locator(".count")).toHaveText("3 taps");
  await page.getByRole("button", { name: "Undo" }).click();
  await expect(app).toHaveAttribute("data-count", "2");
});

test("every button is big enough for a finger (44 px or more)", async ({ page }) => {
  for (const b of await page.getByRole("button").all()) {
    const box = (await b.boundingBox())!;
    expect(box.height).toBeGreaterThanOrEqual(44);
    expect(box.width).toBeGreaterThanOrEqual(44);
  }
});

test("screenshot", async ({ page }, info) => {
  await page.getByRole("button", { name: "Add" }).click();
  await page.screenshot({ path: `screenshots/${info.project.name}-01-start.png` });
});
