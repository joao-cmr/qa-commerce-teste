/// <reference types="cypress" />


describe('Testes da funcionalidade vitrine', () => {

    beforeEach(() => {
        cy.visit('/')
    });

    it('Deve buscar um produto pelo nome', () => {

        cy.contains('Moletom com capuz').click()
        cy.get('.btn-secondary').should('exist')
    });

    it('Deve clicar no primeiro produto da lista', () => {
        cy.get('.card-img-top').first().click()
        cy.url().should('include', 'product.html')

    });

    it('Deve clicar no ultimo produto da lista', () => {
        cy.get('.card-img-top').last().click()
        cy.url().should('include', 'product.html')
        cy.get('legend').should('contain', 'Moletom com capuz "Const"')

    });

    it('Deve clicar no terceiro produto da lista', () => {
        cy.get('.card-img-top').eq(2).click()
        cy.get('legend').should('contain', 'Ecobag "Na minha máquina funciona"')

    });

    it('Deve buscar um produto usando massa da dados', () => {
        cy.fixture('produto-unico').then((produto => {
            cy.contains(produto.Produto.nome).click()
            cy.get('#product-price').should('contain', produto.Produto.preco)
        }))
    });

    it('Deve buscar produtos usando massa de dados múltiplos', () => {
        cy.fixture('multiplos-produtos').then((produtos) => {
            produtos.forEach((prod) => {
                cy.contains(prod.Produto.nome).click()
                cy.get('#product-price').should('contain', prod.Produto.preco)
                cy.go('back')
            })
        })
    });

}); 
