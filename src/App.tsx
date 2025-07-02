import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Loja } from './pages/Loja';
import { PainelAdmin } from './components/PainelAdmin';
import { Carrinho } from './components/Carrinho';
import { BotaoWhatsApp } from './components/BotaoWhatsApp';
import { LoginAdmin } from './components/LoginAdmin';
import { Footer } from './components/Footer';
import { PoliticaPrivacidade } from './pages/PoliticaPrivacidade';
import { TermosUso } from './pages/TermosUso';
import { TrocasDevolucoes } from './pages/TrocasDevolucoes';
import { RastrearPedido } from './pages/RastrearPedido';
import { PerguntasFrequentes } from './pages/PerguntasFrequentes';
import { SobreNos } from './pages/SobreNos';
import { useLoja } from './hooks/useLoja';

function App() {
  const [mostrarLoginAdmin, setMostrarLoginAdmin] = useState(false);
  
  const {
    produtos,
    carrinho,
    visualizacaoAtual,
    endereco,
    frete,
    adminLogado,
    configuracao,
    adicionarProduto,
    atualizarProduto,
    excluirProduto,
    atualizarConfiguracao,
    adicionarAoCarrinho,
    removerDoCarrinho,
    atualizarQuantidadeCarrinho,
    definirVisualizacao,
    definirEndereco,
    definirFrete,
    logarAdmin,
    deslogarAdmin,
    limparCarrinho,
    obterTotalCarrinho,
    obterQuantidadeItensCarrinho,
    obterPesoTotalCarrinho
  } = useLoja();

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [visualizacaoAtual]);

  const handleMudarVisualizacao = (visualizacao: typeof visualizacaoAtual) => {
    if (visualizacao === 'admin') {
      if (!adminLogado) {
        setMostrarLoginAdmin(true);
        return;
      }
    }
    definirVisualizacao(visualizacao);
  };

  const handleLoginAdmin = (sucesso: boolean) => {
    setMostrarLoginAdmin(false);
    if (sucesso) {
      logarAdmin(true);
      definirVisualizacao('admin');
    }
  };

  const renderizarVisualizacaoAtual = () => {
    switch (visualizacaoAtual) {
      case 'loja':
        return <Loja produtos={produtos} onAdicionarAoCarrinho={adicionarAoCarrinho} />;
      case 'admin':
        return adminLogado ? (
          <PainelAdmin
            produtos={produtos}
            configuracao={configuracao}
            onAdicionarProduto={adicionarProduto}
            onAtualizarProduto={atualizarProduto}
            onExcluirProduto={excluirProduto}
            onAtualizarConfiguracao={atualizarConfiguracao}
          />
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Acesso Negado</h3>
            <p className="text-gray-500">Você precisa fazer login para acessar o painel administrativo.</p>
          </div>
        );
      case 'carrinho':
        return (
          <Carrinho
            itens={carrinho}
            onAtualizarQuantidade={atualizarQuantidadeCarrinho}
            onRemoverItem={removerDoCarrinho}
            total={obterTotalCarrinho()}
            pesoTotal={obterPesoTotalCarrinho()}
            endereco={endereco}
            frete={frete}
            onDefinirEndereco={definirEndereco}
            onDefinirFrete={definirFrete}
            onLimparCarrinho={limparCarrinho}
          />
        );
      case 'politica-privacidade':
        return <PoliticaPrivacidade />;
      case 'termos-uso':
        return <TermosUso />;
      case 'trocas-devolucoes':
        return <TrocasDevolucoes />;
      case 'rastrear-pedido':
        return <RastrearPedido />;
      case 'perguntas-frequentes':
        return <PerguntasFrequentes />;
      case 'sobre-nos':
        return <SobreNos />;
      default:
        return <Loja produtos={produtos} onAdicionarAoCarrinho={adicionarAoCarrinho} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        visualizacaoAtual={visualizacaoAtual}
        onMudarVisualizacao={handleMudarVisualizacao}
        quantidadeItensCarrinho={obterQuantidadeItensCarrinho()}
        adminLogado={adminLogado}
        onDeslogarAdmin={deslogarAdmin}
      />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderizarVisualizacaoAtual()}
      </main>
      
      <Footer 
        configuracao={configuracao} 
        onNavigateTo={handleMudarVisualizacao}
      />
      
      <BotaoWhatsApp />
      
      {/* Modal de Login Admin */}
      {mostrarLoginAdmin && (
        <LoginAdmin
          onLogin={handleLoginAdmin}
          onCancelar={() => setMostrarLoginAdmin(false)}
        />
      )}
    </div>
  );
}

export default App;