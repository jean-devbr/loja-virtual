import { useState, useEffect } from 'react';
import { Produto, ItemCarrinho, Loja, Endereco, CalculoFrete } from '../types';

const produtosIniciais: Produto[] = [
  {
    id: '1',
    nome: 'iPhone 15 Pro Max 256GB',
    preco: 8999.99,
    descricao: 'O mais avançado iPhone com chip A17 Pro, câmera profissional e tela Super Retina XDR',
    imagem: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoria: 'Eletrônicos',
    estoque: 15,
    peso: 221,
    dimensoes: { altura: 16, largura: 8, comprimento: 1 }
  },
  {
    id: '2',
    nome: 'Fone Bluetooth Premium',
    preco: 599.99,
    descricao: 'Fone de ouvido sem fio com cancelamento de ruído ativo e qualidade de som excepcional',
    imagem: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoria: 'Eletrônicos',
    estoque: 25,
    peso: 250,
    dimensoes: { altura: 20, largura: 18, comprimento: 8 }
  },
  {
    id: '3',
    nome: 'Mochila Executiva Couro',
    preco: 299.99,
    descricao: 'Mochila elegante em couro legítimo, perfeita para trabalho e viagens',
    imagem: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoria: 'Moda',
    estoque: 12,
    peso: 800,
    dimensoes: { altura: 45, largura: 30, comprimento: 15 }
  },
  {
    id: '4',
    nome: 'Smartwatch Fitness Pro',
    preco: 899.99,
    descricao: 'Relógio inteligente com monitoramento completo de saúde e GPS integrado',
    imagem: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoria: 'Eletrônicos',
    estoque: 8,
    peso: 45,
    dimensoes: { altura: 5, largura: 4, comprimento: 1 }
  },
  {
    id: '5',
    nome: 'Cafeteira Expresso Automática',
    preco: 1299.99,
    descricao: 'Máquina de café expresso profissional com moedor integrado e controle de temperatura',
    imagem: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoria: 'Casa',
    estoque: 20,
    peso: 8500,
    dimensoes: { altura: 35, largura: 25, comprimento: 40 }
  },
  {
    id: '6',
    nome: 'Tapete Yoga Premium',
    preco: 149.99,
    descricao: 'Tapete de yoga antiderrapante com material ecológico e espessura ideal',
    imagem: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=500',
    categoria: 'Esportes',
    estoque: 30,
    peso: 1200,
    dimensoes: { altura: 180, largura: 60, comprimento: 1 }
  }
];

export const useLoja = () => {
  const [loja, setLoja] = useState<Loja>(() => {
    const salvo = localStorage.getItem('loja-virtual-br');
    if (salvo) {
      const dados = JSON.parse(salvo);
      return {
        produtos: dados.produtos || produtosIniciais,
        carrinho: dados.carrinho || [],
        visualizacaoAtual: 'loja' as const,
        endereco: dados.endereco,
        frete: dados.frete
      };
    }
    return {
      produtos: produtosIniciais,
      carrinho: [],
      visualizacaoAtual: 'loja' as const
    };
  });

  useEffect(() => {
    localStorage.setItem('loja-virtual-br', JSON.stringify({
      produtos: loja.produtos,
      carrinho: loja.carrinho,
      endereco: loja.endereco,
      frete: loja.frete
    }));
  }, [loja.produtos, loja.carrinho, loja.endereco, loja.frete]);

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
    adicionarAoCarrinho,
    removerDoCarrinho,
    atualizarQuantidadeCarrinho,
    definirVisualizacao,
    definirEndereco,
    definirFrete,
    obterTotalCarrinho,
    obterQuantidadeItensCarrinho,
    obterPesoTotalCarrinho
  };
};