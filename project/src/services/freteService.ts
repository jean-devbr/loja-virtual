export interface CalculoFreteParams {
  cepOrigem: string;
  cepDestino: string;
  peso: number; // em gramas
  altura: number; // em cm
  largura: number; // em cm
  comprimento: number; // em cm
}

export interface ResultadoFrete {
  servico: string;
  valor: number;
  prazo: string;
  erro?: string;
}

// Simulação de API de frete (baseada nos Correios)
export const calcularFrete = async (params: CalculoFreteParams): Promise<ResultadoFrete[]> => {
  // Simula delay da API
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const { peso, altura, largura, comprimento } = params;
  
  // Cálculo básico simulado
  const volumeM3 = (altura * largura * comprimento) / 1000000; // convertendo para m³
  const pesoKg = peso / 1000; // convertendo para kg
  
  const pesoVolumetrico = volumeM3 * 200; // fator de conversão
  const pesoFinal = Math.max(pesoKg, pesoVolumetrico);
  
  const resultados: ResultadoFrete[] = [
    {
      servico: 'PAC',
      valor: Math.max(15.50, pesoFinal * 8.50),
      prazo: '8 a 12 dias úteis'
    },
    {
      servico: 'SEDEX',
      valor: Math.max(25.80, pesoFinal * 15.20),
      prazo: '2 a 4 dias úteis'
    },
    {
      servico: 'SEDEX 10',
      valor: Math.max(35.90, pesoFinal * 22.30),
      prazo: '1 dia útil'
    }
  ];
  
  return resultados;
};

export const buscarCEP = async (cep: string) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    
    if (data.erro) {
      throw new Error('CEP não encontrado');
    }
    
    return {
      cep: data.cep,
      logradouro: data.logradouro,
      bairro: data.bairro,
      cidade: data.localidade,
      uf: data.uf
    };
  } catch (error) {
    throw new Error('Erro ao buscar CEP');
  }
};