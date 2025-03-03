<script setup>
definePageMeta({
  title: "Hover Card",
  layout: "admin",
});

const basicCode = `<HoverCard>
  <HoverCardTrigger>
    <Button variant="ghost">@johndoe</Button>
  </HoverCardTrigger>
  <HoverCardContent>
    <div class="flex justify-between space-x-4">
      <Avatar src="/avatar.jpg" alt="John Doe" />
      <div class="space-y-1">
        <h4 class="text-sm font-semibold">John Doe</h4>
        <p class="text-sm">Software developer and open source contributor.</p>
        <div class="flex items-center pt-2">
          <Icon name="lucide:users" class="mr-2 h-4 w-4 opacity-70" />
          <span class="text-xs text-muted-foreground">Joined December 2023</span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`;

const positionCode = `<HoverCard>
  <HoverCardTrigger>
    <Button variant="ghost">Hover Me</Button>
  </HoverCardTrigger>
  <HoverCardContent side="right" align="start">
    <p class="text-sm">This card appears on the right side.</p>
  </HoverCardContent>
</HoverCard>`;

const delayCode = `<HoverCard>
  <HoverCardTrigger :delay="500">
    <Button variant="ghost">Hover Me (500ms delay)</Button>
  </HoverCardTrigger>
  <HoverCardContent>
    <p class="text-sm">This card appears after a 500ms delay.</p>
  </HoverCardContent>
</HoverCard>`;

const customContentCode = `<HoverCard>
  <HoverCardTrigger>
    <Button variant="ghost">Product Info</Button>
  </HoverCardTrigger>
  <HoverCardContent class="w-80">
    <div class="flex flex-col space-y-2">
      <img src="/product.jpg" alt="Product" class="rounded-lg" />
      <h4 class="text-sm font-semibold">Premium Widget</h4>
      <p class="text-sm text-muted-foreground">
        High-quality widget with premium features and lifetime support.
      </p>
      <div class="flex justify-between items-center pt-2">
        <span class="text-sm font-bold">$99.99</span>
        <Badge variant="secondary">In Stock</Badge>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Hover Card</h1>
      <p class="text-gray-600">A card that appears when hovering over an element, perfect for displaying additional information.</p>
    </div>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          Basic hover card example showing user profile preview.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <HoverCard>
            <HoverCardTrigger>
              <Button variant="ghost">@johndoe</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div class="flex justify-between space-x-4">
                <Avatar src="/avatar.jpg" alt="John Doe" />
                <div class="space-y-1">
                  <h4 class="text-sm font-semibold">John Doe</h4>
                  <p class="text-sm">Software developer and open source contributor.</p>
                  <div class="flex items-center pt-2">
                    <Icon name="lucide:users" class="mr-2 h-4 w-4 opacity-70" />
                    <span class="text-xs text-muted-foreground">Joined December 2023</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="basicCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Positioning -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Positioning</h2>
        </CardTitle>
        <CardDescription>
          Control the position and alignment of the hover card.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6 space-x-4">
          <HoverCard>
            <HoverCardTrigger>
              <Button variant="ghost">Hover Me</Button>
            </HoverCardTrigger>
            <HoverCardContent side="right" align="start">
              <p class="text-sm">This card appears on the right side.</p>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="positionCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Delay -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Open Delay</h2>
        </CardTitle>
        <CardDescription>
          Add a delay before the hover card appears.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <HoverCard>
            <HoverCardTrigger :delay="500">
              <Button variant="ghost">Hover Me (500ms delay)</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <p class="text-sm">This card appears after a 500ms delay.</p>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="delayCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Custom Content -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Custom Content</h2>
        </CardTitle>
        <CardDescription>
          Add rich, custom content to your hover cards.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <HoverCard>
            <HoverCardTrigger>
              <Button variant="ghost">Product Info</Button>
            </HoverCardTrigger>
            <HoverCardContent class="w-80">
              <div class="flex flex-col space-y-2">
                <div class="h-32 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name="lucide:package" class="h-12 w-12 text-muted-foreground" />
                </div>
                <h4 class="text-sm font-semibold">Premium Widget</h4>
                <p class="text-sm text-muted-foreground">
                  High-quality widget with premium features and lifetime support.
                </p>
                <div class="flex justify-between items-center pt-2">
                  <span class="text-sm font-bold">$99.99</span>
                  <Badge variant="secondary">In Stock</Badge>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="customContentCode" language="markup" />
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
          Available props for customizing the HoverCard components.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-3">HoverCardTrigger Props</h3>
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
                    <td class="px-6 py-4 font-medium">delay</td>
                    <td class="px-6 py-4">number</td>
                    <td class="px-6 py-4">200</td>
                    <td class="px-6 py-4">Delay in milliseconds before showing the hover card</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-3">HoverCardContent Props</h3>
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
                    <td class="px-6 py-4 font-medium">side</td>
                    <td class="px-6 py-4">string</td>
                    <td class="px-6 py-4">'bottom'</td>
                    <td class="px-6 py-4">Position of the hover card (top, right, bottom, left)</td>
                  </tr>
                  <tr class="border-b">
                    <td class="px-6 py-4 font-medium">align</td>
                    <td class="px-6 py-4">string</td>
                    <td class="px-6 py-4">'center'</td>
                    <td class="px-6 py-4">Alignment of the hover card (start, center, end)</td>
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