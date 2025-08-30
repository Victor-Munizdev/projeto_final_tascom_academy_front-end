
interface Portfolio {
  id: number
  name: string
  skills: string
  email?: string
  description?: string
}

interface PortfolioCardProps {
  portfolio: Portfolio
  onDelete: (id: number) => void
}

function SkillTags({ skills }: { skills: string }) {
  const skillsArray = (skills ?? "").split(",")
  return (
    <div className="skills-tags">
      {skillsArray.slice(0, 4).map((skill, i) => (
        <span key={i} className="skill-tag">
          {skill.trim()}
        </span>
      ))}
      {skillsArray.length > 4 && (
        <span className="skill-tag more">+{skillsArray.length - 4}</span>
      )}
    </div>
  )
}

function DescriptionPreview({ description }: { description?: string }) {
  if (!description) return null
  const maxLength = 150
  const preview =
    description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description

  return <p className="description">{preview}</p>
}

export default function PortfolioCard({ portfolio, onDelete }: PortfolioCardProps) {
  return (
    <div className="card" style={{
      background: 'white',
      borderRadius: 16,
      boxShadow: '0 6px 32px rgba(102,126,234,0.10)',
      padding: '2.2rem 1.5rem 1.5rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 320,
      justifyContent: 'space-between',
      transition: 'box-shadow 0.2s',
    }}>
      <div className="card-header" style={{ marginBottom: 10 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: '#4a5568' }}>{portfolio.name}</h2>
        {portfolio.email && <p className="email" style={{ color: '#667eea', fontSize: 14, margin: 0 }}>📧 {portfolio.email}</p>}
      </div>

      <div className="card-content" style={{ flex: 1 }}>
        <DescriptionPreview description={portfolio.description} />

        <div className="skills-section" style={{ marginTop: 12 }}>
          <strong style={{ color: '#555', fontSize: 15 }}>Habilidades:</strong>
          <SkillTags skills={portfolio.skills} />
        </div>
      </div>

      <div className="card-actions" style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', alignItems: 'center', marginTop: 18 }}>
        <a href={`/portfolio/${portfolio.id}`} className="btn-outline" style={{ fontWeight: 600, fontSize: 15, padding: '8px 18px', borderRadius: 8 }}>
          Ver detalhes
        </a>
        <button
          onClick={() => onDelete(portfolio.id)}
          className="btn-danger"
          title="Excluir portfólio"
          style={{ fontSize: 18, borderRadius: 8, padding: '8px 16px' }}
        >
          🗑️
        </button>
      </div>
    </div>
  )
}
