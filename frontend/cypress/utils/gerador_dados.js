/**
 * Helper: GeradorDados
 * Classe utilitária para centralizar a lógica de criação de massa de dados.
 * O objetivo é manter os scripts de teste limpos e focar na regra de negócio.
 */
class GeradorDados {
    // Encapsulamento da lógica de sorteio numérico para reaproveitamento em múltiplos fluxos.
    static numeroAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Gera um valor financeiro formatado para o padrão brasileiro (PT-BR).
     * Essencial para inputs que validam a máscara de moeda em tempo real na interface.
     */
    static valorMoedaAleatorio(min, max) {
        const valor = (Math.random() * (max - min) + min).toFixed(2);
        return valor.replace('.', ',');
    }
}

export default GeradorDados;