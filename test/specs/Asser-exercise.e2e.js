
import {username, password, userFullName} from '../fixtures.js'

describe('Login And Applications Page', () => {

    beforeEach(() => {
        browser.reloadSession();
        browser.url('/prihlaseni');
    });

    it('should show login page', () => {

        // 1. Políčko a tlačítka pro přihlášení jsou viditelná
        const emailField = $('#email');
        expect(emailField.toBeDisplayed());
        expect(emailField.ToBeEnabled());
        
        // 1. Políčko a tlačítka pro přihlášení jsou viditelná
        const passwordField = $('#password');
        expect(passwordField.toBeDisplayed());
        expect(passwordField.toBeEnabled());

        // 2. Tlačítko pro přihlášení obsahuje správný text
        const loginButton = $('.btn-primary');
        expect(loginButton.getText()).toEqual('Přihlásit');

    });

        // 3. Dobrovolné: ověřte že odkaz na zapomenuté heslo odkazuje na správnou stránku,OVĚŘIT U MONČI
       // const odkaz = $('form').$('a').getAttribute('href');
       // expect(odkaz).toHaveUrl('https:// https://czechitas-luna.herokuapp.com/prihlaseni/zapomenute-heslo');

        //Monča SPRÁVNÉ řešení
        // const odkaz = $('form').$('a').getAttribute('href');
        // expect(odkaz).toEqual(browser.options.baseUrl + '/zapomenute-heslo')

    it('should login with valid credentials', () => {
        
        const emailField = $('#email')
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');
       
        emailField.setValue(username);
        passwordField.setValue(password);
        loginButton.click();
//○ Po přihlášení vidí vpravo nahoře svoje uživatelské jméno
        const userNameDropdown = $('.navbar-right').$('[data-toggle="dropdown"]');
        expect(userNameDropdown.getText()).toEqual(userFullName);
    });

 //3. Test, který ověří, že se uživatel může odhlásit
//○ Uživatel se přihlásí a ověří, že je přihlášen
    it('should logout', () => {
        const emailField = $('#email')
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');

        emailField.setValue(username);
        asswordField.setValue(password);
        loginButton.click();
    
        const userNameDropdown = $('.navbar-right').$('[data-toggle="dropdown"]');
        expect(userNameDropdown.getText()).toEqual(userFullName);
//○ Uživatel se odhlásí a ověří, že je odhlášen
        userNameDropdown.click();
        $('#logout-link').click();

        const loginLink = $('#login');
        expect(loginLink.getText()).toEqual('Přihlásit')

        loginLink.click();
        expect(emailField).toBeDisplayed();
        expect(passwordField).toBeDisplayed();
        expect(loginButton).toBeDisplayed();
});
});

//4. Test, který přejde na stránku Přihlášky a ověří, že uživatel vidí správné přihlášky
        // přechod na stránku s kurzy
describe("Applications Page - excercise 4", () => {

    beforeEach(() => {
        browser.reloadSession();
        browser.url('/prihlaseni');
        $('#email').setValue(username);
        $('#password').setValue(password);
        $('.btn-primary').click();
        $('=Přihlášky').click();
    });

        /* 4. Obsahuje správný počet přihlášek/5. Každá přihláška obsahuje:
        a. jméno účastníka
        b. kategorii kurzu
        c. datum konání
        d. cenu
        Tip: k assertaci textového obsahu podle nějakého vzoru můžete použít regulární výrazy a metodu toMatch*/

    it("Should list all applications", () => {
        const rows = $('.dataTable').$('tbody').$$('tr')
        expect(rows).toBeElementsArrayOfSize(4);
        rows.forEach(row => {
            const cols = row.$$('td');
            expect(cols[0].getText()).toMatch(/[a-zA-Z]{3,}/);
            expect(cols[1].getText()).toMatch(/(Python|JavaScript|Automatizované testování)/);
            expect(cols[2].getText()).toMatch(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
            expect(cols[3].getText()).toMatch(/\d{1,3}(| \d{0,3}) Kč/);
        });
    });


        // Bonus - filtrování tabulky
    it("Should filter all applictons", () => { 
        const searchText = 'Novák';
        $('input[type="search"]').setValue(searchText);
        const filteredRows = $('.dataTable').$('tbody').$$('tr');
        console.log('There are ' + filteredRows.length + ' filtered rows in the table');
        filteredRows.forEach(row => {
            const cols = row.$$('td');
            expect(cols[0]).toHaveTextContaining(searchText);
        });

    });
    
});