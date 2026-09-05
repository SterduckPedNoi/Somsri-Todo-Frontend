<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Todo, Category, TodoFilter } from './types/todo'
import { api } from './services/api'
import { soundService } from './utils/sound'
import ReceiptHeader from './components/ReceiptHeader.vue'
import ReceiptTodoItem from './components/ReceiptTodoItem.vue'
import ReceiptInput from './components/ReceiptInput.vue'
import ReceiptFooter from './components/ReceiptFooter.vue'
import SawtoothEdge from './components/SawtoothEdge.vue'
import ReceiptCategoryList from './components/ReceiptCategoryList.vue'
import { Volume2, VolumeX, RotateCw, Globe, CheckSquare, Triangle, Folder } from 'lucide-vue-next'

const currentView = ref<'list' | 'categories'>('categories')
const categories = ref<Category[]>([])
const activeCategoryId = ref<number | null>(null)
const todos = ref<Todo[]>([])
const isLoading = ref(true)
const isSyncing = ref(false)
const isConnected = ref(false)
const currentFilter = ref<TodoFilter>('all')
const errorMessage = ref<string | null>(null)
const isMuted = ref(soundService.isMuted())

const currentCategory = computed(() => {
  return categories.value.find((c) => c.id === activeCategoryId.value) || categories.value[0]
})

const currentCategoryName = computed(() => {
  if (currentView.value === 'categories') {
    return 'SELECT A LIST'
  }
  return currentCategory.value ? currentCategory.value.name : 'THE DAILY RUN'
})

const loadCategories = async () => {
  try {
    const cats = await api.getCategories()
    categories.value = cats
    if (cats.length > 0 && (!activeCategoryId.value || !cats.some((c) => c.id === activeCategoryId.value))) {
      activeCategoryId.value = cats[0].id
    }
  } catch (err: any) {
    console.error('Failed to load categories:', err)
  }
}

const loadInitialData = async () => {
  isSyncing.value = true
  errorMessage.value = null
  try {
    const isHealthy = await api.checkHealth()
    isConnected.value = isHealthy

    await loadCategories()
    isConnected.value = true
  } catch (err: any) {
    isConnected.value = false
    errorMessage.value = err.message || 'Cannot reach AdonisJS 5 Server'
  } finally {
    isLoading.value = false
    isSyncing.value = false
  }
}

const loadTodos = async () => {
  isSyncing.value = true
  errorMessage.value = null
  try {
    const isHealthy = await api.checkHealth()
    isConnected.value = isHealthy

    await loadCategories()

    if (activeCategoryId.value) {
      const data = await api.getTodos(activeCategoryId.value, 'all')
      todos.value = data
    }
    isConnected.value = true
  } catch (err: any) {
    isConnected.value = false
    errorMessage.value = err.message || 'Cannot reach AdonisJS 5 Server'
  } finally {
    isLoading.value = false
    isSyncing.value = false
  }
}

const handleSelectCategory = async (catId: number) => {
  soundService.playKeyStroke(' ')
  activeCategoryId.value = catId
  currentView.value = 'list'
  isSyncing.value = true
  try {
    const data = await api.getTodos(catId, 'all')
    todos.value = data
  } catch (err: any) {
    errorMessage.value = err.message || 'Failed to switch list'
  } finally {
    isSyncing.value = false
  }
}

const handleCreateCategory = async (name: string) => {
  isSyncing.value = true
  try {
    const newCat = await api.createCategory(name)
    categories.value.push(newCat)
    activeCategoryId.value = newCat.id
    todos.value = []
    currentView.value = 'list'
  } catch (err: any) {
    errorMessage.value = err.message || 'Failed to create list'
  } finally {
    isSyncing.value = false
  }
}

const handleRenameCategory = async (id: number, name: string) => {
  isSyncing.value = true
  try {
    const updated = await api.updateCategory(id, name)
    const target = categories.value.find((c) => c.id === id)
    if (target) target.name = updated.name
  } catch (err: any) {
    errorMessage.value = err.message || 'Failed to rename list'
  } finally {
    isSyncing.value = false
  }
}

const handleDeleteCategory = async (id: number) => {
  isSyncing.value = true
  try {
    await api.deleteCategory(id)
    categories.value = categories.value.filter((c) => c.id !== id)
    if (activeCategoryId.value === id && categories.value.length > 0) {
      activeCategoryId.value = categories.value[0].id
      await loadCategories()
    }
  } catch (err: any) {
    errorMessage.value = err.message || 'Failed to delete list'
  } finally {
    isSyncing.value = false
  }
}

const handleBackToLists = () => {
  currentView.value = 'categories'
  loadCategories()
}

const handleRefresh = async () => {
  if (currentView.value === 'categories') {
    await loadInitialData()
  } else {
    await loadTodos()
  }
}

const handleAddTodo = async (title: string) => {
  isSyncing.value = true
  errorMessage.value = null
  try {
    const newTodo = await api.createTodo(title, activeCategoryId.value || undefined)
    todos.value.push(newTodo)
    isConnected.value = true
    if (currentCategory.value && currentCategory.value.total_todos !== undefined) {
      currentCategory.value.total_todos++
    }
  } catch (err: any) {
    errorMessage.value = err.message || 'Failed to create todo item'
  } finally {
    isSyncing.value = false
  }
}

const handleToggleTodo = async (id: number) => {
  const target = todos.value.find((t) => t.id === id)
  if (!target) return

  const previousState = target.is_completed
  target.is_completed = !previousState

  if (target.is_completed) {
    soundService.playCheck()
  } else {
    soundService.playKeyStroke(' ')
  }

  isSyncing.value = true
  try {
    const updated = await api.toggleTodo(id)
    target.is_completed = updated.is_completed
    target.updated_at = updated.updated_at
  } catch (err: any) {
    target.is_completed = previousState
    errorMessage.value = err.message || 'Failed to update todo status'
  } finally {
    isSyncing.value = false
  }
}

const handleUpdateTodo = async (id: number, newTitle: string) => {
  const target = todos.value.find((t) => t.id === id)
  if (!target) return

  const oldTitle = target.title
  target.title = newTitle

  soundService.playKeyStroke('Enter')
  isSyncing.value = true
  try {
    const updated = await api.updateTodo(id, { title: newTitle })
    target.title = updated.title
    target.updated_at = updated.updated_at
  } catch (err: any) {
    target.title = oldTitle
    errorMessage.value = err.message || 'Failed to rename todo'
  } finally {
    isSyncing.value = false
  }
}

const handleDeleteTodo = async (id: number) => {
  soundService.playTear()
  const previousTodos = [...todos.value]
  todos.value = todos.value.filter((t) => t.id !== id)

  isSyncing.value = true
  try {
    await api.deleteTodo(id)
    if (currentCategory.value && currentCategory.value.total_todos !== undefined) {
      currentCategory.value.total_todos--
    }
  } catch (err: any) {
    todos.value = previousTodos
    errorMessage.value = err.message || 'Failed to delete todo'
  } finally {
    isSyncing.value = false
  }
}

const handleClearCompleted = async () => {
  const completed = todos.value.filter((t) => t.is_completed)
  if (completed.length === 0) return

  soundService.playTear()
  const previous = [...todos.value]
  todos.value = todos.value.filter((t) => !t.is_completed)

  isSyncing.value = true
  try {
    await Promise.all(completed.map((t) => api.deleteTodo(t.id)))
    if (currentCategory.value && currentCategory.value.total_todos !== undefined) {
      currentCategory.value.total_todos -= completed.length
    }
  } catch (err: any) {
    todos.value = previous
    errorMessage.value = err.message || 'Failed to clear completed items'
  } finally {
    isSyncing.value = false
  }
}

const filteredTodos = computed(() => {
  if (currentFilter.value === 'active') {
    return todos.value.filter((t) => !t.is_completed)
  }
  if (currentFilter.value === 'completed') {
    return todos.value.filter((t) => t.is_completed)
  }
  return todos.value
})

const totalCount = computed(() => todos.value.length)
const completedCount = computed(() => todos.value.filter((t) => t.is_completed).length)
const pendingCount = computed(() => todos.value.filter((t) => !t.is_completed).length)

const toggleSound = () => {
  isMuted.value = soundService.toggleMute()
}

let pollTimer: ReturnType<typeof setInterval> | null = null

const syncDataSilently = async () => {
  if (isSyncing.value || !isConnected.value) return

  try {
    if (currentView.value === 'list' && activeCategoryId.value) {
      const freshTodos = await api.getTodos(activeCategoryId.value, 'all')
      if (JSON.stringify(freshTodos) !== JSON.stringify(todos.value)) {
        todos.value = freshTodos
        await loadCategories()
      }
    } else if (currentView.value === 'categories') {
      const freshCats = await api.getCategories()
      if (JSON.stringify(freshCats) !== JSON.stringify(categories.value)) {
        categories.value = freshCats
      }
    }
  } catch {
  }
}

const handleVisibilityChange = () => {
  if (document.visibilityState === 'visible') {
    syncDataSilently()
  }
}

const handleWindowFocus = () => {
  syncDataSilently()
}

onMounted(() => {
  loadInitialData()
  pollTimer = setInterval(() => {
    if (document.visibilityState === 'visible') {
      syncDataSilently()
    }
  }, 1500)
  document.addEventListener('visibilitychange', handleVisibilityChange)
  window.addEventListener('focus', handleWindowFocus)
})

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  window.removeEventListener('focus', handleWindowFocus)
})
</script>

<template>
  <div class="app-viewport">
    <div class="control-bar">
      <div class="brand-badge">
        <CheckSquare :size="14" class="brand-icon" />
        <span>สมศรีมีเสื้อ · To Do Receipt</span>
      </div>

      <div class="control-actions">
        <button 
          v-if="currentView === 'list'"
          class="icon-btn"
          @click="handleBackToLists"
          title="Browse All Lists"
          type="button"
        >
          <Folder :size="12" />
          <span>ALL LISTS ({{ categories.length }})</span>
        </button>

        <button 
          class="icon-btn" 
          @click="handleRefresh" 
          :class="{ 'spinning': isSyncing }"
          title="Refresh from API Server"
          type="button"
        >
          <RotateCw :size="12" />
          <span>REFRESH</span>
        </button>

        <button 
          class="icon-btn" 
          @click="toggleSound" 
          :title="isMuted ? 'Unmute typing sounds' : 'Mute typing sounds'"
          type="button"
        >
          <VolumeX v-if="isMuted" :size="13" />
          <Volume2 v-else :size="13" />
        </button>
      </div>
    </div>

    <div v-if="errorMessage" class="toast-banner error">
      <span>⚠️ {{ errorMessage }}</span>
      <button class="toast-close" @click="errorMessage = null">✕</button>
    </div>

    <main class="receipt-wrapper">
      <SawtoothEdge position="top" />

      <div class="receipt-paper">
        <ReceiptHeader 
          :title="currentCategoryName"
          :is-detail-view="currentView === 'list'"
          :is-connected="isConnected" 
          :is-syncing="isSyncing" 
          @back="handleBackToLists"
        />

        <div v-if="isLoading" class="loading-indicator">
          <span>PRINTING RECEIPT...</span>
        </div>

        <template v-else-if="currentView === 'categories'">
          <ReceiptCategoryList
            :categories="categories"
            @select-category="handleSelectCategory"
            @create-category="handleCreateCategory"
            @rename-category="handleRenameCategory"
            @delete-category="handleDeleteCategory"
          />

          <ReceiptFooter
            variant="archive"
            :total-count="categories.length"
          />
        </template>

        <template v-else>
          <div class="todo-items-scroll-container">
            <div class="todo-items-list">
              <ReceiptTodoItem
                v-for="todo in filteredTodos"
                :key="todo.id"
                :todo="todo"
                @toggle="handleToggleTodo"
                @delete="handleDeleteTodo"
                @update="handleUpdateTodo"
              />

              <div v-if="filteredTodos.length === 0" class="empty-state">
                <template v-if="todos.length === 0">
                  [ empty list — add tasks below ]
                </template>
                <template v-else>
                  [ no {{ currentFilter }} tasks in this list ]
                </template>
              </div>
            </div>
          </div>

          <ReceiptInput @add="handleAddTodo" />

          <ReceiptFooter
            :total-count="totalCount"
            :completed-count="completedCount"
            :pending-count="pendingCount"
            :current-filter="currentFilter"
            @change-filter="(f) => currentFilter = f"
            @clear-completed="handleClearCompleted"
          />
        </template>
      </div>

      <SawtoothEdge position="bottom" />
    </main>

    <nav class="mobile-nav-bar" aria-label="Mobile Navigation">
      <div class="nav-tag">
        <CheckSquare :size="13" class="icon-symbol" />
        <span>Productivity</span>
      </div>
      <span class="dot">·</span>
      <div class="nav-tag">
        <span>สมศรีมีเสื้อ · To Do Receipt</span>
      </div>
      <span class="dot">·</span>
      <div class="nav-tag">
        <Triangle :size="13" class="icon-symbol" />
      </div>
      <span class="dot">·</span>
      <div class="nav-tag">
        <Globe :size="13" class="icon-symbol" />
      </div>
    </nav>
  </div>
</template>

<style scoped>
.app-viewport {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-items-scroll-container {
  max-height: 52vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 2px;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.todo-items-scroll-container::-webkit-scrollbar {
  width: 4px;
}

.todo-items-scroll-container::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
</style>
