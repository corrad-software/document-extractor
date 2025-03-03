<script setup>
definePageMeta({
  layout: "admin",
});

const stats = [
  {
    name: "Total Users",
    value: "1,234",
    icon: "mdi:account-group",
    trend: "+12.3%",
  },
  {
    name: "Revenue",
    value: "$12,345",
    icon: "mdi:currency-usd",
    trend: "+8.2%",
  },
  {
    name: "Active Products",
    value: "345",
    icon: "mdi:package",
    trend: "+5.4%",
  },
  {
    name: "Conversion Rate",
    value: "2.4%",
    icon: "mdi:chart-line",
    trend: "+1.2%",
  },
];

const recentActivity = [
  { user: "John Doe", action: "Created new product", time: "2 hours ago" },
  { user: "Jane Smith", action: "Updated inventory", time: "4 hours ago" },
  {
    user: "Mike Johnson",
    action: "Completed order #1234",
    time: "5 hours ago",
  },
  { user: "Sarah Wilson", action: "Added new category", time: "1 day ago" },
];
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Dashboard</h1>
      <p class="text-gray-600">Welcome back, John Doe</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <Card v-for="stat in stats" :key="stat.name">
        <CardContent class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="p-2 bg-accent rounded-lg">
              <Icon :name="stat.icon" class="w-6 h-6" />
            </div>
            <Badge variant="success">{{ stat.trend }}</Badge>
          </div>
          <h3 class="text-2xl font-semibold mb-1">{{ stat.value }}</h3>
          <p class="text-muted-foreground text-sm">{{ stat.name }}</p>
        </CardContent>
      </Card>
    </div>

    <!-- Recent Activity -->
    <Card>
      <CardHeader class="flex flex-row items-center justify-between">
        <CardTitle>Recent Activity</CardTitle>
        <Button variant="ghost" size="sm">View all</Button>
      </CardHeader>
      <CardContent>
        <div class="divide-y divide-border">
          <div
            v-for="activity in recentActivity"
            :key="activity.user"
            class="py-3 flex items-center justify-between"
          >
            <div>
              <p class="font-medium">{{ activity.user }}</p>
              <p class="text-sm text-muted-foreground">{{ activity.action }}</p>
            </div>
            <span class="text-sm text-muted-foreground">{{
              activity.time
            }}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
