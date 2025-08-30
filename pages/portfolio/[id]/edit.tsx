
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Header from "../../../src/components/Header"
import { maskPhoneBR } from "../../../src/utils/maskPhoneBR"

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

export default function EditPortfolio() {
  const router = useRouter()
  const { id } = router.query as { id?: string }
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    description: '',
    experience: '',
    education: ''
  })

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        setLoading(true)
        const response = await fetch(`/api/portfolios/${id}`)
        if (!response.ok) {
          setError('Portfólio não encontrado')
          return
        }
        const result = await response.json()
        setPortfolio(result.data)
        setFormData({
          name: result.data.name || '',
          email: result.data.email || '',
          phone: result.data.phone || '',
          skills: result.data.skills || '',
          description: result.data.description || '',
          experience: result.data.experience || '',
          education: result.data.education || ''
        })
      } catch (error) {
        setError('Erro ao buscar portfólio')
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchPortfolio()
  }, [id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: name === 'phone' ? maskPhoneBR(value) : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.skills.trim()) {
      setError('Nome e habilidades são obrigatórios')
      return
    }
    try {
      setSaving(true)
      setError(null)
      const dataToSend = { ...formData, id: id ? Number(id) : undefined };
      const response = await fetch(`/api/portfolios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      })
      if (!response.ok) {
        const errorData = await response.json()
        let errorMsg = errorData.message || errorData.error || `HTTP error! status: ${response.status}`;
        if (errorData.validationErrors && Array.isArray(errorData.validationErrors)) {
          errorMsg += '\n' + errorData.validationErrors.map((v: any) => `- ${v.field}: ${v.message}`).join('\n');
        }
        throw new Error(errorMsg);
      }
      router.push(`/portfolio/${id}`)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao atualizar portfólio')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    router.push(`/portfolio/${id}`)
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="container">
          <div className="empty-state">
            <h3>Carregando portfólio...</h3>
          </div>
        </main>
      </>
    )
  }
  if (error && !portfolio) {
    return (
      <>
        <Header />
        <main className="container">
          <div className="error-message">
            <h3>Erro ao carregar portfólio</h3>
            <p>{error}</p>
            <button onClick={() => router.push('/')} className="btn-primary">Voltar ao Início</button>
          </div>
        </main>
      </>
    )
  }
  return (
    <>
      <Header />
      <main className="container">
        <div className="portfolio-form" style={{ maxWidth: 800, margin: '0 auto', marginTop: 32 }}>
          <div className="form-header" style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#4a5568', marginBottom: 8 }}>✏️ Editar Portfólio</h1>
            <button onClick={handleCancel} className="btn-outline" style={{ float: 'right', marginTop: 8 }}>Cancelar</button>
          </div>
          {error && (
            <div style={{ padding: '15px', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px', color: '#721c24', marginBottom: '20px' }}>{error}</div>
          )}
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
            <div className="form-section">
              <label htmlFor="name">Nome Completo *</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-section">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="form-section">
              <label htmlFor="phone">Telefone</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} maxLength={15} />
            </div>
            <div className="form-section">
              <label htmlFor="skills">Habilidades Técnicas *</label>
              <input type="text" id="skills" name="skills" value={formData.skills} onChange={handleInputChange} required placeholder="Ex: React, TypeScript, Node.js" />
            </div>
            <div className="form-section">
              <label htmlFor="description">Descrição Profissional</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={4} placeholder="Descreva sua experiência profissional..." />
            </div>
            <div className="form-section">
              <label htmlFor="experience">Experiência Profissional</label>
              <textarea id="experience" name="experience" value={formData.experience} onChange={handleInputChange} rows={3} placeholder="Descreva suas experiências profissionais..." />
            </div>
            <div className="form-section">
              <label htmlFor="education">Formação Acadêmica</label>
              <textarea id="education" name="education" value={formData.education} onChange={handleInputChange} rows={3} placeholder="Descreva sua formação acadêmica..." />
            </div>
            <div className="form-actions">
              <button type="button" onClick={handleCancel} disabled={saving} className="btn-outline">Cancelar</button>
              <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Salvando...' : 'Salvar Alterações'}</button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
