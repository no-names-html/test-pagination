<template>
  <div class="theme-switcher">
    <button
      v-for="t in themes"
      :key="t.value"
      class="theme-btn"
      :class="{ active: current === t.value }"
      @click="setTheme(t.value)"
    >
      <span class="theme-dot" :style="{ background: t.color }"></span>
      {{ t.label }}
    </button>
  </div>
</template>

<script setup>
const themes = [
  { value: "", label: "Light", color: "#f5f5f5" },
  { value: "dark", label: "Dark", color: "#2c2c2e" },
  { value: "matrix", label: "Matrix", color: "#00cc44" },
];

const current = ref("");

const setTheme = (value) => {
  current.value = value;
  document.documentElement.className = value;
  localStorage.setItem("theme", value);
};

onMounted(() => {
  const saved = localStorage.getItem("theme");
  if (saved) {
    current.value = saved;
    document.documentElement.className = saved;
  }
});
</script>

<style scoped>
.theme-switcher {
  display: flex;
  gap: 6px;
  /* margin-top: 8px; */
  margin-bottom: 12px;
}

.theme-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: var(--bg-surface);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 13px;
  transition:
    border-color 0.15s,
    color 0.15s;
}

.theme-btn:hover {
  border-color: var(--accent);
  color: var(--text-primary);
}

.theme-btn.active {
  border-color: var(--accent);
  color: var(--accent);
  font-weight: 600;
}

.theme-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid var(--border);
  flex-shrink: 0;
}
</style>
