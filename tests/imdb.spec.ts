import { test, expect } from "./fixtures";

test("has title", async ({ page }) => {
  const h1TitleText = "The Prestige";
  await page.goto("https://www.imdb.com/title/tt0482571/");
  await expect(page.getByRole("heading", { name: h1TitleText })).toBeVisible();
});

test("inject rating widget", async ({ page }) => {
  await page.goto("https://www.imdb.com/title/tt0482571/");
  await expect(page.getByTestId("fb-lite-widget")).toBeVisible();
});
