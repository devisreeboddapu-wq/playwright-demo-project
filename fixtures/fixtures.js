import {test as base, expect} from '@playwright/test'

export const test= base.extend({

//Fixture 1: extend the base test with a loggedInPage fixture
    loggedInPage: async({page},use)=>{

    //login to site
    await page.goto('https://www.saucedemo.com/')

    //validate user is redirected to correct page
    await expect(page).toHaveTitle('Swag Labs')

    //enter username
    await page.fill('id=user-name','standard_user')

    //validate entered username has entered text correctly
    await expect(page.locator('id=user-name')).toHaveValue('standard_user')

    //enter password
    await page.locator('input[name="password"]').fill('secret_sauce')
    
    //validate entered password has entered text correctly
    await expect(page.locator('input[name="password"]')).toHaveValue('secret_sauce')

    //click login
    await page.locator('#login-button').click();

    //validate user is logged in
    await expect(page).toHaveURL(/inventory.html/)

    // Expose the logged-in page to tests
    await use(page);

    },

//Fixture 2: extend the base test with a productaddtocart fixture

    productaddtocart: async({loggedInPage},use)=>{

    //Select a product and click on it
    await loggedInPage.locator('#item_4_title_link').click();
    
    //Ensure correct product page is opened
    await expect(loggedInPage.locator('.inventory_details_name.large_size')).toHaveText('Sauce Labs Backpack');

    //Click Add to cart button
    await loggedInPage.locator('button[id="add-to-cart"]').click();

    //Check add to cart button is changed to remove
    await expect(loggedInPage.locator('button[id="remove"]')).toHaveText('Remove');

    // Expose the logged-in page to tests
    await use(loggedInPage);

    },

});

export { expect } from '@playwright/test';