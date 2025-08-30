
import { useState } from "react"
import { useRouter } from "next/router"
import Header from "../src/components/Header"


export default function PortfolioForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [skills, setSkills] = useState("")
  const [description, setDescription] = useState("")
  const [experience, setExperience] = useState("")
  const [education, setEducation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean)
    if (!name.trim() || skillsArray.length === 0) {
      alert("Nome e pelo menos uma habilidade são obrigatórios!")
      return
    }
    setIsSubmitting(true)
    let formattedPhone = phone.trim()
    if (formattedPhone.length === 11 && /^\d{11}$/.test(formattedPhone)) {
      formattedPhone = formattedPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    } else if (formattedPhone.length === 10 && /^\d{10}$/.test(formattedPhone)) {
      formattedPhone = formattedPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    }
    const portfolioData = {
      name: name.trim(),
      email: email.trim() || undefined,
      phone: formattedPhone || undefined,
      skills: skills.trim(),
      description: description.trim() || undefined,
      experience: experience.trim() || undefined,
      education: education.trim() || undefined,
    }
    try {
      const response = await fetch("/api/portfolios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(portfolioData),
      })
      if (!response.ok) throw new Error("Falha ao criar o portfólio")
      router.push("/")
    } catch (error) {
      alert("Ocorreu um erro ao salvar o portfólio. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <>
      <Header />
      <div className="container">
        <div className="form-header">
          <h1 style={{ color: '#18181b' }}>Novo Portfólio</h1>
          <p style={{ color: '#23232b' }}>Preencha as informações abaixo para criar seu portfólio</p>
        </div>
        <form onSubmit={handleSubmit} className="portfolio-form">
          <div className="form-section">
            <h3>Informações Pessoais</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nome *</label>
                <input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome completo" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telefone</label>
              <input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(11) 99999-9999" maxLength={15} style={{ maxWidth: 220, padding: '8px' }} />
            </div>
          </div>
          <div className="form-section">
            <h3>Informações Profissionais</h3>
            <div className="form-group">
              <label htmlFor="description">Descrição Profissional</label>
              <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Descreva brevemente seu perfil profissional..." rows={4} />
            </div>
            <div className="form-group">
              <label htmlFor="skills">Habilidades *</label>
              <textarea id="skills" value={skills} onChange={e => setSkills(e.target.value)} placeholder="Ex: JavaScript, React, Node.js, Python (separadas por vírgula)" required rows={3} />
              <small>Separe as habilidades por vírgula</small>
            </div>
            <div className="form-group">
              <label htmlFor="experience">Experiência Profissional</label>
              <textarea id="experience" value={experience} onChange={e => setExperience(e.target.value)} placeholder="Descreva sua experiência profissional..." rows={5} />
            </div>
            <div className="form-group">
              <label htmlFor="education">Formação Acadêmica</label>
              <textarea id="education" value={education} onChange={e => setEducation(e.target.value)} placeholder="Descreva sua formação acadêmica..." rows={4} />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" onClick={() => router.push("/")} disabled={isSubmitting} className="btn-outline">Cancelar</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary">{isSubmitting ? "Salvando..." : "Salvar"}</button>
          </div>
        </form>
      </div>
    </>
  )
}
