<script setup>
definePageMeta({
  title: "Carousel",
  layout: "admin",
});

const basicCode = `<Carousel>
  <CarouselItem>
    <img src="/slide1.jpg" alt="Slide 1" class="w-full h-64 object-cover" />
  </CarouselItem>
  <CarouselItem>
    <img src="/slide2.jpg" alt="Slide 2" class="w-full h-64 object-cover" />
  </CarouselItem>
  <CarouselItem>
    <img src="/slide3.jpg" alt="Slide 3" class="w-full h-64 object-cover" />
  </CarouselItem>
</Carousel>`;

const autoplayCode = `<Carousel :autoplay="true" :interval="3000">
  <CarouselItem>
    <img src="/slide1.jpg" alt="Slide 1" class="w-full h-64 object-cover" />
  </CarouselItem>
  <CarouselItem>
    <img src="/slide2.jpg" alt="Slide 2" class="w-full h-64 object-cover" />
  </CarouselItem>
  <CarouselItem>
    <img src="/slide3.jpg" alt="Slide 3" class="w-full h-64 object-cover" />
  </CarouselItem>
</Carousel>`;

const controlsCode = `<Carousel :controls="false" :indicators="false">
  <CarouselItem>
    <img src="/slide1.jpg" alt="Slide 1" class="w-full h-64 object-cover" />
  </CarouselItem>
  <CarouselItem>
    <img src="/slide2.jpg" alt="Slide 2" class="w-full h-64 object-cover" />
  </CarouselItem>
  <CarouselItem>
    <img src="/slide3.jpg" alt="Slide 3" class="w-full h-64 object-cover" />
  </CarouselItem>
</Carousel>`;

const customContentCode = `<Carousel>
  <CarouselItem>
    <div class="relative h-64 bg-primary/10 flex items-center justify-center">
      <div class="text-center">
        <h3 class="text-2xl font-bold">Custom Slide 1</h3>
        <p class="mt-2">Add any content you want</p>
      </div>
    </div>
  </CarouselItem>
  <CarouselItem>
    <div class="relative h-64 bg-secondary/10 flex items-center justify-center">
      <div class="text-center">
        <h3 class="text-2xl font-bold">Custom Slide 2</h3>
        <p class="mt-2">Not just limited to images</p>
      </div>
    </div>
  </CarouselItem>
</Carousel>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Carousel</h1>
      <p class="text-gray-600">A carousel component for cycling through elements, with support for navigation and indicators.</p>
    </div>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          Basic carousel example with default settings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Carousel>
            <CarouselItem>
              <div class="relative h-64 bg-primary/10 flex items-center justify-center">
                <div class="text-center">
                  <h3 class="text-2xl font-bold">Slide 1</h3>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div class="relative h-64 bg-secondary/10 flex items-center justify-center">
                <div class="text-center">
                  <h3 class="text-2xl font-bold">Slide 2</h3>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div class="relative h-64 bg-info/10 flex items-center justify-center">
                <div class="text-center">
                  <h3 class="text-2xl font-bold">Slide 3</h3>
                </div>
              </div>
            </CarouselItem>
          </Carousel>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="basicCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Autoplay -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Autoplay</h2>
        </CardTitle>
        <CardDescription>
          Carousel with autoplay enabled and custom interval.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Carousel :autoplay="true" :interval="3000">
            <CarouselItem>
              <div class="relative h-64 bg-primary/10 flex items-center justify-center">
                <div class="text-center">
                  <h3 class="text-2xl font-bold">Auto Slide 1</h3>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div class="relative h-64 bg-secondary/10 flex items-center justify-center">
                <div class="text-center">
                  <h3 class="text-2xl font-bold">Auto Slide 2</h3>
                </div>
              </div>
            </CarouselItem>
          </Carousel>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="autoplayCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Controls -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Controls</h2>
        </CardTitle>
        <CardDescription>
          Customize the visibility of controls and indicators.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Carousel :controls="false" :indicators="false">
            <CarouselItem>
              <div class="relative h-64 bg-primary/10 flex items-center justify-center">
                <div class="text-center">
                  <h3 class="text-2xl font-bold">No Controls Slide 1</h3>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div class="relative h-64 bg-secondary/10 flex items-center justify-center">
                <div class="text-center">
                  <h3 class="text-2xl font-bold">No Controls Slide 2</h3>
                </div>
              </div>
            </CarouselItem>
          </Carousel>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="controlsCode" language="markup" />
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
          Add any custom content to carousel slides.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Carousel>
            <CarouselItem>
              <div class="relative h-64 bg-primary/10 flex items-center justify-center">
                <div class="text-center">
                  <h3 class="text-2xl font-bold">Custom Slide 1</h3>
                  <p class="mt-2">Add any content you want</p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div class="relative h-64 bg-secondary/10 flex items-center justify-center">
                <div class="text-center">
                  <h3 class="text-2xl font-bold">Custom Slide 2</h3>
                  <p class="mt-2">Not just limited to images</p>
                </div>
              </div>
            </CarouselItem>
          </Carousel>
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
          Available props for customizing the Carousel component.
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
                <td class="px-6 py-4 font-medium">autoplay</td>
                <td class="px-6 py-4">boolean</td>
                <td class="px-6 py-4">false</td>
                <td class="px-6 py-4">Enable automatic slide transitions</td>
              </tr>
              <tr class="border-b">
                <td class="px-6 py-4 font-medium">interval</td>
                <td class="px-6 py-4">number</td>
                <td class="px-6 py-4">5000</td>
                <td class="px-6 py-4">Time between slide transitions (in milliseconds)</td>
              </tr>
              <tr class="border-b">
                <td class="px-6 py-4 font-medium">wrap</td>
                <td class="px-6 py-4">boolean</td>
                <td class="px-6 py-4">true</td>
                <td class="px-6 py-4">Whether to wrap around to the first slide after the last</td>
              </tr>
              <tr class="border-b">
                <td class="px-6 py-4 font-medium">controls</td>
                <td class="px-6 py-4">boolean</td>
                <td class="px-6 py-4">true</td>
                <td class="px-6 py-4">Show navigation arrows</td>
              </tr>
              <tr class="border-b">
                <td class="px-6 py-4 font-medium">indicators</td>
                <td class="px-6 py-4">boolean</td>
                <td class="px-6 py-4">true</td>
                <td class="px-6 py-4">Show slide indicators</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
</template> 