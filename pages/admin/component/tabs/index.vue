<script setup>
definePageMeta({
  title: "Tabs",
  layout: "admin",
});

const activeTab = ref("account");
const activeResponsiveTab = ref("profile");
const activeVerticalTab = ref("settings");

const basicCode = `<template>
  <Tabs v-model="activeTab">
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <p>Make changes to your account here.</p>
    </TabsContent>
    <TabsContent value="password">
      <p>Change your password here.</p>
    </TabsContent>
  </Tabs>
</template>

<script setup>
const activeTab = ref("account");
<\/script>`;

const verticalCode = `<template>
  <Tabs v-model="activeTab" orientation="vertical">
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
      <TabsTrigger value="settings">Settings</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <p>Make changes to your account here.</p>
    </TabsContent>
    <TabsContent value="password">
      <p>Change your password here.</p>
    </TabsContent>
    <TabsContent value="settings">
      <p>Manage your settings here.</p>
    </TabsContent>
  </Tabs>
</template>`;

const responsiveCode = `<template>
  <Tabs v-model="activeTab" orientation="responsive">
    <TabsList>
      <TabsTrigger value="profile">Profile</TabsTrigger>
      <TabsTrigger value="notifications">Notifications</TabsTrigger>
      <TabsTrigger value="appearance">Appearance</TabsTrigger>
    </TabsList>
    <TabsContent value="profile">
      <p>Edit your profile information.</p>
    </TabsContent>
    <TabsContent value="notifications">
      <p>Manage your notification preferences.</p>
    </TabsContent>
    <TabsContent value="appearance">
      <p>Customize your interface settings.</p>
    </TabsContent>
  </Tabs>
</template>`;

const disabledCode = `<template>
  <Tabs v-model="activeTab">
    <TabsList>
      <TabsTrigger value="active">Active</TabsTrigger>
      <TabsTrigger value="disabled" :disabled="true">Disabled</TabsTrigger>
    </TabsList>
    <TabsContent value="active">
      <p>This tab is active and can be selected.</p>
    </TabsContent>
    <TabsContent value="disabled">
      <p>This tab is disabled and cannot be selected.</p>
    </TabsContent>
  </Tabs>
</template>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Tabs</h1>
      <p class="text-gray-600">A tabbed interface component for organizing and switching between different views.</p>
    </div>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          A simple horizontal tab interface.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Tabs v-model="activeTab">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the account settings panel.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the password change panel.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="basicCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Vertical Orientation -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Vertical Orientation</h2>
        </CardTitle>
        <CardDescription>
          Tabs arranged in a vertical layout.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Tabs v-model="activeVerticalTab" orientation="vertical">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the account settings panel.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the password change panel.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>
                    Manage your settings here.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the settings panel.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="verticalCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Responsive -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Responsive Layout</h2>
        </CardTitle>
        <CardDescription>
          Tabs that switch between horizontal and vertical layouts based on screen size.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Tabs v-model="activeResponsiveTab" orientation="responsive">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>
                    Edit your profile information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the profile settings panel.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Manage your notification preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the notifications panel.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize your interface settings.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the appearance settings panel.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="responsiveCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Disabled State -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Disabled State</h2>
        </CardTitle>
        <CardDescription>
          Tabs can be disabled to prevent user interaction.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Tabs v-model="activeTab">
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="disabled" :disabled="true">Disabled</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <Card>
                <CardHeader>
                  <CardTitle>Active Tab</CardTitle>
                  <CardDescription>
                    This tab is active and can be selected.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the active tab content.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="disabled">
              <Card>
                <CardHeader>
                  <CardTitle>Disabled Tab</CardTitle>
                  <CardDescription>
                    This tab is disabled and cannot be selected.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the disabled tab content.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="disabledCode" language="markup" />
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
          <!-- Tabs Props -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Tabs Props</h3>
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
                  <TableCell><code>string | number</code></TableCell>
                  <TableCell>Required</TableCell>
                  <TableCell>The currently selected tab value.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>defaultValue</TableCell>
                  <TableCell><code>string | number</code></TableCell>
                  <TableCell><code>null</code></TableCell>
                  <TableCell>The default selected tab value.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>orientation</TableCell>
                  <TableCell><code>'horizontal' | 'vertical' | 'responsive'</code></TableCell>
                  <TableCell><code>'horizontal'</code></TableCell>
                  <TableCell>The orientation of the tabs layout.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- TabsTrigger Props -->
          <div>
            <h3 class="text-lg font-semibold mb-4">TabsTrigger Props</h3>
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
                  <TableCell>value</TableCell>
                  <TableCell><code>string | number</code></TableCell>
                  <TableCell>Required</TableCell>
                  <TableCell>The value of the tab trigger.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>disabled</TableCell>
                  <TableCell><code>boolean</code></TableCell>
                  <TableCell><code>false</code></TableCell>
                  <TableCell>Whether the tab trigger is disabled.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- TabsContent Props -->
          <div>
            <h3 class="text-lg font-semibold mb-4">TabsContent Props</h3>
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
                  <TableCell>value</TableCell>
                  <TableCell><code>string | number</code></TableCell>
                  <TableCell>Required</TableCell>
                  <TableCell>The value of the tab content panel.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- Features -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Features</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>Multiple orientation options (horizontal, vertical, responsive)</li>
              <li>Smooth transitions and animations</li>
              <li>Keyboard navigation support</li>
              <li>ARIA attributes for accessibility</li>
              <li>Disabled state support</li>
              <li>Responsive design</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template> 