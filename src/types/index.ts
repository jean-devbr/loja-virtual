export interface Produto {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string;
  categoria: string;
  estoque: number;
  peso?: number; // em gramas para cálculo de frete
  dimensoes?: {
    altura: number; // em cm
    largura: number; // em cm
    comprimento: number; // em cm
  };
}

export interface ItemCarrinho extends Produto {
  quantidade: number;
}

export interface Endereco {
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export interface CalculoFrete {
  valor: number;
  prazo: string;
  servico: string;
}

export interface DadosCliente {
  nome: string;
  cpf: string;
  telefone: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export interface Loja {
  produtos: Produto[];
  carrinho: ItemCarrinho[];
  visualizacaoAtual: 'loja' | 'admin' | 'carrinho';
  endereco?: Endereco;
  frete?: CalculoFrete[];
  adminLogado: boolean;
}