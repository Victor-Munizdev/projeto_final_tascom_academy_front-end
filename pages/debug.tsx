import { useState, useEffect } from 'react'

interface DebugResult {
  status: string
  message: string
  tableExists?: boolean
  totalRecords?: number
  sampleData?: any[]
  testDataInserted?: boolean
  error?: string
  solution?: string
}

export default function DebugPage() {
  const [debugResult, setDebugResult] = useState<DebugResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [portfolios, setPortfolios] = useState<any[]>([])

  const runDebug = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/debug-portfolios')
      const result = await response.json()
      setDebugResult(result)
      
      if (result.status === 'success' && result.sampleData) {
        setPortfolios(result.sampleData)
      }
    } catch (error) {
      setDebugResult({
        status: 'error',
        message: 'Erro ao executar debug',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchPortfolios = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/portfolios')
      const data = await response.json()
      setPortfolios(data)
      setDebugResult({
        status: 'success',
        message: `Portfólios carregados: ${data.length}`,
        totalRecords: data.length
      })
    } catch (error) {
      setDebugResult({
        status: 'error',
        message: 'Erro ao buscar portfólios',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    } finally {
      setLoading(false)
    }
  }

  const initDatabase = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/init-db', { method: 'POST' })
      const result = await response.json()
      setDebugResult({
        status: response.ok ? 'success' : 'error',
        message: result.message || result.error || 'Operação concluída'
      })
    } catch (error) {
      setDebugResult({
        status: 'error',
        message: 'Erro ao inicializar banco',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🔧 Debug - Sistema de Portfólios</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Ferramentas de Debug</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
            onClick={runDebug}
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Executando...' : '🔍 Executar Debug'}
          </button>
          
          <button 
            onClick={fetchPortfolios}
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            📋 Buscar Portfólios
          </button>
          
          <button 
            onClick={initDatabase}
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#e67e22',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            🗄️ Inicializar Banco
          </button>
        </div>
      </div>

      {debugResult && (
        <div style={{
          padding: '15px',
          backgroundColor: debugResult.status === 'success' ? '#d4edda' : '#f8d7da',
          border: `1px solid ${debugResult.status === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <h3 style={{ 
            color: debugResult.status === 'success' ? '#155724' : '#721c24',
            margin: '0 0 10px 0'
          }}>
            {debugResult.status === 'success' ? '✅' : '❌'} {debugResult.message}
          </h3>
          
          {debugResult.error && (
            <p style={{ color: '#721c24', margin: '5px 0' }}>
              <strong>Erro:</strong> {debugResult.error}
            </p>
          )}
          
          {debugResult.solution && (
            <p style={{ color: '#856404', margin: '5px 0' }}>
              <strong>Solução:</strong> {debugResult.solution}
            </p>
          )}
          
          {debugResult.totalRecords !== undefined && (
            <p style={{ margin: '5px 0' }}>
              <strong>Total de registros:</strong> {debugResult.totalRecords}
            </p>
          )}
          
          {debugResult.testDataInserted && (
            <p style={{ color: '#155724', margin: '5px 0' }}>
              ✅ Dados de teste foram inseridos automaticamente
            </p>
          )}
        </div>
      )}

      {portfolios.length > 0 && (
        <div>
          <h2>📋 Portfólios Encontrados ({portfolios.length})</h2>
          <div style={{ display: 'grid', gap: '15px' }}>
            {portfolios.map((portfolio, index) => (
              <div key={portfolio.id || index} style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: '#f9f9f9'
              }}>
                <h3 style={{ margin: '0 0 10px 0' }}>{portfolio.name}</h3>
                <p><strong>Email:</strong> {portfolio.email || 'Não informado'}</p>
                <p><strong>Telefone:</strong> {portfolio.phone || 'Não informado'}</p>
                <p><strong>Habilidades:</strong> {portfolio.skills}</p>
                {portfolio.description && (
                  <p><strong>Descrição:</strong> {portfolio.description}</p>
                )}
                <p style={{ fontSize: '12px', color: '#666' }}>
                  Criado em: {new Date(portfolio.created_at).toLocaleString('pt-BR')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h3>📝 Instruções</h3>
        <ol>
          <li>Clique em "Executar Debug" para verificar o status do banco de dados</li>
          <li>Se a tabela não existir, clique em "Inicializar Banco"</li>
          <li>Use "Buscar Portfólios" para testar a API de listagem</li>
          <li>Se não houver dados, o debug irá inserir dados de teste automaticamente</li>
        </ol>
      </div>
    </div>
  )
}
