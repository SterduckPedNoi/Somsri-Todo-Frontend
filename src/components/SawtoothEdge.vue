<script setup lang="ts">
defineProps<{
  position: 'top' | 'bottom'
}>()
</script>

<template>
  <div class="sawtooth-wrapper" :class="position">
    <svg class="sawtooth-svg" viewBox="0 0 300 10" preserveAspectRatio="none">
      <polygon 
        points="0,10 5,0 10,10 15,0 20,10 25,0 30,10 35,0 40,10 45,0 50,10 55,0 60,10 65,0 70,10 75,0 80,10 85,0 90,10 95,0 100,10 105,0 110,10 115,0 120,10 125,0 130,10 135,0 140,10 145,0 150,10 155,0 160,10 165,0 170,10 175,0 180,10 185,0 190,10 195,0 200,10 205,0 210,10 215,0 220,10 225,0 230,10 235,0 240,10 245,0 250,10 255,0 260,10 265,0 270,10 275,0 280,10 285,0 290,10 295,0 300,10" 
        fill="#f5f4ed" 
      />
    </svg>
  </div>
</template>

<style scoped>
.sawtooth-wrapper {
  width: 100%;
  height: 10px;
  overflow: hidden;
  line-height: 0;
}

.sawtooth-wrapper.top {
  margin-bottom: -1px;
}

.sawtooth-wrapper.bottom {
  margin-top: -1px;
  transform: rotate(180deg);
}

.sawtooth-svg {
  display: block;
  width: 100%;
  height: 10px;
}
</style>
