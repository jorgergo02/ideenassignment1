<script setup>
import StudentDetails from "../components/StudentDetails.vue";
import { ref } from "vue";

const data = ref([
  {
    heading: "Nombre Completo",
    details: "Juan Escutia",
  },
  {
    heading: "Matricula",
    details: "A01361234",
  },
  {
    heading: "Correo Institucional",
    details: "A01361234@tec.mx",
  },
  {
    heading: "Carrera",
    details: "ISC",
  },
  {
    heading: "Correo Personal",
    details: "murioporlapatria@gmail.com",
  },
]);
</script>

<template>
  <h1>INFORMACIÓN DEL ALUMNO</h1>
  <div class="pp">
    <v-img src="/alumno.jpeg" alt="profilepicture" cover />
  </div>
  <v-container class="details pa-8 px-4 mx-auto my-8">
    <v-row>
      <v-col v-for="element in data" cols="12" sm="12" md="6">
        <StudentDetails :heading="element.heading" :details="element.details" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
h1 {
  text-align: center;
  color: var(--blue);
}

.pp {
  max-width: 12rem;
  border-radius: 50%;
  margin: 2rem auto;
  overflow: hidden;
}

.details {
  max-width: 40rem;
}
</style>
