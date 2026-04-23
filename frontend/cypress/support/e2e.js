import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
    // Retornar false impede o Cypress de falhar o teste
    // quando encontra erros de scripts de terceiros (CORS)
    return false;
});