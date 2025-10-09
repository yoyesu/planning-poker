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

</script>

<style scoped>
    main {
    text-align: center;
}
</style>
