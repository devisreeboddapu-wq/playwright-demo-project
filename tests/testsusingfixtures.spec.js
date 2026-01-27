import { test, expect} from '../fixtures/fixtures';

test('SelectaProduct', async({loggedInPage })=>{

    //Select a product and click on it
    await loggedInPage.locator('#item_4_title_link').click();
    
    //Ensure correct product page is opened
    await expect(loggedInPage.locator('.inventory_details_name.large_size')).toHaveText('Sauce Labs Backpack');

});

test('AddtoCartSelectedproduct', async({loggedInPage})=>{

    //Select a product and click on it
    await loggedInPage.locator('#item_4_title_link').click();
    
    //Ensure correct product page is opened
    await expect(loggedInPage.locator('.inventory_details_name.large_size')).toHaveText('Sauce Labs Backpack');

    //Click Add to cart button
    await loggedInPage.locator('button[id="add-to-cart"]').click();

    //Check add to cart button is changed to remove
    await expect(loggedInPage.locator('button[id="remove"]')).toHaveText('Remove');
});

test('OpenYourCart', async({productaddtocart})=>{

    //Click on Cart icon
    await productaddtocart.locator('id=shopping_cart_container').click();

    //Validate cart open and shows list of item
    await expect(productaddtocart).toHaveURL(/cart.html/);

});

test('Applyfilter', async({loggedInPage}) =>{
    
    await loggedInPage.pause();

    //Click on Filter icon
    await loggedInPage.selectOption('select.product_sort_container','za');

    //Verify filtered list appears
    await expect(loggedInPage.locator('.inventory_container')).toBeVisible();

});