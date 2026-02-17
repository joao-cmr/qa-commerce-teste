/// <reference types="cypress" />
import  {  faker  }  from  '@faker-js/faker' ;
import checkoutPage from '../support/page-objects/checkout-page';

describe('Testes da funcionalidade de checkout', () => {

    beforeEach(() => {
        cy.visit('checkout.html');
    });

    it('Deve preencher o formulário de checkout com sucesso', () => {

        var email = `teste${Date.now()}@gmail.com.br`;

        cy.get('#first-name').type('João Carlos');
        cy.get('#last-name').type('M. Rodrigues');
        cy.get('#address').type('Rua Iperó')
        cy.get('#number').type('26');
        cy.get('#cep').type('07793365');
        cy.get('#phone').type('11972641956');
        cy.get('#email').type(email);
        cy.get('#create-account').click();
        cy.get('#password').type('180524Jc*');
        cy.get('#confirm-password').type('180524Jc*');
        cy.get('#payment-boleto').click();
        cy.get('#terms').check();
        cy.get('.btn').click();
        cy.get('h1').should('contain', 'STATUS DO PEDIDO');

    });

    it('Deve fazer checkout com sucesso - usando faker - sem otimização', () => {
        cy.get('#first-name').type(faker.person.firstName());
        cy.get('#last-name').type(faker.person.lastName());
        cy.get('#address').type('Rua Iperó')
        cy.get('#number').type('26');
        cy.get('#cep').type('07793365');
        cy.get('#phone').type('11972641956');
        cy.get('#email').type(faker.internet.email());
        cy.get('#create-account').click();
        cy.get('#password').type('180524Jc*');
        cy.get('#confirm-password').type('180524Jc*');
        cy.get('#payment-boleto').click();
        cy.get('#terms').check();
        cy.get('.btn').click();
        cy.get('h1').should('contain', 'STATUS DO PEDIDO');

        
    });

    it.only('Deve fazer checkout com sucesso - usando pages', () => {
        checkoutPage.preencherFormularioCheckout(
            faker.person.firstName(),
            faker.person.lastName(),
            'Rua Iperó',
            '26',
            '07793365',
            '11972641956',
            faker.internet.email()
        );
        cy.get('#create-account').click();
        cy.get('#password').type('180524Jc*');
        cy.get('#confirm-password').type('180524Jc*');
        cy.get('#payment-boleto').click();
        cy.get('#terms').check();
        cy.get('.btn').click();
        cy.get('h1').should('contain', 'STATUS DO PEDIDO');
    });
});

