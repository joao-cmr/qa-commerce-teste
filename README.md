#  Automação de Testes E2E - Fake Store / Commerce

Este repositório contém uma suíte de testes automatizados End-to-End (E2E) desenvolvida para validar fluxos críticos de uma aplicação de e-commerce. O projeto utiliza **Cypress** com **JavaScript**, seguindo as melhores práticas de escrita de testes e arquitetura de software.

---

##  Aplicação Alvo
Os testes contidos neste repositório foram desenvolvidos para validar a integridade da aplicação:
- **Repositório da Aplicação:** [qa-commerce](https://github.com/joao-cmr/qa-commerce)
- **Descrição:** Aplicação completa de e-commerce simulando cenários de negócio como autenticação, catálogo de produtos e fluxo de checkout.

---

##  Tecnologias Utilizadas

- **Cypress**: Framework principal para automação de testes.
- **JavaScript**: Linguagem principal utilizada para a construção de scripts de teste dinâmicos, aproveitando a integração nativa com o ecossistema Node.js e Cypress.
- **Faker Library**: Gerador de massa de dados dinâmica para evitar testes com dados viciados.
- **Page Object Model (POM)**: Padrão de design utilizado para desacoplar a lógica de teste da estrutura da interface (UI).

---

##  Estrutura do Projeto

A arquitetura do projeto foi pensada para escalabilidade:

- `cypress/e2e/`: Scripts de testes organizados por funcionalidades (ex: login, checkout, vitrine).
- `cypress/fixtures/`: Arquivos JSON com massas de dados estáticas.
- `cypress/support/page-objects/`: Classes que representam as páginas e encapsulam os seletores/ações.
- `cypress/support/commands.js`: Comandos customizados para reaproveitamento de funções globais.

---

##  Cenários de Teste Implementados

Atualmente, o projeto cobre os seguintes fluxos críticos:

1. **Vitrine:** Validação de exibição, filtros e interação com a lista de produtos.
2. **Login:** Fluxos de autenticação (sucesso e falha) e validação de mensagens de erro.
3. **Checkout:** Fluxo completo, da adição do item ao carrinho até a finalização do pedido.

---

##  Como Executar o Projeto

**Para rodar os testes localmente, você precisará clonar tanto o repositório da aplicação quanto de testes.**

### 1. Inicie a Aplicação 
Em um terminal, siga os passos abaixo no repositório [qa-commerce](https://github.com/joao-cmr/qa-commerce):

```bash
git clone [https://github.com/joao-cmr/qa-commerce.git](https://github.com/joao-cmr/qa-commerce.git)
cd qa-commerce
npm install
npm start

```
### **A aplicação devera esta rodando em:_/localhost:3000/_**

------

### 2. Execute os testes (Cypress)

**Em um segundo terminal, execute os comandos abaixo neste repositório:**

### Clone o repositório de testes
```
git clone https://github.com/joao-cmr/qa-commerce-teste.git
```

### Entre na pasta
```
cd qa-commerce-teste
```

### Instale as dependências do Cypress e bibliotecas auxiliares
```
npm install
```

### Para abrir a interface visual do Cypress:
```
npx cypress open
```

### Para rodar os testes direto no terminal (Modo Headless):
```
npx cypress run
```

