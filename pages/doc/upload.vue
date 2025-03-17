# <script setup>
definePageMeta({
  title: "Upload Document",
});

import { ref, onMounted } from "vue";
import { createClient } from "@supabase/supabase-js";

const config = useRuntimeConfig();
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseKey
);

const router = useRouter();
const toast = useToast();

const isUploading = ref(false);
const isProcessing = ref(false);
const uploadProgress = ref(0);
const processProgress = ref(0);
const currentPage = ref(0);
const totalPages = ref(0);
const documentId = ref(null);
const isInitializing = ref(true);
const initError = ref(null);
const processingStatus = ref("");
const fileName = ref("");
const fileSize = ref(0);

// Format file size for display
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Function to subscribe to document progress
const subscribeToProgress = (docId) => {
  console.log('Subscribing to progress updates for document:', docId);
  
  const channel = supabase
    .channel(`document-${docId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'document_progress',
        filter: `id=eq.${docId}`,
      },
      (payload) => {
        console.log('Received progress update:', payload);
        
        if (!payload.new) {
          console.warn('No new data in progress update');
          return;
        }

        const progress = payload.new;
        
        // Update progress state
        processProgress.value = progress.progress || 0;
        currentPage.value = progress.current_page || 0;
        totalPages.value = progress.total_pages || 0;
        processingStatus.value = progress.message || '';

        // Handle completion
        if (progress.status === 'complete') {
          console.log('Processing complete');
          isProcessing.value = false;
          channel.unsubscribe();
          
          toast.add({
            title: 'Success',
            description: 'Document processing complete!',
            type: 'success'
          });

          // Redirect to document list
          router.push('/doc');
        }

        // Handle errors
        if (progress.status === 'error') {
          console.error('Processing error:', progress.error);
          isProcessing.value = false;
          channel.unsubscribe();
          
          toast.add({
            title: 'Error',
            description: progress.error || 'Processing failed',
            type: 'error'
          });
        }
      }
    )
    .subscribe((status) => {
      console.log('Subscription status:', status);
      
      if (status === 'SUBSCRIBED') {
        console.log('Successfully subscribed to progress updates');
      } else if (status === 'CLOSED') {
        console.log('Subscription closed');
      } else if (status === 'CHANNEL_ERROR') {
        console.error('Channel error');
        toast.add({
          title: 'Error',
          description: 'Failed to subscribe to progress updates',
          type: 'error'
        });
      }
    });

  return channel;
};

// Initialize Supabase storage buckets
onMounted(async () => {
  try {
    isInitializing.value = true;

    // Initialize documents bucket
    const { data: docsData } = await useFetch("/api/supabase/init");

    if (!docsData.value?.success) {
      throw new Error(
        docsData.value?.error || "Failed to initialize documents storage"
      );
    }

    // Initialize document-images bucket
    const { data: imagesData } = await useFetch("/api/supabase/init-images");

    if (!imagesData.value?.success) {
      throw new Error(
        imagesData.value?.error || "Failed to initialize images storage"
      );
    }
  } catch (error) {
    console.error("Initialization error:", error);
    initError.value = error.message || "Failed to initialize storage";
    toast.add({
      title: "Error",
      description: initError.value,
      type: "error",
    });
  } finally {
    isInitializing.value = false;
  }
});

const submitForm = () => {
  const form = document.getElementById("documentUploadForm");
  if (form) {
    form.dispatchEvent(new Event("submit"));
  }
};

// Upload file to server
const uploadToServer = async (file) => {
  try {
    isUploading.value = true;

    // Create form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", "documents");

    console.log("Uploading file:", file.name);

    // Upload via server endpoint
    const response = await fetch("/api/supabase/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Server upload failed");
    }

    console.log("Server upload successful:", result);

    return {
      data: {
        path: result.path,
        id: result.id,
      },
      error: null,
    };
  } catch (error) {
    console.error("Server upload error:", error);
    return {
      data: null,
      error,
    };
  }
};

// Process PDF to extract pages as images
const processPdf = async (file, docId) => {
  try {
    isProcessing.value = true;
    processProgress.value = 0;
    currentPage.value = 0;
    totalPages.value = 0;
    processingStatus.value = "Initializing PDF processing...";

    console.log(
      "Processing file:",
      file.name,
      "Size:",
      file.size,
      "Type:",
      file.type
    );
    console.log("Document ID:", docId);

    // Subscribe to progress updates
    const channel = subscribeToProgress(docId);

    // Create form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentId", docId);

    // Verify formData contains the file
    const formFile = formData.get("file");
    if (!formFile) {
      throw new Error("Failed to append file to FormData");
    }

    // Process the PDF
    const response = await fetch("/api/pdf/process", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "PDF processing response error:",
        response.status,
        errorText
      );
      throw new Error(`Failed to process PDF: ${response.status} ${errorText}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "PDF processing failed");
    }

    return {
      success: true,
      pageCount: result.pageCount,
      images: result.images,
      imageUrls: result.imageUrls,
    };
  } catch (error) {
    console.error("PDF processing error:", error);
    processingStatus.value = "Processing failed";
    isProcessing.value = false;
    return {
      success: false,
      error: error.message,
    };
  }
};

const handleSubmit = async (formData) => {
  try {
    if (!formData.document) {
      toast.add({
        title: "Error",
        description: "Please select a document to upload",
        type: "error",
      });
      return;
    }

    const file = formData.document;
    fileName.value = file.name;
    fileSize.value = file.size;

    // Check if it's a PDF
    if (file.type !== "application/pdf") {
      toast.add({
        title: "Invalid File Type",
        description: "Only PDF files are supported",
        type: "error",
      });
      return;
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast.add({
        title: "File Too Large",
        description: "Maximum file size is 10MB",
        type: "error",
      });
      return;
    }

    // Upload the file
    uploadProgress.value = 0;
    const uploadResult = await uploadToServer(file);

    if (uploadResult.error) {
      throw new Error(
        uploadResult.error.message || "Failed to upload document"
      );
    }

    uploadProgress.value = 100;
    documentId.value = uploadResult.data.id;

    toast.add({
      title: "Upload Complete",
      description: "Document uploaded successfully. Starting processing...",
      type: "success",
    });

    // Process the PDF to extract pages as images
    const processingResult = await processPdf(file, documentId.value);

    if (!processingResult.success) {
      throw new Error(processingResult.error || "Failed to process document");
    }

    toast.add({
      title: "Processing Complete",
      description: `Document processed successfully. ${processingResult.pageCount} pages extracted.`,
      type: "success",
    });
  } catch (error) {
    console.error("Upload error:", error);
    toast.add({
      title: "Error",
      description: error.message || "Failed to upload document",
      type: "error",
      duration: 5000,
    });
  } finally {
    isUploading.value = false;
  }
};
</script>

<template>
  <div class="container mx-auto py-8 px-4">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-semibold">Upload Document</h1>
        <p class="text-muted-foreground mt-1">Upload a PDF document for processing</p>
      </div>
      <NuxtLink to="/doc">
        <Button variant="outline" class="flex items-center gap-2">
          <Icon name="ph:arrow-left" class="h-4 w-4" />
          Back to Documents
        </Button>
      </NuxtLink>
    </div>

    <Card class="w-full max-w-2xl mx-auto">
      <div v-if="isInitializing" class="p-6 flex justify-center">
        <div class="flex items-center gap-2">
          <Icon name="ph:spinner" class="h-5 w-5 animate-spin text-primary" />
          <span class="text-sm">Initializing storage...</span>
        </div>
      </div>

      <div v-else-if="initError" class="p-6">
        <div
          class="p-4 bg-danger/10 border border-danger/20 rounded-md text-danger text-sm"
        >
          <p class="font-medium">Storage initialization failed</p>
          <p class="text-xs mt-1">{{ initError }}</p>
          <p class="text-xs mt-2">
            Please try refreshing the page or contact support.
          </p>
        </div>
      </div>

      <template v-else>
        <CardHeader>
          <CardTitle>Upload Document</CardTitle>
          <CardDescription>Upload a PDF document for processing</CardDescription>
        </CardHeader>
        <CardContent class="p-6">
          <FormKit
            type="form"
            id="documentUploadForm"
            @submit="handleSubmit"
            :actions="false"
          >
            <FormKit
              type="dropzone"
              name="document"
              label="Document"
              help="Upload your PDF document"
              validation="required|mime:application/pdf|size:10"
              :validation-messages="{
                required: 'Please select a document',
                mime: 'Only PDF files are supported',
                size: 'Maximum file size is 10MB',
              }"
              accept=".pdf"
              maxSize="10485760"
              :multiple="false"
            />

            <div class="mt-4 text-sm text-muted-foreground space-y-1">
              <p class="flex items-center gap-1">
                <Icon name="ph:file-pdf" class="h-4 w-4" />
                Supported format: PDF only
              </p>
              <p class="flex items-center gap-1">
                <Icon name="ph:warning" class="h-4 w-4" />
                Maximum file size: 10MB
              </p>
            </div>

            <!-- File Info -->
            <div v-if="fileName && !isUploading && !isProcessing" class="mt-4">
              <div class="p-3 bg-muted/20 rounded-md space-y-1">
                <p class="text-sm font-medium flex items-center gap-2">
                  <Icon name="ph:file-text" class="h-4 w-4" />
                  {{ fileName }}
                </p>
                <p class="text-xs text-muted-foreground">
                  Size: {{ formatFileSize(fileSize) }}
                </p>
              </div>
            </div>

            <!-- Upload Progress -->
            <div v-if="isUploading" class="mt-4 space-y-2">
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-2">
                  <Icon
                    name="ph:cloud-upload"
                    class="h-4 w-4 text-primary animate-bounce"
                  />
                  <span>Uploading {{ fileName }}...</span>
                </div>
                <span class="text-muted-foreground font-medium"
                  >{{ Math.round(uploadProgress) }}%</span
                >
              </div>
              <Progress :value="uploadProgress" class="w-full" />
              <p class="text-xs text-muted-foreground">
                {{ formatFileSize(fileSize) }} total
              </p>
            </div>

            <!-- Processing Progress -->
            <div v-if="isProcessing" class="mt-4 space-y-4">
              <div class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center gap-2">
                    <Icon
                      name="ph:cpu"
                      class="h-4 w-4 text-primary animate-pulse"
                    />
                    <span>{{ processingStatus }}</span>
                  </div>
                  <span class="text-muted-foreground font-medium"
                    >{{ Math.round(processProgress) }}%</span
                  >
                </div>
                <Progress :value="processProgress" class="w-full" />
              </div>

              <!-- Page Progress -->
              <div
                v-if="totalPages > 0"
                class="p-3 bg-muted/20 rounded-md space-y-2"
              >
                <div class="flex items-center justify-between text-sm">
                  <span class="flex items-center gap-2">
                    <Icon name="ph:files" class="h-4 w-4" />
                    Pages Processed
                  </span>
                  <span class="font-medium"
                    >{{ currentPage }} / {{ totalPages }}</span
                  >
                </div>
                <div class="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    class="h-full bg-primary transition-all duration-300 ease-out"
                    :style="{ width: `${(currentPage / totalPages) * 100}%` }"
                  />
                </div>
                <p class="text-xs text-muted-foreground">
                  Processing page {{ currentPage }} of {{ totalPages }}
                </p>
              </div>
            </div>
          </FormKit>
        </CardContent>
        <CardFooter class="flex justify-end gap-3 p-6 pt-0">
          <Button
            variant="outline"
            type="button"
            :disabled="isUploading || isProcessing"
            @click="router.push('/doc')"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            @click="submitForm"
            :disabled="isUploading || isProcessing"
          >
            <span
              v-if="isUploading || isProcessing"
              class="flex items-center gap-2"
            >
              <Icon name="ph:spinner" class="h-4 w-4 animate-spin" />
              <span>{{ isProcessing ? "Processing..." : "Uploading..." }}</span>
            </span>
            <span v-else class="flex items-center gap-2">
              <Icon name="ph:upload-simple" class="h-4 w-4" />
              Upload Document
            </span>
          </Button>
        </CardFooter>
      </template>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style> 