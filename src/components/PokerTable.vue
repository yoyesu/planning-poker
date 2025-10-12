<script setup>
const props = defineProps({
  votes: {
    type: Object,
    default: {}
  }
})
</script>

<template>
<div id="poker-table-container">
  <div class="vote-card" v-for="(userData, user) in votes" :key="user">
    <div id="vote-value">{{ userData.cardValue }}</div>
    <div id="vote-user">{{ user }}</div>
  </div>
</div>

</template>

<style scoped>
#poker-table-container {
  height: 50%;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
}
div {
  color: green;
  background-color: beige;
}
.vote-card {
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