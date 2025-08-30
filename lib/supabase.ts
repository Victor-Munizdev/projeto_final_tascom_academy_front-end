import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vixzmzxrpvtodhvwhuht.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpeHptenhycHZ0b2RodndodWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MTIzMTYsImV4cCI6MjA3MjA4ODMxNn0.rkmYBBPwA7OgWx0_YC4CRJt5iiJXHCx7lpXbEAMm5CQ'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Interface para o tipo Portfolio
export interface Portfolio {
  id: number
  name: string
  email?: string
  phone?: string
  skills: string
  description?: string
  experience?: string
  education?: string
  created_at: string
}
