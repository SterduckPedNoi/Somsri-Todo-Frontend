export interface Category {
  id: number
  name: string
  created_at: string
  updated_at: string
  total_todos?: number
  completed_todos?: number
}

export interface Todo {
  id: number
  title: string
  is_completed: boolean
  category_id?: number | null
  created_at: string
  updated_at: string
}

export type TodoFilter = 'all' | 'active' | 'completed'
