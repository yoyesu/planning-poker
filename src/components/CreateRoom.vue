<script setup>
import {ref as vueRef} from "vue";
import { ref, set } from "firebase/database";
import {router} from "../js/view-router.js";
import {db} from "../firebase/firebaseServices.js";
let roomName = vueRef("");
let cardsValues = vueRef([0, 1, 2, 3, 4, 5, 6, 7, 9, 9, 10, '?']);

async function createRoom(event) {
  event.preventDefault();
  const roomId = Math.random().toString(36).substring(2, 8);
  const roomNameValue = roomName.value || roomId;
  const roomRef = ref(db, `rooms/${roomId}`);
  await set(roomRef, {
    createdAt: Date.now(),
    votes: {},
    name: roomNameValue,
    cardsValues: cardsValues.value
  });

  await router.push({
    path: `/room/${roomId}`,
    query: {
      name: roomNameValue,
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