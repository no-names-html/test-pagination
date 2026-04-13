<template>
  <div class="headerFilters">
    <div class="filters" v-click-outside="closeSearch">
      <div class="search-wrapper" :class="{ expanded: isSearchOpen }">
        <button
          v-if="!isSearchOpen"
          class="search-btn"
          @click.stop="openSearch()"
        >
          🔍
        </button>
        <input
          v-else
          ref="searchInput"
          class="inputStyle"
          placeholder="Search by name or email"
          @input="setSearchWithDelay($event.target.value)"
        />
      </div>

      <BaseSelect
        v-if="!isSearchOpen"
        :model-value="role"
        @update:model-value="$emit('update:role', $event)"
        :options="['admin', 'manager', 'user']"
      />
    </div>
    <themeBlock></themeBlock>
  </div>
</template>

<script setup>
import themeBlock from "./themeBlock.vue";

const { search, role } = inject("usersTable");
defineEmits([, "update:role"]);

const isSearchOpen = ref(false);
const searchInput = ref(null);
const delay = ref(null);

const openSearch = () => {
  isSearchOpen.value = true;
  nextTick(() => searchInput.value?.focus());
};

const closeSearch = () => {
  isSearchOpen.value = false;
  search.value = "";
};

const setSearchWithDelay = (value) => {
  if (delay.value != null) clearTimeout(delay.value);
  delay.value = setTimeout(() => {
    search.value = value;
  }, 500);
};

// директива для кліку поза елементом
const vClickOutside = {
  mounted(el, binding) {
    el._clickOutside = (e) => {
      if (!el.contains(e.target)) binding.value();
    };
    document.addEventListener("click", el._clickOutside);
  },
  unmounted(el) {
    document.removeEventListener("click", el._clickOutside);
  },
};
</script>

<style scoped>
.headerFilters {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
}

.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  align-items: center;
  flex: 1;
}

.search-wrapper {
  display: flex;
  transition: width 0.3s ease;
  width: auto;
}

.search-wrapper.expanded {
  flex: 1;
}

.search-wrapper.expanded input {
  width: 100%;
}

.search-btn {
  cursor: pointer;
  padding: 10px 10px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg-surface);
  color: var(--text-primary);
}

.inputStyle {
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg-surface);
  color: var(--text-primary);
}
</style>
