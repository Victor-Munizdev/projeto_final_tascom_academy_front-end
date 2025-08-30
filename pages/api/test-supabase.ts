import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    // Testar conexão com Supabase
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .limit(1)

    if (error) {
      if (error.code === '42P01') {
        return res.status(200).json({ 
          status: 'error',
          message: 'Tabela portfolios não existe. Execute /api/init-db primeiro.',
          error: error.message
        })
      }
      return res.status(500).json({ 
        status: 'error',
        message: 'Erro na conexão com Supabase',
        error: error.message
      })
    }

    return res.status(200).json({ 
      status: 'success',
      message: 'Conexão com Supabase funcionando!',
      data: data,
      count: data?.length || 0
    })
  } catch (error) {
    console.error('Erro no teste:', error)
    res.status(500).json({ 
      status: 'error',
      message: 'Erro interno do servidor',
      error: error
    })
  }
}
