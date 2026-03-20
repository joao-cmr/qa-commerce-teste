/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import checkoutPage from '../support/page-objects/checkout-page';

describe('Testes da funcionalidade de checkout', () => {

    beforeEach(() => {
        cy.visit('checkout.html');
    });

    describe('Cenários de Sucesso', () => {

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

        it('Deve fazer checkout com sucesso - usando pages', () => {
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

        it('Deve fazer checkout com sucesso - pagamento no cartão', () => {
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
            checkoutPage.pagamentoCard(
                '4532123456789012',
                '05/2025',
                '123'
            );
            cy.get('#terms').check();
            cy.get('.btn').click();
            cy.get('h1').should('contain', 'STATUS DO PEDIDO');
        });
    });

    describe('Validações de Erro - Prioridade Crítica (P0)', () => {

    it('Não deve permitir finalizar checkout com campos obrigatórios vazios', () => {
        cy.get('.btn').click();
        cy.contains('Você deve concordar com os termos e condições').should('be.visible');
        cy.contains('Este campo é obrigatório.').should('be.visible');
    });

    it('Não deve permitir finalizar checkout sem aceitar os termos', () => {
        checkoutPage.preencherFormularioCheckout(
            faker.person.firstName(),
            faker.person.lastName(),
            'Rua Iperó',
            '26',
            '07793365',
            '11972641956',
            faker.internet.email()
        );
        cy.get('#payment-boleto').click();
        cy.get('.btn').click();
        cy.contains('Você deve concordar com os termos e condições').should('be.visible');
    });

    it('Não deve permitir criar conta quando senhas não conferem', () => {
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
        cy.get('#confirm-password').type('SenhaDiferente123*');
        cy.get('#payment-boleto').click();
        cy.get('#terms').check();
        cy.get('.btn').click();
        cy.contains('As senhas não coincidem').should('be.visible');
    });

    it.skip('Não deve processar pagamento com número de cartão inválido', () => {
        checkoutPage.preencherFormularioCheckout(
            faker.person.firstName(),
            faker.person.lastName(),
            'Rua Iperó',
            '26',
            '07793365',
            '11972641956',
            faker.internet.email()
        );
        checkoutPage.pagamentoCard(
            '1234567890123456',
            '05/2025',
            '123'
        );

        cy.get('#terms').check();
        cy.get('.btn').click();
        cy.screenshot('cartao-invalido');
        cy.url().should('include', 'checkout.html');
    });
});

    describe('Validações de Erro - Prioridade Alta (P1)', () => {

    it('Não deve aceitar email com formato inválido', () => {
        cy.get('#first-name').type(faker.person.firstName());
        cy.get('#last-name').type(faker.person.lastName());
        cy.get('#address').type('Rua Iperó');
        cy.get('#number').type('26');
        cy.get('#cep').type('07793365');
        cy.get('#phone').type('11972641956');
        cy.get('#email').type('emailinvalido.com');
        cy.get('#payment-boleto').click();
        cy.get('#terms').check();
        cy.get('.btn').click();
        cy.contains('Por favor, insira um email válido').should('be.visible');
    });

    it('Não deve aceitar CEP inválido', () => {
        cy.get('#first-name').type(faker.person.firstName());
        cy.get('#last-name').type(faker.person.lastName());
        cy.get('#address').type('Rua Iperó');
        cy.get('#number').type('26');
        cy.get('#cep').type('123'); // CEP incompleto
        cy.get('#phone').type('11972641956');
        cy.get('#email').type(faker.internet.email());
        cy.get('#payment-boleto').click();
        cy.get('#terms').check();
        cy.get('.btn').click();
        cy.contains('O CEP deve ter 8 caracteres').should('be.visible');
    });

    it.skip('Não deve processar cartão com data de validade expirada', () => {
        checkoutPage.preencherFormularioCheckout(
            faker.person.firstName(),
            faker.person.lastName(),
            'Rua Iperó',
            '26',
            '07793365',
            '11972641956',
            faker.internet.email()
        );
        checkoutPage.pagamentoCard(
            '4532123456789012',
            '05/2020', 
            '123'
        );
        cy.get('#terms').check();
        cy.get('.btn').click();
        cy.screenshot('cartao-expirado');
        cy.url().should('include', 'checkout.html');
    });

    it.skip('Não deve processar cartão com CVV inválido', () => {
        checkoutPage.preencherFormularioCheckout(
            faker.person.firstName(),
            faker.person.lastName(),
            'Rua Iperó',
            '26',
            '07793365',
            '11972641956',
            faker.internet.email()
        );
        checkoutPage.pagamentoCard(
            '4532123456789012',
            '05/2025',
            '12' 
        );
        cy.get('#terms').check();
        cy.get('.btn').click();
        cy.screenshot('cvv-invalido');
        cy.url().should('include', 'checkout.html');
    });
});
});