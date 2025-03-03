<script setup>
definePageMeta({
  title: "Breadcrumb",
  layout: "admin",
});

const basicCode = `<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem>Categories</BreadcrumbItem>
</Breadcrumb>`;

const customSeparatorCode = `<Breadcrumb separator=">">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem>Categories</BreadcrumbItem>
</Breadcrumb>

<Breadcrumb separatorIcon="lucide:chevron-right">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem>Categories</BreadcrumbItem>
</Breadcrumb>`;

const disabledItemCode = `<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem disabled>Products</BreadcrumbItem>
  <BreadcrumbItem>Categories</BreadcrumbItem>
</Breadcrumb>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Breadcrumb</h1>
      <p class="text-gray-600">A navigation component that helps users understand their current location within a website's hierarchy.</p>
    </div>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          Basic breadcrumb example showing a simple navigation path.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Breadcrumb>
            <BreadcrumbItem href="#">Home</BreadcrumbItem>
            <BreadcrumbItem href="#">Products</BreadcrumbItem>
            <BreadcrumbItem>Categories</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="basicCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Custom Separators -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Custom Separators</h2>
        </CardTitle>
        <CardDescription>
          Customize the separator between breadcrumb items using text or icons.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4 mb-6">
          <Breadcrumb separator=">">
            <BreadcrumbItem href="#">Home</BreadcrumbItem>
            <BreadcrumbItem href="#">Products</BreadcrumbItem>
            <BreadcrumbItem>Categories</BreadcrumbItem>
          </Breadcrumb>

          <Breadcrumb separatorIcon="lucide:chevron-right">
            <BreadcrumbItem href="#">Home</BreadcrumbItem>
            <BreadcrumbItem href="#">Products</BreadcrumbItem>
            <BreadcrumbItem>Categories</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="customSeparatorCode" language="markup" />
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
          Breadcrumb items can be disabled to indicate non-clickable segments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Breadcrumb>
            <BreadcrumbItem href="#">Home</BreadcrumbItem>
            <BreadcrumbItem disabled>Products</BreadcrumbItem>
            <BreadcrumbItem>Categories</BreadcrumbItem>
          </Breadcrumb>
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
          Available props for customizing the Breadcrumb components.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-3">Breadcrumb Props</h3>
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
                    <td class="px-6 py-4 font-medium">separator</td>
                    <td class="px-6 py-4">string</td>
                    <td class="px-6 py-4">'/'</td>
                    <td class="px-6 py-4">Text separator between breadcrumb items</td>
                  </tr>
                  <tr class="border-b">
                    <td class="px-6 py-4 font-medium">separatorIcon</td>
                    <td class="px-6 py-4">string</td>
                    <td class="px-6 py-4">''</td>
                    <td class="px-6 py-4">Icon name to use as separator (overrides text separator)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-3">BreadcrumbItem Props</h3>
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
                    <td class="px-6 py-4 font-medium">href</td>
                    <td class="px-6 py-4">string</td>
                    <td class="px-6 py-4">''</td>
                    <td class="px-6 py-4">Navigation URL for the breadcrumb item</td>
                  </tr>
                  <tr class="border-b">
                    <td class="px-6 py-4 font-medium">disabled</td>
                    <td class="px-6 py-4">boolean</td>
                    <td class="px-6 py-4">false</td>
                    <td class="px-6 py-4">Whether the breadcrumb item is disabled</td>
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