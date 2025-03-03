<script setup>
definePageMeta({
  title: "Card",
  layout: "admin",
});

const basicCode = `<Card>
  <CardHeader>
    <CardTitle>
      <h1 class="text-2xl font-bold">Card Title</h1>
    </CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    This is the main content of the card.
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`;

const variantsCode = `<Card variant="default">
  <CardHeader>
    <CardTitle>Default Card</CardTitle>
  </CardHeader>
  <CardContent>Default variant content</CardContent>
</Card>

<Card variant="muted">
  <CardHeader>
    <CardTitle>Muted Card</CardTitle>
  </CardHeader>
  <CardContent>Muted variant content</CardContent>
</Card>

<Card variant="accent">
  <CardHeader>
    <CardTitle>Accent Card</CardTitle>
  </CardHeader>
  <CardContent>Accent variant content</CardContent>
</Card>`;

const simpleCode = `<Card>
  <CardHeader>
    <CardTitle>Simple Card</CardTitle>
  </CardHeader>
  <CardContent>
    A simple card with just content
  </CardContent>
</Card>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Card</h1>
      <p class="text-gray-600">A flexible card component for displaying content in a contained format with optional header and footer sections.</p>
    </div>

    <!-- Anatomy -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Anatomy</h2>
        </CardTitle>
        <CardDescription>
          Build your card using these composable components: CardHeader,
          CardTitle, CardDescription, CardContent, and CardFooter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap gap-4 mb-6">
          <Card class="w-full md:w-96">
            <CardHeader>
              <CardTitle> Card Title </CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent> This is the main content of the card. </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>
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
          Different visual styles for the card component.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-4 mb-6">
          <Card variant="default">
            <CardHeader>
              <CardTitle> Default Card </CardTitle>
            </CardHeader>
            <CardContent>Default variant content</CardContent>
          </Card>
          <Card variant="muted">
            <CardHeader>
              <CardTitle> Muted Card </CardTitle>
            </CardHeader>
            <CardContent>Muted variant content</CardContent>
          </Card>
          <Card variant="accent">
            <CardHeader>
              <CardTitle> Accent Card </CardTitle>
            </CardHeader>
            <CardContent>Accent variant content</CardContent>
          </Card>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="variantsCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Simple Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Simple Usage</h2>
        </CardTitle>
        <CardDescription>
          A basic card with header and content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Card>
            <CardHeader>
              <CardTitle> Simple Card </CardTitle>
            </CardHeader>
            <CardContent> A simple card with just content </CardContent>
          </Card>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="simpleCode" language="markup" />
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
          Available props and subcomponents for building cards.
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
                <td class="px-6 py-4 font-medium">Card</td>
                <td class="px-6 py-4">variant</td>
                <td class="px-6 py-4">string</td>
                <td class="px-6 py-4">'default'</td>
                <td class="px-6 py-4">
                  Card style variant (default, muted, accent)
                </td>
              </tr>
              <tr class="border-b">
                <td class="px-6 py-4 font-medium">CardHeader</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">
                  Container for card header with padding (p-6)
                </td>
              </tr>
              <tr class="border-b">
                <td class="px-6 py-4 font-medium">CardContent</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">
                  Container for main content with padding (p-6 pt-0)
                </td>
              </tr>
              <tr class="border-b">
                <td class="px-6 py-4 font-medium">CardTitle</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">Title component for the card</td>
              </tr>
              <tr class="border-b">
                <td class="px-6 py-4 font-medium">CardDescription</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">Description component for the card</td>
              </tr>
              <tr>
                <td class="px-6 py-4 font-medium">CardFooter</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">Container for card footer content</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
