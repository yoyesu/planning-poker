<script setup>

import {NAME_KEY, saveName} from "../js/utils.js";
import {ref as vueRef} from "vue";
import {router} from "../js/view-router.js";

const userName = vueRef();
const { redirect } = router.query;
if (!userName) {
  const randomName = Math.random().toString(36).slice(2);
  localStorage.setItem(NAME_KEY, randomName);
  console.log("Random userId generated and saved to localStorage:", randomName)
}

function handleSubmit(event) {
  event.preventDefault();
  saveName(userName.value);
  router.push(redirect ? redirect : '/');
}
</script>

<template>
  <main>
    <h1>Add Your Name</h1>
    <form id="name-form">
      <label for="name-input">Name:</label>
      <input type="text" id="name-input" name="name" required v-model="userName"/>
      <button type="submit" @submit="handleSubmit">Save</button>
    </form>
  </main>
</template>

<style scoped>

</style>