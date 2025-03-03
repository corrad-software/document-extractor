<script setup>
import { provide, ref, watch } from 'vue';

defineOptions({ name: 'Tabs' });

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  defaultValue: {
    type: [String, Number],
    default: null
  },
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical', 'responsive'].includes(value)
  }
});

const emit = defineEmits(['update:modelValue']);

const activeTab = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  activeTab.value = newValue;
}, { immediate: true });

const updateTab = (value) => {
  activeTab.value = value;
  emit('update:modelValue', value);
};

provide('tabs', {
  activeTab,
  updateTab,
  orientation: props.orientation
});
</script>

<template>
  <div 
    :class="[
      'w-full',
      {
        'flex gap-6': orientation === 'vertical',
        'block': orientation === 'horizontal',
        'block md:flex md:gap-6': orientation === 'responsive'
      }
    ]"
  >
    <div 
      :class="[
        'relative',
        {
          'flex-1': orientation === 'vertical',
          'w-full': orientation === 'horizontal',
          'w-full md:flex-1': orientation === 'responsive'
        }
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.relative {
  perspective: 1000px;
  transform-style: preserve-3d;
}
</style> 