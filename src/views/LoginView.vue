<script setup>
import { ref } from "vue";
import { session } from "../firebase/globalState.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const studentData = ref({
  email: "",
  password: "",
});

const studentDataIsValid = ref(false);

const alert = ref({
  display: false,
  title: "Información inválida",
  message: "Por favor, verifica que la información introducida sea correcta",
  type: "warning",
});

async function submit() {
  if (!studentDataIsValid.value) {
    alert.value = {
      display: true,
      title: "Información inválida",
      message:
        "Por favor, verifica que la información introducida sea correcta",
      type: "warning",
    };
    return;
  }

  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(
      auth,
      studentData.value.email,
      studentData.value.password
    );
    session.user = auth.currentUser;
    alert.value.display = false;
    router.push("/");
  } catch (e) {
    const message =
      e.code === "auth/wrong-password"
        ? "La contraseña introducida es incorrecta"
        : "El correo electrónico no está registrado";

    alert.value = {
      display: true,
      title: "Error al iniciar sesión",
      message,
      type: "error",
    };
  }
}
</script>
<template>
  <h1 class="mt-8 mb-16">INICIO DE SESIÓN</h1>
  <v-form v-model="studentDataIsValid" @submit.prevent="submit">
    <v-text-field
      v-model="studentData.email"
      type="email"
      label="Correo Institucional"
      placeholder="A01367845@tec.mx"
      :rules="[
        (v) => !!v || 'El correo electrónico es requerido',
        (v) =>
          !v ||
          /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,3}$/.test(v) ||
          'El formato del correo electrónico no es válido',
        (v) => /.+@tec\.mx$/.test(v) || 'El correo debe ser institucional',
      ]"
      color="var(--blue)"
    ></v-text-field>
    <v-text-field
      v-model="studentData.password"
      type="password"
      label="Contraseña"
      :rules="[
        (v) => !!v || 'La contraseña es requerida',
        (v) =>
          v.length >= 6 || 'La contraseña debe tener al menos 6 caracteres',
      ]"
      color="var(--blue)"
    ></v-text-field>
    <br />
    <v-dialog v-model="alert.display">
      <v-sheet
        class="pa-8 mx-auto"
        width="100%"
        max-width="800"
        elevation="2"
        rounded="xl"
      >
        <h3 class="dialog_title">{{ alert.title }}</h3>
        <div class="dialog_info">
          <p>{{ alert.message }}</p>
        </div>
        <v-row>
          <v-spacer />
          <v-btn
            class="font-weight-bold text-h6"
            color="#384FFE"
            variant="text"
            @click="alert.display = false"
            >X</v-btn
          >
        </v-row>
      </v-sheet>
    </v-dialog>
    <v-btn class="text-body-1 submit text-capitalize" type="submit"
      >Iniciar Sesión</v-btn
    >
  </v-form>
</template>

<style scoped>
.v-text-field {
  width: 800px;
  margin-left: auto;
  margin-right: auto;
}

h1 {
  text-align: center;
  color: var(--blue);
  font-size: 3rem;
}

.submit {
  color: white;
  font-weight: bold;
  background-color: var(--blue);
  width: 800px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.dialog_title {
  text-align: center;
  font-size: 2rem;
}

.dialog_info {
  margin: 2rem 0 3rem 0;
}

.dialog_info p {
  margin: 0.25rem 0;
}

p {
  font-size: 1.2rem;
  color: var(--gray);
  font-weight: bold;
}

h3 {
  font-size: 1.2rem;
  color: var(--blue);
}

@media screen and (min-width: 960px) {
  .dialog_title {
    font-size: 2rem;
  }
  .dialog_info p {
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.5rem;
  }
}

@media screen and (max-width: 900px) {
  .v-text-field {
    width: 100%;
  }

  .submit {
    width: 100%;
  }
}
</style>
