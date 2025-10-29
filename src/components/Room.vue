<script setup>
import {useRoute} from 'vue-router'
import {ref as vueRef, onMounted} from 'vue'
import PokerTable from "./PokerTable.vue";
import CardsDeck from "./CardsDeck.vue";
import {ref, onValue, set, update} from "firebase/database";
import {db} from "../firebase/firebaseServices.js";
import {getFromDatabase, NAME_KEY, promptNameSavingAndRedirect} from "../js/utils.js";

promptNameSavingAndRedirect();
const route = useRoute()
const parsedCardsValues = vueRef([]);
const selectedValue = vueRef(null);
const dbVotes = vueRef({});
const revealVotes = vueRef(false);
const roomId = route.query.id
const userId = localStorage.getItem(NAME_KEY);
let roomName = roomId;

function addUserTodb() {
  set(ref(db, `rooms/${roomId}/votes/${userId}`), {cardValue: "", hasVoted: false});
}

async function parseCardValues() {
  const cardsRef = ref(db, `rooms/${roomId}/cardsValues`);
  getFromDatabase(cardsRef).then(data => {
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
    dbVotes.value = data.votes || {};
    roomName = data.name;
  })
});


function handleVote(cardValue) {
  console.log("voting ", cardValue)
  const userRef = ref(db, `rooms/${roomId}/votes/${userId}`);
  selectedValue.value = cardValue.toString();
  const hasVoted = true;
  update(userRef, {cardValue, hasVoted});
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

async function resetVotesDisplay() {
  const roomRef = ref(db, `rooms/${roomId}`)
  selectedValue.value = null;
  getFromDatabase(roomRef).then(data => {
    dbVotes.value = buildEmptyVotes(data, true);
  });
  await update(roomRef, { votes: dbVotes.value, "revealVotes": false });
}
</script>

<template>
  <div id="room-main-container">
    <h1>{{ roomName }}</h1>
    <PokerTable v-bind:votes="dbVotes" v-bind:revealVotes="revealVotes"></PokerTable>
    <section id="buttons-section">
      <input type="button" value="Reveal Votes" class="button" @click="shouldRevealVotes">
      <input type="button" value="Clear Votes" class="button" @click="resetVotesDisplay">
    </section>
    <CardsDeck v-bind:values="parsedCardsValues" v-bind:selectedValue="selectedValue" @selectCard="handleVote"></CardsDeck>
  </div>
</template>

<style scoped>
#room-main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

input {
  display: inline-block;
  padding: 10px 20px;
  background-color: #9589E8;
  border: 1px solid #FFA8A3;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-right: 5px;
}
input:hover {
  cursor: pointer;
  background-color: #7e75c1;
}

input:active {
  box-shadow: 0 5px #FFA8A3;
  transform: translateY(4px);
}
</style>