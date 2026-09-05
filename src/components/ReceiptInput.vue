<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from 'lucide-vue-next'
import { soundService } from '../utils/sound'

const emit = defineEmits<{
  (e: 'add', title: string): void
}>()

const title = ref('')
const isSubmitting = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

const handleKeydown = (e: KeyboardEvent) => {
  soundService.playKeyStroke(e.key)

  if (e.key === 'Enter') {
    e.preventDefault()
    submit()
  }
}

const submit = () => {
  const trimmed = title.value.trim()
  if (!trimmed) return

  isSubmitting.value = true
  emit('add', trimmed)
  title.value = ''
  isSubmitting.value = false
  
  inputRef.value?.focus()
}
</script>

<template>
  <div class="receipt-input-container">
    <div class="receipt-input-row">
      <span class="input-bracket">[ ]</span>

      <input
        ref="inputRef"
        v-model="title"
        type="text"
        placeholder="write here..."
        class="receipt-input-field"
        @keydown="handleKeydown"
        maxlength="200"
        aria-label="New todo title"
      />

      <button 
        class="add-btn" 
        @click="submit"
        :disabled="!title.trim() || isSubmitting"
        type="button"
        title="Add to receipt (Enter)"
      >
        <Plus :size="14" />
        <span class="btn-text">ADD</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.receipt-input-container {
  padding: 8px 10px 14px;
}

.receipt-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.025);
  border: 1px dashed rgba(0, 0, 0, 0.22);
  border-radius: 4px;
  padding: 6px 10px;
  transition: border-color 0.2s, background 0.2s;
}

.receipt-input-row:focus-within {
  background: rgba(255, 255, 255, 0.6);
  border-color: #111;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.input-bracket {
  font-family: 'Courier Prime', 'Space Mono', monospace;
  font-size: 15px;
  font-weight: 700;
  color: #555;
  user-select: none;
  flex-shrink: 0;
}

.receipt-input-field {
  flex-grow: 1;
  min-width: 0;
  border: none;
  background: transparent;
  font-family: 'Courier Prime', 'Space Mono', monospace;
  font-size: 16px;
  color: #111;
  outline: none;
  letter-spacing: 0.5px;
}

.receipt-input-field::placeholder {
  color: #777;
  font-style: italic;
}

.add-btn {
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

.add-btn:hover:not(:disabled) {
  background: #000;
  transform: translateY(-1px);
}

.add-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.btn-text {
  letter-spacing: 0.5px;
}
</style>
