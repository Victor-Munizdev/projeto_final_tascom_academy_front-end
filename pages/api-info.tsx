import Link from 'next/link'

export default function ApiInfo() {
  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>🚀 API de Portfólios</h1>
        <p>Back-end completo com Next.js e Swagger</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h2>📋 Endpoints da API</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}>• <strong>GET</strong> /api/portfolios - Lista todos</li>
            <li style={{ marginBottom: '10px' }}>• <strong>POST</strong> /api/portfolios - Cria novo</li>
            <li style={{ marginBottom: '10px' }}>• <strong>GET</strong> /api/portfolios/[id] - Busca específico</li>
            <li style={{ marginBottom: '10px' }}>• <strong>PUT</strong> /api/portfolios/[id] - Atualiza</li>
            <li style={{ marginBottom: '10px' }}>• <strong>DELETE</strong> /api/portfolios/[id] - Remove</li>
          </ul>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h2>📖 Documentação</h2>
          <div style={{ marginBottom: '15px' }}>
            <Link href="/api-docs" style={{ color: '#007bff', textDecoration: 'none' }}>
              📚 Interface Swagger UI
            </Link>
          </div>
          <div>
            <a href="/api/swagger" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>
              🔗 Especificação OpenAPI
            </a>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h3>🧪 Teste a API</h3>
        <p>Use ferramentas como Postman, Insomnia ou curl para testar os endpoints:</p>
        <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
{`# Listar portfólios
curl http://localhost:3000/api/portfolios

# Criar portfólio
curl -X POST http://localhost:3000/api/portfolios \\
  -H "Content-Type: application/json" \\
  -d '{"name": "João Silva", "skills": "JavaScript, React"}'`}
        </pre>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link href="/" style={{ color: '#007bff', textDecoration: 'none' }}>
          ← Voltar para a aplicação
        </Link>
      </div>
    </div>
  )
}
