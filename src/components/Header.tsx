

export default function Header() {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.2rem',
      background: 'rgba(255,255,255,0.97)',
      padding: '0.4rem 0',
      boxShadow: '0 2px 12px rgba(102,126,234,0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      fontFamily: 'Inter, sans-serif',
      fontSize: 17,
    }}>
  <a href="/" style={{ fontWeight: 700, color: '#4a5568', textDecoration: 'none', fontSize: '1.08rem', letterSpacing: 0.2 }}>Início</a>
      <span style={{ color: '#cbd5e0', fontSize: '1.08rem' }}>|</span>
  <a href="/PortfolioForm" style={{ fontWeight: 700, color: '#4a5568', textDecoration: 'none', fontSize: '1.08rem', letterSpacing: 0.2 }}>Novo Portfólio</a>
      <span style={{ color: '#cbd5e0', fontSize: '1.08rem' }}>|</span>
      <a href="/api-docs" target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 700, fontSize: '1.08rem', display: 'flex', alignItems: 'center', gap: '0.3rem', letterSpacing: 0.2 }}>
        <span role="img" aria-label="API Docs">📚</span> API Docs
      </a>
    </nav>
  )
}
