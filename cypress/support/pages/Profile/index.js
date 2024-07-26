const el = require('./elements').ELEMENTS;

class Profile {
    clicarNoBotaoLogout() {
        cy.get(el.buttonLogout).click();
    }

    clicarNoBotaoCadastrarNovoCaso() {
        cy.get(el.buttonIncidente).click();
    }

}

export default new Profile();