require_relative '../../lib/processador_texto'

Dado('que eu tenha a frase {string}') do |entrada|
  @entrada = entrada
end

Quando(/^eu aplicar os marcadores (.*)$/) do |marcadores_string|
  require 'json'
  
  # Tratamento da string vinda do Cucumber para garantir um parse de JSON válido.
  # Isso permite que o teste aceite diferentes formatos de lista via tabelas ou strings.
  string_limpa = marcadores_string.strip.gsub("'", '"')
  @marcadores = JSON.parse(string_limpa)
  
  # Delegação da lógica para uma classe especializada (lib), mantendo os steps limpos.
  @resultado = ProcessadorTexto.limpar(@entrada, @marcadores)
end

Então('o resultado final deve ser {string}') do |saida_esperada|
  # Validação da saída processada vs o resultado esperado definido no cenário.
  expect(@resultado).to eq(saida_esperada)
end