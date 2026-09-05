<script setup lang="ts">
import type { TodoFilter } from '../types/todo'
import { Sparkles } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    variant?: 'detail' | 'archive'
    totalCount: number
    completedCount?: number
    pendingCount?: number
    currentFilter?: TodoFilter
  }>(),
  {
    variant: 'detail',
    completedCount: 0,
    pendingCount: 0,
    currentFilter: 'all',
  }
)

const emit = defineEmits<{
  (e: 'changeFilter', filter: TodoFilter): void
  (e: 'clearCompleted'): void
}>()
</script>

<template>
  <footer class="receipt-footer">
    <div class="dashed-separator">----------------------------------------</div>

    <template v-if="variant === 'archive'">
      <div class="receipt-metrics archive-metrics">
        <div class="metric-row">
          <span class="metric-label">TOTAL LISTS:</span>
          <span class="metric-val">{{ totalCount }}</span>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="receipt-metrics">
        <div class="metric-row">
          <span class="metric-label">TOTAL ITEMS:</span>
          <span class="metric-val">{{ totalCount }}</span>
        </div>
        <div class="metric-row">
          <span class="metric-label">COMPLETED:</span>
          <span class="metric-val completed">{{ completedCount }}</span>
        </div>
        <div class="metric-row">
          <span class="metric-label">PENDING:</span>
          <span class="metric-val pending">{{ pendingCount }}</span>
        </div>
      </div>

      <div class="filter-group">
        <button 
          class="filter-btn" 
          :class="{ 'active': currentFilter === 'all' }"
          @click="emit('changeFilter', 'all')"
          type="button"
        >
          [ ALL: {{ totalCount }} ]
        </button>
        <button 
          class="filter-btn" 
          :class="{ 'active': currentFilter === 'active' }"
          @click="emit('changeFilter', 'active')"
          type="button"
        >
          [ ACTIVE: {{ pendingCount }} ]
        </button>
        <button 
          class="filter-btn" 
          :class="{ 'active': currentFilter === 'completed' }"
          @click="emit('changeFilter', 'completed')"
          type="button"
        >
          [ DONE: {{ completedCount }} ]
        </button>
      </div>

      <div v-if="completedCount > 0" class="clear-container">
        <button class="clear-btn" @click="emit('clearCompleted')" type="button">
          <Sparkles :size="12" />
          <span>CLEAR COMPLETED ({{ completedCount }})</span>
        </button>
      </div>
    </template>

    <div class="barcode-wrapper" title="Code-39 Barcode: SOMSRI">
      <svg class="barcode-svg" viewBox="0 0 250 40">
        <rect x="10" y="0" width="2" height="35" fill="#111" />
        <rect x="17" y="0" width="2" height="35" fill="#111" />
        <rect x="21" y="0" width="5" height="35" fill="#111" />
        <rect x="28" y="0" width="5" height="35" fill="#111" />
        <rect x="35" y="0" width="2" height="35" fill="#111" />
        <rect x="39" y="0" width="2" height="35" fill="#111" />
        <rect x="46" y="0" width="2" height="35" fill="#111" />
        <rect x="50" y="0" width="2" height="35" fill="#111" />
        <rect x="54" y="0" width="5" height="35" fill="#111" />
        <rect x="61" y="0" width="5" height="35" fill="#111" />
        <rect x="68" y="0" width="2" height="35" fill="#111" />
        <rect x="72" y="0" width="5" height="35" fill="#111" />
        <rect x="79" y="0" width="2" height="35" fill="#111" />
        <rect x="83" y="0" width="5" height="35" fill="#111" />
        <rect x="90" y="0" width="5" height="35" fill="#111" />
        <rect x="97" y="0" width="5" height="35" fill="#111" />
        <rect x="104" y="0" width="5" height="35" fill="#111" />
        <rect x="111" y="0" width="2" height="35" fill="#111" />
        <rect x="115" y="0" width="5" height="35" fill="#111" />
        <rect x="122" y="0" width="2" height="35" fill="#111" />
        <rect x="126" y="0" width="2" height="35" fill="#111" />
        <rect x="133" y="0" width="2" height="35" fill="#111" />
        <rect x="137" y="0" width="2" height="35" fill="#111" />
        <rect x="141" y="0" width="5" height="35" fill="#111" />
        <rect x="148" y="0" width="5" height="35" fill="#111" />
        <rect x="155" y="0" width="2" height="35" fill="#111" />
        <rect x="159" y="0" width="5" height="35" fill="#111" />
        <rect x="166" y="0" width="5" height="35" fill="#111" />
        <rect x="173" y="0" width="5" height="35" fill="#111" />
        <rect x="180" y="0" width="2" height="35" fill="#111" />
        <rect x="184" y="0" width="2" height="35" fill="#111" />
        <rect x="188" y="0" width="2" height="35" fill="#111" />
        <rect x="192" y="0" width="5" height="35" fill="#111" />
        <rect x="199" y="0" width="5" height="35" fill="#111" />
        <rect x="206" y="0" width="5" height="35" fill="#111" />
        <rect x="213" y="0" width="2" height="35" fill="#111" />
        <rect x="220" y="0" width="2" height="35" fill="#111" />
        <rect x="224" y="0" width="5" height="35" fill="#111" />
        <rect x="231" y="0" width="5" height="35" fill="#111" />
        <rect x="238" y="0" width="2" height="35" fill="#111" />
      </svg>
      <div class="barcode-digits">* 2026 09 05 · SOMSRI *</div>
    </div>

    <div class="receipt-signoff">
      *** TODO LIST ***
    </div>

    <div class="dashed-separator bottom">========================================</div>
  </footer>
</template>

<style scoped>
.receipt-footer {
  padding: 8px 14px 18px;
  user-select: none;
  text-align: center;
}

.dashed-separator {
  font-family: monospace;
  font-size: 11px;
  color: #777;
  letter-spacing: 1.5px;
  white-space: nowrap;
  overflow: hidden;
  margin: 6px 0 10px;
}

.dashed-separator.bottom {
  margin-top: 14px;
  margin-bottom: 0;
}

.receipt-metrics {
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-family: 'Courier Prime', 'Space Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
  padding: 0 4px;
}

.archive-metrics {
  margin-bottom: 6px;
}

.metric-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metric-label {
  letter-spacing: 1px;
}

.metric-val {
  letter-spacing: 1px;
}

.metric-val.completed {
  color: #1d4e89;
}

.metric-val.pending {
  color: #111;
}

.filter-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}

.filter-btn {
  background: transparent;
  border: none;
  font-family: 'Courier Prime', 'Space Mono', monospace;
  font-size: 11.5px;
  font-weight: 700;
  color: #666;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 3px;
  transition: all 0.15s ease;
  outline: none;
}

.filter-btn:hover {
  color: #111;
  background: rgba(0, 0, 0, 0.05);
}

.filter-btn.active {
  color: #111;
  background: rgba(0, 0, 0, 0.09);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.clear-container {
  margin-bottom: 12px;
}

.clear-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  color: #888;
  background: transparent;
  border: 1px dashed #aaa;
  padding: 3px 8px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.clear-btn:hover {
  color: #dc2626;
  border-color: #dc2626;
  background: rgba(220, 38, 38, 0.05);
}

.barcode-wrapper {
  margin: 10px auto 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.barcode-svg {
  width: 190px;
  height: 35px;
}

.barcode-digits {
  font-family: 'Courier Prime', monospace;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 2.2px;
  color: #222;
  margin-top: 4px;
}

.receipt-signoff {
  font-family: 'Courier Prime', 'Space Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #444;
  margin-top: 6px;
}
</style>
