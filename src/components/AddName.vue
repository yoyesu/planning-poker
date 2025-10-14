<script setup>

import {NAME_KEY, saveName} from "../js/utils.js";
import {ref as vueRef} from "vue";
import {useRoute} from "vue-router";
import {router} from "../js/view-router.js";

const userName = vueRef(null);
const route = useRoute();
const { redirect } = route.query;
console.log("Redirect to:", redirect)
const randomName = Math.random().toString(36).slice(2);

function handleSubmit(event) {
  event.preventDefault();
  if (!userName) {
    localStorage.setItem(NAME_KEY, randomName);
    console.log("Random userId generated and saved to localStorage:", randomName)
  }
  else {
    saveName(userName.value);
  }
    console.log(redirect)
    router.push(redirect ? redirect : '/');
}
</script>

<template>
  <main>
    <h1>Add Your Name</h1>
    <form id="name-form">
      <label for="name-input">Name:</label>
      <input type="text" id="name-input" name="name" v-model="userName" v-bind:placeholder="randomName"/>
      <input type="submit" value="Save" @click="handleSubmit" class="button">
    </form>
  </main>
</template>

<style scoped>

</style>