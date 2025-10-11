<script setup>
import {useRoute} from 'vue-router'
import {ref as vueRef, onMounted} from 'vue'
import PokerTable from "./PokerTable.vue";
import CardsDeck from "./CardsDeck.vue";
// import {getDatabase, ref as dbRef, onValue} from 'firebase/database'
const route = useRoute()
const parsedCardsValues = vueRef([]);
// const db = getDatabase()

onMounted(() => {
  console.log("Mounted Room.vue")
  const roomId = route.query.id
  console.log("Room ID:", roomId)
  console.log("Cards values:", route.query.cardsValues)
  const cardsValues = route.query.cardsValues;
  parsedCardsValues.value = Array.isArray(cardsValues)
      ? cardsValues
      : cardsValues?.split(',').map((v) => v.trim()) || [];
  // const roomRef = dbRef(db, `rooms/${roomId}`)
  // onValue(roomRef, snapshot => {
  //   const data = snapshot.val()
  //   if (!data) alert('Room not found!')
  //   else console.log('Room data:', data)
  // })
})

</script>

<template>
<h1>Room: {{ route.query.name }}</h1>
  <PokerTable></PokerTable>
  <CardsDeck v-bind:values="parsedCardsValues"></CardsDeck>
</template>

<style scoped>

</style>