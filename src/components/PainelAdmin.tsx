import React, { useState } from 'react';
import { Plus, Save, X, Upload, Package, TrendingUp, Users, DollarSign, Image, AlertCircle } from 'lucide-react';
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
  const [imagemSelecionada, setImagemSelecionada] = useState<File | null>(null);
  const [previewImagem, setPreviewImagem] = useState<string>('');
  const [erroImagem, setErroImagem] = useState('');

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
    setImagemSelecionada(null);
    setPreviewImagem('');
    setErroImagem('');
    setProdutoEditando(null);
    setMostrarFormulario(false);
  };

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];
    setErroImagem('');
    
    if (!arquivo) {
      setImagemSelecionada(null);
      setPreviewImagem('');
      return;
    }

    // Verificar tipo de arquivo
    const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!tiposPermitidos.includes(arquivo.type)) {
      setErroImagem('Formato não suportado. Use JPG, PNG ou WebP.');
      return;
    }

    // Verificar tamanho (máximo 5MB)
    const tamanhoMaximo = 5 * 1024 * 1024; // 5MB em bytes
    if (arquivo.size > tamanhoMaximo) {
      setErroImagem('Imagem muito grande. Tamanho máximo: 5MB.');
      return;
    }

    // Verificar dimensões da imagem
    const img = new Image();
    img.onload = () => {
      // Verificar se a imagem não é muito pequena
      if (img.width < 200 || img.height < 200) {
        setErroImagem('Imagem muito pequena. Mínimo: 200x200 pixels.');
        return;
      }
      
      // Verificar se a imagem não é muito grande
      if (img.width > 2000 || img.height > 2000) {
        setErroImagem('Imagem muito grande. Máximo: 2000x2000 pixels.');
        return;
      }

      // Se passou em todas as validações
      setImagemSelecionada(arquivo);
      setPreviewImagem(URL.createObjectURL(arquivo));
    };
    
    img.onerror = () => {
      setErroImagem('Erro ao carregar a imagem.');
    };
    
    img.src = URL.createObjectURL(arquivo);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let urlImagem = dadosFormulario.imagem;
    
    // Se uma nova imagem foi selecionada, simular upload
    if (imagemSelecionada) {
      // Em produção, aqui você faria o upload real para um serviço como AWS S3, Cloudinary, etc.
      // Por enquanto, vamos usar o preview local
      urlImagem = previewImagem;
    }

    if (!urlImagem) {
      setErroImagem('Por favor, selecione uma imagem para o produto.');
      return;
    }
    
    const dadosProduto = {
      nome: dadosFormulario.nome,
      preco: parseFloat(dadosFormulario.preco),
      descricao: dadosFormulario.descricao,
      imagem: urlImagem,
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
    setPreviewImagem(produto.imagem);
    setMostrarFormulario(true);
  };

  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  const formatarTamanhoArquivo = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
            <p className="text-lg opacity-90">Gerencie seus produtos esportivos e monitore sua loja</p>
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
          <div className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Coluna Esquerda - Dados Básicos */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nome do Produto *
                    </label>
                    <input
                      type="text"
                      value={dadosFormulario.nome}
                      onChange={(e) => setDadosFormulario({ ...dadosFormulario, nome: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      placeholder="Ex: Tênis Nike Air Max 270"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
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
                        <option value="">Selecione</option>
                        <option value="Tênis">Tênis</option>
                        <option value="Camisas de Time">Camisas de Time</option>
                        <option value="Mochilas">Mochilas</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Descrição *
                    </label>
                    <textarea
                      value={dadosFormulario.descricao}
                      onChange={(e) => setDadosFormulario({ ...dadosFormulario, descricao: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      required
                      placeholder="Descreva as características e benefícios do produto..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                  </div>

                  <div>
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

                {/* Coluna Direita - Upload de Imagem */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Imagem do Produto *
                    </label>
                    
                    {/* Área de Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                      {previewImagem ? (
                        <div className="space-y-4">
                          <img
                            src={previewImagem}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg mx-auto"
                          />
                          <div className="flex items-center justify-center gap-4">
                            <button
                              type="button"
                              onClick={() => {
                                setPreviewImagem('');
                                setImagemSelecionada(null);
                                setDadosFormulario({ ...dadosFormulario, imagem: '' });
                              }}
                              className="text-red-600 hover:text-red-700 font-medium"
                            >
                              Remover Imagem
                            </button>
                            <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                              Trocar Imagem
                              <input
                                type="file"
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                onChange={handleImagemChange}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                            <Image className="w-10 h-10 text-gray-400" />
                          </div>
                          <div>
                            <label className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 cursor-pointer transition-colors inline-flex items-center gap-2 font-semibold">
                              <Upload className="w-5 h-5" />
                              Selecionar Imagem
                              <input
                                type="file"
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                onChange={handleImagemChange}
                                className="hidden"
                              />
                            </label>
                          </div>
                          <div className="text-sm text-gray-500">
                            <p>Formatos aceitos: JPG, PNG, WebP</p>
                            <p>Tamanho máximo: 5MB</p>
                            <p>Dimensões recomendadas: 500x500px</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Informações da imagem selecionada */}
                    {imagemSelecionada && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Image className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-blue-900">{imagemSelecionada.name}</p>
                            <p className="text-sm text-blue-700">
                              {formatarTamanhoArquivo(imagemSelecionada.size)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Erro de imagem */}
                    {erroImagem && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                          <p className="text-red-700 font-medium">{erroImagem}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dicas de Otimização */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">💡 Dicas para produtos esportivos:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Para tênis: mostre o produto de lado e de frente</li>
                      <li>• Para camisas: prefira fotos com a camisa vestida ou em manequim</li>
                      <li>• Para mochilas: mostre os compartimentos e detalhes</li>
                      <li>• Use fundo branco ou neutro para destacar o produto</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 pt-6 border-t border-gray-200">
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
            <p className="text-gray-500">Adicione seu primeiro produto esportivo para começar!</p>
          </div>
        )}
      </div>
    </div>
  );
};