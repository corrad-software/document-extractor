<script setup>
definePageMeta({
  title: "Alert",
  layout: "admin",
  breadcrumb: [
    {
      name: "Component",
      path: "/admin/component",
    },
    {
      name: "Alert",
      type: "current",
    },
  ],
});

const basicCode = `<Alert>
  <AlertTitle>Default Alert</AlertTitle>
  <AlertDescription>
    This is a default alert — check it out!
  </AlertDescription>
</Alert>`;

const variantsCode = `<Alert variant="default">
  <AlertTitle>Default Alert</AlertTitle>
  <AlertDescription>This is a default alert.</AlertDescription>
</Alert>

<Alert variant="info">
  <AlertTitle>Info Alert</AlertTitle>
  <AlertDescription>This is an info alert.</AlertDescription>
</Alert>

<Alert variant="success">
  <AlertTitle>Success Alert</AlertTitle>
  <AlertDescription>This is a success alert.</AlertDescription>
</Alert>

<Alert variant="warning">
  <AlertTitle>Warning Alert</AlertTitle>
  <AlertDescription>This is a warning alert.</AlertDescription>
</Alert>

<Alert variant="danger">
  <AlertTitle>Danger Alert</AlertTitle>
  <AlertDescription>This is a danger alert.</AlertDescription>
</Alert>`;

const simpleCode = `<Alert variant="info">
  <AlertTitle>Browser Update Available</AlertTitle>
  <AlertDescription>
    A new version of your browser is available. Please update for the best experience.
  </AlertDescription>
</Alert>`;

const customCode = `<Alert variant="success" class="max-w-md">
  <AlertTitle class="flex items-center gap-2">
    <Icon name="ph:check-circle" class="h-5 w-5" />
    Payment Successful
  </AlertTitle>
  <AlertDescription>
    Your payment has been successfully processed. We've sent you a confirmation email.
  </AlertDescription>
</Alert>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Alert</h1>
      <p class="text-gray-600">Displays important messages and feedback to users with various styles and states. Built with accessibility in mind.</p>
    </div>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          A simple alert with title and description.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-4 mb-6">
          <Alert>
            <AlertTitle>Default Alert</AlertTitle>
            <AlertDescription>
              This is a default alert — check it out!
            </AlertDescription>
          </Alert>
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
          Different alert styles to convey various types of messages.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-4 mb-6">
          <Alert variant="default">
            <AlertTitle>Default Alert</AlertTitle>
            <AlertDescription>This is a default alert.</AlertDescription>
          </Alert>
          <Alert variant="info">
            <AlertTitle>Info Alert</AlertTitle>
            <AlertDescription>This is an info alert.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>Success Alert</AlertTitle>
            <AlertDescription>This is a success alert.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>Warning Alert</AlertTitle>
            <AlertDescription>This is a warning alert.</AlertDescription>
          </Alert>
          <Alert variant="danger">
            <AlertTitle>Danger Alert</AlertTitle>
            <AlertDescription>This is a danger alert.</AlertDescription>
          </Alert>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="variantsCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Simple Example -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Simple Example</h2>
        </CardTitle>
        <CardDescription>
          A practical example of using the Alert component.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-4 mb-6">
          <Alert variant="info">
            <AlertTitle>Browser Update Available</AlertTitle>
            <AlertDescription>
              A new version of your browser is available. Please update for the best experience.
            </AlertDescription>
          </Alert>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="simpleCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Custom Example -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Custom Example</h2>
        </CardTitle>
        <CardDescription>
          Customizing the Alert component with icons and additional styling.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-4 mb-6">
          <Alert variant="success" class="max-w-md">
            <AlertTitle class="flex items-center gap-2">
              <Icon name="ph:check-circle" class="h-5 w-5" />
              Payment Successful
            </AlertTitle>
            <AlertDescription>
              Your payment has been successfully processed. We've sent you a confirmation email.
            </AlertDescription>
          </Alert>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="customCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Props Documentation -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Props & Components</h2>
        </CardTitle>
        <CardDescription>
          Available props and subcomponents for building alerts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-xs uppercase bg-muted/50">
              <tr>
                <th class="px-6 py-3">Component</th>
                <th class="px-6 py-3">Prop</th>
                <th class="px-6 py-3">Type</th>
                <th class="px-6 py-3">Default</th>
                <th class="px-6 py-3">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <td class="px-6 py-4 font-medium">Alert</td>
                <td class="px-6 py-4">variant</td>
                <td class="px-6 py-4">string</td>
                <td class="px-6 py-4">'default'</td>
                <td class="px-6 py-4">
                  Alert style variant (default, info, success, warning, danger)
                </td>
              </tr>
              <tr class="border-b">
                <td class="px-6 py-4 font-medium">AlertTitle</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">Title component for the alert</td>
              </tr>
              <tr class="border-b">
                <td class="px-6 py-4 font-medium">AlertDescription</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">Description component for the alert</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
</template> 