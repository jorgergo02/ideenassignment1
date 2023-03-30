<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <v-layout>
    <v-app-bar class="px-md-5" color="#384FFE">
      <v-img class="tec" src="/logoTec.png" alt="tec" />
      <div class="ml-auto">
        <RouterLink class="pa-4 link" to="/">INICIO</RouterLink>
        <RouterLink class="pa-4 link" to="/courses"
          >LISTA DE MATERIAS</RouterLink
        >
      </div>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>

<style scoped>
.tec {
  max-width: 12rem;
}
</style>
