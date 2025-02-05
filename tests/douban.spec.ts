import { test, expect } from "./fixtures";

test("has title", async ({ page }) => {
  const h1TitleText = "致命魔术 The Prestige (2006)";
  await page.goto("https://movie.douban.com/subject/1780330/");
  await expect(page.getByRole("heading", { name: h1TitleText })).toBeVisible();
});

test("transform IMDb ID into a link", async ({ page }) => {
  await page.goto("https://movie.douban.com/subject/1780330/");
  const link = await page.getByTestId("fb-imdb-id-link").innerText();
  expect(link).toBe("tt0482571");
});

test("inject rating widget", async ({ page }) => {
  await page.goto("https://movie.douban.com/subject/1780330/");
  await expect(page.getByTestId("fb-lite-widget")).toBeVisible();
});
