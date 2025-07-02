import React from 'react';
import { Store, Heart, Award, Users, Target, Zap, Shield, Truck } from 'lucide-react';

export const SobreNos: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-black text-white rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Store className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Sobre a MegaStore</h1>
            <p className="text-lg opacity-90">Sua loja esportiva de confiança desde 2020</p>
          </div>
        </div>
        <p className="text-xl opacity-95">
          Paixão pelo esporte, qualidade em cada produto e atendimento que faz a diferença.
        </p>
      </div>

      {/* Nossa História */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-red-100 p-2 rounded-lg">
            <Heart className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Nossa História</h2>
        </div>
        
        <div className="space-y-6 text-gray-700">
          <p className="text-lg leading-relaxed">
            A <strong>MegaStore</strong> nasceu em 2020 da paixão pelo esporte e do sonho de oferecer 
            produtos de qualidade para todos os brasileiros. Começamos como uma pequena loja no 
            Rio de Janeiro, especializada em produtos esportivos.
          </p>
          
          <p className="text-lg leading-relaxed">
            Nossa especialidade sempre foi o <strong className="text-red-600">Flamengo</strong> - 
            somos apaixonados pelo Mengão e orgulhosos de ser uma das principais lojas de produtos 
            oficiais do clube no Brasil. Mas nossa paixão vai além: oferecemos tênis das melhores 
            marcas e mochilas para todos os estilos.
          </p>
          
          <p className="text-lg leading-relaxed">
            Hoje, atendemos todo o Brasil com a mesma dedicação e carinho que tínhamos quando 
            começamos. Cada produto é cuidadosamente selecionado, cada cliente é tratado como 
            família, e cada entrega é feita com responsabilidade.
          </p>
        </div>
      </div>

      {/* Nossos Valores */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">🏆 Nossos Valores</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-red-800">Paixão</h3>
            </div>
            <p className="text-red-700">
              Somos apaixonados pelo que fazemos. Cada produto é escolhido com carinho, 
              pensando na satisfação dos nossos clientes.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-800">Confiança</h3>
            </div>
            <p className="text-blue-700">
              Produtos 100% originais, pagamento seguro e entrega garantida. 
              Sua confiança é nosso maior patrimônio.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800">Qualidade</h3>
            </div>
            <p className="text-green-700">
              Trabalhamos apenas com as melhores marcas e fornecedores autorizados. 
              Qualidade é inegociável.
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-purple-800">Família</h3>
            </div>
            <p className="text-purple-700">
              Cada cliente é parte da nossa família. Atendimento personalizado 
              e relacionamento duradouro.
            </p>
          </div>
        </div>
      </div>

      {/* Por que escolher a MegaStore */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">⭐ Por que escolher a MegaStore?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Entrega Rápida</h3>
            <p className="text-gray-600 text-sm">Frete grátis acima de R$ 299 e entrega em todo o Brasil</p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">100% Original</h3>
            <p className="text-gray-600 text-sm">Produtos originais com garantia oficial do fabricante</p>
          </div>

          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Atendimento Ágil</h3>
            <p className="text-gray-600 text-sm">Suporte via WhatsApp com resposta rápida</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Especialistas</h3>
            <p className="text-gray-600 text-sm">Conhecimento profundo em produtos esportivos</p>
          </div>
        </div>
      </div>

      {/* Flamengo */}
      <div className="bg-gradient-to-r from-red-600 to-black text-white rounded-2xl p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">🔴⚫ Mengão na Veia!</h2>
          <p className="text-xl opacity-95 mb-6">
            Somos torcedores apaixonados e loja oficial de produtos do Flamengo
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">⚽</div>
              <p className="font-semibold">Camisas de Futebol</p>
              <p className="text-sm opacity-80">Modelos 2024 e retrô</p>
            </div>
            <div>
              <div className="text-3xl font-bold">🏀</div>
              <p className="font-semibold">Camisas de Basquete</p>
              <p className="text-sm opacity-80">NBB e edições especiais</p>
            </div>
            <div>
              <div className="text-3xl font-bold">🎽</div>
              <p className="font-semibold">Acessórios</p>
              <p className="text-sm opacity-80">Bonés, meias e muito mais</p>
            </div>
          </div>
        </div>
      </div>

      {/* Missão, Visão e Valores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Missão</h3>
          </div>
          <p className="text-gray-700">
            Oferecer produtos esportivos de qualidade com atendimento excepcional, 
            conectando pessoas através da paixão pelo esporte.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Visão</h3>
          </div>
          <p className="text-gray-700">
            Ser a principal referência em produtos esportivos no Brasil, 
            reconhecida pela qualidade e paixão pelo que fazemos.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 p-2 rounded-lg">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Valores</h3>
          </div>
          <p className="text-gray-700">
            Paixão, confiança, qualidade e relacionamento familiar com 
            cada cliente que escolhe a MegaStore.
          </p>
        </div>
      </div>

      {/* Contato */}
      <div className="bg-gradient-to-r from-gray-50 to-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">📞 Fale Conosco</h3>
        <p className="text-gray-700 mb-4">
          Quer conhecer mais sobre nossa história ou tem alguma sugestão? Entre em contato!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p><strong>WhatsApp:</strong> (21) 98936-5166</p>
            <p><strong>E-mail:</strong> contato@megastore.com.br</p>
          </div>
          <div>
            <p><strong>Endereço:</strong> Rio de Janeiro - RJ</p>
            <p><strong>Horário:</strong> Segunda a Sexta, 9h às 18h</p>
          </div>
        </div>
      </div>
    </div>
  );
};