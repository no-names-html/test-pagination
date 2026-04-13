import type { userType } from "@/types/userType";

export function useUsersTable(users: userType[]) {
  const route = useRoute();
  const router = useRouter();

  // filters

  const search = ref("");
  const role = ref(route.query.role || null);

  // sorting
  const sortBy = ref<keyof userType>(
    (route.query.sortBy as keyof userType) || "id",
  ); // 'age' | 'createdAt'
  const sortDirection = ref(route.query.sortDirection || "asc");

  // pagination
  const page = ref(Number(route.query.page) || 1);
  const perPage = ref(Number(route.query.perPage) || 10);

  watch([role, sortDirection, page, sortBy, perPage], () => {
    router.replace({
      query: {
        role: role.value,
        sortDirection: sortDirection.value,
        page: page.value,
        sortBy: sortBy.value,
        perPage: perPage.value,
      },
    });
  });

  const filteredUsers = computed(() => {
    let result = role.value
      ? users.filter((item) => item.role == role.value)
      : [...users];

    if (search.value) {
      result = result.filter((item) => {
        return (
          item.name.toLowerCase().includes(search.value.toLowerCase()) ||
          item.email.toLowerCase().includes(search.value.toLowerCase())
        );
      });
    }

    return result;
  });

  const getUsers = computed(() => {
    return perPage.value
      ? sortedArr.value.slice(
          perPage.value * (page.value - 1),
          perPage.value * page.value,
        )
      : [...sortedArr.value];
  });

  const totalPages = computed(() => {
    return perPage.value
      ? Math.ceil(filteredUsers.value.length / perPage.value)
      : 1;
  });

  const sortedArr = computed(() =>
    [...filteredUsers.value].sort((a, b) => sortItems(a, b)),
  );

  const sortItems = (a: userType, b: userType) => {
    let aVal = a[sortBy.value];
    let bVal = b[sortBy.value];

    let result = 0;

    if (typeof aVal == "string" && typeof bVal == "string") {
      result = aVal.localeCompare(bVal);
    } else result = Number(aVal) - Number(bVal);

    return sortDirection.value == "asc" ? result : -result;
  };

  const tableS = ref();

  return {
    search,
    role,
    sortBy,
    sortDirection,
    page,
    perPage,
    totalPages,
    getUsers,
  };
}
