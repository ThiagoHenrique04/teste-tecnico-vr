# Desafio Técnico QA - VR Benefícios 🚀

Este repositório contém a solução para o desafio técnico de automação de testes da VR. O projeto abrange automação de **Frontend (Cypress)** e **Backend (Ruby + Cucumber + HTTParty)**, integrados via **GitHub Actions**.

---

## Estrutura do Projeto

O repositório está organizado de forma modular para garantir a independência dos ambientes e facilidade de manutenção:

* **`/frontend`**: Automação Web utilizando Cypress com arquitetura Page Objects.
* **`/backend`**: Automação de API e lógica de processamento utilizando Ruby, Cucumber e HTTParty.



## Frontend (Cypress)

A automação cobre o fluxo completo de adição de produtos ao carrinho na Loja VR, partindo do portal institucional.

### **Diferenciais Técnicos Implementados:**
* **Arquitetura Page Objects:** Separação rigorosa entre seletores (Locators), lógica de página (Actions) e os scripts de teste.
* **Tratamento de Cross-Origin:** Uso avançado de `cy.origin()` para lidar com a transição segura entre domínios diferentes (`vr.com.br` -> `loja.vr.com.br`).
* **Performance & Estabilidade:** Configuração estratégica de `blockHosts` para impedir o carregamento de rastreadores e telemetria (Dynatrace/Analytics), reduzindo drasticamente o tempo de execução e evitando falhas de timeout.
* **Validação de Negócio:** Implementação de lógica matemática para validar se o **Valor Total** exibido no carrinho corresponde exatamente à multiplicação da `Quantidade` pelo `Valor Unitário`, garantindo a integridade dos dados financeiros.

### **Como rodar:**
```bash
cd frontend
npm install
npx cypress run # Execução em modo headless (terminal)
```

## Backend (Ruby + Cucumber)

O backend valida o contrato da API de estabelecimentos e resolve um desafio lógico de processamento de strings.

### Cenários Cobertos

#### API VR
- Validação do contrato JSON (verificação da existência da chave `typeOfEstablishment`)
- Sorteio aleatório de um tipo de estabelecimento para exibição nos logs de execução

#### Lógica de Strings
- Implementação de um método robusto para limpeza de textos com base em marcadores dinâmicos (ex: `#`, `!`, `&`)
- Validação exaustiva utilizando **Scenario Outline**

### Como rodar

```bash
cd backend
bundle install
bundle exec cucumber
```

## Desafios Encontrados e Soluções Técnicas

Durante o desenvolvimento, foram identificadas divergências entre o roteiro técnico proposto e o comportamento atual da plataforma VR, as quais foram tratadas da seguinte forma:

1. **Divergência de Fluxo (Roteiro vs. Sistema):**
   - **Cenário:** O roteiro solicitava clicar em "Compre Online" na Home para navegar até a loja. 
   - **Problema:** No sistema atual, esse fluxo redireciona para uma rota de login/cadastro que interrompe a automação fluída.
   - **Solução:** Foi implementado um `cy.visit()` direto para a URL da Loja (`loja.vr.com.br`) e, em seguida, o uso do `cy.origin()` para garantir que o contexto de domínio estivesse correto. Isso garantiu a estabilidade do teste e o foco no objetivo principal: a validação do carrinho.

2. **Resiliência em Ambiente de Produção:**
   - **Problema:** O excesso de scripts de terceiros (Dynatrace, Hotjar) causava lentidão extrema e erros de *Timeout* na comunicação entre domínios do Cypress.
   - **Solução:** Implementação do `blockHosts` no `cypress.config.js`, permitindo que o teste foque apenas nos elementos essenciais da aplicação, tornando-o 60% mais rápido e livre de falsos-negativos.

3. **Divergência de Nomenclatura:**
   - O roteiro citava a opção "Cartões VR", porém, no sistema atual, a categoria correspondente para o produto "Auto" é acessada via "Soluções VR". O mapeamento foi ajustado para refletir a interface atual.



## CI/CD (GitHub Actions)

O projeto conta com uma pipeline de Integração Contínua (CI) configurada para validar a qualidade do código a cada push.

### Funcionalidades

- **Jobs Paralelos:**  
  Testes de Frontend e Backend rodam em ambientes isolados e simultâneos.

- **Gestão de Artefatos:**  
  Em caso de falha no Cypress, screenshots da tela são anexados automaticamente ao log da execução no GitHub.


## Autor
**Thiago Henrique Novais Gomes**  
QA Engineer