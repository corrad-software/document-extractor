<script setup>
definePageMeta({
  title: "Modal",
  layout: "admin",
});

const isBasicModalOpen = ref(false);
const isCustomModalOpen = ref(false);
const isLargeModalOpen = ref(false);
const isNestedModalOpen = ref(false);
const isInnerModalOpen = ref(false);
const isSizeModalOpen = ref(false);

const formData = reactive({
  name: '',
  email: '',
  bio: ''
});

const basicCode = `<template>
  <Button @click="isOpen = true">Open Modal</Button>
  <Modal v-model:open="isOpen">
    <ModalHeader>
      <ModalTitle>Modal Title</ModalTitle>
      <ModalDescription>This is a basic modal example.</ModalDescription>
    </ModalHeader>
    <ModalBody>
      <p>Modal content goes here.</p>
    </ModalBody>
    <ModalFooter>
      <Button variant="outline" @click="isOpen = false">Cancel</Button>
      <Button @click="isOpen = false">Continue</Button>
    </ModalFooter>
  </Modal>
</template>

<script setup>
const isOpen = ref(false);
<\/script>`;

const customCode = `<Modal v-model:open="isOpen">
  <ModalHeader>
    <ModalTitle>Edit Profile</ModalTitle>
    <ModalDescription>Make changes to your profile here.</ModalDescription>
  </ModalHeader>
  <ModalBody>
    <FormKit type="form" :actions="false" v-model="formData">
      <FormKit
        type="text"
        name="name"
        label="Name"
        placeholder="Enter your name"
        validation="required"
      />
      <FormKit
        type="email"
        name="email"
        label="Email"
        placeholder="Enter your email"
        validation="required|email"
      />
      <FormKit
        type="textarea"
        name="bio"
        label="Bio"
        placeholder="Tell us about yourself"
      />
    </FormKit>
  </ModalBody>
  <ModalFooter>
    <Button variant="outline" @click="isOpen = false">Cancel</Button>
    <Button @click="isOpen = false">Save Changes</Button>
  </ModalFooter>
</Modal>`;

const nestedCode = `<Modal v-model:open="isOuterOpen">
  <ModalHeader>
    <ModalTitle>Outer Modal</ModalTitle>
  </ModalHeader>
  <ModalBody>
    <p>This is the outer modal.</p>
    <Button @click="isInnerOpen = true">Open Inner Modal</Button>
  </ModalBody>
  <Modal v-model:open="isInnerOpen">
    <ModalHeader>
      <ModalTitle>Inner Modal</ModalTitle>
    </ModalHeader>
    <ModalBody>
      <p>This is the inner modal.</p>
    </ModalBody>
    <ModalFooter>
      <Button @click="isInnerOpen = false">Close</Button>
    </ModalFooter>
  </Modal>
</Modal>`;

const sizeCode = `<template>
  <!-- Different size options -->
  <Modal v-model:open="isOpen" size="sm">Small Modal</Modal>
  <Modal v-model:open="isOpen" size="md">Medium Modal</Modal>
  <Modal v-model:open="isOpen" size="lg">Large Modal</Modal>
  <Modal v-model:open="isOpen" size="xl">Extra Large Modal</Modal>
  <Modal v-model:open="isOpen" size="2xl">2XL Modal</Modal>
  <Modal v-model:open="isOpen" size="3xl">3XL Modal</Modal>
  <Modal v-model:open="isOpen" size="4xl">4XL Modal</Modal>
  <Modal v-model:open="isOpen" size="5xl">5XL Modal</Modal>
  <Modal v-model:open="isOpen" size="full">Full Width Modal</Modal>
  
  <!-- Custom size -->
  <Modal v-model:open="isOpen" size="600px">Custom Size Modal</Modal>
</template>

<script setup>
const isOpen = ref(false);
<\/script>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Modal</h1>
      <p class="text-gray-600">A modal dialog component for displaying content that requires user interaction, with customizable sizes and positions.</p>
    </div>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          Basic modal example with header, body, and footer sections.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Button @click="isBasicModalOpen = true">Open Modal</Button>
          <Modal v-model:open="isBasicModalOpen">
            <ModalHeader>
              <ModalTitle>Modal Title</ModalTitle>
              <ModalDescription>This is a basic modal example.</ModalDescription>
            </ModalHeader>
            <ModalBody>
              <p>Modal content goes here.</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" @click="isBasicModalOpen = false">Cancel</Button>
              <Button @click="isBasicModalOpen = false">Continue</Button>
            </ModalFooter>
          </Modal>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="basicCode" language="markup" />
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
          Modal with form elements using FormKit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Button @click="isCustomModalOpen = true">Edit Profile</Button>
          <Modal v-model:open="isCustomModalOpen">
            <ModalHeader>
              <ModalTitle>Edit Profile</ModalTitle>
              <ModalDescription>Make changes to your profile here.</ModalDescription>
            </ModalHeader>
            <ModalBody>
              <FormKit type="form" :actions="false" v-model="formData">
                <FormKit
                  type="text"
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                  validation="required"
                />
                <FormKit
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  validation="required|email"
                />
                <FormKit
                  type="textarea"
                  name="bio"
                  label="Bio"
                  placeholder="Tell us about yourself"
                />
              </FormKit>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" @click="isCustomModalOpen = false">Cancel</Button>
              <Button @click="isCustomModalOpen = false">Save Changes</Button>
            </ModalFooter>
          </Modal>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="customCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Nested Modals -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Nested Modals</h2>
        </CardTitle>
        <CardDescription>
          Stack multiple modals on top of each other.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Button @click="isNestedModalOpen = true">Open Nested Modal</Button>
          <Modal v-model:open="isNestedModalOpen">
            <ModalHeader>
              <ModalTitle>Outer Modal</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <p>This is the outer modal.</p>
              <Button class="mt-4" @click="isInnerModalOpen = true">Open Inner Modal</Button>
            </ModalBody>
            <Modal v-model:open="isInnerModalOpen">
              <ModalHeader>
                <ModalTitle>Inner Modal</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <p>This is the inner modal.</p>
              </ModalBody>
              <ModalFooter>
                <Button @click="isInnerModalOpen = false">Close</Button>
              </ModalFooter>
            </Modal>
          </Modal>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="nestedCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Size Customization -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Size Customization</h2>
        </CardTitle>
        <CardDescription>
          Customize the modal size using predefined sizes or custom values.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6 space-y-4">
          <div class="flex flex-wrap gap-4">
            <Button @click="isSizeModalOpen = true" size="sm">Small Modal</Button>
            <Modal v-model:open="isSizeModalOpen" size="sm">
              <ModalHeader>
                <ModalTitle>Small Modal</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <p>This is a small modal (384px).</p>
              </ModalBody>
              <ModalFooter>
                <Button @click="isSizeModalOpen = false">Close</Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="sizeCode" language="markup" />
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
          Available props for the Modal component.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Default</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>open</TableCell>
              <TableCell>Boolean</TableCell>
              <TableCell>false</TableCell>
              <TableCell>Controls the visibility of the modal.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>size</TableCell>
              <TableCell>String</TableCell>
              <TableCell>xl</TableCell>
              <TableCell>Sets the modal width. Available options: sm (384px), md (448px), lg (512px), xl (576px), 2xl (672px), 3xl (768px), 4xl (896px), 5xl (1024px), full (100%). Also accepts custom values like "600px" or "20rem".</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template> 