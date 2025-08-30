// Handler global para erros não capturados
export function setupGlobalErrorHandling() {
  // Capturar erros não tratados
  window.addEventListener('error', (event) => {
    console.error('Erro global capturado:', event.error)
    
    // Evitar que o erro seja exibido no console do navegador
    event.preventDefault()
    
    // Aqui você pode enviar o erro para um serviço de monitoramento
    // como Sentry, LogRocket, etc.
  })

  // Capturar promessas rejeitadas não tratadas
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Promessa rejeitada não tratada:', event.reason)
    
    // Evitar que o erro seja exibido no console do navegador
    event.preventDefault()
  })

  // Capturar erros de recursos (imagens, scripts, etc.)
  window.addEventListener('error', (event) => {
    if (event.target !== window) {
      console.warn('Erro ao carregar recurso:', event.target)
    }
  }, true)

  // Log de informações úteis para debug
  console.log('🔧 Sistema de tratamento de erros ativado')
}

// Função para limpar listeners quando necessário
export function cleanupGlobalErrorHandling() {
  // Em uma aplicação real, você removeria os event listeners aqui
  console.log('🧹 Limpeza do sistema de tratamento de erros')
}

// Função para reportar erros manualmente
export function reportError(error: Error, context?: string) {
  console.error(`Erro reportado${context ? ` em ${context}` : ''}:`, error)
  
  // Aqui você pode implementar o envio para um serviço de monitoramento
  // Exemplo: Sentry.captureException(error)
}
