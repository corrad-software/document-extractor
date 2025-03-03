<script setup>
definePageMeta({
  title: "Dropdown",
  layout: "admin",
});

const basicCode = `<Dropdown>
  <DropdownTrigger>
    <Button>Open Menu</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem @click="handleEdit">Edit</DropdownItem>
    <DropdownItem @click="handleDelete">Delete</DropdownItem>
  </DropdownContent>
</Dropdown>`;

const withIconsCode = `<Dropdown>
  <DropdownTrigger>
    <Button>
      <Icon name="lucide:user" class="mr-2 h-4 w-4" />
      User Menu
    </Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem @click="handleProfile">
      <Icon name="lucide:user" class="mr-2 h-4 w-4" />
      Profile
    </DropdownItem>
    <DropdownItem @click="handleSettings">
      <Icon name="lucide:settings" class="mr-2 h-4 w-4" />
      Settings
    </DropdownItem>
    <DropdownSeparator />
    <DropdownItem @click="handleLogout">
      <Icon name="lucide:log-out" class="mr-2 h-4 w-4" />
      Logout
    </DropdownItem>
  </DropdownContent>
</Dropdown>`;

const withSeparatorCode = `<Dropdown>
  <DropdownTrigger>
    <Button>Actions</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem @click="handleView">View</DropdownItem>
    <DropdownItem @click="handleEdit">Edit</DropdownItem>
    <DropdownSeparator />
    <DropdownItem @click="handleDelete" class="text-danger">Delete</DropdownItem>
  </DropdownContent>
</Dropdown>`;

const disabledItemCode = `<Dropdown>
  <DropdownTrigger>
    <Button>Actions</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem @click="handleEdit">Edit</DropdownItem>
    <DropdownItem disabled>Share (Coming Soon)</DropdownItem>
    <DropdownItem @click="handleDelete">Delete</DropdownItem>
  </DropdownContent>
</Dropdown>`;

// Example handlers for the demo
const handleView = () => console.log('View clicked');
const handleEdit = () => console.log('Edit clicked');
const handleDelete = () => console.log('Delete clicked');
const handleProfile = () => console.log('Profile clicked');
const handleSettings = () => console.log('Settings clicked');
const handleLogout = () => console.log('Logout clicked');
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Dropdown</h1>
      <p class="text-gray-600">A dropdown menu component for displaying a list of actions or options triggered by a button.</p>
    </div>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          Basic dropdown menu with simple items.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Dropdown>
            <DropdownTrigger>
              <Button>Open Menu</Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem @click="handleEdit">Edit</DropdownItem>
              <DropdownItem @click="handleDelete">Delete</DropdownItem>
            </DropdownContent>
          </Dropdown>
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
          Dropdown items with icons for better visual representation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Dropdown>
            <DropdownTrigger>
              <Button>
                <Icon name="lucide:user" class="mr-2 h-4 w-4" />
                User Menu
              </Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem @click="handleProfile">
                <Icon name="lucide:user" class="mr-2 h-4 w-4" />
                Profile
              </DropdownItem>
              <DropdownItem @click="handleSettings">
                <Icon name="lucide:settings" class="mr-2 h-4 w-4" />
                Settings
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem @click="handleLogout">
                <Icon name="lucide:log-out" class="mr-2 h-4 w-4" />
                Logout
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
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
          <Dropdown>
            <DropdownTrigger>
              <Button>Actions</Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem @click="handleView">View</DropdownItem>
              <DropdownItem @click="handleEdit">Edit</DropdownItem>
              <DropdownSeparator />
              <DropdownItem @click="handleDelete" class="text-danger">Delete</DropdownItem>
            </DropdownContent>
          </Dropdown>
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
          <Dropdown>
            <DropdownTrigger>
              <Button>Actions</Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem @click="handleEdit">Edit</DropdownItem>
              <DropdownItem disabled>Share (Coming Soon)</DropdownItem>
              <DropdownItem @click="handleDelete">Delete</DropdownItem>
            </DropdownContent>
          </Dropdown>
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
          Available props for customizing the Dropdown components.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-3">DropdownItem Props</h3>
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