const el = require('./elements').ELEMENTS;

class Register {
    acessarCadastro() {
        cy.visit('/register');
    }

    preencherCadastro() {
        cy.get(el.name).type('Dogs queridos');
        cy.get(el.email).type('dog@mail.com');
        cy.get(el.whatsApp).type('31993344565');
        cy.get(el.city).type('Belo Horizonte');
        cy.get(el.uf).type('MG');

        cy.intercept('POST', '**/ongs').as('postOng');

        cy.get(el.buttonSubmit).click();
    }

    validarCadastro() {
        cy.wait('@postOng').then(xhr => {
            expect(xhr.response.statusCode).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        });
    }
}

export default new Register();