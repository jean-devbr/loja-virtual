# 🛍️ Projeto – Loja Virtual de Roupas

## 1 - Planejamento

### Modelo de serviço (SaaS)
O sistema será implantado como **Software as a Service (SaaS)**, acessível diretamente via navegador e aplicativos em diferentes dispositivos.  
Esse modelo facilita a escalabilidade, manutenção centralizada e atualização contínua sem necessidade de instalação local.

### Plataforma escolhida (Azure)
Será utilizada a **Microsoft Azure**, aproveitando seus recursos de hospedagem em nuvem, banco de dados gerenciados, serviços de identidade, monitoramento e escalabilidade automática.  
A escolha se deve à confiabilidade, segurança e grande conjunto de ferramentas integradas.

### Ambiente de acesso (Web Responsiva)
O sistema será acessível em **PCs, celulares e tablets**, garantindo responsividade.  
O design será adaptativo, oferecendo boa experiência ao usuário em qualquer dispositivo.

### Modelo de nuvem (Nuvem Pública)
O sistema será hospedado em **nuvem pública**, permitindo redução de custos com infraestrutura, escalabilidade sob demanda e maior flexibilidade para crescimento do negócio.

### Arquitetura escolhida (Microserviços)
O sistema será baseado em **arquitetura de microserviços**, onde cada módulo da loja (ex: catálogo de produtos, carrinho, pagamento, autenticação, envio de notificações) funcionará como um serviço independente.

**Vantagens:**  
- Escalabilidade independente por módulo  
- Maior resiliência  
- Facilidade de manutenção  
- Implantação contínua  

### Exemplo de Implementação
- **Frontend**: hospedado no Azure App Service (React/Angular).  
- **API Gateway**: controla acesso aos microserviços.  

**Microserviços**:  
- Autenticação e usuários
- Catálogo de produtos  
- Carrinho de compras  
- Pagamentos  
- Gestão de estoque e pedidos  

**Banco de Dados**: combinação de **SQL (transacional)** e **NoSQL (catálogo de produtos e histórico de acessos)**.  
**Armazenamento**: Azure Blob Storage para imagens de produtos.  
**Monitoramento**: Azure Monitor e Application Insights.  
"""