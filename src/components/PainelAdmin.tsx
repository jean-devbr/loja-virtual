import React, { useState } from 'react';
import { Plus, Save, X, Upload, Package, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Produto } from '../types';

interface PainelAdminProps {
  produtos: Produto[];
  onAdicionarProduto: (produto: Omit<Produto, 'id'>) => void;
  onAtualizarProduto: (id: string, atualizacoes: Partial<Produto>) => void;
  onExcluirProduto: (id: string) => void;
}

export const PainelAdmin: React.FC<PainelAdminProps> = ({
  produtos,
  onAdicionarProduto,
  onAtualizarProduto,
  onExcluirProduto
}) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    preco: '',
    descricao: '',
    imagem: '',
    categoria: '',
    estoque: '',
    peso: '',
    altura: '',
    largura: '',
    comprimento: ''
  });

  const resetarFormulario = () => {
    setDadosFormulario({
      nome: '',
      preco: '',
      descricao: '',
      imagem: '',
      categoria: '',
      estoque: '',
      peso: '',
      altura: '',
      largura: '',
      comprimento: ''
    });
    setProdutoEditando(null);
    setMostrarFormulario(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const dadosProduto = {
      nome: dadosFormulario.nome,
      preco: parseFloat(dadosFormulario.preco),
      descricao: dadosFormulario.descricao,
      imagem: dadosFormulario.imagem,
      categoria: dadosFormulario.categoria,
      estoque: parseInt(dadosFormulario.estoque),
      peso: parseInt(dadosFormulario.peso) || 500,
      dimensoes: {
        altura: parseInt(dadosFormulario.altura) || 10,
        largura: parseInt(dadosFormulario.largura) || 10,
        comprimento: parseInt(dadosFormulario.comprimento) || 10
      }
    };

    if (produtoEditando) {
      onAtualizarProduto(produtoEditando.id, dadosProduto);
    } else {
      onAdicionarProduto(dadosProduto);
    }
    
    resetarFormulario();
  };

  const handleEditar = (produto: Produto) => {
    setProdutoEditando(produto);
    setDadosFormulario({
      nome: produto.nome,
      preco: produto.preco.toString(),
      descricao: produto.descricao,
      imagem: produto.imagem,
      categoria: produto.categoria,
      estoque: produto.estoque.toString(),
      peso: (produto.peso || 500).toString(),
      altura: (produto.dimensoes?.altura || 10).toString(),
      largura: (produto.dimensoes?.largura || 10).toString(),
      comprimento: (produto.dimensoes?.comprimento || 10).toString()
    });
    setMostrarFormulario(true);
  };

  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  // Estatísticas
  const totalProdutos = produtos.length;
  const valorTotalEstoque = produtos.reduce((total, produto) => total + (produto.preco * produto.estoque), 0);
  const produtosEmFalta = produtos.filter(p => p.estoque <= 5).length;

  return (
    <div className="space-y-8">
      {/* Header do Admin */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">Painel Administrativo</h2>
            <p className="text-lg opacity-90">Gerencie seus produtos e monitore sua loja</p>
          </div>
          <button
            onClick={() => setMostrarFormulario(true)}
            className="bg-white text-purple-600 px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-3 font-semibold shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Adicionar Produto
          </button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total de Produtos</p>
              <p className="text-3xl font-bold text-gray-900">{totalProdutos}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Valor do Estoque</p>
              <p className="text-3xl font-bold text-gray-900">{formatarPreco(valorTotalEstoque)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Produtos em Falta</p>
              <p className="text-3xl font-bold text-gray-900">{produtosEmFalta}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-xl">
              <TrendingUp className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Modal do Formulário */}
      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {produtoEditando ? 'Editar Produto' : 'Adicionar Novo Produto'}
              </h3>
              <button
                onClick={resetarFormulario}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome do Produto *
                  </label>
                  <input
                    type="text"
                    value={dadosFormulario.nome}
                    onChange={(e) => setDadosFormulario({ ...dadosFormulario, nome: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    placeholder="Ex: iPhone 15 Pro Max"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preço (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={dadosFormulario.preco}
                    onChange={(e) => setDadosFormulario({ ...dadosFormulario, preco: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    placeholder="0,00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Categoria *
                  </label>
                  <select
                    value={dadosFormulario.categoria}
                    onChange={(e) => setDadosFormulario({ ...dadosFormulario, categoria: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Eletrônicos">Eletrônicos</option>
                    <option value="Moda">Moda</option>
                    <option value="Casa">Casa</option>
                    <option value="Esportes">Esportes</option>
                    <option value="Livros">Livros</option>
                    <option value="Beleza">Beleza</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descrição *
                  </label>
                  <textarea
                    value={dadosFormulario.descricao}
                    onChange={(e) => setDadosFormulario({ ...dadosFormulario, descricao: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    required
                    placeholder="Descreva as características e benefícios do produto..."
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL da Imagem *
                  </label>
                  <input
                    type="url"
                    value={dadosFormulario.imagem}
                    onChange={(e) => setDadosFormulario({ ...dadosFormulario, imagem: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Estoque *
                  </label>
                  <input
                    type="number"
                    value={dadosFormulario.estoque}
                    onChange={(e) => setDadosFormulario({ ...dadosFormulario, estoque: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Peso (gramas)
                  </label>
                  <input
                    type="number"
                    value={dadosFormulario.peso}
                    onChange={(e) => setDadosFormulario({ ...dadosFormulario, peso: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Dimensões (cm) - Para cálculo de frete
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="number"
                      value={dadosFormulario.altura}
                      onChange={(e) => setDadosFormulario({ ...dadosFormulario, altura: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Altura"
                    />
                    <input
                      type="number"
                      value={dadosFormulario.largura}
                      onChange={(e) => setDadosFormulario({ ...dadosFormulario, largura: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Largura"
                    />
                    <input
                      type="number"
                      value={dadosFormulario.comprimento}
                      onChange={(e) => setDadosFormulario({ ...dadosFormulario, comprimento: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Comprimento"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 font-semibold shadow-lg"
                >
                  <Save className="w-5 h-5" />
                  {produtoEditando ? 'Atualizar' : 'Adicionar'} Produto
                </button>
                <button
                  type="button"
                  onClick={resetarFormulario}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de Produtos */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Produtos Cadastrados</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((produto) => (
            <div key={produto.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h4 className="font-bold text-gray-900 mb-1 line-clamp-1">{produto.nome}</h4>
                <p className="text-sm text-gray-600 mb-2">{produto.categoria}</p>
                <p className="text-lg font-bold text-blue-600 mb-2">{formatarPreco(produto.preco)}</p>
                <p className="text-sm text-gray-600 mb-3">
                  Estoque: {produto.estoque} unidades
                  {produto.estoque <= 5 && (
                    <span className="text-red-500 font-semibold"> (Baixo!)</span>
                  )}
                </p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditar(produto)}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Tem certeza que deseja excluir este produto?')) {
                        onExcluirProduto(produto.id);
                      }
                    }}
                    className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-red-700 transition-colors font-semibold"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {produtos.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Nenhum produto cadastrado</h4>
            <p className="text-gray-500">Adicione seu primeiro produto para começar!</p>
          </div>
        )}
      </div>
    </div>
  );
};