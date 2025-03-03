<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: "markup",
    validator: (value) =>
      [
        "markup",
        "javascript",
        "typescript",
        "vue",
        "html",
        "jsx",
        "tsx",
        "css",
        "scss",
      ].includes(value),
  },
  showCopy: {
    type: Boolean,
    default: true,
  },
  initiallyExpanded: {
    type: Boolean,
    default: false,
  },
  toggleLabel: {
    type: String,
    default: "View Code",
  },
});

const copied = ref(false);
const codeBlockRef = ref(null);
const isExpanded = ref(props.initiallyExpanded);

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy code:", err);
  }
};

const toggleCodeBlock = () => {
  isExpanded.value = !isExpanded.value;
};

onMounted(async () => {
  if (import.meta.client) {
    const Prism = await import("prismjs");
    await import("prismjs/themes/prism-tomorrow.css");
    await import("prismjs/components/prism-javascript");
    await import("prismjs/components/prism-typescript");
    await import("prismjs/components/prism-jsx");
    await import("prismjs/components/prism-tsx");
    await import("prismjs/components/prism-markup");
    await import("prismjs/components/prism-css");
    await import("prismjs/components/prism-scss");

    if (codeBlockRef.value) {
      Prism.default.highlightElement(codeBlockRef.value);
    }
  }
});
</script>

<template>
  <div class="my-6 w-full rounded-md border">
    <!-- Header -->
    <div class="flex items-center border-b">
      <!-- Tab-like buttons -->
      <div class="flex">
        <button
          @click="toggleCodeBlock"
          class="flex h-10 items-center gap-2 border-r px-4 text-sm font-medium transition-colors hover:bg-muted"
          :class="[
            isExpanded ? 'bg-muted text-foreground' : 'text-muted-foreground',
          ]"
        >
          Code
        </button>
      </div>

      <!-- Copy button -->
      <div class="ml-auto pr-2">
        <button
          v-if="showCopy"
          @click="copyCode"
          class="flex h-8 items-center gap-2 rounded-md px-3 text-sm transition-colors hover:bg-muted"
        >
          <span
            v-if="!copied"
            class="flex items-center gap-1 text-muted-foreground"
          >
            <Icon name="lucide:copy" class="h-4 w-4" />
            Copy
          </span>
          <span v-else class="flex items-center gap-1 text-success">
            <Icon name="lucide:check" class="h-4 w-4" />
            Copied!
          </span>
        </button>
      </div>
    </div>

    <!-- Code Block -->
    <div
      v-show="isExpanded"
      class="relative max-h-[650px] overflow-auto bg-muted"
    >
      <pre
        class="overflow-x-auto py-4 text-[13px] leading-6"
      ><code :class="`language-${language} px-4`" ref="codeBlockRef">{{ code }}</code></pre>
    </div>
  </div>
</template>

<style scoped></style>
