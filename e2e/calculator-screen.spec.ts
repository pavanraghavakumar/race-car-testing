import { test, expect } from "@playwright/test"

test("guest opens the calculator screen without signing in", async ({ page }) => {
  await page.goto("/")

  // 1.1: the calculator screen with a display and a keypad of buttons.
  await expect(page.getByRole("main", { name: "Scientific calculator" })).toBeVisible()
  await expect(page.getByRole("status", { name: /Display/ })).toBeVisible()
  await expect(page.getByRole("group", { name: "Keypad" })).toBeVisible()

  // Every key the issue lists is present.
  for (const key of [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    ".", "+", "−", "×", "÷", "^", "(", ")", "√(", "sin(",
    "cos(", "tan(", "log(", "ln(", "=", "C", "⌫",
  ]) {
    await expect(page.locator(`[data-key="${key}"]`)).toBeVisible()
  }

  // The degrees/radians switch is present and starts on degrees.
  await expect(page.getByRole("button", { name: "Degrees" })).toHaveAttribute("aria-pressed", "true")
  await expect(page.getByRole("button", { name: "Radians" })).toHaveAttribute("aria-pressed", "false")

  // 1.2: no sign-in is asked for.
  await expect(page.getByRole("textbox")).toHaveCount(0)
  await expect(page.getByLabel(/password/i)).toHaveCount(0)

  // 1.3: the calculator is in English.
  await expect(page.getByRole("button", { name: "Degrees" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Radians" })).toBeVisible()
  await expect(page).toHaveTitle("Scientific Calculator")
})
