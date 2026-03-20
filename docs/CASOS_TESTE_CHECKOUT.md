# Documentação de Testes - Funcionalidade de Checkout

##  Visão Geral

Esta documentação descreve os cenários de teste automatizados para a funcionalidade de checkout (finalização de compra) do sistema QA Commerce, escritos em formato BDD (Behavior-Driven Development) usando a sintaxe Gherkin.

---

##  Funcionalidade: Finalização de compra e processamento de pagamento

**Como** um usuário do sistema QA Commerce  
**Eu quero** finalizar minha compra informando dados de entrega e pagamento  
**Para** concluir o pedido e receber meus produtos

---

#  Cenários de Teste

##  Cenários de Sucesso

#### **Cenário 1:** Finalizar checkout com dados estáticos (boleto)
```gherkin
Dado que estou na página de checkout
Quando eu preencho todos os campos obrigatórios:
  - Nome: "João Carlos"
  - Sobrenome: "M. Rodrigues"
  - Endereço: "Rua Iperó"
  - Número: "26"
  - CEP: "07793365"
  - Telefone: "11972641956"
  - Email: email único gerado dinamicamente
E marco a opção "Deseja criar uma conta"
E preencho a senha: "180524Jc*"
E confirmo a senha: "180524Jc*"
E seleciono a forma de pagamento "Boleto"
E aceito os termos e condições
E clico em "Finalizar Pedido"
Então devo ser redirecionado para a página de status do pedido
E devo visualizar o título "STATUS DO PEDIDO"
```

---

#### **Cenário 2:** Finalizar checkout usando dados gerados pelo Faker (boleto)
```gherkin
Dado que estou na página de checkout
Quando eu preencho os campos com dados gerados aleatoriamente:
  - Nome: gerado pelo Faker
  - Sobrenome: gerado pelo Faker
  - Email: gerado pelo Faker
  - Demais campos: dados válidos fixos
E marco a opção "Deseja criar uma conta"
E preencho senha e confirmação de senha
E seleciono a forma de pagamento "Boleto"
E aceito os termos e condições
E clico em "Finalizar Pedido"
Então devo ser redirecionado para a página de status do pedido
E devo visualizar o título "STATUS DO PEDIDO"
```

**Objetivo:** Validar checkout com massa de dados dinâmica (evitar duplicação de emails).

---

#### **Cenário 3:** Finalizar checkout usando Page Object Model (boleto)
```gherkin
Dado que estou na página de checkout
Quando eu preencho o formulário usando o método do Page Object "preencherFormularioCheckout":
  - Nome: gerado pelo Faker
  - Sobrenome: gerado pelo Faker
  - Endereço: "Rua Iperó"
  - Número: "26"
  - CEP: "07793365"
  - Telefone: "11972641956"
  - Email: gerado pelo Faker
E marco a opção "Deseja criar uma conta"
E preencho senha e confirmação de senha
E seleciono a forma de pagamento "Boleto"
E aceito os termos e condições
E clico em "Finalizar Pedido"
Então devo ser redirecionado para a página de status do pedido
E devo visualizar o título "STATUS DO PEDIDO"
```

**Objetivo:** Validar reutilização de código e manutenibilidade usando padrão Page Object.

---

#### **Cenário 4:** Finalizar checkout com pagamento no cartão de crédito
```gherkin
Dado que estou na página de checkout
Quando eu preencho o formulário usando Page Object
E marco a opção "Deseja criar uma conta"
E preencho senha e confirmação de senha
E seleciono a forma de pagamento "Cartão de Crédito"
E preencho os dados do cartão usando o método "pagamentoCard":
  - Número do cartão: "4532123456789012"
  - Data de validade: "05/2025"
  - CVV: "123"
E aceito os termos e condições
E clico em "Finalizar Pedido"
Então devo ser redirecionado para a página de status do pedido
E devo visualizar o título "STATUS DO PEDIDO"
```

**Objetivo:** Validar fluxo completo de pagamento com cartão de crédito.

---

##  Validações de Erro - Prioridade Crítica (P0)

#### **Cenário 5:** Não deve permitir finalizar checkout com campos obrigatórios vazios
```gherkin
Dado que estou na página de checkout
Quando eu clico em "Finalizar Pedido" sem preencher nenhum campo
Então devo visualizar o banner de erro "Você deve concordar com os termos e condições"
E devo visualizar mensagens de erro "Este campo é obrigatório" nos campos vazios
E não devo ser redirecionado para a página de status
```

**Objetivo:** Garantir validação de campos obrigatórios antes de processar o pedido.

---

#### **Cenário 6:** Não deve permitir finalizar checkout sem aceitar os termos
```gherkin
Dado que estou na página de checkout
Quando eu preencho todos os campos obrigatórios corretamente
E seleciono a forma de pagamento "Boleto"
Mas NÃO marco a opção "Li e concordo com os termos e condições"
E clico em "Finalizar Pedido"
Então devo visualizar o banner de erro "Você deve concordar com os termos e condições"
E não devo ser redirecionado para a página de status
```

**Objetivo:** Garantir compliance legal - usuário deve concordar com termos antes de finalizar.

---

#### **Cenário 7:** Não deve permitir criar conta quando senhas não conferem
```gherkin
Dado que estou na página de checkout
Quando eu preencho todos os campos obrigatórios corretamente
E marco a opção "Deseja criar uma conta"
E preencho o campo senha com "180524Jc*"
E preencho o campo confirmar senha com "SenhaDiferente123*"
E seleciono a forma de pagamento "Boleto"
E aceito os termos e condições
E clico em "Finalizar Pedido"
Então devo visualizar a mensagem de erro "As senhas não coincidem"
E não devo ser redirecionado para a página de status
```

**Objetivo:** Prevenir criação de conta com senha incorretamente confirmada.

---

#### **Cenário 8:** Não deve processar pagamento com número de cartão inválido  **[BUG - Issue #1]**
```gherkin
Dado que estou na página de checkout
Quando eu preencho todos os campos obrigatórios corretamente
E seleciono a forma de pagamento "Cartão de Crédito"
E preencho os dados do cartão com número inválido:
  - Número do cartão: "1234567890123456" (não passa no algoritmo de Luhn)
  - Data de validade: "05/2025"
  - CVV: "123"
E aceito os termos e condições
E clico em "Finalizar Pedido"
Então deveria permanecer na página de checkout
E deveria exibir mensagem de erro de cartão inválido

Mas atualmente:
  - O sistema processa o pagamento normalmente
  - Redireciona para a página de status
  - Exibe "Pagamento aprovado"
```

**Status:**  Teste skipado - Bug crítico de segurança identificado  
**Severidade:** ALTA - Aceita qualquer número de 16 dígitos sem validar algoritmo de Luhn

---

##  Validações de Erro - Prioridade Alta (P1)

#### **Cenário 9:** Não deve aceitar email com formato inválido
```gherkin
Dado que estou na página de checkout
Quando eu preencho todos os campos obrigatórios
Mas preencho o campo email com formato inválido: "emailinvalido.com" (sem @)
E seleciono a forma de pagamento "Boleto"
E aceito os termos e condições
E clico em "Finalizar Pedido"
Então devo visualizar a mensagem "Por favor, insira um email válido"
E não devo ser redirecionado para a página de status
```

**Objetivo:** Garantir que apenas emails válidos sejam aceitos para comunicação pós-venda.

---

#### **Cenário 10:** Não deve aceitar CEP inválido
```gherkin
Dado que estou na página de checkout
Quando eu preencho todos os campos obrigatórios
Mas preencho o campo CEP com valor incompleto: "123" (menos de 8 dígitos)
E seleciono a forma de pagamento "Boleto"
E aceito os termos e condições
E clico em "Finalizar Pedido"
Então devo visualizar a mensagem "O CEP deve ter 8 caracteres"
E não devo ser redirecionado para a página de status
```

**Objetivo:** Validar formato correto de CEP brasileiro (8 dígitos).

---

#### **Cenário 11:** Não deve processar cartão com data de validade expirada  **[BUG - Issue #2]**
```gherkin
Dado que estou na página de checkout
Quando eu preencho todos os campos obrigatórios corretamente
E seleciono a forma de pagamento "Cartão de Crédito"
E preencho os dados do cartão com data expirada:
  - Número do cartão: "4532123456789012"
  - Data de validade: "05/2020" (data no passado)
  - CVV: "123"
E aceito os termos e condições
E clico em "Finalizar Pedido"
Então deveria permanecer na página de checkout
E deveria exibir mensagem de erro de cartão expirado

Mas atualmente:
  - O sistema processa o pagamento normalmente
  - Redireciona para a página de status
  - Exibe "Pagamento aprovado"
```

**Status:**  Teste skipado - Bug crítico identificado  
**Severidade:** ALTA - Aceita cartões expirados

---

#### **Cenário 12:** Não deve processar cartão com CVV inválido  **[BUG - Issue #3]**
```gherkin
Dado que estou na página de checkout
Quando eu preencho todos os campos obrigatórios corretamente
E seleciono a forma de pagamento "Cartão de Crédito"
E preencho os dados do cartão com CVV incompleto:
  - Número do cartão: "4532123456789012"
  - Data de validade: "05/2025"
  - CVV: "12" (apenas 2 dígitos ao invés de 3)
E aceito os termos e condições
E clico em "Finalizar Pedido"
Então deveria permanecer na página de checkout
E deveria exibir mensagem de erro de CVV inválido

Mas atualmente:
  - O sistema processa o pagamento normalmente
  - Redireciona para a página de status
  - Exibe "Pagamento aprovado"
```

**Status:**  Teste skipado - Bug crítico identificado  
**Severidade:** ALTA - Aceita CVV com formato incorreto

---

##  Tecnologias Utilizadas

- **Framework de Testes:** Cypress
- **Geração de Dados:** Faker.js
- **Padrões:** Page Object Model
- **Documentação:** BDD/Gherkin

---

##  Cobertura de Testes

| Categoria | Cenários | Passando | Skipados (Bugs) | Status |
|-----------|----------|----------|-----------------|--------|
| Cenários de Sucesso | 4 | 4 | 0 | ✅ |
| Validações de Erro - P0 | 4 | 3 | 1 | ⚠️ |
| Validações de Erro - P1 | 4 | 2 | 2 | ⚠️ |
| **Total** | **12** | **9** | **3** | **⚠️** |

---

##  Como Executar os Testes
```bash
# Executar todos os testes de checkout
npx cypress run --spec "cypress/e2e/checkout.cy.js"

# Executar em modo interativo
npx cypress open

# Executar apenas testes que passam (sem skipados)
npx cypress run --spec "cypress/e2e/checkout.cy.js" --env grep="^(?!.*skip)"
```

---

##  Observações Importantes

### Decisões de Teste

- **Dados dinâmicos:** Utilizei Faker.js para gerar emails únicos e evitar conflitos em testes repetidos
- **Page Object Model:** Implementei métodos reutilizáveis (`preencherFormularioCheckout` e `pagamentoCard`) para facilitar manutenção
- **Priorização de testes:** Organizei cenários por criticidade (P0 e P1) baseado no impacto no negócio
- **Checkout = fluxo crítico:** Falhas nesta funcionalidade impactam diretamente a receita

### Limitações Conhecidas

- Não foram testados cenários de **checkout como visitante** (sem criar conta)
- Testes de **integração com gateway de pagamento real** não estão incluídos
- **Validação de endereço via API de CEP** não foi testada
- **Diferentes formas de pagamento** (Pix) não foram validadas

### Melhorias Futuras Recomendadas

- Validar comportamento de **cupons de desconto**
- Testar **cálculo de frete** baseado no CEP
- Adicionar testes de **timeout** em processamento de pagamento
- Validar **persistência de dados** do formulário em caso de erro

---

##  Bugs Identificados

| ID | Severidade | Descrição | Status | Issue |
|----|-----------|-----------|--------|-------|
| BUG-CHK-001 | ALTA | Checkout aceita cartão de crédito inválido (não valida algoritmo de Luhn) | Identificado | [#1](https://github.com/joao-cmr/qa-commerce-teste/issues/1) |
| BUG-CHK-002 | ALTA | Checkout aceita cartão com data de validade expirada | Identificado | [#2](https://github.com/joao-cmr/qa-commerce-teste/issues/2) |
| BUG-CHK-003 | ALTA | Checkout aceita CVV com formato incorreto (menos de 3 dígitos) | Identificado | [#3](https://github.com/joao-cmr/qa-commerce-teste/issues/3) |

**Impacto de Negócio:** Esses bugs representam **falhas críticas de segurança** no processamento de pagamentos. Em ambiente de produção, operadoras de cartão rejeitariam essas transações, mas a validação no frontend evitaria frustração do usuário e melhoraria a experiência de compra.

---