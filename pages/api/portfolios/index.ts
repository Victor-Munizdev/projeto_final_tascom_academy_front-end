import { NextApiRequest, NextApiResponse } from 'next'
import { portfolioService } from '../../../src/services/portfolioService'
import { executeGuards, writeGuards, readGuards } from '../../../src/utils/guards'
import { CreatePortfolioDto, PortfolioFiltersDto } from '../../../src/types/dto'

/**
 * @swagger
 * /api/portfolios:
 *   get:
 *     summary: Lista todos os portfólios
 *     description: Retorna uma lista paginada de portfólios com filtros opcionais
 *     tags: [Portfolios]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Termo de busca para nome ou habilidades
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           maximum: 100
 *         description: Número de itens por página
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, created_at, skills]
 *           default: created_at
 *         description: Campo para ordenação
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Ordem da ordenação
 *     responses:
 *       200:
 *         description: Lista de portfólios retornada com sucesso
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
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Portfolio'
 *                     total:
 *                       type: integer
 *                       example: 25
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                 message:
 *                   type: string
 *                   example: "Portfólios buscados com sucesso"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *   post:
 *     summary: Cria um novo portfólio
 *     description: Cria um novo portfólio com validação completa dos dados
 *     tags: [Portfolios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - skills
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 description: Nome completo da pessoa
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email de contato
 *                 example: "joao@exemplo.com"
 *               phone:
 *                 type: string
 *                 description: Número de telefone (formato brasileiro)
 *                 example: "(11) 99999-9999"
 *               skills:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 500
 *                 description: Habilidades técnicas (separadas por vírgula)
 *                 example: "React, TypeScript, Node.js"
 *               description:
 *                 type: string
 *                 maxLength: 1000
 *                 description: Descrição profissional
 *                 example: "Desenvolvedor Full Stack com 5 anos de experiência"
 *               experience:
 *                 type: string
 *                 maxLength: 2000
 *                 description: Experiência profissional
 *                 example: "Desenvolvedor Senior na TechCorp"
 *               education:
 *                 type: string
 *                 maxLength: 1000
 *                 description: Formação acadêmica
 *                 example: "Bacharel em Ciência da Computação"
 *     responses:
 *       201:
 *         description: Portfólio criado com sucesso
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
 *                   example: "Portfólio criado com sucesso"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos fornecidos
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
 *                   example: "VALIDATION_ERROR"
 *                 message:
 *                   type: string
 *                   example: "Dados inválidos"
 *                 validationErrors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                       message:
 *                         type: string
 *                       value:
 *                         type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       500:
 *         description: Erro interno do servidor
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Executar guards baseados no método
    const guards = req.method === 'GET' ? readGuards : writeGuards
    const guardsPassed = await executeGuards(req, res, guards)
    
    if (!guardsPassed) {
      return
    }

    if (req.method === 'GET') {
      // Buscar portfólios com filtros
      const filters: PortfolioFiltersDto = {
        search: req.query.search as string,
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        sortBy: req.query.sortBy as 'name' | 'created_at' | 'skills',
        sortOrder: req.query.sortOrder as 'asc' | 'desc'
      }

      const result = await portfolioService.getAllPortfolios(filters)
      res.status(200).json(result)
    } else if (req.method === 'POST') {
      // Criar novo portfólio
      const portfolioData: CreatePortfolioDto = req.body
      const result = await portfolioService.createPortfolio(portfolioData)
      res.status(201).json(result)
    } else {
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).json({
        success: false,
        error: 'METHOD_NOT_ALLOWED',
        message: `Método ${req.method} não permitido`,
        timestamp: new Date().toISOString()
      })
    }
  } catch (error) {
    console.error('Erro na API de portfólios:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor'
    const statusCode = errorMessage.includes('não encontrado') ? 404 : 
                      errorMessage.includes('inválido') ? 400 : 500

    res.status(statusCode).json({
      success: false,
      error: statusCode === 404 ? 'NOT_FOUND' : 
             statusCode === 400 ? 'VALIDATION_ERROR' : 'INTERNAL_ERROR',
      message: errorMessage,
      timestamp: new Date().toISOString()
    })
  }
}
