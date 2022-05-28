<template>
  <section class="flex flex-col space-y-2 p-6 select-none" v-if="!urlLoading">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold">{{ url.name }}</h2>
      <button
        class="trans-all flex cursor-pointer space-x-2 rounded-lg p-2 hover:bg-gray-200 hover:text-orange-400 border shadow-lg"
      >
        <Icon name="pencil" class="h-5 w-5" />
        <span>Edit</span>
      </button>
    </div>
    <span>{{ url.created_at }}</span>
    <LinkRedirect @copy="copy($event)" :url="url" />
    <div class="flex items-center space-x-1 text-sm font-bold">
      <Icon name="switch" class="h-4 w-4" />
      <span>Destination:</span>
    </div>
    <div>
      <a
        class="ml-5"
        target="_blank"
        :href="url.longUrl"
        >{{ url.longUrl }}</a
      >
    </div>
    <div class="flex flex-col">
      <div class="flex items-end space-x-1">
        <span class="text-2xl font-bold">{{ url.clicks }}</span>
        <Icon name="chart" />
      </div>
      <span class="text-sm">Total clicks</span>
    </div>
  </section>
  <section class="flex h-full w-full items-center justify-center" v-else>
    Loading...
  </section>
</template>

<script setup>
import { useLazyQuery } from "@vue/apollo-composable";
import { CONTEXT_URL_BY_ID } from "../api/context-url";
import { computed, reactive, watchEffect } from "vue";
import Icon from "../components/icon/Icon.vue";
import LinkRedirect from "../modules/link/LinkRedirect.vue";
import useClipboard from "../composables/useClipboard.js";

const props = defineProps(["id"]);
const { copy } = useClipboard();
const urlVariables = reactive({
  id: null,
});

const {
  result: urlResult,
  loading: urlLoading,
  load: urlLoad,
} = useLazyQuery(CONTEXT_URL_BY_ID, urlVariables);

watchEffect(async () => {
  if (!props.id) {
    return;
  }
  urlVariables.id = props.id;
  urlLoad();
});

const url = computed(() => urlResult.value?.findOne ?? {});
</script>
