
import React, { useState } from "react"
import ApiEndpointModal from "../src/components/ApiEndpointModal"
import Header from "../src/components/Header"

const endpoints = [
  {
    method: "GET",
    path: "/api/portfolios",
    description: "Lista todos os portfólios.",
    parameters: [],
  },
  {
    method: "GET",
    path: "/api/portfolios/{id}",
    description: "Busca um portfólio pelo ID.",
    parameters: [
      { name: "id", in: "path", description: "ID do portfólio" },
    ],
  },
  {
    method: "POST",
    path: "/api/portfolios",
    description: "Cria um novo portfólio.",
    requestBody: true,
  },
  {
    method: "PUT",
    path: "/api/portfolios/{id}",
    description: "Atualiza um portfólio existente.",
    parameters: [
      { name: "id", in: "path", description: "ID do portfólio" },
    ],
    requestBody: true,
  },
  {
    method: "DELETE",
    path: "/api/portfolios/{id}",
    description: "Remove um portfólio pelo ID.",
    parameters: [
      { name: "id", in: "path", description: "ID do portfólio" },
    ],
  },
]

export default function ApiDocs() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEndpoint, setSelectedEndpoint] = useState<any>(null)

  const openModal = (endpoint: any) => {
    setSelectedEndpoint(endpoint)
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
    setSelectedEndpoint(null)
  }

  return (
    <>
      <Header />
      <div className="container" style={{ maxWidth: 900, margin: "2rem auto" }}>
        <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 8 }}>API Docs Interativo</h1>
        <p style={{ color: 'white', marginBottom: 32 }}>Teste todos os endpoints da API de portfólios de forma prática e visual.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
          {endpoints.map((ep, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: 12,
              boxShadow: '0 4px 24px rgba(102,126,234,0.08)',
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              minHeight: 220,
              justifyContent: 'space-between',
            }}>
              <div>
                <span style={{
                  fontWeight: 700,
                  color: ep.method === 'GET' ? '#667eea' : ep.method === 'POST' ? '#38a169' : ep.method === 'PUT' ? '#d69e2e' : '#e53e3e',
                  fontSize: 15,
                  letterSpacing: 1,
                  marginRight: 8,
                }}>{ep.method}</span>
                <code style={{ fontSize: 15 }}>{ep.path}</code>
                <p style={{ margin: '10px 0 0 0', color: '#444', fontSize: 16 }}>{ep.description}</p>
                {ep.parameters && ep.parameters.length > 0 && (
                  <ul style={{ margin: '10px 0 0 0', paddingLeft: 18, color: '#555', fontSize: 14 }}>
                    {ep.parameters.map((param: any) => (
                      <li key={param.name}><b>{param.name}</b> <span style={{ color: '#888' }}>({param.in})</span>: {param.description}</li>
                    ))}
                  </ul>
                )}
                {ep.requestBody && (
                  <p style={{ margin: '10px 0 0 0', color: '#888', fontSize: 14 }}><b>Body:</b> JSON</p>
                )}
              </div>
              <button
                className="btn-primary"
                style={{ marginTop: 18, alignSelf: 'flex-end', fontWeight: 600, fontSize: 15, padding: '10px 22px', borderRadius: 8 }}
                onClick={() => openModal(ep)}
              >
                Testar endpoint
              </button>
            </div>
          ))}
        </div>

        {modalOpen && selectedEndpoint && (
          <ApiEndpointModal open={modalOpen} onClose={closeModal} endpoint={selectedEndpoint} />
        )}
      </div>
    </>
  )
}

