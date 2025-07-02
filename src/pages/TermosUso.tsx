import React from 'react';
import { FileText, Scale, ShoppingCart, CreditCard, Truck, AlertCircle } from 'lucide-react';

export const TermosUso: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Termos de Uso</h1>
            <p className="text-lg opacity-90">Última atualização: Janeiro de 2025</p>
          </div>
        </div>
        <p className="text-xl opacity-95">
          Condições gerais para uso da nossa plataforma e serviços.
        </p>
      </div>

      {/* Conteúdo */}
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
        
        {/* Seção 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Scale className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">1. Aceitação dos Termos</h2>
          </div>
          <div className="pl-12 space-y-3 text-gray-700">
            <p>Ao acessar e usar nosso site, você concorda com estes termos de uso.</p>
            <p>Se você não concordar com qualquer parte destes termos, não deve usar nossos serviços.</p>
            <p>Reservamo-nos o direito de modificar estes termos a qualquer momento.</p>
          </div>
        </div>

        {/* Seção 2 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">2. Uso da Plataforma</h2>
          </div>
          <div className="pl-12 space-y-3 text-gray-700">
            <p><strong>Você pode:</strong></p>
            <p>• Navegar e comprar produtos em nosso site</p>
            <p>• Criar uma conta para facilitar futuras compras</p>
            <p>• Entrar em contato conosco para suporte</p>
            
            <p className="pt-3"><strong>Você não pode:</strong></p>
            <p>• Usar o site para atividades ilegais</p>
            <p>• Tentar hackear ou comprometer a segurança</p>
            <p>• Reproduzir conteúdo sem autorização</p>
          </div>
        </div>

        {/* Seção 3 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">3. Compras e Pagamentos</h2>
          </div>
          <div className="pl-12 space-y-3 text-gray-700">
            <p>• Todos os preços estão em Reais (BRL) e incluem impostos</p>
            <p>• Aceitamos PIX, cartões de crédito e boleto bancário</p>
            <p>• O pedido só é confirmado após aprovação do pagamento</p>
            <p>• Produtos sujeitos à disponibilidade em estoque</p>
          </div>
        </div>

        {/* Seção 4 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Truck className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">4. Entrega e Frete</h2>
          </div>
          <div className="pl-12 space-y-3 text-gray-700">
            <p>• Entregamos para todo o Brasil via Correios</p>
            <p>• Frete grátis para compras acima de R$ 299</p>
            <p>• Prazo de entrega varia conforme região</p>
            <p>• Não nos responsabilizamos por atrasos dos Correios</p>
          </div>
        </div>

        {/* Seção 5 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">5. Limitação de Responsabilidade</h2>
          </div>
          <div className="pl-12 space-y-3 text-gray-700">
            <p>• Não nos responsabilizamos por danos indiretos</p>
            <p>• Nossa responsabilidade é limitada ao valor do produto</p>
            <p>• Não garantimos disponibilidade ininterrupta do site</p>
            <p>• Produtos com defeito serão trocados conforme garantia</p>
          </div>
        </div>

        {/* Lei Aplicável */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">⚖️ Lei Aplicável</h3>
          <p className="text-gray-700">
            Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida 
            no foro da comarca do Rio de Janeiro/RJ.
          </p>
        </div>
      </div>
    </div>
  );
};