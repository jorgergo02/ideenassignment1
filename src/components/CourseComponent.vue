<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  course: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  classroom: {
    type: String,
  },
  classDays: {
    type: Array,
  },
  hours: {
    type: String,
  },
});

const compclassDays = computed(() => {
  let totalDays = "";

  props.classDays.forEach((day, index) => {
    if (index === 0) {
      totalDays += day;
      return;
    }
    if (index === props.classDays.length - 1) {
      totalDays += ` & ${day}`;
      return;
    }

    totalDays += `, ${day}`;
  });

  return totalDays;
});

let dialog = ref(false);
</script>

<template>
  <v-sheet class="pa-6 mx-auto my-6" max-width="900" elevation="2" rounded="xl">
    <h3>{{ course }}</h3>
    <p>Profesor: {{ teacher }}</p>
    <v-row class="dialog_row">
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog">
        <template v-slot:activator="{ props }">
          <v-btn
            class="details font-weight-bold text-capitalize text-h6"
            color="#384FFE"
            variant="text"
            v-bind="props"
            >Ver detalles</v-btn
          >
        </template>
        <v-sheet
          class="pa-8 mx-auto"
          rounded="xl"
          max-width="800"
          elevation="2"
          width="100%"
        >
          <h3 class="dialog_title">{{ course }}</h3>
          <div class="dialog_info">
            <p>Profesor: {{ teacher }}</p>
            <p>Salón: {{ classroom }}</p>
            <p>Días: {{ compclassDays }}</p>
            <p>Horario: {{ hours }}</p>
          </div>
          <v-row>
            <v-spacer />
            <v-btn
              class="text-h6 font-weight-bold"
              color="#384FFE"
              variant="text"
              @click="dialog = false"
              >X</v-btn
            >
          </v-row>
        </v-sheet>
      </v-dialog>
    </v-row>
  </v-sheet>
</template>

<style scoped>
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

.dialog_row {
  margin-top: 1rem;
}

@media screen and (min-width: 960px) {
  .dialog_row {
    margin-top: 0;
  }

  .details {
    font-size: 1.2rem;
  }

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
</style>
