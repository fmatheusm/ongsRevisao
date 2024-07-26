/// <reference types="cypress" />

import Logon from "../support/pages/Logon";
import Register from "../support/pages/Register";
import Profile from "../support/pages/Profile";
import NewIncident from "../support/pages/NewIncident";

describe('Ongs', () => {
    it('devem poder realizer um cadastro', () => {
        Register.acessarCadastro();
        Register.preencherCadastro();
        Register.validarCadastro();
    });

    it('deve poder realizar um login no sistema', () => {
        Logon.acessarLogin();
        Logon.preencherLogin();
    });

    it('deve fazer logout', () => {
        cy.login();
        Profile.clicarNoBotaoLogout();
    });

    it('devem poder cadastrar novos casos', () => {
        cy.login();
        Profile.clicarNoBotaoCadastrarNovoCaso();
        NewIncident.preencherCadastroDeCaso();
        NewIncident.validarCadastroDeCaso();
    });

    it.only('deve poder excluir um caso', () => {
        cy.createNewIncident()
        cy.login()

        cy.intercept('DELETE', '**/incidents/*').as('deleteIncidente')

        cy.get('[data-cy="button-delete"]').click();

        cy.wait('@deleteIncidente').then(xhr => {
            expect(xhr.response.statusCode).to.eq(204);
            expect(xhr.response.body).to.be.empty;
        });
    });
});