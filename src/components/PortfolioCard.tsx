import { Link } from "react-router-dom"

interface Portfolio {
  id: string
  name: string
  skills: string
  email?: string
  description?: string
}

interface PortfolioCardProps {
  portfolio: Portfolio
  onDelete: (id: string) => void
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
    <div className="card">
      <div className="card-header">
        <h2>{portfolio.name}</h2>
        {portfolio.email && <p className="email">📧 {portfolio.email}</p>}
      </div>

      <div className="card-content">
        <DescriptionPreview description={portfolio.description} />

        <div className="skills-section">
          <strong>Habilidades:</strong>
          <SkillTags skills={portfolio.skills} />
        </div>
      </div>

      <div className="card-actions">
        <Link to={`/portfolio/${portfolio.id}`} className="btn-outline">
          Ver detalhes
        </Link>
        <button
          onClick={() => onDelete(portfolio.id)}
          className="btn-danger"
          title="Excluir portfólio"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}
