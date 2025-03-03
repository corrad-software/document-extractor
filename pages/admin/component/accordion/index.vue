<script setup>
definePageMeta({
  title: "Accordion",
  layout: "admin",
  breadcrumb: [
    {
      name: "Component",
      path: "/admin/component",
    },
    {
      name: "Accordion",
      type: "current",
    },
  ],
});

const basicCode = `<Accordion type="single" defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that match your theme.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

const multipleCode = `<Accordion type="multiple" :defaultValue="['item-1', 'item-2']">
  <AccordionItem value="item-1">
    <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
    <AccordionContent>
      Yes. Just set the type prop to "multiple".
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Can I customize the styles?</AccordionTrigger>
    <AccordionContent>
      Yes. The component accepts custom classes and styles.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Is it animated?</AccordionTrigger>
    <AccordionContent>
      Yes. The content slides smoothly with a transition effect.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

const customCode = `<Accordion type="single" defaultValue="item-1" class="w-full max-w-md">
  <AccordionItem value="item-1">
    <AccordionTrigger class="hover:bg-muted/50 px-4">
      <div class="flex items-center gap-2">
        <Icon name="ph:gear" class="h-5 w-5" />
        <span>Settings</span>
      </div>
    </AccordionTrigger>
    <AccordionContent class="px-4">
      Manage your account settings and preferences.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

const faqCode = `<Accordion type="single" class="w-full max-w-3xl">
  <AccordionItem value="item-1">
    <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
    <AccordionContent>
      We accept all major credit cards, PayPal, and bank transfers.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>How long does shipping take?</AccordionTrigger>
    <AccordionContent>
      Shipping typically takes 3-5 business days for domestic orders.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Accordion</h1>
      <p class="text-gray-600">A vertically stacked set of interactive headings that each reveal a section of content. Built with accessibility and customization in mind.</p>
    </div>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          A simple accordion with single item expansion.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Accordion type="single" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that match your theme.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="basicCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Multiple -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Multiple Items</h2>
        </CardTitle>
        <CardDescription>
          Allow multiple items to be expanded simultaneously.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Accordion type="multiple" :defaultValue="['item-1', 'item-2']">
            <AccordionItem value="item-1">
              <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
              <AccordionContent>
                Yes. Just set the type prop to "multiple".
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I customize the styles?</AccordionTrigger>
              <AccordionContent>
                Yes. The component accepts custom classes and styles.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. The content slides smoothly with a transition effect.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="multipleCode" language="markup" />
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
          Customize the accordion with icons and additional styling.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Accordion type="single" defaultValue="item-1" class="w-full max-w-md">
            <AccordionItem value="item-1">
              <AccordionTrigger class="hover:bg-muted/50 px-4">
                <div class="flex items-center gap-2">
                  <Icon name="ph:gear" class="h-5 w-5" />
                  <span>Settings</span>
                </div>
              </AccordionTrigger>
              <AccordionContent class="px-4">
                Manage your account settings and preferences.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="customCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- FAQ Example -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">FAQ Example</h2>
        </CardTitle>
        <CardDescription>
          Using the accordion for a FAQ section.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Accordion type="single" class="w-full max-w-3xl">
            <AccordionItem value="item-1">
              <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
              <AccordionContent>
                We accept all major credit cards, PayPal, and bank transfers.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How long does shipping take?</AccordionTrigger>
              <AccordionContent>
                Shipping typically takes 3-5 business days for domestic orders.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="faqCode" language="markup" />
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
          Available props and subcomponents for building accordions.
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
                <td class="px-6 py-4 font-medium">Accordion</td>
                <td class="px-6 py-4">type</td>
                <td class="px-6 py-4">string</td>
                <td class="px-6 py-4">'single'</td>
                <td class="px-6 py-4">
                  Type of accordion ('single' or 'multiple')
                </td>
              </tr>
              <tr class="border-b">
                <td class="px-6 py-4 font-medium">Accordion</td>
                <td class="px-6 py-4">defaultValue</td>
                <td class="px-6 py-4">string | array</td>
                <td class="px-6 py-4">''</td>
                <td class="px-6 py-4">
                  Default expanded item(s)
                </td>
              </tr>
              <tr class="border-b">
                <td class="px-6 py-4 font-medium">AccordionItem</td>
                <td class="px-6 py-4">value</td>
                <td class="px-6 py-4">string</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">Unique identifier for the item</td>
              </tr>
              <tr class="border-b">
                <td class="px-6 py-4 font-medium">AccordionTrigger</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">Clickable trigger element</td>
              </tr>
              <tr class="border-b">
                <td class="px-6 py-4 font-medium">AccordionContent</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">-</td>
                <td class="px-6 py-4">Expandable content section</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
</template> 