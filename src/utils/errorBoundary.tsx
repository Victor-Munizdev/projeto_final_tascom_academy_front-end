import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erro capturado pelo ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          color: '#e74c3c',
          maxWidth: '600px',
          margin: '50px auto',
          backgroundColor: '#fdf2f2',
          borderRadius: '8px',
          border: '1px solid #fecaca'
        }}>
          <h2>Algo deu errado</h2>
          <p>Ocorreu um erro inesperado na aplicação.</p>
          {this.state.error && (
            <details style={{ marginTop: '10px', textAlign: 'left' }}>
              <summary>Detalhes do erro</summary>
              <pre style={{ 
                backgroundColor: '#f3f4f6', 
                padding: '10px', 
                borderRadius: '4px',
                fontSize: '12px',
                overflow: 'auto'
              }}>
                {this.state.error.message}
              </pre>
            </details>
          )}
          <button 
            onClick={() => {
              this.setState({ hasError: false, error: undefined })
              window.location.reload()
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '15px'
            }}
          >
            Tentar novamente
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
