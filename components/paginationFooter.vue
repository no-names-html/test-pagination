<template>
  <div class="pagination">
    <button class="page-btn" @click="changePage('-')" :disabled="page === 1">
      ‹
    </button>

    <span class="page-info">{{ page }} / {{ totalPages }}</span>

    <button
      class="page-btn"
      @click="changePage('+')"
      :disabled="page === totalPages"
    >
      ›
    </button>

    <BaseSelect
      :model-value="perPage"
      @update:model-value="perPage = Number($event)"
      :options="[10, 15, 20]"
    />
  </div>
</template>

<script setup>
const { page, perPage, totalPages } = inject("usersTable");

const changePage = (symbol) => {
  symbol == "+" ? page.value++ : page.value--;
};
</script>

<style scoped>
.pagination {
  margin-top: 12px;
  display: flex;
  gap: 6px;
  align-items: center;
}

.page-btn {
  width: 47px;
  height: 47px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-surface);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  transition:
    background 0.15s,
    border-color 0.15s;
}

.page-btn:hover:not(:disabled) {
  background: var(--accent-hover);
  border-color: var(--accent);
  color: var(--accent);
}

.page-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.page-info {
  font-size: 15px;
  color: var(--text-secondary);
  min-width: 48px;
  text-align: center;
}
</style>
