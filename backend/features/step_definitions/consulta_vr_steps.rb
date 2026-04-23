Dado('que eu faça uma requisição para o endpoint da VR') do
  # Centralização do endpoint na classe VR_API para facilitar a manutenção da URL base.
  @response = VR_API.get('/') 
end

Então('o JSON retornado deve possuir a chave {string}') do |chave|
  # Validação de contrato: garante que a estrutura básica do JSON permanece íntegra.
  expect(@response.parsed_response).to have_key(chave)
end

Então('eu imprimo um tipo de estabelecimento aleatório') do
  # Extração da lista de estabelecimentos para manipulação de dados dinâmicos.
  estabelecimentos = @response['typeOfEstablishment']
  
  # Seleção aleatória via método .sample do Ruby, conforme requisito do desafio.
  item_aleatorio = estabelecimentos.sample
  
  puts "Tipo de estabelecimento sorteado: #{item_aleatorio}"
end