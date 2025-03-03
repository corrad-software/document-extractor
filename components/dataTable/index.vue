<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
});

const isClient = ref(false);
const {
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
} = useDataTable(props.data, props.columns);

const showFilters = ref(false);

onMounted(() => {
  isClient.value = true;
});
</script>

<template>
  <div v-if="isClient" class="dataTable">
    <!-- Controls -->
    <div class="mb-6 flex flex-wrap gap-4">
      <!-- Search -->
      <div class="flex-1 min-w-[200px]">
        <FormKit v-model="searchQuery" type="text" placeholder="Search..." />
      </div>

      <!-- Right Controls -->
      <div class="flex items-center gap-4 ml-auto">
        <div class="flex items-center gap-2">
          <span class="text-sm text-muted-foreground">Show:</span>
          <FormKit
            v-model.number="itemsPerPage"
            type="select"
            :options="itemsPerPageOptions"
            @change="setItemsPerPage($event.target.value)"
            :classes="{ input: 'w-20' }"
          />
        </div>

        <Button variant="outline" size="sm" @click="showFilters = !showFilters">
          <Icon name="ph:funnel" class="h-4 w-4" />
          <span class="ml-2">{{
            showFilters ? "Hide Filters" : "Filters"
          }}</span>
        </Button>
      </div>
    </div>

    <!-- Column Filters -->
    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="showFilters" class="mb-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="column in columns.filter((col) => col.filterable)"
            :key="column.key"
            class="flex flex-col gap-1.5"
          >
            <FormKit
              type="text"
              :label="'Filter ' + column.label"
              v-model="columnFilters[column.key]"
              @input="setColumnFilter(column.key, columnFilters[column.key])"
            />
          </div>
        </div>
      </div>
    </Transition>

    <!-- Table with Horizontal Scroll -->
    <div class="border rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-muted/50">
              <th
                v-for="column in columns"
                :key="column.key"
                class="px-4 py-3 text-left text-sm font-medium whitespace-nowrap"
                :class="{ 'cursor-pointer hover:bg-muted/70': column.sortable }"
                @click="column.sortable && toggleSort(column)"
              >
                <div class="flex items-center gap-1">
                  {{ column.label }}
                  <template v-if="column.sortable">
                    <Icon
                      v-if="sortBy !== column.key"
                      name="ph:arrows-down-up"
                      class="h-4 w-4 text-gray-400"
                    />
                    <Icon
                      v-else
                      :name="
                        sortDesc ? 'ph:sort-descending' : 'ph:sort-ascending'
                      "
                      class="h-4 w-4 text-primary"
                    />
                  </template>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr
              v-for="row in paginatedData"
              :key="row.id"
              class="hover:bg-muted/30"
            >
              <td
                v-for="column in columns"
                :key="column.key"
                class="px-4 py-3 text-sm whitespace-nowrap"
              >
                <slot
                  :name="column.key"
                  :row="row"
                  :value="getCellValue(row, column)"
                >
                  {{ getCellValue(row, column) }}
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-4 flex flex-wrap items-center justify-between gap-4 text-sm">
      <div class="text-muted-foreground">
        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
        {{ Math.min(currentPage * itemsPerPage, filteredData.length) }} of
        {{ filteredData.length }} entries
      </div>
      <div class="flex gap-2 ml-auto">
        <Button
          variant="outline"
          size="sm"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dataTable {
  @apply w-full;

  table {
    @apply border-collapse min-w-full table-auto;
  }

  th {
    @apply font-medium text-muted-foreground sticky top-0 bg-muted/50;
  }

  td {
    @apply align-middle;
  }
}

.formkit-outer {
  @apply mb-0;
}
</style>
