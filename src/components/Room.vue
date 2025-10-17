<script setup>
import {useRoute} from 'vue-router'
import {ref as vueRef, onMounted} from 'vue'
import PokerTable from "./PokerTable.vue";
import CardsDeck from "./CardsDeck.vue";
import {ref, onValue, set} from "firebase/database";
import {db} from "../firebase/firebaseServices.js";
import {NAME_KEY, promptNameSavingAndRedirect} from "../js/utils.js";

const route = useRoute()
promptNameSavingAndRedirect();
const parsedCardsValues = vueRef([]);
const dbVotes = vueRef({});
const roomId = route.query.id
const userId = localStorage.getItem(NAME_KEY);
const selectedValue = vueRef(null);
const revealVotes = vueRef(false);
let hasVoted = false;
onMounted(() => {
  const cardsValues = route.query.cardsValues;
  parsedCardsValues.value = Array.isArray(cardsValues)
      ? cardsValues
      : cardsValues?.split(',').map((v) => v.trim()) || [];
  const roomRef = ref(db, `rooms/${roomId}`)
  set(ref(db, `rooms/${roomId}/votes/${userId}`), {cardValue: ""});

  onValue(roomRef, snapshot => {
    const data = snapshot.val()
    console.log(data)
    if (!revealVotes.value && data?.votes) {
      console.log("Resetting votes display as revealVotes is false")
      dbVotes.value = Object.fromEntries(
          Object.keys(data.votes).map(key => [key, { cardValue: "" }])
      );
    }
  })
});



function handleVote(cardValue) {
  selectedValue.value = cardValue;
  console.log("User", userId, "voted:", cardValue);
  const userRef = ref(db, `rooms/${roomId}/votes/${userId}`);
  set(userRef, {cardValue});
  hasVoted = true;
}

function shouldRevealVotes() {
  revealVotes.value = true;
  const roomRef = ref(db, `rooms/${roomId}`)
  onValue(roomRef, snapshot => {
    const data = snapshot.val()
    dbVotes.value = data?.votes || {};
  })
}
</script>

<template>
  <div id="room-main-container">
    <h1>Room {{ route.query.name }}</h1>
    <PokerTable v-bind:votes="dbVotes" @revealVotes="shouldRevealVotes" v-bind:hasVoted="hasVoted"></PokerTable>
    <CardsDeck v-bind:values="parsedCardsValues" v-bind:selectedValue="selectedValue" @selectCard="handleVote"></CardsDeck>
  </div>
</template>

<style scoped>
#room-main-container {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
</style>