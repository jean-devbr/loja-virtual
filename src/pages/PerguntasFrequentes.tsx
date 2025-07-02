import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';

export const PerguntasFrequentes: React.FC = () => {
  const [perguntaAberta, setPerguntaAberta] = useState<number | null>(null);
  const [termoBusca, setTermoBusca] = useState('');

  const perguntas = [
    {
      categoria: '🛒 Compras',
      itens: [
        {
          pergunta: 'Como faço para comprar?',
          resposta: 'Navegue pelos produtos, adicione ao carrinho, preencha seus dados e escolha a forma de pagamento. Aceitamos PIX, cartão de crédito e boleto.'
        },
        {
          pergunta: 'Posso parcelar minha compra?',
          resposta: 'Sim! Aceitamos cartão de crédito em até 12x sem juros para compras acima de R$ 200. Para valores menores, até 6x sem juros.'
        },
        {
          pergunta: 'Como sei se o produto é original?',
          resposta: 'Todos os nossos produtos são 100% originais. Trabalhamos apenas com fornecedores autorizados e oferecemos garantia oficial do fabricante.'
        }
      ]
    },
    {
      categoria: '🚚 Entrega',
      itens: [
        {
          pergunta: 'Qual o prazo de entrega?',
          resposta: 'O prazo varia conforme sua região: Sul/Sudeste 2-4 dias úteis, Nordeste/Centro-Oeste 4-7 dias úteis, Norte 7-10 dias úteis.'
        },
        {
          pergunta: 'Vocês entregam em todo o Brasil?',
          resposta: 'Sim! Entregamos para todos os estados brasileiros via Correios. Frete grátis para compras acima de R$ 299.'
        },
        {
          pergunta: 'Como rastrear meu pedido?',
          resposta: 'Após o envio, você recebe o código de rastreamento por WhatsApp. Use nossa página "Rastrear Pedido" ou o site dos Correios.'
        }
      ]
    },
    {
      categoria: '💳 Pagamento',
      itens: [
        {
          pergunta: 'Quais formas de pagamento vocês aceitam?',
          resposta: 'PIX (5% desconto), cartão de crédito (Visa, Master, Elo), cartão de débito e boleto bancário.'
        },
        {
          pergunta: 'O PIX tem desconto?',
          resposta: 'Sim! Pagando via PIX você ganha 5% de desconto em toda a compra. O desconto é aplicado automaticamente no checkout.'
        },
        {
          pergunta: 'Quando o cartão é debitado?',
          resposta: 'Para cartão de crédito, a cobrança é feita na confirmação do pedido. Para débito, o valor é debitado imediatamente.'
        }
      ]
    },
    {
      categoria: '🔄 Trocas',
      itens: [
        {
          pergunta: 'Posso trocar se não servir?',
          resposta: 'Sim! Você tem 30 dias para trocar produtos que não serviram, desde que estejam em perfeito estado com etiquetas.'
        },
        {
          pergunta: 'Quem paga o frete da troca?',
          resposta: 'Se o produto tem defeito, nós pagamos. Se é troca por tamanho/cor, o frete fica por conta do cliente.'
        },
        {
          pergunta: 'Como solicitar uma troca?',
          resposta: 'Entre em contato pelo WhatsApp (21) 98936-5166 com o número do pedido. Te enviaremos as instruções.'
        }
      ]
    },
    {
      categoria: '👕 Produtos',
      itens: [
        {
          pergunta: 'As camisas do Flamengo são oficiais?',
          resposta: 'Sim! Todas as camisas do Flamengo são oficiais, licenciadas pelo clube. Temos modelos de futebol e basquete.'
        },
        {
          pergunta: 'Como escolher o tamanho certo?',
          resposta: 'Cada produto tem uma tabela de medidas. Para tênis, recomendamos medir o pé. Para roupas, consulte as medidas do corpo.'
        },
        {
          pergunta: 'Vocês têm produtos infantis?',
          resposta: 'Sim! Temos tênis e camisas em tamanhos infantis. Consulte a disponibilidade de cada produto.'
        }
      ]
    }
  ];

  const perguntasFiltradas = perguntas.map(categoria => ({
    ...categoria,
    itens: categoria.itens.filter(item =>
      item.pergunta.toLowerCase().includes(termoBusca.toLowerCase()) ||
      item.resposta.toLowerCase().includes(termoBusca.toLowerCase())
    )
  })).filter(categoria => categoria.itens.length > 0);

  const togglePergunta = (index: number) => {
    setPerguntaAberta(perguntaAberta === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <HelpCircle className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Perguntas Frequentes</h1>
            <p className="text-lg opacity-90">Tire suas dúvidas rapidamente</p>
          </div>
        </div>
        <p className="text-xl opacity-95">
          Encontre respostas para as principais dúvidas sobre nossos produtos e serviços.
        </p>
      </div>

      {/* Busca */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar pergunta..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
          />
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-6">
        {perguntasFiltradas.map((categoria, categoriaIndex) => (
          <div key={categoriaIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{categoria.categoria}</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {categoria.itens.map((item, itemIndex) => {
                const perguntaId = categoriaIndex * 100 + itemIndex;
                const isAberta = perguntaAberta === perguntaId;
                
                return (
                  <div key={itemIndex}>
                    <button
                      onClick={() => togglePergunta(perguntaId)}
                      className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                    >
                      <span className="font-semibold text-gray-900 pr-4">
                        {item.pergunta}
                      </span>
                      {isAberta ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    
                    {isAberta && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-700 leading-relaxed">
                          {item.resposta}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Não encontrou */}
      {perguntasFiltradas.length === 0 && termoBusca && (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-700 mb-2">Nenhuma pergunta encontrada</h3>
          <p className="text-gray-500 mb-6">Tente usar outras palavras-chave ou entre em contato conosco.</p>
          
          <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold flex items-center gap-2 mx-auto">
            <MessageCircle className="w-5 h-5" />
            Falar no WhatsApp
          </button>
        </div>
      )}

      {/* Contato */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">❓ Não encontrou sua resposta?</h3>
        <p className="text-gray-700 mb-4">
          Nossa equipe está pronta para ajudar! Entre em contato conosco:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-gray-700"><strong>WhatsApp:</strong> (21) 98936-5166</p>
            <p className="text-gray-700"><strong>E-mail:</strong> ajuda@megastore.com.br</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700"><strong>Horário:</strong> Segunda a Sexta, 9h às 18h</p>
            <p className="text-gray-700"><strong>Sábado:</strong> 9h às 14h</p>
          </div>
        </div>
      </div>
    </div>
  );
};