<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronLeft } from 'lucide-vue-next'
import { soundService } from '../utils/sound'

const props = withDefaults(
  defineProps<{
    title?: string
    isDetailView?: boolean
    isConnected: boolean
    isSyncing: boolean
  }>(),
  {
    title: 'THE DAILY RUN',
    isDetailView: false,
  }
)

const emit = defineEmits<{
  (e: 'back'): void
}>()

const currentTime = ref(new Date())
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const handleBack = () => {
  soundService.playKeyStroke('Backspace')
  emit('back')
}

const formattedDate = computed(() => {
  const now = currentTime.value
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const year = now.getFullYear()
  
  let hours = now.getHours()
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12
  const formattedHours = String(hours).padStart(2, '0')

  return `${month}/${day}/${year}  ${formattedHours}:${minutes}:${seconds} ${ampm}`
})
</script>

<template>
  <header class="receipt-header">
    <div v-if="isDetailView" class="back-nav-row">
      <button 
        class="back-btn" 
        @click="handleBack"
        type="button"
        title="Go back to All Lists"
      >
        <ChevronLeft :size="14" />
        <span>[ BACK TO ALL LISTS ]</span>
      </button>
    </div>

    <div class="emblem-container" :title="'สมศรีมีเสื้อ (SAVE WITH SOMSRI)'">
      <img 
        src="/somsri_logo.png" 
        alt="สมศรีมีเสื้อ - SAVE WITH SOMSRI" 
        class="somsri-emblem-img" 
      />
    </div>

    <div class="dots-separator">························</div>

    <h1 class="receipt-title">{{ title }}</h1>

    <div class="dots-separator">························</div>

    <div class="receipt-timestamp">{{ formattedDate }}</div>

    <div class="dashed-separator">========================================</div>

    <div class="status-bar" :class="{ 'connected': isConnected, 'error': !isConnected }">
      <span class="status-dot"></span>
      <span class="status-text">
        {{ isConnected ? 'API: ADONISJS 5 + POSTGRESQL (LIVE)' : 'API: CONNECTING TO BACKEND...' }}
      </span>
      <span v-if="isSyncing" class="sync-badge">SYNCING...</span>
    </div>
  </header>
</template>

<style scoped>
.receipt-header {
  text-align: center;
  padding: 8px 12px 12px;
  user-select: none;
}

.back-nav-row {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 6px;
}

.back-btn {
  background: transparent;
  border: 1px dashed rgba(0, 0, 0, 0.25);
  font-family: 'Courier Prime', 'Space Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  color: #333;
  padding: 3px 8px;
  border-radius: 3px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  transition: all 0.15s ease;
}

.back-btn:hover {
  background: rgba(0, 0, 0, 0.08);
  border-color: #111;
  color: #000;
  transform: translateX(-2px);
}

.emblem-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px auto 6px;
}

.somsri-emblem-img {
  width: 90px;
  height: auto;
  aspect-ratio: 835 / 640;
  object-fit: contain;
  filter: contrast(1.15) brightness(0.95);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: block;
}

.somsri-emblem-img:hover {
  transform: scale(1.06);
}

.dots-separator {
  font-family: 'Space Mono', 'Courier Prime', monospace;
  font-size: 15px;
  letter-spacing: 3px;
  color: #555;
  margin: 3px 0;
  overflow: hidden;
}

.receipt-title {
  font-family: 'Courier Prime', 'Space Mono', monospace;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 4px;
  color: #111;
  margin: 6px 0;
  text-transform: uppercase;
  word-break: break-word;
}

.receipt-timestamp {
  font-family: 'Courier Prime', 'Space Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  color: #2a2a2a;
  letter-spacing: 1.5px;
  margin: 5px 0 7px;
}

.dashed-separator {
  font-family: monospace;
  font-size: 11px;
  color: #777;
  letter-spacing: 1.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  margin: 4px 0 8px;
}

.status-bar {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'Space Mono', monospace;
  font-size: 9.5px;
  padding: 3px 10px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.04);
  color: #555;
  letter-spacing: 0.5px;
}

.status-bar.connected .status-dot {
  background: #10b981;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
}

.status-bar.error .status-dot {
  background: #f59e0b;
  animation: pulse 1.5s infinite;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.sync-badge {
  font-size: 8px;
  background: #2563eb;
  color: #fff;
  padding: 1px 4px;
  border-radius: 3px;
  margin-left: 4px;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
</style>
