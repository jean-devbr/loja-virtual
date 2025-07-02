import React from 'react';
import { RotateCcw, Package, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export const TrocasDevolucoes: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <RotateCcw className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Trocas e Devoluções</h1>
            <p className="text-lg opacity-90">Política atualizada em Janeiro de 2025</p>
          </div>
        </div>
        <p className="text-xl opacity-95">
          Sua satisfação é garantida! Conheça nossos prazos e condições.
        </p>
      </div>

      {/* Conteúdo */}
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
        
        {/* Prazos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-bold text-green-800">Prazo para Troca</h3>
            </div>
            <p className="text-green-700 text-lg font-semibold">30 dias corridos</p>
            <p className="text-green-600 text-sm">A partir do recebimento do produto</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <RotateCcw className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-blue-800">Prazo para Devolução</h3>
            <p className="text-blue-700 text-lg font-semibold">7 dias corridos</p>
            <p className="text-blue-600 text-sm">Direito de arrependimento (CDC)</p>
          </div>
        </div>

        {/* Condições para Troca */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Condições para Troca</h2>
          </div>
          <div className="pl-12 space-y-3 text-gray-700">
            <p>✅ Produto em perfeito estado, sem uso</p>
            <p>✅ Embalagem original preservada</p>
            <p>✅ Etiquetas e lacres intactos</p>
            <p>✅ Nota fiscal ou comprovante de compra</p>
            <p>✅ Dentro do prazo de 30 dias</p>
          </div>
        </div>

        {/* Produtos que NÃO podem ser trocados */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Produtos que NÃO podem ser trocados</h2>
          </div>
          <div className="pl-12 space-y-3 text-gray-700">
            <p>❌ Produtos personalizados ou sob encomenda</p>
            <p>❌ Itens de higiene pessoal (por motivos de saúde)</p>
            <p>❌ Produtos com sinais de uso ou danos</p>
            <p>❌ Itens sem embalagem original</p>
          </div>
        </div>

        {/* Como solicitar */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Como Solicitar Troca/Devolução</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-700">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">📱 Passo 1: Entre em Contato</h4>
              <p>WhatsApp: (21) 98936-5166</p>
              <p>E-mail: trocas@megastore.com.br</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">📋 Passo 2: Informe os Dados</h4>
              <p>• Número do pedido</p>
              <p>• Produto que deseja trocar/devolver</p>
              <p>• Motivo da solicitação</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">📦 Passo 3: Envio do Produto</h4>
              <p>• Embale o produto com cuidado</p>
              <p>• Use a etiqueta de postagem que enviaremos</p>
              <p>• Poste nos Correios</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">✅ Passo 4: Processamento</h4>
              <p>• Análise em até 3 dias úteis</p>
              <p>• Troca: novo produto enviado</p>
              <p>• Devolução: estorno em até 5 dias úteis</p>
            </div>
          </div>
        </div>

        {/* Custos */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Custos de Frete</h2>
          </div>
          <div className="pl-12 space-y-3 text-gray-700">
            <p><strong>🆓 Frete GRÁTIS para troca quando:</strong></p>
            <p>• Produto com defeito de fabricação</p>
            <p>• Produto diferente do pedido</p>
            <p>• Produto danificado no transporte</p>
            
            <p className="pt-3"><strong>💰 Cliente paga o frete quando:</strong></p>
            <p>• Desistência (direito de arrependimento)</p>
            <p>• Troca por tamanho/cor diferente</p>
            <p>• Produto não serviu</p>
          </div>
        </div>

        {/* Contato */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📞 Precisa de Ajuda?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p><strong>WhatsApp:</strong> (21) 98936-5166</p>
              <p><strong>E-mail:</strong> trocas@megastore.com.br</p>
            </div>
            <div>
              <p><strong>Horário:</strong> Segunda a Sexta, 9h às 18h</p>
              <p><strong>Sábado:</strong> 9h às 14h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};