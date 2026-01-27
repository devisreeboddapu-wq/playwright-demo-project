import{test,expect} from '@playwright/test';

test('loginpagesite', async({page})=>{
await page.goto('https://www.google.com/');
await expect(page).toHaveTitle(/Google/);
});

test('searchbytext', async({page}) =>{
    await page.goto('https://www.google.com/');
    await page.pause();
    await page.locator('[name="q"]').click();
    await page.fill('[name="q"]','playwright');
    await page.click('ul[role="listbox"] li:nth-child(5)');
    await page.waitForURL(/search/);
    await expect(page).toHaveTitle(/playwright/i);
})