import React from 'react';
import { Header } from './components/Header';
import { Loja } from './pages/Loja';
import { PainelAdmin } from './components/PainelAdmin';
import { Carrinho } from './components/Carrinho';
import { BotaoWhatsApp } from './components/BotaoWhatsApp';
import { useLoja } from './hooks/useLoja';

function App() {
  const {
    produtos,
    carrinho,
    visualizacaoAtual,
    endereco,
    frete,
    adicionarProduto,
    atualizarProduto,
    excluirProduto,
    adicionarAoCarrinho,
    removerDoCarrinho,
    atualizarQuantidadeCarrinho,
    definirVisualizacao,
    definirEndereco,
    definirFrete,
    obterTotalCarrinho,
    obterQuantidadeItensCarrinho,
    obterPesoTotalCarrinho
  } = useLoja();

  const renderizarVisualizacaoAtual = () => {
    switch (visualizacaoAtual) {
      case 'loja':
        return <Loja produtos={produtos} onAdicionarAoCarrinho={adicionarAoCarrinho} />;
      case 'admin':
        return (
          <PainelAdmin
            produtos={produtos}
            onAdicionarProduto={adicionarProduto}
            onAtualizarProduto={atualizarProduto}
            onExcluirProduto={excluirProduto}
          />
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
          />
        );
      default:
        return <Loja produtos={produtos} onAdicionarAoCarrinho={adicionarAoCarrinho} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        visualizacaoAtual={visualizacaoAtual}
        onMudarVisualizacao={definirVisualizacao}
        quantidadeItensCarrinho={obterQuantidadeItensCarrinho()}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderizarVisualizacaoAtual()}
      </main>
      
      <BotaoWhatsApp />
    </div>
  );
}

export default App;