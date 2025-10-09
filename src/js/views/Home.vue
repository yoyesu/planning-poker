<!-- src/views/Home.vue -->
<template>
    <header></header>
    <main>
        <h1>Planning Poker</h1>
<!--        <button @click="joinRoom">Join room</button>-->
      <RouterLink to="/create-room">Create room</RouterLink>
</main>
</template>

<script setup>
    import { getDatabase, ref, set } from "firebase/database";

    function createRoom() {
    const db = getDatabase();
    const roomId = Math.random().toString(36).substring(2, 8);
    const roomRef = ref(db, `rooms/${roomId}`);
    set(roomRef, {
    createdAt: Date.now(),
    revealed: false,
    votes: {},
});
    window.location.href = `/room/${roomId}`;
}
</script>

<style scoped>
    main {
    text-align: center;
}
</style>
