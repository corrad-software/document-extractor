<script setup>
definePageMeta({
  title: "Button",
  layout: "admin",
});

const basicCode = `<Button>Default Button</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>`;

const variantsCode = `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="info">Info</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="danger">Danger</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>`;

const sizesCode = `<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <Icon name="ri-settings-3-line" />
</Button>`;

const statesCode = `<Button>Default State</Button>
<Button disabled>Disabled</Button>
<Button variant="outline">
  <Icon name="ri-loader-4-line" class="mr-2 animate-spin" />
  Loading
</Button>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Button</h1>
      <p class="text-gray-600">A versatile button component with various styles, sizes, and states. Built with accessibility and customization in mind.</p>
    </div>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          Basic button examples showcasing different variants.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap gap-4 mb-6">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
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
          Different button styles to convey meaning and purpose.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap gap-4 mb-6">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="info">Info</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="variantsCode" language="markup" />
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
          Different button sizes for various use cases.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap items-center gap-4 mb-6">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <Icon name="ri-settings-3-line" />
          </Button>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="sizesCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- States -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">States</h2>
        </CardTitle>
        <CardDescription>
          Button states including disabled and loading states.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap items-center gap-4 mb-6">
          <Button>Default State</Button>
          <Button disabled>Disabled</Button>
          <Button variant="outline">
            <Icon name="ri-loader-4-line" class="mr-2 animate-spin" />
            Loading
          </Button>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="statesCode" language="markup" />
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
          Available props for customizing the Button component.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                <td class="px-6 py-4 font-medium">variant</td>
                <td class="px-6 py-4">string</td>
                <td class="px-6 py-4">'primary'</td>
                <td class="px-6 py-4">
                  Button style variant (primary, secondary, info, success,
                  warning, danger, outline, ghost)
                </td>
              </tr>
              <tr class="border-b">
                <td class="px-6 py-4 font-medium">size</td>
                <td class="px-6 py-4">string</td>
                <td class="px-6 py-4">'default'</td>
                <td class="px-6 py-4">Button size (default, sm, lg, icon)</td>
              </tr>
              <tr class="border-b">
                <td class="px-6 py-4 font-medium">disabled</td>
                <td class="px-6 py-4">boolean</td>
                <td class="px-6 py-4">false</td>
                <td class="px-6 py-4">Whether the button is disabled</td>
              </tr>
              <tr class="border-b">
                <td class="px-6 py-4 font-medium">type</td>
                <td class="px-6 py-4">string</td>
                <td class="px-6 py-4">'button'</td>
                <td class="px-6 py-4">
                  HTML button type (button, submit, reset)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
