import { expect, test } from "@playwright/test";
import { toolCatalog } from "../../constants";

test("home page lists and filters the tool catalog", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: /the quick answer to everyday questions/i,
    })
  ).toBeVisible();

  const search = page.getByLabel("Search all tools");
  await search.fill("BMI");
  await expect(
    page.getByRole("heading", { name: "Body Mass Index Calculator" })
  ).toBeVisible();
  await search.fill("no-tool-matches-this");
  await expect(page.getByText("No matching tools")).toBeVisible();
  await search.fill("");
  await expect(
    page.getByRole("heading", { name: "Percentage Calculator" })
  ).toBeVisible();
});

for (const tool of toolCatalog) {
  test(`${tool.slug} renders without a page error`, async ({ page }) => {
    const response = await page.goto(`${tool.en}/`);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("body")).not.toContainText(
      "Application error: a client-side exception has occurred"
    );
  });
}

test("BMI reports invalid zero height", async ({ page }) => {
  await page.goto("/bmi-calculator/");
  const inputs = page.getByRole("spinbutton");
  await inputs.nth(1).fill("0");
  await page.getByRole("button", { name: "Calculate" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Height" })
  ).toContainText("Height");
});

test("binary translator decodes binary input", async ({ page }) => {
  await page.goto("/binary-code-translator/");
  await page.getByLabel("Binary to text").check();
  await page.getByRole("textbox").fill("01000001 01000010");
  await page.getByRole("button", { name: "Convert" }).click();
  await expect(page.getByText("AB", { exact: true })).toBeVisible();
});

test("Morse translator decodes Morse input", async ({ page }) => {
  await page.goto("/morse-code-translator/");
  await page.getByLabel("Morse to text").check();
  await page.getByRole("textbox").fill(".... ..");
  await page.getByRole("button", { name: "Convert" }).click();
  await expect(page.getByText("HI", { exact: true })).toBeVisible();
});

test("square-meter conversion uses standard BTU factors", async ({ page }) => {
  await page.goto("/m2-to-btu/");
  await expect(page.getByText("5382.00", { exact: true })).toBeVisible();
  await expect(page.getByText("4305.60", { exact: true })).toBeVisible();
});
