import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Header from "../src/components/Header"

interface Portfolio {
  id: number
  name: string
  email?: string
  phone?: string
  skills: string
  description?: string
  experience?: string
  education?: string
  created_at?: string
}


export default function PortfolioDetails() {
  const router = useRouter()
  const { id } = router.query as { id?: string }
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`/api/portfolios/${id}`)
        if (response.ok) {
          const result = await response.json()
          setPortfolio(result.data)
        } else {
          setError("Portfólio não encontrado")
        }
      } catch (err) {
        setError("Erro ao buscar portfólio.")
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchPortfolio()
  }, [id])

  if (loading) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>Carregando portfólio...</h3>
        </div>
      </div>
    )
  }
  if (error) {
    return (
      <div className="container">
        <div className="error-message">
          <h2>Erro</h2>
          <p>{error}</p>
          <a href="/" className="btn-primary">Voltar para início</a>
        </div>
      </div>
    )
  }
  if (!portfolio) {
    return (
      <div className="container">
        <div className="error-message">
          <h2>Portfólio não encontrado</h2>
          <p>O portfólio que você está procurando não existe.</p>
          <a href="/" className="btn-primary">Voltar para início</a>
        </div>
      </div>
    )
  }
  return (
    <div className="container">
      <div className="portfolio-details">
        <div className="portfolio-header">
          <h1>{portfolio.name}</h1>
          <div className="portfolio-actions">
            <a href={`/portfolio/${portfolio.id}/edit`} className="btn-outline">✏️ Editar</a>
          </div>
        </div>
        <div className="portfolio-content">
          <div className="portfolio-section">
            <h3>📧 Informações de Contato</h3>
            {portfolio.email && (<p><strong>Email:</strong> {portfolio.email}</p>)}
            {portfolio.phone && (<p><strong>Telefone:</strong> {portfolio.phone}</p>)}
          </div>
          <div className="portfolio-section">
            <h3>🛠️ Habilidades</h3>
            <div className="skills">
              {(portfolio.skills || "").split(",").map((skill, index) => (
                <span key={index} className="skill-tag">{skill.trim()}</span>
              ))}
            </div>
          </div>
          {portfolio.description && (
            <div className="portfolio-section">
              <h3>📝 Descrição Profissional</h3>
              <p>{portfolio.description}</p>
            </div>
          )}
          {portfolio.experience && (
            <div className="portfolio-section">
              <h3>💼 Experiência Profissional</h3>
              <div className="experience-text">
                {portfolio.experience.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          )}
          {portfolio.education && (
            <div className="portfolio-section">
              <h3>🎓 Formação Acadêmica</h3>
              <div className="education-text">
                {portfolio.education.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          )}
          {portfolio.created_at && (
            <div className="portfolio-section">
              <p className="created-date">
                <small>📅 Criado em: {new Date(portfolio.created_at).toLocaleDateString("pt-BR")}</small>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
