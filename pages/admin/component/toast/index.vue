<script setup>
definePageMeta({
  title: "Toast",
  layout: "admin",
});

const basicCode = `// In your component
const toast = useToast()

// Show a default toast
toast.add({
  title: "Default Toast",
  description: "This is a default toast message"
})

// Show a success toast
toast.add({
  title: "Success",
  description: "Operation completed successfully",
  type: "success"
})

// Show an error toast
toast.add({
  title: "Error",
  description: "Something went wrong",
  type: "error"
})`;

const positionCode = `<template>
  <Toast position="top-right" />
</template>

<script setup>
const toast = useToast()

toast.add({
  title: "Top Right Toast",
  description: "This toast appears in the top right corner"
})
<\/script>`;

const customDurationCode = `const toast = useToast()

toast.add({
  title: "Custom Duration",
  description: "This toast will disappear in 10 seconds",
  duration: 10000 // Duration in milliseconds
})`;

// Example functions to trigger toasts
const showDefaultToast = () => {
  const toast = useToast();
  toast.add({
    title: "Default Toast",
    description: "This is a default toast message",
  });
};

const showSuccessToast = () => {
  const toast = useToast();
  toast.add({
    title: "Success",
    description: "Operation completed successfully",
    type: "success",
  });
};

const showErrorToast = () => {
  const toast = useToast();
  toast.add({
    title: "Error",
    description: "Something went wrong",
    type: "error",
  });
};

const showLongDurationToast = () => {
  const toast = useToast();
  toast.add({
    title: "Long Duration",
    description: "This toast will stay visible for 10 seconds",
    duration: 10000,
  });
};

// Add these functions after other example functions
const showTopRightToast = () => {
  const toast = useToast();
  toast.add({
    title: "Top Right",
    description: "This toast appears in the top right corner",
    position: "top-right",
  });
};


const showTopLeftToast = () => {
  const toast = useToast();
  toast.add({
    title: "Top Left",
    description: "This toast appears in the top left corner",
    position: "top-left",
  });
};

const showBottomLeftToast = () => {
  const toast = useToast();
  toast.add({
    title: "Bottom Left",
    description: "This toast appears in the bottom left corner",
    position: "bottom-left",
  });

};

const showBottomRightToast = () => {
  const toast = useToast();
  toast.add({
    title: "Bottom Right",
    description: "This toast appears in the bottom right corner",
    position: "bottom-right",
  });
};
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Toast</h1>
      <p class="text-gray-600">A notification component that displays brief, temporary messages to users.</p>
    </div>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          Display different types of toast notifications: default, success, and
          error.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6 space-x-4">
          <Button @click="showDefaultToast" variant="primary">Show Default Toast</Button>
          <Button @click="showSuccessToast" variant="success">Show Success Toast</Button>
          <Button @click="showErrorToast" variant="danger">Show Error Toast</Button>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="basicCode" language="javascript" />
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
          Toast notifications can be positioned in different corners of the
          screen. Use the position prop to control where toasts appear.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Button @click="showTopLeftToast" variant="outline">Top Left</Button>
          <Button @click="showTopRightToast" variant="outline">Top Right</Button>
          <Button @click="showBottomLeftToast" variant="outline">Bottom Left</Button>
          <Button @click="showBottomRightToast" variant="outline">Bottom Right</Button>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="positionCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Custom Duration -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Custom Duration</h2>
        </CardTitle>
        <CardDescription>
          Customize how long the toast notification stays visible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Button @click="showLongDurationToast" variant="primary">Show Long Duration Toast</Button>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="customDurationCode" language="javascript" />
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
          <!-- Toast Component Props -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Toast Component Props</h3>
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
                  <TableCell>position</TableCell>
                  <TableCell><code>string</code></TableCell>
                  <TableCell><code>'bottom-right'</code></TableCell>
                  <TableCell
                    >Position of the toast notifications. Options: 'top-left',
                    'top-right', 'bottom-left', 'bottom-right'</TableCell
                  >
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- Toast Options -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Toast Options</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Option</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Default</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>title</TableCell>
                  <TableCell><code>string</code></TableCell>
                  <TableCell>Required</TableCell>
                  <TableCell>The title of the toast notification.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>description</TableCell>
                  <TableCell><code>string</code></TableCell>
                  <TableCell>Required</TableCell>
                  <TableCell
                    >The description or message of the toast
                    notification.</TableCell
                  >
                </TableRow>
                <TableRow>
                  <TableCell>type</TableCell>
                  <TableCell
                    ><code>'default' | 'success' | 'error'</code></TableCell
                  >
                  <TableCell><code>'default'</code></TableCell>
                  <TableCell
                    >The type of toast notification which determines its
                    appearance.</TableCell
                  >
                </TableRow>
                <TableRow>
                  <TableCell>duration</TableCell>
                  <TableCell><code>number</code></TableCell>
                  <TableCell><code>5000</code></TableCell>
                  <TableCell
                    >Duration in milliseconds for which the toast is
                    displayed.</TableCell
                  >
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- Features -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Features</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>Multiple toast types (default, success, error)</li>
              <li>Customizable positioning</li>
              <li>Configurable duration</li>
              <li>Smooth animations</li>
              <li>Auto-dismissal</li>
              <li>Manual dismissal with close button</li>
              <li>Stacked notifications</li>
              <li>Responsive design</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
