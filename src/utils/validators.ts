import { CreatePortfolioDto, UpdatePortfolioDto, ValidationErrorDto } from '../types/dto'

// Validador para email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validador para telefone (formato brasileiro)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Validador para nome
export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 100
}

// Validador para habilidades
export const isValidSkills = (skills: string): boolean => {
  return skills.trim().length >= 3 && skills.trim().length <= 500
}

// Validador para descrição
export const isValidDescription = (description?: string): boolean => {
  if (!description) return true
  return description.trim().length <= 1000
}

// Validador para experiência
export const isValidExperience = (experience?: string): boolean => {
  if (!experience) return true
  return experience.trim().length <= 2000
}

// Validador para educação
export const isValidEducation = (education?: string): boolean => {
  if (!education) return true
  return education.trim().length <= 1000
}

// Validador principal para CreatePortfolioDto
export const validateCreatePortfolio = (data: CreatePortfolioDto): ValidationErrorDto[] => {
  const errors: ValidationErrorDto[] = []

  // Validar nome
  if (!data.name || !isValidName(data.name)) {
    errors.push({
      field: 'name',
      message: 'Nome deve ter entre 2 e 100 caracteres',
      value: data.name
    })
  }

  // Validar email se fornecido
  if (data.email && !isValidEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Email deve ter um formato válido',
      value: data.email
    })
  }

  // Validar telefone se fornecido
  if (data.phone && !isValidPhone(data.phone)) {
    errors.push({
      field: 'phone',
      message: 'Telefone deve ter um formato válido (ex: (11) 99999-9999)',
      value: data.phone
    })
  }

  // Validar habilidades
  if (!data.skills || !isValidSkills(data.skills)) {
    errors.push({
      field: 'skills',
      message: 'Habilidades devem ter entre 3 e 500 caracteres',
      value: data.skills
    })
  }

  // Validar descrição se fornecida
  if (data.description && !isValidDescription(data.description)) {
    errors.push({
      field: 'description',
      message: 'Descrição deve ter no máximo 1000 caracteres',
      value: data.description
    })
  }

  // Validar experiência se fornecida
  if (data.experience && !isValidExperience(data.experience)) {
    errors.push({
      field: 'experience',
      message: 'Experiência deve ter no máximo 2000 caracteres',
      value: data.experience
    })
  }

  // Validar educação se fornecida
  if (data.education && !isValidEducation(data.education)) {
    errors.push({
      field: 'education',
      message: 'Educação deve ter no máximo 1000 caracteres',
      value: data.education
    })
  }

  return errors
}

// Validador para UpdatePortfolioDto
export const validateUpdatePortfolio = (data: UpdatePortfolioDto): ValidationErrorDto[] => {
  const errors: ValidationErrorDto[] = []

  // Validar ID
  if (!data.id || data.id <= 0) {
    errors.push({
      field: 'id',
      message: 'ID deve ser um número positivo',
      value: data.id
    })
  }

  // Validar nome se fornecido
  if (data.name !== undefined && !isValidName(data.name)) {
    errors.push({
      field: 'name',
      message: 'Nome deve ter entre 2 e 100 caracteres',
      value: data.name
    })
  }

  // Validar email se fornecido
  if (data.email !== undefined && data.email && !isValidEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Email deve ter um formato válido',
      value: data.email
    })
  }

  // Validar telefone se fornecido
  if (data.phone !== undefined && data.phone && !isValidPhone(data.phone)) {
    errors.push({
      field: 'phone',
      message: 'Telefone deve ter um formato válido (ex: (11) 99999-9999)',
      value: data.phone
    })
  }

  // Validar habilidades se fornecidas
  if (data.skills !== undefined && !isValidSkills(data.skills)) {
    errors.push({
      field: 'skills',
      message: 'Habilidades devem ter entre 3 e 500 caracteres',
      value: data.skills
    })
  }

  // Validar descrição se fornecida
  if (data.description !== undefined && data.description && !isValidDescription(data.description)) {
    errors.push({
      field: 'description',
      message: 'Descrição deve ter no máximo 1000 caracteres',
      value: data.description
    })
  }

  // Validar experiência se fornecida
  if (data.experience !== undefined && data.experience && !isValidExperience(data.experience)) {
    errors.push({
      field: 'experience',
      message: 'Experiência deve ter no máximo 2000 caracteres',
      value: data.experience
    })
  }

  // Validar educação se fornecida
  if (data.education !== undefined && data.education && !isValidEducation(data.education)) {
    errors.push({
      field: 'education',
      message: 'Educação deve ter no máximo 1000 caracteres',
      value: data.education
    })
  }

  return errors
}

// Função para sanitizar dados
export const sanitizePortfolioData = (data: any): CreatePortfolioDto => {
  return {
    name: data.name?.trim() || '',
    email: data.email?.trim() || undefined,
    phone: data.phone?.trim() || undefined,
    skills: data.skills?.trim() || '',
    description: data.description?.trim() || undefined,
    experience: data.experience?.trim() || undefined,
    education: data.education?.trim() || undefined
  }
}

// Função para validar ID
export const isValidId = (id: any): boolean => {
  const numId = parseInt(id)
  return !isNaN(numId) && numId > 0
}
