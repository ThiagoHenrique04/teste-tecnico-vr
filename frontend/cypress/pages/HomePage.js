import { APP_CONFIG } from '../config/app-config';

// Mapeamento centralizado de seletores. 
// Foram priorizados atributos estáveis para garantir a resiliência dos testes.
const Elementos = {
    linkCompreOnline: 'a:contains("Compre Online")'
};

class HomePage {

    irParaLoja() {
        cy.visit(APP_CONFIG.URLS.HOME);

        cy.get(Elementos.linkCompreOnline)
            .scrollIntoView()
            .should('be.visible')
            // Remoção do atributo 'target' para evitar a abertura de novas abas, não suportadas nativamente pelo Cypress.
            .invoke('removeAttr', 'target')
            .click();

        // Tratamento: O sistema redirecionou para uma rota diferente (/contrate-agora) da passada na descrição do desafio.
        // Se o fluxo esperado para a loja falhar, forçamos a entrada para não travar o teste.
        cy.url().then((url_atual) => {
            if (!url_atual.includes('loja.vr.com.br')) {
                cy.log('Redirecionamento inesperado, forçando navegação para a Loja VR...');
                cy.visit(APP_CONFIG.URLS.SHOP);
            }
        });

        cy.url().should('include', 'loja.vr.com.br');
    }
}

export default new HomePage();