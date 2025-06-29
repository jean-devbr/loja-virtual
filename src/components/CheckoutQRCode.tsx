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
    }, 1000);
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
              <p className="opacity-90">Preencha seus dados para continuar</p>
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
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${etapaAtual === 'dados' ? 'bg-white text-green-600' : 'bg-white/20'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Dados</span>
            </div>
            <div className="flex-1 h-1 bg-white/20 rounded">
              <div className={`h-full bg-white rounded transition-all duration-300 ${etapaAtual !== 'dados' ? 'w-full' : 'w-0'}`}></div>
            </div>
            <div className={`flex items-center ${etapaAtual === 'pagamento' ? 'text-white' : 'text-white/60'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${etapaAtual === 'pagamento' ? 'bg-white text-green-600' : 'bg-white/20'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Pagamento</span>
            </div>
            <div className="flex-1 h-1 bg-white/20 rounded">
              <div className={`h-full bg-white rounded transition-all duration-300 ${etapaAtual === 'confirmacao' ? 'w-full' : 'w-0'}`}></div>
            </div>
            <div className={`flex items-center ${etapaAtual === 'confirmacao' ? 'text-white' : 'text-white/60'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${etapaAtual === 'confirmacao' ? 'bg-white text-green-600' : 'bg-white/20'}`}>
                3
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
                    <option value="SP">SP</option>
                    <option value="RJ">RJ</option>
                    <option value="MG">MG</option>
                    <option value="RS">RS</option>
                    <option value="PR">PR</option>
                    <option value="SC">SC</option>
                    {/* Adicione outros estados conforme necessário */}
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                >
                  Continuar para Pagamento
                </button>
              </div>
            </form>
          )}

          {/* Etapa 2: Pagamento via QR Code */}
          {etapaAtual === 'pagamento' && (
            <div className="text-center space-y-6">
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pagamento via PIX</h3>
                
                {!qrCodeGerado ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-gray-600">Gerando código PIX...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* QR Code simulado */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg inline-block">
                      <div className="w-64 h-64 bg-gray-900 rounded-lg flex items-center justify-center">
                        <QrCode className="w-32 h-32 text-white" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-lg font-semibold text-gray-900">
                        Escaneie o QR Code com seu app do banco
                      </p>
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-blue-800 font-semibold">
                          Valor: {formatarPreco(totalComFrete)}
                        </p>
                        {frete && (
                          <p className="text-sm text-blue-600">
                            Inclui frete: {formatarPreco(frete.valor)}
                          </p>
                        )}
                      </div>
                      
                      <button
                        onClick={simularPagamento}
                        className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold"
                      >
                        Simular Pagamento (Demo)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Etapa 3: Confirmação */}
          {etapaAtual === 'confirmacao' && (
            <div className="text-center space-y-6">
              <div className="bg-green-50 rounded-2xl p-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  Pagamento Confirmado!
                </h3>
                
                <p className="text-green-700 text-lg mb-6">
                  Seu pedido foi processado com sucesso
                </p>
                
                <div className="bg-white rounded-xl p-6 text-left">
                  <h4 className="font-bold text-gray-900 mb-4">Resumo do Pedido:</h4>
                  <div className="space-y-2 text-sm">
                    {itens.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.nome} x{item.quantidade}</span>
                        <span>{formatarPreco(item.preco * item.quantidade)}</span>
                      </div>
                    ))}
                    {frete && (
                      <div className="flex justify-between text-gray-600">
                        <span>Frete ({frete.servico})</span>
                        <span>{formatarPreco(frete.valor)}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatarPreco(totalComFrete)}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mt-4">
                  Você receberá um WhatsApp com os detalhes do pedido
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};