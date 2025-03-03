import { watchDebounced } from "@vueuse/core";

export const useDataTable = (initialData, initialColumns) => {
  const data = ref(initialData);
  const columns = ref(initialColumns);
  const sortBy = ref("");
  const sortDesc = ref(false);
  const searchQuery = ref("");
  const currentPage = ref(1);
  const itemsPerPage = ref(10);
  const itemsPerPageOptions = ref([5, 10, 25, 50, 100]);
  const columnFilters = ref({});

  // Debounced search to prevent excessive filtering
  const debouncedSearch = ref(searchQuery.value);
  watchDebounced(
    searchQuery,
    (newValue) => {
      debouncedSearch.value = newValue;
      currentPage.value = 1;
    },
    { debounce: 300 }
  );

  // Memoize cell value getter
  const getCellValue = memoize((item, column) => {
    if (column.path) {
      return column.path.split(".").reduce((obj, key) => obj?.[key], item);
    }
    return item[column.key];
  });

  // Create index for faster searching
  const searchIndex = computed(() => {
    const index = new Map();
    data.value.forEach((item, idx) => {
      const searchableValues = columns.value
        .map((column) => getCellValue(item, column))
        .filter(Boolean)
        .map((value) => value.toString().toLowerCase())
        .join(" ");
      index.set(idx, searchableValues);
    });
    return index;
  });

  const filteredData = computed(() => {
    // Start with indices instead of full objects for better memory usage
    let indices = [...data.value.keys()];

    // Apply column filters
    Object.entries(columnFilters.value).forEach(([key, value]) => {
      if (value) {
        const column = columns.value.find((col) => col.key === key);
        indices = indices.filter((idx) => {
          const item = data.value[idx];
          const cellValue = getCellValue(item, column);
          return cellValue
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        });
      }
    });

    // Apply search filter using index
    if (debouncedSearch.value) {
      const searchTerm = debouncedSearch.value.toLowerCase();
      indices = indices.filter((idx) =>
        searchIndex.value.get(idx).includes(searchTerm)
      );
    }

    // Apply sorting only to visible page
    if (sortBy.value) {
      const sortColumn = columns.value.find((col) => col.key === sortBy.value);
      indices.sort((aIdx, bIdx) => {
        const aVal = getCellValue(data.value[aIdx], sortColumn);
        const bVal = getCellValue(data.value[bIdx], sortColumn);

        if (sortDesc.value) {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        }
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      });
    }

    return indices;
  });

  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    // Only map indices to full objects for visible page
    return filteredData.value.slice(start, end).map((idx) => data.value[idx]);
  });

  const totalPages = computed(() =>
    Math.ceil(filteredData.value.length / itemsPerPage.value)
  );

  // Cache sort results
  const sortCache = new Map();
  const toggleSort = (column) => {
    if (column.sortable) {
      if (sortBy.value === column.key) {
        sortDesc.value = !sortDesc.value;
      } else {
        sortBy.value = column.key;
        sortDesc.value = false;
      }
      // Clear cache when sort changes
      sortCache.clear();
    }
  };

  const setItemsPerPage = (value) => {
    itemsPerPage.value = parseInt(value, 10);
    currentPage.value = 1;
  };

  // Debounced column filter
  const setColumnFilter = debounce((column, value) => {
    columnFilters.value[column] = value;
    currentPage.value = 1;
  }, 300);

  return {
    data,
    columns,
    sortBy,
    sortDesc,
    searchQuery,
    currentPage,
    itemsPerPage,
    paginatedData,
    totalPages,
    toggleSort,
    itemsPerPageOptions,
    columnFilters,
    setItemsPerPage,
    setColumnFilter,
    filteredData,
    getCellValue,
  };
};

// Utility functions
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  };
}

function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
