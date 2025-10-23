<script setup>
import {useRoute} from 'vue-router'
import {ref as vueRef, onMounted} from 'vue'
import PokerTable from "./PokerTable.vue";
import CardsDeck from "./CardsDeck.vue";
import {ref, onValue, set, update} from "firebase/database";
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

function addUserTodb() {
  set(ref(db, `rooms/${roomId}/votes/${userId}`), {cardValue: "", hasVoted: false});
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
    const data = snapshot.val();
    revealVotes.value = data?.revealVotes || false;
    if (data?.revealVotes) {
      console.log("displaying real votes")
      dbVotes.value = data.votes || {};
    } else {
      console.log("building empty votes")
      dbVotes.value = buildEmptyVotes(data);
    }
  })
});



function handleVote(cardValue) {
  const userRef = ref(db, `rooms/${roomId}/votes/${userId}`);
  selectedValue.value = cardValue.toString();
  const hasVoted = true;
  set(userRef, {cardValue, hasVoted});
}

function shouldRevealVotes() {
  const roomRef = ref(db, `rooms/${roomId}`)
  update(roomRef, {"revealVotes": true });
}

function buildEmptyVotes(data, reset = false) {
    return Object.fromEntries(
        Object.keys(data.votes).map(key => [key, {cardValue: "", hasVoted: reset ? false : data.votes[key].hasVoted}])
    );
}

function resetVotesDisplay() {
  const roomRef = ref(db, `rooms/${roomId}`)
  update(roomRef, { "revealVotes": false });
  selectedValue.value = null;
  onValue(roomRef, snapshot => {
    const data = snapshot.val()
    dbVotes.value = buildEmptyVotes(data, true)
    update(roomRef, {votes: dbVotes.value})
  })
}
</script>

<template>
  <div id="room-main-container">
    <h1>Room {{ route.query.name }}</h1>
    <PokerTable v-bind:votes="dbVotes"></PokerTable>
    <section id="buttons-section">
      <input type="button" value="Reveal Votes" class="button" @click="shouldRevealVotes">
      <input type="button" value="Clear Votes" class="button" @click="resetVotesDisplay">
    </section>
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