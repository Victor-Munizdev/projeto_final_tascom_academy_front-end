import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface Portfolio {
  id: string
  name: string
  email?: string
  phone?: string
  skills: string
  description?: string
  experience?: string
  education?: string
  createdAt: string
}

export default function PortfolioForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [skills, setSkills] = useState("")
  const [description, setDescription] = useState("")
  const [experience, setExperience] = useState("")
  const [education, setEducation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !skills.trim()) {
      alert("Nome e habilidades são obrigatórios!")
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      const newPortfolio: Portfolio = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        skills: skills.trim(),
        description: description.trim() || undefined,
        experience: experience.trim() || undefined,
        education: education.trim() || undefined,
        createdAt: new Date().toISOString(),
      }

      const existing: Portfolio[] = JSON.parse(localStorage.getItem("portfolios") || "[]")
      const updatedPortfolios = [...existing, newPortfolio]
      localStorage.setItem("portfolios", JSON.stringify(updatedPortfolios))

      navigate("/")
    }, 800)
  }

  return (
    <div className="container">
      <div className="form-header">
        <h1>Novo Portfólio</h1>
        <p>Preencha as informações abaixo para criar seu portfólio</p>
      </div>

      <form onSubmit={handleSubmit} className="portfolio-form">
        <div className="form-section">
          <h3>Informações Pessoais</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nome *</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefone</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(11) 99999-9999"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Informações Profissionais</h3>

          <div className="form-group">
            <label htmlFor="description">Descrição Profissional</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva brevemente seu perfil profissional..."
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="skills">Habilidades *</label>
            <textarea
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Ex: JavaScript, React, Node.js, Python (separadas por vírgula)"
              required
              rows={3}
            />
            <small>Separe as habilidades por vírgula</small>
          </div>

          <div className="form-group">
            <label htmlFor="experience">Experiência Profissional</label>
            <textarea
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Descreva sua experiência profissional..."
              rows={5}
            />
          </div>

          <div className="form-group">
            <label htmlFor="education">Formação Acadêmica</label>
            <textarea
              id="education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="Descreva sua formação acadêmica..."
              rows={4}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate("/")} disabled={isSubmitting} className="btn-outline">
            Cancelar
          </button>
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  )
}
