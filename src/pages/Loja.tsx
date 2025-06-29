import React, { useState } from 'react';
import { Search, Filter, Star, Zap, Shield, Truck, Award, Target, Users } from 'lucide-react';
import { CartaoProduto } from '../components/CartaoProduto';
import { Produto } from '../types';

interface LojaProps {
  produtos: Produto[];
  onAdicionarAoCarrinho: (produto: Produto) => void;
}

export const Loja: React.FC<LojaProps> = ({ produtos, onAdicionarAoCarrinho }) => {
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [ordenacao, setOrdenacao] = useState('nome');

  const categorias = Array.from(new Set(produtos.map(p => p.categoria)));

  const produtosFiltrados = produtos
    .filter(produto => {
      const correspondeAPesquisa = produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
                                 produto.descricao.toLowerCase().includes(termoPesquisa.toLowerCase());
      const correspondeACategoria = !categoriaSelecionada || produto.categoria === categoriaSelecionada;
      return correspondeAPesquisa && correspondeACategoria;
    })
    .sort((a, b) => {
      switch (ordenacao) {
        case 'preco-menor':
          return a.preco - b.preco;
        case 'preco-maior':
          return b.preco - a.preco;
        case 'nome':
        default:
          return a.nome.localeCompare(b.nome);
      }
    });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            🏆 Sua Loja de Esportes Favorita
          </h2>
          <p className="text-xl md:text-2xl opacity-95 mb-8 leading-relaxed">
            Tênis das melhores marcas, camisas oficiais do Flamengo e mochilas para todos os estilos. 
            Qualidade premium com entrega para todo o Brasil!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              ⚽ Comprar Agora
            </button>
          </div>
        </div>
        
        {/* Elementos decorativos esportivos */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full animate-pulse flex items-center justify-center">
          <Award className="w-10 h-10 text-white/70" />
        </div>
        <div className="absolute bottom-10 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000 flex items-center justify-center">
          <Target className="w-8 h-8 text-white/70" />
        </div>
      </div>

      {/* Benefícios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="font-bold text-lg text-gray-900 mb-2">Frete Grátis</h3>
          <p className="text-gray-600">Acima de R$ 299 para todo o Brasil</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="font-bold text-lg text-gray-900 mb-2">Produtos Originais</h3>
          <p className="text-gray-600">100% originais com garantia oficial</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="font-bold text-lg text-gray-900 mb-2">Entrega Rápida</h3>
          <p className="text-gray-600">Receba em até 2 dias úteis</p>
        </div>
      </div>

      {/* Seção Especial Flamengo */}
      <div className="bg-gradient-to-r from-red-600 to-black text-white rounded-3xl p-8 md:p-12 text-center">
        <h3 className="text-3xl font-bold mb-4">🔴⚫ Mengão na Veia!</h3>
        <p className="text-xl opacity-90 mb-6">
          Camisas oficiais do Flamengo - Futebol e Basquete
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="bg-white/20 px-4 py-2 rounded-full">⚽ Futebol 2024</span>
          <span className="bg-white/20 px-4 py-2 rounded-full">🏀 Basquete 2024</span>
          <span className="bg-white/20 px-4 py-2 rounded-full">🏆 Edição Retrô</span>
        </div>
      </div>

      {/* Filtros e Pesquisa */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar tênis, camisas, mochilas..."
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={categoriaSelecionada}
              onChange={(e) => setCategoriaSelecionada(e.target.value)}
              className="pl-12 pr-8 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white min-w-[200px] text-lg"
            >
              <option value="">Todas as Categorias</option>
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
              className="px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white min-w-[180px] text-lg"
            >
              <option value="nome">Ordenar por Nome</option>
              <option value="preco-menor">Menor Preço</option>
              <option value="preco-maior">Maior Preço</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid de Produtos */}
      <div id="produtos">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold text-gray-900">
            🏃‍♂️ Nossos Produtos Esportivos
          </h3>
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded-xl font-semibold">
            {produtosFiltrados.length} {produtosFiltrados.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </div>
        </div>
        
        {produtosFiltrados.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="text-gray-400 mb-6">
              <Search className="w-24 h-24 mx-auto" />
            </div>
            <h4 className="text-2xl font-bold text-gray-700 mb-4">Nenhum produto encontrado</h4>
            <p className="text-gray-500 text-lg">Tente ajustar seus filtros ou termo de pesquisa.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {produtosFiltrados.map(produto => (
              <CartaoProduto
                key={produto.id}
                produto={produto}
                onAdicionarAoCarrinho={onAdicionarAoCarrinho}
              />
            ))}
          </div>
        )}
      </div>

      {/* Seção de Marcas */}
      <div className="bg-white rounded-3xl p-8 md:p-12 text-center shadow-lg">
        <h3 className="text-3xl font-bold mb-6 text-gray-900">🏷️ Marcas que Confiamos</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
          <div className="text-4xl font-bold text-gray-800">NIKE</div>
          <div className="text-4xl font-bold text-gray-800">adidas</div>
          <div className="text-4xl font-bold text-gray-800">PUMA</div>
          <div className="text-4xl font-bold text-gray-800">VANS</div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-gray-900 to-red-900 text-white rounded-3xl p-8 md:p-12 text-center">
        <h3 className="text-3xl font-bold mb-4">📧 Fique por dentro das novidades!</h3>
        <p className="text-xl opacity-90 mb-8">Receba lançamentos, promoções exclusivas e notícias do Mengão</p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            className="flex-1 px-6 py-4 rounded-xl text-gray-900 text-lg"
          />
          <button className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors">
            Inscrever-se
          </button>
        </div>
      </div>
    </div>
  );
};