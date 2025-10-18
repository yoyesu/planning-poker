<script setup>
import {useRoute} from 'vue-router'
import {ref as vueRef, onMounted} from 'vue'
import PokerTable from "./PokerTable.vue";
import CardsDeck from "./CardsDeck.vue";
import {ref, onValue, set} from "firebase/database";
import {db} from "../firebase/firebaseServices.js";
import {NAME_KEY, promptNameSavingAndRedirect} from "../js/utils.js";

promptNameSavingAndRedirect();
const route = useRoute()
const parsedCardsValues = vueRef([]);
const selectedValue = vueRef(null);
const dbVotes = vueRef({});
const revealVotes = vueRef(false);
const roomId = route.query.id
const userId = localStorage.getItem(NAME_KEY);
let hasVoted = false;

function addUserTodb() {
  set(ref(db, `rooms/${roomId}/votes/${userId}`), {cardValue: ""});
}

function parseCardValues() {
  const cardsRef = ref(db, `rooms/${roomId}/cardsValues`);
  onValue(cardsRef, snapshot => {
    const data = snapshot.val();
    parsedCardsValues.value = Array.isArray(data)
        ? data
        : data?.split(',').map((v) => v.trim()) || [];
  });

}

onMounted(() => {
  parseCardValues();
  addUserTodb();

  onValue(ref(db, `rooms/${roomId}`), snapshot => {
    const data = snapshot.val()
    buildEmptyVotes(data)
  })
});



function handleVote(cardValue) {
  const userRef = ref(db, `rooms/${roomId}/votes/${userId}`);
  selectedValue.value = cardValue;
  hasVoted = true;
  set(userRef, {cardValue});
}

function shouldRevealVotes() {
  revealVotes.value = true;
  const roomRef = ref(db, `rooms/${roomId}`)
  onValue(roomRef, snapshot => {
    const data = snapshot.val()
    dbVotes.value = data?.votes || {};
  })
}

function buildEmptyVotes(data) {
  if (!revealVotes.value && data?.votes) {
    dbVotes.value = Object.fromEntries(
        Object.keys(data.votes).map(key => [key, {cardValue: ""}])
    );
  }
}

function resetVotesDisplay() {
  const roomRef = ref(db, `rooms/${roomId}`)
  selectedValue.value = null;
  revealVotes.value = false;
  hasVoted = false;
  onValue(roomRef, snapshot => {
    const data = snapshot.val()
    buildEmptyVotes(data)
  })
}
</script>

<template>
  <div id="room-main-container">
    <h1>Room {{ route.query.name }}</h1>
    <PokerTable v-bind:votes="dbVotes" @revealVotes="shouldRevealVotes" v-bind:hasVoted="hasVoted"></PokerTable>
    <input type="button" value="Clear Votes" class="button" @click="resetVotesDisplay">
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