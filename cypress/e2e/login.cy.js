/// <reference types="cypress" />

describe('Teste de funcionalidade login', () => {

  //HOOKS/Ganchos

  //Antes de cada teste
beforeEach(() => {
  cy.visit('login.html')
});

  //Depois de cada teste
afterEach(() => {
  // cy.screenshot()
});
  

  it.skip('Deve fazer login com sucesso', () => {
    cy.get('#email').type('admin@admin.com')
    cy.get('#password').type('admin')
    cy.get('.btn').click()
    cy.get('h1').should('contain', 'Minha conta')

    
  })

  it.skip('Deve fazer logout com sucesso', () => {
    cy.get('#email').type('admin@admin.com')
    cy.get('#password').type('admin')
    cy.get('.btn').click()
    cy.get('#logout-button').click()
    cy.url().should('include', '/login.html')

    
  });

  it('Deve fazer login com sucesso / usando Comandos Customizados', () => {
    cy.login('admin@admin.com', 'admin')
    cy.url().should('include', 'dashboard.html')
  });

  it('Deve fazer logout com sucesso /usando comandos customizados', () => {
    cy.login('admin@admin.com', 'admin')
    cy.get('#logout-button').click()
     cy.get('h1').should('contain', 'LOGIN')
   
  });

  
})