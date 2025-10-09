<script setup>
import {useRoute} from 'vue-router'
import {ref, onMounted} from 'vue'
// import {getDatabase, ref as dbRef, onValue} from 'firebase/database'

const route = useRoute()
// const db = getDatabase()

onMounted(() => {
  const roomId = route.params.roomId
  // const roomRef = dbRef(db, `rooms/${roomId}`)
  // onValue(roomRef, snapshot => {
  //   const data = snapshot.val()
  //   if (!data) alert('Room not found!')
  //   else console.log('Room data:', data)
  // })
})

</script>

<template>
  <h1>hi</h1>
<h1>Room: {{ route.params.roomId }}</h1>
</template>

<style scoped>

</style>