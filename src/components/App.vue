<!-- src/App.vue -->
<template>
  <Nav></Nav>
  <router-view />  <!-- This is where your pages (like Room.vue) load -->
</template>

<script setup>
// You can add global logic here if you want
import Nav from "./Nav.vue";
</script>

<style>
body {
  font-family: sans-serif;
  margin: 0;
}
h1 {
  font-size: 3em;
  color: #54577C;
  margin-top: 100px;
  text-shadow: 1px 1px 2px #FFA8A3;
}
</style>
