import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Store, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  CreditCard,
  Shield,
  Truck,
  Award,
  Heart
} from 'lucide-react';
import { ConfiguracaoLoja } from '../types';

interface FooterProps {
  configuracao: ConfiguracaoLoja;
}

export const Footer: React.FC<FooterProps> = ({ configuracao }) => {
  const handleWhatsAppClick = () => {
    const mensagem = `Olá! 👋 Vim através do site da ${configuracao.nomeLoja} e gostaria de mais informações.`;
    window.open(`https://wa.me/${configuracao.contato.whatsapp}?text=${encodeURIComponent(mensagem)}`, '_blank');
  };

  const handleSocialClick = (url: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  };

  const formatarHorario = () => {
    const horarios = configuracao.horarioFuncionamento;
    return `Seg a Sex: ${horarios.segunda}\nSáb: ${horarios.sabado} | Dom: ${horarios.domingo}`;
  };

  // Helper function to check if a social media URL is valid
  const isValidSocialUrl = (url: string) => {
    return url && url.trim() !== '' && url !== '#';
  };

  // Get array of valid social media platforms
  const validSocialPlatforms = [
    {
      name: 'Instagram',
      url: configuracao.redesSociais.instagram,
      icon: Instagram,
      bgClass: 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700'
    },
    {
      name: 'Facebook',
      url: configuracao.redesSociais.facebook,
      icon: Facebook,
      bgClass: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Twitter',
      url: configuracao.redesSociais.twitter,
      icon: Twitter,
      bgClass: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      name: 'YouTube',
      url: configuracao.redesSociais.youtube,
      icon: Youtube,
      bgClass: 'bg-red-600 hover:bg-red-700'
    }
  ].filter(platform => isValidSocialUrl(platform.url));

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white mt-16">
      {/* Seção Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Informações da Loja */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 p-2 rounded-xl">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                {configuracao.nomeLoja}
              </h3>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              {configuracao.descricaoLoja}
            </p>

            {/* Localização */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Nossa Loja Física</p>
                  <p className="text-gray-300 text-sm">
                    {configuracao.endereco.rua}, {configuracao.endereco.numero}<br />
                    {configuracao.endereco.bairro} - {configuracao.endereco.cidade}/{configuracao.endereco.uf}<br />
                    CEP: {configuracao.endereco.cep}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-red-400" />
                <div>
                  <p className="font-semibold text-white">Horário de Funcionamento</p>
                  <p className="text-gray-300 text-sm whitespace-pre-line">
                    {formatarHorario()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-red-600 pb-2">
              📞 Fale Conosco
            </h3>
            
            <div className="space-y-4">
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors group w-full text-left"
              >
                <div className="bg-green-600 p-2 rounded-lg group-hover:bg-green-500 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-sm">{configuracao.contato.whatsapp.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '($2) $3-$4')}</p>
                </div>
              </button>

              <div className="flex items-center gap-3 text-gray-300">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold">E-mail</p>
                  <p className="text-sm">{configuracao.contato.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold">Telefone Fixo</p>
                  <p className="text-sm">{configuracao.contato.telefone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Links Úteis */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-red-600 pb-2">
              🔗 Links Úteis
            </h3>
            
            <div className="space-y-3">
              <a 
                href="/politica-privacidade.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-red-400 transition-colors"
              >
                📋 Política de Privacidade
              </a>
              <a 
                href="/termos-uso.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-red-400 transition-colors"
              >
                📄 Termos de Uso
              </a>
              <a 
                href="/trocas-devolucoes.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-red-400 transition-colors"
              >
                🔄 Trocas e Devoluções
              </a>
              <a 
                href="/rastrear-pedido.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-red-400 transition-colors"
              >
                📦 Rastrear Pedido
              </a>
              <a 
                href="/perguntas-frequentes.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-red-400 transition-colors"
              >
                ❓ Perguntas Frequentes
              </a>
              <a 
                href="/sobre-nos.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-red-400 transition-colors"
              >
                🏢 Sobre Nós
              </a>
            </div>
          </div>

          {/* Redes Sociais e Certificações */}
          <div className="space-y-6">
            {validSocialPlatforms.length > 0 && (
              <>
                <h3 className="text-xl font-bold text-white border-b border-red-600 pb-2">
                  📱 Redes Sociais
                </h3>
                
                <div className={`grid gap-3 ${validSocialPlatforms.length === 1 ? 'grid-cols-1' : validSocialPlatforms.length === 2 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  {validSocialPlatforms.map((platform) => {
                    const IconComponent = platform.icon;
                    return (
                      <button
                        key={platform.name}
                        onClick={() => handleSocialClick(platform.url)}
                        className={`${platform.bgClass} p-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm font-semibold`}
                      >
                        <IconComponent className="w-4 h-4" />
                        {platform.name}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* Certificações */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white">🏆 Certificações</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-green-800/50 p-2 rounded-lg text-center">
                  <Shield className="w-4 h-4 mx-auto mb-1 text-green-400" />
                  <span>Site Seguro</span>
                </div>
                <div className="bg-blue-800/50 p-2 rounded-lg text-center">
                  <Award className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                  <span>Loja Confiável</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Benefícios */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {configuracao.beneficios.freteGratis.ativo && (
              <div className="flex items-center gap-3 text-center md:text-left">
                <div className="bg-green-600 p-3 rounded-xl">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-white">Frete Grátis</p>
                  <p className="text-gray-400 text-sm">Acima de R$ {configuracao.beneficios.freteGratis.valorMinimo}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="bg-blue-600 p-3 rounded-xl">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-white">Compra Segura</p>
                <p className="text-gray-400 text-sm">SSL 256 bits</p>
              </div>
            </div>

            {configuracao.beneficios.pagamentoPix.ativo && (
              <div className="flex items-center gap-3 text-center md:text-left">
                <div className="bg-purple-600 p-3 rounded-xl">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-white">Pagamento PIX</p>
                  <p className="text-gray-400 text-sm">{configuracao.beneficios.pagamentoPix.desconto}% desconto à vista</p>
                </div>
              </div>
            )}

            {configuracao.beneficios.produtosOriginais.ativo && (
              <div className="flex items-center gap-3 text-center md:text-left">
                <div className="bg-red-600 p-3 rounded-xl">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-white">Produtos Originais</p>
                  <p className="text-gray-400 text-sm">{configuracao.beneficios.garantia.texto}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Seção de Pagamentos */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h4 className="font-semibold text-white mb-4">💳 Formas de Pagamento</h4>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
              <span className="bg-gray-800 px-3 py-2 rounded-lg">💳 Cartão de Crédito</span>
              <span className="bg-gray-800 px-3 py-2 rounded-lg">💰 PIX</span>
              <span className="bg-gray-800 px-3 py-2 rounded-lg">🏦 Boleto Bancário</span>
              <span className="bg-gray-800 px-3 py-2 rounded-lg">📱 Carteiras Digitais</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé Final */}
      <div className="border-t border-gray-700 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2025 {configuracao.nomeLoja} - Todos os direitos reservados
              </p>
              <p className="text-gray-500 text-xs mt-1">
                CNPJ: {configuracao.informacoesLegais.cnpj} | {configuracao.endereco.cidade} - {configuracao.endereco.uf}
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>no {configuracao.endereco.cidade}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};