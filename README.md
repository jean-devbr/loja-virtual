# 🛍️ MegaStore - Loja Virtual Brasileira

Uma loja virtual moderna e completa desenvolvida em React + TypeScript, com design responsivo e funcionalidades avançadas para e-commerce.

![MegaStore](https://img.shields.io/badge/MegaStore-Loja%20Virtual-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🚀 Funcionalidades

### 🏪 **Loja Virtual**
- ✅ Catálogo de produtos com filtros avançados
- ✅ Pesquisa em tempo real
- ✅ Ordenação por preço e nome
- ✅ Cards de produtos com design premium
- ✅ Sistema de avaliações (4.8⭐)
- ✅ Indicadores de estoque baixo
- ✅ Design responsivo para todos os dispositivos

### 🛒 **Carrinho de Compras**
- ✅ Adicionar/remover produtos
- ✅ Controle de quantidade
- ✅ Cálculo automático de totais
- ✅ Persistência no localStorage
- ✅ Indicador visual de itens no carrinho

### 📦 **Sistema de Frete**
- ✅ Integração com API ViaCEP
- ✅ Cálculo automático de frete (PAC, SEDEX, SEDEX 10)
- ✅ Busca de endereço por CEP
- ✅ Múltiplas opções de entrega
- ✅ Cálculo baseado em peso e dimensões

### 💳 **Checkout Completo**
- ✅ Formulário de dados do cliente
- ✅ Validação de CPF e telefone
- ✅ Preenchimento automático de endereço
- ✅ Pagamento via PIX com QR Code
- ✅ Simulação de pagamento
- ✅ Integração com WhatsApp para finalização

### 🔐 **Painel Administrativo**
- ✅ Login seguro (admin/admin123)
- ✅ CRUD completo de produtos
- ✅ Upload de imagens com validações
- ✅ Dashboard com estatísticas
- ✅ Controle de estoque
- ✅ Interface profissional

### 📱 **Integração WhatsApp**
- ✅ Botão flutuante para contato
- ✅ Finalização de pedidos via WhatsApp
- ✅ Mensagens formatadas automaticamente
- ✅ Número: (21) 98936-5166

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **React 18.3.1** - Biblioteca JavaScript para interfaces
- **TypeScript 5.5.3** - Superset tipado do JavaScript
- **Tailwind CSS 3.4.1** - Framework CSS utilitário
- **Vite 5.4.2** - Build tool moderna e rápida

### **Ícones e UI**
- **Lucide React 0.344.0** - Biblioteca de ícones moderna
- **Design System** customizado com Tailwind

### **APIs e Serviços**
- **ViaCEP** - Busca de endereços por CEP
- **WhatsApp Business API** - Integração para pedidos
- **LocalStorage** - Persistência de dados local

## 📋 Pré-requisitos

- **Node.js** 18+ 
- **npm** ou **yarn**
- Navegador moderno com suporte a ES2020+

## 🚀 Instalação e Execução

### 1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/megastore.git
cd megastore
```

### 2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

### 3. **Execute o projeto**
```bash
npm run dev
# ou
yarn dev
```

### 4. **Acesse no navegador**
```
http://localhost:5173
```

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── BotaoWhatsApp.tsx    # Botão flutuante WhatsApp
│   ├── Carrinho.tsx         # Carrinho de compras
│   ├── CartaoProduto.tsx    # Card do produto
│   ├── CheckoutQRCode.tsx   # Checkout com QR Code
│   ├── Header.tsx           # Cabeçalho da aplicação
│   ├── LoginAdmin.tsx       # Login administrativo
│   └── PainelAdmin.tsx      # Painel de administração
├── hooks/                # Custom Hooks
│   └── useLoja.ts           # Hook principal da loja
├── pages/                # Páginas da aplicação
│   └── Loja.tsx             # Página principal da loja
├── services/             # Serviços e APIs
│   └── freteService.ts      # Serviço de cálculo de frete
├── types/                # Definições TypeScript
│   └── index.ts             # Tipos da aplicação
└── App.tsx               # Componente principal
```

## 🎨 Design e UX

### **Paleta de Cores**
- **Primária**: Azul (#2563EB) e Roxo (#7C3AED)
- **Secundária**: Verde (#059669) para ações positivas
- **Neutros**: Escala de cinzas para textos e backgrounds
- **Alertas**: Vermelho (#DC2626) e Laranja (#EA580C)

### **Tipografia**
- **Sistema**: Font stack nativa do sistema
- **Pesos**: Regular (400), Semibold (600), Bold (700)
- **Hierarquia**: H1-H6 com escalas proporcionais

### **Componentes**
- **Cards**: Sombras suaves com hover effects
- **Botões**: Gradientes e estados interativos
- **Formulários**: Bordas arredondadas e focus states
- **Modais**: Backdrop blur e animações suaves

## 🔧 Configuração

### **Credenciais Admin**
```
Usuário: admin
Senha: admin123
```

### **WhatsApp**
```
Número: (21) 98936-5166
Formato API: 5521989365166
```

### **Upload de Imagens**
```
Formatos: JPG, PNG, WebP
Tamanho máximo: 5MB
Dimensões mínimas: 200x200px
Dimensões máximas: 2000x2000px
```

## 📱 Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid System**: CSS Grid e Flexbox para layouts flexíveis
- **Touch Friendly**: Botões e áreas de toque otimizadas

## 🔒 Segurança

- **Validação Frontend**: Todos os formulários são validados
- **Sanitização**: Dados limpos antes do processamento
- **LocalStorage**: Dados sensíveis não são armazenados
- **HTTPS Ready**: Preparado para produção segura

## 🚀 Deploy

### **Build para Produção**
```bash
npm run build
# ou
yarn build
```

### **Preview da Build**
```bash
npm run preview
# ou
yarn preview
```

### **Plataformas Recomendadas**
- **Vercel** - Deploy automático com Git
- **Netlify** - Hospedagem estática otimizada
- **GitHub Pages** - Gratuito para projetos open source

## 🤝 Contribuição

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Jean Costa**
- GitHub: [@jean-costa](https://github.com/jean-costa)
- LinkedIn: [Jean Costa](https://linkedin.com/in/jean-costa)

## 🙏 Agradecimentos

- **React Team** - Pela incrível biblioteca
- **Tailwind CSS** - Pelo framework CSS excepcional
- **Lucide** - Pelos ícones lindos e consistentes
- **ViaCEP** - Pela API gratuita de CEPs

---

<div align="center">

**⭐ Se este projeto te ajudou, deixe uma estrela! ⭐**

**Feito com ❤️ e muito ☕ por [Jean Costa](https://github.com/jean-costa)**

</div>