# Documentação de Testes - Funcionalidade de Login

## Visão Geral

Esta documentação descreve os cenários de teste automatizados para a funcionalidade de autenticação do sistema QA Commerce, escritos em formato BDD (Behavior-Driven Development) usando a sintaxe Gherkin.

---

## Funcionalidade: Autenticação de usuário no sistema

**Como** um usuário do sistema QA Commerce  
**Eu quero** fazer login com minhas credenciais  
**Para** acessar funcionalidades restritas da plataforma

---

#  Cenários de Teste

## Cenários de Sucesso

#### **Cenário 1:** Login bem-sucedido com credenciais válidas usando comandos customizados
```gherkin
Dado que estou na página de login
Quando eu faço login com usuário e senha válidos através de comando customizado
Então devo ser redirecionado para a página dashboard
E devo visualizar o conteúdo da área logada
```

#### **Cenário 2:** Login bem-sucedido com credenciais válidas usando Page Objects
```gherkin
Dado que estou na página de login
Quando eu insiro "admin@admin.com" no campo de email
E eu insiro "admin" no campo de senha
E eu clico no botão de login
Então devo ser redirecionado para a página dashboard
```

#### **Cenário 3:** Logout bem-sucedido
```gherkin
Dado que estou autenticado no sistema
Quando eu clico no botão de logout
Então devo ser redirecionado para a página de login
E devo visualizar o título "LOGIN"
```

---

##  Cenários de Validação e Erro

#### **Cenário 4:** Tentativa de login com campo de email vazio
```gherkin
Dado que estou na página de login
Quando eu insiro "admin" no campo de senha
E eu deixo o campo de email vazio
E eu clico no botão de login
Então devo ver a mensagem de erro "Por favor, insira um email válido."
E não devo ser redirecionado para o dashboard
```

#### **Cenário 5:** Tentativa de login com senha incorreta
```gherkin
Dado que estou na página de login
Quando eu insiro "admin@admin.com" no campo de email
E eu insiro "senhaerrada" no campo de senha
E eu clico no botão de login
Então devo ver a mensagem de erro "Email ou senha incorretos"
E não devo ser redirecionado para o dashboard
```

#### **Cenário 6:** Tentativa de login com campo de senha vazio
```gherkin
Dado que estou na página de login
Quando eu insiro "admin@admin.com" no campo de email
E eu deixo o campo de senha vazio
E eu clico no botão de login
Então devo ver a mensagem de erro "Por favor, insira a senha."
E não devo ser redirecionado para o dashboard
```

#### **Cenário 7:** Tentativa de login com email com domínio inválido
```gherkin
Dado que estou na página de login
Quando eu insiro "usuario@.com" no campo de email
E eu insiro "Senha123" no campo de senha
E eu clico no botão de login
Então devo ver a mensagem de erro "Por favor, insira um email válido"
E não devo ser redirecionado para o dashboard
```

---

##  Validações de Formato e Segurança

#### **Cenário 8:** Proteção contra SQL Injection no campo de email
```gherkin
Dado que estou na página de login
Quando eu insiro "admin' OR '1'='1" no campo de email
E eu insiro "admin" no campo de senha
E eu clico no botão de login
Então devo ver mensagem indicando email inválido
E não devo ser autenticado no sistema
```

**Objetivo:** Verificar se a aplicação sanitiza inputs e previne ataques de SQL Injection.

---

#### **Cenário 9:** Proteção contra XSS (Cross-Site Scripting) no campo de email
```gherkin
Dado que estou na página de login
Quando eu insiro "<script>alert('XSS')</script>" no campo de email
E eu insiro "Senha123" no campo de senha
E eu clico no botão de login
Então o script não deve ser executado
E devo ver a mensagem de erro "Por favor, insira um email válido"
E não devo ser autenticado no sistema
```

**Objetivo:** Garantir que a aplicação não executa scripts maliciosos inseridos nos campos de entrada.

---

#### **Cenário 10:** Mensagem de erro genérica para credenciais inexistentes
```gherkin
Dado que estou na página de login
Quando eu insiro "naoexiste@test.com" no campo de email
E eu insiro "SenhaQualquer123" no campo de senha
E eu clico no botão de login
Então a mensagem de erro NÃO deve revelar se o email existe
E a mensagem NÃO deve conter "não cadastrado"
E a mensagem NÃO deve conter "não existe"
```

**Objetivo:** Verificar se a aplicação não vaza informações sobre a existência de usuários no sistema (boa prática de segurança).


---

##  Tecnologias Utilizadas

- **Framework de Testes:** Cypress
- **Padrões:** Page Objects, Comandos Customizados
- **Documentação:** BDD/Gherkin

---

##  Cobertura de Testes

| Categoria | Cenários | Status |
|-----------|----------|--------|
| Cenários de Sucesso | 3 | ✅ |
| Validação e Erro | 4 | ✅ |
| Segurança | 3 | ✅ |
| **Total** | **10** | **✅** |

---

##  Como Executar os Testes
```bash
# Executar todos os testes de login
npx cypress run --spec "cypress/e2e/login.cy.js"

# Executar em modo interativo
npx cypress open
```

---

##  Observações

- Todos os testes validam tanto o comportamento esperado quanto aspectos de segurança
- Os cenários cobrem validações de formato, segurança contra ataques comuns (SQL Injection, XSS) e boas práticas de UX
- A suite de testes utiliza tanto comandos customizados quanto Page Objects para manter a manutenibilidade

---
  

