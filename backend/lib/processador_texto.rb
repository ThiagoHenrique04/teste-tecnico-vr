# Classe responsável pela lógica de manipulação de strings.
# Isolada em 'lib' para permitir testes unitários independentes da interface do Cucumber.
class ProcessadorTexto
  def self.limpar(texto, marcadores)
    # Identifica a posição de todos os marcadores presentes na string.
    # O uso do .compact remove valores nulos caso um marcador não seja encontrado.
    indices = marcadores.map { |m| texto.index(m) }.compact

    # Se houver ao menos um marcador, determina o ponto de corte pelo índice mínimo (o primeiro a aparecer).
    if indices.any?
      primeiro_indice = indices.min
      # Realiza o fatiamento da string preservando apenas o conteúdo anterior ao marcador.
      texto = texto[0...primeiro_indice]
    end

    # Retorno da string tratada, removendo espaços em branco remanescentes nas extremidades.
    texto.strip
  end
end