<script setup>
definePageMeta({
  title: "Documents",
});

import { ref, onMounted } from "vue";
import { createClient } from "@supabase/supabase-js";
import { formatDistance } from "date-fns";

const config = useRuntimeConfig();
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseKey
);

const router = useRouter();
const toast = useToast();

const documents = ref([]);
const isLoading = ref(true);
const error = ref(null);
const showDeleteModal = ref(false);
const documentToDelete = ref(null);

// Format file size for display
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Format date for display
const formatDate = (date) => {
  try {
    return formatDistance(new Date(date), new Date(), { addSuffix: true });
  } catch (e) {
    return "Invalid date";
  }
};

// Get status badge variant
const getStatusVariant = (status) => {
  switch (status) {
    case "completed":
      return "success";
    case "processing":
      return "warning";
    case "error":
      return "danger";
    default:
      return "secondary";
  }
};

// Fetch documents
const fetchDocuments = async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const { data: response } = await useFetch("/api/documents");

    if (!response.value.success) {
      throw new Error(response.value.error || "Failed to fetch documents");
    }

    documents.value = response.value.data || [];
  } catch (e) {
    console.error("Error fetching documents:", e);
    error.value = e.message;
    toast.add({
      title: "Error",
      description: "Failed to fetch documents",
      type: "error",
    });
  } finally {
    isLoading.value = false;
  }
};

// View document
const viewDocument = (id) => {
  router.push(`/doc/view/${id}`);
};

// Open delete confirmation modal
const confirmDelete = (doc) => {
  documentToDelete.value = doc;
  showDeleteModal.value = true;
};

// Delete document
const deleteDocument = async () => {
  if (!documentToDelete.value) return;

  try {
    const response = await $fetch(
      `/api/documents/${documentToDelete.value.id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.success) {
      throw new Error(response.error || "Failed to delete document");
    }

    documents.value = documents.value.filter(
      (doc) => doc.id !== documentToDelete.value.id
    );
    showDeleteModal.value = false;
    documentToDelete.value = null;

    toast.add({
      title: "Success",
      description: "Document deleted successfully",
      type: "success",
    });
  } catch (e) {
    console.error("Error deleting document:", e);
    toast.add({
      title: "Error",
      description: "Failed to delete document",
      type: "error",
    });
  }
};

// Initialize
onMounted(() => {
  fetchDocuments();
});
</script>

<template>
  <div class="container mx-auto py-8 px-4">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-semibold">Documents</h1>
        <p class="text-muted-foreground mt-1">Manage your uploaded documents</p>
      </div>
      <NuxtLink to="/doc/upload">
        <Button variant="primary" class="flex items-center gap-2">
          <Icon name="ph:plus" class="h-4 w-4" />
          Upload Document
        </Button>
      </NuxtLink>
    </div>

    <!-- Loading State -->
    <Card v-if="isLoading" class="p-12">
      <div class="flex flex-col items-center justify-center gap-4">
        <Icon name="ph:spinner" class="h-8 w-8 animate-spin text-primary" />
        <p>Loading documents...</p>
      </div>
    </Card>

    <!-- Error State -->
    <Card v-else-if="error" class="p-8">
      <div
        class="p-4 bg-danger/10 border border-danger/20 rounded-md text-danger"
      >
        <p class="font-medium">Failed to load documents</p>
        <p class="text-sm mt-1">{{ error }}</p>
        <Button variant="outline" class="mt-4" @click="fetchDocuments">
          Try Again
        </Button>
      </div>
    </Card>

    <!-- Empty State -->
    <Card v-else-if="documents.length === 0" class="p-12">
      <div class="flex flex-col items-center justify-center text-center">
        <Icon name="ph:files" class="h-12 w-12 text-muted-foreground mb-4" />
        <h2 class="text-xl font-medium mb-2">No Documents Found</h2>
        <p class="text-muted-foreground mb-6">
          Get started by uploading your first document
        </p>
        <NuxtLink to="/doc/upload">
          <Button variant="primary" class="flex items-center gap-2">
            <Icon name="ph:plus" class="h-4 w-4" />
            Upload Document
          </Button>
        </NuxtLink>
      </div>
    </Card>

    <!-- Documents Table -->
    <Card v-else class="p-0">
      <Table hover>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Pages</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Uploaded</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="doc in documents" :key="doc.id">
            <TableCell>
              <div class="flex items-center gap-2">
                <Icon
                  name="ph:file-pdf"
                  class="h-4 w-4 text-muted-foreground"
                />
                <span class="font-medium">{{ doc.file_name }}</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge :variant="getStatusVariant(doc.status)">
                {{ doc.status }}
              </Badge>
            </TableCell>
            <TableCell>
              <span v-if="doc.page_count" class="flex items-center gap-1">
                <Icon name="ph:files" class="h-4 w-4" />
                {{ doc.processed_pages }}/{{ doc.page_count }}
              </span>
              <span v-else>-</span>
            </TableCell>
            <TableCell>
              {{ formatFileSize(doc.file_size) }}
            </TableCell>
            <TableCell>
              <span class="text-muted-foreground">
                {{ formatDate(doc.created_at) }}
              </span>
            </TableCell>
            <TableCell>
              <div class="flex items-center justify-end gap-2">
                <Button
                  v-if="doc.status === 'completed'"
                  variant="ghost"
                  size="sm"
                  @click="viewDocument(doc.id)"
                >
                  <Icon name="ph:eye" class="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  class="text-danger hover:text-danger"
                  @click="confirmDelete(doc)"
                >
                  <Icon name="ph:trash" class="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>

    <!-- Delete Confirmation Modal -->
    <Modal v-model:open="showDeleteModal" size="md">
      <ModalHeader>
        <ModalTitle>Delete Document</ModalTitle>
        <ModalClose />
      </ModalHeader>
      <ModalBody>
        <p>
          Are you sure you want to delete "{{ documentToDelete?.file_name }}"?
        </p>
        <p class="text-sm text-muted-foreground mt-2">
          This action cannot be undone.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" @click="showDeleteModal = false"
          >Cancel</Button
        >
        <Button variant="danger" @click="deleteDocument">Delete</Button>
      </ModalFooter>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
