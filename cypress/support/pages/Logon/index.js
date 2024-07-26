const el = require('./elements').ELEMENTS;


class Logon {
    acessarLogin() {
        cy.visit('/');
    }

    preencherLogin() {
        cy.get(el.id).type(Cypress.env('createdOngId'));
        cy.get(el.buttonLogin).click();
    }

}

export default new Logon();