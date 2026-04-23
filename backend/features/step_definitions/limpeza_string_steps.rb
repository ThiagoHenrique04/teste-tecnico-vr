require_relative '../../lib/processador_texto'

Dado('que eu tenha a frase {string}') do |entrada|
  @entrada = entrada
end

Quando(/^eu aplicar os marcadores (.*)$/) do |marcadores_string|
  require 'json'
  
  # 1. Limpamos espaços extras que vêm da tabela do Cucumber (.strip)
  # 2. Substituímos aspas simples por duplas para o JSON ficar válido
  string_limpa = marcadores_string.strip.gsub("'", '"')
  
  @marcadores = JSON.parse(string_limpa)
  
  # Chamamos a classe que criamos na pasta lib
  @resultado = ProcessadorTexto.limpar(@entrada, @marcadores)
end

Então('o resultado final deve ser {string}') do |saida_esperada|
  expect(@resultado).to eq(saida_esperada)
end