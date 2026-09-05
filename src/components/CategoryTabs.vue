<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { Category } from '../types/todo'
import { soundService } from '../utils/sound'
import { Plus, Trash2, Edit3, Check, X } from 'lucide-vue-next'

const props = defineProps<{
  categories: Category[]
  activeCategoryId: number | null
}>()

const emit = defineEmits<{
  (e: 'selectCategory', id: number): void
  (e: 'createCategory', name: string): void
  (e: 'renameCategory', id: number, name: string): void
  (e: 'deleteCategory', id: number): void
}>()

const isCreating = ref(false)
const newCategoryName = ref('')
const newCatInput = ref<HTMLInputElement | null>(null)

const isEditing = ref(false)
const editCatName = ref('')
const editCatInput = ref<HTMLInputElement | null>(null)

const startCreating = () => {
  soundService.playKeyStroke(' ')
  isCreating.value = true
  newCategoryName.value = ''
  nextTick(() => {
    newCatInput.value?.focus()
  })
}

const cancelCreating = () => {
  isCreating.value = false
  newCategoryName.value = ''
}

const submitCreating = () => {
  const trimmed = newCategoryName.value.trim()
  if (trimmed) {
    soundService.playKeyStroke('Enter')
    emit('createCategory', trimmed)
    cancelCreating()
  }
}

const startEditing = (cat: Category) => {
  soundService.playKeyStroke(' ')
  editCatName.value = cat.name
  isEditing.value = true
  nextTick(() => {
    editCatInput.value?.focus()
    editCatInput.value?.select()
  })
}

const cancelEditing = () => {
  isEditing.value = false
  editCatName.value = ''
}

const submitEditing = (catId: number) => {
  const trimmed = editCatName.value.trim()
  if (trimmed) {
    soundService.playKeyStroke('Enter')
    emit('renameCategory', catId, trimmed)
    cancelEditing()
  }
}

const handleDelete = (catId: number) => {
  soundService.playTear()
  emit('deleteCategory', catId)
}
</script>

<template>
  <div class="category-tabs-container">
    <div class="tabs-scroll">
      <!-- Existing Category Tabs -->
      <div 
        v-for="cat in categories" 
        :key="cat.id" 
        class="category-tab-wrapper"
      >
        <!-- Normal Tab -->
        <template v-if="!isEditing || activeCategoryId !== cat.id">
          <button
            class="category-tab"
            :class="{ 'active': activeCategoryId === cat.id }"
            @click="emit('selectCategory', cat.id); soundService.playKeyStroke(' ')"
            type="button"
            :title="`Switch to ${cat.name}`"
          >
            <span class="bracket">[</span>
            <span class="tab-name">{{ cat.name }}</span>
            <span v-if="cat.total_todos !== undefined" class="tab-badge">
              {{ cat.total_todos }}
            </span>
            <span class="bracket">]</span>
          </button>

          <!-- Edit & Delete buttons on active category -->
          <div v-if="activeCategoryId === cat.id" class="active-cat-controls">
            <button 
              class="mini-btn" 
              @click.stop="startEditing(cat)" 
              title="Rename list"
              type="button"
            >
              <Edit3 :size="11" />
            </button>
            <button 
              v-if="categories.length > 1" 
              class="mini-btn danger" 
              @click.stop="handleDelete(cat.id)" 
              title="Delete list"
              type="button"
            >
              <Trash2 :size="11" />
            </button>
          </div>
        </template>

        <!-- Editing Active Tab Name -->
        <template v-else>
          <div class="edit-tab-box">
            <input
              ref="editCatInput"
              v-model="editCatName"
              type="text"
              class="edit-tab-input"
              @keydown.enter="submitEditing(cat.id)"
              @keydown.esc="cancelEditing"
              @keydown="(e) => soundService.playKeyStroke(e.key)"
              maxlength="40"
            />
            <button class="mini-btn check" @click="submitEditing(cat.id)" title="Save">
              <Check :size="12" />
            </button>
            <button class="mini-btn" @click="cancelEditing" title="Cancel">
              <X :size="12" />
            </button>
          </div>
        </template>
      </div>

      <!-- New List Button / Inline Input -->
      <div v-if="!isCreating" class="new-list-btn-wrapper">
        <button 
          class="category-tab new-btn" 
          @click="startCreating" 
          type="button"
          title="Create a new To Do list"
        >
          <Plus :size="12" />
          <span>NEW LIST</span>
        </button>
      </div>

      <!-- Inline Input for Creating New Category -->
      <div v-else class="new-cat-box">
        <span class="bracket">[</span>
        <input
          ref="newCatInput"
          v-model="newCategoryName"
          type="text"
          placeholder="LIST NAME..."
          class="new-cat-input"
          @keydown.enter="submitCreating"
          @keydown.esc="cancelCreating"
          @keydown="(e) => soundService.playKeyStroke(e.key)"
          maxlength="40"
        />
        <button class="mini-btn check" @click="submitCreating" title="Create">
          <Check :size="12" />
        </button>
        <button class="mini-btn" @click="cancelCreating" title="Cancel">
          <X :size="12" />
        </button>
        <span class="bracket">]</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-tabs-container {
  padding: 4px 10px 8px;
  user-select: none;
}

.tabs-scroll {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: thin;
}

.tabs-scroll::-webkit-scrollbar {
  height: 3px;
}

.tabs-scroll::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 2px;
}

.category-tab-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;
}

.category-tab {
  background: transparent;
  border: none;
  font-family: 'Courier Prime', 'Space Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  color: #666;
  cursor: pointer;
  padding: 3px 6px;
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.15s ease;
  outline: none;
}

.category-tab:hover {
  color: #111;
  background: rgba(0, 0, 0, 0.05);
}

.category-tab.active {
  color: #000;
  background: rgba(0, 0, 0, 0.08);
  box-shadow: inset 0 -1px 0 #000;
}

.category-tab.new-btn {
  border: 1px dashed rgba(0, 0, 0, 0.3);
  color: #444;
  font-size: 10px;
}

.category-tab.new-btn:hover {
  background: rgba(0, 0, 0, 0.06);
  border-color: #000;
}

.bracket {
  color: #555;
  font-weight: 700;
}

.tab-name {
  letter-spacing: 0.8px;
}

.tab-badge {
  font-size: 9px;
  background: rgba(0, 0, 0, 0.12);
  color: #333;
  padding: 0 4px;
  border-radius: 8px;
}

.active-cat-controls {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.mini-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 2px;
  color: #777;
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.mini-btn:hover {
  color: #111;
  background: rgba(0, 0, 0, 0.08);
}

.mini-btn.danger:hover {
  color: #dc2626;
  background: rgba(220, 38, 38, 0.1);
}

.mini-btn.check:hover {
  color: #16a34a;
}

.edit-tab-box, .new-cat-box {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px dashed #111;
  border-radius: 3px;
  padding: 2px 4px;
}

.edit-tab-input, .new-cat-input {
  border: none;
  background: transparent;
  font-family: 'Courier Prime', monospace;
  font-size: 11px;
  font-weight: 700;
  color: #111;
  outline: none;
  width: 100px;
  text-transform: uppercase;
}

.new-cat-input::placeholder {
  color: #999;
  font-style: italic;
  font-size: 10px;
}
</style>
