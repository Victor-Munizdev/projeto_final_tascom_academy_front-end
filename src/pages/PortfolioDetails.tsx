import { useParams, Link, useNavigate } from "react-router-dom"

interface Portfolio {
  id: string
  name: string
  email?: string
  phone?: string
  skills: string
  description?: string
  experience?: string
  education?: string
  createdAt?: string
}

export default function PortfolioDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const portfolios: Portfolio[] = JSON.parse(localStorage.getItem("portfolios") || "[]")
  const portfolio = portfolios.find((p) => p.id === id)

  if (!portfolio) {
    return (
      <div className="container">
        <div className="error-message">
          <h2>Portfólio não encontrado</h2>
          <p>O portfólio que você está procurando não existe.</p>
          <Link to="/" className="btn-primary">
            Voltar para início
          </Link>
        </div>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir este portfólio? Esta ação não pode ser desfeita.")) {
      const updatedPortfolios = portfolios.filter((p) => p.id !== id)
      localStorage.setItem("portfolios", JSON.stringify(updatedPortfolios))
      navigate("/") // ← melhor do que usar window.location.href
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Data não disponível"
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <div className="container">
      <div className="details-header">
        <Link to="/" className="back-link">
          ← Voltar
        </Link>
        <div className="header-content">
          <h1>{portfolio.name}</h1>
          <p>Detalhes do portfólio</p>
        </div>
        <button onClick={handleDelete} className="btn-danger">
          Excluir
        </button>
      </div>

      <div className="portfolio-details">
        {/* Informações de Contato */}
        <div className="card contact-card">
          <h3>📞 Informações de Contato</h3>
          <div className="contact-info">
            {portfolio.email && (
              <div className="contact-item">
                <strong>Email:</strong>
                <a href={`mailto:${portfolio.email}`}>{portfolio.email}</a>
              </div>
            )}
            {portfolio.phone && (
              <div className="contact-item">
                <strong>Telefone:</strong>
                <a href={`tel:${portfolio.phone}`}>{portfolio.phone}</a>
              </div>
            )}
            <div className="contact-item">
              <strong>Cadastrado em:</strong>
              <span>{formatDate(portfolio.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Descrição */}
        {portfolio.description && (
          <div className="card">
            <h3>👤 Sobre</h3>
            <p className="description-text">{portfolio.description}</p>
          </div>
        )}

        {/* Habilidades */}
        <div className="card">
          <h3>🛠️ Habilidades</h3>
          <div className="skills-grid">
            {portfolio.skills.split(",").map((skill, index) => (
              <span key={index} className="skill-badge">
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Experiência */}
        {portfolio.experience && (
          <div className="card">
            <h3>💼 Experiência Profissional</h3>
            <p className="text-content">{portfolio.experience}</p>
          </div>
        )}

        {/* Educação */}
        {portfolio.education && (
          <div className="card">
            <h3>🎓 Formação Acadêmica</h3>
            <p className="text-content">{portfolio.education}</p>
          </div>
        )}

        <div className="details-actions">
          <Link to="/" className="btn-outline">
            ← Voltar para lista
          </Link>
        </div>
      </div>
    </div>
  )
}
