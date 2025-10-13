<script setup>
import {ref as vueRef} from "vue";
import { ref, set } from "firebase/database";
import {router} from "../js/view-router.js";
import {db} from "../firebase/firebaseServices.js";
import {promptNameSavingAndRedirect} from "../js/utils.js";

const roomId = Math.random().toString(36).substring(2, 8);
let roomName = vueRef(roomId);
let cardsValues = vueRef([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '?']);
promptNameSavingAndRedirect();
async function createRoom(event) {
  event.preventDefault();
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
  <div id="create-room-main-container">
<h1>Create A Room</h1>
    <p class="small-text">Use default values or personalise.</p>
  <form>
    <label for="room-name-input">Room name:</label>
    <input type="text" id="room-name-input" name="room-name-input" v-model="roomName">

    <label for="cards-values-input">Cards values:</label>
    <input type="text" id="cards-values-input" name="cards-values-input" v-model="cardsValues">

    <input type="submit" value="Create" @click="createRoom" class="button">
  </form>
  </div>
</template>

<style scoped>
#create-room-main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  text-align: center;
}

.small-text {
  font-size: 0.8em;
  color: #666;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1em;
  max-width: 400px;
}

.button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #9589E8;
  border: 1px solid #FFA8A3;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
.button:hover {
  background-color: #7e75c1;
}
</style>