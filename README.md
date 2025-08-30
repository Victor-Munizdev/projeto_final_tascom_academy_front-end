# 📚 Sistema de Portfólios

Um sistema completo para gerenciamento de portfólios profissionais, desenvolvido com Next.js, React, TypeScript e Supabase.

## ✨ Funcionalidades

### 🏠 **Página Inicial**
- Lista todos os portfólios cadastrados
- Busca e filtragem por nome e habilidades
- Interface responsiva e moderna
- Cards com preview das informações

### ➕ **Criar Portfólio**
- Formulário completo para cadastro
- Validação de campos obrigatórios
- Interface intuitiva e amigável
- Upload de informações profissionais

### 👁️ **Visualizar Portfólio**
- Página detalhada com todas as informações
- Layout organizado por seções
- Exibição de habilidades em tags
- Informações de contato destacadas

### ✏️ **Editar Portfólio**
- Formulário de edição pré-preenchido
- Validação em tempo real
- Interface consistente com criação
- Navegação intuitiva

### 🗑️ **Excluir Portfólio**
- Confirmação antes da exclusão
- Feedback visual para o usuário
- Atualização automática da lista

### 📚 **Documentação da API**
- Interface Swagger completa
- Teste de endpoints integrado
- Documentação automática
- Design moderno e responsivo

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes
- **Banco de Dados**: Supabase (PostgreSQL)
- **Estilização**: CSS Modules + CSS Custom Properties
- **Documentação**: Swagger/OpenAPI
- **Roteamento**: React Router DOM

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ (recomendado 20+)
- npm ou yarn
- Conta no Supabase

### Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd ProjetoFinal-front-end
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o Supabase**
   - Crie um projeto no [Supabase](https://supabase.com)
   - Configure as variáveis de ambiente no arquivo `lib/supabase.ts`
   - Crie a tabela `portfolios` com a estrutura adequada

4. **Execute o projeto**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**
   - Frontend: http://localhost:3000
   - API Docs: http://localhost:3000/api-docs

## 📋 Estrutura do Projeto

```
├── pages/
│   ├── api/                 # API Routes
│   │   ├── portfolios/      # Endpoints de portfólios
│   │   └── swagger.ts       # Documentação da API
│   ├── _app.tsx            # Configuração do Next.js
│   ├── index.tsx           # Página inicial
│   └── api-docs.tsx        # Documentação da API
├── src/
│   ├── components/         # Componentes React
│   ├── pages/             # Páginas da aplicação
│   ├── styles/            # Estilos CSS
│   ├── utils/             # Utilitários
│   ├── App.tsx            # Componente principal
│   └── main.tsx           # Ponto de entrada
├── lib/
│   ├── supabase.ts        # Configuração do Supabase
│   └── init-supabase.ts   # Inicialização do banco
└── public/                # Arquivos estáticos
```

## 🔌 API Endpoints

### Portfólios
- `GET /api/portfolios` - Lista todos os portfólios
- `POST /api/portfolios` - Cria um novo portfólio
- `GET /api/portfolios/[id]` - Busca um portfólio específico
- `PUT /api/portfolios/[id]` - Atualiza um portfólio
- `DELETE /api/portfolios/[id]` - Remove um portfólio

### Documentação
- `GET /api/swagger` - Especificação OpenAPI
- `GET /api-docs` - Interface da documentação

## 🎨 Interface

### Design System
- **Cores**: Gradientes modernos com roxo e azul
- **Tipografia**: Inter (Google Fonts)
- **Componentes**: Cards, botões, formulários
- **Responsividade**: Mobile-first design

### Componentes Principais
- **Header**: Navegação principal
- **PortfolioCard**: Card de preview do portfólio
- **PortfolioForm**: Formulário de criação/edição
- **PortfolioDetails**: Página de detalhes
- **SearchBar**: Busca e filtragem

## 🔧 Configuração do Banco

### Estrutura da Tabela `portfolios`

```sql
CREATE TABLE portfolios (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  skills TEXT NOT NULL,
  description TEXT,
  experience TEXT,
  education TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Políticas RLS (Row Level Security)

Para permitir operações públicas:

```sql
-- Permitir leitura pública
CREATE POLICY "Allow public read access" ON portfolios
FOR SELECT USING (true);

-- Permitir inserção pública
CREATE POLICY "Allow public insert" ON portfolios
FOR INSERT WITH CHECK (true);

-- Permitir atualização pública
CREATE POLICY "Allow public update" ON portfolios
FOR UPDATE USING (true);

-- Permitir exclusão pública
CREATE POLICY "Allow public delete" ON portfolios
FOR DELETE USING (true);
```

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- 📱 Dispositivos móveis
- 📱 Tablets
- 💻 Desktops
- 🖥️ Telas grandes

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas
- Netlify
- Railway
- Heroku
- AWS Amplify

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido como projeto final de curso.

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação da API
2. Consulte os logs do console
3. Abra uma issue no repositório

---

⭐ Se este projeto foi útil, considere dar uma estrela!
