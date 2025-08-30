import { useState, useEffect } from "react"
import { useRouter } from "next/router"

interface Portfolio {
  id: number
  name: string
  email?: string
  phone?: string
  skills: string
  description?: string
  experience?: string
  education?: string
  created_at: string
}

export default function EditPortfolio() {
  const router = useRouter();
  const { id } = router.query as { id?: string };
  
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
    const fetchPortfolio = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/portfolios/${id}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Portfólio não encontrado')
          } else {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
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
        console.error("Failed to fetch portfolio:", error)
        setError(error instanceof Error ? error.message : 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPortfolio()
    }
  }, [id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
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
      
      const response = await fetch(`/api/portfolios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const updatedPortfolio = await response.json()
      console.log('Portfólio atualizado:', updatedPortfolio)
      
      // Redirecionar para a página de detalhes do portfólio
  router.push(`/portfolio/${id}`)
    } catch (error) {
      console.error("Failed to update portfolio:", error)
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
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Carregando portfólio...</p>
        </div>
      </div>
    )
  }

  if (error && !portfolio) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
          <h3>Erro ao carregar portfólio</h3>
          <p>{error}</p>
          <button onClick={() => router.push('/')} className="btn-primary">
            Voltar ao Início
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>✏️ Editar Portfólio</h1>
          <button onClick={handleCancel} className="btn-secondary">
            Cancelar
          </button>
        </div>

        {error && (
          <div style={{ 
            padding: '15px', 
            backgroundColor: '#f8d7da', 
            border: '1px solid #f5c6cb', 
            borderRadius: '4px', 
            color: '#721c24', 
            marginBottom: '20px' 
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Nome Completo *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>

          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>

          <div>
            <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>

          <div>
            <label htmlFor="skills" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Habilidades Técnicas *
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              required
              placeholder="Ex: React, TypeScript, Node.js"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>

          <div>
            <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Descrição Profissional
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Descreva sua experiência profissional..."
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                resize: 'vertical'
              }}
            />
          </div>

          <div>
            <label htmlFor="experience" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Experiência Profissional
            </label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              rows={3}
              placeholder="Descreva suas experiências profissionais..."
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                resize: 'vertical'
              }}
            />
          </div>

          <div>
            <label htmlFor="education" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Formação Acadêmica
            </label>
            <textarea
              id="education"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              rows={3}
              placeholder="Descreva sua formação acadêmica..."
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="btn-secondary"
              style={{ padding: '12px 24px' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary"
              style={{ padding: '12px 24px' }}
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
