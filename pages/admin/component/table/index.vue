<script setup>
definePageMeta({
  title: "Table",
  layout: "admin",
});

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
];

const basicCode = `<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Role</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="user in users" :key="user.id">
        <TableCell>{{ user.name }}</TableCell>
        <TableCell>{{ user.email }}</TableCell>
        <TableCell>{{ user.role }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>`;

const withoutHoverCode = `<template>
  <Table :hover="false">
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Role</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="user in users" :key="user.id">
        <TableCell>{{ user.name }}</TableCell>
        <TableCell>{{ user.email }}</TableCell>
        <TableCell>{{ user.role }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>`;

const customStylingCode = `<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead class="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="user in users" :key="user.id">
        <TableCell class="font-medium">{{ user.name }}</TableCell>
        <TableCell>{{ user.email }}</TableCell>
        <TableCell class="text-right">
          <Button variant="ghost" size="sm">Edit</Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Table</h1>
      <p class="text-gray-600">A responsive table component for displaying tabular data with various styling options.</p>
    </div>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          A simple table with headers and rows.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="user in users" :key="user.id">
                <TableCell>{{ user.name }}</TableCell>
                <TableCell>{{ user.email }}</TableCell>
                <TableCell>{{ user.role }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="basicCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Without Hover -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Without Hover Effect</h2>
        </CardTitle>
        <CardDescription>
          A table without row hover highlighting.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Table :hover="false">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="user in users" :key="user.id">
                <TableCell>{{ user.name }}</TableCell>
                <TableCell>{{ user.email }}</TableCell>
                <TableCell>{{ user.role }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="withoutHoverCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Custom Styling -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Custom Styling</h2>
        </CardTitle>
        <CardDescription>
          Customize table cells with additional classes and content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-[100px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead class="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="user in users" :key="user.id">
                <TableCell class="font-medium">{{ user.name }}</TableCell>
                <TableCell>{{ user.email }}</TableCell>
                <TableCell class="text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="customStylingCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- API Reference -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">API Reference</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-6">
          <!-- Table Props -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Table Props</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Prop</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Default</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>hover</TableCell>
                  <TableCell><code>boolean</code></TableCell>
                  <TableCell><code>true</code></TableCell>
                  <TableCell>Whether to show hover effect on table rows.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- Components -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Components</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Component</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Default Classes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell><code>Table</code></TableCell>
                  <TableCell>Root table component with overflow handling</TableCell>
                  <TableCell><code>w-full overflow-auto</code></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>TableHeader</code></TableCell>
                  <TableCell>Table header container</TableCell>
                  <TableCell><code>bg-muted/50</code></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>TableBody</code></TableCell>
                  <TableCell>Table body container</TableCell>
                  <TableCell><code>[&_tr:last-child]:border-0</code></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>TableRow</code></TableCell>
                  <TableCell>Table row with hover effect</TableCell>
                  <TableCell><code>border-b hover:bg-muted/50</code></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>TableHead</code></TableCell>
                  <TableCell>Table header cell</TableCell>
                  <TableCell><code>h-12 px-4 text-left align-middle</code></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>TableCell</code></TableCell>
                  <TableCell>Table data cell</TableCell>
                  <TableCell><code>px-4 py-2 align-middle</code></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- Features -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Features</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>Responsive design with horizontal scrolling</li>
              <li>Optional row hover states</li>
              <li>Semantic table structure</li>
              <li>Customizable styling for all elements</li>
              <li>Proper cell alignment and spacing</li>
              <li>Support for complex content in cells</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template> 