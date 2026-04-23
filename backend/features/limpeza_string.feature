# language: pt

Funcionalidade: Processamento de Texto
  # Esta funcionalidade resolve o desafio de manipulação de strings solicitado.
  # O objetivo é garantir que o sistema limpe corretamente entradas baseando-se em delimitadores.
  Como um sistema de tratamento de dados
  Desejo remover trechos de texto após marcadores específicos
  Para garantir a integridade da informação limpa

  @logica @unitario
  Esquema do Cenário: Validar remoção de conteúdo após símbolos
    # O uso de Esquema do Cenário foi escolhido para maximizar a 
    # cobertura de testes e manter o código DRY (Sem repetição de codigo).
    Dado que eu tenha a frase "<entrada>"
    Quando eu aplicar os marcadores <marcadores>
    Então o resultado final deve ser "<saida_esperada>"

    Exemplos:
      | entrada                                          | marcadores           | saida_esperada               |
      | bananas, tomates # e ventiladores                | ["#", "!"]           | bananas, tomates             |
      | o rato roeu a roupa $ do rei % de roma           | ["%", "!"]           | o rato roeu a roupa $ do rei |
      | the quick brown fox & jumped over * the lazy dog | ["&", "*", "%", "!"] | the quick brown fox          |