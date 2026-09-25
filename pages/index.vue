<template>
  <div class="page">
    <UserFilters
      @update:role="role = $event"
      @update:search="search = $event"
    />

    <UserTable :users="getUsers" :header="table_header" />
  </div>
</template>

<script setup>
import { users } from "~/data/users";
import { table_header } from "~/data/table_header";
import { useUsersTable } from "~/composables/useUsersTable";

const tableSettings = useUsersTable(users);
const {
  search,
  role,
  sortBy,
  sortDirection,
  page,
  perPage,
  totalPages,
  getUsers,
} = tableSettings;
provide("usersTable", tableSettings);
</script>

<style scoped>
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 16px);
}
</style>
