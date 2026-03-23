# QA Commerce - Testes Automatizados

![Cypress Tests](https://github.com/joao-cmr/qa-commerce-teste/actions/workflows/cypress.yml/badge.svg)

Testes E2E automatizados com Cypress para o projeto [QA Commerce](https://github.com/joao-cmr/qa-commerce) - uma aplicação de e-commerce desenvolvida para prática de QA.

##  Sobre o Projeto

Este repositório contém a suíte completa de testes automatizados para validar as principais funcionalidades do QA Commerce, incluindo:

-  **Login/Logout** - Autenticação de usuários
-  **Checkout** - Fluxo completo de compra
-  **Vitrine** - Navegação e busca de produtos

##  Métricas do Projeto

- **39 testes automatizados** cobrindo fluxos críticos de e-commerce
- **3 bugs críticos** de validação identificados e documentados
- **100% dos fluxos de receita** (checkout) cobertos
- **Relatórios HTML** gerados automaticamente com Mochawesome
- **CI/CD** executando testes a cada push

###  Cobertura por Funcionalidade

| Funcionalidade | Testes | Passando | Skipados | Cobertura |
|----------------|--------|----------|----------|-----------|
| Login | 10 | 10 | 0 | 100% |
| Vitrine | 12 | 12 | 0 | 100% |
| Checkout | 17 | 14 | 3 | 82% (bugs identificados) |
| **Total** | **39** | **36** | **3** | **92%** |

> **Nota sobre cobertura:** Os percentuais representam a cobertura dos **fluxos principais e críticos** de cada funcionalidade. Cenários edge case e testes de performance não estão incluídos nesta métrica.

----

##  Bugs Identificados

Durante a automação, foram identificados **3 bugs críticos** na validação de pagamento:

| ID | Severidade | Descrição | Issue |
|----|-----------|-----------|-------|
| BUG-CHK-001 | Alta | Checkout aceita cartão de crédito inválido (não valida algoritmo de Luhn) | [#1](https://github.com/joao-cmr/qa-commerce-teste/issues/1) |
| BUG-CHK-002 | Alta | Checkout aceita cartão com data de validade expirada | [#2](https://github.com/joao-cmr/qa-commerce-teste/issues/2) |
| BUG-CHK-003 | Alta | Checkout aceita CVV com formato incorreto (2 dígitos) | [#3](https://github.com/joao-cmr/qa-commerce-teste/issues/3) |

> **Nota:** Os testes relacionados a esses bugs estão marcados com `.skip()` e linkados às respectivas Issues para rastreabilidade.

##  Relatórios

**[Ver último relatório de testes online](https://joao-cmr.github.io/qa-commerce-teste/)**

Os relatórios são gerados automaticamente com Mochawesome e publicados no GitHub Pages após cada execução no CI/CD.

##  Tecnologias Utilizadas

- **Cypress 14.5.4** - Framework de testes E2E
- **Faker.js** - Geração de dados dinâmicos para testes
- **Mochawesome** - Geração de relatórios HTML
- **GitHub Actions** - CI/CD para execução automática dos testes
- **Page Objects** - Padrão de design para organização e manutenibilidade

##  Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [Git](https://git-scm.com/)
- [Repositório QA Commerce](https://github.com/joao-cmr/qa-commerce) clonado e rodando

##  Instalação

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

##  Executando os Testes

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

### Gerar Relatório Mochawesome
```bash
npm run test:report
```

O relatório HTML será gerado em `cypress/reports/report.html`

##  Estrutura do Projeto
```
qa-commerce-teste/
├── .github/
│   └── workflows/
│       └── cypress.yml          # Pipeline CI/CD
├── cypress/
│   ├── e2e/
│   │   ├── checkout.cy.js       # 17 testes de checkout (3 skipados - bugs)
│   │   ├── login.cy.js          # 10 testes de autenticação
│   │   └── vitrine.cy.js        # 12 testes da vitrine
│   ├── fixtures/
│   │   ├── multiplos-produtos.json
│   │   └── produto-unico.json
│   ├── support/
│   │   ├── commands.js          # Comandos customizados (cy.login)
│   │   ├── e2e.js
│   │   └── page-objects/        # Page Objects (login, checkout, vitrine)
│   ├── reports/                 # Relatórios Mochawesome (ignorado no git)
│   └── screenshots/             # Screenshots de falhas (ignorado no git)
├── docs/
│   ├── CASOS_TESTE_CHECKOUT.md  # Documentação BDD - Checkout
│   ├── CASOS_TESTE_LOGIN.md     # Documentação BDD - Login
│   └── CASOS_TESTE_VITRINE.md   # Documentação BDD - Vitrine
├── cypress.config.js
├── package.json
└── README.md
```

##  CI/CD - GitHub Actions

Os testes rodam **automaticamente** a cada push para a branch `main`:

1. Checkout dos repositórios (aplicação + testes)
2. Instalação das dependências
3. Inicialização do banco de dados
4. Start do servidor Express
5. Execução dos testes Cypress
6. Geração de relatórios Mochawesome
7. Publicação do relatório no GitHub Pages
8. Upload de screenshots (em caso de falha)

### Visualizar Resultados

- **[Actions](https://github.com/joao-cmr/qa-commerce-teste/actions)** - Status das execuções, logs detalhados
- **[Relatório Online](https://joao-cmr.github.io/qa-commerce-teste/)** - Último relatório de testes publicado
- **[Issues](https://github.com/joao-cmr/qa-commerce-teste/issues)** - Bugs identificados e documentados

##  Documentação de Testes

Cada funcionalidade possui documentação completa em formato BDD (Gherkin):

- [Casos de Teste - Login](docs/CASOS_TESTE_LOGIN.md)
- [Casos de Teste - Vitrine](docs/CASOS_TESTE_VITRINE.md)
- [Casos de Teste - Checkout](docs/CASOS_TESTE_CHECKOUT.md)

##  Funcionalidades dos Testes

### Checkout (`checkout.cy.js`)

**Cenários de Sucesso:**
- Preenchimento completo do formulário (dados estáticos)
- Geração de dados dinâmicos com Faker.js
- Uso de Page Objects para reusabilidade
- Pagamento via Boleto, Cartão de Crédito e Pix
- Checkout como visitante (sem criar conta)

**Validações de Erro (P0 e P1):**
- Campos obrigatórios vazios
- Senhas não conferem
- Email inválido
- CEP inválido
- Termos não aceitos

**Testes de Segurança:**
- SQL Injection no campo nome
- XSS no campo endereço
- Email malicioso

**Testes de Usabilidade:**
- Alternância entre métodos de pagamento

### Login (`login.cy.js`)

**Cenários de Sucesso:**
- Login com credenciais válidas
- Logout com sucesso
- Redirecionamento após login

**Validações de Erro:**
- Login com credenciais inválidas
- Campos vazios (email e senha)
- Apenas email preenchido
- Apenas senha preenchida
- Mensagens de erro apropriadas

### Vitrine (`vitrine.cy.js`)

**Navegação e Busca:**
- Busca de produtos por nome
- Navegação por posição (primeiro, último, terceiro produto)
- Uso de massa de dados (fixture - produto único)
- Uso de massa de dados (fixture - múltiplos produtos)

**Validações de Exibição:**
- Todos os produtos exibem imagem, nome e preço
- Formatação correta de preços (R$)
- Imagens carregam corretamente (sem quebra)

**Validações de Navegação:**
- Listagem preservada ao voltar da página de detalhes
- Quantidade mínima de produtos na vitrine

**Segurança e Edge Cases:**
- Tratamento de produto inexistente (404)

##  Boas Práticas Implementadas

- **Comandos Customizados** - `cy.login()` para reutilização de código
- **Page Objects** - Manutenibilidade e organização (login-page, checkout-page)
- **Faker.js** - Dados dinâmicos para evitar hardcoding
- **Fixtures** - Massa de dados estruturada e reutilizável
- **Waits inteligentes** - Estabilidade em ambientes CI/CD
- **Screenshots automáticos** - Apenas em falhas (economia de espaço)
- **Priorização de testes** - P0 (crítico) → P1 (alto) → P2 (médio)
- **Rastreabilidade** - Bugs linkados a Issues do GitHub

##  Reportando Bugs

Se encontrar problemas ao executar os testes:

1. Verifique se a aplicação QA Commerce está rodando em `http://localhost:3000`
2. Confira os logs do Cypress no terminal
3. Veja os screenshots na pasta `cypress/screenshots`
4. Abra uma [issue](https://github.com/joao-cmr/qa-commerce-teste/issues) com detalhes

##  Recursos Adicionais

- [Documentação do Cypress](https://docs.cypress.io/)
- [Best Practices Cypress](https://docs.cypress.io/guides/references/best-practices)
- [Repositório QA Commerce](https://github.com/joao-cmr/qa-commerce)

## Autor

**João Carlos M. Rodrigues**

- GitHub: [@joao-cmr](https://github.com/joao-cmr)
- LinkedIn: [joaocmr](https://linkedin.com/in/joaocmr)

Projeto desenvolvido como parte do portfólio de Analista de QA, demonstrando habilidades em automação de testes E2E, identificação de bugs críticos, documentação técnica e CI/CD.

##  Licença

Este projeto é open source para fins educacionais.

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
