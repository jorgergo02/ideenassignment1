<script setup>
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { ref, onMounted } from "vue";
import CourseComponent from "../components/CourseComponent.vue";

const db = getFirestore();

const courses = ref([]);

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "courses"));
  const courseData = [];
  querySnapshot.forEach((doc) => {
    courseData.push(doc.data());
  });
  courses.value = courseData;
});
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

<style scoped>
h1 {
  text-align: center;
  color: var(--blue);
}
</style>
