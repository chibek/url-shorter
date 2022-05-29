<template>
  <nav
    class="group flex cursor-pointer flex-col px-4 py-2 transition-all duration-300 ease-in hover:bg-gray-200"
    :class="{ 'bg-gray-200': isActive }"
  >
    <div class="flex items-center justify-between">
      <span class="text-xs text-gray-500">{{
        $filters.dayMonthBeauty(url.created_at)
      }}</span>
      <span>{{ clicks }}</span>
    </div>
    <span class="font-semibold">{{ url.name }}</span>
    <div class="flex justify-between">
      <span
        class="text-orange-300 underline decoration-orange-300"
        >{{ url.shortUrl }}</span
      >
      <Icon
        name="trash"
        @click.stop.prevent="deleteUrl"
        class="trans-all -mr-2 rounded-full opacity-0 hover:text-red-500 group-hover:opacity-100"
      />
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import Icon from "@/components/icon/Icon.vue";
import { useMutation, useSubscription } from "@vue/apollo-composable";
import {
  CONTEXT_URL_SUBSCRPTION,
  CONTEXT_URL_DELETE,
  CONTEXT_URL,
} from "@/api/context-url";

const props = defineProps({ url: Object, activeId: String });
const isActive = computed(() => props.url?.id === props.activeId);
const { mutate: deleteLink } = useMutation(CONTEXT_URL_DELETE, {
  refetchQueries: [{ query: CONTEXT_URL }],
});
const { result: getClicks } = useSubscription(CONTEXT_URL_SUBSCRPTION, {
  id: props.url.id,
});

const clicks = computed(
  () => getClicks.value?.clickUpdate?.clicks ?? props.url.clicks
);

const deleteUrl = () => {
  if (confirm("Do you really want to delete?")) {
    deleteLink({
      input: props.url.id,
    });
  }
};
</script>
