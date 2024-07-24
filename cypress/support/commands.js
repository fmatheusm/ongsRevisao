// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createOng', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/ongs',
        body: {
            city: "Belo Horizonte",
            email: "dog@mail.com",
            name: "Dogs queridos",
            uf: "MG",
            whatsapp: "31993344565"
        }
    }).then(response => {
        expect(response.body.id).is.not.null;
        Cypress.env('createdOngId', response.body.id);
    });
});

Cypress.Commands.add('login', () => {
    cy.visit('http://localhost:3000/profile', {
        onBeforeLoad: (browser) => {
            browser.localStorage.setItem('ongId', Cypress.env('createdOngId'))
            browser.localStorage.setItem('ongName', 'Dogs queridos')
        }
    });
});

Cypress.Commands.add('createNewIncident', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/incidents',
        headers: { 'Authorization': `${Cypress.env('createdOngId')}` },
        body: {
            description: "Animal precisa de apoio para ter onde morar.",
            title: "Animal abandonado",
            value: "200"
        }
    }).then(response => {
        cy.log(response.body.id);
        expect(response.body.id).is.not.null;

        Cypress.env('createdIncidentId', response.body.id);
    });
});