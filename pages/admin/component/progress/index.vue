<script setup>
definePageMeta({
  title: "Progress",
  layout: "admin",
});

const value = ref(45);

// Simulate progress for animated example
const animatedValue = ref(0);
onMounted(() => {
  const interval = setInterval(() => {
    animatedValue.value = (animatedValue.value + 1) % 101;
  }, 100);
  onBeforeUnmount(() => clearInterval(interval));
});

const basicCode = `<template>
  <Progress :value="45" />
</template>`;

const sizesCode = `<template>
  <div class="space-y-4">
    <Progress :value="45" size="sm" />
    <Progress :value="45" size="default" />
    <Progress :value="45" size="lg" />
  </div>
</template>`;

const variantsCode = `<template>
  <div class="space-y-4">
    <Progress :value="45" variant="default" />
    <Progress :value="45" variant="success" />
    <Progress :value="45" variant="info" />
    <Progress :value="45" variant="warning" />
    <Progress :value="45" variant="danger" />
  </div>
</template>`;

const showValueCode = `<template>
  <Progress :value="45" :showValue="true" />
</template>`;

const stripedCode = `<template>
  <div class="space-y-4">
    <Progress :value="45" :striped="true" />
    <Progress :value="45" :striped="true" :animated="true" />
  </div>
</template>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Progress</h1>
      <p class="text-gray-600">A progress indicator component that displays the completion status of a task or process.</p>
    </div>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          A simple progress bar with a default style.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Progress :value="value" />
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="basicCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Sizes -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Sizes</h2>
        </CardTitle>
        <CardDescription>
          Progress bars are available in three sizes: small, default, and large.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6 space-y-4">
          <Progress :value="value" size="sm" />
          <Progress :value="value" size="default" />
          <Progress :value="value" size="lg" />
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="sizesCode" language="markup" />
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
          Different color variants to indicate various states or types of progress.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6 space-y-4">
          <Progress :value="value" variant="default" />
          <Progress :value="value" variant="success" />
          <Progress :value="value" variant="info" />
          <Progress :value="value" variant="warning" />
          <Progress :value="value" variant="danger" />
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="variantsCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Show Value -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Show Value</h2>
        </CardTitle>
        <CardDescription>
          Display the current progress value as a percentage.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Progress :value="value" :showValue="true" />
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="showValueCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Striped and Animated -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Striped and Animated</h2>
        </CardTitle>
        <CardDescription>
          Add stripes and animation to make the progress bar more dynamic.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6 space-y-4">
          <Progress :value="value" :striped="true" />
          <Progress :value="animatedValue" :striped="true" :animated="true" />
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="stripedCode" language="markup" />
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
                  <TableCell>value</TableCell>
                  <TableCell><code>number</code></TableCell>
                  <TableCell>Required</TableCell>
                  <TableCell>The current progress value (0-100).</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>size</TableCell>
                  <TableCell><code>'sm' | 'default' | 'lg'</code></TableCell>
                  <TableCell><code>'default'</code></TableCell>
                  <TableCell>The size of the progress bar.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>showValue</TableCell>
                  <TableCell><code>boolean</code></TableCell>
                  <TableCell><code>false</code></TableCell>
                  <TableCell>Whether to show the progress value as a percentage.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>variant</TableCell>
                  <TableCell><code>'default' | 'success' | 'info' | 'warning' | 'danger'</code></TableCell>
                  <TableCell><code>'default'</code></TableCell>
                  <TableCell>The color variant of the progress bar.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>animated</TableCell>
                  <TableCell><code>boolean</code></TableCell>
                  <TableCell><code>true</code></TableCell>
                  <TableCell>Whether to animate the progress bar when the value changes.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>striped</TableCell>
                  <TableCell><code>boolean</code></TableCell>
                  <TableCell><code>false</code></TableCell>
                  <TableCell>Whether to show a striped pattern on the progress bar.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- Features -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Features</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>Multiple size options</li>
              <li>Color variants for different states</li>
              <li>Optional value display</li>
              <li>Striped pattern support</li>
              <li>Smooth animations</li>
              <li>ARIA attributes for accessibility</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template> 