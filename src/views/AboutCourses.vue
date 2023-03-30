<script setup>
import { ref } from "vue";
import CourseComponent from "../components/CourseComponent.vue";

const courses = ref([
  {
    course: "Título de la materia",
    teacher: "Cristiano Ronaldo",
    classroom: "La Congeladora",
    classDays: ["Lunes", "Miercoles", "Viernes"],
    hours: "7:00 - 9:00",
  },
  {
    course: "Título de la materia",
    teacher: "Cristiano Ronaldo",
    classroom: "La Congeladora",
    classDays: ["Lunes"],
    hours: "7:00 - 9:00",
  },
  {
    course: "Título de la materia",
    teacher: "Cristiano Ronaldo",
    classroom: "La Congeladora",
    classDays: ["Lunes", "Miercoles"],
    hours: "7:00 - 9:00",
  },
  {
    course: "Título de la materia",
    teacher: "Cristiano Ronaldo",
    classroom: "La Congeladora",
    classDays: ["Lunes", "Miercoles", "Viernes"],
    hours: "7:00 - 9:00",
  },
]);
</script>

<template>
  <h1>MATERIAS INSCRITAS</h1>
  <div>
    <CourseComponent
      v-for="(course, index) in courses"
      v-bind="course"
      :key="index"
    />
  </div>
</template>

<style scoped></style>
