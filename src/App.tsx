import React, { useState } from 'react';
import { Header } from './components/Header';
import { Loja } from './pages/Loja';
import { PainelAdmin } from './components/PainelAdmin';
import { Carrinho } from './components/Carrinho';
import { BotaoWhatsApp } from './components/BotaoWhatsApp';
import { LoginAdmin } from './components/LoginAdmin';
import { Footer } from './components/Footer';
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
    adicionarProduto,
    atualizarProduto,
    excluirProduto,
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

  const handleMudarVisualizacao = (visualizacao: 'loja' | 'admin' | 'carrinho') => {
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
            onAdicionarProduto={adicionarProduto}
            onAtualizarProduto={atualizarProduto}
            onExcluirProduto={excluirProduto}
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
      
      <Footer />
      
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