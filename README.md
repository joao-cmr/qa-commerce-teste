# QA Commerce - Testes Automatizados

![Cypress Tests](https://github.com/joao-cmr/qa-commerce-teste/actions/workflows/cypress.yml/badge.svg)

Testes E2E automatizados com Cypress para o projeto [QA Commerce](https://github.com/joao-cmr/qa-commerce) - uma aplicação de e-commerce desenvolvida para prática de QA.

## Sobre o Projeto

Suíte de testes E2E orientada a risco, focada na proteção de receita e prevenção de regressões em um fluxo de e-commerce para validar as principais funcionalidades do QA Commerce, incluindo:

- **Login/Logout** - Autenticação de usuários
- **Checkout** - Fluxo completo de compra
- **Vitrine** - Navegação e busca de produtos

---

## Impacto no Negócio

### Por que automatizar E2E em e-commerce?

- **Checkout representa 100% da conversão**: Uma falha nesse fluxo = perda direta de vendas
- **Bugs de validação = risco financeiro**: Aceitar cartão inválido pode gerar chargeback e fraude
- **Deploys frequentes exigem regressão rápida**: CI/CD automatizado reduz tempo de validação de horas para minutos
- **Confiança em produção**: 36 testes automatizados executados automaticamente no CI antes de cada release, garantindo validação contínua dos fluxos críticos

### Custo estimado de bugs não detectados

| Cenário | Impacto | Severidade |
|---------|---------|------------|
| Checkout quebrado em produção | Perda de 100% das vendas durante downtime ou período de indisponibilidade | Crítico |
| Validação de cartão inválido | Risco de fraude + custos com chargeback | Crítico |
| Login indisponível | Clientes não conseguem finalizar compras | Crítico |
| Vitrine com preços errados | Perda de margem ou reclamações (PROCON) | Alto |

>**Resultado:** Os 3 bugs críticos identificados (validação de pagamento) foram detectados **antes** de qualquer deploy, evitando impacto financeiro.

---

## Métricas do Projeto

- **39 testes automatizados**, sendo **36 ativos no pipeline de CI** (3 bloqueados por bugs identificados)
- **3 bugs críticos** de validação identificados e documentados
- **100% dos fluxos de receita** (checkout) cobertos
- **Execução em CI (~3 minutos)** garantindo feedback rápido
- **Relatórios HTML** gerados automaticamente com Mochawesome
- **CI/CD** executando testes a cada push

### Cobertura por Funcionalidade

| Funcionalidade | Testes | Passando | Bloqueados | Cobertura |
|----------------|--------|----------|------------|-----------|
| Login | 10 | 10 | 0 | 100% |
| Vitrine | 12 | 12 | 0 | 100% |
| Checkout | 17 | 14 | 3 | 82% (bugs identificados) |
| **Total** | **39** | **36** | **3** | **92%** |

> **Nota sobre cobertura:** Os percentuais representam a cobertura dos **fluxos principais e críticos** de cada funcionalidade.

---

## Bugs Identificados

Durante a automação, foram identificados **3 bugs críticos** na validação de pagamento:

| ID | Severidade | Descrição | Issue |
|----|-----------|-----------|-------|
| BUG-CHK-001 | Alta | Checkout aceita cartão de crédito inválido (não valida algoritmo de Luhn) | [#1](https://github.com/joao-cmr/qa-commerce-teste/issues/1) |
| BUG-CHK-002 | Alta | Checkout aceita cartão com data de validade expirada | [#2](https://github.com/joao-cmr/qa-commerce-teste/issues/2) |
| BUG-CHK-003 | Alta | Checkout aceita CVV com formato incorreto (2 dígitos) | [#3](https://github.com/joao-cmr/qa-commerce-teste/issues/3) |

---

## Relatórios

**[Ver último relatório de testes online](https://joao-cmr.github.io/qa-commerce-teste/)**

Os relatórios são gerados automaticamente com Mochawesome e publicados no GitHub Pages após cada execução no CI/CD.

---

## Estratégia de Teste e Priorização

### Critérios de Prioridade

| Prioridade | Critério | Cobertura | Exemplo |
|------------|----------|-----------|---------|
| **P0** | Impacta receita diretamente | 17 testes | Checkout, validação de pagamento |
| **P1** | Bloqueia acesso ao sistema | 10 testes | Login, autenticação |
| **P2** | Degrada experiência do usuário | 12 testes | Vitrine, busca de produtos |

### Decisões Técnicas

- **Page Objects**: Reduz duplicação de código e facilita manutenção.
- **Faker.js**: Evita massa de dados estática e problemas de duplicação.
- **CI/CD**: Testes rodam automaticamente a cada push via GitHub Actions.
- **Screenshots apenas em falhas**: Economiza espaço e facilita o debug.
- **Rastreabilidade**: Bugs vinculados a Issues do GitHub.

### Gestão de Defeitos

Quando um teste falha, o fluxo é:
1. Confirmo que é bug (não falso positivo)
2. Abro Issue documentada com evidências
3. Marco teste com `.skip()` + link para Issue
4. Mantenho o teste no código para ser reativado após correção

---

## Validação de Inputs Maliciosos

| Tipo de Ataque | Campo Testado | Payload | Resultado | Risco |
|----------------|---------------|---------|-----------|-------|
| SQL Injection | Nome | `' OR '1'='1` | Escapado | Baixo |
| XSS | Endereço | `<script>alert('xss')</script>` | HTML Entities | Baixo |
| Email Malicioso | Email | `test@example.com<script>` | Rejeitado | Baixo |

---

## Escopo e Evolução

- Testes [E2E](https://github.com/joao-cmr/qa-commerce-teste) validam jornadas críticas do usuário.
- Testes de [API](https://github.com/joao-cmr/qa-commerce-teste/tree/main/API/postman) garantem regras de negócio no backend.

**Próximos passos:**
- [ ] Testes de performance
- [ ] Testes visuais (UI regression)
- [ ] Execução paralela no CI

---

## Tecnologias utilizadas 

- **Cypress 14.5.4** - Framework de testes E2E
- **Faker.js** - Geração de dados dinâmicos para testes
- **Mochawesome** - Geração de relatórios HTML
- **GitHub Actions** - CI/CD para execução automática dos testes
- **Page Objects** - Padrão de design para organização e manutenibilidade

---

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [Git](https://git-scm.com/)
- [Repositório QA Commerce](https://github.com/joao-cmr/qa-commerce) clonado e rodando

---

## Instalação

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

---

## Executando os Testes

### Modo Interativo (Cypress UI)
```bash
npx cypress open
```

### Modo Headless (linha de comando)
```bash
npm test
```

Selecione os testes que deseja executar na interface gráfica.


### Gerar Relatório Mochawesome
```bash
npm run test:report
```

O relatório HTML será gerado em `cypress/reports/report.html`

---
## Estrutura do Projeto
```
qa-commerce-teste/
├── .github/
│   └── workflows/
│       └── cypress.yml          # Pipeline CI/CD
├── cypress/
│   ├── e2e/
│   │   ├── checkout.cy.js       # 17 testes de checkout (3 bloqueados - bugs)
│   │   ├── login.cy.js          # 10 testes de autenticação
│   │   └── vitrine.cy.js        # 12 testes da vitrine
│   ├── fixtures/
│   │   ├── multiplos-produtos.json
│   │   └── produto-unico.json
│   ├── support/
│   │   ├── commands.js          # Comandos customizados (cy.login)
│   │   ├── e2e.js
│   │   └── page-objects/        # Page Objects (login, checkout, vitrine)
│   ├── reports/                 # Relatórios Mochawesome (ignorado no git)
│   └── screenshots/             # Screenshots de falhas (ignorado no git)
├── docs/
│   ├── CASOS_TESTE_CHECKOUT.md  # Documentação BDD - Checkout
│   ├── CASOS_TESTE_LOGIN.md     # Documentação BDD - Login
│   └── CASOS_TESTE_VITRINE.md   # Documentação BDD - Vitrine
├── cypress.config.js
├── package.json
└── README.md
```

---

## CI/CD - GitHub Actions

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

---

## Documentação de Testes

Cada funcionalidade possui documentação completa em formato BDD (Gherkin):

- [Casos de Teste - Login](docs/CASOS_TESTE_LOGIN.md)
- [Casos de Teste - Vitrine](docs/CASOS_TESTE_VITRINE.md)
- [Casos de Teste - Checkout](docs/CASOS_TESTE_CHECKOUT.md)

---

## Reportando Bugs

Se encontrar problemas ao executar os testes:

1. Verifique se a aplicação QA Commerce está rodando em `http://localhost:3000`
2. Confira os logs do Cypress no terminal
3. Veja os screenshots na pasta `cypress/screenshots`
4. Abra uma [issue](https://github.com/joao-cmr/qa-commerce-teste/issues) com detalhes

---

####

Este repositório demonstra práticas de engenharia de qualidade aplicadas em cenários reais, incluindo:

- Automação E2E orientada a risco
- Integração contínua (CI/CD)
- Rastreabilidade de defeitos
- Priorização baseada em impacto de negócio

**Objetivo:** Demonstrar capacidade de atuar como QA Engineer em ambiente de produto, contribuindo para prevenção de regressões, identificação de riscos e suporte à tomada de decisão técnica.


---

## Autor

**João Carlos M. Rodrigues**

- GitHub: [@joao-cmr](https://github.com/joao-cmr)
- LinkedIn: [joaocmr](https://linkedin.com/in/joaocmr)

