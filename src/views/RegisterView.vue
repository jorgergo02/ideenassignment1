<script setup>
import { ref } from "vue";
import { session } from "../firebase/globalState.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { useRouter } from "vue-router";

const router = useRouter();

const studentData = ref({
  name: "",
  studentId: "",
  tecEmail: "",
  privateEmail: "",
  password: "",
  password2: "",
  career: "",
});

const termsAndConditions = ref(false);

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
    const userLoginInfo = await createUserWithEmailAndPassword(
      auth,
      studentData.value.tecEmail,
      studentData.value.password
    );
    const db = getFirestore();
    const { password, password2, ...data } = studentData.value;
    await setDoc(doc(db, "users", userLoginInfo.user.uid), data);

    session.user = auth.currentUser;
    alert.value.display = true;
    router.push("/");
  } catch {
    alert.value = {
      display: true,
      title: "Error al crear la cuenta",
      message:
        "El correo electrónico institucional ya está en uso, por favor, intenta con otro",
      type: "error",
    };
  }
}
</script>
<template>
  <h1 class="mt-8 mb-8">CREA UNA CUENTA</h1>
  <v-form v-model="studentDataIsValid" @submit.prevent="submit">
    <v-text-field
      label="Nombre Completo"
      v-model="studentData.name"
      type="name"
      :rules="[(v) => !!v || 'El nombre es requerido']"
      color="var(--blue)"
    ></v-text-field>
    <v-text-field
      v-model="studentData.studentId"
      type="id"
      label="Matrícula"
      placeholder="A01367845"
      :rules="[
        (v) => !!v || 'La matrícula es requerida',
        (v) =>
          /^A\d{8}$/.test(v) || 'La matrícula debe tener el formato A########',
      ]"
      color="var(--blue)"
    ></v-text-field>
    <v-text-field
      v-model="studentData.tecEmail"
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
      v-model="studentData.privateEmail"
      type="email"
      label="Correo Personal"
      placeholder="tucorreo@gmail.com"
      required="true"
      :rules="[
        (v) => !!v || 'El correo es requerido',
        (v) =>
          !v ||
          /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,3}$/.test(v) ||
          'Correo electrónico no válido',
      ]"
      color="var(--blue)"
    ></v-text-field>
    <v-text-field
      v-model="studentData.career"
      type="text"
      label="Carrera"
      :rules="[
        (v) => !!v || 'La carrera es requerida',
        (v) =>
          (v.length >= 2 && v.length <= 4) ||
          'La carrera debe tener 2-4 caracteres',
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
    <v-text-field
      v-model="studentData.password2"
      type="password"
      label="Confirmar Contraseña"
      :rules="[
        (v) => !!v || 'Debes confirmar la contraseña',
        (v) =>
          v.length >= 6 || 'La contraseña debe tener al menos 6 caracteres',
        (v) =>
          v === studentData.password ||
          'La confirmación de contraseña no coincide',
      ]"
      color="var(--blue)"
    ></v-text-field>
    <v-checkbox
      color="success"
      label="Acepto términos y condiciones"
      class="checkbox"
      v-model="termsAndConditions"
      :rules="[(v) => !!v || 'Debes aceptar los términos y condiciones']"
    ></v-checkbox>
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
      >Registrarse</v-btn
    >
  </v-form>
</template>

<style scoped>
.v-text-field {
  width: 800px;
  margin-left: auto;
  margin-right: auto;
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

.checkbox {
  width: fit-content;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
}

h1 {
  text-align: center;
  color: var(--blue);
  font-size: 3rem;
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
