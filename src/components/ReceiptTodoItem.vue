<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { Todo } from '../types/todo'
import { soundService } from '../utils/sound'
import { Trash2, Edit2, Check, X } from 'lucide-vue-next'
import PenStrike from './PenStrike.vue'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'delete', id: number): void
  (e: 'update', id: number, newTitle: string): void
}>()

const isEditing = ref(false)
const editInput = ref<HTMLInputElement | null>(null)
const editTitle = ref(props.todo.title)

const startEdit = () => {
  soundService.playKeyStroke(' ')
  editTitle.value = props.todo.title
  isEditing.value = true
  nextTick(() => {
    editInput.value?.focus()
    editInput.value?.select()
  })
}

const saveEdit = () => {
  if (!isEditing.value) return
  const trimmed = editTitle.value.trim()
  if (trimmed && trimmed !== props.todo.title) {
    emit('update', props.todo.id, trimmed)
  }
  isEditing.value = false
}

const cancelEdit = () => {
  editTitle.value = props.todo.title
  isEditing.value = false
}

const onKeyDown = (e: KeyboardEvent) => {
  soundService.playKeyStroke(e.key)
  if (e.key === 'Enter') {
    saveEdit()
  } else if (e.key === 'Escape') {
    cancelEdit()
  }
}
</script>

<template>
  <div 
    class="receipt-item" 
    :class="{ 'is-completed': todo.is_completed, 'is-editing': isEditing }"
    :data-id="todo.id"
  >
    <button 
      class="checkbox-btn" 
      @click="emit('toggle', todo.id)"
      :aria-label="todo.is_completed ? 'Mark as incomplete' : 'Mark as completed'"
      type="button"
    >
      <span class="bracket">[</span>
      <span class="mark" :class="{ 'checked': todo.is_completed }">
        {{ todo.is_completed ? 'x' : ' ' }}
      </span>
      <span class="bracket">]</span>
    </button>

    <div class="todo-content" @dblclick="startEdit">
      <template v-if="!isEditing">
        <div 
          class="todo-title-wrapper" 
          @click="emit('toggle', todo.id)"
          :title="'Double-click to edit'"
        >
          <span class="todo-title">{{ todo.title }}</span>
          <PenStrike v-if="todo.is_completed" :id="todo.id" :title="todo.title" />
        </div>
      </template>

      <template v-else>
        <div class="edit-box">
          <input
            ref="editInput"
            v-model="editTitle"
            type="text"
            class="edit-input"
            @blur="saveEdit"
            @keydown="onKeyDown"
            maxlength="255"
          />
          <div class="edit-actions">
            <button class="action-btn check" @click.stop="saveEdit" title="Save">
              <Check :size="13" />
            </button>
            <button class="action-btn cancel" @click.stop="cancelEdit" title="Cancel">
              <X :size="13" />
            </button>
          </div>
        </div>
      </template>
    </div>

    <div v-if="!isEditing" class="item-actions">
      <button 
        class="action-btn edit" 
        @click.stop="startEdit" 
        title="Edit item"
        type="button"
      >
        <Edit2 :size="13" />
      </button>
      <button 
        class="action-btn delete" 
        @click.stop="emit('delete', todo.id)" 
        title="Delete item"
        type="button"
      >
        <Trash2 :size="13" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.receipt-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 6px 10px;
  position: relative;
  font-family: 'Courier Prime', 'Space Mono', monospace;
  font-size: 15px;
  line-height: 1.45;
  border-radius: 4px;
  transition: background-color 0.15s ease;
  user-select: text;
}

.receipt-item:hover {
  background: rgba(0, 0, 0, 0.035);
}

.checkbox-btn {
  background: none;
  border: none;
  padding: 0;
  margin-top: 1px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-family: 'Courier Prime', 'Space Mono', monospace;
  font-size: 15px;
  font-weight: 700;
  color: #111;
  flex-shrink: 0;
  outline: none;
}

.bracket {
  color: #333;
}

.mark {
  display: inline-block;
  width: 14px;
  text-align: center;
  color: #111;
  font-weight: 700;
}

.mark.checked {
  color: #1c4b82;
  font-weight: 700;
  transform: scale(1.05);
}

.todo-content {
  flex-grow: 1;
  min-width: 0;
  display: flex;
  align-items: flex-start;
}

.todo-title-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
  word-break: break-word;
  overflow-wrap: anywhere;
  max-width: 100%;
}

.todo-title {
  color: #151515;
  transition: color 0.2s ease;
  word-break: break-word;
  overflow-wrap: anywhere;
  display: block;
}

.is-completed .todo-title {
  color: #555555;
}

.edit-box {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
}

.edit-input {
  flex-grow: 1;
  font-family: 'Courier Prime', 'Space Mono', monospace;
  font-size: 16px;
  border: 1px dashed #444;
  background: rgba(255, 255, 255, 0.7);
  padding: 3px 6px;
  border-radius: 3px;
  color: #111;
  outline: none;
}

.edit-actions {
  display: flex;
  gap: 2px;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.15s ease;
  flex-shrink: 0;
  margin-top: 2px;
}

.receipt-item:hover .item-actions,
.receipt-item:focus-within .item-actions {
  opacity: 1;
}

@media (hover: none) {
  .item-actions {
    opacity: 0.7;
  }
}

.action-btn {
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

.action-btn:hover {
  background: rgba(0, 0, 0, 0.08);
  color: #111;
}

.action-btn.delete:hover {
  color: #dc2626;
  background: rgba(220, 38, 38, 0.1);
}

.action-btn.check:hover {
  color: #16a34a;
}
</style>
