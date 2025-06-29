import React from 'react';
import { MessageCircle } from 'lucide-react';

export const BotaoWhatsApp: React.FC = () => {
  const handleWhatsAppClick = () => {
    const mensagem = "Olá! 👋 Gostaria de saber mais sobre os produtos da MegaStore. Podem me ajudar?";
    const numeroTelefone = "5521989365166"; // Número atualizado
    window.open(`https://wa.me/${numeroTelefone}?text=${encodeURIComponent(mensagem)}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 group animate-bounce hover:animate-none"
      aria-label="Entrar em contato via WhatsApp"
    >
      <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform duration-200" />
      <div className="absolute right-full bottom-1/2 transform translate-y-1/2 mr-4 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
        💬 Fale conosco no WhatsApp!
        <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
      </div>
    </button>
  );
};