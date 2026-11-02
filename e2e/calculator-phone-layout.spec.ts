import { test, expect } from "@playwright/test"

test("guest opens the calculator on a phone and sees the display above the keypad", async ({ page }) => {
  // A phone viewport: 390 x 844 CSS pixels.
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  const display = page.getByRole("status", { name: /Display/ })
  const keypad = page.getByRole("group", { name: "Keypad" })
  await expect(display).toBeVisible()
  await expect(keypad).toBeVisible()

  // 1.4: the display sits above the keypad.
  const displayBox = await display.boundingBox()
  const keypadBox = await keypad.boundingBox()
  expect(displayBox).not.toBeNull()
  expect(keypadBox).not.toBeNull()
  expect(displayBox!.y + displayBox!.height).toBeLessThanOrEqual(keypadBox!.y)

  // 1.4: every button is visible without scrolling sideways.
  const buttons = page.locator(".key")
  const count = await buttons.count()
  expect(count).toBeGreaterThan(0)
  for (let i = 0; i < count; i += 1) {
    const box = await buttons.nth(i).boundingBox()
    expect(box).not.toBeNull()
    expect(box!.x).toBeGreaterThanOrEqual(0)
    expect(box!.x + box!.width).toBeLessThanOrEqual(390)
    expect(box!.height).toBeGreaterThanOrEqual(44)
  }
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  )
  expect(overflow).toBe(false)

  // 1.4: the calculator fills the width with 16px margins.
  const calcBox = await page.locator(".calculator").boundingBox()
  expect(calcBox).not.toBeNull()
  expect(calcBox!.x).toBeCloseTo(16, 0)
  expect(390 - (calcBox!.x + calcBox!.width)).toBeCloseTo(16, 0)
})
