import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck, AlertTriangle } from 'lucide-react';

export const PoliticaPrivacidade: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Política de Privacidade</h1>
            <p className="text-lg opacity-90">Última atualização: Janeiro de 2025</p>
          </div>
        </div>
        <p className="text-xl opacity-95">
          Sua privacidade é nossa prioridade. Conheça como protegemos seus dados.
        </p>
      </div>

      {/* Conteúdo */}
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
        
        {/* Seção 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <UserCheck className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">1. Informações que Coletamos</h2>
          </div>
          <div className="pl-12 space-y-3 text-gray-700">
            <p><strong>Dados Pessoais:</strong> Nome, CPF, telefone, e-mail e endereço para entrega.</p>
            <p><strong>Dados de Navegação:</strong> Informações sobre como você usa nosso site.</p>
            <p><strong>Dados de Compra:</strong> Histórico de pedidos e preferências de produtos.</p>
          </div>
        </div>

        {/* Seção 2 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">2. Como Usamos suas Informações</h2>
          </div>
          <div className="pl-12 space-y-3 text-gray-700">
            <p>• Processar e entregar seus pedidos</p>
            <p>• Enviar atualizações sobre o status do pedido</p>
            <p>• Melhorar nossos produtos e serviços</p>
            <p>• Enviar ofertas personalizadas (com seu consentimento)</p>
            <p>• Cumprir obrigações legais</p>
          </div>
        </div>

        {/* Seção 3 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Lock className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">3. Proteção dos Dados</h2>
          </div>
          <div className="pl-12 space-y-3 text-gray-700">
            <p>• Criptografia SSL 256 bits em todas as transações</p>
            <p>• Servidores seguros com backup diário</p>
            <p>• Acesso restrito aos dados pessoais</p>
            <p>• Monitoramento 24/7 contra ameaças</p>
          </div>
        </div>

        {/* Seção 4 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <Database className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">4. Compartilhamento de Dados</h2>
          </div>
          <div className="pl-12 space-y-3 text-gray-700">
            <p><strong>Não vendemos</strong> seus dados pessoais para terceiros.</p>
            <p><strong>Compartilhamos apenas quando necessário:</strong></p>
            <p>• Com transportadoras para entrega</p>
            <p>• Com processadores de pagamento</p>
            <p>• Quando exigido por lei</p>
          </div>
        </div>

        {/* Seção 5 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">5. Seus Direitos</h2>
          </div>
          <div className="pl-12 space-y-3 text-gray-700">
            <p>• <strong>Acesso:</strong> Solicitar cópia dos seus dados</p>
            <p>• <strong>Correção:</strong> Atualizar informações incorretas</p>
            <p>• <strong>Exclusão:</strong> Solicitar remoção dos seus dados</p>
            <p>• <strong>Portabilidade:</strong> Transferir dados para outro serviço</p>
            <p>• <strong>Oposição:</strong> Recusar processamento para marketing</p>
          </div>
        </div>

        {/* Contato */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📞 Dúvidas sobre Privacidade?</h3>
          <p className="text-gray-700 mb-4">
            Entre em contato conosco para exercer seus direitos ou esclarecer dúvidas:
          </p>
          <div className="space-y-2 text-gray-700">
            <p><strong>E-mail:</strong> privacidade@megastore.com.br</p>
            <p><strong>WhatsApp:</strong> (21) 98936-5166</p>
            <p><strong>Horário:</strong> Segunda a Sexta, 9h às 18h</p>
          </div>
        </div>
      </div>
    </div>
  );
};