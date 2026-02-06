

describe('Teste de funcionalidade login', () => {
  it('Deve fazer login com sucesso', () => {
    cy.visit('http://localhost:3000/login.html')
    cy.get('#email').type('admin@admin.com')
    cy.get('#password').type('admin')
    cy.get('.btn').click()

    //falta validar o resultado esperado
  })

  it('Deve fazer logout com sucesso', () => {
    cy.visit('http://localhost:3000/login.html')
    cy.get('#email').type('admin@admin.com')
    cy.get('#password').type('admin')
    cy.get('.btn').click()
    cy.get('#logout-button').click()

    //Clicar no botão logout
    //validar o resultado esperado
  });

  
})