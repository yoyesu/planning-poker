<template>
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
  background-color: #9589E8;
  border-bottom: 1px solid #FFA8A3;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
#create-room-btn:hover {
  background-color: #7e75c1;
}
</style>
