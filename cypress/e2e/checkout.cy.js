/// <reference types="cypress" />

describe('Testes da funcionalidade de checkout', () => {

    beforeEach(() => {
        cy.visit('checkout.html');
    });

    it.only('Deve preencher o formulário de checkout com sucesso', () => {
        cy.get('#first-name').type('João Carlos');
        cy.get('#last-name').type('M. Rodrigues');
        cy.get('#address').type('Rua Iperó')
        cy.get('#number').type('26');
        cy.get('#cep').type('07793365');
        cy.get('#phone').type('11972641956');
        cy.get('#email').type('teste6@gmail.com.br');
        cy.get('#create-account').click();
        cy.get('#password').type('180524Jc*');
        cy.get('#confirm-password').type('180524Jc*');
        cy.get('#payment-boleto').click();
        cy.get('#terms').check();
        cy.get('.btn').click();
        cy.get('h1').should('contain', 'STATUS DO PEDIDO');

    });
})

