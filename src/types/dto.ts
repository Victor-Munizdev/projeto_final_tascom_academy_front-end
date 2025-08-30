export interface CreatePortfolioDto {
  name: string
  email?: string
  phone?: string
  skills: string
  description?: string
  experience?: string
  education?: string
}

export interface UpdatePortfolioDto extends Partial<CreatePortfolioDto> {
  id: number
}

export interface PortfolioResponseDto {
  id: number
  name: string
  email?: string
  phone?: string
  skills: string
  description?: string
  experience?: string
  education?: string
  created_at: string
  updated_at?: string
}

export interface PortfolioListResponseDto {
  data: PortfolioResponseDto[]
  total: number
  page: number
  limit: number
}

export interface ApiResponseDto<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
  timestamp: string
}

export interface ValidationErrorDto {
  field: string
  message: string
  value?: any
}

export interface ApiErrorResponseDto {
  success: false
  error: string
  message: string
  validationErrors?: ValidationErrorDto[]
  timestamp: string
}

export interface PortfolioFiltersDto {
  search?: string
  skills?: string[]
  page?: number
  limit?: number
  sortBy?: 'name' | 'created_at' | 'skills'
  sortOrder?: 'asc' | 'desc'
}

export interface PortfolioStatsDto {
  total: number
  withEmail: number
  withPhone: number
  withDescription: number
  topSkills: Array<{
    skill: string
    count: number
  }>
  createdThisMonth: number
  createdThisYear: number
}
