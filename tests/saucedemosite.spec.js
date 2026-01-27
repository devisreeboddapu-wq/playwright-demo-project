import {test,expect} from '@playwright/test'

test('loginwithvaliduser', async({page})=>{
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
});


test('verifypasswordisempty', async({page})=>{
    //login to site
    await page.goto('https://www.saucedemo.com/')

    //validate user is redirected to correct page
    await expect(page).toHaveTitle('Swag Labs')

    //enter username
    await page.fill('id=user-name','standard_user')

    //validate entered username has entered text correctly
    await expect(page.locator('id=user-name')).toHaveValue('standard_user')

    //click login without entering password
    await page.locator('#login-button').click();

    //error message alert
    await expect(page.locator('h3[data-test="error"]')).toHaveText('Epic sadface: Password is required')

});

test('usernameleftempty', async({page})=>{

    //login to site
    await page.goto('https://www.saucedemo.com/')

    //validate user is redirected to correct page
    await expect(page).toHaveTitle('Swag Labs')

    //click login without entering username
    await page.locator('#login-button').click();

    //error message alert 
    await expect(page.locator('h3[data-test="error"]')).toHaveText('Epic sadface: Username is required')

});



