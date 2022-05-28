<template>
  <div class="boder-blue-200 flex justify-between rounded-lg border p-2">
    <a target="_blank" :href="url.longUrl" class="flex items-center space-x-2">
      <Icon name="link" />
      <span>{{ shortUrl }}</span>
    </a>

    <div
      class="trans-all flex cursor-pointer space-x-2 rounded-lg p-2 hover:bg-gray-200 hover:text-orange-400"
      @click="emit('copy', shortUrl)"
    >
      <Icon name="clipboard" />
      <span>Copy</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import Icon from "../../components/icon/Icon.vue";

const props = defineProps(["url"]);
const emit = defineEmits(["copy"]);
const shortUrl = computed(
  () => `${import.meta.env.VITE_BACK_API}/link/${props.url.shortUrl}`
);
</script>
