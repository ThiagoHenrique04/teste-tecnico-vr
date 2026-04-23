// Centralização de constantes para facilitar a manutenção e evitar duplicações no código.
export const APP_CONFIG = {
    URLS: {
        HOME: 'https://www.vr.com.br',
        SHOP: 'https://loja.vr.com.br',
    },
    // Timeouts personalizados para lidar com a latência variável do ambiente de produção.
    TIMEOUTS: {
        DEFAULT: 10000,
        NAVEGACAO: 15000,
    }
};