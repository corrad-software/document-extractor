<script setup>
const sections = [
  {
    title: "Button Examples",
    description: "Various button styles and variants available in the system.",
  },
  {
    title: "Alert Examples",
    description: "Different types of alerts for various use cases.",
  },
  {
    title: "Accordion Examples",
    description:
      "Interactive accordion components with single and multiple selection modes.",
  },
  {
    title: "Modal Examples",
    description: "Interactive modal components with various configurations.",
  },
  {
    title: "Card Examples",
    description: "Interactive card components with various configurations.",
  },
  {
    title: "Avatar Examples",
    description: "Avatar components for user profile pictures and initials.",
  },
  {
    title: "Badge Examples",
    description: "Status indicators and labels for various UI elements.",
  },
  {
    title: "Breadcrumb Examples",
    description: "Navigation components for displaying hierarchical paths.",
  },
  {
    title: "Carousel Examples",
    description: "Interactive carousel components with various configurations.",
  },
  {
    title: "Context Menu Examples",
    description:
      "Interactive context menu components with various configurations.",
  },
  {
    title: "Table Examples",
    description: "Interactive table components with various configurations.",
  },
  {
    title: "DataTable Examples",
    description:
      "Interactive data table components with various configurations.",
  },
  {
    title: "Dropdown Examples",
    description: "Interactive dropdown menus with various configurations.",
  },
  {
    title: "Hover Card Examples",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Popover Examples",
    description: "Displays rich content in a portal, triggered by a click.",
  },
  {
    title: "Progress Examples",
    description: "Display progress with customizable bars.",
  },
  {
    title: "Scroll Area Examples",
    description: "Custom scrollbar with smooth scrolling.",
  },
  {
    title: "Separator Examples",
    description: "A visual divider between content.",
  },
  {
    title: "Form Examples",
    description: "Form controls built with FormKit.",
  },
  {
    title: "Skeleton Examples",
    description: "Use to show a placeholder while content is loading.",
  },
  {
    title: "Stepper Examples",
    description: "Display progress through numbered steps.",
  },
  {
    title: "Tabs Examples",
    description: "Display content in tabs.",
  },
  {
    title: "Toast Examples",
    description: "Display toast messages to users.",
  },
  {
    title: "Tooltip Examples",
    description: "Tooltips display additional information on hover or focus.",
  },
];

const currentStep = ref(1);

// Add new ref for active tab
const activeTab = ref("buttons");
const activeTabs = ref("account");
// Organize sections into categories
const categories = [
  {
    id: "buttons",
    title: "Buttons",
    description: "Various button styles and variants available in the system.",
  },
  {
    id: "feedback",
    title: "Feedback",
    description: "Components that provide feedback to users",
    sections: [
      "Alert Examples",
      "Progress Examples",
      "Badge Examples",
      "Skeleton Examples",
      "Stepper Examples",
    ],
  },
  {
    id: "navigation",
    title: "Navigation",
    description: "Components for navigation and structure",
    sections: ["Breadcrumb Examples", "Dropdown Examples"],
  },
  {
    id: "layout",
    title: "Layout",
    description: "Components for page layout and structure",
    sections: ["Card Examples", "Separator Examples", "Scroll Area Examples"],
  },
  {
    id: "overlay",
    title: "Overlay",
    description: "Components that overlay the interface",
    sections: [
      "Modal Examples",
      "Popover Examples",
      "Hover Card Examples",
      "Context Menu Examples",
    ],
  },
  {
    id: "data",
    title: "Data Display",
    description: "Components for displaying data",
    sections: ["Table Examples", "DataTable Examples", "Carousel Examples"],
  },
  {
    id: "forms",
    title: "Forms",
    description: "Form controls and inputs",
    sections: ["Form Examples"],
  },
  {
    id: "avatars",
    title: "Avatars",
    description: "Avatar components for user profile pictures and initials.",
    sections: ["Avatar Examples"],
  },
];

const isOpen = ref(false);

const tableData = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Pending" },
];

const columns = [
  {
    key: "name",
    label: "Name",
    sortable: true,
    filterable: true,
  },
  {
    key: "email",
    label: "Email",
    sortable: true,
    filterable: true,
  },
  {
    key: "phone",
    label: "Phone",
    path: "detail.phone",
    sortable: true,
    filterable: true,
  },
  {
    key: "address",
    label: "Address",
    path: "detail.address",
    sortable: true,
    filterable: true,
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    filterable: true,
  },
];

const dataTableData = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `Name ${index + 1}`,
  email: `email${index + 1}@example.com`,
  status: index % 2 === 0 ? "Active" : "Pending",
  detail: {
    phone: `+628123456789${index + 1}`,
    address: `Address ${index + 1}`,
  },
}));

const files = ref([]);
const switchValue = ref(false);
const selectedDatabases = ref([]);

// Function to get section content
const getSectionContent = (sectionId) => {
  return sections.find((s) => s.id === sectionId);
};

const { add: addToast } = useToast();

// Add these functions
const showDefaultToast = () => {
  addToast({
    title: "Default Toast",
    description: "This is a default toast message",
  });
};

const showSuccessToast = () => {
  addToast({
    title: "Success!",
    description: "Your action was completed successfully.",
    type: "success",
  });
};

const showErrorToast = () => {
  addToast({
    title: "Error!",
    description: "Something went wrong. Please try again.",
    type: "error",
  });
};
</script>

<template>
  <div class="min-h-screen bg-background text-foreground p-8">
    <ThemeSwitcher />
    <Toast position="bottom-right" />

    <div class="max-w-6xl mx-auto space-y-12">
      <Button @click="navigateTo('/')">Back to Home</Button>

      <!-- Page Header -->
      <div>
        <h1 class="text-4xl font-bold">Component Showcase</h1>
        <p class="text-muted-foreground mt-2">
          A collection of reusable UI components
        </p>
      </div>

      <!-- Tab Navigation -->
      <div class="mb-8">
        <div class="border-b">
          <nav class="flex flex-wrap gap-4" aria-label="Component categories">
            <button
              v-for="category in categories"
              :key="category.id"
              @click="activeTab = category.id"
              :class="[
                'px-3 py-2 text-sm font-medium transition-colors',
                activeTab === category.id
                  ? 'border-b-2 border-primary text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              ]"
            >
              {{ category.title }}
            </button>
          </nav>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="space-y-16">
        <!-- Buttons Section -->
        <template v-if="activeTab === 'buttons'">
          <!-- Buttons Section -->
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[0].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[0].description }}
            </p>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Button>Default Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="info">Info Button</Button>
              <Button variant="success">Success Button</Button>
              <Button variant="warning">Warning Button</Button>
              <Button variant="danger" size="sm">Small Danger</Button>
              <Button variant="outline" size="lg">Large Outline</Button>
              <Button variant="ghost" size="icon">
                <Icon name="ph:user" />
              </Button>
            </div>
          </section>
        </template>

        <!-- Feedback Section -->
        <template v-if="activeTab === 'feedback'">
          <!-- Alerts Section -->
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[1].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[1].description }}
            </p>
            <div class="space-y-4">
              <Alert>
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription
                  >This is a default alert message.</AlertDescription
                >
              </Alert>

              <Alert variant="danger">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription
                  >Your session has expired. Please log in
                  again.</AlertDescription
                >
              </Alert>

              <Alert>
                <AlertDescription
                  >A simple alert message without a title.</AlertDescription
                >
              </Alert>

              <Alert variant="info">
                <AlertTitle>Update Available</AlertTitle>
                <AlertDescription>
                  A new software version is available.
                  <a href="#" class="font-medium underline underline-offset-4"
                    >Update now</a
                  >
                </AlertDescription>
              </Alert>
            </div>
          </section>

          <!-- Progress Section -->
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[15].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[15].description }}
            </p>

            <div class="space-y-6">
              <!-- Basic Progress -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Basic Progress</h3>
                <Progress :value="60" />
              </div>

              <!-- Progress with Value -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">With Value</h3>
                <Progress :value="80" show-value />
              </div>

              <!-- Different Sizes -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Sizes</h3>
                <div class="space-y-4">
                  <Progress size="sm" :value="40" />
                  <Progress :value="60" />
                  <Progress size="lg" :value="80" />
                </div>
              </div>

              <!-- Variants -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Variants</h3>
                <div class="space-y-4">
                  <Progress :value="60" />
                  <Progress variant="success" :value="70" />
                  <Progress variant="info" :value="50" />
                  <Progress variant="warning" :value="85" />
                  <Progress variant="danger" :value="30" />
                </div>
              </div>

              <!-- Striped -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Striped</h3>
                <div class="space-y-4">
                  <Progress :value="75" striped />
                  <Progress variant="success" :value="65" striped animated />
                </div>
              </div>
            </div>
          </section>

          <!-- Badge Section -->
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[6].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[6].description }}
            </p>

            <div class="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="ghost">Ghost</Badge>

              <Badge>
                <Icon name="ph:check" class="mr-1 h-3 w-3" />
                Complete
              </Badge>

              <Badge variant="secondary">
                <Icon name="ph:clock" class="mr-1 h-3 w-3" />
                Pending
              </Badge>

              <Badge variant="danger">
                <Icon name="ph:x" class="mr-1 h-3 w-3" />
                Rejected
              </Badge>
            </div>
          </section>

          <!-- Skeleton Section -->
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[19].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[19].description }}
            </p>

            <div class="space-y-8">
              <!-- Basic Skeletons -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Basic Skeletons</h3>
                <div class="space-y-4">
                  <Skeleton />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>

              <!-- Card Skeleton -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Card with Skeleton</h3>
                <Card class="p-4">
                  <CardHeader className="gap-2 mb-2">
                    <div class="flex items-center space-x-4">
                      <Skeleton variant="avatar" />
                      <div class="space-y-2">
                        <Skeleton variant="title" />
                        <Skeleton className="h-4 w-[120px]" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                  </CardContent>
                </Card>
              </div>

              <!-- Table Skeleton -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Table with Skeleton</h3>
                <div class="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <Skeleton className="h-4 w-[100px]" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="h-4 w-[200px]" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="h-4 w-[100px]" />
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Skeleton className="h-4 w-[100px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[200px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[100px]" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Skeleton className="h-4 w-[100px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[200px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[100px]" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Skeleton className="h-4 w-[100px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[200px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[100px]" />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <!-- Complex Content Skeleton -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Complex Content</h3>
                <div class="space-y-8">
                  <!-- Profile Section -->
                  <div class="space-y-4">
                    <div class="flex items-center space-x-4">
                      <Skeleton variant="avatar" />
                      <div class="space-y-2">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                      </div>
                    </div>
                  </div>
                  <!-- Content Section -->
                  <div class="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[80%]" />
                  </div>
                  <!-- Actions Section -->
                  <div class="flex space-x-4">
                    <Skeleton className="h-10 w-[120px]" />
                    <Skeleton className="h-10 w-[120px]" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Toast Section -->
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[22].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[22].description }}
            </p>
            <div class="flex flex-wrap gap-4">
              <Button @click="showDefaultToast">Show Default Toast</Button>
              <Button @click="showSuccessToast" variant="success"
                >Show Success Toast</Button
              >
              <Button @click="showErrorToast" variant="danger"
                >Show Error Toast</Button
              >
            </div>
          </section>
        </template>

        <!-- Navigation Section -->
        <template v-if="activeTab === 'navigation'">
          <!-- Breadcrumb Section -->
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[7].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[7].description }}
            </p>
            <Breadcrumb separator="/" separatorIcon="ph:caret-right">
              <BreadcrumbItem href="/">
                <Icon name="ph:house" class="h-3 w-3" />
              </BreadcrumbItem>
              <BreadcrumbItem href="/">Products</BreadcrumbItem>
              <BreadcrumbItem disabled>Category</BreadcrumbItem>
            </Breadcrumb>
          </section>
          <!-- Dropdown Section -->
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[12].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[12].description }}
            </p>

            <div class="flex flex-wrap gap-4">
              <!-- Basic Dropdown -->
              <Dropdown>
                <DropdownTrigger>
                  <Button>
                    Options
                    <Icon name="ph:caret-down" class="ml-2 h-4 w-4" />
                  </Button>
                </DropdownTrigger>
                <DropdownContent>
                  <DropdownItem>
                    <Icon name="ph:user" class="mr-2 h-4 w-4" />
                    Profile
                  </DropdownItem>
                  <DropdownItem>
                    <Icon name="ph:gear" class="mr-2 h-4 w-4" />
                    Settings
                  </DropdownItem>
                  <DropdownSeparator />
                  <DropdownItem>
                    <Icon name="ph:sign-out" class="mr-2 h-4 w-4" />
                    Logout
                  </DropdownItem>
                </DropdownContent>
              </Dropdown>

              <!-- Disabled Item Dropdown -->
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="secondary">
                    More Actions
                    <Icon name="ph:caret-down" class="ml-2 h-4 w-4" />
                  </Button>
                </DropdownTrigger>
                <DropdownContent>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Duplicate</DropdownItem>
                  <DropdownItem disabled>Archive</DropdownItem>
                  <DropdownSeparator />
                  <DropdownItem class="text-danger">Delete</DropdownItem>
                </DropdownContent>
              </Dropdown>
            </div>
          </section>
        </template>

        <!-- Layout Section -->
        <template v-if="activeTab === 'layout'">
          <!-- Card Section -->
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[4].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[4].description }}
            </p>
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <div class="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Submit</Button>
                </div>
              </CardFooter>
            </Card>
          </section>

          <!-- Separator Section -->
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[17].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[17].description }}
            </p>

            <div class="space-y-8">
              <!-- Horizontal Separator -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Horizontal</h3>
                <div class="space-y-1">
                  <div class="text-sm">Item 1</div>
                  <Separator />
                  <div class="text-sm">Item 2</div>
                  <Separator />
                  <div class="text-sm">Item 3</div>
                </div>
              </div>

              <!-- Vertical Separator -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Vertical</h3>
                <div class="flex h-5 items-center space-x-4">
                  <div class="text-sm">Item 1</div>
                  <Separator orientation="vertical" />
                  <div class="text-sm">Item 2</div>
                  <Separator orientation="vertical" />
                  <div class="text-sm">Item 3</div>
                </div>
              </div>

              <!-- With Content -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">With Content</h3>
                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div class="relative flex justify-center text-xs uppercase">
                    <span class="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Scroll Area Section -->
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[16].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[16].description }}
            </p>

            <div class="space-y-6">
              <!-- Basic Scroll Area -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Basic Scroll Area</h3>
                <ScrollArea class="h-[200px] w-full rounded-md border">
                  <div class="p-4">
                    <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
                    <div class="space-y-2">
                      <div v-for="tag in Array(50)" :key="tag" class="text-sm">
                        Tag {{ tag }}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>

              <!-- Horizontal Scroll -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Horizontal Scroll</h3>
                <ScrollArea
                  orientation="horizontal"
                  class="h-[120px] w-full rounded-md border"
                >
                  <div class="flex p-4">
                    <div
                      v-for="image in Array(10)"
                      :key="image"
                      class="flex-shrink-0"
                    >
                      <div class="mx-2 w-[150px] overflow-hidden rounded-md">
                        <img
                          :src="`https://picsum.photos/150/100?random=${image}`"
                          alt="Random image"
                          class="aspect-[3/2] h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </section>
        </template>

        <!-- Overlay Section -->
        <template v-if="activeTab === 'overlay'">
          <!-- Modal Section -->
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[3].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[3].description }}
            </p>
            <Button @click="isOpen = true">Open Modal</Button>
            <Modal v-model:open="isOpen">
              <ModalClose />
              <ModalHeader>
                <ModalTitle>Edit Profile</ModalTitle>
                <ModalDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </ModalDescription>
              </ModalHeader>

              <ModalBody>
                <FormKit type="form" :actions="false">
                  <FormKit type="text" label="Name" />
                  <FormKit type="text" label="Username" />
                </FormKit>
              </ModalBody>

              <ModalFooter>
                <Button variant="outline" @click="isOpen = false"
                  >Cancel</Button
                >
                <Button>Save changes</Button>
              </ModalFooter>
            </Modal>
          </section>

          <!-- Popover Section -->
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[14].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[14].description }}
            </p>

            <div class="flex flex-wrap gap-4">
              <!-- Basic Popover -->
              <Popover>
                <PopoverTrigger>
                  <Button variant="outline">
                    Open Popover
                    <Icon name="ph:caret-down" class="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div class="grid gap-4">
                    <div class="space-y-2">
                      <h4 class="font-medium leading-none">Dimensions</h4>
                      <p class="text-sm text-muted-foreground">
                        Set the dimensions for the layer.
                      </p>
                    </div>
                    <div class="grid gap-2">
                      <div class="grid grid-cols-3 items-center gap-4">
                        <label for="width">Width</label>
                        <input
                          id="width"
                          type="number"
                          class="col-span-2 h-8 rounded-md border bg-transparent px-3"
                        />
                      </div>
                      <div class="grid grid-cols-3 items-center gap-4">
                        <label for="height">Height</label>
                        <input
                          id="height"
                          type="number"
                          class="col-span-2 h-8 rounded-md border bg-transparent px-3"
                        />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <!-- Custom Position Popover -->
              <Popover>
                <PopoverTrigger>
                  <Button>
                    Right Aligned
                    <Icon name="ph:caret-down" class="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="right" align="start">
                  <div class="space-y-2">
                    <h4 class="font-medium leading-none">Custom Position</h4>
                    <p class="text-sm text-muted-foreground">
                      This popover appears on the right side.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </section>

          <!-- Hover Card Section -->
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[13].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[13].description }}
            </p>

            <div class="flex flex-wrap gap-4">
              <!-- Basic Hover Card -->
              <HoverCard>
                <HoverCardTrigger>
                  <Button variant="ghost"> @nuxt </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div class="flex justify-between space-x-4">
                    <Avatar src="https://github.com/nuxt.png" alt="@nuxt" />
                    <div class="space-y-1">
                      <h4 class="text-sm font-semibold">@nuxt</h4>
                      <p class="text-sm text-muted-foreground">
                        The Vue Framework – created and maintained by @nuxt.
                      </p>
                      <div class="flex items-center pt-2">
                        <Icon name="ph:users" class="mr-2 h-4 w-4 opacity-70" />
                        <span class="text-xs text-muted-foreground">
                          189.1K followers
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>

              <!-- Custom Position Hover Card -->
              <HoverCard>
                <HoverCardTrigger>
                  <Button variant="outline"> Hover with Delay </Button>
                </HoverCardTrigger>
                <HoverCardContent side="right" align="start">
                  <div class="space-y-2">
                    <h4 class="text-sm font-semibold">Custom Position</h4>
                    <p class="text-sm text-muted-foreground">
                      This card appears on the right side with a custom delay.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </section>

          <!-- Context Menu Section -->
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[9].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[9].description }}
            </p>
            <ContextMenu>
              <div class="border rounded p-4">
                Right click anywhere in this box
              </div>

              <ContextMenuContent>
                <ContextMenuItem>
                  <i class="i-heroicons-share mr-2" />
                  Share
                </ContextMenuItem>

                <ContextMenuItem>
                  <i class="i-heroicons-pencil mr-2" />
                  Edit
                </ContextMenuItem>

                <ContextMenuSeparator />

                <ContextMenuItem class="text-red-500">
                  <i class="i-heroicons-trash mr-2" />
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </section>

          <!-- Tooltip Section -->
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[23].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[23].description }}
            </p>

            <div class="flex flex-wrap gap-4">
              <!-- Basic Tooltip -->
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent> Add to library </TooltipContent>
              </Tooltip>

              <!-- Different Positions -->
              <Tooltip side="top">
                <TooltipTrigger>
                  <Button variant="outline">Top tooltip</Button>
                </TooltipTrigger>
                <TooltipContent> This is a top tooltip </TooltipContent>
              </Tooltip>

              <Tooltip side="right">
                <TooltipTrigger>
                  <Button variant="outline">Right tooltip</Button>
                </TooltipTrigger>
                <TooltipContent> This is a right tooltip </TooltipContent>
              </Tooltip>

              <Tooltip side="bottom">
                <TooltipTrigger>
                  <Button variant="outline">Bottom tooltip</Button>
                </TooltipTrigger>
                <TooltipContent> This is a bottom tooltip </TooltipContent>
              </Tooltip>

              <Tooltip side="left">
                <TooltipTrigger>
                  <Button variant="outline">Left tooltip</Button>
                </TooltipTrigger>
                <TooltipContent> This is a left tooltip </TooltipContent>
              </Tooltip>

              <!-- With Icon -->
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost" size="icon">
                    <Icon name="ph:plus" class="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent> Add item </TooltipContent>
              </Tooltip>
            </div>
          </section>
        </template>

        <!-- Data Display Section -->
        <template v-if="activeTab === 'data'">
          <!-- Table Section -->
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[10].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[10].description }}
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="row in tableData" :key="row.id">
                  <TableCell>{{ row.name }}</TableCell>
                  <TableCell>{{ row.email }}</TableCell>
                  <TableCell>
                    <span
                      class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                      :class="{
                        'bg-green-100 text-green-700': row.status === 'Active',
                        'bg-yellow-100 text-yellow-700':
                          row.status === 'Pending',
                      }"
                    >
                      {{ row.status }}
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>

          <!-- DataTable Section -->
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[11].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[11].description }}
            </p>
            <DataTable :data="dataTableData" :columns="columns">
              <template #status="{ value }">
                <span
                  class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                  :class="{
                    'bg-green-100 text-green-700': value === 'Active',
                    'bg-yellow-100 text-yellow-700': value === 'Pending',
                  }"
                >
                  {{ value }}
                </span>
              </template>
            </DataTable>
          </section>

          <!-- Tabs Section -->
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[21].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[21].description }}
            </p>

            <div class="space-y-8">
              <!-- Horizontal Tabs -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Horizontal Tabs</h3>
                <Tabs v-model="activeTabs" default-value="account">
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
                          Make changes to your account here. Click save when
                          you're done.
                        </CardDescription>
                      </CardHeader>
                      <CardContent class="space-y-2">
                        <div class="space-y-1">
                          <FormKit type="text" label="Name" />
                        </div>
                        <div class="space-y-1">
                          <FormKit type="email" label="Email" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Save changes</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="password">
                    <Card>
                      <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                          Change your password here. After saving, you'll be
                          logged out.
                        </CardDescription>
                      </CardHeader>
                      <CardContent class="space-y-2">
                        <div class="space-y-1">
                          <FormKit type="password" label="Current password" />
                        </div>
                        <div class="space-y-1">
                          <FormKit type="password" label="New password" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Save password</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="settings">
                    <Card>
                      <CardHeader>
                        <CardTitle>Settings</CardTitle>
                        <CardDescription>
                          Manage your account settings and preferences.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div class="space-y-2">
                          <FormKit type="switch" label="Marketing emails" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Save settings</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              <!-- Vertical Tabs -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Vertical Tabs</h3>
                <Tabs
                  v-model="activeTabs"
                  default-value="account"
                  orientation="vertical"
                >
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
                          Make changes to your account here. Click save when
                          you're done.
                        </CardDescription>
                      </CardHeader>
                      <CardContent class="space-y-2">
                        <div class="space-y-1">
                          <FormKit type="text" label="Name" />
                        </div>
                        <div class="space-y-1">
                          <FormKit type="email" label="Email" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Save changes</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="password">
                    <Card>
                      <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                          Change your password here. After saving, you'll be
                          logged out.
                        </CardDescription>
                      </CardHeader>
                      <CardContent class="space-y-2">
                        <div class="space-y-1">
                          <FormKit type="password" label="Current password" />
                        </div>
                        <div class="space-y-1">
                          <FormKit type="password" label="New password" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Save password</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="settings">
                    <Card>
                      <CardHeader>
                        <CardTitle>Settings</CardTitle>
                        <CardDescription>
                          Manage your account settings and preferences.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div class="space-y-2">
                          <FormKit type="switch" label="Marketing emails" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Save settings</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              <!-- Responsive Tabs -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Responsive Tabs</h3>
                <Tabs
                  v-model="activeTabs"
                  default-value="account"
                  orientation="responsive"
                >
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
                          Make changes to your account here. Click save when
                          you're done.
                        </CardDescription>
                      </CardHeader>
                      <CardContent class="space-y-2">
                        <div class="space-y-1">
                          <FormKit type="text" label="Name" />
                        </div>
                        <div class="space-y-1">
                          <FormKit type="email" label="Email" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Save changes</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="password">
                    <Card>
                      <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                          Change your password here. After saving, you'll be
                          logged out.
                        </CardDescription>
                      </CardHeader>
                      <CardContent class="space-y-2">
                        <div class="space-y-1">
                          <FormKit type="password" label="Current password" />
                        </div>
                        <div class="space-y-1">
                          <FormKit type="password" label="New password" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Save password</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="settings">
                    <Card>
                      <CardHeader>
                        <CardTitle>Settings</CardTitle>
                        <CardDescription>
                          Manage your account settings and preferences.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div class="space-y-2">
                          <FormKit type="switch" label="Marketing emails" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Save settings</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </section>

          <!-- Carousel Section -->
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[8].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[8].description }}
            </p>
            <Carousel>
              <CarouselItem>
                <img
                  src="https://picsum.photos/id/1001/800/400"
                  alt="Image 1"
                  class="h-full w-full object-cover"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://picsum.photos/id/1002/800/400"
                  alt="Image 2"
                  class="h-full w-full object-cover"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://picsum.photos/id/1003/800/400"
                  alt="Image 3"
                  class="h-full w-full object-cover"
                />
              </CarouselItem>
            </Carousel>
          </section>

          <!-- Stepper Section -->
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[20].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[20].description }}
            </p>
            <div class="space-y-8">
              <!-- Horizontal Stepper -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Horizontal Stepper</h3>
                <Stepper v-model="currentStep">
                  <StepperItem :step="1">
                    <StepperTrigger :step="1">
                      <StepperIndicator :step="1">
                        <Icon
                          v-if="currentStep > 1"
                          name="ph:check"
                          class="h-4 w-4"
                        />
                        <span v-else>1</span>
                      </StepperIndicator>
                      <div class="flex flex-col gap-0.5">
                        <StepperTitle>Step 1</StepperTitle>
                        <StepperDescription
                          >Personal Information</StepperDescription
                        >
                      </div>
                    </StepperTrigger>
                    <StepperSeparator
                      :class="{ 'bg-primary': currentStep > 1 }"
                    />
                  </StepperItem>
                  <StepperItem :step="2">
                    <StepperTrigger :step="2">
                      <StepperIndicator :step="2">
                        <Icon
                          v-if="currentStep > 2"
                          name="ph:check"
                          class="h-4 w-4"
                        />
                        <span v-else>2</span>
                      </StepperIndicator>
                      <div class="flex flex-col gap-0.5">
                        <StepperTitle>Step 2</StepperTitle>
                        <StepperDescription
                          >Address Information</StepperDescription
                        >
                      </div>
                    </StepperTrigger>
                    <StepperSeparator
                      :class="{ 'bg-primary': currentStep > 2 }"
                    />
                  </StepperItem>
                  <StepperItem :step="3">
                    <StepperTrigger :step="3">
                      <StepperIndicator :step="3">
                        <Icon
                          v-if="currentStep > 3"
                          name="ph:check"
                          class="h-4 w-4"
                        />
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
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Vertical Stepper</h3>
                <Stepper orientation="vertical" v-model="currentStep">
                  <StepperItem :step="1">
                    <StepperTrigger :step="1">
                      <StepperIndicator :step="1">
                        <Icon
                          v-if="currentStep > 1"
                          name="ph:check"
                          class="h-4 w-4"
                        />
                        <span v-else>1</span>
                      </StepperIndicator>
                      <div class="flex flex-col gap-0.5">
                        <StepperTitle>Step 1</StepperTitle>
                        <StepperDescription
                          >Personal Information</StepperDescription
                        >
                      </div>
                    </StepperTrigger>
                    <StepperSeparator
                      :class="{ 'bg-primary': currentStep > 1 }"
                    />
                  </StepperItem>
                  <StepperItem :step="2">
                    <StepperTrigger :step="2">
                      <StepperIndicator :step="2">
                        <Icon
                          v-if="currentStep > 2"
                          name="ph:check"
                          class="h-4 w-4"
                        />
                        <span v-else>2</span>
                      </StepperIndicator>
                      <div class="flex flex-col gap-0.5">
                        <StepperTitle>Step 2</StepperTitle>
                        <StepperDescription
                          >Address Information</StepperDescription
                        >
                      </div>
                    </StepperTrigger>
                    <StepperSeparator
                      :class="{ 'bg-primary': currentStep > 2 }"
                    />
                  </StepperItem>
                  <StepperItem :step="3">
                    <StepperTrigger :step="3">
                      <StepperIndicator :step="3">
                        <Icon
                          v-if="currentStep > 3"
                          name="ph:check"
                          class="h-4 w-4"
                        />
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
          </section>
        </template>

        <!-- Forms Section -->
        <template v-if="activeTab === 'forms'">
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[18].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[18].description }}
            </p>

            <div class="space-y-8">
              <!-- 1. Basic Input Fields -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Basic Form Controls</h3>
                <div class="space-y-4">
                  <FormKit
                    type="text"
                    name="name"
                    label="Name"
                    placeholder="John Doe"
                    help="Enter your full name"
                  />
                  <FormKit
                    type="email"
                    name="email"
                    label="Email"
                    validation="required|email"
                    placeholder="john@example.com"
                  />
                  <FormKit
                    type="password"
                    name="password"
                    label="Password"
                    validation="required|length:6"
                    help="Password must be at least 6 characters"
                  />
                  <FormKit
                    type="textarea"
                    name="bio"
                    label="Bio"
                    placeholder="Tell us about yourself"
                    validation="required|max:500"
                    help="Maximum 500 characters"
                  />
                </div>
              </div>

              <!-- 2. Date and Time Inputs -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Date & Time Controls</h3>
                <div class="space-y-4">
                  <FormKit
                    type="date"
                    name="birthdate"
                    label="Birth Date"
                    validation="required|date"
                  />
                  <FormKit
                    type="time"
                    name="time"
                    label="Time"
                    validation="required|time"
                  />
                  <FormKit
                    type="month"
                    name="month"
                    label="Month"
                    validation="required|month"
                  />
                  <FormKit
                    type="week"
                    name="week"
                    label="Week"
                    validation="required|week"
                  />
                  <FormKit
                    type="datetime-local"
                    name="datetime-local"
                    label="Datetime Local"
                    validation="required|datetime-local"
                  />
                </div>
              </div>

              <!-- 3. Selection Controls -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Selection Controls</h3>
                <div class="space-y-4">
                  <FormKit
                    type="select"
                    name="country"
                    label="Country"
                    :options="[
                      { label: 'United States', value: 'us' },
                      { label: 'United Kingdom', value: 'uk' },
                      { label: 'Canada', value: 'ca' },
                    ]"
                    placeholder="Select your country"
                  />

                  <FormKit
                    type="radio"
                    name="plan"
                    label="Subscription Plan"
                    :options="[
                      { label: 'Free', value: 'free' },
                      { label: 'Pro', value: 'pro' },
                      { label: 'Enterprise', value: 'enterprise' },
                    ]"
                  />

                  <FormKit
                    type="checkbox"
                    name="interests"
                    label="Interests"
                    :options="[
                      { label: 'Design', value: 'design' },
                      { label: 'Development', value: 'development' },
                      { label: 'Marketing', value: 'marketing' },
                    ]"
                  />
                </div>
              </div>

              <!-- 4. Advanced Input Types -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Advanced Inputs</h3>
                <div class="space-y-4">
                  <!-- Mask Inputs -->
                  <FormKit
                    type="mask"
                    name="phone"
                    label="Phone Number"
                    mask="(###) ###-####"
                    placeholder="(555) 555-5555"
                  />
                  <FormKit
                    type="mask"
                    name="creditCard"
                    label="Credit Card"
                    mask="#### #### #### ####"
                    placeholder="1234 5678 9012 3456"
                  />

                  <!-- File Upload -->
                  <FormKit
                    type="file"
                    name="avatar"
                    label="Profile Picture"
                    accept="image/*"
                    help="Upload a profile picture (JPG, PNG)"
                  />

                  <!-- Dropzone -->
                  <FormKit
                    v-model="files"
                    type="dropzone"
                    name="files"
                    label="Upload Files"
                    help="Drag and drop files here or click to select"
                    :multiple="true"
                    accept="image/*,.pdf"
                    :maxSize="5242880"
                    :maxFiles="5"
                  />
                </div>
              </div>

              <!-- 5. Toggle Controls -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Toggle Controls</h3>
                <div class="space-y-4">
                  <FormKit
                    type="switch"
                    name="notifications"
                    label="Enable notifications"
                  />
                  <FormKit
                    type="switch"
                    name="marketing"
                    label="Receive marketing emails"
                    help="We'll send you occasional updates about our products"
                  />
                  <FormKit
                    v-model="switchValue"
                    type="switch"
                    name="feature"
                    label="Enable feature"
                  />
                  <div v-if="switchValue" class="text-sm text-muted-foreground">
                    Feature is enabled!
                  </div>
                </div>
              </div>

              <!-- 6. Combobox Examples -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Combobox Controls</h3>
                <div class="space-y-4">
                  <FormKit
                    type="combobox"
                    name="skills"
                    label="Skills"
                    placeholder="Select skills..."
                    :options="[
                      { label: 'JavaScript', value: 'js' },
                      { label: 'TypeScript', value: 'ts' },
                      { label: 'Python', value: 'py' },
                    ]"
                  />

                  <FormKit
                    v-model="selectedDatabases"
                    type="combobox"
                    name="databases"
                    label="Databases"
                    placeholder="Select databases..."
                    :options="[
                      { label: 'MySQL', value: 'mysql' },
                      { label: 'PostgreSQL', value: 'postgres' },
                      { label: 'MongoDB', value: 'mongodb' },
                    ]"
                  />
                </div>
              </div>

              <!-- 7. Validation Examples -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Validation Examples</h3>
                <FormKit type="form" :actions="false" @submit="() => {}">
                  <div class="space-y-4">
                    <FormKit
                      type="text"
                      name="username"
                      label="Username"
                      validation="required|length:3,20|alphanumeric"
                      validation-visibility="live"
                      help="Username must be 3-20 characters and contain only letters and numbers"
                    />

                    <FormKit
                      type="password"
                      name="password"
                      label="Password"
                      validation="required|length:8|contains:number,uppercase"
                      validation-visibility="live"
                      help="Password must be at least 8 characters and contain a number and uppercase letter"
                    />

                    <FormKit
                      type="password"
                      name="password_confirm"
                      label="Confirm Password"
                      validation="required|confirm"
                      validation-visibility="live"
                    />

                    <Button type="submit">Register</Button>
                  </div>
                </FormKit>
              </div>
            </div>
          </section>
        </template>

        <!-- Avatar Section -->
        <template v-if="activeTab === 'avatars'">
          <section class="rounded-lg border p-6">
            <h2 class="text-2xl font-bold mb-2">{{ sections[5].title }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ sections[5].description }}
            </p>
            <div class="flex space-x-4">
              <Avatar src="https://github.com/octocat.png" alt="User One" />
              <Avatar src="https://github.com/defunkt.png" alt="User Two" />
              <Avatar src="https://github.com/mojombo.png" alt="User Three" />
              <Avatar fallback="JD" alt="John Doe" />
            </div>

            <!-- Avatar Group Example -->
            <div class="mt-8">
              <h3 class="text-xl font-semibold mb-4">Avatar Group</h3>
              <AvatarGroup :max="3">
                <Avatar src="https://github.com/octocat.png" alt="User One" />
                <Avatar src="https://github.com/defunkt.png" alt="User Two" />
                <Avatar src="https://github.com/mojombo.png" alt="User Three" />
                <Avatar src="https://github.com/pjhyett.png" alt="User Four" />
                <Avatar src="https://github.com/wycats.png" alt="User Five" />
              </AvatarGroup>
            </div>
          </section>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Keep existing styles */
</style>
