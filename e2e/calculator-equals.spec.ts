import { test, expect } from "@playwright/test"

test("guest presses equals and sees the result", async ({ page }) => {
  await page.goto("/")
  const display = page.getByRole("status", { name: /Display/ })

  // 3.2: 12 + 8 = 20
  await page.getByRole("button", { name: "1", exact: true }).click()
  await page.getByRole("button", { name: "2", exact: true }).click()
  await page.getByRole("button", { name: "+", exact: true }).click()
  await page.getByRole("button", { name: "8", exact: true }).click()
  await expect(display).toHaveText("12+8")
  await page.getByRole("button", { name: "=", exact: true }).click()
  // 3.1: equals evaluates and shows the result in the display.
  await expect(display).toHaveText("20")

  // 3.3: 7 × 6 = 42
  await page.getByRole("button", { name: "C", exact: true }).click()
  await page.getByRole("button", { name: "7", exact: true }).click()
  await page.getByRole("button", { name: "×", exact: true }).click()
  await page.getByRole("button", { name: "6", exact: true }).click()
  await page.getByRole("button", { name: "=", exact: true }).click()
  await expect(display).toHaveText("42")

  // 3.4: (2 + 3) × 4 = 20
  await page.getByRole("button", { name: "C", exact: true }).click()
  await page.getByRole("button", { name: "(", exact: true }).click()
  await page.getByRole("button", { name: "2", exact: true }).click()
  await page.getByRole("button", { name: "+", exact: true }).click()
  await page.getByRole("button", { name: "3", exact: true }).click()
  await page.getByRole("button", { name: ")", exact: true }).click()
  await page.getByRole("button", { name: "×", exact: true }).click()
  await page.getByRole("button", { name: "4", exact: true }).click()
  await page.getByRole("button", { name: "=", exact: true }).click()
  await expect(display).toHaveText("20")
})
