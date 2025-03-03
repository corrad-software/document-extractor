<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  context: {
    type: Object,
    required: true,
  },
});

const dragCounter = ref(0);
const fileInput = ref(null);
const isDragging = computed(() => dragCounter.value > 0);

// Get props directly from context
const multiple = computed(() => props.context.multiple || false);
const accept = computed(() => props.context.accept);
const maxSize = computed(() => props.context.maxSize || 5242880); // 5MB default
const maxFiles = computed(() => props.context.maxFiles || 10);

// Initialize files array if multiple is true
const currentFiles = ref([]);

// Handle file selection
const handleFiles = (files) => {
  const selectedFiles = Array.from(files);

  // Validate number of files
  if (!multiple.value && selectedFiles.length > 1) {
    props.context.node.setErrors(["Only one file can be uploaded"]);
    return;
  }

  // For multiple files, check total count including existing files
  if (multiple.value) {
    const totalFiles = [...(currentFiles.value || []), ...selectedFiles];
    if (totalFiles.length > maxFiles.value) {
      props.context.node.setErrors([`Maximum ${maxFiles.value} files allowed`]);
      return;
    }
  }

  // Validate file size and type
  const invalidFiles = selectedFiles.filter((file) => {
    if (file.size > maxSize.value) {
      return true;
    }
    if (accept.value) {
      const acceptedTypes = accept.value.split(",").map((type) => type.trim());
      const fileType = file.type;
      const fileExtension = `.${file.name.split(".").pop()}`;
      return !acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          return type === fileExtension;
        }
        if (type.endsWith("/*")) {
          return fileType.startsWith(type.slice(0, -2));
        }
        return type === fileType;
      });
    }
    return false;
  });

  if (invalidFiles.length) {
    props.context.node.setErrors([
      `Some files are invalid. Please check file type and size (max ${
        maxSize.value / 1024 / 1024
      }MB)`,
    ]);
    return;
  }

  // Update value based on multiple flag
  if (multiple.value) {
    // Append new files to existing ones
    const updatedFiles = [...(currentFiles.value || []), ...selectedFiles];
    currentFiles.value = updatedFiles;
    props.context.node.input(updatedFiles);
  } else {
    // Single file mode
    currentFiles.value = [selectedFiles[0]];
    props.context.node.input(selectedFiles[0]);
  }
};

// Add remove file functionality
const removeFile = (fileToRemove) => {
  if (multiple.value) {
    const updatedFiles = currentFiles.value.filter(
      (file) => file !== fileToRemove
    );
    currentFiles.value = updatedFiles;
    props.context.node.input(updatedFiles);
  } else {
    currentFiles.value = [];
    props.context.node.input(null);
  }
};

// Drag and drop handlers
const handleDragEnter = (e) => {
  e.preventDefault();
  dragCounter.value++;
};

const handleDragLeave = (e) => {
  e.preventDefault();
  dragCounter.value--;
};

const handleDrop = (e) => {
  e.preventDefault();
  dragCounter.value = 0;
  handleFiles(e.dataTransfer.files);
};

const handleDragOver = (e) => {
  e.preventDefault();
};

// Click handler
const handleClick = () => {
  fileInput.value?.click();
};

// File input change handler
const handleChange = (e) => {
  handleFiles(e.target.files);
};

// Format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Watch for external value changes
watch(
  () => props.context.value,
  (newValue) => {
    if (newValue === null || newValue === undefined) {
      currentFiles.value = [];
    } else if (multiple.value && Array.isArray(newValue)) {
      currentFiles.value = newValue;
    } else if (!multiple.value) {
      currentFiles.value = [newValue];
    }
  },
  { immediate: true }
);
</script>

<template>
  <div
    :class="[
      context.classes.dropzone,
      isDragging ? 'border-primary ring-2 ring-primary/20' : '',
      context.disabled ? 'opacity-50 cursor-not-allowed' : '',
    ]"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @dragover="handleDragOver"
    @drop="handleDrop"
    @click="handleClick"
  >
    <input
      ref="fileInput"
      type="file"
      :accept="accept"
      :multiple="multiple"
      class="hidden"
      @change="handleChange"
      :disabled="context.disabled"
    />

    <!-- Upload Area -->
    <div
      class="flex flex-col items-center justify-center gap-4 p-4 border border-dashed rounded-lg cursor-pointer"
    >
      <div class="rounded-full bg-muted p-4">
        <Icon name="ph:upload-simple" class="h-6 w-6 text-muted-foreground" />
      </div>
      <div class="text-center space-y-2">
        <div class="space-y-1">
          <p class="text-sm font-medium">
            {{ isDragging ? "Drop files here" : "Upload your files" }}
          </p>
          <p class="text-sm text-muted-foreground">
            Drag & drop or click to select
          </p>
        </div>
        <div class="text-xs text-muted-foreground space-y-1">
          <p>Maximum file size: {{ formatFileSize(maxSize) }}</p>
          <p v-if="accept">Accepted files: {{ accept }}</p>
        </div>
      </div>
    </div>

    <!-- File Preview -->
    <div v-if="currentFiles.length > 0" class="border-t mt-4 pt-4">
      <div class="space-y-2">
        <div
          v-for="file in currentFiles"
          :key="file.name"
          class="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2"
        >
          <div class="flex items-center gap-2 min-w-0">
            <Icon
              name="ph:file-text"
              class="h-4 w-4 flex-shrink-0 text-muted-foreground"
            />
            <div class="min-w-0 flex-1">
              <p class="text-sm truncate">{{ file.name }}</p>
              <p class="text-xs text-muted-foreground">
                {{ formatFileSize(file.size) }}
              </p>
            </div>
          </div>
          <button
            type="button"
            class="ml-2 rounded-md p-1 hover:bg-background flex items-center justify-center"
            @click.stop="removeFile(file)"
            aria-label="Remove file"
          >
            <Icon
              name="ph:x"
              class="h-4 w-4 text-muted-foreground hover:text-foreground"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
