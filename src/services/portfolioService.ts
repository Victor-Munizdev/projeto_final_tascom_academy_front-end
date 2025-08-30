import { supabase } from '../../lib/supabase'
import { 
  CreatePortfolioDto, 
  UpdatePortfolioDto, 
  PortfolioResponseDto, 
  PortfolioListResponseDto,
  PortfolioFiltersDto,
  PortfolioStatsDto,
  ApiResponseDto,
  ApiErrorResponseDto
} from '../types/dto'


export class PortfolioService {
  private static instance: PortfolioService

  private constructor() {}

  public static getInstance(): PortfolioService {
    if (!PortfolioService.instance) {
      PortfolioService.instance = new PortfolioService()
    }
    return PortfolioService.instance
  }

  // Criar resposta de sucesso padronizada
  private createSuccessResponse<T>(data: T, message?: string): ApiResponseDto<T> {
    return {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString()
    }
  }

  // Criar resposta de erro padronizada
  private createErrorResponse(error: string, message: string, validationErrors?: any[]): ApiErrorResponseDto {
    return {
      success: false,
      error,
      message,
      validationErrors,
      timestamp: new Date().toISOString()
    }
  }

  // Buscar todos os portfólios com filtros
  async getAllPortfolios(filters: PortfolioFiltersDto = {}): Promise<ApiResponseDto<PortfolioListResponseDto>> {
    try {
      let query = supabase
        .from('portfolios')
        .select('*', { count: 'exact' })

      // Aplicar filtros
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,skills.ilike.%${filters.search}%`)
      }

      if (filters.skills && filters.skills.length > 0) {
        const skillsFilter = filters.skills.map(skill => `skills.ilike.%${skill}%`).join(',')
        query = query.or(skillsFilter)
      }

      // Aplicar ordenação
      const sortBy = filters.sortBy || 'created_at'
      const sortOrder = filters.sortOrder || 'desc'
      query = query.order(sortBy, { ascending: sortOrder === 'asc' })

      // Aplicar paginação
      const page = filters.page || 1
      const limit = Math.min(filters.limit || 10, 100) 
      const from = (page - 1) * limit
      const to = from + limit - 1

      query = query.range(from, to)

      const { data, error, count } = await query

      if (error) {
        throw new Error(`Erro ao buscar portfólios: ${error.message}`)
      }

      const response: PortfolioListResponseDto = {
        data: data || [],
        total: count || 0,
        page,
        limit
      }

      return this.createSuccessResponse(response, 'Portifólios buscados com sucesso')
    } catch (error) {
      throw new Error(`Erro no serviço: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
    }
  }

  // Buscar portfólio por ID
  async getPortfolioById(id: number): Promise<ApiResponseDto<PortfolioResponseDto>> {
    try {


      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('Portfólio não encontrado')
        }
        throw new Error(`Erro ao buscar portfólio: ${error.message}`)
      }

      return this.createSuccessResponse(data, 'Portfólio encontrado com sucesso')
    } catch (error) {
      throw new Error(`Erro no serviço: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
    }
  }

  // Criar novo portfólio
  async createPortfolio(portfolioData: CreatePortfolioDto): Promise<ApiResponseDto<PortfolioResponseDto>> {
    try {
      // Sanitizar dados


      const { data, error } = await supabase
        .from('portfolios')
        .insert([portfolioData])
        .select()
        .single()

      if (error) {
        throw new Error(`Erro ao criar portfólio: ${error.message}`)
      }

      return this.createSuccessResponse(data, 'Portfólio criado com sucesso')
    } catch (error) {
      throw new Error(`Erro no serviço: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
    }
  }

  // Atualizar portfólio
  async updatePortfolio(id: number, portfolioData: Partial<CreatePortfolioDto>): Promise<ApiResponseDto<PortfolioResponseDto>> {
    try {


      // Sanitizar dados
  // Validações removidas

      // Verificar se o portfólio existe
      const existingPortfolio = await this.getPortfolioById(id)
      if (!existingPortfolio.success) {
        throw new Error('Portfólio não encontrado')
      }

      const { data, error } = await supabase
        .from('portfolios')
        .update(portfolioData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw new Error(`Erro ao atualizar portfólio: ${error.message}`)
      }

      return this.createSuccessResponse(data, 'Portfólio atualizado com sucesso')
    } catch (error) {
      throw new Error(`Erro no serviço: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
    }
  }

  // Deletar portfólio
  async deletePortfolio(id: number): Promise<ApiResponseDto<{ message: string }>> {
    try {


      // Verificar se o portfólio existe
      const existingPortfolio = await this.getPortfolioById(id)
      if (!existingPortfolio.success) {
        throw new Error('Portfólio não encontrado')
      }

      const { error } = await supabase
        .from('portfolios')
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(`Erro ao deletar portfólio: ${error.message}`)
      }

      return this.createSuccessResponse(
        { message: 'Portfólio deletado com sucesso' },
        'Portfólio deletado com sucesso'
      )
    } catch (error) {
      throw new Error(`Erro no serviço: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
    }
  }

  // Buscar estatísticas
  async getStats(): Promise<ApiResponseDto<PortfolioStatsDto>> {
    try {
      // Buscar total de portfólios
      const { count: total } = await supabase
        .from('portfolios')
        .select('*', { count: 'exact', head: true })

      // Buscar portfólios com email
      const { count: withEmail } = await supabase
        .from('portfolios')
        .select('email', { count: 'exact', head: true })
        .not('email', 'is', null)

      // Buscar portfólios com telefone
      const { count: withPhone } = await supabase
        .from('portfolios')
        .select('phone', { count: 'exact', head: true })
        .not('phone', 'is', null)

      // Buscar portfólios com descrição
      const { count: withDescription } = await supabase
        .from('portfolios')
        .select('description', { count: 'exact', head: true })
        .not('description', 'is', null)

      // Buscar portfólios criados este mês
      const startOfMonth = new Date()
      startOfMonth.setDate(1)
      startOfMonth.setHours(0, 0, 0, 0)

      const { count: createdThisMonth } = await supabase
        .from('portfolios')
        .select('created_at', { count: 'exact', head: true })
        .gte('created_at', startOfMonth.toISOString())

      // Buscar portfólios criados este ano
      const startOfYear = new Date()
      startOfYear.setMonth(0, 1)
      startOfYear.setHours(0, 0, 0, 0)

      const { count: createdThisYear } = await supabase
        .from('portfolios')
        .select('created_at', { count: 'exact', head: true })
        .gte('created_at', startOfYear.toISOString())

      // Buscar habilidades mais comuns (simplificado)
      const { data: allPortfolios } = await supabase
        .from('portfolios')
        .select('skills')

      const skillsCount: { [key: string]: number } = {}
      allPortfolios?.forEach(portfolio => {
  const skills = portfolio.skills.split(',').map((s: string) => s.trim())
        skills.forEach((skill: string) => {
          skillsCount[skill] = (skillsCount[skill] || 0) + 1
        })
      })

      const topSkills = Object.entries(skillsCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([skill, count]) => ({ skill, count }))

      const stats: PortfolioStatsDto = {
        total: total || 0,
        withEmail: withEmail || 0,
        withPhone: withPhone || 0,
        withDescription: withDescription || 0,
        topSkills,
        createdThisMonth: createdThisMonth || 0,
        createdThisYear: createdThisYear || 0
      }

      return this.createSuccessResponse(stats, 'Estatísticas buscadas com sucesso')
    } catch (error) {
      throw new Error(`Erro no serviço: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
    }
  }
}

// Exportar instância singleton
export const portfolioService = PortfolioService.getInstance()
