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

export interface ConfiguracaoLoja {
  id: string;
  nomeLoja: string;
  descricaoLoja: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
  };
  contato: {
    whatsapp: string;
    email: string;
    telefone: string;
  };
  horarioFuncionamento: {
    segunda: string;
    terca: string;
    quarta: string;
    quinta: string;
    sexta: string;
    sabado: string;
    domingo: string;
  };
  redesSociais: {
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
  };
  informacoesLegais: {
    cnpj: string;
    razaoSocial: string;
    inscricaoEstadual: string;
  };
  beneficios: {
    freteGratis: {
      ativo: boolean;
      valorMinimo: number;
    };
    garantia: {
      ativo: boolean;
      texto: string;
    };
    pagamentoPix: {
      ativo: boolean;
      desconto: number;
    };
    produtosOriginais: {
      ativo: boolean;
      texto: string;
    };
  };
}

export interface Loja {
  produtos: Produto[];
  carrinho: ItemCarrinho[];
  visualizacaoAtual: 'loja' | 'admin' | 'carrinho';
  endereco?: Endereco;
  frete?: CalculoFrete[];
  adminLogado: boolean;
  configuracao: ConfiguracaoLoja;
}