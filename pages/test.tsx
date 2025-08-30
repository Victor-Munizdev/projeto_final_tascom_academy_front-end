export default function TestPage() {
  return (
    <div className="container">
      <div className="page-header">
        <h1>Teste da Interface</h1>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h2>Portfólio de Teste</h2>
          <p className="email">📧 teste@email.com</p>
        </div>
        
        <div className="card-content">
          <p className="description">Este é um portfólio de teste para verificar se a interface está funcionando corretamente.</p>
          
          <div className="skills-section">
            <strong>Habilidades:</strong>
            <div className="skills-tags">
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">React</span>
              <span className="skill-tag">TypeScript</span>
            </div>
          </div>
        </div>
        
        <div className="card-actions">
          <button className="btn-outline">Ver detalhes</button>
          <button className="btn-danger">🗑️</button>
        </div>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <button className="btn-primary">Botão Primário</button>
        <button className="btn-outline" style={{ marginLeft: '10px' }}>Botão Outline</button>
        <button className="btn-danger" style={{ marginLeft: '10px' }}>Botão Danger</button>
      </div>
    </div>
  )
}
