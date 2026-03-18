/// <reference types="cypress" />

import loginPage from "../support/page-objects/login-page";

describe('Teste de funcionalidade login', () => {

  beforeEach(() => {
    cy.visit('login.html')
  });

  context('Cenários de sucesso', () => {
    
    it('Deve fazer login com sucesso usando Comandos Customizados', () => {
      cy.login(Cypress.env('usuario'), Cypress.env('senha'));
      cy.url().should('include', 'dashboard.html');
    });

    it('Deve fazer login com sucesso usando Page Objects', () => {
      loginPage.fazerLogin('admin@admin.com', 'admin')
      cy.url().should('include', 'dashboard.html');
    });

    it('Deve fazer logout com sucesso', () => {
      cy.login('admin@admin.com', 'admin')
      cy.get('#logout-button').click()
      cy.get('h1').should('contain', 'LOGIN')
    });
  });

  context('Cenários de validação e erro', () => {
    
  it('Não deve permitir login com email vazio', () => {
   cy.get('#password').type('admin')
   cy.get('.btn').click()
   cy.contains('Por favor, insira um email válido.').should('be.visible')
});

    it('Não deve permitir login com senha incorreta', () => {
      cy.login('admin@admin.com', 'senhaerrada')
      cy.get('#error-container').should('contain.text', 'Email ou senha incorretos')
      cy.url().should('not.include', 'dashboard.html')
    });

    it('Não deve permitir login com senha vazia', () => {
      cy.get('#email').type('admin@admin.com')
      cy.get('.btn').click()
      cy.contains('Por favor, insira a senha.').should('be.visible')
    });
  });

  context('Validações de formato e segurança', () => {
  
    it('Não deve permitir email com formato SQL injection', () => {
      cy.get('#email').type("admin' OR '1'='1")
      cy.get('#password').type('admin')
      cy.contains('email válido').should('exist')
    });

    it('Não deve permitir submit com email inválido', () => {
      cy.get('#email').type("admin' OR '1'='1")
      cy.get('.btn').click()
      cy.url().should('include', 'login.html')
    });
    
  });
});
