import { test, expect } from "@playwright/test"

test("guest opens the calculator on a computer and sees it centred", async ({ page }) => {
  // A computer viewport.
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto("/")

  const display = page.getByRole("status", { name: /Display/ })
  const keypad = page.getByRole("group", { name: "Keypad" })
  await expect(display).toBeVisible()
  await expect(keypad).toBeVisible()

  // 1.5: the display sits above the keypad.
  const displayBox = await display.boundingBox()
  const keypadBox = await keypad.boundingBox()
  expect(displayBox).not.toBeNull()
  expect(keypadBox).not.toBeNull()
  expect(displayBox!.y + displayBox!.height).toBeLessThanOrEqual(keypadBox!.y)

  // 1.5: the calculator is centred on the page.
  const calcBox = await page.locator(".calculator").boundingBox()
  expect(calcBox).not.toBeNull()
  const leftGap = calcBox!.x
  const rightGap = 1280 - (calcBox!.x + calcBox!.width)
  expect(Math.abs(leftGap - rightGap)).toBeLessThanOrEqual(2)
})
