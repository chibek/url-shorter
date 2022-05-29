<template>
  <section class="flex select-none flex-col space-y-2 p-6" v-if="!urlLoading">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold">{{ url.name }}</h2>
      <ModalUpdateUrl :url="url" v-slot="{ open }">
        <button
          @click="open"
          class="trans-all flex cursor-pointer space-x-2 rounded-lg border p-2 shadow-lg hover:bg-gray-200 hover:text-orange-400"
        >
          <Icon name="pencil" class="h-5 w-5" />
          <span>Edit</span>
        </button>
      </ModalUpdateUrl>
    </div>
    <span>{{  $filters.longDateBeauty(url.created_at) }}</span>
    <LinkRedirect @copy="copy($event)" :url="url" />
    <div class="flex items-center space-x-1 text-sm font-bold">
      <Icon name="switch" class="h-4 w-4" />
      <span>Destination:</span>
    </div>
    <div class="truncate">
      <a class="ml-5" target="_blank" :href="url.longUrl">{{ url.longUrl }}</a>
    </div>
    <Clicks :clicks="url.clicks" />
  </section>
  <section class="flex h-full w-full items-center justify-center" v-else>
    Loading...
  </section>
</template>

<script setup>
import {  useQuery } from "@vue/apollo-composable";
import { CONTEXT_URL_BY_ID } from "../api/context-url";
import { computed, reactive, watchEffect } from "vue";
import Icon from "@/components/icon/Icon.vue";
import LinkRedirect from "@/modules/link/LinkRedirect.vue";
import useClipboard from "../composables/useClipboard.js";
import ModalUpdateUrl from "@/modules/link/ModalUpdateUrl.vue";
import Clicks from "@/modules/link/Clicks.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { copy } = useClipboard();

const urlVariables = reactive({
  id: null,
});
const {
  result: urlResult,
  loading: urlLoading,
} = useQuery(CONTEXT_URL_BY_ID, urlVariables);

watchEffect(() => {
  urlVariables.id = route.params.id;
});

const url = computed(() => urlResult.value?.findOne ?? {});
</script>
