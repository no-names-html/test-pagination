<template>
  <div class="table">
    <div class="table-wrapper">
      <div class="header-table-block">
        <div
          v-for="headerItem in header"
          :key="headerItem.key"
          class="header-table-item"
          :class="{ 'header-item-sortable': headerItem.sortable }"
          :style="setColWidth(headerItem)"
          @click="headerItem.sortable ? setSortParam(headerItem) : () => {}"
        >
          {{ headerItem.title }}
        </div>
      </div>

      <div class="table-body">
        <div v-if="users.length">
          <div v-for="row in users" :key="row.id" class="table-row-block">
            <div
              v-for="headerItem in header"
              :key="headerItem.key"
              class="table-row"
              :style="setColWidth(headerItem)"
            >
              <span v-if="headerItem.key == 'createdAt'">{{
                new Date(row.createdAt).toLocaleDateString()
              }}</span>
              <span v-else="headerItem.key !== 'createdAt'">
                {{ row[headerItem.key] }}
              </span>
            </div>
          </div>
        </div>
        <div v-else>Something wrong... No data, no users</div>
      </div>
    </div>
    <paginationFooter></paginationFooter>
  </div>
</template>

<script setup>
import paginationFooter from "./paginationFooter.vue";

defineProps({
  users: Array,
  header: Array,
});

const { sortBy, sortDirection } = inject("usersTable");

const setColWidth = (col) => {
  if (col.width) {
    return {
      width: `${col.width}px`,
      minWidth: `${col.width}px`,
      flex: "0 0 auto",
    };
  }
  return { flex: "1 1 0", minWidth: "100px" };
};

const setSortParam = (headerItem) => {
  sortDirection.value = sortDirection.value == "asc" ? "desc" : "asc";
  sortBy.value = headerItem.key;
};
</script>

<style scoped>
.table-wrapper {
  display: flex;
  flex-direction: column;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}

.header-table-block {
  display: flex;
  background: var(--bg-header);
  border-bottom: 2px solid var(--border);
  font-weight: 600;
  font-size: 15px;
  color: var(--text-primary);
}

.header-table-item {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  user-select: none;
  border-right: 1px solid var(--border);
}

.header-item-sortable {
  color: var(--accent);
  cursor: pointer;
}

.table-body {
  max-height: calc(100vh - 170px);
  overflow: auto;
}

.table-row-block {
  display: flex;
  border-bottom: 1px solid var(--border);
  color: var(--text-primary);
}

.table-row {
  padding: 12px 16px;
  font-size: 13px;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  border-right: 1px solid var(--border);
}

.table {
  display: flex;
  flex: 1;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
}
</style>
