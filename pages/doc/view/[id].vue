<script setup>
definePageMeta({
  title: "View Document",
});

import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

const route = useRoute();
const router = useRouter();
const documentId = route.params.id;
const toast = useToast();

const isLoading = ref(true);
const pageImages = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const error = ref(null);
const zoomLevel = ref(100);
const isFullscreen = ref(false);
const thumbnailsRef = ref(null);

// Scroll thumbnail into view when page changes
const scrollThumbnailIntoView = () => {
  if (!thumbnailsRef.value) return;
  
  const thumbnail = thumbnailsRef.value.querySelector(`[data-page="${currentPage.value}"]`);
  if (thumbnail) {
    thumbnail.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

// Watch for page changes to scroll thumbnail into view and update URL
watch(currentPage, (newPage) => {
  // Update URL without triggering a page reload
  const query = { ...route.query, page: newPage };
  router.replace({ query });
  
  nextTick(() => {
    scrollThumbnailIntoView();
  });
});

// Fetch document images
const fetchDocumentImages = async () => {
  try {
    isLoading.value = true;
    
    // Fetch the document images from the API
    const { data } = await useFetch(`/api/documents/${documentId}/images`);
    
    if (!data.value?.success) {
      throw new Error(data.value?.error || 'Failed to load document images');
    }
    
    pageImages.value = data.value.images;
    totalPages.value = pageImages.value.length;
    
    // Check for page number in URL query
    const pageFromQuery = parseInt(route.query.page);
    if (!isNaN(pageFromQuery) && pageFromQuery >= 1 && pageFromQuery <= totalPages.value) {
      currentPage.value = pageFromQuery;
    } else if (totalPages.value > 0) {
      currentPage.value = 1;
    }

    // Scroll thumbnail into view after a short delay to ensure DOM is ready
    setTimeout(scrollThumbnailIntoView, 100);
  } catch (err) {
    console.error('Error fetching document images:', err);
    error.value = err.message || 'Failed to load document images';
    toast.add({
      title: "Error",
      description: error.value,
      type: "error"
    });
  } finally {
    isLoading.value = false;
  }
};

// Navigate to previous page
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Navigate to next page
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Go to specific page
const goToPage = (page) => {
  const pageNum = parseInt(page);
  if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages.value) {
    currentPage.value = pageNum;
  }
};

// Handle page input
const handlePageInput = (value) => {
  const pageNum = parseInt(value);
  if (!isNaN(pageNum)) {
    goToPage(pageNum);
  }
};

// Get current image
const currentImage = computed(() => {
  if (pageImages.value.length === 0 || currentPage.value < 1 || currentPage.value > pageImages.value.length) {
    return null;
  }
  return pageImages.value[currentPage.value - 1];
});

// Keyboard navigation
const handleKeydown = (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    prevPage();
  } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    nextPage();
  } else if (e.key === 'Home') {
    goToPage(1);
  } else if (e.key === 'End') {
    goToPage(totalPages.value);
  }
};

// Zoom controls
const zoomIn = () => {
  if (zoomLevel.value < 200) {
    zoomLevel.value += 25;
  }
};

const zoomOut = () => {
  if (zoomLevel.value > 50) {
    zoomLevel.value -= 25;
  }
};

const resetZoom = () => {
  zoomLevel.value = 100;
};

// Toggle fullscreen
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};

// Load document images on mount
onMounted(() => {
  fetchDocumentImages();
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <div class="container mx-auto py-8 px-4">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Document Viewer</h1>
      <NuxtLink to="/doc" class="text-primary hover:underline flex items-center gap-1">
        <Icon name="ph:arrow-left" class="h-4 w-4" />
        Back to Upload
      </NuxtLink>
    </div>
    
    <Card v-if="isLoading" class="p-12">
      <div class="flex flex-col items-center justify-center gap-4">
        <Icon name="ph:spinner" class="h-8 w-8 animate-spin text-primary" />
        <p>Loading document...</p>
      </div>
    </Card>
    
    <Card v-else-if="error" class="p-8">
      <div class="p-4 bg-danger/10 border border-danger/20 rounded-md text-danger">
        <p class="font-medium">Failed to load document</p>
        <p class="text-sm mt-1">{{ error }}</p>
        <Button variant="outline" class="mt-4" @click="fetchDocumentImages">
          Try Again
        </Button>
      </div>
    </Card>
    
    <div v-else-if="pageImages.length === 0" class="text-center p-12">
      <Icon name="ph:file-x" class="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h2 class="text-xl font-medium mb-2">No Pages Found</h2>
      <p class="text-muted-foreground">This document has no pages or hasn't been processed yet.</p>
      <NuxtLink to="/doc" class="mt-6 inline-block">
        <Button>Upload Another Document</Button>
      </NuxtLink>
    </div>
    
    <template v-else>
      <!-- Document Viewer -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- Thumbnails Sidebar -->
        <div class="md:col-span-1 border rounded-lg p-4 h-[calc(100vh-200px)] overflow-y-auto">
          <h2 class="font-medium mb-4 flex items-center gap-2">
            <Icon name="ph:files" class="h-4 w-4" />
            Pages ({{ totalPages }})
          </h2>
          <div 
            ref="thumbnailsRef" 
            class="space-y-3"
          >
            <div 
              v-for="(image, index) in pageImages" 
              :key="index"
              :data-page="index + 1"
              @click="goToPage(index + 1)"
              :class="[
                'cursor-pointer rounded-md overflow-hidden border-2 transition-all hover:shadow-md',
                currentPage === index + 1 ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-muted'
              ]"
            >
              <div class="relative">
                <img 
                  :src="image.url" 
                  :alt="`Page ${index + 1}`"
                  class="w-full h-auto object-contain"
                  loading="lazy"
                />
                <div class="absolute bottom-0 right-0 bg-background/80 text-xs px-2 py-1 rounded-tl-md">
                  {{ index + 1 }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Main Viewer -->
        <div class="md:col-span-3">
          <Card :class="{ 'fixed inset-4 z-50': isFullscreen }">
            <CardHeader class="flex flex-row items-center justify-between">
              <CardTitle class="flex items-center gap-2">
                <Icon name="ph:file-pdf" class="h-5 w-5" />
                Page {{ currentPage }} of {{ totalPages }}
              </CardTitle>
              <div class="flex items-center gap-4">
                <!-- Zoom Controls -->
                <div class="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    @click="zoomOut"
                    :disabled="zoomLevel <= 50"
                    class="h-8 w-8 p-0"
                  >
                    <Icon name="ph:minus" class="h-4 w-4" />
                  </Button>
                  <div class="flex items-center gap-1 min-w-[60px]">
                    <span class="text-sm">{{ zoomLevel }}%</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      @click="resetZoom"
                      class="h-6 px-1 text-xs"
                    >
                      Reset
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    @click="zoomIn"
                    :disabled="zoomLevel >= 200"
                    class="h-8 w-8 p-0"
                  >
                    <Icon name="ph:plus" class="h-4 w-4" />
                  </Button>
                </div>

                <!-- Navigation Controls -->
                <div class="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    @click="goToPage(1)" 
                    :disabled="currentPage <= 1"
                    class="h-8 w-8 p-0"
                  >
                    <Icon name="ph:caret-double-left" class="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    @click="prevPage" 
                    :disabled="currentPage <= 1"
                    class="h-8 w-8 p-0"
                  >
                    <Icon name="ph:caret-left" class="h-4 w-4" />
                  </Button>
                  <div class="flex items-center gap-2 min-w-[120px] justify-center">
                    <FormKit
                      type="number"
                      v-model="currentPage"
                      :min="1"
                      :max="totalPages"
                      :validation="[['min', 1], ['max', totalPages]]"
                      validation-visibility="live"
                      @input="handlePageInput"
                      outer-class="!mb-0"
                      input-class="w-16 h-8 text-center"
                    />
                    <span class="text-sm text-muted-foreground">/ {{ totalPages }}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    @click="nextPage" 
                    :disabled="currentPage >= totalPages"
                    class="h-8 w-8 p-0"
                  >
                    <Icon name="ph:caret-right" class="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    @click="goToPage(totalPages)" 
                    :disabled="currentPage >= totalPages"
                    class="h-8 w-8 p-0"
                  >
                    <Icon name="ph:caret-double-right" class="h-4 w-4" />
                  </Button>
                </div>

                <!-- Fullscreen Toggle -->
                <Button
                  variant="outline"
                  size="sm"
                  @click="toggleFullscreen"
                  class="h-8 w-8 p-0"
                >
                  <Icon
                    :name="isFullscreen ? 'ph:corners-in' : 'ph:corners-out'"
                    class="h-4 w-4"
                  />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div 
                class="flex justify-center border rounded-lg p-4 bg-muted/20 overflow-auto"
                :class="{ 'h-[calc(100vh-200px)]': !isFullscreen, 'h-[calc(100vh-150px)]': isFullscreen }"
              >
                <img 
                  v-if="currentImage"
                  :src="currentImage.url" 
                  :alt="`Page ${currentPage}`"
                  class="max-w-full object-contain transition-transform duration-200"
                  :style="{ transform: `scale(${zoomLevel / 100})` }"
                />
              </div>
            </CardContent>
            <CardFooter class="flex justify-between items-center text-sm text-muted-foreground">
              <div class="flex items-center gap-4">
                <span class="flex items-center gap-1">
                  <Icon name="ph:keyboard" class="h-4 w-4" />
                  Use arrow keys to navigate
                </span>
                <span class="flex items-center gap-1">
                  <Icon name="ph:mouse" class="h-4 w-4" />
                  Scroll to zoom
                </span>
              </div>
              <NuxtLink to="/doc" class="text-primary hover:underline flex items-center gap-1">
                <Icon name="ph:arrow-left" class="h-4 w-4" />
                Back to Upload
              </NuxtLink>
            </CardFooter>
          </Card>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style> 