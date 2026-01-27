import BasePage from '..//pages/basepage'

class LoginPage extends BasePage{
    
    constructor(page){

        super(page);
        this.usernameInput= '#user-name';
        this.passwordInput='input[name="password"]';
        this.loginButton='#login-button';

        }

    async login(username, password) {

    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);

  }
}

module.exports = LoginPage;

