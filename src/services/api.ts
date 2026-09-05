import type { Todo, Category, TodoFilter } from '../types/todo'

const getBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL
  if (envUrl) {
    const trimmed = String(envUrl).trim().replace(/\/+$/, '')
    return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`
  }
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return `http://${window.location.hostname}:3333/api`
  }
  return 'http://127.0.0.1:3333/api'
}

const API_BASE_URL = getBaseUrl()

class ApiService {
  public async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/health`, {
        headers: { 'Accept': 'application/json' },
      })
      return res.ok
    } catch {
      return false
    }
  }

  public async getCategories(): Promise<Category[]> {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      headers: { 'Accept': 'application/json' },
    })
    if (!res.ok) {
      throw new Error(`Failed to load categories (HTTP ${res.status})`)
    }
    const json = await res.json()
    return json.data || []
  }

  public async createCategory(name: string): Promise<Category> {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ name: name.trim() }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || `Failed to create category (HTTP ${res.status})`)
    }
    const json = await res.json()
    return json.data
  }

  public async updateCategory(id: number, name: string): Promise<Category> {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ name: name.trim() }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || `Failed to rename category (HTTP ${res.status})`)
    }
    const json = await res.json()
    return json.data
  }

  public async deleteCategory(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json' },
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || `Failed to delete category (HTTP ${res.status})`)
    }
  }

  public async getTodos(categoryId?: number, filter: TodoFilter = 'all'): Promise<Todo[]> {
    const params = new URLSearchParams()
    if (categoryId) params.append('category_id', String(categoryId))
    if (filter !== 'all') params.append('status', filter)

    const queryStr = params.toString() ? `?${params.toString()}` : ''
    const res = await fetch(`${API_BASE_URL}/todos${queryStr}`, {
      headers: { 'Accept': 'application/json' },
    })

    if (!res.ok) {
      throw new Error(`Failed to load todos (HTTP ${res.status})`)
    }

    const json = await res.json()
    return json.data || []
  }

  public async createTodo(title: string, categoryId?: number): Promise<Todo> {
    const res = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ 
        title: title.trim(),
        category_id: categoryId 
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || `Failed to create todo (HTTP ${res.status})`)
    }

    const json = await res.json()
    return json.data
  }

  public async toggleTodo(id: number): Promise<Todo> {
    const res = await fetch(`${API_BASE_URL}/todos/${id}/toggle`, {
      method: 'PATCH',
      headers: { 'Accept': 'application/json' },
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || `Failed to toggle todo (HTTP ${res.status})`)
    }

    const json = await res.json()
    return json.data
  }

  public async updateTodo(
    id: number, 
    data: { title?: string; is_completed?: boolean; category_id?: number }
  ): Promise<Todo> {
    const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || `Failed to update todo (HTTP ${res.status})`)
    }

    const json = await res.json()
    return json.data
  }

  public async deleteTodo(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json' },
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || `Failed to delete todo (HTTP ${res.status})`)
    }
  }
}

export const api = new ApiService()
