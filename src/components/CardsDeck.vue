<script setup>
const props = defineProps({
  values: {
    type: [String, Array],
    default: ['default']
  },
  selectedValue: {
    type: String,
    default: null
  }
})
</script>

<template>
  <div id="cards-deck-container">
    <div class="option-card"
         v-for="(value, x) in values"
         :key="x"
         :class="{ selected: selectedValue === value }"
         @click="$emit('selectCard', value)">{{ value }}</div>
  </div>
</template>

<style scoped>
#cards-deck-container {
  height: 50%;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  padding: 5%;
  width: 100%;
  box-sizing: border-box;
}
.option-card {
  min-width: 20px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 15px;
  margin: 5px;
  background-color: #ede9e9;
  cursor: pointer;
  user-select: none;
  align-content: center;
  transition: background-color 0.3s, transform 0.2s;
}
.option-card.selected {
  background-color: #9589E8;
  color: white;
  transform: scale(1.15);
  transition: all 0.2s ease;
}
</style>