<script setup>
import {useRoute} from 'vue-router'
import {ref as vueRef, onMounted} from 'vue'
import PokerTable from "./PokerTable.vue";
import CardsDeck from "./CardsDeck.vue";
// import {getDatabase, ref as dbRef, onValue} from 'firebase/database'
const route = useRoute()
// const db = getDatabase()

onMounted(() => {
  console.log("Mounted Room.vue")
  const roomId = route.params.roomId
  console.log("Room ID:", roomId)
  console.log("Cards values:", route.params.cardsValues)
  // const roomRef = dbRef(db, `rooms/${roomId}`)
  // onValue(roomRef, snapshot => {
  //   const data = snapshot.val()
  //   if (!data) alert('Room not found!')
  //   else console.log('Room data:', data)
  // })
})

</script>

<template>
<h1>Room: {{ route.params.roomId }}</h1>
  <PokerTable></PokerTable>
  <CardsDeck :values=route.params.cardsValues></CardsDeck>
</template>

<style scoped>

</style>