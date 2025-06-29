import React from 'react';
import { ShoppingCart, Settings, Home, Package, Store, LogOut } from 'lucide-react';

interface HeaderProps {
  visualizacaoAtual: 'loja' | 'admin' | 'carrinho';
  onMudarVisualizacao: (visualizacao: 'loja' | 'admin' | 'carrinho') => void;
  quantidadeItensCarrinho: number;
  adminLogado: boolean;
  onDeslogarAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  visualizacaoAtual,
  onMudarVisualizacao,
  quantidadeItensCarrinho,
  adminLogado,
  onDeslogarAdmin
}) => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Store className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MegaStore
            </h1>
          </div>
          
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => onMudarVisualizacao('loja')}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                visualizacaoAtual === 'loja'
                  ? 'bg-blue-100 text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Home className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline font-medium">Loja</span>
            </button>
            
            <button
              onClick={() => onMudarVisualizacao('carrinho')}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 relative ${
                visualizacaoAtual === 'carrinho'
                  ? 'bg-blue-100 text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline font-medium">Carrinho</span>
              {quantidadeItensCarrinho > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                  {quantidadeItensCarrinho}
                </span>
              )}
            </button>
            
            <button
              onClick={() => onMudarVisualizacao('admin')}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                visualizacaoAtual === 'admin'
                  ? 'bg-blue-100 text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline font-medium">Admin</span>
            </button>

            {adminLogado && (
              <button
                onClick={onDeslogarAdmin}
                className="flex items-center px-4 py-2 rounded-lg transition-all duration-200 text-red-600 hover:text-red-700 hover:bg-red-50"
                title="Sair do Admin"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline font-medium">Sair</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};