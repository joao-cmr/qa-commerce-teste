class CheckoutPage {
    //elementos da pagina de checkout

    get firstName() {
        return cy.get('#first-name')
    }

    get lastName() {
        return cy.get('#last-name')
    }

    get address() {
        return cy.get('#address')
    }

    get number() {
        return cy.get('#number')
    }

    get cep() {
        return cy.get('#cep')
    }

    get phone() {
        return cy.get('#phone')
    }

    get email() {
        return cy.get('#email')
    }

    get createAccount() {
        return cy.get('#create-account')
    }

    get password() {
        return cy.get('#password')
    }

    get confirmPassword() {
        return cy.get('#confirm-password')
    }

    get paymentBoleto() {
        return cy.get('#payment-boleto')
    }

    get paymentPix() {
        return cy.get('#payment-pix')
    }

    get paymentCard() {
        return cy.get('#payment-card')
    }

    get numberCard() {
        return cy.get('#card-number')
    }

    get expirationCard() {
        return cy.get('#card-expiry')
    }

    get cvcCard() {
        return cy.get('#card-cvc')
    }

    get terms() {
        return cy.get('#terms')
    }

    get btnCheckout() {
        return cy.get('.btn')
    }

    //funções da pagina de checkout



    preencherFormularioCheckout(firstName, lastName, address, number, cep, phone, email) {
        this.firstName.type(firstName);
        this.lastName.type(lastName);
        this.address.type(address);
        this.number.type(number);
        this.cep.type(cep);
        this.phone.type(phone);
        this.email.type(email);
       

    }

    pagamentoBoleto() {
        this.paymentBoleto.click();
    }

        pagamentoPix() {    
        this.paymentPix.click();
    }

    pagamentoCard(cardNumber, cardExpiry, cvcCard) {
        this.paymentCard.click();
        this.numberCard.type(cardNumber);
        this.expirationCard.type(cardExpiry);
        this.cvcCard.type(cvcCard);
    } 
}

export default new CheckoutPage();