import {username, password, userFullName} from '../fixtures.js'

describe('Login Page - excercise 4', () => {

    //toto musí běžet před každým testem
    beforeEach(() => {
        browser.reloadSession();
        browser.url('/prihlaseni');
    });
//1. Test, který ověří defaultní stav přihlašovací stránky a vyhledávače
//○ Přihlašovací políčka jsou “enabled” a v defaultním stavu v nich není nic zadáno
//○ Přihlašovací tlačítko je “enabled” a obsahuje správný text
    it('should show login page', () => {

        const emailField = $('#email');
        expect(emailField).toBeDisplayed();
        expect(emailField).toBeEnabled();

        const passwordField = $('#password');
        expect(passwordField).toBeDisplayed();
        expect(passwordField).toBeEnabled();

        const loginButton = $('.btn-primary');
        expect(loginButton.getText()).toEqual('Přihlásit');
    });
//2.Test, který ověří že po vyplnění přihlašovacích údajů je uživatel přihlášen

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
        passwordField.setValue(password);
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
/*4. Test, který přejde na stránku Přihlášky a ověří, že uživatel vidí správné přihlášky
○ Na stránce vidí nadpis Přihlášky
○ Všechny položky obsahují
i. jméno účastníka
ii. kategorii kurzu
iii. datum konání
iv. cenu
○ Kolik je řádek v tabulce je nám v tuto chvíli jedno, ale bylo by vhodná
zkontrolovat, že na stránce je alespoň jedna přihláška
*/
describe('Applications Page - excercise 4', () => {

    beforeEach(() => {
        browser.reloadSession();
        browser.url('/prihlaseni');
        $('#email').setValue(username);
        $('#password').setValue(password);
        $('.btn-primary').click();
        $('=Přihlášky').click();
    });
    
//Test, který přejde na stránku Přihlášky a ověří, že uživatel vidí správné přihlášky
    it('should list all applications', () => {    
        const rows = $('.dataTable').$('tbody').$$('tr');
        expect(rows).toBeElementsArrayOfSize(4);
        rows.forEach(row => {
            const cols = row.$$('td');
            expect(cols[0].getText()).toMatch(/[a-zA-Z]{3,}/);
            expect(cols[1].getText()).toMatch(/(Python|JavaScript|Automatizované testování)/);
            expect(cols[2].getText()).toMatch(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
            expect(cols[3].getText()).toMatch(/\d{1,3}(| \d{0,3}) Kč/);
        });
    });
/* 5. Test, který ověří funkci vyhledávání v tabulce přihlášek
○ Když do vyhledávání zadám nějaké klíčové slovo, dostanu k němu
relevantní přihlášky
○ Formát zobrazení přihlášek je nám v tuto chvíli jedno */
    it('should filter in applications', () => {
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