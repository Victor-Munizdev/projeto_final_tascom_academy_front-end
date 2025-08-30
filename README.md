
# � Sistema de Portfólios Profissionais

Um sistema completo, moderno e responsivo para criar, editar, visualizar e gerenciar portfólios profissionais. Desenvolvido com Next.js, React, TypeScript e Supabase.


## ✨ Funcionalidades Principais


- Listagem, busca e filtragem de portfólios
- Cadastro e edição com validação de dados
- Visualização detalhada e estilizada
- Exclusão com confirmação
- Documentação interativa da API (Swagger)
- Layout 100% responsivo (mobile, tablet, desktop)


## 🛠️ Tecnologias Utilizadas

- **Frontend:** Next.js 14, React 18, TypeScript
- **Backend:** Next.js API Routes
- **Banco de Dados:** Supabase (PostgreSQL)
- **Estilização:** CSS moderno e responsivo
- **Documentação:** Swagger/OpenAPI


## ▶️ Como rodar o projeto localmente


### Pré-requisitos
- Node.js 18+ (recomendado 20+)
- npm ou yarn
- Conta gratuita no Supabase


### Instalação e uso

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Victor-Munizdev/projeto_final_tascom_academy_front-end
   cd projeto_final_tascom_academy_front-end
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o Supabase:**
   - Crie um projeto no [Supabase](https://supabase.com)
   - No painel do Supabase, crie a tabela `portfolios` (veja estrutura abaixo)
   - Copie a URL e a chave anônima do Supabase e configure no arquivo `lib/supabase.ts`

4. **Execute o projeto:**
   ```bash
   npm run dev
   ```

5. **Acesse:**
   - Aplicação: http://localhost:3000
   - Documentação da API: http://localhost:3000/api-docs


## � Estrutura do Projeto

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
│   ├── styles/            # Estilos globais
│   ├── utils/             # Funções utilitárias
├── lib/
│   ├── supabase.ts        # Configuração do Supabase
│   └── init-supabase.ts   # Inicialização do banco
└── public/                # Arquivos estáticos
```


## 🔌 Endpoints da API

### Portfólios
- `GET /api/portfolios` - Lista todos os portfólios
- `POST /api/portfolios` - Cria um novo portfólio
- `GET /api/portfolios/[id]` - Busca um portfólio específico
- `PUT /api/portfolios/[id]` - Atualiza um portfólio
- `DELETE /api/portfolios/[id]` - Remove um portfólio

### Documentação
- `GET /api/swagger` - Especificação OpenAPI
- `GET /api-docs` - Interface da documentação


## 🎨 Interface & Design

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


## �️ Configuração do Banco (Supabase)

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


## 🤝 Como contribuir

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
