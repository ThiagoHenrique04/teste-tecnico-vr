import { APP_CONFIG } from '../config/app-config';

// Mapeamento centralizado de seletores. 
// Foram priorizados atributos estáveis para garantir a resiliência dos testes.
const Elementos = {
    tituloModalidade: '.shelf-product-container__title',
    botaoSelecionar: 'button#btn-selecionar-0',
    botaoAdicionarAuto: '[data-testid="adicionar-produto-28"]',
    campoQuantidade: '#produto-auto-quantidade',
    campoValor: '#produto-auto-valor',
    secaoResumo: '.summary-holder',
    containerLinhasResumo: '.solutions-product-row',
    botaoSeguirCompra: '#carrinho-seguir-para-a-compra'
};

class LojaPage {

    acessarSolucoesVR() {
        // O uso do cy.origin é indispensável devido à mudança de subdomínio.
        // Injetei o objeto Elementos via args para que o contexto isolado o reconheça.
        cy.origin(APP_CONFIG.URLS.SHOP, { args: { Elementos } }, ({ Elementos }) => {
            cy.contains(Elementos.tituloModalidade, 'Soluções VR', { timeout: 20000 })
                .should('be.visible')
                .parent()
                .find(Elementos.botaoSelecionar)
                .click();
        });
    }

    selecionarProdutoAuto() {
        cy.origin(APP_CONFIG.URLS.SHOP, { args: { Elementos } }, ({ Elementos }) => {
            cy.get(Elementos.botaoAdicionarAuto, { timeout: 20000 })
                .should('be.visible')
                .click();
        });
    }

    preencherDadosAuto(quantidade, valor) {
        cy.origin(APP_CONFIG.URLS.SHOP, { args: { Elementos, quantidade, valor } }, ({ Elementos, quantidade, valor }) => {
            cy.get(Elementos.campoQuantidade, { timeout: 15000 })
                .should('be.visible')
                .clear()
                .type(quantidade);

            // O delay simula o comportamento humano e evita que o sistema ignore inputs rápidos.
            cy.get(Elementos.campoValor)
                .should('be.visible')
                .type(valor, { delay: 60 });
        });
    }

    validarCarrinhoComSucesso(quantidade, valor) {
        cy.origin(APP_CONFIG.URLS.SHOP, { args: { Elementos, quantidade, valor } }, ({ Elementos, quantidade, valor }) => {
            cy.get(Elementos.secaoResumo, { timeout: 15000 }).should('be.visible');

            // Validação de dados dinâmicos injetados no carrinho.
            cy.get(Elementos.containerLinhasResumo).contains(`x${quantidade}`).should('be.visible');
            cy.contains(Elementos.containerLinhasResumo, 'Auto').contains(valor).should('be.visible');

            // Lógica de validação: garantindo que o cálculo de Total está correto.
            const valorNumerico = parseFloat(valor.replace('.', '').replace(',', '.'));
            const totalCalculado = (quantidade * valorNumerico);

            const totalFormatado = totalCalculado.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            cy.contains(Elementos.containerLinhasResumo, 'Total')
                .contains(totalFormatado)
                .should('be.visible');

            cy.get(Elementos.botaoSeguirCompra).should('be.visible');
        });
    }

    // Método que orquestra as ações da página, facilitando a leitura do script de teste.
    adicionarProdutoAutoAoCarrinho(quantidade, valor) {
        this.acessarSolucoesVR();
        this.selecionarProdutoAuto();
        this.preencherDadosAuto(quantidade, valor);
        this.validarCarrinhoComSucesso(quantidade, valor);
    }
}

export default new LojaPage();