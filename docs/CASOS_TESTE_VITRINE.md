# 📋 Documentação de Testes - Funcionalidade de Vitrine

##  Visão Geral

Esta documentação descreve os cenários de teste automatizados para a funcionalidade de vitrine (listagem de produtos) do sistema QA Commerce, escritos em formato BDD (Behavior-Driven Development) usando a sintaxe Gherkin.

---

##  Funcionalidade: Exibição e navegação de produtos na vitrine

**Como** um usuário do sistema QA Commerce  
**Eu quero** visualizar e navegar pelos produtos disponíveis  
**Para** escolher produtos de interesse e acessar seus detalhes

---

#  Cenários de Teste

##  Cenários de Navegação e Busca

#### **Cenário 1:** Buscar produto pelo nome
```gherkin
Dado que estou na página da vitrine
E os produtos estão visíveis
Quando eu busco por "Moletom com capuz"
E clico no produto encontrado
Então devo ser redirecionado para a página de detalhes do produto
E devo visualizar o botão "Voltar" ou elemento secundário
```

---

#### **Cenário 2:** Clicar no primeiro produto da lista
```gherkin
Dado que estou na página da vitrine
E os produtos estão visíveis
Quando eu clico na imagem do primeiro produto
Então devo ser redirecionado para a página de detalhes
E a URL deve conter "product.html"
```

---

#### **Cenário 3:** Clicar no último produto da lista
```gherkin
Dado que estou na página da vitrine
E os produtos estão visíveis
Quando eu clico na imagem do último produto
Então devo ser redirecionado para a página de detalhes
E devo visualizar o título 'Moletom com capuz "Const"'
E a URL deve conter "product.html"
```

---

#### **Cenário 4:** Clicar no terceiro produto da lista
```gherkin
Dado que estou na página da vitrine
E os produtos estão visíveis
Quando eu clico na imagem do terceiro produto (índice 2)
Então devo ser redirecionado para a página de detalhes
E devo visualizar o título 'Ecobag "Na minha máquina funciona"'
```

---

#### **Cenário 5:** Buscar produto usando massa de dados (fixture - produto único)
```gherkin
Dado que estou na página da vitrine
E possuo dados de teste de um produto específico em arquivo fixture
Quando eu busco pelo nome do produto através dos dados do fixture
E clico no produto encontrado
Então devo visualizar o preço correspondente aos dados do fixture
```

**Objetivo:** Validar integração com massa de dados e garantir consistência entre vitrine e detalhes do produto.

---

#### **Cenário 6:** Buscar múltiplos produtos usando massa de dados (fixture)
```gherkin
Dado que estou na página da vitrine
E possuo dados de teste de múltiplos produtos em arquivo fixture
Quando eu itero sobre cada produto da lista de fixtures
E para cada produto eu:
  - Busco pelo nome
  - Clico no produto
  - Valido o preço na página de detalhes
  - Volto para a vitrine
Então todos os produtos devem exibir os preços corretos conforme os dados de teste
E a navegação deve funcionar corretamente para todos os itens
```

**Objetivo:** Testar navegação repetida e validação de dados em lote usando data-driven testing.

---

## Validações de Exibição e Conteúdo

#### **Cenário 7:** Todos os produtos devem exibir imagem, nome e preço
```gherkin
Dado que estou na página da vitrine
Quando eu verifico todos os cards de produtos
Então cada card deve conter:
  - Uma imagem visível do produto
  - Um nome/título do produto (não vazio)
  - Um elemento de preço
```

**Objetivo:** Garantir consistência visual e completude de informações em todos os produtos listados.

---

#### **Cenário 8:** Preços devem estar no formato correto
```gherkin
Dado que estou na página da vitrine
Quando eu verifico o preço exibido no primeiro produto
Então o preço deve estar no formato "R$ XX,XX" ou "R$ XX.XX"
E deve conter o símbolo "R$" seguido de números
```

**Objetivo:** Validar formatação correta de valores monetários conforme padrão brasileiro.

---

#### **Cenário 9:** Todas as imagens de produtos devem carregar corretamente
```gherkin
Dado que estou na página da vitrine
Quando eu verifico todas as imagens de produtos
Então todas as imagens devem estar visíveis
E nenhuma imagem deve estar quebrada (naturalWidth > 0)
```

**Objetivo:** Detectar imagens quebradas ou com erro de carregamento que prejudicam a experiência do usuário.

---

## Validações de Navegação e Responsividade

#### **Cenário 10:** Manter listagem de produtos ao voltar da página de detalhes
```gherkin
Dado que estou na página da vitrine
E conto a quantidade de produtos exibidos
Quando eu clico em um produto
E sou redirecionado para a página de detalhes
E volto para a vitrine usando o botão "Voltar" do navegador
Então a quantidade de produtos exibidos deve ser a mesma de antes
E a listagem deve estar completa e funcional
```

**Objetivo:** Verificar se o estado da vitrine é preservado após navegação (evitar perda de contexto).

---

#### **Cenário 11:** Vitrine deve exibir pelo menos 3 produtos
```gherkin
Dado que estou na página da vitrine
Quando a página carrega completamente
Então devem ser exibidos pelo menos 3 produtos
```

**Objetivo:** Validar conteúdo mínimo esperado na vitrine (detecção de falha de carregamento).

---

## Validações de Segurança e Edge Cases

#### **Cenário 12:** Não deve permitir acesso direto a produto inexistente
```gherkin
Dado que tento acessar diretamente a URL de um produto com ID inexistente
Quando acesso "/product.html?id=99999"
Então a API deve retornar status 404 (Not Found)
E a página não deve exibir informações de produto
E não deve haver botão "Adicionar ao carrinho"
```

**Objetivo:** Garantir tratamento adequado de requisições inválidas e prevenir acesso não autorizado ou erro de exibição.

---

##  Tecnologias Utilizadas

- **Framework de Testes:** Cypress
- **Padrões:** Data-Driven Testing (Fixtures)
- **Documentação:** BDD/Gherkin

---

##  Cobertura de Testes

| Categoria | Cenários | Status |
|-----------|----------|--------|
| Navegação e Busca | 6 | ✅ |
| Validações de Exibição | 3 | ✅ |
| Navegação e Responsividade | 2 | ✅ |
| Segurança e Edge Cases | 1 | ✅ |
| **Total** | **12** | **✅** |

---

##  Como Executar os Testes
```bash
# Executar todos os testes de vitrine
npx cypress run --spec "cypress/e2e/vitrine.cy.js"

# Executar em modo interativo
npx cypress open
```

---

##  Observações Importantes

### Decisões de Teste

- **Data-Driven Testing:** Utilizei arquivos fixture (`produto-unico.json` e `multiplos-produtos.json`) para validar consistência de dados entre vitrine e página de detalhes
- **Validação de imagens:** Implementei verificação de `naturalWidth` para detectar imagens quebradas, problema comum em aplicações web
- **Seletores robustos:** Priorizei seletores por classes CSS (`.card-body`) ao invés de `:nth-child()` para maior estabilidade dos testes

### Limitações Conhecidas

- Não foram testados cenários de **paginação** (se a vitrine tiver muitos produtos)
- Testes de **performance** (tempo de carregamento) não estão incluídos
- **Responsividade mobile** não foi validada (apenas viewport desktop)

### Melhorias Futuras Recomendadas

- Validar comportamento de "produtos esgotados" ou "em promoção"
- Adicionar testes de acessibilidade (alt text em imagens, navegação por teclado)

---

##  Bugs Identificados

| ID | Severidade | Descrição | Status |
|----|-----------|-----------|--------|
| BUG-VIT-001 | Média | Algumas imagens de produtos não carregam corretamente | Identificado |
| BUG-VIT-002 | Baixa | Produto inexistente (ID inválido) não exibe mensagem de erro amigável | Identificado |

---
