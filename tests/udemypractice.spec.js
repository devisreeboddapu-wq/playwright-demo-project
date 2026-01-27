import { test, expect } from "@playwright/test";

test("LoadDemosite", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/");
  const pagetitle = await page.title();
  console.log(pagetitle);
  await expect(page).toHaveTitle(pagetitle);
});

test("RegisterUser", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator('a[href="#/auth/register"]').click();
  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/client/#/auth/register"
  );
  await page.pause();
  await page.locator("#firstName").fill("Test2");
  await page.locator("#lastName").fill("User2");
  await page.locator("#userEmail").fill("testuser1@yzx.com");
  const useremailinput = await page.locator("#userEmail").inputValue();
  await page.locator("#userMobile").fill("8671234905");
  await page.getByRole("combobox").selectOption("2: Student");
  await page.locator('input[type="radio"][value="Female"]').click();
  await page.locator("#userPassword").fill("Xyz@123456");
  const password = await page.locator("#userPassword").inputValue();
  await page.locator("#confirmPassword").fill(password);
  await page.locator('input[type="checkbox"]').click();
  await page.locator("#login").click();
  //const successmessage= await page.locator('.headcolor').textContent()
  //await expect(page).toHaveText(successmessage)
  await page.waitForLoadState("domcontentloaded");
  await page.getByRole("button", { name: "Login" }).click();
  await page.locator("#userEmail").fill(useremailinput);
  await page.locator("#userPassword").fill(password);
});

test("Mainpage", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/");
  const message = await page.locator(".blink_me").textContent();
  await expect(page.locator(".blink_me")).toHaveText(message);
  console.log(message);
});

test("Newpageredirect", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentlink = page.locator('[href*="documents-request"]');
  const documentlinktext = await page
    .locator('[href*="documents-request"]')
    .getAttribute("href");
  console.log(documentlinktext);
  const [newpage] = await Promise.all([
    context.waitForEvent("page"),
    documentlink.click(),
  ]);
  const documentrequest = await newpage.locator(".red").textContent();
  const leftmessage = documentrequest.split("@");
  const emailid = leftmessage[1].split(" ");
  const inputvalue = emailid[0];
  console.log(inputvalue);
});

test("E2ETest", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("learning");
  await page.getByRole("radio", { name: "user" }).check();
  expect(page.getByRole("radio", { name: "user" })).toBeTruthy();
  await page.locator("button#okayBtn").click();
  await page.getByRole("combobox").selectOption("stud");
  await page.getByRole("checkbox", { name: "terms" }).check();
  await expect(page.getByRole("checkbox", { name: "terms" })).toBeChecked();
  await page.locator("#signInBtn").click();
  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/angularpractice/shop"
  );
  await page.locator(".card-body").first().waitFor();
  const products = page.locator(".card-body");
  const count = await products.count();
  console.log(count);
  const productName = "Nokia Edge";
  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("a").textContent()) === productName) {
      await page.locator(".btn-info").nth(i).click();
      break;
    }
  }
  await page.locator(".btn-primary").click();
  await page.locator(".col-sm-8").first().waitFor();
  const checkout = page.locator(".col-sm-8");
  const itemcount = await checkout.count();
  console.log(itemcount);
  for (let i = 0; i < itemcount; i++) {
    if ((await checkout.locator("h4 a").nth(i).textContent()) === productName) {
      await page.locator(".btn-success").click();
      break;
    }
  }

  await page.locator("#country").pressSequentially("ind", { delay: 150 });
  const dropdown = page.locator(".suggestions ul li");
  await dropdown.first().waitFor();
  const dropdowncount = await dropdown.count();
  console.log(dropdowncount);
  const country = "India";
  for (let i = 0; i < dropdowncount; i++) {
    if ((await dropdown.nth(i).locator("a").textContent()) === country) {
      await dropdown.nth(i).locator("a").click();
      break;
    }
    const value1 = await page.locator("#country").textContent();
    expect(value1).toContain(country);
  }
  //await page.getByLabel("checkbox2").check();
  //await expect(page.locator(".checkbox")).toBeChecked();
  await page.locator(".btn-success").click();
  const successmessage = await page.locator(".alert-success").textContent();
  expect(page.locator(".alert-success")).toHaveText(successmessage);
  await page.getByRole("link", { name: "ProtoCommerce Home" }).first().click();
  expect(page).toHaveURL("https://rahulshettyacademy.com/angularpractice/");
});

test("Calendarinput", async ({ page }) => {
  const dd = "28";
  const mm = "9";
  const yyyy = "2020";
  const input=[mm,dd,yyyy]
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers/");
  await page.locator(".react-date-picker__inputGroup").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.locator(".react-calendar__navigation__arrow").nth(1).click()
  await page
    .locator(".react-calendar__decade-view__years__year")
    .getByText(yyyy)
    .click();
  await page
    .locator(".react-calendar__year-view__months__month")
    .nth(Number(mm - 1))
    .click();
  await page.locator('//abbr[text()='+dd+']').last().click();
  const input1= page.locator('.react-date-picker__inputGroup__input')
  for(let i=0;i<input.length;i++){
  const value= await input1.nth(i).inputValue()
  expect(value).toEqual(input[i])
  }
});

test.only("Using advanced locators", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/shop");
  const productname = await page
    .locator(".card-body")
    .filter({ hasText: "Blackberry" })
    .textContent();
  console.log(productname);
  await expect(page.getByText("Blackberry")).toContainText("Blackberry");
  await page.locator("button", { name: "Add" }).last().click();
  await page.locator('//a[contains(text(),"Checkout")]').click();
  await expect(page.getByText("Blackberry")).toContainText("Blackberry");
  await page.getByRole("button", { name: "Continue Shopping" }).click();
  await expect(page.locator(".col-md-6")).toHaveCount(4);
  await page.getByText("Category 1").click();
  await expect(page).toHaveScreenshot("Capture.png");
});
