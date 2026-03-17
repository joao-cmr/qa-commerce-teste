# 🧪 QA Commerce - Testes Automatizados

![Cypress Tests](https://github.com/joao-cmr/qa-commerce-teste/actions/workflows/cypress.yml/badge.svg)

Testes E2E automatizados com Cypress para o projeto [QA Commerce](https://github.com/joao-cmr/qa-commerce) - uma aplicação de e-commerce desenvolvida para prática de QA.

## 📋 Sobre o Projeto

Este repositório contém a suíte completa de testes automatizados para validar as principais funcionalidades do QA Commerce, incluindo:

- 🔐 **Login/Logout** - Autenticação de usuários
- 🛒 **Checkout** - Fluxo completo de compra
- 🏪 **Vitrine** - Navegação e busca de produtos

## 🚀 Tecnologias Utilizadas

- **Cypress 14.5.4** - Framework de testes E2E
- **Faker.js** - Geração de dados de teste
- **GitHub Actions** - CI/CD para execução automática dos testes
- **Page Objects** - Padrão de design para organização dos testes

## 📊 Status dos Testes

Atualmente rodando **17 cenários de teste** cobrindo:

| Funcionalidade | Cenários | Status |
|----------------|----------|--------|
| Checkout | 4 | ✅ |
| Login | 7 | ✅ |
| Vitrine | 6 | ✅ |

## 🛠️ Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [Git](https://git-scm.com/)
- [Repositório QA Commerce](https://github.com/joao-cmr/qa-commerce) clonado e rodando

## 📦 Instalação

### 1. Clone este repositório

```bash
git clone https://github.com/joao-cmr/qa-commerce-teste.git
cd qa-commerce-teste
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Garanta que a aplicação QA Commerce está rodando

Em outro terminal, na pasta do `qa-commerce`:

```bash
npm start
```

A aplicação deve estar acessível em `http://localhost:3000`

## ▶️ Executando os Testes

### Modo Interativo (Cypress UI)

```bash
npx cypress open
```

Selecione os testes que deseja executar na interface gráfica.

### Modo Headless (linha de comando)

```bash
npm test
```

Ou com navegador específico:

```bash
npx cypress run --browser chrome
```

## 📁 Estrutura do Projeto

```
qa-commerce-teste/
├── .github/
│   └── workflows/
│       └── cypress.yml          # Pipeline CI/CD
├── cypress/
│   ├── e2e/
│   │   ├── checkout.cy.js       # Testes de checkout
│   │   ├── login.cy.js          # Testes de autenticação
│   │   └── vitrine.cy.js        # Testes da vitrine
│   ├── fixtures/                # Massa de dados
│   ├── support/
│   │   ├── commands.js          # Comandos customizados
│   │   └── page-objects/        # Page Objects
│   └── screenshots/             # Screenshots de falhas
├── cypress.config.js
├── package.json
└── README.md
```

## 🔄 CI/CD - GitHub Actions

Os testes rodam **automaticamente** a cada push para a branch `main`:

1. ✅ Checkout dos repositórios (aplicação + testes)
2. ✅ Instalação das dependências
3. ✅ Inicialização do banco de dados
4. ✅ Start do servidor Express
5. ✅ Execução dos testes Cypress
6. 📸 Upload de screenshots (em caso de falha)
7. 🎥 Upload de vídeos (sempre)

### Visualizar Resultados

Acesse a aba [Actions](https://github.com/joao-cmr/qa-commerce-teste/actions) do repositório para ver:
- Status das execuções
- Logs detalhados
- Screenshots de falhas
- Vídeos das execuções

## 🧩 Funcionalidades dos Testes

### Checkout (`checkout.cy.js`)
- ✅ Preenchimento do formulário completo
- ✅ Geração de dados com Faker
- ✅ Uso de Page Objects
- ✅ Validação de pagamento com cartão

### Login (`login.cy.js`)
- ✅ Login com credenciais válidas
- ✅ Logout
- ✅ Validação de credenciais inválidas
- ✅ Validação de campos vazios
- ✅ Mensagens de erro apropriadas

### Vitrine (`vitrine.cy.js`)
- ✅ Busca de produtos por nome
- ✅ Navegação pelos produtos (primeiro, último, terceiro)
- ✅ Uso de massa de dados (fixture)
- ✅ Múltiplas buscas em sequência

## 🎯 Boas Práticas Implementadas

- ✨ **Comandos Customizados** - Reutilização de código
- 📄 **Page Objects** - Manutenibilidade e organização
- 🎲 **Faker.js** - Dados dinâmicos para testes
- 📊 **Fixtures** - Massa de dados estruturada
- 🔍 **Waits inteligentes** - Estabilidade em ambientes CI/CD
- 📸 **Screenshots automáticos** - Apenas em falhas

## 🐛 Reportando Bugs

Se encontrar problemas:

1. Verifique se a aplicação QA Commerce está rodando
2. Confira os logs do Cypress
3. Veja os screenshots na pasta `cypress/screenshots`
4. Abra uma [issue](https://github.com/joao-cmr/qa-commerce-teste/issues) com detalhes

## 📚 Recursos Adicionais

- [Documentação do Cypress](https://docs.cypress.io/)
- [Best Practices Cypress](https://docs.cypress.io/guides/references/best-practices)
- [Repositório QA Commerce](https://github.com/joao-cmr/qa-commerce)

## 👤 Autor

**João**

- GitHub: [@joao-cmr](https://github.com/joao-cmr)
- Projeto: Testes automatizados para QA Commerce

## 📝 Licença

Este projeto é open source para fins educacionais.

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
