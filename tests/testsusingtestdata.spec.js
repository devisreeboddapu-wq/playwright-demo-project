import {test,expect} from '@playwright/test'
import testData from '../testdata/testdata.json'; 

test.describe('Valid Users', () => {

for (const data of testData.filter(d => d.valid)) {
  test(`ValidUsers for ${data.username}`,async ({ page }) => {

    //login to site
    await page.goto('https://www.saucedemo.com/')

    //validate user is redirected to correct page
    await expect(page).toHaveTitle('Swag Labs')

    //enter username
    await page.fill('id=user-name',data.username)

    //validate entered username has entered text correctly
    await expect(page.locator('id=user-name')).toHaveValue(data.username)

    //enter password
    await page.locator('input[name="password"]').fill(data.password)
    
    //validate entered password has entered text correctly
    await expect(page.locator('input[name="password"]')).toHaveValue(data.password)

    //click login without entering password
    await page.locator('#login-button').click();

    //validate user is logged in
    await expect(page).toHaveURL(/inventory.html/)
  });
}
});

test.describe('Invalid Users', () => {

for (const data of testData.filter(d => d.type==='invalid')) {
  test(`InvalidUsers for ${data.username}`, async ({ page }) => {

    //login to site
    await page.goto('https://www.saucedemo.com/')

    //validate user is redirected to correct page
    await expect(page).toHaveTitle('Swag Labs')

    //enter username
    await page.fill('id=user-name',data.username)

    //validate entered username has entered text correctly
    await expect(page.locator('id=user-name')).toHaveValue(data.username)

    //enter password
    await page.locator('input[name="password"]').fill(data.password)
    
    //validate entered password has entered text correctly
    await expect(page.locator('input[name="password"]')).toHaveValue(data.password)

    //click login without entering password
    await page.locator('#login-button').click();

    //error message alert 
    await expect(page.locator('h3[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service')

  });
}
});


test.describe('Locked User', () => {

  for (const data of testData.filter(d => d.type==='locked')) {
  test(`LockedUser for ${data.username}`, async ({ page }) => {

     //login to site
    await page.goto('https://www.saucedemo.com/')

    //validate user is redirected to correct page
    await expect(page).toHaveTitle('Swag Labs')

    //enter username
    await page.fill('id=user-name',data.username)

    //validate entered username has entered text correctly
    await expect(page.locator('id=user-name')).toHaveValue(data.username)

    //enter password
    await page.locator('input[name="password"]').fill(data.password)
    
    //validate entered password has entered text correctly
    await expect(page.locator('input[name="password"]')).toHaveValue(data.password)

    //click login without entering password
    await page.locator('#login-button').click();

    //error message alert
    await expect(page.locator('h3[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.')

  });
 }
});