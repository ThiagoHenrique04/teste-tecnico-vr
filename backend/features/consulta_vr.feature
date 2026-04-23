# language: pt

Funcionalidade: Consulta de Produtos e Estabelecimentos
  Como um usuário da API da VR
  Desejo consultar os dados de estabelecimentos
  Para validar as informações retornadas pelo serviço

  Cenário: Validar chave typeOfEstablishment e imprimir um tipo aleatório
    Dado que eu faça uma requisição para o endpoint da VR
    Então o JSON retornado deve possuir a chave "typeOfEstablishment"
    E eu imprimo um tipo de estabelecimento aleatório