<script setup>
definePageMeta({
  title: "Stepper",
  layout: "admin",
});

const currentStep = ref(1);
const currentFormStep = ref(1);

const basicCode = `<template>
  <Stepper v-model="currentStep">
    <StepperItem :step="1">
      <StepperTrigger :step="1">
        <StepperIndicator :step="1">
          <Icon v-if="currentStep > 1" name="ph:check" class="h-4 w-4" />
          <span v-else>1</span>
        </StepperIndicator>
        <div class="flex flex-col gap-0.5">
          <StepperTitle>Step 1</StepperTitle>
          <StepperDescription>Personal Information</StepperDescription>
        </div>
      </StepperTrigger>
      <StepperSeparator :class="{ 'bg-primary': currentStep > 1 }" />
    </StepperItem>
    <StepperItem :step="2">
      <StepperTrigger :step="2">
        <StepperIndicator :step="2">
          <Icon v-if="currentStep > 2" name="ph:check" class="h-4 w-4" />
          <span v-else>2</span>
        </StepperIndicator>
        <div class="flex flex-col gap-0.5">
          <StepperTitle>Step 2</StepperTitle>
          <StepperDescription>Address Information</StepperDescription>
        </div>
      </StepperTrigger>
      <StepperSeparator :class="{ 'bg-primary': currentStep > 2 }" />
    </StepperItem>
    <StepperItem :step="3">
      <StepperTrigger :step="3">
        <StepperIndicator :step="3">
          <Icon v-if="currentStep > 3" name="ph:check" class="h-4 w-4" />
          <span v-else>3</span>
        </StepperIndicator>
        <div class="flex flex-col gap-0.5">
          <StepperTitle>Step 3</StepperTitle>
          <StepperDescription>Review & Submit</StepperDescription>
        </div>
      </StepperTrigger>
    </StepperItem>
  </Stepper>
</template>

<script setup>
const currentStep = ref(1);
<\/script>`;

const orientationCode = `<template>
  <div class="grid gap-8 md:grid-cols-2">
    <!-- Horizontal Stepper -->
    <div>
      <h3 class="text-sm font-medium mb-4">Horizontal</h3>
      <Stepper v-model="currentStep">
        <StepperItem :step="1">
          <StepperTrigger :step="1">
            <StepperIndicator :step="1">
              <Icon v-if="currentStep > 1" name="ph:check" class="h-4 w-4" />
              <span v-else>1</span>
            </StepperIndicator>
            <div class="flex flex-col gap-0.5">
              <StepperTitle>Step 1</StepperTitle>
              <StepperDescription>Personal Information</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator :class="{ 'bg-primary': currentStep > 1 }" />
        </StepperItem>
        <StepperItem :step="2">
          <StepperTrigger :step="2">
            <StepperIndicator :step="2">
              <Icon v-if="currentStep > 2" name="ph:check" class="h-4 w-4" />
              <span v-else>2</span>
            </StepperIndicator>
            <div class="flex flex-col gap-0.5">
              <StepperTitle>Step 2</StepperTitle>
              <StepperDescription>Address Information</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator :class="{ 'bg-primary': currentStep > 2 }" />
        </StepperItem>
        <StepperItem :step="3">
          <StepperTrigger :step="3">
            <StepperIndicator :step="3">
              <Icon v-if="currentStep > 3" name="ph:check" class="h-4 w-4" />
              <span v-else>3</span>
            </StepperIndicator>
            <div class="flex flex-col gap-0.5">
              <StepperTitle>Step 3</StepperTitle>
              <StepperDescription>Review & Submit</StepperDescription>
            </div>
          </StepperTrigger>
        </StepperItem>
      </Stepper>
    </div>

    <!-- Vertical Stepper -->
    <div>
      <h3 class="text-sm font-medium mb-4">Vertical</h3>
      <Stepper orientation="vertical" v-model="currentStep">
        <StepperItem :step="1">
          <StepperTrigger :step="1">
            <StepperIndicator :step="1">
              <Icon v-if="currentStep > 1" name="ph:check" class="h-4 w-4" />
              <span v-else>1</span>
            </StepperIndicator>
            <div class="flex flex-col gap-0.5">
              <StepperTitle>Step 1</StepperTitle>
              <StepperDescription>Personal Information</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator :class="{ 'bg-primary': currentStep > 1 }" />
        </StepperItem>
        <StepperItem :step="2">
          <StepperTrigger :step="2">
            <StepperIndicator :step="2">
              <Icon v-if="currentStep > 2" name="ph:check" class="h-4 w-4" />
              <span v-else>2</span>
            </StepperIndicator>
            <div class="flex flex-col gap-0.5">
              <StepperTitle>Step 2</StepperTitle>
              <StepperDescription>Address Information</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator :class="{ 'bg-primary': currentStep > 2 }" />
        </StepperItem>
        <StepperItem :step="3">
          <StepperTrigger :step="3">
            <StepperIndicator :step="3">
              <Icon v-if="currentStep > 3" name="ph:check" class="h-4 w-4" />
              <span v-else>3</span>
            </StepperIndicator>
            <div class="flex flex-col gap-0.5">
              <StepperTitle>Step 3</StepperTitle>
              <StepperDescription>Review & Submit</StepperDescription>
            </div>
          </StepperTrigger>
        </StepperItem>
      </Stepper>
    </div>
  </div>
</template>`;

const withContentCode = `<template>
  <div class="space-y-8">
    <Stepper v-model="currentFormStep">
      <StepperItem :step="1">
        <StepperTrigger :step="1">
          <StepperIndicator :step="1">
            <Icon v-if="currentFormStep > 1" name="ph:check" class="h-4 w-4" />
            <span v-else>1</span>
          </StepperIndicator>
          <div class="flex flex-col gap-0.5">
            <StepperTitle>Account</StepperTitle>
            <StepperDescription>Create your account</StepperDescription>
          </div>
        </StepperTrigger>
        <StepperSeparator :class="{ 'bg-primary': currentFormStep > 1 }" />
      </StepperItem>
      <StepperItem :step="2">
        <StepperTrigger :step="2">
          <StepperIndicator :step="2">
            <Icon v-if="currentFormStep > 2" name="ph:check" class="h-4 w-4" />
            <span v-else>2</span>
          </StepperIndicator>
          <div class="flex flex-col gap-0.5">
            <StepperTitle>Profile</StepperTitle>
            <StepperDescription>Complete your profile</StepperDescription>
          </div>
        </StepperTrigger>
        <StepperSeparator :class="{ 'bg-primary': currentFormStep > 2 }" />
      </StepperItem>
      <StepperItem :step="3">
        <StepperTrigger :step="3">
          <StepperIndicator :step="3">
            <Icon v-if="currentFormStep > 3" name="ph:check" class="h-4 w-4" />
            <span v-else>3</span>
          </StepperIndicator>
          <div class="flex flex-col gap-0.5">
            <StepperTitle>Review</StepperTitle>
            <StepperDescription>Review your information</StepperDescription>
          </div>
        </StepperTrigger>
      </StepperItem>
    </Stepper>

    <div class="rounded-lg border p-6">
      <div v-if="currentFormStep === 1">
        <h3 class="text-lg font-medium mb-4">Account Information</h3>
        <div class="space-y-4">
          <FormKit type="email" label="Email" validation="required|email" />
          <FormKit type="password" label="Password" validation="required|length:8" />
        </div>
      </div>

      <div v-if="currentFormStep === 2">
        <h3 class="text-lg font-medium mb-4">Profile Information</h3>
        <div class="space-y-4">
          <FormKit type="text" label="Full Name" validation="required" />
          <FormKit type="tel" label="Phone Number" />
        </div>
      </div>

      <div v-if="currentFormStep === 3">
        <h3 class="text-lg font-medium mb-4">Review</h3>
        <p class="text-muted-foreground">Please review your information before submitting.</p>
      </div>

      <div class="flex justify-between mt-6">
        <Button 
          variant="outline" 
          @click="currentFormStep--" 
          :disabled="currentFormStep === 1"
        >
          Previous
        </Button>
        <Button 
          variant="primary" 
          @click="currentFormStep++" 
          :disabled="currentFormStep === 3"
        >
          {{ currentFormStep === 3 ? 'Submit' : 'Next' }}
        </Button>
      </div>
    </div>
  </div>
</template>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Stepper</h1>
      <p class="text-gray-600">A step-by-step navigation component for guiding users through a process or workflow.</p>
    </div>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          A basic stepper with numbered indicators that change to checkmarks when completed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Stepper v-model="currentStep">
            <StepperItem :step="1">
              <StepperTrigger :step="1">
                <StepperIndicator :step="1">
                  <Icon v-if="currentStep > 1" name="ph:check" class="h-4 w-4" />
                  <span v-else>1</span>
                </StepperIndicator>
                <div class="flex flex-col gap-0.5">
                  <StepperTitle>Step 1</StepperTitle>
                  <StepperDescription>Personal Information</StepperDescription>
                </div>
              </StepperTrigger>
              <StepperSeparator :class="{ 'bg-primary': currentStep > 1 }" />
            </StepperItem>
            <StepperItem :step="2">
              <StepperTrigger :step="2">
                <StepperIndicator :step="2">
                  <Icon v-if="currentStep > 2" name="ph:check" class="h-4 w-4" />
                  <span v-else>2</span>
                </StepperIndicator>
                <div class="flex flex-col gap-0.5">
                  <StepperTitle>Step 2</StepperTitle>
                  <StepperDescription>Address Information</StepperDescription>
                </div>
              </StepperTrigger>
              <StepperSeparator :class="{ 'bg-primary': currentStep > 2 }" />
            </StepperItem>
            <StepperItem :step="3">
              <StepperTrigger :step="3">
                <StepperIndicator :step="3">
                  <Icon v-if="currentStep > 3" name="ph:check" class="h-4 w-4" />
                  <span v-else>3</span>
                </StepperIndicator>
                <div class="flex flex-col gap-0.5">
                  <StepperTitle>Step 3</StepperTitle>
                  <StepperDescription>Review & Submit</StepperDescription>
                </div>
              </StepperTrigger>
            </StepperItem>
          </Stepper>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="basicCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Orientation -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Orientation</h2>
        </CardTitle>
        <CardDescription>
          Stepper can be oriented horizontally or vertically.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <div class="grid gap-8 md:grid-cols-2">
            <div>
              <h3 class="text-sm font-medium mb-4">Horizontal</h3>
              <Stepper v-model="currentStep">
                <StepperItem :step="1">
                  <StepperTrigger :step="1">
                    <StepperIndicator :step="1">
                      <Icon v-if="currentStep > 1" name="ph:check" class="h-4 w-4" />
                      <span v-else>1</span>
                    </StepperIndicator>
                    <div class="flex flex-col gap-0.5">
                      <StepperTitle>Step 1</StepperTitle>
                      <StepperDescription>Personal Information</StepperDescription>
                    </div>
                  </StepperTrigger>
                  <StepperSeparator :class="{ 'bg-primary': currentStep > 1 }" />
                </StepperItem>
                <StepperItem :step="2">
                  <StepperTrigger :step="2">
                    <StepperIndicator :step="2">
                      <Icon v-if="currentStep > 2" name="ph:check" class="h-4 w-4" />
                      <span v-else>2</span>
                    </StepperIndicator>
                    <div class="flex flex-col gap-0.5">
                      <StepperTitle>Step 2</StepperTitle>
                      <StepperDescription>Address Information</StepperDescription>
                    </div>
                  </StepperTrigger>
                  <StepperSeparator :class="{ 'bg-primary': currentStep > 2 }" />
                </StepperItem>
                <StepperItem :step="3">
                  <StepperTrigger :step="3">
                    <StepperIndicator :step="3">
                      <Icon v-if="currentStep > 3" name="ph:check" class="h-4 w-4" />
                      <span v-else>3</span>
                    </StepperIndicator>
                    <div class="flex flex-col gap-0.5">
                      <StepperTitle>Step 3</StepperTitle>
                      <StepperDescription>Review & Submit</StepperDescription>
                    </div>
                  </StepperTrigger>
                </StepperItem>
              </Stepper>
            </div>

            <div>
              <h3 class="text-sm font-medium mb-4">Vertical</h3>
              <Stepper orientation="vertical" v-model="currentStep">
                <StepperItem :step="1">
                  <StepperTrigger :step="1">
                    <StepperIndicator :step="1">
                      <Icon v-if="currentStep > 1" name="ph:check" class="h-4 w-4" />
                      <span v-else>1</span>
                    </StepperIndicator>
                    <div class="flex flex-col gap-0.5">
                      <StepperTitle>Step 1</StepperTitle>
                      <StepperDescription>Personal Information</StepperDescription>
                    </div>
                  </StepperTrigger>
                  <StepperSeparator :class="{ 'bg-primary': currentStep > 1 }" />
                </StepperItem>
                <StepperItem :step="2">
                  <StepperTrigger :step="2">
                    <StepperIndicator :step="2">
                      <Icon v-if="currentStep > 2" name="ph:check" class="h-4 w-4" />
                      <span v-else>2</span>
                    </StepperIndicator>
                    <div class="flex flex-col gap-0.5">
                      <StepperTitle>Step 2</StepperTitle>
                      <StepperDescription>Address Information</StepperDescription>
                    </div>
                  </StepperTrigger>
                  <StepperSeparator :class="{ 'bg-primary': currentStep > 2 }" />
                </StepperItem>
                <StepperItem :step="3">
                  <StepperTrigger :step="3">
                    <StepperIndicator :step="3">
                      <Icon v-if="currentStep > 3" name="ph:check" class="h-4 w-4" />
                      <span v-else>3</span>
                    </StepperIndicator>
                    <div class="flex flex-col gap-0.5">
                      <StepperTitle>Step 3</StepperTitle>
                      <StepperDescription>Review & Submit</StepperDescription>
                    </div>
                  </StepperTrigger>
                </StepperItem>
              </Stepper>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="orientationCode" language="markup" />
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
          <!-- Stepper Props -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Stepper Props</h3>
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
                  <TableCell>modelValue</TableCell>
                  <TableCell><code>number</code></TableCell>
                  <TableCell><code>1</code></TableCell>
                  <TableCell>The current active step (v-model).</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>orientation</TableCell>
                  <TableCell><code>'horizontal' | 'vertical'</code></TableCell>
                  <TableCell><code>'horizontal'</code></TableCell>
                  <TableCell>The orientation of the stepper.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- StepperItem Props -->
          <div>
            <h3 class="text-lg font-semibold mb-4">StepperItem Props</h3>
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
                  <TableCell>step</TableCell>
                  <TableCell><code>number</code></TableCell>
                  <TableCell>Required</TableCell>
                  <TableCell>The step number for this item.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- Features -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Features</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>Multiple orientation options (horizontal, vertical)</li>
              <li>Step indicators with completion states</li>
              <li>Customizable separators with active states</li>
              <li>Step titles and descriptions</li>
              <li>Keyboard navigation</li>
              <li>Accessible by default</li>
              <li>Responsive design</li>
              <li>Check icons for completed steps</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template> 