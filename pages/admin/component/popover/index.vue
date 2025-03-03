<script setup>
definePageMeta({
  title: "Popover",
  layout: "admin",
});

const basicCode = `<template>
  <Popover>
    <PopoverTrigger>
      <Button>Click me</Button>
    </PopoverTrigger>
    <PopoverContent>
      <p>This is the popover content.</p>
    </PopoverContent>
  </Popover>
</template>`;

const positionCode = `<template>
  <div class="flex gap-4">
    <Popover>
      <PopoverTrigger>
        <Button>Top</Button>
      </PopoverTrigger>
      <PopoverContent side="top">
        <p>This popover appears on top</p>
      </PopoverContent>
    </Popover>

    <Popover>
      <PopoverTrigger>
        <Button>Right</Button>
      </PopoverTrigger>
      <PopoverContent side="right">
        <p>This popover appears on the right</p>
      </PopoverContent>
    </Popover>

    <Popover>
      <PopoverTrigger>
        <Button>Bottom</Button>
      </PopoverTrigger>
      <PopoverContent side="bottom">
        <p>This popover appears at the bottom</p>
      </PopoverContent>
    </Popover>

    <Popover>
      <PopoverTrigger>
        <Button>Left</Button>
      </PopoverTrigger>
      <PopoverContent side="left">
        <p>This popover appears on the left</p>
      </PopoverContent>
    </Popover>
  </div>
</template>`;

const alignmentCode = `<template>
  <div class="flex gap-4">
    <Popover>
      <PopoverTrigger>
        <Button>Start</Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <p>Aligned to start</p>
      </PopoverContent>
    </Popover>

    <Popover>
      <PopoverTrigger>
        <Button>Center</Button>
      </PopoverTrigger>
      <PopoverContent align="center">
        <p>Aligned to center</p>
      </PopoverContent>
    </Popover>

    <Popover>
      <PopoverTrigger>
        <Button>End</Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <p>Aligned to end</p>
      </PopoverContent>
    </Popover>
  </div>
</template>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Popover</h1>
      <p class="text-gray-600">A popover component that displays floating content when clicking on a trigger element.</p>
    </div>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          A simple popover that appears when clicking a trigger element.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Popover>
            <PopoverTrigger>
              <Button>Click me</Button>
            </PopoverTrigger>
            <PopoverContent>
              <p>This is the popover content.</p>
            </PopoverContent>
          </Popover>
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
          Control the position of the popover relative to its trigger using the side prop.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <div class="flex gap-4">
            <Popover>
              <PopoverTrigger>
                <Button>Top</Button>
              </PopoverTrigger>
              <PopoverContent side="top">
                <p>This popover appears on top</p>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger>
                <Button>Right</Button>
              </PopoverTrigger>
              <PopoverContent side="right">
                <p>This popover appears on the right</p>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger>
                <Button>Bottom</Button>
              </PopoverTrigger>
              <PopoverContent side="bottom">
                <p>This popover appears at the bottom</p>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger>
                <Button>Left</Button>
              </PopoverTrigger>
              <PopoverContent side="left">
                <p>This popover appears on the left</p>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="positionCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Alignment -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Alignment</h2>
        </CardTitle>
        <CardDescription>
          Control how the popover aligns with its trigger using the align prop.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <div class="flex gap-4">
            <Popover>
              <PopoverTrigger>
                <Button>Start</Button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <p>Aligned to start</p>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger>
                <Button>Center</Button>
              </PopoverTrigger>
              <PopoverContent align="center">
                <p>Aligned to center</p>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger>
                <Button>End</Button>
              </PopoverTrigger>
              <PopoverContent align="end">
                <p>Aligned to end</p>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="alignmentCode" language="markup" />
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
          <!-- PopoverContent Props -->
          <div>
            <h3 class="text-lg font-semibold mb-4">PopoverContent Props</h3>
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
                  <TableCell>side</TableCell>
                  <TableCell><code>'top' | 'right' | 'bottom' | 'left'</code></TableCell>
                  <TableCell><code>'bottom'</code></TableCell>
                  <TableCell>The preferred side to place the popover relative to its trigger.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>align</TableCell>
                  <TableCell><code>'start' | 'center' | 'end'</code></TableCell>
                  <TableCell><code>'center'</code></TableCell>
                  <TableCell>The preferred alignment along the trigger element.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>sideOffset</TableCell>
                  <TableCell><code>number</code></TableCell>
                  <TableCell><code>4</code></TableCell>
                  <TableCell>The distance in pixels from the trigger.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>alignOffset</TableCell>
                  <TableCell><code>number</code></TableCell>
                  <TableCell><code>0</code></TableCell>
                  <TableCell>The offset in pixels from the start or end alignment.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- Features -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Features</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>Automatic positioning to stay within viewport</li>
              <li>Smooth animations and transitions</li>
              <li>Click outside to dismiss</li>
              <li>Flexible alignment options</li>
              <li>Customizable offset and spacing</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template> 