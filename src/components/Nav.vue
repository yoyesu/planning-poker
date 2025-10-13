<script setup>
</script>

<template>
  <nav>
    <RouterLink to="/" class="nav-item"><div class="ni-text">Home</div></RouterLink>
    <RouterLink to="/create-room" class="nav-item"><div class="ni-text">Create Room</div></RouterLink>
    <RouterLink to="/your-name" class="nav-item"><div class="ni-text">Your Name</div></RouterLink>
  </nav>
</template>

<style scoped>
nav {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: left;
  background-color: #9589E8;
  border-bottom: 1px solid #FFA8A3;
}
.nav-item {
  height: 100%;
  margin-left: 5%;
  color: white;
  text-decoration: none;
  font-weight: bold;
  text-shadow: 1px 1px 2px #FFA8A3;
  font-size: 18px;
}
.nav-item:hover {
  background-color: #7e75c1;
}

.ni-text {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 15px;
}
</style>