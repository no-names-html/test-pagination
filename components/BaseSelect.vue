<template>
  <select v-model="model" class="select">
    <option :value="null">All</option>
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup>
defineProps({
  options: {
    type: Array,
    required: true,
  },
});

const model = defineModel();
</script>

<style scoped>
.select {
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg-surface);
  color: var(--text-primary);
}
</style>
