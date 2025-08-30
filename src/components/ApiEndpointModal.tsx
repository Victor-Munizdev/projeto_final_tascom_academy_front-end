import React, { useState } from 'react';

// Função para destacar sintaxe JSON
function syntaxHighlightJson(json: any) {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, null, 2);
  }
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
  function (match: string) {
      let cls = 'number';
      if (/^".*":$/.test(match)) {
        cls = 'key';
      } else if (/^"/.test(match)) {
        cls = 'string';
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return `<span style='color: ${
        cls === 'key'
          ? '#ffb86c'
          : cls === 'string'
          ? '#50fa7b'
          : cls === 'number'
          ? '#bd93f9'
          : cls === 'boolean'
          ? '#f1fa8c'
          : cls === 'null'
          ? '#8be9fd'
          : '#fff'
      }'>${match}</span>`;
    }
  );
}

interface ApiEndpointModalProps {
  open: boolean;
  onClose: () => void;
  endpoint: {
    method: string;
    path: string;
    description: string;
    parameters?: any[];
    requestBody?: any;
  };
}

const ApiEndpointModal: React.FC<ApiEndpointModalProps> = ({ open, onClose, endpoint }) => {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState<any>({});

  if (!open) return null;

  // Customização para GET de portfólios: só busca por skills e experiência
  const isPortfolioGet =
    endpoint.method.toLowerCase() === 'get' && endpoint.path === '/api/portfolios';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleTest = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      let url = endpoint.path;

      // Substituir parâmetros de path
      if (endpoint.parameters) {
        endpoint.parameters.forEach((param) => {
          if (param.in === 'path') {
            url = url.replace(`{${param.name}}`, input[param.name] || '');
          }
        });
      }

      // Para GET de portfólios, só skills e experiencia
      if (isPortfolioGet) {
        const params = [];
        if (input.skills) params.push(`skills=${encodeURIComponent(input.skills)}`);
        if (input.experience) params.push(`experience=${encodeURIComponent(input.experience)}`);
        if (params.length > 0) {
          url += '?' + params.join('&');
        }
      }

      const options: RequestInit = { method: endpoint.method.toUpperCase() };
      if (endpoint.method.toUpperCase() !== 'GET' && endpoint.requestBody) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(input.body || {});
      }

      const res = await fetch(url, options);
      const data = await res.json();
      setResponse(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.4)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: 8,
          padding: '6vw 4vw',
          width: '100%',
          maxWidth: 480,
          boxSizing: 'border-box',
          boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <h2>Testar Endpoint</h2>
        <p>
          <b>{endpoint.method}</b> <code>{endpoint.path}</code>
        </p>
        <p>{endpoint.description}</p>

        {isPortfolioGet ? (
          <>
            <div style={{ marginBottom: 8 }}>
              <label>Skills: </label>
              <input
                name="skills"
                value={input.skills || ''}
                onChange={handleChange}
                placeholder="Ex: React, Node.js"
              />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>Experiência: </label>
              <input
                name="experience"
                value={input.experience || ''}
                onChange={handleChange}
                placeholder="Ex: 5 anos"
              />
            </div>
          </>
        ) : (
          <>
            {endpoint.parameters &&
              endpoint.parameters.map((param) => (
                <div key={param.name} style={{ marginBottom: 8 }}>
                  <label>
                    {param.name} ({param.in}):
                  </label>
                  <input
                    name={param.name}
                    value={input[param.name] || ''}
                    onChange={handleChange}
                  />
                </div>
              ))}

            {endpoint.requestBody && (
              <div style={{ marginBottom: 8 }}>
                <label>Body (JSON):</label>
                <textarea
                  name="body"
                  value={input.body || ''}
                  onChange={handleChange}
                  rows={4}
                  style={{ width: '100%' }}
                />
              </div>
            )}
          </>
        )}

        <button onClick={handleTest} disabled={loading} style={{ marginRight: 8 }}>
          Testar
        </button>
        <button onClick={onClose}>Fechar</button>

        {loading && <p>Testando...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {response && (
          <div style={{ marginTop: 16 }}>
            <h4>Resposta:</h4>
            <pre
              style={{
                background: '#222',
                color: '#fff',
                padding: 12,
                borderRadius: 6,
                fontSize: 14,
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                maxHeight: 300,
              }}
              dangerouslySetInnerHTML={{ __html: syntaxHighlightJson(response) }}
            ></pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiEndpointModal;
