<script setup>
definePageMeta({
  title: "Skeleton",
  layout: "admin",
});

const basicCode = `<template>
  <Skeleton class="w-[100px]" />
</template>`;

const variantsCode = `<template>
  <div class="space-y-4">
    <Skeleton variant="default" />
    <Skeleton variant="card" />
    <Skeleton variant="avatar" />
    <Skeleton variant="title" />
    <Skeleton variant="text" />
  </div>
</template>`;

const cardExampleCode = `<template>
  <Card>
    <CardHeader class="gap-2">
      <Skeleton variant="avatar" class="h-12 w-12" />
      <div class="space-y-2">
        <Skeleton variant="title" class="h-4 w-[250px]" />
        <Skeleton variant="text" class="h-4 w-[200px]" />
      </div>
    </CardHeader>
    <CardContent class="space-y-2">
      <Skeleton variant="text" class="h-4" />
      <Skeleton variant="text" class="h-4" />
      <Skeleton variant="text" class="h-4 w-2/3" />
    </CardContent>
  </Card>
</template>`;

const customCode = `<template>
  <div class="space-y-4">
    <Skeleton class="h-8 w-[300px] rounded-full" />
    <Skeleton :animate="false" class="h-20 w-20 rounded-lg" />
    <Skeleton class="h-4 w-full rounded-sm" />
  </div>
</template>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Skeleton</h1>
      <p class="text-gray-600">A placeholder loading state that mimics the shape of the content that will be loaded.</p>
    </div>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          A simple skeleton loader with a custom width.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Skeleton class="w-[100px]" />
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="basicCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Variants -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Variants</h2>
        </CardTitle>
        <CardDescription>
          Different predefined variants for common use cases.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <div class="w-16">Default:</div>
              <Skeleton variant="default" />
            </div>
            <div class="flex items-center gap-2">
              <div class="w-16">Card:</div>
              <Skeleton variant="card" />
            </div>
            <div class="flex items-center gap-2">
              <div class="w-16">Avatar:</div>
              <Skeleton variant="avatar" />
            </div>
            <div class="flex items-center gap-2">
              <div class="w-16">Title:</div>
              <Skeleton variant="title" />
            </div>
            <div class="flex items-center gap-2">
              <div class="w-16">Text:</div>
              <Skeleton variant="text" />
            </div>
          </div>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="variantsCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Card Example -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Card Example</h2>
        </CardTitle>
        <CardDescription>
          A common use case showing a loading card with multiple skeleton elements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Card>
            <CardHeader class="gap-2">
              <Skeleton variant="avatar" class="h-12 w-12" />
              <div class="space-y-2">
                <Skeleton variant="title" class="h-4 w-[250px]" />
                <Skeleton variant="text" class="h-4 w-[200px]" />
              </div>
            </CardHeader>
            <CardContent class="space-y-2">
              <Skeleton variant="text" class="h-4" />
              <Skeleton variant="text" class="h-4" />
              <Skeleton variant="text" class="h-4 w-2/3" />
            </CardContent>
          </Card>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="cardExampleCode" language="markup" />
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
          Customize the appearance and behavior of skeleton loaders.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <div class="space-y-4">
            <Skeleton class="h-8 w-[300px] rounded-full" />
            <Skeleton :animate="false" class="h-20 w-20 rounded-lg" />
            <Skeleton class="h-4 w-full rounded-sm" />
          </div>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="customCode" language="markup" />
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
                  <TableCell>className</TableCell>
                  <TableCell><code>string</code></TableCell>
                  <TableCell><code>''</code></TableCell>
                  <TableCell>Additional CSS classes to apply to the skeleton.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>variant</TableCell>
                  <TableCell><code>'default' | 'card' | 'avatar' | 'title' | 'text'</code></TableCell>
                  <TableCell><code>'default'</code></TableCell>
                  <TableCell>Predefined variants with different sizes and shapes.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>animate</TableCell>
                  <TableCell><code>boolean</code></TableCell>
                  <TableCell><code>true</code></TableCell>
                  <TableCell>Whether to show the pulsing animation.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- Variants -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Variant Styles</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Variant</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Default Styles</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>default</TableCell>
                  <TableCell>Basic skeleton loader</TableCell>
                  <TableCell><code>h-4 w-full rounded-lg</code></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>card</TableCell>
                  <TableCell>Card placeholder</TableCell>
                  <TableCell><code>h-48 w-full rounded-lg</code></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>avatar</TableCell>
                  <TableCell>Circular avatar placeholder</TableCell>
                  <TableCell><code>h-12 w-12 rounded-full</code></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>title</TableCell>
                  <TableCell>Title text placeholder</TableCell>
                  <TableCell><code>h-4 w-1/4 rounded-lg</code></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>text</TableCell>
                  <TableCell>Body text placeholder</TableCell>
                  <TableCell><code>h-4 w-full rounded-lg</code></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- Features -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Features</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>Predefined variants for common use cases</li>
              <li>Smooth pulsing animation</li>
              <li>Customizable dimensions and styling</li>
              <li>Optional animation control</li>
              <li>Responsive design support</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template> 