import { NextApiRequest, NextApiResponse } from 'next'
import { portfolioService } from '../../../src/services/portfolioService'
import { CreatePortfolioDto } from '../../../src/types/dto'

/**
 * @swagger
 * /api/portfolios/{id}:
 *   get:
 *     summary: Busca um portfólio específico
 *     description: Retorna os dados de um portfólio pelo ID
 *     tags: [Portfolios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID do portfólio
 *     responses:
 *       200:
 *         description: Portfólio encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Portfolio'
 *                 message:
 *                   type: string
 *                   example: "Portfólio encontrado com sucesso"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Portfólio não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Portfólio não encontrado"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *   put:
 *     summary: Atualiza um portfólio
 *     description: Atualiza os dados de um portfólio existente com validação completa
 *     tags: [Portfolios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID do portfólio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 description: Nome completo da pessoa
 *                 example: "João Silva Atualizado"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email de contato
 *                 example: "joao.novo@exemplo.com"
 *               phone:
 *                 type: string
 *                 description: Número de telefone (formato brasileiro)
 *                 example: "(11) 88888-8888"
 *               skills:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 500
 *                 description: Habilidades técnicas (separadas por vírgula)
 *                 example: "React, TypeScript, Node.js, Python"
 *               description:
 *                 type: string
 *                 maxLength: 1000
 *                 description: Descrição profissional
 *                 example: "Desenvolvedor Full Stack com 6 anos de experiência"
 *               experience:
 *                 type: string
 *                 maxLength: 2000
 *                 description: Experiência profissional
 *                 example: "Tech Lead na StartupXYZ"
 *               education:
 *                 type: string
 *                 maxLength: 1000
 *                 description: Formação acadêmica
 *                 example: "Mestrado em Engenharia de Software"
 *     responses:
 *       200:
 *         description: Portfólio atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Portfolio'
 *                 message:
 *                   type: string
 *                   example: "Portfólio atualizado com sucesso"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos fornecidos
 *       404:
 *         description: Portfólio não encontrado
 *   delete:
 *     summary: Remove um portfólio
 *     description: Remove um portfólio pelo ID
 *     tags: [Portfolios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID do portfólio
 *     responses:
 *       200:
 *         description: Portfólio removido com sucesso
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
 *                     message:
 *                       type: string
 *                       example: "Portfólio deletado com sucesso"
 *                 message:
 *                   type: string
 *                   example: "Portfólio deletado com sucesso"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Portfólio não encontrado
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query
    const portfolioId = parseInt(id as string)

    if (isNaN(portfolioId) || portfolioId <= 0) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_ID',
        message: 'ID inválido',
        timestamp: new Date().toISOString()
      })
    }



    if (req.method === 'GET') {
      // Buscar portfólio por ID
      const result = await portfolioService.getPortfolioById(portfolioId)
      res.status(200).json(result)
    } else if (req.method === 'PUT') {
      // Atualizar portfólio
      const portfolioData: Partial<CreatePortfolioDto> = req.body
      const result = await portfolioService.updatePortfolio(portfolioId, portfolioData)
      res.status(200).json(result)
    } else if (req.method === 'DELETE') {
      // Deletar portfólio
      const result = await portfolioService.deletePortfolio(portfolioId)
      res.status(200).json(result)
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).json({
        success: false,
        error: 'METHOD_NOT_ALLOWED',
        message: `Método ${req.method} não permitido`,
        timestamp: new Date().toISOString()
      })
    }
  } catch (error) {
    console.error('Erro na API de portfólio por ID:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor'
    const statusCode = errorMessage.includes('não encontrado') ? 404 : 
                      errorMessage.includes('inválido') ? 400 : 500
    const validationErrors = (error as any).validationErrors || undefined;
    res.status(statusCode).json({
      success: false,
      error: statusCode === 404 ? 'NOT_FOUND' : 
             statusCode === 400 ? 'VALIDATION_ERROR' : 'INTERNAL_ERROR',
      message: errorMessage,
      validationErrors,
      timestamp: new Date().toISOString()
    })
  }
}
