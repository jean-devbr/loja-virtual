import React, { useState } from 'react';
import { Package, Search, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';

export const RastrearPedido: React.FC = () => {
  const [codigoRastreamento, setCodigoRastreamento] = useState('');
  const [pedidoEncontrado, setPedidoEncontrado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleRastrear = async () => {
    if (!codigoRastreamento.trim()) return;
    
    setCarregando(true);
    // Simula busca
    await new Promise(resolve => setTimeout(resolve, 2000));
    setPedidoEncontrado(true);
    setCarregando(false);
  };

  const statusPedido = [
    {
      status: 'Pedido Confirmado',
      data: '15/01/2025 - 14:30',
      descricao: 'Pagamento aprovado e pedido confirmado',
      icone: CheckCircle,
      cor: 'text-green-600',
      bgCor: 'bg-green-100',
      concluido: true
    },
    {
      status: 'Preparando Envio',
      data: '16/01/2025 - 09:15',
      descricao: 'Produto separado e embalado',
      icone: Package,
      cor: 'text-blue-600',
      bgCor: 'bg-blue-100',
      concluido: true
    },
    {
      status: 'Enviado',
      data: '16/01/2025 - 16:45',
      descricao: 'Produto postado nos Correios',
      icone: Truck,
      cor: 'text-orange-600',
      bgCor: 'bg-orange-100',
      concluido: true
    },
    {
      status: 'Em Trânsito',
      data: '17/01/2025 - 08:20',
      descricao: 'Produto em rota de entrega',
      icone: MapPin,
      cor: 'text-purple-600',
      bgCor: 'bg-purple-100',
      concluido: false
    },
    {
      status: 'Entregue',
      data: 'Previsão: 18/01/2025',
      descricao: 'Produto será entregue no endereço',
      icone: CheckCircle,
      cor: 'text-gray-400',
      bgCor: 'bg-gray-100',
      concluido: false
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Package className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Rastrear Pedido</h1>
            <p className="text-lg opacity-90">Acompanhe seu pedido em tempo real</p>
          </div>
        </div>
        <p className="text-xl opacity-95">
          Digite o código de rastreamento para ver o status da sua entrega.
        </p>
      </div>

      {/* Formulário de Rastreamento */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🔍 Buscar Pedido</h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Código de Rastreamento
            </label>
            <input
              type="text"
              value={codigoRastreamento}
              onChange={(e) => setCodigoRastreamento(e.target.value.toUpperCase())}
              placeholder="Ex: BR123456789BR ou MG2025001"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
            />
          </div>
          <div className="sm:pt-7">
            <button
              onClick={handleRastrear}
              disabled={!codigoRastreamento.trim() || carregando}
              className="w-full sm:w-auto bg-orange-600 text-white px-8 py-3 rounded-xl hover:bg-orange-700 disabled:bg-gray-300 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              {carregando ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              Rastrear
            </button>
          </div>
        </div>

        {/* Dicas */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Dicas:</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• O código de rastreamento é enviado por WhatsApp após o envio</li>
            <li>• Códigos dos Correios começam com BR e terminam com BR</li>
            <li>• Nossos códigos internos começam com MG seguido do ano</li>
          </ul>
        </div>
      </div>

      {/* Resultado do Rastreamento */}
      {pedidoEncontrado && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-2 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Pedido Encontrado!</h2>
              <p className="text-gray-600">Código: {codigoRastreamento}</p>
            </div>
          </div>

          {/* Informações do Pedido */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📦 Produto</h3>
              <p className="text-gray-700">Tênis Nike Air Max 270</p>
              <p className="text-sm text-gray-600">Tamanho: 42 | Cor: Preto</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2">📍 Destino</h3>
              <p className="text-gray-700">Rio de Janeiro - RJ</p>
              <p className="text-sm text-gray-600">CEP: 20040-020</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🚚 Transportadora</h3>
              <p className="text-gray-700">Correios - SEDEX</p>
              <p className="text-sm text-gray-600">Previsão: 18/01/2025</p>
            </div>
          </div>

          {/* Timeline do Status */}
          <h3 className="text-xl font-bold text-gray-900 mb-6">📋 Histórico de Movimentação</h3>
          
          <div className="space-y-4">
            {statusPedido.map((item, index) => {
              const IconeComponent = item.icone;
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className={`${item.bgCor} p-3 rounded-full ${item.concluido ? '' : 'opacity-50'}`}>
                    <IconeComponent className={`w-6 h-6 ${item.cor}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className={`font-semibold ${item.concluido ? 'text-gray-900' : 'text-gray-500'}`}>
                        {item.status}
                      </h4>
                      {item.concluido && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                          Concluído
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${item.concluido ? 'text-gray-600' : 'text-gray-400'}`}>
                      {item.data}
                    </p>
                    <p className={`text-sm ${item.concluido ? 'text-gray-700' : 'text-gray-400'}`}>
                      {item.descricao}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ações */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors font-semibold">
              📱 Receber Atualizações no WhatsApp
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors font-semibold">
              📧 Enviar por E-mail
            </button>
          </div>
        </div>
      )}

      {/* Ajuda */}
      <div className="bg-gradient-to-r from-gray-50 to-orange-50 border border-orange-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">❓ Precisa de Ajuda?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p><strong>WhatsApp:</strong> (21) 98936-5166</p>
            <p><strong>E-mail:</strong> rastreamento@megastore.com.br</p>
          </div>
          <div>
            <p><strong>Horário:</strong> Segunda a Sexta, 9h às 18h</p>
            <p><strong>Sábado:</strong> 9h às 14h</p>
          </div>
        </div>
      </div>
    </div>
  );
};