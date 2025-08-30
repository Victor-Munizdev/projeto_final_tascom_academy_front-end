import { NextApiRequest, NextApiResponse } from 'next'
import { initSupabase } from '../../lib/init-supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const result = await initSupabase()
    
    if (result.success) {
      res.status(200).json({ 
        message: 'Supabase inicializado com sucesso',
        note: 'Se a tabela não foi criada automaticamente, crie manualmente no Supabase Dashboard'
      })
    } else {
      res.status(500).json({ 
        error: 'Erro ao inicializar Supabase',
        details: result.error
      })
    }
  } catch (error) {
    console.error('Erro ao inicializar Supabase:', error)
    res.status(500).json({ error: 'Erro ao inicializar Supabase' })
  }
}
