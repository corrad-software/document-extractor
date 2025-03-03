<script setup>
definePageMeta({
  title: "Avatar",
  layout: "admin",
});

const basicCode = `<Avatar src="/path/to/image.jpg" alt="User Name" />
<Avatar alt="John Doe" fallback="JD" />
<Avatar alt="No Image" />`;

const sizesCode = `<Avatar src="/path/to/image.jpg" alt="User Name" size="sm" />
<Avatar src="/path/to/image.jpg" alt="User Name" size="default" />
<Avatar src="/path/to/image.jpg" alt="User Name" size="lg" />`;

const fallbackCode = `<Avatar alt="John Doe" fallback="JD" />
<Avatar alt="Alice Smith" />  <!-- Will show "AS" -->
<Avatar alt="No Image" />     <!-- Will show "NA" -->`;

const groupCode = `<AvatarGroup :max="3">
  <Avatar src="/user1.jpg" alt="User 1" />
  <Avatar src="/user2.jpg" alt="User 2" />
  <Avatar src="/user3.jpg" alt="User 3" />
  <Avatar src="/user4.jpg" alt="User 4" />
  <Avatar src="/user5.jpg" alt="User 5" />
</AvatarGroup>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Avatar</h1>
      <p class="text-gray-600">A versatile avatar component for displaying user images with fallback support and group functionality.</p>
    </div>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          Basic avatar examples showcasing image, fallback, and initial states.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap gap-4 mb-6">
          <Avatar src="/path/to/image.jpg" alt="User Name" />
          <Avatar alt="John Doe" fallback="JD" />
          <Avatar alt="No Image" />
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="basicCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Sizes -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Sizes</h2>
        </CardTitle>
        <CardDescription>
          Different avatar sizes for various use cases.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap items-center gap-4 mb-6">
          <Avatar src="/path/to/image.jpg" alt="User Name" size="sm" />
          <Avatar src="/path/to/image.jpg" alt="User Name" size="default" />
          <Avatar src="/path/to/image.jpg" alt="User Name" size="lg" />
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="sizesCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Fallback -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Fallback Behavior</h2>
        </CardTitle>
        <CardDescription>
          Avatar fallback states when images are unavailable.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap items-center gap-4 mb-6">
          <Avatar alt="John Doe" fallback="JD" />
          <Avatar alt="Alice Smith" />
          <Avatar alt="No Image" />
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="fallbackCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Avatar Group -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Avatar Group</h2>
        </CardTitle>
        <CardDescription>
          Group multiple avatars with overflow count.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap items-center gap-4 mb-6">
          <AvatarGroup :max="3">
            <Avatar src="/path/to/image1.jpg" alt="User 1" />
            <Avatar src="/path/to/image2.jpg" alt="User 2" />
            <Avatar src="/path/to/image3.jpg" alt="User 3" />
            <Avatar src="/path/to/image4.jpg" alt="User 4" />
            <Avatar src="/path/to/image5.jpg" alt="User 5" />
          </AvatarGroup>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="groupCode" language="markup" />
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
          Available props for customizing the Avatar components.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-3">Avatar Props</h3>
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
                    <td class="px-6 py-4 font-medium">src</td>
                    <td class="px-6 py-4">string</td>
                    <td class="px-6 py-4">''</td>
                    <td class="px-6 py-4">URL of the avatar image</td>
                  </tr>
                  <tr class="border-b">
                    <td class="px-6 py-4 font-medium">alt</td>
                    <td class="px-6 py-4">string</td>
                    <td class="px-6 py-4">required</td>
                    <td class="px-6 py-4">Alternative text and used for generating initials</td>
                  </tr>
                  <tr class="border-b">
                    <td class="px-6 py-4 font-medium">fallback</td>
                    <td class="px-6 py-4">string</td>
                    <td class="px-6 py-4">''</td>
                    <td class="px-6 py-4">Custom fallback text when image fails to load</td>
                  </tr>
                  <tr class="border-b">
                    <td class="px-6 py-4 font-medium">size</td>
                    <td class="px-6 py-4">string</td>
                    <td class="px-6 py-4">'default'</td>
                    <td class="px-6 py-4">Size of the avatar (sm, default, lg)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-3">Avatar Group Props</h3>
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
                    <td class="px-6 py-4 font-medium">max</td>
                    <td class="px-6 py-4">number</td>
                    <td class="px-6 py-4">4</td>
                    <td class="px-6 py-4">Maximum number of avatars to display before showing count</td>
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