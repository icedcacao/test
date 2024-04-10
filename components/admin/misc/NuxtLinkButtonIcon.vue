<template>
  <NuxtLink :to="navigateTo">
    <button
      :class="dynamicClass"
      class="rounded border-2 border-black bg-[#4291f3] p-1 text-center text-white hover:bg-[#4291f3]/75"
    >
      <Icon :name="iconName" class="h-6 w-6" />
    </button>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  iconName: string;
  dynamicClass: string;
  navigateTo: string;
}>();
</script>
