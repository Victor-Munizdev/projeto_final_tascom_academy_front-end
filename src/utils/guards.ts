import { NextApiRequest, NextApiResponse } from 'next'
import { ApiErrorResponseDto, ApiResponseDto } from '../types/dto'

// Interface para funções de guard
export interface GuardFunction {
  (req: NextApiRequest, res: NextApiResponse): Promise<boolean>
}

// Interface para configuração de guard
export interface GuardConfig {
  name: string
  enabled: boolean
  function: GuardFunction
}

// Guard para validar método HTTP
export const methodGuard = (allowedMethods: string[]): GuardFunction => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<boolean> => {
    if (!allowedMethods.includes(req.method || '')) {
      const errorResponse: ApiErrorResponseDto = {
        success: false,
        error: 'METHOD_NOT_ALLOWED',
        message: `Método ${req.method} não permitido. Métodos permitidos: ${allowedMethods.join(', ')}`,
        timestamp: new Date().toISOString()
      }
      
      res.setHeader('Allow', allowedMethods)
      res.status(405).json(errorResponse)
      return false
    }
    return true
  }
}

// Guard para validar autenticação (simulado)
export const authGuard = (): GuardFunction => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<boolean> => {
    // Em uma aplicação real, você verificaria tokens JWT, sessões, etc.
    const apiKey = req.headers['x-api-key'] || req.headers['authorization']
    
    if (!apiKey) {
      const errorResponse: ApiErrorResponseDto = {
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Autenticação necessária',
        timestamp: new Date().toISOString()
      }
      
      res.status(401).json(errorResponse)
      return false
    }
    
    // Aqui você validaria o token/API key
    // Por enquanto, vamos aceitar qualquer valor
    return true
  }
}

// Guard para rate limiting (simulado)
export const rateLimitGuard = (maxRequests: number = 100, windowMs: number = 60000): GuardFunction => {
  const requests = new Map<string, { count: number; resetTime: number }>()
  
  return async (req: NextApiRequest, res: NextApiResponse): Promise<boolean> => {
    const clientId = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || 'unknown'
    const now = Date.now()
    
    const clientRequests = requests.get(clientId)
    
    if (!clientRequests || now > clientRequests.resetTime) {
      requests.set(clientId, { count: 1, resetTime: now + windowMs })
      return true
    }
    
    if (clientRequests.count >= maxRequests) {
      const errorResponse: ApiErrorResponseDto = {
        success: false,
        error: 'RATE_LIMIT_EXCEEDED',
        message: `Limite de ${maxRequests} requisições por minuto excedido`,
        timestamp: new Date().toISOString()
      }
      
      res.status(429).json(errorResponse)
      return false
    }
    
    clientRequests.count++
    return true
  }
}

// Guard para validação de CORS
export const corsGuard = (allowedOrigins: string[] = ['*']): GuardFunction => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<boolean> => {
    const origin = req.headers.origin
    
    if (allowedOrigins.includes('*') || (origin && allowedOrigins.includes(origin))) {
      res.setHeader('Access-Control-Allow-Origin', origin || '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key')
      
      if (req.method === 'OPTIONS') {
        res.status(200).end()
        return false
      }
      
      return true
    }
    
    const errorResponse: ApiErrorResponseDto = {
      success: false,
      error: 'CORS_ERROR',
      message: 'Origem não permitida',
      timestamp: new Date().toISOString()
    }
    
    res.status(403).json(errorResponse)
    return false
  }
}

// Guard para validação de conteúdo
export const contentTypeGuard = (allowedTypes: string[] = ['application/json']): GuardFunction => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<boolean> => {
    if (req.method === 'GET' || req.method === 'DELETE') {
      return true
    }
    
    const contentType = req.headers['content-type']
    
    if (!contentType || !allowedTypes.some(type => contentType.includes(type))) {
      const errorResponse: ApiErrorResponseDto = {
        success: false,
        error: 'INVALID_CONTENT_TYPE',
        message: `Content-Type deve ser: ${allowedTypes.join(', ')}`,
        timestamp: new Date().toISOString()
      }
      
      res.status(400).json(errorResponse)
      return false
    }
    
    return true
  }
}

// Guard para validação de tamanho do payload
export const payloadSizeGuard = (maxSize: number = 1024 * 1024): GuardFunction => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<boolean> => {
    const contentLength = parseInt(req.headers['content-length'] || '0')
    
    if (contentLength > maxSize) {
      const errorResponse: ApiErrorResponseDto = {
        success: false,
        error: 'PAYLOAD_TOO_LARGE',
        message: `Payload muito grande. Tamanho máximo: ${maxSize / 1024}KB`,
        timestamp: new Date().toISOString()
      }
      
      res.status(413).json(errorResponse)
      return false
    }
    
    return true
  }
}

// Função para executar múltiplos guards
export const executeGuards = async (
  req: NextApiRequest, 
  res: NextApiResponse, 
  guards: GuardFunction[]
): Promise<boolean> => {
  for (const guard of guards) {
    const passed = await guard(req, res)
    if (!passed) {
      return false
    }
  }
  return true
}

// Configurações padrão de guards
export const defaultGuards: GuardFunction[] = [
  corsGuard(),
  contentTypeGuard(),
  payloadSizeGuard(),
  rateLimitGuard()
]

// Guards específicos para diferentes tipos de operações
export const readGuards: GuardFunction[] = [
  methodGuard(['GET']),
  ...defaultGuards
]

export const writeGuards: GuardFunction[] = [
  methodGuard(['POST', 'PUT', 'DELETE']),
  ...defaultGuards
]

export const adminGuards: GuardFunction[] = [
  methodGuard(['GET', 'POST', 'PUT', 'DELETE']),
  authGuard(),
  ...defaultGuards
]
