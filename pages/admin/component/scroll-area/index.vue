<script setup>
definePageMeta({
  title: "Scroll Area",
  layout: "admin",
});

const longText = Array(20).fill("This is a long text content that will cause scrolling. ").join("");

const basicCode = `<template>
  <ScrollArea class="h-[200px] w-[350px] rounded-md border p-4">
    <div class="space-y-4">
      <h4 class="text-sm font-medium leading-none">Scrollable Content</h4>
      <p class="text-sm text-muted-foreground">
        This content will scroll with a custom scrollbar.
      </p>
      <!-- Add more content here -->
    </div>
  </ScrollArea>
</template>`;

const typeCode = `<template>
  <div class="grid gap-4 md:grid-cols-2">
    <ScrollArea type="always" class="h-[200px] w-[350px] rounded-md border p-4">
      <p class="text-sm">Scrollbar always visible</p>
      <!-- Content -->
    </ScrollArea>

    <ScrollArea type="scroll" class="h-[200px] w-[350px] rounded-md border p-4">
      <p class="text-sm">Scrollbar visible while scrolling</p>
      <!-- Content -->
    </ScrollArea>

    <ScrollArea type="hover" class="h-[200px] w-[350px] rounded-md border p-4">
      <p class="text-sm">Scrollbar visible on hover</p>
      <!-- Content -->
    </ScrollArea>

    <ScrollArea type="auto" class="h-[200px] w-[350px] rounded-md border p-4">
      <p class="text-sm">Native scrollbar behavior</p>
      <!-- Content -->
    </ScrollArea>
  </div>
</template>`;

const orientationCode = `<template>
  <div class="grid gap-4">
    <ScrollArea orientation="vertical" class="h-[200px] w-[350px] rounded-md border p-4">
      <p class="text-sm">Vertical scrolling only</p>
      <!-- Content -->
    </ScrollArea>

    <ScrollArea orientation="horizontal" class="h-[100px] w-[350px] rounded-md border p-4">
      <div class="flex gap-4 w-[800px]">
        <div v-for="i in 10" :key="i" class="w-[150px] shrink-0">
          <div class="rounded-md border p-4">Item {{ i }}</div>
        </div>
      </div>
    </ScrollArea>

    <ScrollArea orientation="both" class="h-[200px] w-[350px] rounded-md border p-4">
      <div class="w-[800px]">
        <p class="text-sm">Both vertical and horizontal scrolling</p>
        <!-- Content -->
      </div>
    </ScrollArea>
  </div>
</template>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Scroll Area</h1>
      <p class="text-gray-600">A custom scrollable container with a native-like scrollbar design.</p>
    </div>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          A simple scrollable area with a custom scrollbar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <ScrollArea class="h-[200px] w-[350px] rounded-md border p-4">
            <div class="space-y-4">
              <h4 class="text-sm font-medium leading-none">Scrollable Content</h4>
              <p class="text-sm text-muted-foreground">{{ longText }}</p>
            </div>
          </ScrollArea>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="basicCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Scrollbar Types -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Scrollbar Types</h2>
        </CardTitle>
        <CardDescription>
          Different scrollbar visibility behaviors to suit your needs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <div class="grid gap-4 md:grid-cols-2">
            <ScrollArea type="always" class="h-[200px] w-[350px] rounded-md border p-4">
              <p class="text-sm font-medium mb-2">Always Visible</p>
              <p class="text-sm text-muted-foreground">{{ longText }}</p>
            </ScrollArea>

            <ScrollArea type="scroll" class="h-[200px] w-[350px] rounded-md border p-4">
              <p class="text-sm font-medium mb-2">Visible While Scrolling</p>
              <p class="text-sm text-muted-foreground">{{ longText }}</p>
            </ScrollArea>

            <ScrollArea type="hover" class="h-[200px] w-[350px] rounded-md border p-4">
              <p class="text-sm font-medium mb-2">Visible on Hover</p>
              <p class="text-sm text-muted-foreground">{{ longText }}</p>
            </ScrollArea>

            <ScrollArea type="auto" class="h-[200px] w-[350px] rounded-md border p-4">
              <p class="text-sm font-medium mb-2">Native Behavior</p>
              <p class="text-sm text-muted-foreground">{{ longText }}</p>
            </ScrollArea>
          </div>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="typeCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Orientation -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Orientation</h2>
        </CardTitle>
        <CardDescription>
          Control the scroll direction with vertical, horizontal, or both orientations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <div class="grid gap-4">
            <ScrollArea orientation="vertical" class="h-[200px] w-[350px] rounded-md border p-4">
              <p class="text-sm font-medium mb-2">Vertical Scrolling</p>
              <p class="text-sm text-muted-foreground">{{ longText }}</p>
            </ScrollArea>

            <ScrollArea orientation="horizontal" class="h-[100px] w-[350px] rounded-md border p-4">
              <div class="flex gap-4 w-[800px]">
                <div v-for="i in 10" :key="i" class="w-[150px] shrink-0">
                  <div class="rounded-md border p-4">Item {{ i }}</div>
                </div>
              </div>
            </ScrollArea>

            <ScrollArea orientation="both" class="h-[200px] w-[350px] rounded-md border p-4">
              <div class="w-[800px]">
                <p class="text-sm font-medium mb-2">Both Directions</p>
                <p class="text-sm text-muted-foreground">{{ longText }}</p>
              </div>
            </ScrollArea>
          </div>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="orientationCode" language="markup" />
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
          <!-- Props -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Props</h3>
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
                  <TableCell>type</TableCell>
                  <TableCell><code>'always' | 'scroll' | 'hover' | 'auto'</code></TableCell>
                  <TableCell><code>'hover'</code></TableCell>
                  <TableCell>Controls when the scrollbar is visible.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>orientation</TableCell>
                  <TableCell><code>'vertical' | 'horizontal' | 'both'</code></TableCell>
                  <TableCell><code>'vertical'</code></TableCell>
                  <TableCell>The scroll direction to enable.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>scrollHideDelay</TableCell>
                  <TableCell><code>number</code></TableCell>
                  <TableCell><code>600</code></TableCell>
                  <TableCell>Delay in milliseconds before hiding the scrollbar (when type is 'scroll').</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- Features -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Features</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>Custom styled scrollbar</li>
              <li>Multiple visibility modes</li>
              <li>Support for vertical and horizontal scrolling</li>
              <li>Smooth scrolling behavior</li>
              <li>Touch-friendly</li>
              <li>Cross-browser compatibility</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template> 