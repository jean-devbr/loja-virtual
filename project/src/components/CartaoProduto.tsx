import React from 'react';
import { ShoppingCart, Package, Edit, Trash2, Star } from 'lucide-react';
import { Produto } from '../types';

interface CartaoProdutoProps {
  produto: Produto;
  onAdicionarAoCarrinho: (produto: Produto) => void;
  isAdmin?: boolean;
  onEditar?: (produto: Produto) => void;
  onExcluir?: (id: string) => void;
}

export const CartaoProduto: React.FC<CartaoProdutoProps> = ({
  produto,
  onAdicionarAoCarrinho,
  isAdmin = false,
  onEditar,
  onExcluir
}) => {
  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="relative overflow-hidden">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-md">
          {produto.categoria}
        </div>
        {produto.estoque <= 5 && produto.estoque > 0 && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md animate-pulse">
            Últimas unidades!
          </div>
        )}
        {produto.estoque === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
              Esgotado
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex items-center bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
          <Star className="w-3 h-3 mr-1 fill-current" />
          4.8
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {produto.nome}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {produto.descricao}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-blue-600">
              {formatarPreco(produto.preco)}
            </span>
            <span className="text-sm text-gray-500 line-through">
              {formatarPreco(produto.preco * 1.2)}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
            <Package className="w-4 h-4 mr-1" />
            <span className="font-medium">{produto.estoque} em estoque</span>
          </div>
        </div>
        
        {isAdmin ? (
          <div className="flex gap-2">
            <button
              onClick={() => onEditar?.(produto)}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-all duration-200 text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <Edit className="w-4 h-4" />
              Editar
            </button>
            <button
              onClick={() => onExcluir?.(produto.id)}
              className="flex-1 bg-red-600 text-white py-3 px-4 rounded-xl hover:bg-red-700 transition-all duration-200 text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <Trash2 className="w-4 h-4" />
              Excluir
            </button>
          </div>
        ) : (
          <button
            onClick={() => onAdicionarAoCarrinho(produto)}
            disabled={produto.estoque === 0}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <ShoppingCart className="w-5 h-5" />
            {produto.estoque === 0 ? 'Produto Esgotado' : 'Adicionar ao Carrinho'}
          </button>
        )}
      </div>
    </div>
  );
};