/// <reference types="cypress" />

describe('Ongs', () => {
    it.skip('devem poder realizer um cadastro', () => {
        cy.visit('localhost:3000/register');
        cy.get('[data-cy=name]').type('Dogs queridos');
        cy.get('[data-cy=email]').type('dog@mail.com');
        cy.get('[data-cy=whatsapp]').type('31993344565');
        cy.get('[data-cy=city]').type('Belo Horizonte');
        cy.get('[data-cy=uf]').type('MG');

        cy.intercept('POST', '**/ongs').as('postOng');

        cy.get('[data-cy=submit]').click();

        cy.wait('@postOng').then(xhr => {
            expect(xhr.response.statusCode).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        });
    });

    it.skip('deve poder realizar um login no sistema', () => {
        cy.visit('localhost:3000');
        cy.get('input[data-cy=id]').type(Cypress.env('createdOngId'));
        cy.get('button[type=submit]').click();
    });

    it('deve fazer logout', () => {
        cy.login();
        cy.get('[data-cy="button-logout"]').click();
    });
});

//e81b4132