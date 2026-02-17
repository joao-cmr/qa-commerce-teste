/// <reference types="cypress" />

import loginPage from "../support/page-objects/login-page";

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

  it('Deve fazer login com sucesso / usando Comandos Customizados', () => {
    cy.login(Cypress.env('usuario'), Cypress.env('senha'));
    cy.url().should('include', 'dashboard.html');

  });

  it('Deve fazer logout com sucesso /usando comandos customizados', () => {
    cy.login('admin@admin.com', 'admin')
    cy.get('#logout-button').click()
    cy.get('h1').should('contain', 'LOGIN')

  });

  it('Deve validar mensagem de erro ao tentar fazer login com credenciais inválidas', () => {
    cy.login('joao.carlos@impacta.com', 'admin')
    cy.get('#error-container').should('contain.text', 'Email ou senha incorretos')
  });

  it('Deve validar mensagem de erro ao tentar fazer login com senha incorreta', () => {
    cy.login('admin@admin.com', 'senhaerrada')
    cy.get('#error-container').should('contain.text', 'Email ou senha incorretos')
  });

  it('Deve exibir mensagem de erro ao tentar entrar no site com o campo de emial vazio', () => {
    cy.login('  ', 'admin')
    cy.contains('Por favor, insira um email válido.').should('exist')
  });

  it('Deve exibir mensagem de erro ao tentar entrar no site com o campo da senha vazio', () => {
    cy.get('#email').type('admin@admin.com')
    cy.get('.btn').click()
    cy.contains('Por favor, insira a senha.').should('exist')
  });

  it('Deve fazer login co sucesso - usando Pages ', () => {
    loginPage.fazerLogin('admin@admin.com', 'admin')
    cy.url().should('include', 'dashboard.html');
  });
})