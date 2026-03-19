/// <reference types="cypress" />

describe('Testes da funcionalidade vitrine', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.get('.card-img-top', { timeout: 10000 }).should('be.visible');
    });

    context('Cenários de navegação e busca', () => {

        it('Deve buscar um produto pelo nome', () => {
            cy.contains('Moletom com capuz', { timeout: 10000 }).should('be.visible').click();
            cy.get('.btn-secondary').should('exist');
        });

        it('Deve clicar no primeiro produto da lista', () => {
            cy.get('.card-img-top').first().click();
            cy.url().should('include', 'product.html');
        });

        it('Deve clicar no ultimo produto da lista', () => {
            cy.get('.card-img-top').last().click();
            cy.url().should('include', 'product.html');
            cy.get('legend', { timeout: 10000 }).should('contain', 'Moletom com capuz "Const"');
        });

        it('Deve clicar no terceiro produto da lista', () => {
            cy.get('.card-img-top').eq(2).click();
            cy.get('legend', { timeout: 10000 }).should('contain', 'Ecobag "Na minha máquina funciona"');
        });

        it('Deve buscar um produto usando massa da dados', () => {
            cy.fixture('produto-unico').then((produto) => {
                cy.contains(produto.Produto.nome, { timeout: 10000 }).should('be.visible').click();
                cy.get('#product-price', { timeout: 10000 }).should('contain', produto.Produto.preco);
            });
        });

        it('Deve buscar produtos usando massa de dados múltiplos', () => {
            cy.fixture('multiplos-produtos').then((produtos) => {
                produtos.forEach((prod) => {
                    cy.contains(prod.Produto.nome, { timeout: 10000 }).should('be.visible').click();
                    cy.get('#product-price', { timeout: 10000 }).should('contain', prod.Produto.preco);
                    cy.go('back');
                    cy.get('.card-img-top', { timeout: 10000 }).should('be.visible');
                });
            });
        });

    });

    context('Validações de exibição e conteúdo', () => {

        it('Deve exibir todos os produtos com imagem, nome e preço', () => {
            cy.get('.card').each(($card) => {
                cy.wrap($card).find('.card-img-top').should('be.visible');
                cy.wrap($card).find('.card-title, .card-text').should('not.be.empty');
                cy.wrap($card).find('.price, .card-text').should('exist');
            });
        });

        it('Deve exibir preços no formato correto', () => {
            cy.get('.card-body').first().children().eq(2).invoke('text').then((preco) => {
                expect(preco).to.match(/R\$\s*\d+[,.]?\d*/);
            });
        });

        it('Todas as imagens de produtos devem carregar corretamente', () => {
            cy.get('.card-img-top').each(($img) => {
                cy.wrap($img)
                    .should('be.visible')
                    .and(($el) => {
                        expect($el[0].naturalWidth).to.be.greaterThan(0);
                    });
            });
        });

    });

    context('Validações de navegação e responsividade', () => {

        it('Deve manter a listagem de produtos ao voltar da página de detalhes', () => {
            cy.get('.card-img-top').then(($produtos) => {
                const quantidadeInicial = $produtos.length;
                cy.get('.card-img-top').first().click();
                cy.url().should('include', 'product.html');
                cy.go('back');
                cy.get('.card-img-top').should('have.length', quantidadeInicial);
            });
        });

        it('Deve exibir pelo menos 3 produtos na vitrine', () => {
            cy.get('.card').should('have.length.at.least', 3);
        });

    });

    context('Validações de segurança e edge cases', () => {

        it('Não deve permitir acesso direto a produto inexistente', () => {
            cy.intercept('GET', '**/api/produtos/99999').as('produtoInexistente');
            cy.visit('/product.html?id=99999', { failOnStatusCode: false });
            cy.wait('@produtoInexistente').its('response.statusCode').should('eq', 404);
            cy.get('body').should('satisfy', ($body) => {
                const text = $body.text();
                return text.includes('não encontrado') ||
                    text.includes('erro') ||
                    text.includes('Produto não existe') ||
                    !text.includes('Adicionar ao carrinho'); 
            });
        });
    });

});