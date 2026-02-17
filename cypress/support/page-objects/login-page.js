class LoginPage {
   
    // Elementos da página de login
    get campoEmail() {
        return cy.get('#email');
    }

    get campoSenha() {
        return cy.get('#password');
    }

    get botaoEntrar() {
        return cy.get('.btn');
    }

    // Funções da pagina de login

    visistarUrl() {
        cy.visit('login.html');
    }

    fazerLogin(email, senha) {
        this.visistarUrl();
        this.campoEmail.type(email);
        this.campoSenha.type(senha);
        this.botaoEntrar.click();
    }
}

export default new LoginPage();