/// <reference types="cypress" />
import HomePage from "../pages/HomePage";
import LojaPage from "../pages/LojaPage";

describe('Loja Online VR', () => {

    beforeEach(() => {
        // O baseUrl está definido no cypress.config.js para manter o teste limpo.
        cy.visit('/');
        // Uso de Fixtures para separar a massa de dados da lógica do teste.
        cy.fixture('test-data').as('dadosLoja');
    });

    it('Deve adicionar cartões "Auto" ao carrinho - Com Sucesso', function () {
        const { auto } = this.dadosLoja.produtos;

        // Geração de massa de dados aleatória conforme requisitos do desafio.
        const qtd = Cypress._.random(auto.quantidadeMinima, auto.quantidadeMaxima).toString();
        const valor = Cypress._.random(auto.creditoMinimo, auto.creditoMaximo).toString() + ",00";

        // Abstração do fluxo em Page Objects para facilitar a leitura (DSL).
        HomePage.irParaLoja();
        LojaPage.adicionarProdutoAutoAoCarrinho(qtd, valor);

        cy.log(`Teste finalizado com Qtd: ${qtd} e Valor: R$ ${valor}`);
    });
});