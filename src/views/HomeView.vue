<script setup>
import { onMounted, ref } from "vue";
import { getAuth } from "firebase/auth";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

const studentInfo = ref({
  name: "",
  studentId: "",
  tecEmail: "",
  privateEmail: "",
  career: "",
});

const studentImage = ref("");

onMounted(async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const docRef = doc(getFirestore(), "users", user.uid);
  const docSnap = await getDoc(docRef);

  studentImage.value = await getDownloadURL(
    storageRef(getStorage(), "student.jpg")
  );
  studentInfo.value = docSnap.data();
});
</script>

<template>
  <h1>INFORMACIÓN DEL ALUMNO</h1>
  <div class="pp">
    <v-img :src="studentImage" alt="profilepicture" cover />
  </div>
  <v-container class="details mx-auto my-8 px-4 pa-8">
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <h3>Nombre Completo</h3>
        <p>{{ studentInfo.name }}</p>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <h3>Matrícula</h3>
        <p>{{ studentInfo.studentId }}</p>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <h3>Correo Institucional</h3>
        <p>{{ studentInfo.tecEmail }}</p>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <h3>Carrera</h3>
        <p>{{ studentInfo.career }}</p>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <h3>Correo Personal</h3>
        <p>{{ studentInfo.privateEmail }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
h1 {
  text-align: center;
  color: var(--blue);
}

h3,
p {
  font-size: 1.2rem;
  font-weight: bold;
}

h3 {
  color: var(--blue);
}

p {
  color: var(--gray);
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
