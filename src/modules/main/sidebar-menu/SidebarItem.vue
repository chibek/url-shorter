<template>
  <nav class="flex flex-col px-4 py-2 hover:bg-gray-200 cursor-pointer transition-all ease-in duration-300" :class="{ 'bg-gray-200': isActive }">
    <span class="text-xs text-gray-500">{{
      $filters.dayMonthBeauty(url.created_at)
    }}</span>
    <span class="font-semibold">{{ url.name }}</span>
    <div class="flex justify-between">
      <a
        :href="url.shortUrl"
        class="cursor-pointer text-orange-300 underline decoration-orange-300"
        >{{ url.shortUrl }}</a
      >
      <span>{{ url.clicks }}</span>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({ url: Object, activeId: String });
const isActive = computed(() => props.url?.id === props.activeId);
</script>
