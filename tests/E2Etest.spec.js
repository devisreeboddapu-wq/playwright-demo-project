import { test, expect } from "@playwright/test";

test("login", async ({ page }) => {
  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/login",
  );
  await expect(page).toHaveTitle("Account Login");
});

test.only("User Account Creation", async ({ page }) => {
  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/login",
  );
  await page.getByText("Continue").click();
  await expect(page).toHaveTitle("Register Account");
  await page.getByPlaceholder("First Name").fill("TestUser1");
  const firstname = await page.getByPlaceholder("First Name").inputValue();
  await expect(page.getByPlaceholder("First Name")).toHaveValue(firstname);
  await page.getByPlaceholder("Last Name").fill("Maddy");
  const lastname = await page.getByPlaceholder("Last Name").inputValue();
  await expect(page.getByPlaceholder("Last Name")).toHaveValue(lastname);
  await page.getByPlaceholder("E-Mail").fill("testuser1@xyz.com");
  const email = await page.getByPlaceholder("E-Mail").inputValue();
  await expect(page.getByPlaceholder("E-Mail")).toHaveValue(email);
  await page.getByPlaceholder("Telephone").fill("123456789");
  const telephone = await page.getByPlaceholder("Telephone").inputValue();
  await expect(page.getByPlaceholder("Telephone")).toHaveValue(telephone);
  await page.getByPlaceholder("Password").first().fill("password@123");
  const password = await page.getByPlaceholder("Password").first().inputValue();
  await expect(page.getByPlaceholder("Password").first()).toHaveValue(password);
  await page.getByPlaceholder("Password Confirm").fill(password);
  await expect(page.getByPlaceholder("Password Confirm")).toHaveValue(password);
  await page.getByRole("radio", { name: "Yes" }).check();
  await expect(page.getByRole("radio", { name: "Yes" })).toBeChecked();
  await page.locator('input[name="agree"]').click();
  expect(page.locator('input[name="agree"]')).toBeTruthy();
});
