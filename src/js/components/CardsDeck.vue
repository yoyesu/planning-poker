<script setup>
const props = defineProps({
  values: {
    type: [String, Array],
    default: ['default']
  }
})
</script>

<template>
  <div>
    <div class="option-card" v-for="(value, x) in values" :key="x" @click="$emit('selectCard', value)">{{ value }}</div>
  </div>
</template>

<style scoped>
div {
  background-color: aqua;
}
.option-card {
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 15px;
  margin: 5px;
  background-color: white;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s, transform 0.2s;
}
</style>