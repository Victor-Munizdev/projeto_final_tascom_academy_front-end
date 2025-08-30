// Verificações de compatibilidade do navegador
export function checkBrowserCompatibility() {
  const issues: string[] = []
  
  // Verificar se o navegador suporta APIs modernas
  if (!window.fetch) {
    issues.push('Fetch API não suportada')
  }
  
  if (!window.localStorage) {
    issues.push('LocalStorage não suportado')
  }
  
  if (!window.IntersectionObserver) {
    issues.push('IntersectionObserver não suportado')
  }
  
  // Verificar versão do Node.js (se aplicável)
  if (typeof process !== 'undefined' && process.version) {
    const nodeVersion = process.version
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0])
    
    if (majorVersion < 20) {
      console.warn(`⚠️ Node.js ${nodeVersion} detectado. Recomenda-se Node.js 20+ para melhor compatibilidade com Supabase.`)
    }
  }
  
  return issues
}

// Função para detectar o navegador
export function detectBrowser() {
  const userAgent = navigator.userAgent
  
  if (userAgent.includes('Firefox')) {
    return 'Firefox'
  } else if (userAgent.includes('Chrome')) {
    return 'Chrome'
  } else if (userAgent.includes('Safari')) {
    return 'Safari'
  } else if (userAgent.includes('Edge')) {
    return 'Edge'
  } else {
    return 'Unknown'
  }
}

// Função para verificar se estamos em modo de desenvolvimento
export function isDevelopment() {
  return process.env.NODE_ENV === 'development'
}

// Função para configurar polyfills se necessário
export function setupPolyfills() {
  // Adicionar polyfills aqui se necessário
  if (!window.Promise) {
    console.warn('Promise não suportado - considere adicionar um polyfill')
  }
  
  if (!window.Array.prototype.find) {
    console.warn('Array.prototype.find não suportado - considere adicionar um polyfill')
  }
}

// Função para inicializar configurações do navegador
export function initializeBrowserConfig() {
  console.log(`🌐 Navegador detectado: ${detectBrowser()}`)
  console.log(`🔧 Modo: ${isDevelopment() ? 'Desenvolvimento' : 'Produção'}`)
  
  const compatibilityIssues = checkBrowserCompatibility()
  
  if (compatibilityIssues.length > 0) {
    console.warn('⚠️ Problemas de compatibilidade detectados:', compatibilityIssues)
  } else {
    console.log('✅ Navegador compatível')
  }
  
  setupPolyfills()
}
