import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, Truck, MapPin, Calculator } from 'lucide-react';
import { ItemCarrinho, Endereco, CalculoFrete } from '../types';
import { calcularFrete, buscarCEP } from '../services/freteService';

interface CarrinhoProps {
  itens: ItemCarrinho[];
  onAtualizarQuantidade: (id: string, quantidade: number) => void;
  onRemoverItem: (id: string) => void;
  total: number;
  pesoTotal: number;
  endereco?: Endereco;
  frete?: CalculoFrete[];
  onDefinirEndereco: (endereco: Endereco) => void;
  onDefinirFrete: (frete: CalculoFrete[]) => void;
}

export const Carrinho: React.FC<CarrinhoProps> = ({
  itens,
  onAtualizarQuantidade,
  onRemoverItem,
  total,
  pesoTotal,
  endereco,
  frete,
  onDefinirEndereco,
  onDefinirFrete
}) => {
  const [cep, setCep] = useState('');
  const [carregandoCep, setCarregandoCep] = useState(false);
  const [carregandoFrete, setCarregandoFrete] = useState(false);
  const [freteEscolhido, setFreteEscolhido] = useState<CalculoFrete | null>(null);
  const [erro, setErro] = useState('');

  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  const buscarEnderecoPorCep = async () => {
    if (cep.length !== 8) {
      setErro('CEP deve ter 8 dígitos');
      return;
    }
    
    setCarregandoCep(true);
    setErro('');
    
    try {
      const enderecoEncontrado = await buscarCEP(cep);
      onDefinirEndereco(enderecoEncontrado);
      await calcularFreteParaCarrinho(enderecoEncontrado.cep);
    } catch (error) {
      setErro('CEP não encontrado. Verifique e tente novamente.');
      console.error('Erro ao buscar CEP:', error);
    } finally {
      setCarregandoCep(false);
    }
  };

  const calcularFreteParaCarrinho = async (cepDestino: string) => {
    if (itens.length === 0) {
      setErro('Carrinho vazio');
      return;
    }

    setCarregandoFrete(true);
    setErro('');
    
    try {
      // Calcular dimensões e peso total do carrinho
      let pesoTotalGramas = 0;
      let alturaMax = 0;
      let larguraMax = 0;
      let comprimentoTotal = 0;

      itens.forEach(item => {
        const pesoItem = item.peso || 500; // peso padrão se não especificado
        pesoTotalGramas += pesoItem * item.quantidade;
        
        if (item.dimensoes) {
          alturaMax = Math.max(alturaMax, item.dimensoes.altura);
          larguraMax = Math.max(larguraMax, item.dimensoes.largura);
          comprimentoTotal += item.dimensoes.comprimento * item.quantidade;
        } else {
          // Dimensões padrão se não especificadas
          alturaMax = Math.max(alturaMax, 10);
          larguraMax = Math.max(larguraMax, 10);
          comprimentoTotal += 10 * item.quantidade;
        }
      });

      console.log('Calculando frete com:', {
        cepOrigem: '01310-100',
        cepDestino: cepDestino.replace('-', ''),
        peso: pesoTotalGramas,
        altura: alturaMax,
        largura: larguraMax,
        comprimento: comprimentoTotal
      });

      const resultadoFrete = await calcularFrete({
        cepOrigem: '01310-100', // CEP da loja (exemplo: São Paulo)
        cepDestino: cepDestino.replace('-', ''),
        peso: pesoTotalGramas,
        altura: alturaMax,
        largura: larguraMax,
        comprimento: comprimentoTotal
      });

      const freteFormatado = resultadoFrete.map(f => ({
        servico: f.servico,
        valor: f.valor,
        prazo: f.prazo
      }));

      onDefinirFrete(freteFormatado);
      console.log('Frete calculado:', freteFormatado);
    } catch (error) {
      setErro('Erro ao calcular frete. Tente novamente.');
      console.error('Erro ao calcular frete:', error);
    } finally {
      setCarregandoFrete(false);
    }
  };

  const finalizarCompra = () => {
    if (!endereco) {
      setErro('Por favor, calcule o frete primeiro');
      return;
    }

    const totalComFrete = total + (freteEscolhido?.valor || 0);
    
    const mensagem = `🛒 *Pedido MegaStore*\n\n` +
      `📍 *Endereço de Entrega:*\n` +
      `${endereco?.logradouro}, ${endereco?.bairro}\n` +
      `${endereco?.cidade} - ${endereco?.uf}\n` +
      `CEP: ${endereco?.cep}\n\n` +
      `📦 *Produtos:*\n` +
      itens.map(item => 
        `• ${item.nome}\n` +
        `  Qtd: ${item.quantidade} | ${formatarPreco(item.preco)} cada\n` +
        `  Subtotal: ${formatarPreco(item.preco * item.quantidade)}`
      ).join('\n\n') +
      `\n\n💰 *Resumo do Pedido:*\n` +
      `Subtotal: ${formatarPreco(total)}\n` +
      (freteEscolhido ? `Frete (${freteEscolhido.servico}): ${formatarPreco(freteEscolhido.valor)}\n` : '') +
      `*Total: ${formatarPreco(totalComFrete)}*\n\n` +
      `🚚 Prazo de entrega: ${freteEscolhido?.prazo || 'A calcular'}`;
    
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(mensagem)}`, '_blank');
  };

  if (itens.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-gray-700 mb-4">Seu carrinho está vazio</h3>
        <p className="text-gray-500 text-lg">Adicione alguns produtos incríveis para começar!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-2">Seu Carrinho</h2>
        <p className="opacity-90">{itens.length} {itens.length === 1 ? 'produto' : 'produtos'} • Peso total: {(pesoTotal / 1000).toFixed(2)}kg</p>
      </div>

      {/* Produtos no carrinho */}
      <div className="space-y-4">
        {itens.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-6 border border-gray-100">
            <img
              src={item.imagem}
              alt={item.nome}
              className="w-20 h-20 object-cover rounded-xl"
            />
            
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-lg">{item.nome}</h4>
              <p className="text-sm text-gray-600 mb-2">{item.categoria}</p>
              <p className="text-xl font-bold text-blue-600">{formatarPreco(item.preco)}</p>
            </div>
            
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-2">
              <button
                onClick={() => onAtualizarQuantidade(item.id, item.quantidade - 1)}
                className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors shadow-md"
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <span className="w-12 text-center font-bold text-lg">{item.quantidade}</span>
              
              <button
                onClick={() => onAtualizarQuantidade(item.id, item.quantidade + 1)}
                className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors shadow-md"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                {formatarPreco(item.preco * item.quantidade)}
              </p>
              <button
                onClick={() => onRemoverItem(item.id)}
                className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors mt-2"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cálculo de Frete */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <Truck className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900">Calcular Frete</h3>
        </div>
        
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Digite seu CEP (apenas números)"
              value={cep}
              onChange={(e) => {
                setCep(e.target.value.replace(/\D/g, '').slice(0, 8));
                setErro('');
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={8}
            />
          </div>
          <button
            onClick={buscarEnderecoPorCep}
            disabled={cep.length !== 8 || carregandoCep || carregandoFrete}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 transition-colors font-semibold flex items-center gap-2"
          >
            {carregandoCep || carregandoFrete ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Calculator className="w-5 h-5" />
            )}
            Calcular
          </button>
        </div>

        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
            {erro}
          </div>
        )}

        {endereco && (
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span className="font-semibold text-gray-900">Endereço de Entrega:</span>
            </div>
            <p className="text-gray-700">
              {endereco.logradouro}, {endereco.bairro}<br />
              {endereco.cidade} - {endereco.uf}<br />
              CEP: {endereco.cep}
            </p>
          </div>
        )}

        {carregandoFrete && (
          <div className="text-center py-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-gray-600">Calculando frete...</p>
          </div>
        )}

        {frete && frete.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Opções de Entrega:</h4>
            {frete.map((opcao, index) => (
              <label key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="frete"
                  value={index}
                  onChange={() => setFreteEscolhido(opcao)}
                  className="text-blue-600"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{opcao.servico}</span>
                    <span className="font-bold text-blue-600">{formatarPreco(opcao.valor)}</span>
                  </div>
                  <p className="text-sm text-gray-600">{opcao.prazo}</p>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Resumo do Pedido */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Resumo do Pedido</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal ({itens.length} {itens.length === 1 ? 'item' : 'itens'}):</span>
            <span className="font-semibold">{formatarPreco(total)}</span>
          </div>
          
          {freteEscolhido && (
            <div className="flex justify-between text-gray-700">
              <span>Frete ({freteEscolhido.servico}):</span>
              <span className="font-semibold">{formatarPreco(freteEscolhido.valor)}</span>
            </div>
          )}
          
          <div className="border-t border-gray-300 pt-2">
            <div className="flex justify-between text-xl font-bold text-gray-900">
              <span>Total:</span>
              <span className="text-green-600">
                {formatarPreco(total + (freteEscolhido?.valor || 0))}
              </span>
            </div>
          </div>
        </div>
        
        <button
          onClick={finalizarCompra}
          disabled={!endereco}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-green-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          🛒 Finalizar Compra via WhatsApp
        </button>
        
        {!endereco && (
          <p className="text-sm text-gray-600 text-center mt-2">
            * Calcule o frete para finalizar a compra
          </p>
        )}
      </div>
    </div>
  );
};