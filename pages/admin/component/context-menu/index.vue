<script setup>
definePageMeta({
  title: "Context Menu",
  layout: "admin",
});

const basicCode = `<ContextMenu>
  <div class="h-32 w-full border rounded flex items-center justify-center">
    Right click here
  </div>
  <ContextMenuContent>
    <ContextMenuItem @click="handleEdit">Edit</ContextMenuItem>
    <ContextMenuItem @click="handleDelete">Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`;

const withIconsCode = `<ContextMenu>
  <div class="h-32 w-full border rounded flex items-center justify-center">
    Right click here
  </div>
  <ContextMenuContent>
    <ContextMenuItem @click="handleEdit">
      <Icon name="lucide:pencil" class="mr-2 h-4 w-4" />
      Edit
    </ContextMenuItem>
    <ContextMenuItem @click="handleDelete">
      <Icon name="lucide:trash" class="mr-2 h-4 w-4" />
      Delete
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`;

const withSeparatorCode = `<ContextMenu>
  <div class="h-32 w-full border rounded flex items-center justify-center">
    Right click here
  </div>
  <ContextMenuContent>
    <ContextMenuItem @click="handleView">View</ContextMenuItem>
    <ContextMenuItem @click="handleEdit">Edit</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem @click="handleDelete" class="text-danger">Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`;

const disabledItemCode = `<ContextMenu>
  <div class="h-32 w-full border rounded flex items-center justify-center">
    Right click here
  </div>
  <ContextMenuContent>
    <ContextMenuItem @click="handleEdit">Edit</ContextMenuItem>
    <ContextMenuItem disabled>Share (Coming Soon)</ContextMenuItem>
    <ContextMenuItem @click="handleDelete">Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`;

// Example handlers for the demo
const handleView = () => console.log('View clicked');
const handleEdit = () => console.log('Edit clicked');
const handleDelete = () => console.log('Delete clicked');
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Context Menu</h1>
      <p class="text-gray-600">A context menu component that displays a menu when right-clicking or long-pressing an element.</p>
    </div>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          Basic context menu example with simple menu items.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <ContextMenu>
            <div class="h-32 w-full border rounded flex items-center justify-center">
              Right click here
            </div>
            <ContextMenuContent>
              <ContextMenuItem @click="handleEdit">Edit</ContextMenuItem>
              <ContextMenuItem @click="handleDelete">Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="basicCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- With Icons -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">With Icons</h2>
        </CardTitle>
        <CardDescription>
          Context menu items with icons for better visual representation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <ContextMenu>
            <div class="h-32 w-full border rounded flex items-center justify-center">
              Right click here
            </div>
            <ContextMenuContent>
              <ContextMenuItem @click="handleEdit">
                <Icon name="lucide:pencil" class="mr-2 h-4 w-4" />
                Edit
              </ContextMenuItem>
              <ContextMenuItem @click="handleDelete">
                <Icon name="lucide:trash" class="mr-2 h-4 w-4" />
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="withIconsCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- With Separator -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">With Separator</h2>
        </CardTitle>
        <CardDescription>
          Group related menu items using separators.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <ContextMenu>
            <div class="h-32 w-full border rounded flex items-center justify-center">
              Right click here
            </div>
            <ContextMenuContent>
              <ContextMenuItem @click="handleView">View</ContextMenuItem>
              <ContextMenuItem @click="handleEdit">Edit</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem @click="handleDelete" class="text-danger">Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="withSeparatorCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Disabled Items -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Disabled Items</h2>
        </CardTitle>
        <CardDescription>
          Display disabled menu items for unavailable actions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <ContextMenu>
            <div class="h-32 w-full border rounded flex items-center justify-center">
              Right click here
            </div>
            <ContextMenuContent>
              <ContextMenuItem @click="handleEdit">Edit</ContextMenuItem>
              <ContextMenuItem disabled>Share (Coming Soon)</ContextMenuItem>
              <ContextMenuItem @click="handleDelete">Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="disabledItemCode" language="markup" />
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
          Available props for customizing the ContextMenu components.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-3">ContextMenuItem Props</h3>
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
                    <td class="px-6 py-4 font-medium">disabled</td>
                    <td class="px-6 py-4">boolean</td>
                    <td class="px-6 py-4">false</td>
                    <td class="px-6 py-4">Whether the menu item is disabled</td>
                  </tr>
                  <tr class="border-b">
                    <td class="px-6 py-4 font-medium">inset</td>
                    <td class="px-6 py-4">boolean</td>
                    <td class="px-6 py-4">false</td>
                    <td class="px-6 py-4">Adds left padding to align with items that have icons</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-3">Events</h3>
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs uppercase bg-muted/50">
                  <tr>
                    <th class="px-6 py-3">Event</th>
                    <th class="px-6 py-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b">
                    <td class="px-6 py-4 font-medium">@click</td>
                    <td class="px-6 py-4">Emitted when a menu item is clicked (not emitted if disabled)</td>
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