require 'httparty'

# Classe para centralizar a comunicação com a API da VR.
# O uso do HTTParty permite uma abstração limpa das requisições e headers.
class VR_API
  include HTTParty

  # URL base definida conforme o contrato da API VRPAT.
  base_uri 'https://portal.vr.com.br/api-web/comum/enumerations/VRPAT'

  # Configuração padrão de headers para garantir a comunicação via JSON.
  headers 'Content-Type' => 'application/json'

  # Método para realizar chamadas GET de forma simples e legível nos steps.
  def self.get(endpoint)
    super(endpoint)
  end
end