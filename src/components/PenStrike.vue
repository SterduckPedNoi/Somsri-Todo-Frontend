<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  id: number
  title?: string
}>()

const variant = computed(() => {
  let hash = Math.abs(props.id) * 31
  if (props.title) {
    for (let i = 0; i < props.title.length; i++) {
      hash = (hash << 5) - hash + props.title.charCodeAt(i)
    }
  }
  return Math.abs(hash) % 12
})
</script>

<template>
  <svg 
    class="pen-strike-svg" 
    :class="`variant-${variant}`"
    viewBox="0 0 200 24" 
    preserveAspectRatio="none"
  >
    <template v-if="variant === 0">
      <path 
        d="M 2,21 Q 60,14 115,8 T 198,3" 
        stroke="#235696" 
        stroke-width="2.1" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 198,3 Q 160,2 120,6" 
        stroke="rgba(35, 86, 150, 0.65)" 
        stroke-width="1.3" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-loop"
      />
    </template>

    <template v-else-if="variant === 1">
      <path 
        d="M 2,3 Q 65,9 125,16 T 198,22" 
        stroke="#1c4d8c" 
        stroke-width="2.2" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 5,7 Q 70,12 135,18 T 195,20" 
        stroke="rgba(28, 77, 140, 0.6)" 
        stroke-width="1.2" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-loop"
      />
    </template>

    <template v-else-if="variant === 2">
      <path 
        d="M 2,19 C 55,13 130,8 198,4" 
        stroke="#245899" 
        stroke-width="2.0" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 4,4 C 60,11 130,17 196,21" 
        stroke="#1f4b85" 
        stroke-width="1.8" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-loop"
      />
    </template>

    <template v-else-if="variant === 3">
      <path 
        d="M 2,13 L 45,5 L 30,19 L 85,4 L 70,20 L 125,5 L 110,19 L 165,6 L 150,18 L 198,7" 
        stroke="#225494" 
        stroke-width="1.8" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 10,11 C 65,15 130,10 192,14" 
        stroke="rgba(34, 84, 148, 0.5)" 
        stroke-width="1.2" 
        stroke-linecap="round" 
        fill="none" 
      />
    </template>

    <template v-else-if="variant === 4">
      <path 
        d="M 2,23 C 50,16 120,8 186,2" 
        stroke="#1a457c" 
        stroke-width="2.3" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 186,2 C 197,3 198,9 188,11 C 178,11 168,7 182,5" 
        stroke="rgba(26, 69, 124, 0.7)" 
        stroke-width="1.4" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-loop"
      />
    </template>

    <template v-else-if="variant === 5">
      <path 
        d="M 2,13 C 14,4 24,20 36,12 C 48,4 58,20 70,12 C 82,4 92,20 104,12 C 116,4 126,20 138,12 C 150,4 160,20 172,12 C 182,4 190,19 198,11" 
        stroke="#205190" 
        stroke-width="1.9" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        fill="none" 
        class="pen-stroke-line"
      />
    </template>

    <template v-else-if="variant === 6">
      <path 
        d="M 198,4 C 140,9 80,15 2,20" 
        stroke="#215291" 
        stroke-width="2.1" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 192,9 C 130,14 70,12 15,16" 
        stroke="rgba(33, 82, 145, 0.65)" 
        stroke-width="1.3" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-loop"
      />
    </template>

    <template v-else-if="variant === 7">
      <path 
        d="M 2,8 C 65,12 135,7 198,9" 
        stroke="#1b4782" 
        stroke-width="1.7" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 1,13 C 60,15 140,11 197,13" 
        stroke="#265da2" 
        stroke-width="1.9" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-loop"
      />
      <path 
        d="M 3,17 C 75,13 130,18 195,16" 
        stroke="rgba(38, 93, 162, 0.7)" 
        stroke-width="1.4" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-third"
      />
    </template>

    <template v-else-if="variant === 8">
      <path 
        d="M 2,2 Q 80,10 198,23" 
        stroke="#1a4680" 
        stroke-width="2.3" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 198,23 Q 155,16 110,12" 
        stroke="rgba(26, 70, 128, 0.6)" 
        stroke-width="1.3" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-loop"
      />
    </template>

    <template v-else-if="variant === 9">
      <path 
        d="M 2,7 Q 85,5 198,5" 
        stroke="#225494" 
        stroke-width="1.8" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 4,16 Q 95,14 196,15" 
        stroke="#1c4780" 
        stroke-width="1.9" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-loop"
      />
    </template>

    <template v-else-if="variant === 10">
      <path 
        d="M 2,14 Q 40,6 85,15 T 145,8 T 197,11" 
        stroke="#20508e" 
        stroke-width="2.2" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <circle cx="2" cy="14" r="2.2" fill="#20508e" />
      <circle cx="197" cy="11" r="2.0" fill="#20508e" />
      <circle cx="115" cy="11" r="1.6" fill="#20508e" />
    </template>

    <template v-else>
      <path 
        d="M 198,21 C 140,15 75,9 2,3" 
        stroke="#1d4a84" 
        stroke-width="2.1" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 192,16 C 135,11 75,14 12,8" 
        stroke="rgba(29, 74, 132, 0.65)" 
        stroke-width="1.3" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-loop"
      />
    </template>
  </svg>
</template>

<style scoped>
.pen-strike-svg {
  position: absolute;
  left: -6px;
  right: -8px;
  top: 50%;
  width: calc(100% + 14px);
  height: 24px;
  pointer-events: none;
  z-index: 2;
  overflow: visible;
}

.variant-0 {
  transform: translateY(-50%) rotate(-7deg) !important;
}

.variant-1 {
  transform: translateY(-50%) rotate(8deg) !important;
}

.variant-2 {
  transform: translateY(-50%) rotate(-1deg) !important;
}

.variant-3 {
  transform: translateY(-50%) rotate(3.5deg) !important;
}

.variant-4 {
  transform: translateY(-50%) rotate(-11deg) !important;
}

.variant-5 {
  transform: translateY(-50%) rotate(-2.5deg) !important;
}

.variant-6 {
  transform: translateY(-50%) rotate(6.5deg) !important;
}

.variant-7 {
  transform: translateY(-50%) rotate(0.5deg) !important;
}

.variant-8 {
  transform: translateY(-50%) rotate(12deg) !important;
}

.variant-9 {
  transform: translateY(-50%) rotate(-5deg) !important;
}

.variant-10 {
  transform: translateY(-50%) rotate(2deg) !important;
}

.variant-11 {
  transform: translateY(-50%) rotate(-8.5deg) !important;
}

.pen-stroke-line {
  stroke-dasharray: 320;
  stroke-dashoffset: 320;
  animation: drawPen 0.22s ease-out forwards;
}

.pen-stroke-loop {
  stroke-dasharray: 260;
  stroke-dashoffset: 260;
  animation: drawPen 0.2s 0.08s ease-out forwards;
}

.pen-stroke-third {
  stroke-dasharray: 260;
  stroke-dashoffset: 260;
  animation: drawPen 0.2s 0.14s ease-out forwards;
}

@keyframes drawPen {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
