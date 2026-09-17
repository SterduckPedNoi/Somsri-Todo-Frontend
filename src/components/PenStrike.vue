<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  id?: number
  title?: string
}>()

const TOTAL_VARIANTS = 25

// Module-level tracker so consecutive strikethroughs won't repeat the same variant
let lastAssignedVariant = -1

function getRandomVariant(total: number): number {
  let next = Math.floor(Math.random() * total)
  if (next === lastAssignedVariant && total > 1) {
    next = (next + 1 + Math.floor(Math.random() * (total - 1))) % total
  }
  lastAssignedVariant = next
  return next
}

// Randomly assign a unique variant for this instance
const variant = ref<number>(getRandomVariant(TOTAL_VARIANTS))
</script>

<template>
  <svg 
    class="pen-strike-svg" 
    :class="`variant-${variant}`"
    viewBox="0 0 200 24" 
    preserveAspectRatio="none"
  >
    <!-- Variant 0: Upward slash with loopback at end -->
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

    <!-- Variant 1: Downward slash with parallel echo stroke -->
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

    <!-- Variant 2: Crossing X strokes -->
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

    <!-- Variant 3: Vigorous zigzag scribble -->
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

    <!-- Variant 4: Swift slash with ink loop flourish -->
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

    <!-- Variant 5: Wavy continuous scribble curve -->
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

    <!-- Variant 6: Right to left backward strike with underline -->
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

    <!-- Variant 7: Triple energetic straight lines -->
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

    <!-- Variant 8: Diagonal slash with return tail -->
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

    <!-- Variant 9: Double horizontal straight lines -->
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

    <!-- Variant 10: Wavy line with ink dots / press marks -->
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

    <!-- Variant 11: Reverse diagonal slash with echo -->
    <template v-else-if="variant === 11">
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

    <!-- Variant 12: Triple aggressive scratch-out (3 passes back & forth) -->
    <template v-else-if="variant === 12">
      <path 
        d="M 2,18 C 50,14 110,9 198,4" 
        stroke="#1e4e8c" 
        stroke-width="2.0" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 196,5 C 130,12 65,16 6,20" 
        stroke="rgba(30, 78, 140, 0.75)" 
        stroke-width="1.8" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-loop"
      />
      <path 
        d="M 4,20 C 60,15 130,11 198,7" 
        stroke="#225494" 
        stroke-width="1.6" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-third"
      />
    </template>

    <!-- Variant 13: Thick decisive slash with start ink pool -->
    <template v-else-if="variant === 13">
      <circle cx="3" cy="19" r="2.4" fill="#173f76" />
      <path 
        d="M 3,19 Q 80,11 198,5" 
        stroke="#173f76" 
        stroke-width="2.6" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 198,5 Q 160,3 125,6" 
        stroke="rgba(23, 63, 118, 0.6)" 
        stroke-width="1.3" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-loop"
      />
    </template>

    <!-- Variant 14: Over-and-under double arch -->
    <template v-else-if="variant === 14">
      <path 
        d="M 2,12 Q 95,2 198,6" 
        stroke="#20508e" 
        stroke-width="1.9" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 3,10 Q 105,22 197,16" 
        stroke="#1b467e" 
        stroke-width="1.9" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-loop"
      />
    </template>

    <!-- Variant 15: Cursive spiral loops (telephone wire scribble) -->
    <template v-else-if="variant === 15">
      <path 
        d="M 2,12 C 12,3 18,21 28,12 C 38,3 44,21 54,12 C 64,3 70,21 80,12 C 90,3 96,21 106,12 C 116,3 122,21 132,12 C 142,3 148,21 158,12 C 168,3 174,21 184,12 C 192,5 195,17 198,11" 
        stroke="#1f4e8b" 
        stroke-width="1.8" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        fill="none" 
        class="pen-stroke-line"
      />
    </template>

    <!-- Variant 16: Sharp Z-scratch -->
    <template v-else-if="variant === 16">
      <path 
        d="M 2,6 L 198,5 L 3,18 L 198,17" 
        stroke="#1b4982" 
        stroke-width="1.9" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 10,12 L 190,11" 
        stroke="rgba(27, 73, 130, 0.5)" 
        stroke-width="1.2" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-loop"
      />
    </template>

    <!-- Variant 17: Double cross (X) + horizontal center bar -->
    <template v-else-if="variant === 17">
      <path 
        d="M 2,5 Q 95,12 198,19" 
        stroke="#215291" 
        stroke-width="1.8" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 2,19 Q 95,12 198,5" 
        stroke="#1c477d" 
        stroke-width="1.8" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-loop"
      />
      <path 
        d="M 6,12 Q 100,10 194,13" 
        stroke="rgba(33, 82, 145, 0.7)" 
        stroke-width="1.5" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-third"
      />
    </template>

    <!-- Variant 18: Heavy start with tapered upward flick -->
    <template v-else-if="variant === 18">
      <circle cx="3" cy="20" r="2.5" fill="#19437a" />
      <path 
        d="M 3,20 C 60,17 125,10 198,2" 
        stroke="#19437a" 
        stroke-width="2.5" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 8,22 C 70,18 135,11 190,4" 
        stroke="rgba(25, 67, 122, 0.55)" 
        stroke-width="1.4" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-loop"
      />
    </template>

    <!-- Variant 19: Double jittery wave -->
    <template v-else-if="variant === 19">
      <path 
        d="M 2,10 Q 25,6 50,14 T 100,10 T 150,14 T 198,9" 
        stroke="#235696" 
        stroke-width="1.9" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 3,15 Q 28,11 53,19 T 103,15 T 153,19 T 197,14" 
        stroke="#1a457c" 
        stroke-width="1.7" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-loop"
      />
    </template>

    <!-- Variant 20: Dense saw-tooth scratch -->
    <template v-else-if="variant === 20">
      <path 
        d="M 2,14 L 18,7 L 34,17 L 50,7 L 66,17 L 82,8 L 98,16 L 114,8 L 130,16 L 146,8 L 162,16 L 178,8 L 198,13" 
        stroke="#1c4c88" 
        stroke-width="1.8" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 198,13 Q 150,10 95,12" 
        stroke="rgba(28, 76, 136, 0.6)" 
        stroke-width="1.3" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-loop"
      />
    </template>

    <!-- Variant 21: Encircling cancellation loop with center cut -->
    <template v-else-if="variant === 21">
      <path 
        d="M 10,12 C 10,4 190,3 190,12 C 190,21 10,20 10,12" 
        stroke="#205190" 
        stroke-width="1.6" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 2,13 Q 95,11 198,12" 
        stroke="#163e72" 
        stroke-width="2.2" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-loop"
      />
    </template>

    <!-- Variant 22: Rapid 3-tier parallel slashes -->
    <template v-else-if="variant === 22">
      <path 
        d="M 2,6 Q 95,8 198,7" 
        stroke="#225494" 
        stroke-width="1.7" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 1,12 Q 95,13 197,12" 
        stroke="#1b467e" 
        stroke-width="1.9" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-loop"
      />
      <path 
        d="M 3,18 Q 95,17 196,18" 
        stroke="#255da1" 
        stroke-width="1.6" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-third"
      />
    </template>

    <!-- Variant 23: Hesitant double stroke with ink bleed dots -->
    <template v-else-if="variant === 23">
      <circle cx="3" cy="9" r="2.0" fill="#1a4680" />
      <circle cx="102" cy="11" r="1.7" fill="#1a4680" />
      <circle cx="197" cy="14" r="2.2" fill="#1a4680" />
      <path 
        d="M 3,9 Q 55,14 102,11 T 197,14" 
        stroke="#1a4680" 
        stroke-width="2.1" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 6,15 Q 60,9 105,15 T 194,10" 
        stroke="rgba(26, 70, 128, 0.7)" 
        stroke-width="1.7" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-loop"
      />
    </template>

    <!-- Variant 24: Double horizontal strike with return hook -->
    <template v-else>
      <path 
        d="M 2,9 Q 95,6 198,8" 
        stroke="#184277" 
        stroke-width="2.0" 
        stroke-linecap="round" 
        fill="none" 
        class="pen-stroke-line"
      />
      <path 
        d="M 198,8 C 200,14 195,18 188,18 L 4,16" 
        stroke="#20508e" 
        stroke-width="1.9" 
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

.variant-12 {
  transform: translateY(-50%) rotate(-4deg) !important;
}

.variant-13 {
  transform: translateY(-50%) rotate(5deg) !important;
}

.variant-14 {
  transform: translateY(-50%) rotate(-1.5deg) !important;
}

.variant-15 {
  transform: translateY(-50%) rotate(2.5deg) !important;
}

.variant-16 {
  transform: translateY(-50%) rotate(-6deg) !important;
}

.variant-17 {
  transform: translateY(-50%) rotate(1deg) !important;
}

.variant-18 {
  transform: translateY(-50%) rotate(-9deg) !important;
}

.variant-19 {
  transform: translateY(-50%) rotate(3deg) !important;
}

.variant-20 {
  transform: translateY(-50%) rotate(-3.5deg) !important;
}

.variant-21 {
  transform: translateY(-50%) rotate(0.8deg) !important;
}

.variant-22 {
  transform: translateY(-50%) rotate(-2deg) !important;
}

.variant-23 {
  transform: translateY(-50%) rotate(4.5deg) !important;
}

.variant-24 {
  transform: translateY(-50%) rotate(-5.5deg) !important;
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
