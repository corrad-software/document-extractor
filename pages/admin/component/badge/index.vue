<script setup>
definePageMeta({
  title: "Badge",
  layout: "admin",
});

const basicCode = `<Badge>Default Badge</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="ghost">Ghost</Badge>`;

const variantsCode = `<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="ghost">Ghost</Badge>`;

const withIconCode = `<Badge variant="default">
  <Icon name="ri-check-line" class="mr-1 h-3 w-3" />
  Default with Icon
</Badge>
<Badge variant="success">
  <Icon name="ri-check-line" class="mr-1 h-3 w-3" />
  Success with Icon
</Badge>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Badge</h1>
      <p class="text-gray-600">A versatile badge component for displaying status, labels, and counts with various styles.</p>
    </div>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          Basic badge examples showcasing different variants.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap gap-4 mb-6">
          <Badge>Default Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="ghost">Ghost</Badge>
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
          Different badge styles to convey meaning and purpose.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap gap-4 mb-6">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="ghost">Ghost</Badge>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="variantsCode" language="markup" />
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
          Badges can include icons to enhance their meaning.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap items-center gap-4 mb-6">
          <Badge variant="default">
            <Icon name="ri-check-line" class="mr-1 h-3 w-3" />
            Default with Icon
          </Badge>
          <Badge variant="success">
            <Icon name="ri-check-line" class="mr-1 h-3 w-3" />
            Success with Icon
          </Badge>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="withIconCode" language="markup" />
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
          Available props for customizing the Badge component.
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
                <td class="px-6 py-4">'default'</td>
                <td class="px-6 py-4">
                  Style variant (default, secondary, info, success, warning, danger, outline, ghost)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
</template> 