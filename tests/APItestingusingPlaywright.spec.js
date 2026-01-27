import { test, expect, request } from "@playwright/test";

const loginpayload = {
  userEmail: "testuser1@yzx.com",
  userPassword: "Xyz@123456",
};
let token;

const createorderpayload = {
  orders: [
    { country: "Argentina", productOrderedId: "68a961459320a140fe1ca57a" },
  ],
};
let orderID;

//Login API
test.only("APITesting", async ({}) => {
  const apicontext = await request.newContext();
  const loginresponse = await apicontext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginpayload,
    }
  );
  expect(loginresponse.ok()).toBeTruthy();
  const loginresponsejson = await loginresponse.json();
  token = loginresponsejson.token;
  console.log(token);

  //Placeorder API
  const placeorderresponse = await apicontext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: createorderpayload,
      headers: { Authorization: token, "Content-Type": "application/json" },
    }
  )
  expect(placeorderresponse.status()).toBe(201);
  const placeorderjsonresponse = await placeorderresponse.json();
  orderID = placeorderjsonresponse.orders[0];
  console.log(placeorderjsonresponse);
});

test("API2Webtesting", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client/");
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  await page
    .locator(".card-body")
    .filter({ hasText: "ZARA COAT 3" })
    .getByRole("button", { name: "Add to Cart" })
    .click();
});

/*test('PlaceOrder', async({})={
 let apicontext = await request.newContext()
  await apicontext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
    data: orderdetails,
    Headers: {'authorization': token}
  })*/
