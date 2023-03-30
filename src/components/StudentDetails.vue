<script setup>
defineProps({
  heading: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <h3 class="heading">{{ heading }}</h3>
  <p class="details">{{ details }}</p>
</template>

<style scoped>
h3.heading {
  color: var(--blue);
}

.heading,
.details {
  color: var(--gray);
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
