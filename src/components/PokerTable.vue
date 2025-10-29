<script setup>
const props = defineProps({
  votes: {
    type: Object,
    default: {}
  },
  revealVotes: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
<div id="poker-table-container">
  <div class="vote-container" v-for="(userData, user) in votes" :key="user">
    <div class="vote-value" :class="{ voted: userData.hasVoted === true && revealVotes === false}">{{ revealVotes ? userData.cardValue : "" }}</div>
    <div class="vote-user">{{ user }}</div>
  </div>
</div>

</template>

<style scoped>
#poker-table-container {
  height: 50%;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 75%;
  box-sizing: border-box;
  overflow-x: auto;
  margin-bottom: 2%;
}
div {
  color: #430671;
  background-color: rgb(217, 197, 255);
}
.vote-container {
  border-radius: 8px;
  margin: 5px;
  height: fit-content;
  width: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.vote-value {
  width: 20px;
  height: 40px;
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