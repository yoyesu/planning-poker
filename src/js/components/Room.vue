<script setup>
import {useRoute} from 'vue-router'
import {ref as vueRef, onMounted} from 'vue'
import PokerTable from "./PokerTable.vue";
import CardsDeck from "./CardsDeck.vue";
import {ref, onValue, set} from "firebase/database";
import {db} from "../firebaseServices.js";

const route = useRoute()
const parsedCardsValues = vueRef([]);
const dbVotes = vueRef({});
const roomId = route.query.id
const userId = localStorage.getItem("userId");

onMounted(() => {
  console.log("my userId from localStorage:", userId)
  if (!userId) {
    localStorage.setItem("userId", Math.random().toString(36).slice(2));
    console.log("New userId generated and saved to localStorage:", localStorage.getItem("userId"))
  }
  console.log("Mounted Room.vue")
  console.log("Room ID:", roomId)
  console.log("User ID:", userId)
  console.log("Cards values:", route.query.cardsValues)
  const cardsValues = route.query.cardsValues;
  parsedCardsValues.value = Array.isArray(cardsValues)
      ? cardsValues
      : cardsValues?.split(',').map((v) => v.trim()) || [];
  const roomRef = ref(db, `rooms/${roomId}`)
  onValue(roomRef, snapshot => {
    const data = snapshot.val()
    if (!data) alert('Room not found!')
    else console.log('Room data:', data)
    dbVotes.value = data?.votes || {}
  })
});
function handleVote(cardValue) {
  console.log("User", userId, "voted:", cardValue);
  const userRef = ref(db, `rooms/${roomId}/votes/${userId}`);
  set(userRef, {cardValue});
}
</script>

<template>
<h1>Room: {{ route.query.name }}</h1>
  <PokerTable v-bind:votes="dbVotes"></PokerTable>
  <CardsDeck v-bind:values="parsedCardsValues" @selectCard="handleVote"></CardsDeck>
</template>

<style scoped>

</style>