<script setup>
import {ref as vueRef} from "vue";
import { getDatabase, ref, set } from "firebase/database";
import {router} from "../view-router.js";
let roomName = vueRef("");
let cardsValues = vueRef([0, 1, 2, 3, 4, 5, 6, 7, 9, 9, 10, '?']);

async function createRoom(event) {
  event.preventDefault();
  // const db = getDatabase();
  const roomId = Math.random().toString(36).substring(2, 8);
  // const roomRef = ref(db, `rooms/${roomId}`);
  // set(roomRef, {
  //   createdAt: Date.now(),
  //   revealed: false,
  //   votes: {},
  //   roomName: roomName || `Room-${roomId}`,
  //   cardsValues: cardsValues ? cardsValues.split(',').map(v => v.trim()) : [0, 1, 2, 3, 4, 5, 6, 7, 9, 9, 10, '?']
  // });

  await router.push({
    path: `/room/${roomId}`,
    query: {
      name: roomName.value || roomId,
      id: roomId,
      cardsValues: cardsValues.value
    }
  });
}
</script>

<template>
<h1>Create Room</h1>
  <form>
    <label for="room-name-input">Room name <span class="small-text">Leave blank for random name</span></label>
    <input type="text" id="room-name-input" name="room-name-input" v-model="roomName">
    <label for="cards-values-input">Cards values <span class="small-text">Comma separated values, leave blank for default (0, 1, 2, 3, 4, 5, 6, 7, 9, 9, 10, ?)</span></label>
    <input type="text" id="cards-values-input" name="cards-values-input" v-model="cardsValues">
    <input type="submit" value="Create" @click="createRoom">
  </form>

</template>

<style scoped>
.small-text {
  font-size: 0.8em;
  color: #666;
}
</style>