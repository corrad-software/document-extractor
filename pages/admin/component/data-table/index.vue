<script setup>
definePageMeta({
  title: "Data Table",
  layout: "admin",
});

// Sample data for examples
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
];

const sampleColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
];

const basicCode = `<DataTable
  :data="[
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' }
  ]"
  :columns="[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ]"
/>`;

const withFiltersCode = `<DataTable
  :data="data"
  :columns="[
    { key: 'name', label: 'Name', sortable: true, filterable: true },
    { key: 'email', label: 'Email', sortable: true, filterable: true },
    { key: 'status', label: 'Status', sortable: true, filterable: true }
  ]"
/>`;

const customCellCode = `<DataTable :data="data" :columns="columns">
  <template #status="{ value }">
    <Badge
      :variant="value === 'Active' ? 'success' : 'secondary'"
    >
      {{ value }}
    </Badge>
  </template>
</DataTable>`;

const columnsWithCustomCell = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
];
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Data Table</h1>
      <p class="text-gray-600">A powerful data table component with sorting, filtering, pagination, and row selection capabilities.</p>
    </div>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          Basic data table example with sortable columns.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <DataTable
            :data="sampleData"
            :columns="sampleColumns"
          />
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="basicCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- With Filters -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">With Filters</h2>
        </CardTitle>
        <CardDescription>
          Data table with column-specific filters.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <DataTable
            :data="sampleData"
            :columns="[
              { key: 'name', label: 'Name', sortable: true, filterable: true },
              { key: 'email', label: 'Email', sortable: true, filterable: true },
              { key: 'status', label: 'Status', sortable: true, filterable: true }
            ]"
          />
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="withFiltersCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Custom Cell Rendering -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Custom Cell Rendering</h2>
        </CardTitle>
        <CardDescription>
          Customize cell content using named slots.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <DataTable
            :data="sampleData"
            :columns="columnsWithCustomCell"
          >
            <template #status="{ value }">
              <Badge
                :variant="value === 'Active' ? 'success' : 'secondary'"
              >
                {{ value }}
              </Badge>
            </template>
          </DataTable>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="customCellCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Props Documentation -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Props</h2>
        </CardTitle>
        <CardDescription>
          Available props for customizing the DataTable component.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-3">Component Props</h3>
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs uppercase bg-muted/50">
                  <tr>
                    <th class="px-6 py-3">Prop</th>
                    <th class="px-6 py-3">Type</th>
                    <th class="px-6 py-3">Default</th>
                    <th class="px-6 py-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b">
                    <td class="px-6 py-4 font-medium">data</td>
                    <td class="px-6 py-4">Array</td>
                    <td class="px-6 py-4">required</td>
                    <td class="px-6 py-4">Array of data objects to display in the table</td>
                  </tr>
                  <tr class="border-b">
                    <td class="px-6 py-4 font-medium">columns</td>
                    <td class="px-6 py-4">Array</td>
                    <td class="px-6 py-4">required</td>
                    <td class="px-6 py-4">Array of column configuration objects</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-3">Column Configuration</h3>
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs uppercase bg-muted/50">
                  <tr>
                    <th class="px-6 py-3">Property</th>
                    <th class="px-6 py-3">Type</th>
                    <th class="px-6 py-3">Default</th>
                    <th class="px-6 py-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b">
                    <td class="px-6 py-4 font-medium">key</td>
                    <td class="px-6 py-4">string</td>
                    <td class="px-6 py-4">required</td>
                    <td class="px-6 py-4">Unique identifier for the column, matches data object property</td>
                  </tr>
                  <tr class="border-b">
                    <td class="px-6 py-4 font-medium">label</td>
                    <td class="px-6 py-4">string</td>
                    <td class="px-6 py-4">required</td>
                    <td class="px-6 py-4">Display label for the column header</td>
                  </tr>
                  <tr class="border-b">
                    <td class="px-6 py-4 font-medium">sortable</td>
                    <td class="px-6 py-4">boolean</td>
                    <td class="px-6 py-4">false</td>
                    <td class="px-6 py-4">Whether the column can be sorted</td>
                  </tr>
                  <tr class="border-b">
                    <td class="px-6 py-4 font-medium">filterable</td>
                    <td class="px-6 py-4">boolean</td>
                    <td class="px-6 py-4">false</td>
                    <td class="px-6 py-4">Whether the column can be filtered</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-3">Slots</h3>
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs uppercase bg-muted/50">
                  <tr>
                    <th class="px-6 py-3">Name</th>
                    <th class="px-6 py-3">Props</th>
                    <th class="px-6 py-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b">
                    <td class="px-6 py-4 font-medium">[column.key]</td>
                    <td class="px-6 py-4">{ row, value }</td>
                    <td class="px-6 py-4">Custom cell content for the specified column</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template> 