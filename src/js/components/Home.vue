<!-- src/views/Home.vue -->
<template>
    <header></header>
    <main>
        <h1>Planning Poker</h1>
      <RouterLink to="/create-room" id="create-room-btn">Create room</RouterLink>
</main>
</template>

<script setup>

</script>

<style scoped>
    main {
    text-align: center;
}
    #create-room-btn {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}
</style>
