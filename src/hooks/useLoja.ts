import { useState, useEffect } from 'react';
import { Produto, ItemCarrinho, Loja, Endereco, CalculoFrete, ConfiguracaoLoja } from '../types';

const produtosIniciais: Produto[] = [
  {
    id: '1',
    nome: 'Tênis Nike Air Max 270',
    preco: 599.99,
    descricao: 'Tênis Nike Air Max 270 com tecnologia Air visível no calcanhar para máximo conforto e estilo urbano.',
    imagem: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoria: 'Tênis',
    estoque: 15,
    peso: 800,
    dimensoes: { altura: 15, largura: 30, comprimento: 35 }
  },
  {
    id: '2',
    nome: 'Camisa Flamengo 2024 - Futebol',
    preco: 299.99,
    descricao: 'Camisa oficial do Flamengo 2024 para futebol. Tecido Dri-FIT que absorve o suor e mantém você seco.',
    imagem: 'https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoria: 'Camisas de Time',
    estoque: 25,
    peso: 200,
    dimensoes: { altura: 2, largura: 40, comprimento: 60 }
  },
  {
    id: '3',
    nome: 'Mochila Esportiva Nike',
    preco: 189.99,
    descricao: 'Mochila esportiva com compartimento para notebook, garrafa d\'água e tênis. Ideal para academia e trabalho.',
    imagem: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoria: 'Mochilas',
    estoque: 12,
    peso: 600,
    dimensoes: { altura: 45, largura: 30, comprimento: 20 }
  },
  {
    id: '4',
    nome: 'Tênis Adidas Ultraboost 22',
    preco: 799.99,
    descricao: 'Tênis de corrida Adidas Ultraboost 22 com tecnologia Boost para retorno de energia a cada passada.',
    imagem: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoria: 'Tênis',
    estoque: 8,
    peso: 750,
    dimensoes: { altura: 15, largura: 30, comprimento: 35 }
  },
  {
    id: '5',
    nome: 'Camisa Flamengo 2024 - Basquete',
    preco: 249.99,
    descricao: 'Camisa oficial do Flamengo 2024 para basquete NBB. Design exclusivo com tecnologia de ventilação.',
    imagem: 'https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoria: 'Camisas de Time',
    estoque: 20,
    peso: 180,
    dimensoes: { altura: 2, largura: 40, comprimento: 65 }
  },
  {
    id: '6',
    nome: 'Mochila Puma Phase',
    preco: 129.99,
    descricao: 'Mochila Puma Phase com design moderno e compartimentos organizadores. Perfeita para o dia a dia.',
    imagem: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoria: 'Mochilas',
    estoque: 30,
    peso: 400,
    dimensoes: { altura: 40, largura: 25, comprimento: 15 }
  }
];

const configuracaoInicial: ConfiguracaoLoja = {
  id: '1',
  nomeLoja: 'MegaStore',
  descricaoLoja: 'A melhor loja de produtos esportivos do Brasil. Especializada em tênis das melhores marcas, camisas oficiais do Flamengo e mochilas para todos os estilos.',
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
    sabado: '9h às 14h',
    domingo: 'Fechado'
  },
  redesSociais: {
    instagram: 'https://instagram.com/megastore',
    facebook: 'https://facebook.com/megastore',
    twitter: 'https://twitter.com/megastore',
    youtube: 'https://youtube.com/megastore'
  },
  informacoesLegais: {
    cnpj: '12.345.678/0001-90',
    razaoSocial: 'MegaStore Comércio de Artigos Esportivos Ltda',
    inscricaoEstadual: '123.456.789'
  },
  beneficios: {
    freteGratis: {
      ativo: true,
      valorMinimo: 299
    },
    garantia: {
      ativo: true,
      texto: '1 ano de garantia oficial'
    },
    pagamentoPix: {
      ativo: true,
      desconto: 5
    },
    produtosOriginais: {
      ativo: true,
      texto: '100% originais'
    }
  }
};

export const useLoja = () => {
  const [loja, setLoja] = useState<Loja>(() => {
    const salvo = localStorage.getItem('megastore-loja');
    if (salvo) {
      const parsed = JSON.parse(salvo);
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
    localStorage.setItem('megastore-loja', JSON.stringify({
      produtos: loja.produtos,
      carrinho: loja.carrinho,
      configuracao: loja.configuracao,
      endereco: loja.endereco,
      frete: loja.frete
    }));
  }, [loja.produtos, loja.carrinho, loja.configuracao, loja.endereco, loja.frete]);

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

  const atualizarConfiguracao = (configuracao: Partial<ConfiguracaoLoja>) => {
    setLoja(prev => ({
      ...prev,
      configuracao: { ...prev.configuracao, ...configuracao }
    }));
  };

  const adicionarAoCarrinho = (produto: Produto) => {
    if (produto.estoque <= 0) return;
    
    setLoja(prev => {
      const itemExistente = prev.carrinho.find(item => item.id === produto.id);
      if (itemExistente) {
        return {
          ...prev,
          carrinho: prev.carrinho.map(item =>
            item.id === produto.id
              ? { ...item, quantidade: item.quantidade + 1 }
              : item
          ),
          produtos: prev.produtos.map(p =>
            p.id === produto.id ? { ...p, estoque: p.estoque - 1 } : p
          )
        };
      }
      return {
        ...prev,
        carrinho: [...prev.carrinho, { ...produto, quantidade: 1 }],
        produtos: prev.produtos.map(p =>
          p.id === produto.id ? { ...p, estoque: p.estoque - 1 } : p
        )
      };
    });
  };

  const removerDoCarrinho = (id: string) => {
    setLoja(prev => {
      const item = prev.carrinho.find(item => item.id === id);
      if (!item) return prev;

      return {
        ...prev,
        carrinho: prev.carrinho.filter(item => item.id !== id),
        produtos: prev.produtos.map(p =>
          p.id === id ? { ...p, estoque: p.estoque + item.quantidade } : p
        )
      };
    });
  };

  const atualizarQuantidadeCarrinho = (id: string, quantidade: number) => {
    if (quantidade <= 0) {
      removerDoCarrinho(id);
      return;
    }

    setLoja(prev => {
      const itemAtual = prev.carrinho.find(item => item.id === id);
      if (!itemAtual) return prev;

      const diferenca = quantidade - itemAtual.quantidade;
      const produto = prev.produtos.find(p => p.id === id);
      
      if (!produto || produto.estoque < diferenca) return prev;

      return {
        ...prev,
        carrinho: prev.carrinho.map(item =>
          item.id === id ? { ...item, quantidade } : item
        ),
        produtos: prev.produtos.map(p =>
          p.id === id ? { ...p, estoque: p.estoque - diferenca } : p
        )
      };
    });
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

  const logarAdmin = (logado: boolean) => {
    setLoja(prev => ({ ...prev, adminLogado: logado }));
  };

  const deslogarAdmin = () => {
    setLoja(prev => ({ 
      ...prev, 
      adminLogado: false,
      visualizacaoAtual: 'loja'
    }));
  };

  const limparCarrinho = () => {
    setLoja(prev => {
      // Restaurar estoque dos produtos
      const produtosAtualizados = prev.produtos.map(produto => {
        const itemCarrinho = prev.carrinho.find(item => item.id === produto.id);
        if (itemCarrinho) {
          return { ...produto, estoque: produto.estoque + itemCarrinho.quantidade };
        }
        return produto;
      });

      return {
        ...prev,
        carrinho: [],
        produtos: produtosAtualizados
      };
    });
  };

  const obterTotalCarrinho = () => {
    return loja.carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  const obterQuantidadeItensCarrinho = () => {
    return loja.carrinho.reduce((count, item) => count + item.quantidade, 0);
  };

  const obterPesoTotalCarrinho = () => {
    return loja.carrinho.reduce((peso, item) => peso + ((item.peso || 500) * item.quantidade), 0);
  };

  return {
    produtos: loja.produtos,
    carrinho: loja.carrinho,
    visualizacaoAtual: loja.visualizacaoAtual,
    endereco: loja.endereco,
    frete: loja.frete,
    adminLogado: loja.adminLogado,
    configuracao: loja.configuracao,
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