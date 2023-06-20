<script setup>
import DefaultBar from "./AppBar.vue";
</script>

<template>
  <v-app>
    <default-bar />

    <v-main class="bgBlack">
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
.bgBlack {
  background: #212121;
}
</style>
