# 🛒 Automação de Testes E2E - Fake Store / Commerce

Este repositório contém uma suíte de testes automatizados End-to-End (E2E) desenvolvida para validar fluxos críticos de uma aplicação de e-commerce. O projeto utiliza **Cypress** com **JavaScript/TypeScript**, seguindo as melhores práticas de escrita de testes e arquitetura.

---

## 🚀 Tecnologias Utilizadas

- **Cypress**: Framework de automação de testes.
- **TypeScript**: Adicionado para tipagem e maior segurança no código.
- **Faker Library**: Gerador de massa de dados dinâmica para testes mais realistas.
- **Page Object Model (POM)**: Padrão de design para melhorar a manutenção e reuso do código.

---

## 🏗️ Estrutura do Projeto

O projeto está organizado da seguinte forma:

- `cypress/e2e/`: Contém os arquivos de especificações de testes (ex: login, checkout, vitrine).
- `cypress/fixtures/`: Armazena massas de dados estáticas em arquivos JSON.
- `cypress/support/page-objects/`: Contém as classes Page Objects, separando a lógica das ações da lógica dos testes.
- `cypress/support/commands.js`: Comandos customizados do Cypress para reaproveitamento de código (ex: login customizado).

---

## 🧪 Cenários de Teste Implementados

Atualmente, o projeto cobre os seguintes fluxos:

1. **Vitrine:** Validação de exibição e interação com produtos.
2. **Login:** Fluxos de autenticação com dados válidos e tratamento de erros.
3. **Checkout:** Fluxo completo desde a seleção do produto até a finalização da compra.

---

## 📦 Como Executar o Projeto

1. **Clone o repositório:**
   
   git clone [https://github.com/joao-cmr/qa-commerce-teste.git](https://github.com/joao-cmr/qa-commerce-teste.git)


2. **Instale as dependências:**

   npm install

3. **Abra o Cypress (modo interativo):**

   npx cypress open

4. **Execute os testes:**

   npx cypress run

## 🛠️ Práticas de QA Aplicadas

**Massa de Dados Dinâmica:** Uso do Faker para evitar testes frágeis com dados viciados.

**Hooks (before/after):** Organização do estado dos testes para garantir independência entre os cenários.

**POM:** Encapsulamento de seletores e ações para facilitar futuras manutenções na UI.
