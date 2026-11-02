import { test, expect } from "@playwright/test"

test("guest builds an expression with the keypad and the keyboard", async ({ page }) => {
  await page.goto("/")
  const display = page.getByRole("status", { name: /Display/ })
  const key = (name: string) => page.getByRole("button", { name, exact: true })

  // 2.1: a digit button adds that digit to the display.
  await key("7").click()
  await expect(display).toHaveText("7")
  await key("8").click()
  await expect(display).toHaveText("78")

  // 2.2: an operator button adds that operator to the display.
  await key("+").click()
  await expect(display).toHaveText("78+")
  await key("−").click()
  await expect(display).toHaveText("78+−")
  await key("×").click()
  await expect(display).toHaveText("78+−×")
  await key("÷").click()
  await expect(display).toHaveText("78+−×÷")

  // 2.4: the decimal point button adds a decimal point.
  await key(".").click()
  await expect(display).toHaveText("78+−×÷.")

  // 2.5: the bracket buttons add an opening or a closing bracket.
  await key("(").click()
  await expect(display).toHaveText("78+−×÷.(")
  await key(")").click()
  await expect(display).toHaveText("78+−×÷.()")

  // 4.1: the power button adds a power operator.
  await key("^").click()
  await expect(display).toHaveText("78+−×÷.()^")

  // 2.7: backspace removes the last character.
  await key("⌫").click()
  await expect(display).toHaveText("78+−×÷.()")
  await key("⌫").click()
  await expect(display).toHaveText("78+−×÷.(")

  // 2.6: clear empties the display.
  await key("C").click()
  await expect(display).toHaveText("")

  // 2.3: the keyboard adds digits, operators, the decimal point and brackets.
  await page.keyboard.type("12")
  await expect(display).toHaveText("12")
  await page.keyboard.type("+")
  await expect(display).toHaveText("12+")
  await page.keyboard.type("*")
  await expect(display).toHaveText("12+×")
  await page.keyboard.type("/")
  await expect(display).toHaveText("12+×÷")
  await page.keyboard.type("-")
  await expect(display).toHaveText("12+×÷−")
  await page.keyboard.type(".")
  await expect(display).toHaveText("12+×÷−.")
  await page.keyboard.type("(")
  await expect(display).toHaveText("12+×÷−.(")
  await page.keyboard.type(")")
  await expect(display).toHaveText("12+×÷−.()")
})
