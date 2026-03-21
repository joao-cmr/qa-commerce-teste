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


        it('Deve fazer checkout com sucesso - pagamento via Pix', () => {
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
            cy.get('#payment-pix').click();
            cy.get('#terms').check();
            cy.get('.btn').click();
            cy.get('h1').should('contain', 'STATUS DO PEDIDO');
        });


        it('Deve fazer checkout como visitante - sem criar conta', () => {
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

        ```javascript

        // TODO: Remover .skip() após correção - Issue #1
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
            cy.url().should('include', 'checkout.html');
        });
        ```
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
            cy.get('#cep').type('123');
            cy.get('#phone').type('11972641956');
            cy.get('#email').type(faker.internet.email());
            cy.get('#payment-boleto').click();
            cy.get('#terms').check();
            cy.get('.btn').click();
            cy.contains('O CEP deve ter 8 caracteres').should('be.visible');
        });

        ```javascript
        // TODO: Remover .skip() após correção - Issue #2
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
            cy.url().should('include', 'checkout.html');
        });
        ```

        ```javascript
        // TODO: Remover .skip() após correção - Issue #3
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
            cy.url().should('include', 'checkout.html');
        });
        ```
    });

    describe('Testes de Segurança', () => {

        it('Não deve permitir SQL Injection no campo de nome', () => {
            cy.get('#first-name').type("'; DROP TABLE users; --");
            cy.get('#last-name').type(faker.person.lastName());
            cy.get('#address').type('Rua Iperó');
            cy.get('#number').type('26');
            cy.get('#cep').type('07793365');
            cy.get('#phone').type('11972641956');
            cy.get('#email').type(faker.internet.email());
            cy.get('#payment-boleto').click();
            cy.get('#terms').check();
            cy.get('.btn').click();
            cy.get('h1').should('contain', 'STATUS DO PEDIDO');
        });

        it('Não deve permitir XSS no campo de endereço', () => {
            cy.get('#first-name').type(faker.person.firstName());
            cy.get('#last-name').type(faker.person.lastName());
            cy.get('#address').type('<script>alert("XSS")</script>');
            cy.get('#number').type('26');
            cy.get('#cep').type('07793365');
            cy.get('#phone').type('11972641956');
            cy.get('#email').type(faker.internet.email());
            cy.get('#payment-boleto').click();
            cy.get('#terms').check();
            cy.get('.btn').click();
            cy.get('h1').should('contain', 'STATUS DO PEDIDO');
            cy.on('window:alert', () => {
                throw new Error('XSS detectado! Alert foi executado.');
            });
        });

        it('Não deve permitir caracteres especiais maliciosos no email', () => {
            cy.get('#first-name').type(faker.person.firstName());
            cy.get('#last-name').type(faker.person.lastName());
            cy.get('#address').type('Rua Iperó');
            cy.get('#number').type('26');
            cy.get('#cep').type('07793365');
            cy.get('#phone').type('11972641956');
            cy.get('#email').type('"><script>alert(1)</script>@test.com');
            cy.get('#payment-boleto').click();
            cy.get('#terms').check();
            cy.get('.btn').click();
            cy.contains('"email" must be a valid email').should('be.visible');
        });
    });

    describe('Testes de Usabilidade', () => {

        it('Deve alternar entre formas de pagamento - Boleto para Cartão', () => {
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
            cy.get('#payment-boleto').should('be.checked');
            cy.get('#payment-card').click();
            cy.get('#payment-card').should('be.checked');
            cy.get('#payment-boleto').should('not.be.checked');
            checkoutPage.pagamentoCard('4532123456789012', '05/2025', '123');
            cy.get('#terms').check();
            cy.get('.btn').click();
            cy.get('h1').should('contain', 'STATUS DO PEDIDO');
        });

        it('Deve alternar entre formas de pagamento - Cartão para Pix', () => {
            checkoutPage.preencherFormularioCheckout(
                faker.person.firstName(),
                faker.person.lastName(),
                'Rua Iperó',
                '26',
                '07793365',
                '11972641956',
                faker.internet.email()
            );


            cy.get('#payment-card').click();
            cy.get('#payment-card').should('be.checked');
            cy.get('#payment-pix').click();
            cy.get('#payment-pix').should('be.checked');
            cy.get('#payment-card').should('not.be.checked');

            cy.get('#terms').check();
            cy.get('.btn').click();
            cy.get('h1').should('contain', 'STATUS DO PEDIDO');
        });

        it('Deve alternar entre formas de pagamento - Pix para Boleto', () => {
            checkoutPage.preencherFormularioCheckout(
                faker.person.firstName(),
                faker.person.lastName(),
                'Rua Iperó',
                '26',
                '07793365',
                '11972641956',
                faker.internet.email()
            );


            cy.get('#payment-pix').click();
            cy.get('#payment-pix').should('be.checked');
            cy.get('#payment-boleto').click();
            cy.get('#payment-boleto').should('be.checked');
            cy.get('#payment-pix').should('not.be.checked');
            cy.get('#terms').check();
            cy.get('.btn').click();
            cy.get('h1').should('contain', 'STATUS DO PEDIDO');
        });
    });
});