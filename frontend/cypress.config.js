const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Habilita evidências automáticas em caso de falha para facilitar o debug via CI/CD.
  screenshotOnRunFailure: true,

  e2e: {
    baseUrl: 'https://www.vr.com.br',
    viewportWidth: 1280,
    viewportHeight: 720,

    /* Estratégia de Performance: Bloqueio de domínios de telemetria e analytics.
       Isso evita que scripts externos causem lentidão ou timeouts nos testes.
    */
    blockHosts: [
      "*.dynatrace.com",
      "*.google-analytics.com",
      "*.googletagmanager.com",
      "*.googleadservices.com",
      "*.doubleclick.net",
      "*.hotjar.com",
      "*.facebook.net"
    ],

    // Necessário para permitir a navegação entre subdomínios (vr.com.br e loja.vr.com.br).
    chromeWebSecurity: false,

    setupNodeEvents(on, config) {
      // Implementação futura de plugins ou listeners de node, se necessário.
    },
  },
});