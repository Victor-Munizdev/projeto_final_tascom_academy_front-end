import { NextApiRequest, NextApiResponse } from 'next'
import { portfolioService } from '../../../src/services/portfolioService'


/**
 * @swagger
 * /api/portfolios/stats:
 *   get:
 *     summary: Busca estatísticas dos portfólios
 *     description: Retorna estatísticas detalhadas sobre os portfólios cadastrados
 *     tags: [Portfolios]
 *     responses:
 *       200:
 *         description: Estatísticas retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       description: Total de portfólios
 *                       example: 25
 *                     withEmail:
 *                       type: integer
 *                       description: Portfólios com email cadastrado
 *                       example: 20
 *                     withPhone:
 *                       type: integer
 *                       description: Portfólios com telefone cadastrado
 *                       example: 15
 *                     withDescription:
 *                       type: integer
 *                       description: Portfólios com descrição cadastrada
 *                       example: 18
 *                     topSkills:
 *                       type: array
 *                       description: Habilidades mais comuns
 *                       items:
 *                         type: object
 *                         properties:
 *                           skill:
 *                             type: string
 *                             example: "React"
 *                           count:
 *                             type: integer
 *                             example: 12
 *                     createdThisMonth:
 *                       type: integer
 *                       description: Portfólios criados este mês
 *                       example: 5
 *                     createdThisYear:
 *                       type: integer
 *                       description: Portfólios criados este ano
 *                       example: 15
 *                 message:
 *                   type: string
 *                   example: "Estatísticas buscadas com sucesso"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       500:
 *         description: Erro interno do servidor
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {


    if (req.method === 'GET') {
      // Buscar estatísticas
      const result = await portfolioService.getStats()
      res.status(200).json(result)
    } else {
      res.setHeader('Allow', ['GET'])
      res.status(405).json({
        success: false,
        error: 'METHOD_NOT_ALLOWED',
        message: `Método ${req.method} não permitido`,
        timestamp: new Date().toISOString()
      })
    }
  } catch (error) {
    console.error('Erro na API de estatísticas:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor'

    res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: errorMessage,
      timestamp: new Date().toISOString()
    })
  }
}
