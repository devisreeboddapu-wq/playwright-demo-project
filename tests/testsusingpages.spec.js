import LoginPage from '..//pages/loginpage'
import {test, expect} from '@playwright/test'

test('loginusingpages', async({page})=> {

    const loginpage= new LoginPage(page);

  await loginpage.navigate('https://www.saucedemo.com/');
  await loginpage.login('standard_user', 'secret_sauce');

});
