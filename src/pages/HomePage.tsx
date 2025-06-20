import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import HomeHeader from "../components/HomeHeader"
import SearchBar from "../components/SearchBar"
import PortfolioCard from "../components/PortfolioCard"

interface Portfolio {
  id: string
  name: string
  skills: string
  email?: string
  phone?: string
  description?: string
}

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])

  useEffect(() => {
    const storedPortfolios = JSON.parse(localStorage.getItem("portfolios") || "[]")
    setPortfolios(storedPortfolios)
  }, [])

  const filteredPortfolios = portfolios.filter((portfolio) => {
    const name = portfolio.name ?? ""
    const skills = portfolio.skills ?? ""

    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skills.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este portfólio?")) {
      const updatedPortfolios = portfolios.filter((p) => p.id !== id)
      localStorage.setItem("portfolios", JSON.stringify(updatedPortfolios))
      setPortfolios(updatedPortfolios)
    }
  }

  return (
    <div className="container">
      <HomeHeader />

      {portfolios.length > 0 && (
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      )}

      {portfolios.length === 0 ? (
        <div className="empty-state">
          <h3>Nenhum portfólio cadastrado</h3>
          <p>Comece criando seu primeiro portfólio</p>
          <Link to="/create" className="btn-primary">
            Criar Portfólio
          </Link>
        </div>
      ) : (
        <div className="portfolios-list">
          {filteredPortfolios.map((p) => (
            <PortfolioCard key={p.id} portfolio={p} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {filteredPortfolios.length === 0 && portfolios.length > 0 && searchTerm && (
        <div className="no-results">
          <p>Nenhum portfólio encontrado para "{searchTerm}"</p>
        </div>
      )}
    </div>
  )
}
