import { useState, useEffect } from 'react';
import { Produto, ItemCarrinho, Loja, Endereco, CalculoFrete, ConfiguracaoLoja } from '../types';

const produtosIniciais: Produto[] = [
  {
    id: '1',
    nome: 'Tênis Nike Air Max 270',
    preco: 699.99,
    descricao: 'Tênis esportivo com tecnologia Air Max, conforto excepcional e design moderno para corrida e uso casual',
    imagem: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoria: 'Tênis',
    estoque: 25,
    peso: 800,
    dimensoes: { altura: 15, largura: 30, comprimento: 35 }
  },
  {
    id: '2',
    nome: 'Camisa Flamengo 2024 - Futebol',
    preco: 299.99,
    descricao: 'Camisa oficial do Flamengo temporada 2024, tecido Dri-FIT, perfeita para torcer e jogar',
    imagem: 'https://flamengo.vteximg.com.br/arquivos/ids/169036-1000-1000/IP8199-1-APPAREL-Photography-Front-View-white.jpg?v=638717723595030000',
    categoria: 'Camisas de Time',
    estoque: 40,
    peso: 200,
    dimensoes: { altura: 70, largura: 50, comprimento: 2 }
  },
  {
    id: '3',
    nome: 'Mochila Adidas Originals',
    preco: 249.99,
    descricao: 'Mochila urbana com design clássico, múltiplos compartimentos e material resistente',
    imagem: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoria: 'Mochilas',
    estoque: 18,
    peso: 600,
    dimensoes: { altura: 45, largura: 30, comprimento: 15 }
  },
  {
    id: '4',
    nome: 'Tênis Adidas Ultraboost 22',
    preco: 899.99,
    descricao: 'Tênis de corrida premium com tecnologia Boost, máximo retorno de energia e conforto',
    imagem: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoria: 'Tênis',
    estoque: 15,
    peso: 750,
    dimensoes: { altura: 15, largura: 30, comprimento: 35 }
  },
  {
    id: '5',
    nome: 'Camisa Flamengo Basquete 2024',
    preco: 199.99,
    descricao: 'Regata oficial do Flamengo basquete, tecido respirável e design exclusivo da temporada',
    imagem: 'https://acdn-us.mitiendanube.com/stores/001/775/982/products/jj0664_fr_torso_ecom-3-removebg-preview-0336e257ce618b5c5317329203418914-1024-1024.png',
    categoria: 'Camisas de Time',
    estoque: 30,
    peso: 180,
    dimensoes: { altura: 75, largura: 55, comprimento: 2 }
  },
  {
    id: '6',
    nome: 'Mochila Nike Brasília',
    preco: 179.99,
    descricao: 'Mochila esportiva versátil, ideal para academia, escola e viagens, com compartimento para notebook',
    imagem: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoria: 'Mochilas',
    estoque: 22,
    peso: 500,
    dimensoes: { altura: 40, largura: 28, comprimento: 18 }
  },
  {
    id: '7',
    nome: 'Tênis Puma RS-X',
    preco: 549.99,
    descricao: 'Tênis lifestyle com design futurista, amortecimento RS e estilo urbano único',
    imagem: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoria: 'Tênis',
    estoque: 20,
    peso: 850,
    dimensoes: { altura: 15, largura: 32, comprimento: 36 }
  },
  {
    id: '8',
    nome: 'Camisa Flamengo Retrô 1981',
    preco: 349.99,
    descricao: 'Camisa retrô oficial do Flamengo ano 1981, edição especial comemorativa com qualidade premium',
    imagem: 'https://images.tcdn.com.br/img/img_prod/657285/camisa_retro_flamengo_mundial_81_zico_dry_197_1_20220408102813.jpg',
    categoria: 'Camisas de Time',
    estoque: 12,
    peso: 220,
    dimensoes: { altura: 70, largura: 50, comprimento: 2 }
  },
  {
    id: '9',
    nome: 'Mochila JanSport SuperBreak',
    preco: 159.99,
    descricao: 'Mochila clássica americana, resistente e confortável, perfeita para uso diário',
    imagem: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoria: 'Mochilas',
    estoque: 35,
    peso: 400,
    dimensoes: { altura: 42, largura: 33, comprimento: 21 }
  },
  {
    id: '10',
    nome: 'Tênis Vans Old Skool',
    preco: 399.99,
    descricao: 'Tênis skate clássico com design icônico, durabilidade excepcional e estilo atemporal',
    imagem: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoria: 'Tênis',
    estoque: 28,
    peso: 700,
    dimensoes: { altura: 12, largura: 30, comprimento: 34 }
  }
];

const configuracaoInicial: ConfiguracaoLoja = {
  id: '1',
  nomeLoja: 'MegaStore',
  descricaoLoja: 'Sua loja de esportes favorita! Oferecemos os melhores produtos esportivos com qualidade premium e preços imbatíveis para todo o Brasil.',
  endereco: {
    rua: 'Rua das Laranjeiras',
    numero: '123',
    bairro: 'Laranjeiras',
    cidade: 'Rio de Janeiro',
    uf: 'RJ',
    cep: '22240-000'
  },
  contato: {
    whatsapp: '5521989365166',
    email: 'contato@megastore.com.br',
    telefone: '(21) 3234-5678'
  },
  horarioFuncionamento: {
    segunda: '9h às 18h',
    terca: '9h às 18h',
    quarta: '9h às 18h',
    quinta: '9h às 18h',
    sexta: '9h às 18h',
    sabado: '9h às 17h',
    domingo: '10h às 16h'
  },
  redesSociais: {
    instagram: 'https://instagram.com/megastore',
    facebook: 'https://facebook.com/megastore',
    twitter: 'https://twitter.com/megastore',
    youtube: 'https://youtube.com/megastore'
  },
  informacoesLegais: {
    cnpj: '12.345.678/0001-90',
    razaoSocial: 'MegaStore Esportes Ltda',
    inscricaoEstadual: '123.456.789'
  },
  beneficios: {
    freteGratis: {
      ativo: true,
      valorMinimo: 299
    },
    garantia: {
      ativo: true,
      texto: 'Garantia oficial'
    },
    pagamentoPix: {
      ativo: true,
      desconto: 5
    },
    produtosOriginais: {
      ativo: true,
      texto: 'Produtos 100% originais'
    }
  }
};

export const useLoja = () => {
  const [loja, setLoja] = useState<Loja>(() => {
    const saved = localStorage.getItem('loja-virtual-br');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        produtos: parsed.produtos || produtosIniciais,
        carrinho: parsed.carrinho || [],
        visualizacaoAtual: 'loja' as const,
        adminLogado: false,
        configuracao: parsed.configuracao || configuracaoInicial,
        endereco: parsed.endereco,
        frete: parsed.frete
      };
    }
    
    return {
      produtos: produtosIniciais,
      carrinho: [],
      visualizacaoAtual: 'loja' as const,
      adminLogado: false,
      configuracao: configuracaoInicial
    };
  });

  useEffect(() => {
    localStorage.setItem('loja-virtual-br', JSON.stringify({
      produtos: loja.produtos,
      carrinho: loja.carrinho,
      endereco: loja.endereco,
      frete: loja.frete,
      configuracao: loja.configuracao
    }));
  }, [loja.produtos, loja.carrinho, loja.endereco, loja.frete, loja.configuracao]);

  const adicionarProduto = (produto: Omit<Produto, 'id'>) => {
    const novoProduto: Produto = {
      ...produto,
      id: Date.now().toString()
    };
    setLoja(prev => ({
      ...prev,
      produtos: [...prev.produtos, novoProduto]
    }));
  };

  const atualizarProduto = (id: string, atualizacoes: Partial<Produto>) => {
    setLoja(prev => ({
      ...prev,
      produtos: prev.produtos.map(p => 
        p.id === id ? { ...p, ...atualizacoes } : p
      )
    }));
  };

  const excluirProduto = (id: string) => {
    setLoja(prev => ({
      ...prev,
      produtos: prev.produtos.filter(p => p.id !== id),
      carrinho: prev.carrinho.filter(item => item.id !== id)
    }));
  };

  const atualizarConfiguracao = (novaConfiguracao: Partial<ConfiguracaoLoja>) => {
    setLoja(prev => ({
      ...prev,
      configuracao: { ...prev.configuracao, ...novaConfiguracao }
    }));
  };

  const adicionarAoCarrinho = (produto: Produto) => {
    setLoja(prev => {
      const itemExistente = prev.carrinho.find(item => item.id === produto.id);
      if (itemExistente) {
        return {
          ...prev,
          carrinho: prev.carrinho.map(item =>
            item.id === produto.id
              ? { ...item, quantidade: item.quantidade + 1 }
              : item
          )
        };
      }
      return {
        ...prev,
        carrinho: [...prev.carrinho, { ...produto, quantidade: 1 }]
      };
    });
  };

  const removerDoCarrinho = (id: string) => {
    setLoja(prev => ({
      ...prev,
      carrinho: prev.carrinho.filter(item => item.id !== id)
    }));
  };

  const atualizarQuantidadeCarrinho = (id: string, quantidade: number) => {
    if (quantidade <= 0) {
      removerDoCarrinho(id);
      return;
    }
    setLoja(prev => ({
      ...prev,
      carrinho: prev.carrinho.map(item =>
        item.id === id ? { ...item, quantidade } : item
      )
    }));
  };

  const definirVisualizacao = (visualizacao: Loja['visualizacaoAtual']) => {
    setLoja(prev => ({ ...prev, visualizacaoAtual: visualizacao }));
  };

  const definirEndereco = (endereco: Endereco) => {
    setLoja(prev => ({ ...prev, endereco }));
  };

  const definirFrete = (frete: CalculoFrete[]) => {
    setLoja(prev => ({ ...prev, frete }));
  };

  const logarAdmin = (sucesso: boolean) => {
    setLoja(prev => ({ ...prev, adminLogado: sucesso }));
  };

  const deslogarAdmin = () => {
    setLoja(prev => ({ 
      ...prev, 
      adminLogado: false,
      visualizacaoAtual: 'loja'
    }));
  };

  const limparCarrinho = () => {
    setLoja(prev => ({ ...prev, carrinho: [] }));
  };

  const obterTotalCarrinho = () => {
    return loja.carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  const obterQuantidadeItensCarrinho = () => {
    return loja.carrinho.reduce((count, item) => count + item.quantidade, 0);
  };

  const obterPesoTotalCarrinho = () => {
    return loja.carrinho.reduce((peso, item) => peso + ((item.peso || 0) * item.quantidade), 0);
  };

  return {
    ...loja,
    adicionarProduto,
    atualizarProduto,
    excluirProduto,
    atualizarConfiguracao,
    adicionarAoCarrinho,
    removerDoCarrinho,
    atualizarQuantidadeCarrinho,
    definirVisualizacao,
    definirEndereco,
    definirFrete,
    logarAdmin,
    deslogarAdmin,
    limparCarrinho,
    obterTotalCarrinho,
    obterQuantidadeItensCarrinho,
    obterPesoTotalCarrinho
  };
};