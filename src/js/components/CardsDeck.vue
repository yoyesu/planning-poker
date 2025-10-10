<script setup>
const props = defineProps({
  values: {
    type: [String, Array],
    default: ['default']
  }
})
</script>

<template>
<div>Hey hey {{ props.values }}</div>
</template>

<style scoped>
div {
  color: blue;
}
</style>