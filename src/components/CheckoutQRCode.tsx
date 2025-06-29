import React, { useState, useEffect } from 'react';
import { QrCode, User, Phone, MapPin, CreditCard, Check, X } from 'lucide-react';
import { ItemCarrinho, Endereco, CalculoFrete } from '../types';

interface DadosCliente {
  nome: string;
  cpf: string;
  telefone: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
}

interface CheckoutQRCodeProps {
  itens: ItemCarrinho[];
  total: number;
  frete?: CalculoFrete;
  onFechar: () => void;
  onFinalizarPedido: (dadosCliente: DadosCliente) => void;
}

export const CheckoutQRCode: React.FC<CheckoutQRCodeProps> = ({
  itens,
  total,
  frete,
  onFechar,
  onFinalizarPedido
}) => {
  const [etapaAtual, setEtapaAtual] = useState<'dados' | 'pagamento' | 'confirmacao'>('dados');
  const [dadosCliente, setDadosCliente] = useState<DadosCliente>({
    nome: '',
    cpf: '',
    telefone: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: ''
  });
  const [carregandoCep, setCarregandoCep] = useState(false);
  const [qrCodeGerado, setQrCodeGerado] = useState(false);
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false);

  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  const formatarCPF = (cpf: string) => {
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatarTelefone = (telefone: string) => {
    return telefone
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const buscarCEP = async (cep: string) => {
    if (cep.length !== 8) return;
    
    setCarregandoCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setDadosCliente(prev => ({
          ...prev,
          endereco: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    } finally {
      setCarregandoCep(false);
    }
  };

  const handleSubmitDados = (e: React.FormEvent) => {
    e.preventDefault();
    setEtapaAtual('pagamento');
    
    // Simula geração do QR Code
    setTimeout(() => {
      setQrCodeGerado(true);
    }, 1500);
  };

  const simularPagamento = () => {
    // Simula confirmação de pagamento
    setTimeout(() => {
      setPagamentoConfirmado(true);
      setEtapaAtual('confirmacao');
      
      // Finaliza o pedido após 2 segundos
      setTimeout(() => {
        onFinalizarPedido(dadosCliente);
      }, 2000);
    }, 3000);
  };

  const totalComFrete = total + (frete?.valor || 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Finalizar Compra</h2>
              <p className="opacity-90">Complete seu pedido em 3 etapas simples</p>
            </div>
            <button
              onClick={onFechar}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center mt-6 space-x-4">
            <div className={`flex items-center ${etapaAtual === 'dados' ? 'text-white' : 'text-white/60'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${etapaAtual === 'dados' ? 'bg-white text-green-600' : etapaAtual !== 'dados' ? 'bg-white text-green-600' : 'bg-white/20'}`}>
                {etapaAtual !== 'dados' ? <Check className="w-5 h-5" /> : '1'}
              </div>
              <span className="ml-2 font-medium">Dados</span>
            </div>
            <div className="flex-1 h-1 bg-white/20 rounded">
              <div className={`h-full bg-white rounded transition-all duration-500 ${etapaAtual !== 'dados' ? 'w-full' : 'w-0'}`}></div>
            </div>
            <div className={`flex items-center ${etapaAtual === 'pagamento' ? 'text-white' : 'text-white/60'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${etapaAtual === 'pagamento' ? 'bg-white text-green-600' : etapaAtual === 'confirmacao' ? 'bg-white text-green-600' : 'bg-white/20'}`}>
                {etapaAtual === 'confirmacao' ? <Check className="w-5 h-5" /> : '2'}
              </div>
              <span className="ml-2 font-medium">Pagamento</span>
            </div>
            <div className="flex-1 h-1 bg-white/20 rounded">
              <div className={`h-full bg-white rounded transition-all duration-500 ${etapaAtual === 'confirmacao' ? 'w-full' : 'w-0'}`}></div>
            </div>
            <div className={`flex items-center ${etapaAtual === 'confirmacao' ? 'text-white' : 'text-white/60'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${etapaAtual === 'confirmacao' ? 'bg-white text-green-600' : 'bg-white/20'}`}>
                {etapaAtual === 'confirmacao' ? <Check className="w-5 h-5" /> : '3'}
              </div>
              <span className="ml-2 font-medium">Confirmação</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Etapa 1: Dados do Cliente */}
          {etapaAtual === 'dados' && (
            <form onSubmit={handleSubmitDados} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={dadosCliente.nome}
                      onChange={(e) => setDadosCliente({...dadosCliente, nome: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CPF *
                  </label>
                  <input
                    type="text"
                    value={dadosCliente.cpf}
                    onChange={(e) => setDadosCliente({...dadosCliente, cpf: formatarCPF(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="000.000.000-00"
                    maxLength={14}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={dadosCliente.telefone}
                      onChange={(e) => setDadosCliente({...dadosCliente, telefone: formatarTelefone(e.target.value)})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="(11) 99999-9999"
                      maxLength={15}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CEP *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={dadosCliente.cep}
                      onChange={(e) => {
                        const cep = e.target.value.replace(/\D/g, '');
                        setDadosCliente({...dadosCliente, cep});
                        if (cep.length === 8) {
                          buscarCEP(cep);
                        }
                      }}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="00000-000"
                      maxLength={8}
                      required
                    />
                    {carregandoCep && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Endereço *
                  </label>
                  <input
                    type="text"
                    value={dadosCliente.endereco}
                    onChange={(e) => setDadosCliente({...dadosCliente, endereco: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Rua, Avenida..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Número *
                  </label>
                  <input
                    type="text"
                    value={dadosCliente.numero}
                    onChange={(e) => setDadosCliente({...dadosCliente, numero: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="123"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Complemento
                  </label>
                  <input
                    type="text"
                    value={dadosCliente.complemento}
                    onChange={(e) => setDadosCliente({...dadosCliente, complemento: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Apto, Bloco..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    value={dadosCliente.bairro}
                    onChange={(e) => setDadosCliente({...dadosCliente, bairro: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Centro"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    value={dadosCliente.cidade}
                    onChange={(e) => setDadosCliente({...dadosCliente, cidade: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="São Paulo"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    UF *
                  </label>
                  <select
                    value={dadosCliente.uf}
                    onChange={(e) => setDadosCliente({...dadosCliente, uf: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    <option value="AP">AP</option>
                    <option value="AM">AM</option>
                    <option value="BA">BA</option>
                    <option value="CE">CE</option>
                    <option value="DF">DF</option>
                    <option value="ES">ES</option>
                    <option value="GO">GO</option>
                    <option value="MA">MA</option>
                    <option value="MT">MT</option>
                    <option value="MS">MS</option>
                    <option value="MG">MG</option>
                    <option value="PA">PA</option>
                    <option value="PB">PB</option>
                    <option value="PR">PR</option>
                    <option value="PE">PE</option>
                    <option value="PI">PI</option>
                    <option value="RJ">RJ</option>
                    <option value="RN">RN</option>
                    <option value="RS">RS</option>
                    <option value="RO">RO</option>
                    <option value="RR">RR</option>
                    <option value="SC">SC</option>
                    <option value="SP">SP</option>
                    <option value="SE">SE</option>
                    <option value="TO">TO</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Continuar para Pagamento →
                </button>
              </div>
            </form>
          )}

          {/* Etapa 2: Pagamento via QR Code */}
          {etapaAtual === 'pagamento' && (
            <div className="text-center space-y-6">
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">💳 Pagamento via PIX</h3>
                <p className="text-gray-600 mb-6">Escaneie o código QR com o app do seu banco</p>
                
                {!qrCodeGerado ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-gray-600">Gerando código PIX seguro...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* QR Code simulado com design mais realista */}
                    <div className="bg-white p-6 rounded-2xl shadow-xl inline-block border-2 border-gray-100">
                      <div className="w-72 h-72 bg-white rounded-lg flex items-center justify-center relative overflow-hidden">
                        {/* Simulação de QR Code mais realista */}
                        <div className="absolute inset-0 grid grid-cols-12 gap-1 p-2">
                          {Array.from({ length: 144 }, (_, i) => (
                            <div
                              key={i}
                              className={`aspect-square ${
                                Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                              } ${
                                // Cantos do QR Code
                                (i < 21 && (i % 12 < 3 || i % 12 > 8)) ||
                                (i > 123 && (i % 12 < 3 || i % 12 > 8)) ||
                                (i % 12 < 3 && i < 36) ||
                                (i % 12 > 8 && i < 36)
                                  ? 'bg-black'
                                  : ''
                              }`}
                            />
                          ))}
                        </div>
                        {/* Ícone PIX no centro */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white p-2 rounded-lg shadow-lg">
                            <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                              <span className="text-white font-bold text-xs">PIX</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-white border-2 border-green-200 rounded-xl p-6">
                        <div className="flex items-center justify-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <CreditCard className="w-4 h-4 text-green-600" />
                          </div>
                          <p className="text-xl font-bold text-gray-900">
                            {formatarPreco(totalComFrete)}
                          </p>
                        </div>
                        {frete && (
                          <p className="text-sm text-gray-600">
                            Subtotal: {formatarPreco(total)} + Frete: {formatarPreco(frete.valor)}
                          </p>
                        )}
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-blue-800 text-sm">
                          ⏱️ <strong>Código válido por 15 minutos</strong><br />
                          🔒 Pagamento 100% seguro via PIX
                        </p>
                      </div>
                      
                      <button
                        onClick={simularPagamento}
                        className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        ✅ Simular Pagamento (Demo)
                      </button>
                      
                      <p className="text-xs text-gray-500">
                        * Em produção, o pagamento seria processado automaticamente
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Etapa 3: Confirmação */}
          {etapaAtual === 'confirmacao' && (
            <div className="text-center space-y-6">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Check className="w-12 h-12 text-green-600" />
                </div>
                
                <h3 className="text-3xl font-bold text-green-800 mb-4">
                  🎉 Pagamento Confirmado!
                </h3>
                
                <p className="text-green-700 text-xl mb-6">
                  Seu pedido foi processado com sucesso
                </p>
                
                <div className="bg-white rounded-xl p-6 text-left shadow-lg">
                  <h4 className="font-bold text-gray-900 mb-4 text-center">📋 Resumo do Pedido</h4>
                  <div className="space-y-3 text-sm">
                    {itens.map(item => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div>
                          <span className="font-medium">{item.nome}</span>
                          <span className="text-gray-500 ml-2">x{item.quantidade}</span>
                        </div>
                        <span className="font-semibold">{formatarPreco(item.preco * item.quantidade)}</span>
                      </div>
                    ))}
                    {frete && (
                      <div className="flex justify-between text-gray-600 py-2 border-b border-gray-100">
                        <span>🚚 Frete ({frete.servico})</span>
                        <span>{formatarPreco(frete.valor)}</span>
                      </div>
                    )}
                    <div className="border-t-2 border-green-200 pt-3 flex justify-between text-lg font-bold text-green-800">
                      <span>💰 Total Pago</span>
                      <span>{formatarPreco(totalComFrete)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
                  <p className="text-blue-800 font-medium">
                    📱 Você receberá um WhatsApp com todos os detalhes do pedido
                  </p>
                  <p className="text-blue-600 text-sm mt-1">
                    Acompanhe o status da entrega pelo nosso WhatsApp
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};