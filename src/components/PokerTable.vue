<script setup>
const props = defineProps({
  votes: {
    type: Object,
    default: {}
  },
  hasVoted: {
    type: Boolean,
    default: false
  }
})
console.log("Votes prop in PokerTable:", props.votes)
</script>

<template>
<div id="poker-table-container">
  <input type="button" value="Reveal Votes" class="button" @click="$emit('revealVotes',true)">
  <div class="vote-container" v-for="(userData, user) in votes" :key="user">
    <div class="vote-value" :class="{ voted: hasVoted === true }">{{ userData.cardValue }}</div>
    <div class="vote-user">{{ user }}</div>
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
.vote-container {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 5px;
  height: fit-content;
  width: max-content;
}

.vote-value {
  min-width: 20px;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 15px;
  margin: 5px;
  background-color: #ede9e9;
}

.voted {
  background-color: #9589E8;
}
</style>