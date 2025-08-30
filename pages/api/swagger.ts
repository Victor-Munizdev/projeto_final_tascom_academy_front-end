import { NextApiRequest, NextApiResponse } from 'next'
import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Portfólios - Supabase',
      version: '1.0.0',
      description: 'API para gerenciamento de portfólios profissionais com Supabase',
      contact: {
        name: 'Suporte',
        email: 'suporte@portfolio-api.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento'
      }
    ],
    components: {
      schemas: {
        Portfolio: {
          type: 'object',
          required: ['id', 'name', 'skills', 'created_at'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do portfólio (auto-incremento)'
            },
            name: {
              type: 'string',
              description: 'Nome completo da pessoa'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email de contato'
            },
            phone: {
              type: 'string',
              description: 'Número de telefone'
            },
            skills: {
              type: 'string',
              description: 'Habilidades técnicas (separadas por vírgula)'
            },
            description: {
              type: 'string',
              description: 'Descrição profissional'
            },
            experience: {
              type: 'string',
              description: 'Experiência profissional'
            },
            education: {
              type: 'string',
              description: 'Formação acadêmica'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do portfólio'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Portfolios',
        description: 'Operações relacionadas aos portfólios'
      }
    ]
  },
  apis: ['./pages/api/**/*.ts']
}

const specs = swaggerJsdoc(options)

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json')
  res.status(200).json(specs)
}
