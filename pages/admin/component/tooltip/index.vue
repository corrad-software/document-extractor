<script setup>
definePageMeta({
  title: "Tooltip",
  layout: "admin",
});

const basicCode = `<template>
  <Tooltip>
    <TooltipTrigger>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      Add to library
    </TooltipContent>
  </Tooltip>
</template>`;

const positionCode = `<template>
  <div class="flex items-center gap-4">
    <Tooltip side="top">
      <TooltipTrigger>
        <Button variant="outline">Top</Button>
      </TooltipTrigger>
      <TooltipContent>
        Tooltip on top
      </TooltipContent>
    </Tooltip>

    <Tooltip side="right">
      <TooltipTrigger>
        <Button variant="outline">Right</Button>
      </TooltipTrigger>
      <TooltipContent>
        Tooltip on right
      </TooltipContent>
    </Tooltip>

    <Tooltip side="bottom">
      <TooltipTrigger>
        <Button variant="outline">Bottom</Button>
      </TooltipTrigger>
      <TooltipContent>
        Tooltip on bottom
      </TooltipContent>
    </Tooltip>

    <Tooltip side="left">
      <TooltipTrigger>
        <Button variant="outline">Left</Button>
      </TooltipTrigger>
      <TooltipContent>
        Tooltip on left
      </TooltipContent>
    </Tooltip>
  </div>
</template>`;

const delayCode = `<template>
  <Tooltip :delayDuration="700">
    <TooltipTrigger>
      <Button variant="outline">Hover with Delay</Button>
    </TooltipTrigger>
    <TooltipContent>
      Tooltip with custom delay
    </TooltipContent>
  </Tooltip>
</template>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Tooltip</h1>
      <p class="text-gray-600">A popup component that displays informative text when users hover over or focus on an element.</p>
    </div>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          A simple tooltip that appears on hover or focus.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex justify-center mb-6">
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent> Add to library </TooltipContent>
          </Tooltip>
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
          Tooltips can be positioned on any side of the trigger element.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <div class="flex items-center gap-4">
            <Tooltip side="top">
              <TooltipTrigger>
                <Button variant="outline">Top</Button>
              </TooltipTrigger>
              <TooltipContent> Tooltip on top </TooltipContent>
            </Tooltip>

            <Tooltip side="right">
              <TooltipTrigger>
                <Button variant="outline">Right</Button>
              </TooltipTrigger>
              <TooltipContent> Tooltip on right </TooltipContent>
            </Tooltip>

            <Tooltip side="bottom">
              <TooltipTrigger>
                <Button variant="outline">Bottom</Button>
              </TooltipTrigger>
              <TooltipContent> Tooltip on bottom </TooltipContent>
            </Tooltip>

            <Tooltip side="left">
              <TooltipTrigger>
                <Button variant="outline">Left</Button>
              </TooltipTrigger>
              <TooltipContent> Tooltip on left </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="positionCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Custom Delay -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Custom Delay</h2>
        </CardTitle>
        <CardDescription>
          Customize the delay before showing and hiding the tooltip.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Tooltip :delayDuration="700">
            <TooltipTrigger>
              <Button variant="outline">Hover with Delay</Button>
            </TooltipTrigger>
            <TooltipContent> Tooltip with custom delay </TooltipContent>
          </Tooltip>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="delayCode" language="markup" />
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
          <!-- Tooltip Props -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Tooltip Props</h3>
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
                  <TableCell
                    ><code>'top' | 'right' | 'bottom' | 'left'</code></TableCell
                  >
                  <TableCell><code>'top'</code></TableCell>
                  <TableCell
                    >The preferred side of the trigger to render the
                    tooltip.</TableCell
                  >
                </TableRow>
                <TableRow>
                  <TableCell>delayDuration</TableCell>
                  <TableCell><code>number</code></TableCell>
                  <TableCell><code>200</code></TableCell>
                  <TableCell
                    >The delay duration in milliseconds before showing the
                    tooltip.</TableCell
                  >
                </TableRow>
                <TableRow>
                  <TableCell>skipDelayDuration</TableCell>
                  <TableCell><code>number</code></TableCell>
                  <TableCell><code>300</code></TableCell>
                  <TableCell
                    >The delay duration in milliseconds before hiding the
                    tooltip.</TableCell
                  >
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- TooltipContent Props -->
          <div>
            <h3 class="text-lg font-semibold mb-4">TooltipContent Props</h3>
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
                  <TableCell
                    ><code>'top' | 'right' | 'bottom' | 'left'</code></TableCell
                  >
                  <TableCell><code>'top'</code></TableCell>
                  <TableCell
                    >The side of the trigger to render the tooltip.</TableCell
                  >
                </TableRow>
                <TableRow>
                  <TableCell>sideOffset</TableCell>
                  <TableCell><code>number</code></TableCell>
                  <TableCell><code>4</code></TableCell>
                  <TableCell
                    >The distance in pixels from the trigger.</TableCell
                  >
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- Features -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Features</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>Customizable positioning</li>
              <li>Configurable show/hide delays</li>
              <li>Automatic positioning with floating-ui</li>
              <li>Keyboard focus support</li>
              <li>Mouse hover support</li>
              <li>Smooth animations</li>
              <li>Arrow indicator</li>
              <li>Accessible by default</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
