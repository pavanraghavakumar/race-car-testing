import { test, expect } from "@playwright/test"

test("guest sees an error message and keeps the expression", async ({ page }) => {
  await page.goto("/")
  const display = page.getByRole("status", { name: /Display/ })

  // 3.6: an expression ending in an operator shows an error and keeps it.
  await page.getByRole("button", { name: "1", exact: true }).click()
  await page.getByRole("button", { name: "2", exact: true }).click()
  await page.getByRole("button", { name: "+", exact: true }).click()
  await page.getByRole("button", { name: "=", exact: true }).click()
  await expect(display).toHaveText("Invalid expression")
  // The expression is kept: a digit appends to it.
  await page.getByRole("button", { name: "3", exact: true }).click()
  await expect(display).toHaveText("12+3")

  // 3.7: unbalanced brackets show an error and keep the expression.
  await page.getByRole("button", { name: "C", exact: true }).click()
  await page.getByRole("button", { name: "(", exact: true }).click()
  await page.getByRole("button", { name: "2", exact: true }).click()
  await page.getByRole("button", { name: "+", exact: true }).click()
  await page.getByRole("button", { name: "3", exact: true }).click()
  await page.getByRole("button", { name: "=", exact: true }).click()
  await expect(display).toHaveText("Invalid expression")
  // The expression is kept: a closing bracket appends to it.
  await page.getByRole("button", { name: ")", exact: true }).click()
  await expect(display).toHaveText("(2+3)")
})
