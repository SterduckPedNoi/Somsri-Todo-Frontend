<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { Category } from '../types/todo'
import { soundService } from '../utils/sound'
import { Plus, Trash2, Edit2, Check, X, ArrowRight } from 'lucide-vue-next'

const props = defineProps<{
  categories: Category[]
}>()

const emit = defineEmits<{
  (e: 'selectCategory', id: number): void
  (e: 'createCategory', name: string): void
  (e: 'renameCategory', id: number, name: string): void
  (e: 'deleteCategory', id: number): void
}>()

const newListName = ref('')
const isSubmitting = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

const editingId = ref<number | null>(null)
const editName = ref('')
const editInputRef = ref<HTMLInputElement | null>(null)

const handleKeydown = (e: KeyboardEvent) => {
  soundService.playKeyStroke(e.key)
  if (e.key === 'Enter') {
    e.preventDefault()
    submitNewList()
  }
}

const submitNewList = () => {
  const trimmed = newListName.value.trim()
  if (!trimmed) return
  isSubmitting.value = true
  emit('createCategory', trimmed)
  newListName.value = ''
  isSubmitting.value = false
  inputRef.value?.focus()
}

const startEdit = (cat: Category) => {
  soundService.playKeyStroke(' ')
  editingId.value = cat.id
  editName.value = cat.name
  nextTick(() => {
    editInputRef.value?.focus()
    editInputRef.value?.select()
  })
}

const saveEdit = (id: number) => {
  const trimmed = editName.value.trim()
  if (trimmed) {
    emit('renameCategory', id, trimmed)
  }
  editingId.value = null
}

const cancelEdit = () => {
  editingId.value = null
}

const onEditKeydown = (e: KeyboardEvent, id: number) => {
  soundService.playKeyStroke(e.key)
  if (e.key === 'Enter') {
    saveEdit(id)
  } else if (e.key === 'Escape') {
    cancelEdit()
  }
}
</script>

<template>
  <div class="category-list-section">
    <div class="section-label">
      <span>[ SELECT A LIST TO OPEN OR ADD BELOW ]</span>
    </div>

    <div class="categories-scroll">
      <div 
        v-for="cat in categories" 
        :key="cat.id" 
        class="category-row"
      >
        <template v-if="editingId !== cat.id">
          <div class="cat-clickable" @click="emit('selectCategory', cat.id)">
            <span class="cat-bracket">[</span>
            <span class="cat-arrow">
              <ArrowRight :size="12" />
            </span>
            <span class="cat-bracket">]</span>

            <span class="cat-name">{{ cat.name }}</span>

            <span class="cat-count">
              ({{ cat.total_todos === 1 ? '1 item' : `${cat.total_todos ?? 0} items` }})
            </span>
          </div>

          <div class="cat-actions">
            <button 
              class="cat-action-btn edit" 
              @click.stop="startEdit(cat)" 
              title="Rename list"
              type="button"
            >
              <Edit2 :size="13" />
            </button>
            <button 
              v-if="categories.length > 1" 
              class="cat-action-btn delete" 
              @click.stop="emit('deleteCategory', cat.id)" 
              title="Delete list"
              type="button"
            >
              <Trash2 :size="13" />
            </button>
          </div>
        </template>

        <template v-else>
          <div class="edit-row">
            <input
              ref="editInputRef"
              v-model="editName"
              type="text"
              class="edit-input"
              @blur="saveEdit(cat.id)"
              @keydown="(e) => onEditKeydown(e, cat.id)"
              maxlength="40"
            />
            <button class="cat-action-btn check" @click.stop="saveEdit(cat.id)" title="Save">
              <Check :size="13" />
            </button>
            <button class="cat-action-btn cancel" @click.stop="cancelEdit" title="Cancel">
              <X :size="13" />
            </button>
          </div>
        </template>
      </div>
    </div>

    <div class="new-category-input-box">
      <div class="new-category-row">
        <span class="input-bracket">[+]</span>
        <input
          ref="inputRef"
          v-model="newListName"
          type="text"
          placeholder="create new list..."
          class="new-cat-field"
          @keydown="handleKeydown"
          maxlength="40"
          aria-label="New list title"
        />
        <button 
          class="add-list-btn" 
          @click="submitNewList"
          :disabled="!newListName.trim() || isSubmitting"
          type="button"
          title="Create list (Enter)"
        >
          <Plus :size="13" />
          <span>ADD LIST</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-list-section {
  padding: 4px 6px 14px;
}

.section-label {
  text-align: center;
  font-family: 'Courier Prime', 'Space Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  color: #666;
  letter-spacing: 1px;
  margin: 6px 0 12px;
}

.categories-scroll {
  max-height: 48vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 2px;
  scrollbar-width: thin;
}

.category-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border-radius: 4px;
  font-family: 'Courier Prime', 'Space Mono', monospace;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.15s ease;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.08);
}

.category-row:hover {
  background: rgba(0, 0, 0, 0.04);
}

.cat-clickable {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-grow: 1;
  min-width: 0;
}

.cat-bracket {
  color: #444;
  font-weight: 700;
}

.cat-arrow {
  display: inline-flex;
  align-items: center;
  color: #111;
}

.cat-name {
  font-weight: 700;
  color: #111;
  text-transform: uppercase;
  letter-spacing: 1px;
  word-break: break-word;
}

.cat-count {
  font-size: 12px;
  color: #666;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}

.cat-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.15s ease;
  flex-shrink: 0;
}

.category-row:hover .cat-actions {
  opacity: 1;
}

@media (hover: none) {
  .cat-actions {
    opacity: 0.75;
  }
}

.cat-action-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 3px;
  color: #666;
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.cat-action-btn:hover {
  background: rgba(0, 0, 0, 0.08);
  color: #111;
}

.cat-action-btn.delete:hover {
  color: #dc2626;
  background: rgba(220, 38, 38, 0.1);
}

.edit-row {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
}

.edit-input {
  flex-grow: 1;
  font-family: 'Courier Prime', monospace;
  font-size: 16px;
  font-weight: 700;
  border: 1px dashed #111;
  background: rgba(255, 255, 255, 0.8);
  padding: 4px 8px;
  border-radius: 3px;
  color: #111;
  outline: none;
  text-transform: uppercase;
}

.new-category-input-box {
  margin-top: 14px;
}

.new-category-row {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.025);
  border: 1px dashed rgba(0, 0, 0, 0.22);
  border-radius: 4px;
  padding: 6px 10px;
  transition: border-color 0.2s, background 0.2s;
}

.new-category-row:focus-within {
  background: rgba(255, 255, 255, 0.6);
  border-color: #111;
}

.input-bracket {
  font-family: 'Courier Prime', monospace;
  font-size: 14px;
  font-weight: 700;
  color: #555;
  flex-shrink: 0;
}

.new-cat-field {
  flex-grow: 1;
  min-width: 0;
  border: none;
  background: transparent;
  font-family: 'Courier Prime', monospace;
  font-size: 16px;
  color: #111;
  outline: none;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.new-cat-field::placeholder {
  color: #777;
  font-style: italic;
  text-transform: none;
}

.add-list-btn {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  background: #1a1a1a;
  color: #fff;
  border: none;
  padding: 4px 8px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.add-list-btn:hover:not(:disabled) {
  background: #000;
  transform: translateY(-1px);
}

.add-list-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
</style>
